/* ===== P03 動物の分類図鑑：一覧 ===== */
(function(){
const App = window.App;
const L = () => App.data.labels;

const MODES = {
  tree:{label:"系統樹の順", groups:[
      {key:"base", title:"左右相称動物の外側", note:"最初の分岐は未解決（海綿動物先行説・有櫛動物先行説）", ids:["porifera","cnidaria"], debate:true},
      {key:"ecd", title:"旧口動物 ― 脱皮動物", ids:["nematoda","arthropoda"]},
      {key:"lop", title:"旧口動物 ― 冠輪動物", note:"門どうしの分岐順は未解決", ids:["platyhelminthes","annelida","mollusca"]},
      {key:"deu", title:"新口動物", ids:["echinodermata","chordata"]}]},
  coelom:{label:"体腔", groups:[
      {key:"na", title:"胚葉の分化なし", ids:p=>p.coelom==="na"},
      {key:"none", title:"無体腔", ids:p=>p.coelom==="none"},
      {key:"pseudo", title:"偽体腔", note:"偽体腔は系統のまとまりではない（多系統）", ids:p=>p.coelom==="pseudo"},
      {key:"true", title:"真体腔", note:"軟体動物・節足動物では体腔が小さくなっている", ids:p=>p.coelom==="true"}]},
  sym:{label:"対称性", groups:[
      {key:"asym", title:"非相称（多く）", ids:p=>p.sym==="asym"},
      {key:"radial", title:"放射相称", note:"刺胞動物でもイソギンチャク類には左右の軸がある", ids:p=>p.sym==="radial"},
      {key:"penta", title:"五放射相称（成体）", note:"幼生は左右相称。二次的な放射相称", ids:p=>p.sym==="penta"},
      {key:"bilateral", title:"左右相称", ids:p=>p.sym==="bilateral"}]}
};

function card(p){
  const o = App.org(p.lead);
  return `<a class="specimen" href="#/atlas/${p.id}" data-id="${p.id}" style="--pc:var(--c-${p.id})">
    <div class="specimen-fig lighttable">${App.imgTag(p.lead)}</div>
    <div class="specimen-label">
      <h3>${p.ja}<span>門</span></h3>
      <p class="sci">${p.en}</p>
      <p class="specimen-rep">代表：${o.ja}</p>
      <ul class="facts">
        <li>${L().coelom[p.coelom]}</li><li>${L().sym[p.sym].replace("（成体）","")}</li><li>${p.mouth==="na"?"—":L().mouth[p.mouth].replace(/（.*）/,"")}</li>
      </ul>
    </div>
    ${p.detail?"":`<span class="badge b-check soon">詳細は制作中</span>`}
  </a>`;
}

function render(box, mode){
  // FLIP：並べ替え前の位置を記録
  const before = {};
  App.$$(".specimen", box).forEach(e => before[e.dataset.id] = e.getBoundingClientRect());
  const phyla = App.data.phyla;
  box.innerHTML = MODES[mode].groups.map(g => {
    const list = typeof g.ids === "function" ? phyla.filter(g.ids) : g.ids.map(App.phylum);
    if(!list.length) return "";
    return `<section class="atlas-group">
      <header><h2>${g.title}${g.debate?' <span class="badge b-debate">議論中</span>':''}</h2>${g.note?`<p class="muted small">${g.note}</p>`:""}</header>
      <div class="specimen-row">${list.map(card).join("")}</div>
    </section>`;
  }).join("");
  if(App.reduced()) return;
  App.$$(".specimen", box).forEach(e => {
    const b = before[e.dataset.id]; if(!b) return;
    const a = e.getBoundingClientRect();
    const dx = b.left - a.left, dy = b.top - a.top;
    if(!dx && !dy) return;
    e.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:"none"}], {duration:650, easing:"cubic-bezier(.22,.7,.2,1)"});
  });
}

App.pages.atlas = {
  mount(view){
    const mode = App.store.get("atlasMode","tree");
    view.innerHTML = `
    <section class="page-head wrap">
      <p class="eyebrow">Animal Atlas</p>
      <h1>動物の分類図鑑</h1>
      <p class="lead">高校生物で扱う9つの門を、標本箱の引き出しのように並べた。図版を選ぶと、その門の体のつくり・発生・系統上の位置が開く。</p>
      <div class="seg" role="group" aria-label="並べ方">
        <span class="muted small">並べ方</span>
        ${Object.entries(MODES).map(([k,m]) => `<button data-mode="${k}" aria-pressed="${k===mode}">${m.label}</button>`).join("")}
      </div>
    </section>
    <div class="wrap"><div id="atlasBox" class="atlas-box"></div></div>
    <p class="wrap muted small atlas-foot">並べ方を変えても、生物は同じ。体腔や対称性でまとめたグループは、系統のまとまりとは一致しない。</p>`;
    const box = App.$("#atlasBox");
    render(box, mode);
    App.$$(".seg button", view).forEach(b => b.addEventListener("click", () => {
      App.$$(".seg button", view).forEach(x => x.setAttribute("aria-pressed", String(x===b)));
      App.store.set("atlasMode", b.dataset.mode);
      render(box, b.dataset.mode);
    }));
  }
};
})();
