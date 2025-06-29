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
    // check for token
    const token = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'portfolio-app'
    };

    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    // get user's public events
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=10`,
      {
        headers,
        next: { revalidate: 300 } // 5 minute cache
      }
    );

    if (!eventsResponse.ok) {
      if (eventsResponse.status === 403) {
        console.error('GitHub API rate limit exceeded');
        return null;
      }
      console.error('Failed to fetch GitHub events:', eventsResponse.status);
      return null;
    }

    const events = await eventsResponse.json();
    
    // find most recent push
    const pushEvent = events.find((event: any) => event.type === 'PushEvent');
    
    if (!pushEvent) {
      console.log('No recent push events found');
      return null;
    }

    // get most recent commit from push event
    const latestCommit = pushEvent.payload.commits?.[0];
    
    if (!latestCommit) {
      console.log('No commits found in push event');
      return null;
    }

    // get commit information
    const commitResponse = await fetch(
      `https://api.github.com/repos/${pushEvent.repo.name}/commits/${latestCommit.sha}`,
      {
        headers,
        next: { revalidate: 300 } // 5 minute cache
      }
    );

    if (!commitResponse.ok) {
      console.error('Failed to fetch commit details:', commitResponse.status);
      return null;
    }

    const commitData = await commitResponse.json();
    
    return {
      sha: commitData.sha.substring(0, 7), 
      commit: {
        message: commitData.commit.message.split('\n')[0],
        author: commitData.commit.author
      },
      html_url: commitData.html_url,
      repository: {
        name: pushEvent.repo.name.split('/')[1],
        full_name: pushEvent.repo.name,
        html_url: `https://github.com/${pushEvent.repo.name}`
      }
    };
  } catch (error) {
    console.error('Error fetching latest commit:', error);
    return null;
  }
}
