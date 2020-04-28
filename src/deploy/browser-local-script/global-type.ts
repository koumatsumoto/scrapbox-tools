export {};

export type MyScripts = {
  updateSourceCode: (codeName: string, newSourceCode: string) => Promise<void>;
};

declare global {
  interface Window {
    waitForMyScriptsReady: () => Promise<MyScripts>;
    __myScripts?: MyScripts;
  }
}
