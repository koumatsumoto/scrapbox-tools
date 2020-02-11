import { retrieveListItemsWithTitle } from './list-item';

describe('retrieveListItemsWithTitle', () => {
  const html = `
    <div class="app">
      <div class="page-list">
        <li class="page-list-item grid-style-item"><a href="/my-project/title" rel="route"><div class="hover"></div><div class="content"><div class="header"><div class="title">title</div></div><div class="icon"><img loading="lazy" src="https://gyazo.com/aedc5b30b54fe08647a895eb34ff3b5c/thumb/400"></div></div></a></li>
      </div>
    </div>`;

  it('should work', () => {
    document.body.innerHTML = html;

    const result = retrieveListItemsWithTitle();
    expect(result.get('title')).toBeInstanceOf(Element);
  });
});
