/* ===== P03 動物の分類図鑑：各門の詳細 ===== */
(function(){
const App = window.App;

function speciesLabel(p, spId){
  const o = App.org(spId);
  const d = (App.data.phylumDetail[p.id]||{species:{}}).species[spId] || {};
  const L = App.data.labels;
  return `
    <div class="label">
      <p class="eyebrow" style="position:relative">${p.ja}門　${d.tag||""}</p>
      <h2 class="label-title">${o.ja}</h2>
      <div class="label-sub"><span class="sci">${App.esc(o.sci)}</span>${o.sciCheck?' <span class="badge b-check" title="学名を最新の分類データベースで確認中">学名確認中</span>':''}</div>
      <dl>
        ${d.habitat?`<dt>すみか</dt><dd>${d.habitat} <span class="badge b-check" title="出典照合中">確認中</span></dd>`:""}
        <dt>体腔</dt><dd>${L.coelom[p.coelom]}</dd>
        <dt>対称性</dt><dd>${L.sym[p.sym]}</dd>
        <dt>胚葉</dt><dd>${p.layers}</dd>
        <dt>発生</dt><dd>${L.mouth[p.mouth]}</dd>
        <dt>系統</dt><dd>${L.clade[p.clade]}</dd>
      </dl>
    </div>
    <p class="sp-line">${App.esc(o.line)} ${App.srcLinks(o.src)}</p>`;
}

App.pages.phylum = {
  mount(view, r){
    const p = App.phylum(r.params[0]);
    if(!p){ view.innerHTML = `<div class="wrap page-head"><h1>見つかりません</h1><p><a href="#/atlas">図鑑の一覧へ</a></p></div>`; return; }
    const idx = App.data.phyla.indexOf(p);
    const prev = App.data.phyla[idx-1], next = App.data.phyla[idx+1];
    const det = App.data.phylumDetail[p.id];
    let sp = (r.query.sp && p.reps.includes(r.query.sp)) ? r.query.sp : p.lead;

    view.style.setProperty("--pc", `var(--c-${p.id})`);
    view.innerHTML = `
    <nav class="ph-nav wrap">
      ${prev?`<a href="#/atlas/${prev.id}">← ${prev.ja}</a>`:"<span></span>"}
      <a href="#/atlas" class="ph-index">図鑑の一覧</a>
      ${next?`<a href="#/atlas/${next.id}">${next.ja} →</a>`:"<span></span>"}
    </nav>
    <header class="ph-head wrap">
      <p class="eyebrow">${p.en}</p>
      <h1>${p.ja}<span class="mon">門</span> <span class="badge b-basic">基本</span></h1>
      <p class="lead">${p.summary} ${App.srcLinks(p.src)}</p>
    </header>

    <section class="ph-top wrap">
      <div class="viewer">
        <div class="viewer-tabs" role="tablist">
          <button role="tab" data-v="habitus" aria-selected="true">全身</button>
          <button role="tab" data-v="anatomy" aria-selected="false">解剖図</button>
          <button role="tab" data-v="section" aria-selected="false">断面図</button>
        </div>
        <div class="stage lighttable" id="stage"></div>
        <div class="viewer-tools" id="viewerTools"></div>
        <div class="sp-strip" role="group" aria-label="代表生物">
          ${p.reps.map(id => `<button data-sp="${id}" aria-pressed="${id===sp}">
            <span class="sp-thumb">${App.imgTag(id)}</span><span>${App.org(id).ja.replace("類","")}</span></button>`).join("")}
        </div>
      </div>
      <aside class="ph-aside">
        <div id="spLabel"></div>
        <div class="part-card" id="partCard" hidden></div>
        <div class="mini-wrap">
          <h3>系統樹上の位置 <span class="muted small">（枝の長さに意味はない）</span></h3>
          <div id="miniTree"></div>
          <p class="btn-row"><a class="btn" href="#/tree?focus=${p.id}">系統樹ページで探索</a></p>
        </div>
      </aside>
    </section>

    ${det ? `
    <nav class="sec-nav wrap" aria-label="この門の内容">
      ${det.sections.map((s,i) => `<a href="javascript:void 0" data-sec="${s.key}" class="${s.lv==="adv"?"lv-adv":""}">${i+1}. ${s.title.split(" — ")[0]}</a>`).join("")}
    </nav>
    <div class="sections wrap">
      ${det.sections.map((s,i) => `
        <article class="sec ${s.lv==="adv"?"lv-adv":""}" id="sec-${s.key}">
          <header><span class="sec-num">${String(i+1).padStart(2,"0")}</span><h2>${s.title}</h2>${s.lv==="adv"?'<span class="badge b-adv">発展</span>':''}</header>
          <div class="sec-body">${s.html}</div>
        </article>`).join("")}
    </div>` : `
    <div class="wrap"><div class="pending">
      <p><span class="badge b-check">制作中</span></p>
      <p>この門の詳しいページ（体のつくり・器官の図解・発生・ほかの門との違い）は STEP 4 で制作します。試作として、<a href="#/atlas/echinodermata">棘皮動物門</a>のページが完成しています。</p>
    </div></div>`}
    `;

    /* 系統樹上の位置 */
    const metazoa = App.Tree.find(App.data.lifeTree, n => n.animals);
    App.Tree.mini(App.$("#miniTree"), metazoa, {
      highlight: l => l.phylum === p.id,
      labelOf: l => App.phylum(l.phylum).ja,
      onTip: l => { location.hash = "#/atlas/" + l.phylum; }
    });

    /* ビューア */
    const stage = App.$("#stage"), tools = App.$("#viewerTools"), partCard = App.$("#partCard");
    let vmode = "habitus", ana = null;
    const defId = () => (det && det.species[sp] && det.species[sp].anatomy) || null;
    function showPart(part){
      if(!part){ partCard.hidden = true; return; }
      partCard.hidden = false;
      partCard.innerHTML = `<p class="eyebrow">部位</p><h3>${part.ja}${part.en?` <span class="sci muted">${part.en}</span>`:""}</h3>
        <p>${part.text}</p>${part.wrong?`<p class="note-wrong"><b>よくある誤解</b>　${part.wrong}</p>`:""}
        <p>${App.srcLinks(part.src||[])}${part.lv==="adv"?' <span class="badge b-adv">発展</span>':''}</p>`;
    }
    function draw(){
      ana && ana.destroy && ana.destroy(); ana = null;
      tools.innerHTML = ""; showPart(null);
      App.$$(".viewer-tabs button").forEach(b => {
        const has = b.dataset.v === "habitus" || (defId() && App.anatomyDefs[defId()] && App.anatomyDefs[defId()][b.dataset.v]);
        b.disabled = !has; b.title = has ? "" : "この生物の図は制作中";
        b.setAttribute("aria-selected", String(b.dataset.v === vmode));
      });
      if(vmode === "habitus" || !defId()){
        const d = (det && det.species[sp]) || {};
        stage.innerHTML = `<div class="habitus">${App.imgTag(sp)}</div>${d.note?`<p class="stage-cap">${d.note}</p>`:""}`;
        stage.classList.remove("is-anatomy");
        return;
      }
      stage.classList.add("is-anatomy");
      ana = App.Anatomy.mount(stage, tools, App.anatomyDefs[defId()][vmode], {onPart:showPart});
    }
    App.$$(".viewer-tabs button").forEach(b => b.addEventListener("click", () => { if(b.disabled) return; vmode = b.dataset.v; draw(); }));
    App.$$(".sp-strip button").forEach(b => b.addEventListener("click", () => {
      sp = b.dataset.sp;
      App.$$(".sp-strip button").forEach(x => x.setAttribute("aria-pressed", String(x===b)));
      App.$("#spLabel").innerHTML = speciesLabel(p, sp);
      if(!defId()) vmode = "habitus";
      draw();
      history.replaceState(null, "", `#/atlas/${p.id}?sp=${sp}`);
    }));
    App.$("#spLabel").innerHTML = speciesLabel(p, sp);
    draw();

    /* 節へのジャンプ */
    App.$$(".sec-nav a").forEach(a => a.addEventListener("click", () => {
      const t = App.$("#sec-" + a.dataset.sec); if(t) window.scrollTo({top:t.getBoundingClientRect().top + window.scrollY - 120, behavior:App.reduced()?"auto":"smooth"});
    }));
    // スクロールに応じて節を浮かび上がらせる
    const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold:.12});
    App.$$(".sec").forEach(s => io.observe(s));
    this._ana = () => ana;
  },
  unmount(){ const a = this._ana && this._ana(); a && a.destroy && a.destroy(); }
};
})();
