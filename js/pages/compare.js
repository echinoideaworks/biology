/* ===== P05 体のつくりを比べる ===== */
(function(){
const App = window.App;
const LAYERS = [["body","体の形・体壁"],["coelom","体腔"],["gut","消化管"],["nerve","神経"],["support","骨格・支持"],["special","特徴的な器官"]];

function mrcaName(a, b){
  const metazoa = App.Tree.find(App.data.lifeTree, n => n.animals);
  if(!metazoa) return null;
  App.Tree.prepare(metazoa);
  const la = App.Tree.find(metazoa, n => n.phylum === a), lb = App.Tree.find(metazoa, n => n.phylum === b);
  if(!la || !lb) return null;
  return App.Tree.mrca(la, lb);
}

function fig(id){
  const p = App.phylum(id), C = App.data.compare;
  return `<figure class="cmp-fig" style="--pc:var(--c-${id})">
    <figcaption><span class="cmp-thumb">${App.imgTag(p.lead)}</span><span><b>${p.ja}</b><br><span class="muted small">${App.org(p.lead).ja}の横断面（模式）</span></span></figcaption>
    <div class="cmp-svgbox lighttable"><svg viewBox="0 0 260 220" role="img" aria-label="${p.ja}の横断面">${C.sections[id]}</svg>
      <span class="cmp-dorsal">背側</span><span class="cmp-ventral">腹側</span></div>
    <p class="cmp-note">${C.info[id].note}</p>
  </figure>`;
}

function rows(a, b){
  const pa = App.phylum(a), pb = App.phylum(b), ia = App.data.compare.info[a], ib = App.data.compare.info[b], L = App.data.labels;
  const metazoaClade = p => p.clade === "na" ? "左右相称動物の外側" : L.clade[p.clade];
  return [
    ["体腔","coelom",L.coelom[pa.coelom],L.coelom[pb.coelom]],
    ["消化管","gut",ia.gut,ib.gut],
    ["体節","body",ia.seg,ib.seg],
    ["対称性","body",L.sym[pa.sym],L.sym[pb.sym]],
    ["胚葉","body",pa.layers,pb.layers],
    ["神経","nerve",ia.nerve,ib.nerve],
    ["骨格・支持","support",ia.support,ib.support],
    ["特徴的な器官","special",ia.special,ib.special],
    ["発生","",L.mouth[pa.mouth],L.mouth[pb.mouth]],
    ["系統","",metazoaClade(pa),metazoaClade(pb)]
  ];
}

App.pages.compare = {
  mount(view, r){
    const ids = App.data.phyla.map(p => p.id);
    let a = ids.includes(r.params[0]) ? r.params[0] : "platyhelminthes";
    let b = ids.includes(r.params[1]) ? r.params[1] : "nematoda";
    const C = App.data.compare;
    const opt = sel => App.data.phyla.map(p => `<option value="${p.id}" ${p.id===sel?"selected":""}>${p.ja}</option>`).join("");

    view.innerHTML = `
    <section class="page-head wrap">
      <p class="eyebrow">Compare Body Plans</p>
      <h1>体のつくりを比べる</h1>
      <p class="lead">2つの門の横断面を、同じ縮尺・同じ向き（背側が上）で並べた。層を選ぶと、両方の図の同じ部分だけが色付きになる。</p>
      <div class="cmp-presets" role="group" aria-label="比べる組み合わせ">
        ${C.presets.map(([x,y]) => `<button class="chip cmp-chip" data-a="${x}" data-b="${y}">${App.phylum(x).ja.replace("動物","")} × ${App.phylum(y).ja.replace("動物","")}</button>`).join("")}
      </div>
      <div class="cmp-custom">
        <label>自由に選ぶ <select id="cmpA">${opt(a)}</select></label>
        <span>×</span>
        <select id="cmpB" aria-label="比べる相手">${opt(b)}</select>
      </div>
    </section>
    <div class="wrap">
      <p class="cmp-point" id="cmpPoint"></p>
      <div class="cmp-figs" id="cmpFigs"></div>
      <div class="cmp-layers" role="group" aria-label="色付きにする層">
        <span class="muted small">層</span>
        <button class="sheet" data-l="" aria-pressed="true">すべて</button>
        ${LAYERS.map(([k,j]) => `<button class="sheet" data-l="${k}" aria-pressed="false"><i class="ly-${k}"></i>${j}</button>`).join("")}
      </div>
      <div class="table-scroll"><table class="cmp cmp-table" id="cmpTable"></table></div>
      <div class="cmp-mrca" id="cmpMrca"></div>

      <section class="coel-view">
        <h2>体腔の3つの型</h2>
        <p class="muted">体壁（中胚葉）と消化管の間の空間に注目。<span class="badge b-basic">基本</span></p>
        <div class="coel-grid">
          ${[["platyhelminthes","無体腔","体壁と消化管の間が組織で埋まり、空間がない。"],["nematoda","偽体腔","空間はあるが、中胚葉由来の体腔上皮に完全には囲まれていない。"],["annelida","真体腔","中胚葉由来の上皮に囲まれた空間。"]].map(([id,t,d]) => `
            <figure class="coel-fig">
              <div class="cmp-svgbox lighttable only-coelom"><svg viewBox="0 0 260 220" role="img" aria-label="${t}">${C.sections[id]}</svg></div>
              <figcaption><b>${t}</b>　<span class="muted small">例：${App.phylum(id).ja}</span><br>${d}</figcaption>
            </figure>`).join("")}
        </div>
        <p class="note-wrong"><b>注意</b>　「偽体腔動物」は系統のまとまりではない（多系統）。線形動物は脱皮動物、輪形動物は別の系統に属する。体腔の型は、体のつくりの分類であって系統の分類ではない。</p>
      </section>
    </div>`;

    const figs = App.$("#cmpFigs");
    let layer = "";
    function setLayer(l){
      layer = l;
      if(l) figs.dataset.on = l; else delete figs.dataset.on;
      App.$$(".cmp-layers .sheet").forEach(x => x.setAttribute("aria-pressed", String(x.dataset.l === l)));
      App.$$("#cmpTable tr[data-l]").forEach(tr => tr.classList.toggle("on", !!l && tr.dataset.l === l));
    }
    function draw(){
      figs.innerHTML = fig(a) + fig(b);
      App.$("#cmpA").value = a; App.$("#cmpB").value = b;
      const pre = C.presets.find(([x,y]) => (x===a&&y===b)||(x===b&&y===a));
      App.$("#cmpPoint").innerHTML = pre ? `<b>見どころ</b>　${pre[2]}` : "";
      App.$("#cmpPoint").hidden = !pre;
      App.$$(".cmp-chip").forEach(c => c.classList.toggle("on", (c.dataset.a===a&&c.dataset.b===b)));
      const pa = App.phylum(a), pb = App.phylum(b);
      App.$("#cmpTable").innerHTML = `<tr><th>項目</th><th>${pa.ja}</th><th>${pb.ja}</th></tr>` +
        rows(a,b).map(([k,l,x,y]) => `<tr ${l?`data-l="${l}"`:""} class="${x!==y?"diff":"same"}"><th>${k}${l?' <span class="tap-hint">▸</span>':""}</th><td>${x}</td><td>${y}</td></tr>`).join("");
      App.$$("#cmpTable tr[data-l]").forEach(tr => tr.addEventListener("click", () => setLayer(layer === tr.dataset.l ? "" : tr.dataset.l)));
      const m = a === b ? null : mrcaName(a, b);
      App.$("#cmpMrca").innerHTML = m ? `<h3>2つの共通祖先</h3>
        <p><b>${pa.ja}</b>と<b>${pb.ja}</b>は、<span class="mrca-name">${m.ja}</span>の共通祖先から分かれた。${m.poly?'<span class="badge b-debate">内部の分岐順は未解決</span>':""}</p>
        <p class="muted small">${m.note||""} ${App.srcLinks(m.src||[])}</p>
        <p class="btn-row"><a class="btn" href="#/atlas/${a}">${pa.ja}の図鑑</a><a class="btn" href="#/atlas/${b}">${pb.ja}の図鑑</a><a class="btn" href="#/tree">系統樹で見る</a></p>` : "";
      setLayer(layer);
      history.replaceState(null, "", `#/compare/${a}/${b}`);
    }
    App.$$(".cmp-chip").forEach(c => c.addEventListener("click", () => { a = c.dataset.a; b = c.dataset.b; draw(); }));
    App.$("#cmpA").addEventListener("change", e => { a = e.target.value; draw(); });
    App.$("#cmpB").addEventListener("change", e => { b = e.target.value; draw(); });
    App.$$(".cmp-layers .sheet").forEach(x => x.addEventListener("click", () => setLayer(x.dataset.l)));
    draw();
  },
  unmount(){}
};
})();
