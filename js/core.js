/* ===== 共通：ルーター・ドロワー・表示レベル・小道具 ===== */
(function(){
const App = window.App;
App.pages = App.pages || {};

/* ---------- 小道具 ---------- */
App.$ = (s, r=document) => r.querySelector(s);
App.$$ = (s, r=document) => Array.from(r.querySelectorAll(s));
App.esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
App.reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
App.store = {
  get(k, d){ try{ const v = localStorage.getItem("seimei:"+k); return v===null? d : JSON.parse(v); }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem("seimei:"+k, JSON.stringify(v)); }catch(e){} }
};
App.org = id => App.data.organisms[id];
App.phylum = id => App.data.phyla.find(p => p.id === id);

/* 図版：画像が未制作でも崩れない */
App.imgTag = (id, alt) => {
  const o = App.org(id);
  if(!o) return `<div class="ph">図版なし</div>`;
  return `<img src="${o.img}" alt="${App.esc(alt || o.ja)}" loading="lazy" onerror="this.outerHTML='<div class=&quot;ph&quot;>${App.esc(o.ja)}<br>図版制作中</div>'">`;
};

/* 出典リンク */
App.srcLinks = (ids=[]) => ids.map(id => {
  const s = App.data.sources[id];
  if(!s) return "";
  if(id === "CHK") return `<span class="badge b-check" title="${App.esc(s.full)}">出典確認中</span>`;
  return `<span class="src" data-src="${id}" title="${App.esc(s.short)}">${id}</span>`;
}).join("");

/* ---------- 表示レベル（基本／発展） ---------- */
function setLevel(lv){
  document.body.classList.toggle("show-adv", lv === "adv");
  App.$$(".level-switch button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.level === lv)));
  App.store.set("level", lv);
  document.dispatchEvent(new CustomEvent("levelchange", {detail:lv}));
}
App.level = () => document.body.classList.contains("show-adv") ? "adv" : "basic";

/* ---------- ドロワー ---------- */
const drawer = () => App.$("#drawer");
App.drawer = {
  open(html){
    App.$("#drawerBody").innerHTML = html;
    drawer().classList.add("open"); drawer().setAttribute("aria-hidden","false");
    if(window.innerWidth < 1100) App.$("#scrim").classList.add("on");
    drawer().scrollTop = 0;
  },
  close(){
    drawer().classList.remove("open"); drawer().setAttribute("aria-hidden","true");
    App.$("#scrim").classList.remove("on");
    document.dispatchEvent(new CustomEvent("drawerclose"));
  }
};

/* 生物の標本ラベル */
App.organismCard = (id) => {
  const o = App.org(id); if(!o) return "";
  const L = App.data.labels;
  const p = o.phylum ? App.phylum(o.phylum) : null;
  const where = p ? `動物界　${p.ja}門` :
    ({bacteria:"細菌ドメイン",archaea:"古細菌（アーキア）ドメイン",opisthokonta:"真核生物　オピストコンタ",amoebozoa:"真核生物　アメーボゾア",
      archaeplastida:"真核生物　アーケプラスチダ",tsar:"真核生物　TSAR",discoba:"真核生物　ディスコバ",haptista:"真核生物　ハプティスタ",cryptista:"真核生物　クリプティスタ",metamonada:"真核生物　メタモナダ"})[o.group] || "";
  const sci = `<span class="sci">${App.esc(o.sci)}</span>${o.sciCheck?' <span class="badge b-check" title="学名を最新の分類データベースで確認中">学名確認中</span>':''}`;
  const extra = p ? `
      <dt>体腔</dt><dd>${L.coelom[p.coelom]}</dd>
      <dt>対称性</dt><dd>${L.sym[p.sym]}</dd>
      <dt>発生</dt><dd>${L.mouth[p.mouth]}</dd>` : "";
  const goto = p
    ? `<a class="btn primary" href="#/atlas/${p.id}${p.reps.includes(id)?'?sp='+id:''}">図鑑で詳しく</a>`
    : `<a class="btn primary" href="#/eukaryotes">真核生物の図鑑</a>`;
  return `
    <div class="figure lighttable">${App.imgTag(id)}</div>
    <div class="label">
      <h2 class="label-title">${App.esc(o.ja)}</h2>
      <div class="label-sub">${sci}</div>
      <dl>
        <dt>所属</dt><dd>${where}</dd>${extra}
      </dl>
    </div>
    <p style="margin-top:16px">${App.esc(o.line)} ${App.srcLinks(o.src)}</p>
    <div class="btn-row">${goto}
      <a class="btn" href="#/tree?focus=${id}">系統樹で位置を見る</a>
    </div>`;
};

/* ---------- 出典ポップオーバー ---------- */
let pop;
function showSource(elm){
  const s = App.data.sources[elm.dataset.src]; if(!s) return;
  if(!pop){ pop = document.createElement("div"); pop.className = "src-pop"; document.body.appendChild(pop); }
  pop.innerHTML = `<b>${App.esc(elm.dataset.src)}</b>　${App.esc(s.full)}<br><span class="muted">確認度：${App.esc(s.conf)}</span>${s.url?`<br><a href="${s.url}" target="_blank" rel="noopener">${App.esc(s.url.length>60? s.url.slice(0,60)+"…":s.url)}</a>`:""}`;
  const r = elm.getBoundingClientRect();
  pop.style.left = Math.min(window.innerWidth-340, Math.max(8, r.left-20)) + "px";
  pop.style.top = (r.bottom + window.scrollY + 6) + "px";
  pop.classList.add("on");
}

/* ---------- ルーター ---------- */
App.route = { name:"", params:[], query:{} };
function parseHash(){
  const h = location.hash.replace(/^#\/?/, "");
  const [path, qs] = h.split("?");
  const parts = path.split("/").filter(Boolean);
  const query = {};
  (qs||"").split("&").filter(Boolean).forEach(kv => { const [k,v] = kv.split("="); query[k] = decodeURIComponent(v||""); });
  return { name: parts[0] || "top", params: parts.slice(1), query };
}
let current = null;
function render(){
  const r = parseHash();
  const view = App.$("#view");
  if(current && current.unmount) current.unmount();
  App.drawer.close();
  App.route = r;
  let page = App.pages[r.name];
  if(r.name === "atlas" && r.params[0]) page = App.pages.phylum;
  if(!page) page = App.pages.stub;
  App.$$(".site-nav a").forEach(a => a.classList.toggle("on", a.dataset.nav === r.name));
  view.innerHTML = "";
  view.className = "view view-" + r.name;
  current = page;
  page.mount(view, r);
  window.scrollTo(0,0);
}

App.start = () => {
  setLevel(App.store.get("level","basic"));
  App.$$(".level-switch button").forEach(b => b.addEventListener("click", () => setLevel(b.dataset.level)));
  App.$("#drawerClose").addEventListener("click", App.drawer.close);
  App.$("#scrim").addEventListener("click", App.drawer.close);
  document.addEventListener("keydown", e => { if(e.key === "Escape") App.drawer.close(); });
  document.addEventListener("click", e => {
    const s = e.target.closest(".src[data-src]");
    if(s){ e.preventDefault(); showSource(s); return; }
    if(pop && !e.target.closest(".src-pop")) pop.classList.remove("on");
    const g = e.target.closest("[data-goto]");
    if(g){ location.hash = g.dataset.goto; }
  });
  window.addEventListener("hashchange", render);
  render();
};
})();
