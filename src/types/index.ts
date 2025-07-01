export interface Project {
  name: string;
  description: string;
  path: string;
  link?: string;
}

export interface SystemInfo {
  cpu: number;
  memory: number;
  network: number;
}

export interface GitCommit {
  message: string;
  hash: string;
  timeAgo: string;
}

export interface SSHInfo {
  connected: string;
  session: string;
} 