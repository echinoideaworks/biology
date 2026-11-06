/* ===== 制作予定のページ ===== */
(function(){
const App = window.App;
const INFO = {
  history:["分類体系の歴史","STEP 6","同じ16種類の生物を置いたまま、二界説・三界説・五界説・三ドメイン説・スーパーグループの順に「境界線」だけが組み替わる。スーパーグループの段階では真核生物の円の中へズームし、階層の違いを示す。","midorimushi"],
  tree:["系統樹を探索する","STEP 5","動物の系統樹を拡大・移動して探索する。分岐点（共通祖先）の選択、枝の回転、旧口／新口・脱皮／冠輪・体腔・体節の強調、最初の分岐の仮説の切り替え。","kabutomushi"],
  compare:["体のつくりを比べる","STEP 7","同じ縮尺・同じ向きの断面図を並べ、体腔・消化管・体節などの層を同時に光らせて比べる。","mimizu"],
  eukaryotes:["真核生物の図鑑","STEP 6","スーパーグループの地図と、顕微鏡の視野に置いた微生物の図版。大きさの比較スライダー付き。","hoshachu"],
  about:["出典と凡例","STEP 8","すべての出典・画像のクレジット・採用した分類体系・要確認事項の一覧。","keiso"]
};
App.pages.stub = {
  mount(view, r){
    const i = INFO[r.name] || ["ページが見つかりません","","",null];
    view.innerHTML = `<section class="wrap page-head stub">
      <p class="eyebrow">${i[1]} で制作</p>
      <h1>${i[0]}</h1>
      <p class="lead">${i[2]}</p>
      ${i[3]?`<div class="stub-fig lighttable">${App.imgTag(i[3])}</div>`:""}
      <p class="btn-row"><a class="btn primary" href="#/">全体像へ戻る</a><a class="btn" href="#/atlas/echinodermata">試作：棘皮動物のページ</a></p>
    </section>`;
  }
};
})();
