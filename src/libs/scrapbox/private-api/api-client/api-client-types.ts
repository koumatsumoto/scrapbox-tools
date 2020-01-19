import { ID } from '../../others';

export type PageResponse = {
  id: string;
  title: string;
  // not checked
  image: null | any;
  descriptions: [];
  user: {
    id: string;
    name: string;
    displayName: string;
    photo: string;
  };
  pin: number;
  views: number;
  linked: number;
  commitId: string;
  created: number;
  updated: number;
  accessed: number;
  snapshotCreated: number;
  persistent: boolean;
  lines: { id: string; text: string; userId: string; created: number; updated: number }[];
  links: [];
  icons: {};
  relatedPages: { links1hop: []; links2hop: []; icons1hop: [] };
  collaborators: [];
  lastAccessed: number;
};

export interface User {
  id: ID;
  name: string;
  displayName: string;
  photo: string;
  email: string;
  pro: boolean;
  provider: 'google' | string;
  created: number;
  updated: number;
}

export type ProjectResponse = {
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

export interface MeResponse extends User {
  config: {
    userScript: boolean;
  };
  isGuest: boolean;
  csrfToken: string;
}
