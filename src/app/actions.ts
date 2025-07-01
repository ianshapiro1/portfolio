'use server';

import { getLatestCommit, GitHubCommit } from '@/lib/github';

export async function fetchLatestCommit(username: string = 'ianshapiro1'): Promise<{ success: boolean; data?: GitHubCommit | null; error?: string }> {
  try {
    const commit = await getLatestCommit(username);
    return { success: true, data: commit };
  } catch (error) {
    console.error('Error in fetchLatestCommit:', error);
    return { success: false, error: 'Failed to fetch commit data' };
  }
} 