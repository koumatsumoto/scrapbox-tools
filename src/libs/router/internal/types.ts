export type RouterEvent = Readonly<{
  type: 'pushState' | 'replaceState' | 'popstate';
  data: { state: unknown; title: string; url: string };
  debug: any;
}>;
