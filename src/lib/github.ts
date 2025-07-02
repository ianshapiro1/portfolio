export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  html_url: string;
  repository: {
    name: string;
    full_name: string;
    html_url: string;
  };
}

export interface LanguageStats {
  language: string;
  bytes: number;
  percentage: number;
}

export interface CodeMetrics {
  totalCommits: number;
  totalRepos: number;
  languages: LanguageStats[];
  commitsOverTime: { date: string; count: number }[];
}

{/* LATEST COMMIT */}
// cache for latest commit
const commitCache = new Map<string, { data: GitHubCommit; timestamp: number }>();
const COMMIT_CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

export async function getLatestCommit(username: string): Promise<GitHubCommit | null> {
  // check cache first
  const cacheKey = `commit_${username}`;
  const cached = commitCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < COMMIT_CACHE_DURATION) {
    console.log('Using cached commit data');
    return cached.data;
  }

  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'ianshapiro1-portfolio'
    };

    // get user's repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers,
        next: { revalidate: 60 } // 1 minute cache
      }
    );

    if (!reposResponse.ok) {
      if (reposResponse.status === 403) {
        console.error('GitHub API rate limit exceeded');
        return null;
      }
      console.error('Failed to fetch GitHub repositories:', reposResponse.status);
      return null;
    }

    const repos = await reposResponse.json();
    
    // get the most recent commit from any repository
    let latestCommit: GitHubCommit | null = null;
    let latestDate = new Date(0);

    for (const repo of repos) {
      try {
        // get the latest commit for this repository
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${repo.full_name}/commits?per_page=1`,
          {
            headers,
            next: { revalidate: 60 } // 1 minute cache
          }
        );

        if (commitsResponse.ok) {
          const commits = await commitsResponse.json();
          
          if (commits.length > 0) {
            const commit = commits[0];
            const commitDate = new Date(commit.commit.author.date);
            
            if (commitDate > latestDate) {
              latestDate = commitDate;
              latestCommit = {
                sha: commit.sha.substring(0, 7),
                commit: {
                  message: commit.commit.message.split('\n')[0],
                  author: commit.commit.author
                },
                html_url: commit.html_url,
                repository: {
                  name: repo.name,
                  full_name: repo.full_name,
                  html_url: repo.html_url
                }
              };
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching commits for ${repo.full_name}:`, error);
        continue;
      }
    }

    if (!latestCommit) {
      console.log('Commit not found');
    }

    // cache the result if we found one
    if (latestCommit) {
      commitCache.set(cacheKey, { data: latestCommit, timestamp: Date.now() });
      console.log('Cached commit data');
    }

    return latestCommit;
  } catch (error) {
    console.error('Error fetching latest commit:', error);
    return null;
  }
}


{/* CODE METRICS */}
// cache for metrics
const metricsCache = new Map<string, { data: CodeMetrics; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function getCodeMetrics(username: string): Promise<CodeMetrics | null> {
  // check cache first
  const cacheKey = `metrics_${username}`;
  const cached = metricsCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('Using cached metrics data');
    return cached.data;
  }

  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'ianshapiro1-portfolio'
    };

    // get repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers,
        next: { revalidate: 300 }
      }
    );

    if (!reposResponse.ok) {
      if (reposResponse.status === 403) {
        console.error('GitHub API rate limit exceeded');
        return null;
      }
      console.error('Failed to fetch GitHub repositories:', reposResponse.status);
      return null;
    }

    const repos = await reposResponse.json();
    
    // get language stats
    const languageMap = new Map<string, number>();
    let totalCommits = 0;
    const commitsOverTime: { date: string; count: number }[] = [];
    
    // initialize last 30 days
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      commitsOverTime.push({
        date: date.toISOString().split('T')[0],
        count: 0
      });
    }

    // process repositories
    const processedRepos = Math.min(repos.length, 30);
    
    for (let i = 0; i < processedRepos; i++) {
      const repo = repos[i];
      
      try {
        // get language stats
        const languagesResponse = await fetch(
          `https://api.github.com/repos/${repo.full_name}/languages`,
          {
            headers,
            next: { revalidate: 300 }
          }
        );

        if (languagesResponse.ok) {
          const languages = await languagesResponse.json();
          
          for (const [language, bytes] of Object.entries(languages)) {
            const currentBytes = languageMap.get(language) || 0;
            languageMap.set(language, currentBytes + (bytes as number));
          }
        }

        const commitsResponse = await fetch(
          `https://api.github.com/repos/${repo.full_name}/commits?per_page=100`, //need to get more commits figure this out
          {
            headers,
            next: { revalidate: 300 }
          }
        );

        if (commitsResponse.ok) {
          const commits = await commitsResponse.json();
          // add commits found
          totalCommits += commits.length;
        }

        // get recent commits for timeline (maybe change this to use the commitsResponse)
        const recentCommitsResponse = await fetch(
          `https://api.github.com/repos/${repo.full_name}/commits?per_page=30`,
          {
            headers,
            next: { revalidate: 300 }
          }
        );

        if (recentCommitsResponse.ok) {
          const recentCommits = await recentCommitsResponse.json();
          
          for (const commit of recentCommits) {
            const commitDate = new Date(commit.commit.author.date);
            const dateString = commitDate.toISOString().split('T')[0];
            
            const timeIndex = commitsOverTime.findIndex(d => d.date === dateString);
            if (timeIndex !== -1) {
              commitsOverTime[timeIndex].count++;
            }
          }
        }
      } catch (error) {
        console.error(`Error processing ${repo.full_name}:`, error);
        continue;
      }
    }

    // calculate language percentages
    const totalBytes = Array.from(languageMap.values()).reduce((sum, bytes) => sum + bytes, 0);
    const languages: LanguageStats[] = Array.from(languageMap.entries())
      .map(([language, bytes]) => ({
        language,
        bytes,
        percentage: totalBytes > 0 ? (bytes / totalBytes) * 100 : 0
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 8);

    const result = {
      totalCommits,
      totalRepos: processedRepos,
      languages,
      commitsOverTime
    };

    // cache result
    metricsCache.set(cacheKey, { data: result, timestamp: Date.now() });
    console.log('Cached metrics data');

    return result;
  } catch (error) {
    console.error('Error fetching code metrics:', error);
    return null;
  }
}
