export type Project = {
  name: string;
  pages: {
    id?: string; // undefined if exists === false
    title: string;
    titleLc: string;
    updated: number;
    exists: boolean;
  }[];
};
