const userPageTemplate = `kou
[https://gyazo.com/cb3fa739b567b9ff8762a405b438b65d]

code:script.js
 `;

const settingsPageTemplate = `settings
code:style.css
 `;

export const getUserPageText = (script: string) => `${userPageTemplate}${script}`;
export const getSettingsPageText = (css: string) => `${settingsPageTemplate}${css}`;
