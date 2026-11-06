/* ===== 検索：生物から探す／特徴から探す ===== */
(function(){
const App = window.App;
const box = () => App.$("#search");
const kata2hira = s => s.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
const norm = s => kata2hira(String(s||"").toLowerCase().normalize("NFKC")).replace(/\s+/g,"");
const GROUP = {bacteria:"細菌",archaea:"古細菌",opisthokonta:"オピストコンタ",amoebozoa:"アメーボゾア",archaeplastida:"アーケプラスチダ",tsar:"TSAR",discoba:"ディスコバ"};

/* 特徴の定義。p:門ID（値＝なぜ当てはまるか）、o:生物ID */
function coelomTrait(type, label){
  const P = {};
  App.data.phyla.filter(p => p.coelom === type).forEach(p => {
    P[p.id] = ({mollusca:"真体腔（囲心腔などに小さくなっている）",arthropoda:"真体腔（大部分は血体腔に置き換わる）",nematoda:"偽体腔（偽体腔は系統のまとまりではない）"})[p.id] || label;
  });
  return P;
}
function protoDeutero(kind){
  const P = {};
  App.data.phyla.filter(p => p.mouth === kind).forEach(p => P[p.id] = (kind==="proto"?"旧口動物の典型（例外あり）":"新口動物の典型（例外あり）"));
  return P;
}
let TRAITS = null;
function traits(){
  if(TRAITS) return TRAITS;
  TRAITS = [
    {id:"seg",ja:"体節がある",p:{annelida:"同じつくりの体節がくり返す",arthropoda:"体節が合わさって頭・胸・腹などになる",chordata:"筋節がくり返す（体節的な構造。教科書の扱いは要確認）"},note:"環形動物と節足動物は、どちらも体節をもつが系統は離れている。"},
    {id:"exo",ja:"外骨格をもつ",p:{arthropoda:"キチン質の外骨格"}},
    {id:"molt",ja:"脱皮する",p:{arthropoda:"外骨格を脱いで成長する（脱皮動物）",nematoda:"クチクラを脱いで成長する（脱皮動物）"}},
    {id:"wvs",ja:"水管系をもつ",p:{echinodermata:"水管系の液体の圧力で管足を動かす"}},
    {id:"noto",ja:"脊索をもつ",p:{chordata:"一生のどこかの時期に脊索をもつ（ホヤは幼生のみ）"}},
    {id:"flat",ja:"体が平たい",p:{platyhelminthes:"背腹に平たい体"}},
    {id:"cnido",ja:"刺胞をもつ",p:{cnidaria:"刺胞で獲物をとらえる"}},
    {id:"mantle",ja:"外套膜をもつ",p:{mollusca:"外套膜が内臓を包み、多くは殻を分泌する"}},
    {id:"acoel",ja:"体腔がない",p:coelomTrait("none","無体腔")},
    {id:"pseudo",ja:"偽体腔",p:coelomTrait("pseudo","偽体腔")},
    {id:"eucoel",ja:"真体腔",p:coelomTrait("true","真体腔")},
    {id:"radial",ja:"放射相称（成体）",p:{cnidaria:"基本は放射相称（イソギンチャク類には左右の軸がある）",echinodermata:"成体は五放射相称。幼生は左右相称"}},
    {id:"bilat",ja:"左右相称",p:{platyhelminthes:"左右相称",nematoda:"左右相称",annelida:"左右相称",mollusca:"左右相称（巻貝はねじれる）",arthropoda:"左右相称",chordata:"左右相称",echinodermata:"幼生のみ左右相称"}},
    {id:"proto",ja:"原口が口になる（典型）",p:protoDeutero("proto")},
    {id:"deutero",ja:"原口が肛門になる（典型）",p:protoDeutero("deutero")},
    {id:"noanus",ja:"肛門がない",p:{cnidaria:"口が1つだけ（胃腔）",platyhelminthes:"口が1つだけ（腸は枝分かれ）",porifera:"消化管そのものがない"}},
    {id:"photo",ja:"光合成をする",o:{cyanobacteria:"光合成をする細菌",kuramidomonas:"単細胞の緑藻",sakura:"陸上植物",asakusanori:"紅藻",keiso:"ケイ酸の殻をもつ藻類",midorimushi:"鞭毛で泳ぎながら光合成もする"}},
    {id:"flag",ja:"鞭毛で泳ぐ",o:{erikabemouchu:"1本の鞭毛",midorimushi:"1本の長い鞭毛",kuramidomonas:"2本の鞭毛",daichokin:"細菌の鞭毛（つくりは真核生物の鞭毛と異なる）"}},
    {id:"cilia",ja:"繊毛で泳ぐ",o:{zourimushi:"全身の繊毛"}}
  ];
  return TRAITS;
}
const picked = new Set();

function open(){ box().classList.add("open"); box().setAttribute("aria-hidden","false"); App.$("#searchInput").value=""; run(""); setTimeout(() => { if(currentTab()==="name") App.$("#searchInput").focus(); }, 20); }
function close(){ box().classList.remove("open"); box().setAttribute("aria-hidden","true"); }
const currentTab = () => App.$(".search-tabs .on").dataset.tab;

function runTrait(){
  const res = App.$("#searchResults");
  const T = traits();
  let html = `<div class="trait-chips" role="group" aria-label="特徴">${T.map(t => `<button class="chip ${picked.has(t.id)?"on":""}" data-trait="${t.id}" aria-pressed="${picked.has(t.id)}">${t.ja}</button>`).join("")}</div>`;
  if(!picked.size){ res.innerHTML = html + `<p class="muted small" style="padding:4px 8px">特徴を選ぶと、当てはまる門・生物が出る。複数選ぶと、すべてに当てはまるものに絞り込む。</p>`; return; }
  const sel = T.filter(t => picked.has(t.id));
  let keys = null;
  sel.forEach(t => {
    const k = new Set([...Object.keys(t.p||{}).map(x => "p:"+x), ...Object.keys(t.o||{}).map(x => "o:"+x)]);
    keys = keys ? new Set([...keys].filter(x => k.has(x))) : k;
  });
  const items = [...keys];
  const why = key => { const [kind, id] = key.split(":"); return sel.map(t => (kind==="p"? (t.p||{})[id] : (t.o||{})[id])).filter(Boolean).join("／"); };
  html += items.length ? items.map(key => {
    const [kind, id] = key.split(":");
    if(kind === "p"){
      const p = App.phylum(id);
      return `<a class="sr-item" href="#/atlas/${id}" data-close="1"><div class="sr-thumb">${App.imgTag(p.lead)}</div>
        <div><b>${p.ja}</b> <span class="muted small">代表：${p.reps.map(r => App.org(r).ja).join("・")}</span><br><span class="small">${App.esc(why(key))}</span></div><span class="small">→ 図鑑</span></a>`;
    }
    const o = App.org(id);
    return `<div class="sr-item" data-id="${id}"><div class="sr-thumb">${App.imgTag(id)}</div>
      <div><b>${o.ja}</b> <span class="muted small">${GROUP[o.group]||""}</span><br><span class="small">${App.esc(why(key))}</span></div><span class="small">→ 詳細</span></div>`;
  }).join("") : `<p class="muted" style="padding:8px">すべての特徴に当てはまるものはない。</p>`;
  const notes = sel.map(t => t.note).filter(Boolean);
  if(notes.length) html += `<p class="note-wrong small" style="margin:10px 4px">${notes.join("<br>")}</p>`;
  res.innerHTML = html;
}

function run(q){
  const res = App.$("#searchResults");
  const input = App.$("#searchInput");
  if(currentTab() === "trait"){ input.style.display = "none"; runTrait(); return; }
  input.style.display = "";
  const nq = norm(q);
  const list = Object.entries(App.data.organisms).filter(([id,o]) => !nq ||
    [o.ja, o.kana, o.sci, ...(o.alias||[])].some(s => norm(s).includes(nq)));
  res.innerHTML = list.slice(0, 30).map(([id,o]) => {
    const p = o.phylum ? App.phylum(o.phylum) : null;
    const where = p ? `${p.ja}門` : GROUP[o.group];
    return `<div class="sr-item" data-id="${id}"><div class="sr-thumb">${App.imgTag(id)}</div>
      <div><b>${o.ja}</b>${o.alias?` <span class="muted small">（${o.alias.join("・")}）</span>`:""}<br><span class="sci small muted">${o.sci}</span></div>
      <span class="small">→ ${where}</span></div>`;
  }).join("") || `<p class="muted" style="padding:8px">見つかりません。</p>`;
}

const init = () => {
  App.$("#searchBtn").addEventListener("click", open);
  box().addEventListener("click", e => { if(e.target === box()) close(); });
  document.addEventListener("keydown", e => {
    if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==="k"){ e.preventDefault(); open(); }
    if(e.key==="Escape") close();
  });
  App.$("#searchInput").addEventListener("input", e => run(e.target.value));
  App.$$(".search-tabs button").forEach(b => b.addEventListener("click", () => {
    App.$$(".search-tabs button").forEach(x => x.classList.toggle("on", x===b)); run(App.$("#searchInput").value);
  }));
  App.$("#searchResults").addEventListener("click", e => {
    const chip = e.target.closest("[data-trait]");
    if(chip){ const id = chip.dataset.trait; picked.has(id) ? picked.delete(id) : picked.add(id); runTrait(); return; }
    const a = e.target.closest("[data-close]");
    if(a){ close(); return; }
    const it = e.target.closest(".sr-item[data-id]"); if(!it) return;
    close(); App.drawer.open(App.organismCard(it.dataset.id));
  });
};
const s0 = App.start;
App.start = () => { init(); s0(); };
})();
