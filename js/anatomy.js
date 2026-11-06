/* ===== 解剖図エンジン =====
   定義（assets/anatomy/*.js）：
   { viewBox, svg（data-layer / data-part 付きのSVG文字列）, caption,
     layers:[{id, ja, on, lv}], parts:{id:{ja,en,text,wrong,src,lv}},
     actions:[{id, ja, run(api)}] } */
(function(){
const App = window.App;
App.anatomyDefs = App.anatomyDefs || {};

App.Anatomy = {
  mount(stage, tools, def, opts={}){
    stage.innerHTML = `<svg class="anat" viewBox="${def.viewBox}" role="img" aria-label="${App.esc(def.title||"解剖図")}">${def.svg}</svg>
      <p class="stage-cap" id="anatCap">${def.caption||""}</p>`;
    const svg = stage.querySelector("svg.anat");
    const cap = stage.querySelector("#anatCap");
    const timers = [];
    let selected = null;

    /* 層（透明シート） */
    const state = {};
    def.layers.forEach(l => state[l.id] = l.on !== false);
    const apply = () => def.layers.forEach(l => {
      const show = state[l.id] && (l.lv !== "adv" || App.level() === "adv");
      App.$$(`[data-layer="${l.id}"]`, svg).forEach(g => g.classList.toggle("off", !show));
    });
    tools.innerHTML = `
      <div class="sheets" role="group" aria-label="表示する層">
        <span class="muted small">層</span>
        ${def.layers.map(l => `<button class="sheet ${l.lv==="adv"?"lv-adv":""}" data-layer="${l.id}" aria-pressed="${state[l.id]}"><i style="background:${l.color||"var(--ink-3)"}"></i>${l.ja}</button>`).join("")}
      </div>
      <div class="actions">${(def.actions||[]).map(a => `<button class="btn act" data-act="${a.id}">${a.ja}</button>`).join("")}</div>`;
    App.$$(".sheet", tools).forEach(b => b.addEventListener("click", () => {
      state[b.dataset.layer] = !state[b.dataset.layer];
      b.setAttribute("aria-pressed", state[b.dataset.layer]);
      apply();
    }));
    const onLevel = () => apply();
    document.addEventListener("levelchange", onLevel);
    apply();

    /* 部位の選択 */
    function select(id){
      selected = id;
      svg.classList.toggle("has-sel", !!id);
      App.$$("[data-part]", svg).forEach(e => e.classList.toggle("sel", e.dataset.part === id));
      opts.onPart && opts.onPart(id ? Object.assign({id}, def.parts[id]) : null);
    }
    svg.addEventListener("click", e => {
      const t = e.target.closest("[data-part]");
      if(!t){ select(null); return; }
      select(t.dataset.part === selected ? null : t.dataset.part);
    });
    svg.addEventListener("mouseover", e => {
      const t = e.target.closest("[data-part]");
      App.$$("[data-part].hov", svg).forEach(x => x.classList.remove("hov"));
      if(t) App.$$(`[data-part="${t.dataset.part}"]`, svg).forEach(x => x.classList.add("hov"));
      const p = t && def.parts[t.dataset.part];
      svg.setAttribute("data-tip", p ? p.ja : "");
    });
    svg.addEventListener("mouseleave", () => App.$$("[data-part].hov", svg).forEach(x => x.classList.remove("hov")));

    /* 動き */
    const api = {
      svg, cap,
      later(ms, fn){ timers.push(setTimeout(fn, App.reduced()? Math.min(ms, 50) : ms)); },
      caption(html){ cap.innerHTML = html; },
      setLayer(id, on){ state[id] = on; const b = tools.querySelector(`.sheet[data-layer="${id}"]`); b && b.setAttribute("aria-pressed", on); apply(); },
      clear(){ timers.splice(0).forEach(clearTimeout); }
    };
    App.$$(".act", tools).forEach(b => b.addEventListener("click", () => {
      api.clear();
      const a = def.actions.find(x => x.id === b.dataset.act);
      App.$$(".act", tools).forEach(x => x.classList.toggle("primary", x === b));
      a.run(api, () => b.classList.remove("primary"));
    }));
    return { destroy(){ api.clear(); document.removeEventListener("levelchange", onLevel); } };
  }
};
})();
