export const checkHTML = (html: string) => {
  const div = document.createElement('div');
  div.innerHTML = html;

  return div.innerHTML === html;
};
