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

export async function getLatestCommit(username: string): Promise<GitHubCommit | null> {
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

    return latestCommit;
  } catch (error) {
    console.error('Error fetching latest commit:', error);
    return null;
  }
}
