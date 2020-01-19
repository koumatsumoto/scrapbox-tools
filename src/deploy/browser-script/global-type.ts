export {};

export type MyScripts = {
  updateSourceCode: (codeName: string, newSourceCode: string) => Promise<void>;
};

// extensions
declare global {
  interface Window {
    waitForMyScriptsReady: () => Promise<MyScripts>;
    __myScripts?: MyScripts;
  }
}
