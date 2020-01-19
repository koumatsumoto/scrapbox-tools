export {};

type MyScripts = {
  updateSourceCode: (codeName: string, newSourceCode: string) => Promise<void>;
};

// extensions
declare global {
  interface Window {
    waitForMyScriptsReady: () => Promise<void>;
    __myScripts?: MyScripts;
  }
}
