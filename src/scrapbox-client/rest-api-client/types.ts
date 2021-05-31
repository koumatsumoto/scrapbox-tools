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

export type Project = {
  id: string;
  name: string;
  displayName: string;
  publicVisible: boolean;
  plan: 'personal' | string;
  theme: 'winter' | string;
  gyazoTeamsName: null;
  googleAnalyticsCode: null;
  created: number;
  updated: number;
  users: User[];
  admins: [];
  owner: string;
  trialing: boolean;
  trialMaxPages: 100;
  skipPayment: boolean;
  backuped: number;
  isMember: boolean;
};

export interface ErrorResult {
  name: 'NotLoggedInError' | string;
  message: string;
  details: unknown;
}
