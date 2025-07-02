'use server';

import { getLatestCommit, getCodeMetrics, GitHubCommit, CodeMetrics } from '@/lib/github';

export async function fetchLatestCommit(username: string = 'ianshapiro1'): Promise<{ success: boolean; data?: GitHubCommit | null; error?: string }> {
  try {
    const commit = await getLatestCommit(username);
    return { success: true, data: commit };
  } catch (error) {
    console.error('Error in fetchLatestCommit:', error);
    return { success: false, error: 'Failed to fetch commit data' };
  }
}

export async function fetchCodeMetrics(username: string = 'ianshapiro1'): Promise<{ success: boolean; data?: CodeMetrics; error?: string }> {
  try {
    const metrics = await getCodeMetrics(username);
    
    if (metrics) {
      return { success: true, data: metrics };
    } else {
      return { success: false, error: 'No metrics data found' };
    }
  } catch (error) {
    console.error('Error in fetchCodeMetrics:', error);
    return { success: false, error: 'Failed to fetch metrics data' };
  }
} 