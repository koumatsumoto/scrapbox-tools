export const sampleBodyHTML1 = `
<div id="app-container">
  <div class="app">
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="row">
          <div class="col-brand dropdown global-menu-button"><a class="navbar-brand dropdown-toggle"
                                                                data-toggle="dropdown" role="button" tabindex="0"
                                                                aria-haspopup="true" aria-expanded="false"><img
            class="brand-icon" src="/assets/img/logo.png"><span class="kamon kamon-caret-down"></span></a>
            <ul class="global-menu-for-user global-menu dropdown-menu" aria-labelledby="dropdownGlobalMenu">
              <li class="project-list-filter"><a tabindex="0" data-keep-open="true" role="menuitem">
                <svg class="kamon">
                  <use xlink:href="/assets/sprite.svg#search"></use>
                </svg>
                <input type="text" value="" autocomplete="off" autocorrect="off" autocapitalize="off"
                       spellcheck="false"></a></li>
              <li><a href="/koumatsumoto/" class="selected updated"><span class="project-display-name">学習記録</span><span
                class="private-icon"><span class="kamon kamon-locked"></span></span></a></li>
              <li><a href="/projects/new">Create new project <span class="kamon kamon-plus"></span></a></li>
              <li role="separator" class="divider"></li>
              <li class="dropdown-header list-header">学習記録 (1 member)</li>
              <li class="section section-right" style="margin-right: 0px;"><a
                href="/projects/koumatsumoto/settings/basic" rel="route">Settings</a><a
                href="/projects/koumatsumoto/settings/billing" rel="route">Billing</a><a href="/stream/koumatsumoto/">Stream</a>
              </li>
              <li role="separator" class="divider"></li>
              <li class="dropdown-header list-header">kou</li>
              <li><a href="/koumatsumoto/kou">Show my page</a></li>
              <li><a href="/settings/profile" rel="route" class="">Edit profile</a></li>
              <li><a tabindex="0" role="menuitem">Log out</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="https://scrapbox.io/product" rel="noopener noreferrer" target="_blank">About Scrapbox</a>
              </li>
              <li><a href="https://scrapbox.io/help-jp/" rel="noopener noreferrer" target="_blank">Help</a></li>
              <li><a tabindex="0" data-keep-open="true" role="menuitem">Check for update</a></li>
              <li role="separator" class="divider"></li>
              <li class="dropdown-header list-header">Watch List</li>
              <li class="guest-project"><a href="/customize/" class="updated"><span class="project-display-name">Scrapboxカスタマイズコレクション</span></a><a
                class="button-delete" title="Remove from Watch List"><span class="kamon kamon-trash"></span></a></li>
              <li class="guest-project"><a href="/help-jp/" class="updated"><span class="project-display-name">Scrapbox ヘルプ</span></a><a
                class="button-delete" title="Remove from Watch List"><span class="kamon kamon-trash"></span></a></li>
              <li class="guest-project"><a href="/icons/" class="updated"><span
                class="project-display-name">Icons</span></a><a class="button-delete"
                                                                title="Remove from Watch List"><span
                class="kamon kamon-trash"></span></a></li>
              <li class="guest-project"><a href="/masui/" class="updated"><span class="project-display-name">増井俊之</span></a><a
                class="button-delete" title="Remove from Watch List"><span class="kamon kamon-trash"></span></a></li>
              <li class="guest-project"><a href="/shokai/" class="updated"><span
                class="project-display-name">橋本商会</span></a><a class="button-delete"
                                                               title="Remove from Watch List"><span
                class="kamon kamon-trash"></span></a></li>
              <li class="dropdown-menu-button list-menu-button"><a tabindex="0" data-keep-open="true" role="menuitem"
                                                                   class="updated">more (2 projects)</a></li>
            </ul>
          </div>
          <div class="col-search hidden-xs">
            <div class="navbar-form"><a class="new-button" href="/koumatsumoto/new" rel="route" title="New">
              <div class="horizontal-line"></div>
              <div class="vertical-line"></div>
            </a>
              <form class="search-form" role="search">
                <div class="form-group">
                  <div class="dropdown"><input type="text" class="form-control" value="" autocomplete="off"
                                               autocorrect="off" autocapitalize="off" spellcheck="false">
                    <ul class="dropdown-menu" role="menu"
                        style="max-height: 11em; max-width: 100%; overflow: auto;"></ul>
                  </div>
                  <button tabindex="-1" type="submit" class="">
                    <svg class="kamon">
                      <use xlink:href="/assets/sprite.svg#search"></use>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="col-menu">
            <ul class="navbar-menu">
              <li class="stream-btn hidden-xs"><a href="/stream/koumatsumoto/"><span
                class="kamon kamon-activity"></span></a></li>
              <li class="visible-xs"><a class="mobile-search-toggle"><i class="kamon kamon-search"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div class="page-item-animation" id="page-item-animation"></div>
    <div class="container">
      <div class="quick-launch layout-page">
        <div class="flex-box">
          <div class="flex-item">
            <div class="left-box"><a class="btn project-home" href="/koumatsumoto/"><span
              class="title">学習記録</span></a><span class="plan-badge">Free Plan</span><span class="private-badge"><span
              class="kamon kamon-locked"></span></span></div>
          </div>
        </div>
        <a class="new-button" href="/koumatsumoto/new" rel="route" title="New">
          <div class="horizontal-line"></div>
          <div class="vertical-line"></div>
        </a></div>
    </div>
    <div class="container" style="display: none;">
      <div class="page-list clearfix">
        <ul class="grid-md grid">
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E7%B5%B1%E5%90%88%E6%83%85%E5%A0%B1"
                                                        rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">統合情報</div>
              </div>
              <div class="icon"><img src="https://gyazo.com/66e5dbfd19173137e3d62e2fd1a3cb70/thumb/400"
                                     class="lazy-load-img"></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E9%96%8B%E7%99%BA%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB1" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">開発サンプル1</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">タグ1</span></p>
                <p><span class="page-link">シンボル1</span></p>
                <p>内容1</p>
                <p>内容2</p>
                <p>内容3</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/2019%2F12%2F07" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">2019/12/07</div>
              </div>
              <div class="description"><p><span
                class="us-colored-square-in-list-item">10:31</span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">視聴</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">ヨビノリ</span></span></span></p>
                <p><span class="page-link">∇</span></p>
                <p><span class="link">∇について</span></p>
                <p><span><span class="page-link">演算子</span></span><span>であり</span><span><span
                  class="page-link">最小変化量</span></span><span>の</span><span><span
                  class="page-link">ベクトル</span></span><span>を表す</span></p>
                <p><span class="us-colored-square-in-list-item">11:48</span><span><span> </span><span><span
                  class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                  class="page-link us-colored-square-in-list-item">体験</span></span></span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/kou" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">kou</div>
              </div>
              <div class="icon"><img src="https://gyazo.com/cb3fa739b567b9ff8762a405b438b65d/thumb/400"
                                     class="lazy-load-img"></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/2019%2F12%2F06" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">2019/12/06</div>
              </div>
              <div class="description"><p><span
                class="us-colored-square-in-list-item">09:23</span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">読書</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">難しい数式はまったくわかりませんが、微分積分を教えてください!</span></span></span>
              </p>
                <p><span class="page-link">微分</span></p>
                <p><span class="formula"><span class="katex-display"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><munder><mo><mi>lim</mi><mo>⁡</mo></mo><mrow><mi
                  mathvariant="normal">Δ</mi><mi>t</mi><mo>→</mo><mn>0</mn></mrow></munder><mfrac><mrow><mi
                  mathvariant="normal">Δ</mi><mi>x</mi></mrow><mrow><mi mathvariant="normal">Δ</mi><mi>t</mi></mrow></mfrac><mo>=</mo><mfrac><mrow><mi>d</mi><mi>x</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac></mrow><annotation
                  encoding="application/x-tex">\\lim_{\\Delta t \\to 0} \\frac{\\Delta x}{\\Delta t} = \\frac{dx}{dt}</annotation></semantics></math></span><span
                  class="katex-html" aria-hidden="true"><span class="base"><span class="strut"
                                                                                 style="height:2.104661em;vertical-align:-0.744331em;"></span><span
                  class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist"
                                                                                                   style="height:0.69444em;"><span
                  style="top:-2.055669em;margin-left:0em;"><span class="pstrut" style="height:2.7em;"></span><span
                  class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span
                  class="mord mtight">Δ</span><span class="mord mathdefault mtight">t</span><span
                  class="mrel mtight">→</span><span class="mord mtight">0</span></span></span></span><span
                  style="top:-2.7em;"><span class="pstrut" style="height:2.7em;"></span><span><span
                  class="mop">lim</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span
                  class="vlist" style="height:0.744331em;"><span></span></span></span></span></span><span class="mspace"
                                                                                                          style="margin-right:0.16666666666666666em;"></span><span
                  class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span
                  class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.36033em;"><span
                  style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span
                  class="mord">Δ</span><span class="mord mathdefault">t</span></span></span><span
                  style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line"
                                                                                             style="border-bottom-width:0.04em;"></span></span><span
                  style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span
                  class="mord">Δ</span><span class="mord mathdefault">x</span></span></span></span><span
                  class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist"
                                                                             style="height:0.686em;"><span></span></span></span></span></span><span
                  class="mclose nulldelimiter"></span></span><span class="mspace"
                                                                   style="margin-right:0.2777777777777778em;"></span><span
                  class="mrel">=</span><span class="mspace"
                                             style="margin-right:0.2777777777777778em;"></span></span><span
                  class="base"><span class="strut" style="height:2.05744em;vertical-align:-0.686em;"></span><span
                  class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span
                  class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.37144em;"><span
                  style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span
                  class="mord mathdefault">d</span><span class="mord mathdefault">t</span></span></span><span
                  style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line"
                                                                                             style="border-bottom-width:0.04em;"></span></span><span
                  style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span
                  class="mord mathdefault">d</span><span class="mord mathdefault">x</span></span></span></span><span
                  class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist"
                                                                             style="height:0.686em;"><span></span></span></span></span></span><span
                  class="mclose nulldelimiter"></span></span></span></span></span></span></span></p>
                <p><span class="page-link">TeX</span></p>
                <p>初めて使った</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/2019%2F12%2F05" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">2019/12/05</div>
              </div>
              <div class="description"><p><span
                class="us-colored-square-in-list-item">09:21</span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">想起</span></span></span></p>
                <p><span class="page-link">ロジック・ツリー</span></p>
                <p><span><span class="page-link">Scrapboxの書き方</span></span><span>を</span><span><span class="page-link">精練</span></span><span>できないか</span>
                </p>
                <p><span class="us-colored-square-in-list-item">09:28</span><span><span> </span><span><span
                  class="page-link us-colored-square-in-list-item">理解</span></span></span><span><span> </span><span><span
                  class="page-link us-colored-square-in-list-item">想起理解定義の思考法</span></span></span></p>
                <p><span class="page-link">Scrapboxの書き方</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/Scrapbox%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">Scrapboxの書き方</div>
              </div>
              <div class="description"><p><span><span
                class="page-link us-colored-square-in-list-item">解説</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">2019/11/14</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">題</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">日記</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">単語</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">理解</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">学習</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">2019/11/16</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">2019/11/21</span></span></span></p>
                <p>分類</p>
                <p>以下の三種類に分類する</p>
                <p>日記：煩雑な情報を一日の単位でまとめた記事</p>
                <p>単語：学習した単語について情報をまとめた記事</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/2019%2F12%2F04" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">2019/12/04</div>
              </div>
              <div class="description"><p class="us-colored-square-in-list-item">09:23</p>
                <p>読書</p>
                <p><span class="page-link">ザ・ファシリテーター</span></p>
                <p><span class="page-link">ファシリテーションの道具箱</span></p>
                <p><span class="page-link">ボールによるコミュニケーションの可視化</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E8%81%B7%E5%8B%99%E5%86%85%E5%AE%B9%E3%81%AE%E6%95%B4%E7%90%86" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">職務内容の整理</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/12/04</span></p>
                <p>整理</p>
                <p>職務内容</p>
                <p>backend</p>
                <p>人事</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E6%80%9D%E8%80%83%E6%B3%95" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">思考法</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/11/16</span></p>
                <p>作成</p>
                <p><span class="page-link">象と理の思考法</span></p>
                <p><span class="page-link us-colored-square-in-list-item">2019/11/21</span></p>
                <p>作成</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E7%99%BA%E6%95%A3%E3%81%A8%E5%8F%8E%E6%9D%9F%E3%81%AE%E6%80%9D%E8%80%83%E6%B3%95"
            rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">発散と収束の思考法</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/04</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">思考法</span></span></span></p>
                <p>想起</p>
                <p><span>思考の</span><span><span class="page-link">工程</span></span><span>（</span><span><span
                  class="page-link">プロセス</span></span><span>）分け</span></p>
                <p><span class="page-link">発散</span></p>
                <p><span class="page-link">収束</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/MTG%E3%81%AE%E9%80%B2%E3%82%81%E6%96%B9"
                                                        rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">MTGの進め方</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/04</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">発散と収束の思考法</span></span></span></p>
                <p>想起</p>
                <p><span>最後に</span><span><span class="page-link">TODO</span></span><span>の確認をするべき</span></p>
                <p><span><span class="page-link">発散と収束</span></span><span>における</span><span><span
                  class="page-link">収束</span></span><span>の</span><span><span class="page-link">成果物</span></span></p>
              </div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E6%9C%80%E4%B8%8B%E9%9A%8E" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">最下階</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/04</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">階層の思考法</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">ネットワークの思考法</span></span></span></p>
                <p>想起</p>
                <p><span><span class="page-link">階層</span></span><span>において、最も</span><span><span
                  class="page-link">下向的</span></span><span>なもの</span></p>
                <p>関連</p>
                <p><span class="page-link">下階</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E6%9C%80%E4%B8%8A%E9%9A%8E" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">最上階</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/04</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">階層の思考法</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">ネットワークの思考法</span></span></span></p>
                <p>想起</p>
                <p><span><span class="page-link">階層</span></span><span>において、最も</span><span><span
                  class="page-link">上向的</span></span><span>なもの</span></p>
                <p>関連</p>
                <p><span class="page-link">上階</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E4%B8%8A%E9%9A%8E" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">上階</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/04</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">階層の思考法</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">ネットワークの思考法</span></span></span></p>
                <p>想起</p>
                <p><span><span class="page-link">階層</span></span><span>において、対象よりも</span><span><span class="page-link">上向的</span></span><span>なもの</span>
                </p>
                <p>関連</p>
                <p><span class="page-link">最上階</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E4%B8%8B%E9%9A%8E" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">下階</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/04</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">階層の思考法</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">ネットワークの思考法</span></span></span></p>
                <p>想起</p>
                <p><span><span class="page-link">階層</span></span><span>において、対象よりも</span><span><span class="page-link">下向的</span></span><span>なもの</span>
                </p>
                <p>関連</p>
                <p><span class="page-link">最下階</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AF%E3%81%AE%E6%80%9D%E8%80%83%E6%B3%95"
            rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">ネットワークの思考法</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/04</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">思考法</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">階層の思考法</span></span></span></p>
                <p>想起</p>
                <p><span class="page-link">意識</span></p>
                <p><span><span class="page-link">思考</span></span><span>の</span><span><span
                  class="page-link">結果</span></span></p>
                <p><span><span class="page-link">相互作用ネットワーク</span></span><span>の</span><span><span class="page-link">統合情報</span></span>
                </p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E4%B8%8B%E5%90%91" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">下向</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">階層の思考法</span></span></span></p>
                <p>理解</p>
                <p><span>より</span><span><span class="page-link">下</span></span><span>の</span><span><span
                  class="page-link">層</span></span><span>にある</span><span><span class="page-link">こと</span></span></p>
                <p><span><span class="page-link">抽象的</span></span><span>な</span><span><span class="page-link">方向</span></span>
                </p>
                <p>関連</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E4%B8%8A%E5%90%91" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">上向</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">階層の思考法</span></span></span></p>
                <p>理解</p>
                <p><span>より</span><span><span class="page-link">上</span></span><span>の</span><span><span
                  class="page-link">層</span></span><span>にある</span><span><span class="page-link">こと</span></span></p>
                <p><span><span class="page-link">具象的</span></span><span>な</span><span><span class="page-link">方向</span></span>
                </p>
                <p>関連</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/Scrapbox%E6%80%9D%E8%80%83%E6%B3%95"
                                                        rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">Scrapbox思考法</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>分類</p>
                <p><span class="page-link">思考法</span></p>
                <p>想起</p>
                <p><span><span class="page-link">Scrapbox</span></span><span>に</span><span><span
                  class="page-link">文</span></span><span>を書きながら</span><span><span
                  class="page-link">思考</span></span><span>する</span><span><span class="page-link">方法</span></span></p>
              </div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E9%9A%8E%E5%B1%A4%E3%81%AE%E6%80%9D%E8%80%83%E6%B3%95" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">階層の思考法</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">思考法</span></p>
                <p><span><span
                  class="page-link us-colored-square-in-list-item">2019/11/24</span></span><span><span> </span><span><span
                  class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>閲読</p>
                <p>wiki</p>
                <p>
                  階層構造を特徴づける性質は、高次の階層は、低次の階層が備える性質をすべて持っていることである。例えば、3階は1階・2階に備わる性質をすべて持っているが、逆に、1階・2階は3階に特有な性質を持っていない。また、下層階に及ぼされた影響は、上層階にも及ぶが、その逆は起こらない。例えば、地震で、1階が揺れた場合、全体が影響をうけるが、2階のみが揺れた場合は、上層階は影響をうけるが、1階は影響を受けない。</p>
              </div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E6%80%9D%E8%80%83" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">思考</div>
              </div>
              <div class="description"><p><span><span
                class="page-link us-colored-square-in-list-item">単語</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">2019/11/16</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">理</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">感情</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">脳</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">2019/11/21</span></span></span></p>
                <p>定義</p>
                <p>名詞</p>
                <p>脳の計算処理結果</p>
                <p>動詞</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E3%82%B9%E3%83%A2%E3%83%BC%E3%82%AF%E3%83%86%E3%82%B9%E3%83%88" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">スモークテスト</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/12/04</span></p>
                <p>学習</p>
                <p>目的</p>
                <p><span><span class="page-link">アプリケーション</span></span><span>の基本機能の</span><span><span class="page-link">保証</span></span>
                </p>
                <p><span><span class="page-link">リグレッションテスト</span></span><span>であり、他の箇所に</span><span><span
                  class="page-link">影響</span></span><span>がないことを</span><span><span
                  class="page-link">テスト</span></span><span>する</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E3%83%8D%E3%83%83%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AF" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">ネットワーク</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/11/21</span></p>
                <p>理解</p>
                <p><span><span class="page-link">受信</span></span><span>と</span><span><span
                  class="page-link">発信</span></span><span>を行える</span><span><span
                  class="page-link">関係</span></span><span>の繋がり</span></p>
                <p><span><span class="page-link">相互伝達</span></span><span>可能な関係</span></p>
                <p><span class="page-link us-colored-square-in-list-item">2019/12/04</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E3%82%BF%E3%83%83%E3%82%AF%E3%83%9E%E3%83%B3%E3%83%A2%E3%83%87%E3%83%AB" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">タックマンモデル</div>
              </div>
              <div class="description"></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/2019%2F12%2F03" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">2019/12/03</div>
              </div>
              <div class="description"><p><span
                class="us-colored-square-in-list-item">09:35</span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">情の思考法</span></span></span></p>
                <p>想起</p>
                <p><span class="page-link">情の変動量</span></p>
                <p>値について</p>
                <p><span><span class="page-link">変動量</span></span><span>を自由入力にすると</span><span><span
                  class="page-link">分散</span></span><span>が大きくなる</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/settings" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">settings</div>
              </div>
              <div class="icon"><img src="https://gyazo.com/f5aad8e143b8d197c25d5e884bb315a2/thumb/400"
                                     class="lazy-load-img"></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/Exploration_Test" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">Exploration Test</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/12/03</span></p>
                <p>参照</p>
                <p><span class="page-link">Exploratory Test</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/Exploratory_Test" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">Exploratory Test</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/12/03</span></p>
                <p>学習</p>
                <p><span><span class="page-link">Exploration Test</span></span><span>ではなく</span><span><span
                  class="page-link">Exploratory Test</span></span><span>で用語を統一する</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/ROI" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">ROI</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/12/03</span></p>
                <p>学習</p>
                <p>Return On Investment</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E6%83%85%E3%81%AE%E6%80%9D%E8%80%83%E6%B3%95" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">情の思考法</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">思考法</span></p>
                <p><span><span
                  class="page-link us-colored-square-in-list-item">2019/11/23</span></span><span><span> </span><span><span
                  class="page-link us-colored-square-in-list-item">T</span></span></span></p>
                <p>理解</p>
                <p>情報　：ある意から報じられる情</p>
                <p>情　　：エネルギーの状態</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E6%83%85%E3%81%AE%E5%A4%89%E5%8B%95%E9%87%8F" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">情の変動量</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/03</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">情の思考法</span></span></span></p>
                <p>想起</p>
                <p><span><span class="page-link">情報</span></span><span>がどれだけ</span><span><span
                  class="page-link">変動</span></span><span>したかを表す</span><span><span class="page-link">量</span></span></p>
              </div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E4%BD%8D" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">位</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/24</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>意中</p>
                <p><span class="page-link">階層の思考法</span></p>
                <p>意味</p>
                <p><span><span class="page-link">レベル</span></span><span>の日本語訳</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E5%A4%89%E5%8B%95%E9%87%8F" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">変動量</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/03</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">情の思考法</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">一字思考法</span></span></span></p>
                <p>想起</p>
                <p><span>どれだけ</span><span><span class="page-link">変</span></span><span>わって</span><span><span
                  class="page-link">動</span></span><span>いたか</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E6%97%A5%E8%A8%98%E5%AD%A6%E7%BF%92%E6%B3%95" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">日記学習法</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/02</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">T</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">学習法</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">想起理解定義の思考法</span></span></span></p>
                <p>想起</p>
                <p>日記した記録による学習の定量化</p>
                <p>情報の差分から安定さを計算する</p>
                <p><span><span class="page-link">安定さ</span></span><span> ＝ Σ（変動量 ^2）× 変動回数 ／ 経過時間</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E5%AE%89%E5%AE%9A%E3%81%95" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">安定さ</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/02</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">T</span></span></span></p>
                <p>想起</p>
                <p>安定さ ＝ Σ（変動量 ^2）× 変動回数 ／ 経過時間</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E5%AD%A6%E7%BF%92%E6%B3%95" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">学習法</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/11/16</span></p>
                <p>作成</p>
                <p><span class="page-link">Scrapbox駆動学習法</span></p>
                <p><span><span
                  class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                  class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>作成</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E5%AE%9A%E9%87%8F%E8%A9%95%E4%BE%A1"
                                                        rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">定量評価</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/02</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">T</span></span></span></p>
                <p>想起</p>
                <p><span><span class="page-link">数値</span></span><span>を使って評価すること</span></p>
                <p><span><span class="page-link">客観的</span></span><span>に評価すること</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/2019%2F12%2F02" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">2019/12/02</div>
              </div>
              <div class="description"><p class="us-colored-square-in-list-item">09:30</p>
                <p>想起</p>
                <p><span class="page-link">読書による学習法</span></p>
                <p class="us-colored-square-in-list-item">20:12</p>
                <p>読書</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E7%9C%9F%E7%90%86" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">真理</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/11/23</span></p>
                <p>意味</p>
                <p><span><span class="page-link">不変</span></span><span>な</span><span><span
                  class="page-link">理</span></span></p>
                <p><span><span class="page-link">感情</span></span><span>で</span><span><span
                  class="page-link">解釈</span></span><span>が変わらない理</span></p>
                <p>理解</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E6%83%B3%E8%B5%B7%E7%90%86%E8%A7%A3%E5%AE%9A%E7%BE%A9%E3%81%AE%E6%80%9D%E8%80%83%E6%B3%95"
            rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">想起理解定義の思考法</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/02</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">T</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">思考法</span></span></span></p>
                <p>想起</p>
                <p><span>思考について三段階の</span><span><span class="page-link">層</span></span><span>を設ける</span></p>
                <p>（１）想起</p>
                <p>（２）理解</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E7%90%86" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">理</div>
              </div>
              <div class="description"><p><span><span
                class="page-link us-colored-square-in-list-item">単語</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">2019/11/09</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">理</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">理解</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">象</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">具象</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">表象</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">2019/11/16</span></span></span></p>
                <p>読み方</p>
                <p>「ことわり」「リ」「いろどり」</p>
                <p>名詞</p>
                <p>言語による象の説明</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E5%B1%95%E9%96%8B" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">展開</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/02</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">T</span></span></span></p>
                <p>想起</p>
                <p>用例</p>
                <p><span><span class="page-link">圧縮</span></span><span>された</span><span><span class="page-link">情報</span></span><span>を展開する</span>
                </p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E3%83%9C%E3%82%BD%E3%83%B3" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">ボソン</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/02</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">T</span></span></span></p>
                <p>関連</p>
                <p><span class="page-link">相互作用ネットワーク</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E6%83%85%E5%A0%B1" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">情報</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/11/21</span></p>
                <p>想起</p>
                <p><span><span class="page-link">現実</span></span><span>に存在する</span><span><span
                  class="page-link">物質</span></span></p>
                <p><span class="page-link">素粒子</span></p>
                <p>理解</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E4%B8%96%E7%95%8C" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">世界</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/11/21</span></p>
                <p>想起</p>
                <p>蜘蛛の巣</p>
                <p>線で結ばれた人々</p>
                <p>理解</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E5%91%BD%E4%BB%A4%E6%9B%B8" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">命令書</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/02</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">T</span></span></span></p>
                <p>理解</p>
                <p><span><span class="page-link">対象</span></span><span>を</span><span><span
                  class="page-link">操作</span></span><span>する為の</span><span><span class="page-link">文書</span></span></p>
                <p><span>命令書は</span><span><span class="page-link">価値</span></span><span>により実現される確率が異なる</span></p>
                <p><span><span class="page-link">プログラミング言語</span></span><span>により操作されるコンピューター</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">プログラミング</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/02</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">T</span></span></span></p>
                <p>理解</p>
                <p><span><span class="page-link">プログラミング言語</span></span><span>を用いて</span><span><span class="page-link">命令書</span></span><span>を作ること</span>
                </p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E5%B7%A5%E5%AD%A6" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">ソフトウェア工学</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/02</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">T</span></span></span><span> </span></p>
                <p>理解</p>
                <p><span class="page-link">プログラミング</span></p>
                <p><span><span class="page-link">コンピューターシステム</span></span><span>を</span><span><span
                  class="page-link">統合</span></span><span>して、一つの</span><span><span
                  class="page-link">世界</span></span><span>を作ること</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E9%9F%B3%E6%A5%BD" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">音楽</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/02</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">T</span></span></span></p>
                <p>音は現実世界の何かの象徴</p>
                <p><span>アンサンブルの一つ一つが主役（独立した</span><span><span class="page-link">意</span></span><span>）となる</span></p>
                <p><span>一つ一つがそれぞれ何かの</span><span><span class="page-link">エピソード</span></span><span>を表現する</span></p>
                <p>曲は複数の主役が為す群像劇</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E6%84%8F" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">意</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/11/23</span></p>
                <p>理解</p>
                <p><span><span class="page-link">心</span></span><span>に浮かぶもの</span></p>
                <p><span><span class="page-link">想起</span></span><span>されるもの</span></p>
                <p>関連</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E8%AA%AD%E6%9B%B8%E3%81%AB%E3%82%88%E3%82%8B%E5%AD%A6%E7%BF%92%E6%B3%95" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">読書による学習法</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/12/02</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">学習法</span></span></span></p>
                <p>想起</p>
                <p>人は己の人生体験に通じることしか学習できない</p>
                <p>本に書いてあることを覚える事は学習の本質ではない</p>
                <p>書いてあることを覚え、その上で何度も咀嚼して理解していくこと</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/2019%2F12%2F01" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">2019/12/01</div>
              </div>
              <div class="description"><p>体験</p>
                <p>ポケモン</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/2019%2F11%2F30" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">2019/11/30</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/11/30</span></p>
                <p>学習</p>
                <p><span class="page-link">国際金融資本家</span></p>
                <p><span class="link">日本は国際金融資本家の手下</span></p>
                <p>株価の操作</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E9%8A%80%E8%A1%8C%E5%AE%B6" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">銀行家</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/29</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">T</span></span></span></p>
                <p>想起</p>
                <p>銀行家</p>
                <p><span><span class="page-link">商人</span></span><span>の</span><span><span
                  class="page-link">群れ</span></span><span>を</span><span><span
                  class="page-link">操作</span></span><span>して</span><span><span
                  class="page-link">営</span></span><span>む</span></p>
                <p><span class="page-link">農家</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/2019%2F11%2F29" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">2019/11/29</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/29</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">T</span></span></span></p>
                <p><span class="us-colored-square-in-list-item">05:25</span><span><span> </span><span><span
                  class="page-link us-colored-square-in-list-item">T</span></span></span></p>
                <p>学習</p>
                <p>世界の銀行の権力</p>
                <p>証券や商品などを扱う一般の市場</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E4%BE%A1%E5%80%A4" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">価値</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/29</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">T</span></span></span></p>
                <p>想起</p>
                <p><span><span class="page-link">情報量</span></span><span>を定める</span></p>
                <p>情報量</p>
                <p><span><span class="page-link">情報</span></span><span>（</span><span><span
                  class="page-link">文</span></span><span>や</span><span><span class="page-link">曲</span></span><span>などで伝わる）がどれくらいの確率で実現するかを定めるもの</span>
                </p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/2019%2F11%2F28" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">2019/11/28</div>
              </div>
              <div class="description"><p><span
                class="us-colored-square-in-list-item">16:00</span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>視聴</p>
                <p>ノーベル物理学賞 1961-1980</p>
                <p>ランダウ</p>
                <p>量子電磁力学</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E6%96%87" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">文</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">一字思考法</span></span></span></p>
                <p>理解</p>
                <p><span><span class="page-link">書</span></span><span>き</span><span><span
                  class="page-link">記</span></span><span>した</span><span><span class="page-link">物</span></span></p>
              </div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/ST%E6%80%9D%E8%80%83%E6%B3%95" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">ST思考法</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>分類</p>
                <p><span class="page-link">思考法</span></p>
                <p>理解</p>
                <p><span>対象について、</span><span><span class="page-link">上向的</span></span><span>であるか</span><span><span
                  class="page-link">下向的</span></span><span>であるか</span><span><span
                  class="page-link">認識</span></span><span>して</span><span><span class="page-link">思考</span></span><span>する</span><span><span
                  class="page-link">方法</span></span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E4%B8%8B%E5%90%91%E7%9A%84" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">下向的</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>参照</p>
                <p><span class="page-link">下向</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E4%B8%8A%E5%90%91%E7%9A%84" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">上向的</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>参照</p>
                <p><span class="page-link">上向</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E8%A1%8C%E3%81%86" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">行う</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>理解</p>
                <p><span><span class="page-link">行</span></span><span>の</span><span><span
                  class="page-link">動詞系</span></span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E8%A1%8C" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">行</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>理解</p>
                <p><span><span class="page-link">人</span></span><span>が</span><span><span
                  class="page-link">何か</span></span><span>を</span><span><span
                  class="page-link">する</span></span><span><span class="page-link">こと</span></span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E5%87%A6" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">処</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/11/22</span></p>
                <p>意味</p>
                <p>事を取りさばく（処置する）</p>
                <p>用例</p>
                <p>事を処する</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E5%87%A6%E7%90%86" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">処理</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/11/22</span></p>
                <p>意味</p>
                <p><span><span class="page-link">理</span></span><span>を</span><span><span
                  class="page-link">処</span></span><span>すこと</span></p>
                <p><span><span
                  class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                  class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>理解</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E9%A1%8C" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">題</div>
              </div>
              <div class="description"><p><span><span
                class="page-link us-colored-square-in-list-item">単語</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">2019/11/14</span></span></span></p>
                <p>理解</p>
                <p>タイトルのこと</p>
                <p>「題」は単語として抽象度が大きいため、コミュニケーションで使うのはより分かりやすい「主題」「表題」「題名」の方が良い</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E3%82%BF%E3%82%B0" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">タグ</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>理解</p>
                <p><span><span class="page-link">情報</span></span><span>を</span><span><span
                  class="page-link">単語</span></span><span>として</span><span><span class="page-link">圧縮</span></span><span>した</span><span><span
                  class="page-link">もの</span></span></p>
                <p><span><span class="page-link">Scrapbox</span></span><span>においては</span><span><span class="page-link">記事</span></span><span>に</span><span><span
                  class="page-link">関連</span></span><span>をつけるために使用する</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E4%BA%8C%E5%AD%97%E5%88%86%E9%A1%9E%E6%80%9D%E8%80%83%E6%B3%95" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">二字分類思考法</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/21</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">ST</span></span></span></p>
                <p>想起</p>
                <p><span class="page-link">Scrapboxの書き方</span></p>
                <p>トップレベルの単語で情報を分類する</p>
                <p>意味</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E6%84%8F%E4%B8%AD" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">意中</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/24</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>意中</p>
                <p><span class="page-link">Scrapboxの書き方</span></p>
                <p>想起</p>
                <p><span>何を</span><span><span class="page-link">思</span></span><span>ってそれを書いたか</span><span><span
                  class="page-link">表現</span></span><span>するために便利</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E6%8A%80%E6%B3%95" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">技法</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/11/14</span></p>
                <p>作成</p>
                <p><span class="page-link">Scrapboxの書き方</span></p>
                <p><span class="page-link us-colored-square-in-list-item">2019/11/21</span></p>
                <p>更新</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/Scrapbox%E9%A7%86%E5%8B%95%E5%AD%A6%E7%BF%92%E6%B3%95" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">Scrapbox駆動学習法</div>
              </div>
              <div class="description"><p><span><span
                class="page-link us-colored-square-in-list-item">解説</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">2019/11/16</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">象</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">理</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">学習</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">学習法</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">2019/11/17</span></span></span></p>
                <p>用語：</p>
                <p>日記</p>
                <p>単語</p>
                <p>理解</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/T" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">T</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">T</span></span></span></p>
                <p>参照</p>
                <p><span class="page-link">ST思考法</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/S" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">S</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>参照</p>
                <p><span class="page-link">ST思考法</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E3%81%AA%E3%81%9C%E3%81%AA%E3%81%9C%E5%AD%A6%E7%BF%92%E6%B3%95" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">なぜなぜ学習法</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">学習法</span></span></span></p>
                <p>想起</p>
                <p><span><span class="page-link">なぜなぜ分析</span></span><span>を使用して</span><span><span
                  class="page-link">学習</span></span><span>する</span><span><span class="page-link">方法</span></span></p>
                <p>関連</p>
                <p><span class="page-link">なぜなぜ分析</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E3%81%AA%E3%81%9C%E3%81%AA%E3%81%9C%E5%88%86%E6%9E%90" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">なぜなぜ分析</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>学習</p>
                <p>なぜなぜ分析</p>
                <p><span><span class="page-link">問題</span></span><span>の再発防止策を考える</span><span><span
                  class="page-link">技法</span></span></p>
                <p><span><span class="page-link">何故</span></span><span>を繰り返し、問題の</span><span><span class="page-link">根本原因</span></span><span>を</span><span><span
                  class="page-link">理解</span></span><span>する</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/KPT" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">KPT</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>理解</p>
                <p><span><span class="page-link">KEEP</span></span><span>と</span><span><span
                  class="page-link">PROBLEM</span></span><span>から</span><span><span
                  class="page-link">TRY</span></span><span>を考えて実践する</span><span><span class="page-link">技法</span></span>
                </p>
                <p>関連</p>
                <p><span class="page-link">KPT学習法</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E6%89%8B%E6%B3%95" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">手法</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>理解</p>
                <p><span><span class="page-link">芸術</span></span><span>に関する</span><span><span
                  class="page-link">方法</span></span></p>
                <p>下向</p>
                <p><span class="page-link">方法</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E6%96%B9%E6%B3%95" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">方法</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>理解</p>
                <p><span><span class="page-link">こと</span></span><span>の</span><span><span class="page-link">やり方</span></span>
                </p>
                <p>上向</p>
                <p><span class="page-link">手法</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E4%B8%8B" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">下</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">階層の思考法</span></span></span></p>
                <p>理解</p>
                <p><span><span class="page-link">上</span></span><span>の</span><span><span
                  class="page-link">反対</span></span><span>となる</span><span><span class="page-link">方向</span></span></p>
              </div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E4%B8%8A" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">上</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">階層の思考法</span></span></span></p>
                <p>理解</p>
                <p><span><span class="page-link">下</span></span><span>の</span><span><span
                  class="page-link">反対</span></span><span>となる</span><span><span class="page-link">方向</span></span></p>
              </div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E7%89%A9%E4%BA%8B%E3%81%AE%E6%80%9D%E8%80%83%E6%B3%95" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">物事の思考法</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">思考法</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">ものとことの思考法</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">意の思考法</span></span></span></p>
                <p>背景</p>
                <p><span class="page-link">ものとことの思考法</span></p>
                <p>理解</p>
                <p><span><span class="page-link">世界</span></span><span>を</span><span><span
                  class="page-link">物</span></span><span>と</span><span><span
                  class="page-link">事</span></span><span>で</span><span><span
                  class="page-link">考える</span></span><span><span class="page-link">方法</span></span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E8%80%83%E3%81%88%E3%82%8B" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">考える</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">意の思考法</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">一字思考法</span></span></span></p>
                <p>理解</p>
                <p><span><span class="page-link">考</span></span><span>をする</span><span><span class="page-link">こと</span></span>
                </p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E3%81%93%E3%81%A8" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">こと</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/11/21</span></p>
                <p>定義</p>
                <p><span><span class="page-link">事</span></span><span>をより</span><span><span class="page-link">抽象化</span></span><span>した</span><span><span
                  class="page-link">語</span></span></p>
                <p><span class="page-link us-colored-square-in-list-item">2019/11/23</span></p>
                <p>関連</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E7%89%A9%E4%BA%8B" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">物事</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">物事の思考法</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">意の思考法</span></span></span></p>
                <p>理解</p>
                <p><span><span class="page-link">世界</span></span><span>を</span><span><span
                  class="page-link">説明</span></span><span>する</span><span><span class="page-link">単位</span></span></p>
                <p><span><span class="page-link">象</span></span><span>と</span><span><span
                  class="page-link">理</span></span><span>を説明する</span><span><span class="page-link">単位</span></span></p>
                <p>関連</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E4%BD%95%E3%81%8B" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">何か</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/11/22</span></p>
                <p>意味</p>
                <p><span><span class="page-link">未確定</span></span><span>の</span><span><span class="page-link">対象</span></span>
                </p>
                <p><span><span
                  class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                  class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                  class="page-link us-colored-square-in-list-item">意の思考法</span></span></span><span><span> </span><span><span
                  class="page-link us-colored-square-in-list-item">物事の思考法</span></span></span></p>
                <p>理解</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E6%84%8F%E3%81%AE%E6%80%9D%E8%80%83%E6%B3%95" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">意の思考法</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p><span><span
                  class="page-link us-colored-square-in-list-item">思考法</span></span><span><span> </span><span><span
                  class="page-link us-colored-square-in-list-item">物事の思考法</span></span></span></p>
                <p>背景</p>
                <p><span class="page-link">情の思考法</span></p>
                <p>想起</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E4%BD%95" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">何</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>理解</p>
                <p><span><span class="page-link">不定</span></span><span>な</span><span><span
                  class="page-link">物事</span></span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E5%85%A8%E3%81%A6" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">全て</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>理解</p>
                <p>なにもかも</p>
                <p>関連</p>
                <p><span class="page-link">何</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E8%AA%8D%E8%AD%98" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">認識</div>
              </div>
              <div class="description"><p><span><span
                class="page-link us-colored-square-in-list-item">単語</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">2019/11/16</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">表象</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">理解</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">思考</span></span></span></p>
                <p>動詞</p>
                <p>表象させて、それについて理解させる</p>
                <p>名詞</p>
                <p>理解された象</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E5%AF%BE%E8%B1%A1" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">対象</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">意の思考法</span></span></span></p>
                <p>理解</p>
                <p><span><span class="page-link">思考</span></span><span>の</span><span><span class="page-link">向き先</span></span><span>となる</span><span><span
                  class="page-link">象</span></span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E6%96%B9" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">方</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">一字思考法</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">意の思考法</span></span></span></p>
                <p>理解</p>
                <p><span><span class="page-link">情報</span></span><span>の</span><span><span
                  class="page-link">方向</span></span><span>の</span><span><span class="page-link">成分</span></span></p>
              </div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E5%90%91" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">向</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">意の思考法</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">一字思考法</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">物事の思考法</span></span></span></p>
                <p>理解</p>
                <p>むき</p>
                <p><span>定められた</span><span><span class="page-link">方</span></span></p>
                <p><span><span class="page-link">物</span></span><span>がある</span><span><span class="page-link">進行</span></span><span>する</span><span><span
                  class="page-link">方向</span></span><span>の</span><span><span class="page-link">意</span></span></p>
              </div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E6%96%B9%E5%90%91" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">方向</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>理解</p>
                <p>定められた向き</p>
                <p>関連</p>
                <p><span class="page-link">量</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E5%90%91%E3%81%8D%E5%85%88" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">向き先</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">意の思考法</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">一字思考法</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">物事の思考法</span></span></span></p>
                <p>理解</p>
                <p><span>定められた</span><span><span class="page-link">方向</span></span></p>
                <p>関連</p>
                <p><span class="page-link">向</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E5%BF%83" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">心</div>
              </div>
              <div class="description"><p><span class="page-link us-colored-square-in-list-item">2019/11/23</span></p>
                <p>理解</p>
                <p><span><span class="page-link">意識</span></span><span>と</span><span><span class="page-link">無意識</span></span><span>から成る</span><span><span
                  class="page-link">もの</span></span></p>
                <p><span><span
                  class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                  class="page-link us-colored-square-in-list-item">S</span></span></span><span><span> </span><span><span
                  class="page-link us-colored-square-in-list-item">意の思考法</span></span></span></p>
                <p>理解</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a
            href="/koumatsumoto/%E3%82%82%E3%81%AE%E3%81%A8%E3%81%93%E3%81%A8%E3%81%AE%E6%80%9D%E8%80%83%E6%B3%95"
            rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">ものとことの思考法</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/21</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">ST</span></span></span></p>
                <p>理解</p>
                <p><span>物理的な</span><span><span class="page-link">もの</span></span><span>と論理的な</span><span><span
                  class="page-link">こと</span></span><span>を明確に使い分けた</span><span><span
                  class="page-link">思考法</span></span></p>
                <p>関連</p>
                <p>上</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E3%82%84%E3%82%8A%E6%96%B9" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">やり方</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>理解</p>
                <p><span>どうやってやるか、その</span><span><span class="page-link">方法</span></span><span>の</span><span><span
                  class="page-link">意</span></span></p>
                <p>関連</p>
                <p><span class="page-link">方法</span></p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E7%90%86%E8%A7%A3" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">理解</div>
              </div>
              <div class="description"><p><span><span
                class="page-link us-colored-square-in-list-item">単語</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">2019/11/16</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">理</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">色</span></span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">彩り</span></span></span></p>
                <p>動詞</p>
                <p>対象について理を得ること</p>
                <p>対象について言語で説明できること</p>
                <p>解説</p></div>
            </div>
          </a></li>
          <li class="page-list-item grid-style-item"><a href="/koumatsumoto/%E6%89%8B%E6%AE%B5" rel="route">
            <div class="hover"></div>
            <div class="content">
              <div class="header">
                <div class="title">手段</div>
              </div>
              <div class="description"><p><span><span class="page-link us-colored-square-in-list-item">2019/11/28</span></span><span><span> </span><span><span
                class="page-link us-colored-square-in-list-item">S</span></span></span></p>
                <p>学習</p>
                <p><span>ある事を実現させるためにとる</span><span><span class="page-link">方法</span></span></p></div>
            </div>
          </a></li>
        </ul>
      </div>
    </div>
    <div class="row-flex" style="display: flex;">
      <div class="col-page-side"></div>
      <div class="col-page">
        <div class="page-alert"></div>
        <div class="page-alert page-history"></div>
        <div class="expandable-menu">
          <div class="toggle-button closed"><span class="kamon kamon-direction-left"></span></div>
        </div>
        <div class="page-wrapper">
          <div class="drag-and-drop-enter">
            <div class="page">
              <div class="editor" id="editor" style="user-select: none;">
                <div class="cursor" style="top: 489px; left: 0px; height: 18px; display: none;">
                  <svg>
                    <rect x="0" y="0" width="1" height="100%"></rect>
                  </svg>
                </div>
                <div class="shared-cursors"></div>
                <div id="compute-line" class="compute-line">
                  <div class="line"><span>内容</span></div>
                </div>
                <div><textarea class="text-input" id="text-input" wrap="off" spellcheck="false" autocapitalize="none"
                               style="line-height: 18px; width: 10px; height: 18px; left: 0px; top: 489px;"></textarea>
                </div>
                <div>
                  <div class="lines">
                    <div class="line section-0 line-title section-title" id="L5deb14496a04390017ea793f" style="">
                      <div class="telomere desktop-telomere"><a href="#5deb14496a04390017ea793f" class="telomere-border"
                                                                tabindex="-1"
                                                                style="border-width: 0px 0px 0px 10px;"></a></div>
                      <span class="text"><span class="c-0">開</span><span class="c-1">発</span><span
                        class="c-2">サ</span><span class="c-3">ン</span><span class="c-4">プ</span><span
                        class="c-5">ル</span><span class="c-6">1</span></span></div>
                    <div class="line section-0" id="L5deb1491e27558000042e43e">
                      <div class="telomere desktop-telomere"><a href="#5deb1491e27558000042e43e" class="telomere-border"
                                                                tabindex="-1"
                                                                style="border-width: 0px 0px 0px 10px;"></a></div>
                      <span class="text"><span><a type="hashTag" class="page-link empty-page-link"
                                                  href="./%E3%82%BF%E3%82%B01" rel="route"><span
                        class="c-0">#</span><span class="c-1">タ</span><span class="c-2">グ</span><span
                        class="c-3">1</span></a></span></span></div>
                    <div class="line section-0" id="L5deb14aae27558000042e440">
                      <div class="telomere desktop-telomere"><a href="#5deb14aae27558000042e440" class="telomere-border"
                                                                tabindex="-1"
                                                                style="border-width: 0px 0px 0px 10px;"></a></div>
                      <span class="text"><span class="us-non-indented-text"><span
                        class="c-0 empty-char-index"> </span><a type="link" class="page-link empty-page-link"
                                                                href="./%E3%82%B7%E3%83%B3%E3%83%9C%E3%83%AB1"
                                                                rel="route"><span class="c-1">シ</span><span class="c-2">ン</span><span
                        class="c-3">ボ</span><span class="c-4">ル</span><span class="c-5">1</span></a><span
                        class="c-6 empty-char-index"> </span></span></span></div>
                    <div class="line section-0" id="L5deb14afe27558000042e441">
                      <div class="telomere desktop-telomere"><a href="#5deb14afe27558000042e441" class="telomere-border"
                                                                tabindex="-1"
                                                                style="border-width: 0px 0px 0px 10px;"></a></div>
                      <span class="text"><span><span><span class="indent-mark" style="width: 1.5em;"><span
                        class="c-0"><span class="pad">\t</span></span><span class="dot"></span></span><span
                        class="indent" style="margin-left: 1.5em;"><span class="c-1">内</span><span
                        class="c-2">容</span><span class="c-3">1</span></span></span></span></span></div>
                    <div class="line section-0" id="L5deb14bfe27558000042e442">
                      <div class="telomere desktop-telomere"><a href="#5deb14bfe27558000042e442" class="telomere-border"
                                                                tabindex="-1"
                                                                style="border-width: 0px 0px 0px 10px;"></a></div>
                      <span class="text"><span><span><span class="indent-mark" style="width: 1.5em;"><span
                        class="c-0"><span class="pad">\t</span></span><span class="dot"></span></span><span
                        class="indent" style="margin-left: 1.5em;"><span class="c-1">内</span><span
                        class="c-2">容</span><span class="c-3">2</span></span></span></span></span></div>
                    <div class="line section-0" id="L5deb14c2e27558000042e443">
                      <div class="telomere desktop-telomere"><a href="#5deb14c2e27558000042e443" class="telomere-border"
                                                                tabindex="-1"
                                                                style="border-width: 0px 0px 0px 10px;"></a></div>
                      <span class="text"><span><span><span class="indent-mark" style="width: 3em;"><span
                        class="c-0"><span class="pad">\t</span></span><span class="c-1"><span
                        class="pad">\t</span></span><span class="dot"></span></span><span class="indent"
                                                                                          style="margin-left: 3em;"><span
                        class="c-2">内</span><span class="c-3">容</span><span
                        class="c-4">3</span></span></span></span></span></div>
                    <div class="line section-0" id="L5deb14c6e27558000042e445">
                      <div class="telomere desktop-telomere"><a href="#5deb14c6e27558000042e445" class="telomere-border"
                                                                tabindex="-1"
                                                                style="border-width: 0px 0px 0px 10px;"></a></div>
                      <span class="text"><span><span class="c-0"><br class="empty-char-index"></span></span></span>
                    </div>
                    <div class="line section-1 section-title" id="L5deb14cfe27558000042e446">
                      <div class="telomere desktop-telomere"><a href="#5deb14cfe27558000042e446" class="telomere-border"
                                                                tabindex="-1"
                                                                style="border-width: 0px 0px 0px 10px;"></a></div>
                      <span class="text"><span><span><a type="hashTag" class="page-link empty-page-link"
                                                        href="./%E3%82%BF%E3%82%B01" rel="route"><span
                        class="c-0">#</span><span class="c-1">タ</span><span class="c-2">グ</span><span
                        class="c-3">1</span></a></span><span><span><span class="c-4"> </span></span><span><a
                        type="hashTag" class="page-link empty-page-link" href="./%E3%82%BF%E3%82%B02" rel="route"><span
                        class="c-5">#</span><span class="c-6">タ</span><span class="c-7">グ</span><span
                        class="c-8">2</span></a></span></span></span></span></div>
                    <div class="line section-1" id="L5deb14cfe27558000042e447">
                      <div class="telomere desktop-telomere"><a href="#5deb14cfe27558000042e447" class="telomere-border"
                                                                tabindex="-1"
                                                                style="border-width: 0px 0px 0px 10px;"></a></div>
                      <span class="text"><span class="us-non-indented-text"><span
                        class="c-0 empty-char-index"> </span><a type="link" class="page-link empty-page-link"
                                                                href="./%E3%82%B7%E3%83%B3%E3%83%9C%E3%83%AB2"
                                                                rel="route"><span class="c-1">シ</span><span class="c-2">ン</span><span
                        class="c-3">ボ</span><span class="c-4">ル</span><span class="c-5">2</span></a><span
                        class="c-6 empty-char-index"> </span></span></span></div>
                    <div class="line section-1" id="L5deb14cfe27558000042e448">
                      <div class="telomere desktop-telomere"><a href="#5deb14cfe27558000042e448" class="telomere-border"
                                                                tabindex="-1"
                                                                style="border-width: 0px 0px 0px 10px;"></a></div>
                      <span class="text"><span><span class="c-0"><br class="empty-char-index"></span></span></span>
                    </div>
                    <div class="line section-2 section-title" id="L5deb14ebe27558000042e44c">
                      <div class="telomere desktop-telomere"><a href="#5deb14ebe27558000042e44c" class="telomere-border"
                                                                tabindex="-1"
                                                                style="border-width: 0px 0px 0px 10px;"></a></div>
                      <span class="text"><span><span><a type="hashTag" class="page-link empty-page-link"
                                                        href="./%E3%82%BF%E3%82%B01" rel="route"><span
                        class="c-0">#</span><span class="c-1">タ</span><span class="c-2">グ</span><span
                        class="c-3">1</span></a></span><span><span><span class="c-4"> </span></span><span><a
                        type="hashTag" class="page-link empty-page-link" href="./%E3%82%BF%E3%82%B02" rel="route"><span
                        class="c-5">#</span><span class="c-6">タ</span><span class="c-7">グ</span><span
                        class="c-8">2</span></a></span></span></span></span></div>
                    <div class="line section-2" id="L5deb14ebe27558000042e44d">
                      <div class="telomere desktop-telomere"><a href="#5deb14ebe27558000042e44d" class="telomere-border"
                                                                tabindex="-1"
                                                                style="border-width: 0px 0px 0px 10px;"></a></div>
                      <span class="text"><span class="us-non-indented-text"><span
                        class="c-0 empty-char-index"> </span><a type="link" class="page-link empty-page-link"
                                                                href="./%E3%82%B7%E3%83%B3%E3%83%9C%E3%83%AB3"
                                                                rel="route"><span class="c-1">シ</span><span class="c-2">ン</span><span
                        class="c-3">ボ</span><span class="c-4">ル</span><span class="c-5">3</span></a><span
                        class="c-6 empty-char-index"> </span></span></span></div>
                    <div class="line section-2 formula-line" id="L5deb14f2e27558000042e44f">
                      <div class="telomere desktop-telomere"><a href="#5deb14f2e27558000042e44f" class="telomere-border"
                                                                tabindex="-1"
                                                                style="border-width: 0px 0px 0px 10px;"></a></div>
                      <span class="text"><span><span><span class="indent-mark" style="width: 1.5em;"><span
                        class="c-0"><span class="pad">\t</span></span><span class="dot"></span></span><span
                        class="indent" style="margin-left: 1.5em;"><span class="formula"><span
                        class="c-1 c-2 c-3 empty-char-index"> </span><span><span class="katex-display"><span
                        class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>I</mi><mo>=</mo><munder><mo><mi
                        mathvariant="normal">arg min</mi><mo>⁡</mo></mo><mrow><mi>q</mi><mo stretchy="false">(</mo><mi>X</mi><mo
                        separator="true">,</mo><mi>Y</mi><mo stretchy="false">)</mo></mrow></munder><mi>D</mi><mo
                        stretchy="false">(</mo><mover accent="true"><mi>p</mi><mo>⃗</mo></mover><mo
                        stretchy="false">(</mo><mi>X</mi><mo separator="true">,</mo><mi>Y</mi><mo
                        stretchy="false">)</mo><mo stretchy="false">)</mo><mo>∥</mo><mover accent="true"><mi>q</mi><mo>⃗</mo></mover><mo
                        stretchy="false">(</mo><mi>X</mi><mo separator="true">,</mo><mi>Y</mi><mo
                        stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">I = \\argmin_{q(X, Y)} D(\\vec{p}(X, Y)) \\parallel \\vec{q}(X, Y)</annotation></semantics></math></span><span
                        class="katex-html" aria-hidden="true"><span class="base"><span class="strut"
                                                                                       style="height:0.68333em;vertical-align:0em;"></span><span
                        class="mord mathdefault" style="margin-right:0.07847em;">I</span><span class="mspace"
                                                                                               style="margin-right:0.2777777777777778em;"></span><span
                        class="mrel">=</span><span class="mspace"
                                                   style="margin-right:0.2777777777777778em;"></span></span><span
                        class="base"><span class="strut"
                                           style="height:1.91044em;vertical-align:-1.16044em;"></span><span
                        class="mop op-limits"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist"
                                                                                                         style="height:0.6678600000000002em;"><span
                        style="top:-2.11456em;margin-left:0em;"><span class="pstrut" style="height:3em;"></span><span
                        class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span
                        class="mord mathdefault mtight" style="margin-right:0.03588em;">q</span><span
                        class="mopen mtight">(</span><span class="mord mathdefault mtight"
                                                           style="margin-right:0.07847em;">X</span><span
                        class="mpunct mtight">,</span><span class="mord mathdefault mtight"
                                                            style="margin-right:0.22222em;">Y</span><span
                        class="mclose mtight">)</span></span></span></span><span
                        style="top:-3.0000000000000004em;"><span class="pstrut" style="height:3em;"></span><span><span
                        class="mop"><span class="mop"><span class="mord mathrm">a</span><span
                        class="mord mathrm">r</span><span class="mord mathrm"
                                                          style="margin-right:0.01389em;">g</span><span class="mspace"
                                                                                                        style="margin-right:0.16666666666666666em;"></span><span
                        class="mord mathrm">m</span><span class="mord mathrm">i</span><span class="mord mathrm">n</span></span></span></span></span></span><span
                        class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist"
                                                                                   style="height:1.16044em;"><span></span></span></span></span></span><span
                        class="mspace" style="margin-right:0.16666666666666666em;"></span><span class="mord mathdefault"
                                                                                                style="margin-right:0.02778em;">D</span><span
                        class="mopen">(</span><span class="mord accent"><span class="vlist-t vlist-t2"><span
                        class="vlist-r"><span class="vlist" style="height:0.714em;"><span style="top:-3em;"><span
                        class="pstrut" style="height:3em;"></span><span class="mord"><span
                        class="mord mathdefault">p</span></span></span><span style="top:-3em;"><span class="pstrut"
                                                                                                     style="height:3em;"></span><span
                        class="accent-body" style="left:-0.15216em;"><span class="overlay"
                                                                           style="height:0.714em;width:0.471em;"><svg
                        width="0.471em" height="0.714em" style="width:0.471em" viewBox="0 0 471 714"
                        preserveAspectRatio="xMinYMin"><path d="M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z"></path></svg></span></span></span></span><span class="vlist-s">​</span></span><span
                        class="vlist-r"><span class="vlist" style="height:0.19444em;"><span></span></span></span></span></span><span
                        class="mopen">(</span><span class="mord mathdefault"
                                                    style="margin-right:0.07847em;">X</span><span
                        class="mpunct">,</span><span class="mspace"
                                                     style="margin-right:0.16666666666666666em;"></span><span
                        class="mord mathdefault" style="margin-right:0.22222em;">Y</span><span
                        class="mclose">)</span><span class="mclose">)</span><span class="mspace"
                                                                                  style="margin-right:0.2777777777777778em;"></span><span
                        class="mrel">∥</span><span class="mspace"
                                                   style="margin-right:0.2777777777777778em;"></span></span><span
                        class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span
                        class="mord accent"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist"
                                                                                                       style="height:0.714em;"><span
                        style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span
                        class="mord mathdefault" style="margin-right:0.03588em;">q</span></span></span><span
                        style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body"
                                                                                                style="left:-0.15216em;"><span
                        class="overlay" style="height:0.714em;width:0.471em;"><svg width="0.471em" height="0.714em"
                                                                                   style="width:0.471em"
                                                                                   viewBox="0 0 471 714"
                                                                                   preserveAspectRatio="xMinYMin"><path
                        d="M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z"></path></svg></span></span></span></span><span class="vlist-s">​</span></span><span
                        class="vlist-r"><span class="vlist" style="height:0.19444em;"><span></span></span></span></span></span><span
                        class="mopen">(</span><span class="mord mathdefault"
                                                    style="margin-right:0.07847em;">X</span><span
                        class="mpunct">,</span><span class="mspace"
                                                     style="margin-right:0.16666666666666666em;"></span><span
                        class="mord mathdefault" style="margin-right:0.22222em;">Y</span><span
                        class="mclose">)</span></span></span></span></span></span><span
                        class="c-4 empty-char-index"> </span></span></span></span></span></span></div>
                    <div class="line section-2" id="L5deb1491e27558000042e43f" style="">
                      <div class="telomere desktop-telomere"><a href="#5deb1491e27558000042e43f" class="telomere-border"
                                                                tabindex="-1"
                                                                style="border-width: 0px 0px 0px 10px;"></a></div>
                      <span class="text"><span><span class="c-0"><br class="empty-char-index"></span></span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="related-page-list clearfix">
            <div class="page-sort-menu">
              <div class="splitter"></div>
            </div>
            <ul class="grid">
              <li class="splitter"></li>
              <li class="relation-label empty-links"><a><span class="title">New Links</span><span
                class="kamon kamon-link-off icon-lg"></span></a><span class="arrow"></span></li>
              <li class="page-list-item grid-style-item empty"><a href="/koumatsumoto/%E3%82%BF%E3%82%B01" rel="route">
                <div class="hover"></div>
                <div class="content">
                  <div class="header">
                    <div class="title">タグ1</div>
                  </div>
                  <div class="description">
                    <div class="line-img">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </a></li>
              <li class="page-list-item grid-style-item empty"><a
                href="/koumatsumoto/%E3%82%B7%E3%83%B3%E3%83%9C%E3%83%AB1" rel="route">
                <div class="hover"></div>
                <div class="content">
                  <div class="header">
                    <div class="title">シンボル1</div>
                  </div>
                  <div class="description">
                    <div class="line-img">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </a></li>
              <li class="page-list-item grid-style-item empty"><a href="/koumatsumoto/%E3%82%BF%E3%82%B02" rel="route">
                <div class="hover"></div>
                <div class="content">
                  <div class="header">
                    <div class="title">タグ2</div>
                  </div>
                  <div class="description">
                    <div class="line-img">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </a></li>
              <li class="page-list-item grid-style-item empty"><a
                href="/koumatsumoto/%E3%82%B7%E3%83%B3%E3%83%9C%E3%83%AB2" rel="route">
                <div class="hover"></div>
                <div class="content">
                  <div class="header">
                    <div class="title">シンボル2</div>
                  </div>
                  <div class="description">
                    <div class="line-img">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </a></li>
              <li class="page-list-item grid-style-item empty"><a
                href="/koumatsumoto/%E3%82%B7%E3%83%B3%E3%83%9C%E3%83%AB3" rel="route">
                <div class="hover"></div>
                <div class="content">
                  <div class="header">
                    <div class="title">シンボル3</div>
                  </div>
                  <div class="description">
                    <div class="line-img">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-page-side">
        <div class="page-menu">
          <div class="dropdown"><a class="tool-btn dropdown-toggle" type="button" id="page-info-menu"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><i
            class="kamon kamon-info-circle"></i></a>
            <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="page-info-menu">
              <li class="">
                <div>created <span class="date-label relative" title="2019/12/7 11:54:10">13 minutes ago</span><br>updated
                  <span class="date-label relative" title="2019/12/7 12:06:12">a minute ago</span></div>
              </li>
              <li class="">
                <div>by&nbsp;<span class="creator"><span><a class="link icon" rel="route" href="/koumatsumoto/kou"><img
                  class="icon" alt="kou" title="kou" src="/api/pages/koumatsumoto/kou/icon"></a></span></span></div>
              </li>
              <li role="separator" class="divider"></li>
              <li class="">
                <div><p>views: 1</p></div>
              </li>
            </ul>
          </div>
          <div class="dropdown"><a class="tool-btn dropdown-toggle" type="button" id="page-edit-menu"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><i
            class="kamon kamon-document"></i></a>
            <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="page-edit-menu">
              <li class=""><a tabindex="0" role="menuitem">Copy link</a></li>
              <li class=""><a tabindex="0" role="menuitem">Copy link for twitter</a></li>
              <li class=""><a tabindex="0" role="menuitem">Start presentation</a></li>
              <li class=""><a tabindex="0" role="menuitem" title="Hide dots">Hide dots</a></li>
              <li class=""><a tabindex="0" role="menuitem">Drawing</a></li>
              <li class=""><a tabindex="0" role="menuitem">Duplicate this page</a></li>
              <li class=""><a tabindex="0" role="menuitem">Pin at home</a></li>
              <li class="disabled"><a tabindex="-1" disabled="" role="menuitem">History is not created</a></li>
              <li role="separator" class="divider"></li>
              <li class=""><a tabindex="0" role="menuitem" title="Delete"><i class="kamon kamon-trash"></i> Delete this
                page</a></li>
            </ul>
          </div>
          <a class="random-jump-button tool-btn link-btn" type="button"
             href="/koumatsumoto/%E7%9B%B8%E4%BA%92%E8%AA%8D%E8%AD%98"><i class="kamon kamon-switch"></i></a></div>
      </div>
    </div>
    <div class="row-flex" style="display: none;">
      <div class="col-page-side"></div>
      <div class="col-page"></div>
      <div class="col-page-side"></div>
    </div>
    <div class="status-bar"></div>
    <link rel="stylesheet" href="/assets/css/themes/winter.css">
    <link rel="stylesheet" href="/api/code/koumatsumoto/settings/style.css">
    <link rel="stylesheet" href="/api/code/koumatsumoto/kou/style.css">
  </div>
</div>
`;
