import { ID } from '../common';

export type Line = {
  id: ID;
  text: string;
  userId: string;
  created: number;
  updated: number;
};

export type User = {
  id: ID;
  name: string;
  displayName: string;
  photo: string;
  email: string;
  pro: boolean;
  provider: 'google' | unknown;
  created: number;
  updated: number;
};

export type Me = User & {
  config: { userScript: boolean };
  isGuest: boolean;
  csrfToken: string;
};

export type Page = {
  id: string;
  title: string;
  image: null | unknown;
  descriptions: [];
  user: Pick<User, 'id' | 'name' | 'displayName' | 'photo'>;
  pin: number;
  views: number;
  linked: number;
  commitId: string;
  created: number;
  updated: number;
  accessed: number;
  snapshotCreated: number;
  persistent: boolean;
  lines: Line[];
  links: [];
  icons: Record<string, unknown>;
  relatedPages: { links1hop: []; links2hop: []; icons1hop: [] };
  collaborators: [];
  lastAccessed: number;
};

export interface ProjectPublicData {
  created: number;
  displayName: string;
  googleAnalyticsCode: null;
  gyazoTeamsName: null;
  id: string;
  isMember: boolean;
  loginStrategies: unknown[];
  name: string;
  plan: 'personal' | null;
  publicVisible: boolean;
  theme: 'winter' | 'default' | string;
  trialing: boolean;
  updated: number;
}

export interface Project extends ProjectPublicData {
  admins: [];
  backuped: number;
  owner: string;
  trialMaxPages: 100;
  skipPayment: boolean;
  users: User[];
}

export interface ErrorResult {
  name: 'NotLoggedInError' | string;
  message: string;
  details: unknown;
}
