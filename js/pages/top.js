/* ===== P01 進化と分類の全体像 ===== */
(function(){
const App = window.App;
let tree = null, pairMode = false, picked = [];

function nodeCard(n){
  const kids = (n.ch||[]).map(c => c.tip ? (App.org(c.tip)||{}).ja : c.ja).filter(Boolean);
  return `
    <p class="eyebrow">分岐点 ＝ 共通祖先</p>
    <h2>${App.esc(n.ja)}${n.en?` <span class="sci muted" style="font-size:.6em">${n.en}</span>`:""}</h2>
    ${n.poly ? `<p><span class="badge b-debate">内部の分岐順は未解決</span></p>`:""}
    <p>${n.note || ""} ${App.srcLinks(n.src||[])}</p>
    <h3 class="drawer-h3">ここから分かれたもの</h3>
    <ul class="kid-list">${kids.map(k => `<li>${App.esc(k)}</li>`).join("")}</ul>
    <p class="muted small">分岐点は、すでにいない「過去の祖先」を表す。いま生きているどの生物とも同じではない。<span class="src" data-src="P41">P41</span></p>
    <div class="btn-row">${n.animals||App.Tree.ancestors(n).some(a=>a.animals) ? `<a class="btn primary" href="#/tree?focus=${n.id||""}">系統樹ページで探索</a>`:""}</div>`;
}

function onTip(id, leaf){
  if(pairMode){
    if(picked.length === 2) picked = [];
    picked.push(leaf);
    const m = tree.pair(picked[0], picked[1]);
    updatePairBox(m);
    return;
  }
  App.drawer.open(App.organismCard(id));
  const t = tree.svg.querySelector(`.tip[data-tip="${id}"]`);
  App.$$(".tip.sel", tree.svg).forEach(e => e.classList.remove("sel")); t && t.classList.add("sel");
}

function updatePairBox(m){
  const box = App.$("#pairBox");
  const names = picked.map(l => App.org(l.tip).ja);
  if(picked.length < 2){
    box.innerHTML = picked.length ? `<b>${names[0]}</b> を選びました。もう1つ選んでください。` : `生物を2つ選ぶと、その<b>共通祖先</b>（分岐点）が光ります。`;
    return;
  }
  box.innerHTML = `<b>${names[0]}</b> と <b>${names[1]}</b> の共通祖先は<br><span class="mrca-name">${App.esc(m.ja)}</span>
    <button class="btn" id="pairNode">この分岐点について</button>`;
  App.$("#pairNode").onclick = () => App.drawer.open(nodeCard(m));
}

App.pages.top = {
  mount(view){
    view.innerHTML = `
    <section class="hero">
      <div class="hero-text">
        <p class="eyebrow">Evolution &amp; Classification</p>
        <h1>すべての生物は、<br>ひとつの祖先から枝分かれした。</h1>
        <p class="lead">細菌もキノコもヒトデも、たどればひとつの共通祖先に行き着く。<br>枝の先の生物を選ぶと、その生物の図鑑が開く。分岐点を選ぶと、そこで分かれた祖先について読める。</p>
        <div class="hero-tools">
          <button class="btn" id="pairToggle" aria-pressed="false">2つの生物の共通祖先をさがす</button>
          <button class="btn" id="regrow">もう一度、枝を伸ばす</button>
          <button class="btn" id="fullTree">⤢ 拡大して探索</button>
        </div>
        <div class="pair-box" id="pairBox" hidden></div>
        <ul class="legend">
          <li><svg viewBox="0 0 40 10"><path d="M2 5H38" stroke="var(--tree)" stroke-width="2.4"/></svg>系統関係（枝の長さに意味はない）</li>
          <li><svg viewBox="0 0 40 14"><circle cx="20" cy="7" r="4.5" fill="var(--paper)" stroke="var(--st-debate)" stroke-width="1.6"/></svg>白抜きの分岐点：内部の分岐順が未解決（くし状）</li>
          <li><svg viewBox="0 0 40 10"><path d="M2 5H38" stroke="var(--ink-3)" stroke-width="2" stroke-dasharray="4 4"/></svg>点線：議論中の関係</li>
        </ul>
        <p class="muted small">左右・上下の並びには意味がない。中心が過去、外側の生物はすべて現在の生物。<span class="src" data-src="P41">P41</span></p>
      </div>
      <div class="hero-tree lighttable" id="lifeTree">
        <div class="pz-bar" aria-label="拡大・移動">
          <span class="pz-hint">ドラッグで移動・2本指で拡大</span>
          <button class="pz-btn" data-pz="in" aria-label="拡大">＋</button>
          <button class="pz-btn" data-pz="out" aria-label="縮小">−</button>
          <button class="pz-btn" data-pz="reset" aria-label="全体を表示">⟲</button>
          <button class="pz-btn pz-close" data-pz="close" aria-label="拡大表示を閉じる">×</button>
        </div>
      </div>
    </section>

    <section class="intro wrap">
      <div class="intro-grid">
        <article class="intro-item">
          <p class="num">01</p>
          <h2>共通祖先をたどる</h2>
          <p>系統樹の分岐点は、2つの系統が分かれたときの<b>共通祖先</b>。近い親戚かどうかは、どれだけ最近の共通祖先を共有しているかで決まる。図の上で隣にあるかどうかでは決まらない。<span class="src" data-src="P41">P41</span></p>
          <p class="note-wrong">「ヒトはチンパンジーから進化した」は誤り。両者は共通祖先から分かれた、いとこのような関係。<span class="src" data-src="U4">U4</span></p>
        </article>
        <article class="intro-item">
          <p class="num">02</p>
          <h2>分類と系統は同じではない</h2>
          <p>「界」や「門」は人がまとまりに付けた名前で、時代ごとに目的も基準も違った。五界説は栄養のとり方と細胞のつくりで生物を整理し、三ドメイン説はrRNAの配列から系統を区分した。どちらかが一方を「正した」というより、目的の異なる提案である。</p>
          <p class="btn-row"><a class="btn" href="#/history">分類体系の歴史へ</a></p>
        </article>
        <article class="intro-item">
          <p class="num">03</p>
          <h2>見た目の似かたは、近さとは限らない</h2>
          <p>ヒトデとクラゲはどちらも放射状の体だが、ヒトデはヒトと同じ<b>新口動物</b>。ミミズとカブトムシはどちらも体節をもつが、属する系統は離れている。</p>
          <p class="btn-row"><a class="btn" href="#/atlas">動物図鑑を開く</a></p>
        </article>
      </div>
    </section>

    <section class="doors wrap">
      <h2 class="doors-h">探索をはじめる</h2>
      <div class="door-grid">
        ${[
          ["#/atlas","動物の分類図鑑","9つの門を、大きな図版と体のつくりで見る","mahitode",true],
          ["#/tree","系統樹を探索する","拡大・移動し、分岐点を選んで調べる","kabutomushi",true],
          ["#/compare","体のつくりを比べる","断面を並べ、体腔や体節の違いを見る","mimizu",true],
          ["#/history","分類体系の歴史","二界説からスーパーグループまで","midorimushi",true],
          ["#/eukaryotes","真核生物の図鑑","顕微鏡の中の多様な生物","hoshachu",true],
          ["#/about","出典と凡例","資料・画像の出典と、この教材の方針","keiso",true]
        ].map(([href,t,s,img,ready]) => `
          <a class="door" href="${href}">
            <div class="door-fig lighttable">${App.imgTag(img)}</div>
            <div><h3>${t}</h3><p>${s}</p>${ready?"":`<span class="badge b-check">制作予定</span>`}</div>
          </a>`).join("")}
      </div>
    </section>`;

    tree = App.Tree.radial(App.$("#lifeTree"), App.data.lifeTree, {
      onTip,
      onNode: n => { if(pairMode) return; App.drawer.open(nodeCard(n)); }
    });
    // 画面に入ったら枝を伸ばす
    const io = new IntersectionObserver(es => { if(es[0].isIntersecting){ tree.grow(); io.disconnect(); } }, {threshold:.2});
    io.observe(tree.svg);

    /* 拡大して探索（タッチ端末では2本指で拡大・1本指で移動） */
    const pz = App.Tree.panZoom(tree.svg, {min:.9, max:5});
    const box = App.$("#lifeTree");
    const setFull = on => {
      box.classList.toggle("full", on); document.body.classList.toggle("no-scroll", on);
      pz.enable(on); if(!on) pz.reset();
    };
    App.$("#fullTree").onclick = () => setFull(true);
    App.$$(".pz-btn", box).forEach(b => b.onclick = () => {
      const a = b.dataset.pz;
      if(a === "in") pz.zoom(1.4); else if(a === "out") pz.zoom(1/1.4); else if(a === "reset") pz.reset(); else setFull(false);
    });
    this._full = setFull;
    App.$("#regrow").onclick = () => {
      tree.svg.classList.remove("grown","growing"); void tree.svg.getBoundingClientRect(); tree.grow();
    };
    App.$("#pairToggle").onclick = e => {
      pairMode = !pairMode; picked = [];
      e.currentTarget.setAttribute("aria-pressed", pairMode);
      e.currentTarget.classList.toggle("primary", pairMode);
      App.$("#pairBox").hidden = !pairMode;
      tree.pair(null, null);
      updatePairBox();
    };
    this._close = () => App.$$(".tip.sel", tree.svg).forEach(e => e.classList.remove("sel"));
    document.addEventListener("drawerclose", this._close);
  },
  unmount(){ document.removeEventListener("drawerclose", this._close); pairMode = false; picked = []; this._full && this._full(false); }
};
})();
