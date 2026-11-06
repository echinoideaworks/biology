/* ===== P02 分類体系の歴史 =====
   同じ16種の生物を置いたまま、分類の「境界」だけが組み替わる。
   縦長の画面では図を転置し、横並びの界を縦積みにする。 */
(function(){
const App = window.App;
const CIRCLED = "①②③④⑤⑥⑦⑧";

App.pages.history = {
  mount(view, r){
    const S = App.data.systems, T = App.data.historyTokens;
    const fivePro = Object.entries(S.find(s => s.id==="five").place).filter(([k,v]) => v==="protista").map(([k]) => k);
    let cur = -1;

    view.innerHTML = `
    <section class="page-head wrap hist-head">
      <p class="eyebrow">History of Classification</p>
      <h1>分類体系の歴史</h1>
      <p class="lead">右の図の16種の生物は、最後まで同じ顔ぶれ。変わるのは、人がどこに境界線を引くか。それぞれの体系には、別々の目的と基準があった。</p>
    </section>
    <div class="hist">
      <div class="hist-stage-wrap">
        <div class="hist-stage lighttable" id="hStage">
          <svg class="h-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"></svg>
          <div class="h-regions"></div>
          <div class="h-tokens"></div>
        </div>
        <div class="h-bar">
          <button class="h-arrow" data-dir="-1" aria-label="前の体系">‹</button>
          <ol class="h-timeline">${S.map((s,i) => `<li><button data-i="${i}"><span class="t-year">${s.year}</span><span class="t-name">${{two:"二界説",three:"三界説",five:"五界説",domain:"3ドメイン",super:"スーパーグループ"}[s.id]}</span></button></li>`).join("")}</ol>
          <button class="h-arrow" data-dir="1" aria-label="次の体系">›</button>
        </div>
        <ul class="h-legend">
          <li><i class="lg-unsure"></i>点線の枠：所属を出典で確定できていない配置</li>
          <li class="lg-pro-li"><i class="lg-pro"></i>五界説で原生生物界だった生物</li>
          <li class="lg-pro-li">細菌・古細菌は、この図（真核生物の中）の外にいる</li>
        </ul>
      </div>

      <div class="hist-steps">
        ${S.map((s,i) => `
        <article class="h-step" data-i="${i}" id="step-${s.id}">
          <p class="h-year">${s.year}</p>
          <h2>${s.ja}</h2>
          <p class="h-who">${s.who}</p>
          <dl class="h-dl">
            <dt>目的</dt><dd>${s.purpose}</dd>
            <dt>基準</dt><dd>${s.basis}</dd>
          </dl>
          <div class="h-points">
            <p class="h-points-h">図の注目点</p>
            <ol>${Object.entries(s.call).map(([k,t],j) => `<li><button data-tok="${k}"><span class="cn">${CIRCLED[j]}</span><b>${App.org(k).ja}</b>　${t}</button></li>`).join("")}</ol>
          </div>
          <details class="h-more" ${i===0?"open":""}>
            <summary>背景・何が変わったか・現在の位置づけ</summary>
            <h3>当時の背景</h3><p>${s.background}</p>
            <h3>それまでの体系で説明しにくかったこと</h3><p>${s.problem}</p>
            <h3>何が変わったか</h3><p>${s.change}</p>
            <h3>現在の位置づけ</h3><p>${s.now}</p>
          </details>
          <p class="h-src">${App.srcLinks(s.src)} <span class="muted small">${s.srcNote||""}</span></p>
        </article>`).join("")}
        <article class="h-step h-summary" data-i="${S.length-1}">
          <h2>5つを並べて比べる</h2>
          <p>これらは一本道の「進歩」ではなく、目的の違う提案が重なってきたもの。三ドメイン説とスーパーグループは、扱う<b>階層</b>が違う。</p>
          <div class="table-scroll"><table class="cmp h-cmp">
            <tr><th></th><th>目的</th><th>基準</th><th>単位</th><th>いま</th></tr>
            ${S.map(s => `<tr><th>${s.ja.replace("真核生物の","")}</th><td>${s.purpose.replace(/<[^>]+>/g,"").split("（")[0]}</td><td>${s.basis.replace(/①|②|③/g,"").split("（")[0]}</td><td>${{two:"界",three:"界",five:"界",domain:"ドメイン（界の上）",super:"真核生物の中のまとまり"}[s.id]}</td><td>${{two:"歴史的",three:"歴史的",five:"歴史的・教育で参照",domain:"学習指導要領の標準",super:"研究の枠組み（暫定）"}[s.id]}</td></tr>`).join("")}
          </table></div>
        </article>
      </div>
    </div>`;

    const stage = App.$("#hStage");
    const regBox = App.$(".h-regions", stage), tokBox = App.$(".h-tokens", stage), lines = App.$(".h-lines", stage);

    // トークン（生物）を一度だけ作る
    T.forEach(id => {
      const o = App.org(id);
      const b = document.createElement("button");
      b.className = "h-token"; b.dataset.id = id;
      b.setAttribute("aria-label", o.ja);
      b.innerHTML = `<span class="tk-fig">${App.imgTag(id)}</span><span class="tk-name">${o.ja}</span><span class="tk-num"></span>`;
      b.addEventListener("click", () => App.drawer.open(App.organismCard(id)));
      tokBox.appendChild(b);
    });

    const portrait = () => stage.clientHeight > stage.clientWidth * 1.05;

    /* 領域のジオメトリ（％）。横長はデータのまま。縦長は積み上げ（または専用配置） */
    function geometry(s, W, H){
      const labelH = W < 560 ? 0 : 18, top = 30;
      const groups = {};
      Object.entries(s.place).forEach(([t, reg]) => { if(typeof reg === "string" && reg !== "out") (groups[reg] = groups[reg] || []).push(t); });
      let regs;
      if(!portrait()) regs = s.regions.map(R => Object.assign({}, R));
      else if(s.portrait) regs = s.regions.map(R => Object.assign({}, R, s.portrait[R.id]));
      else {
        const left = s.tree ? 13 : 2, gap = 1.6;
        const usable = 100 - 2 - gap*(s.regions.length-1);
        let size = 76, heights;
        for(; size >= 26; size -= 2){
          const cols = Math.max(1, Math.floor(((100-left-2)/100*W - 10) / (size + 6)));
          heights = s.regions.map(R => { const n = (groups[R.id]||[]).length; const rows = Math.max(1, Math.ceil(n/cols)); return (top + rows*(size+labelH+6) + 8) / H * 100; });
          if(heights.reduce((x,y) => x+y, 0) <= usable) break;
        }
        const extra = (usable - heights.reduce((x,y)=>x+y,0)) / s.regions.length;
        let y = 1;
        regs = s.regions.map((R,k) => { const h = heights[k] + Math.max(0, extra); const g = Object.assign({}, R, {x:left, y, w:100-left-2, h}); y += h + gap; return g; });
      }
      const byId = {}; regs.forEach(R => byId[R.id] = R);
      return {regs, byId, groups, labelH, top};
    }

    function layout(i){
      const s = S[i]; if(!s) return;
      const W = stage.clientWidth, H = stage.clientHeight;
      stage.dataset.step = s.id;
      stage.classList.toggle("zoomed", !!s.zoom);
      const G = geometry(s, W, H);
      /* 領域 */
      const existing = {};
      App.$$(".h-region", regBox).forEach(e => existing[e.dataset.key] = e);
      const keep = new Set();
      G.regs.forEach(R => {
        const key = s.id === "super" ? "s-" + R.id : R.id;  // 同じIDの界は前の体系から変形して引き継ぐ
        keep.add(key);
        let e = existing[key];
        if(e && e._rm){ clearTimeout(e._rm); e._rm = null; }
        if(!e){
          e = document.createElement("div"); e.dataset.key = key;
          regBox.appendChild(e);
          e.classList.add("entering");
          requestAnimationFrame(() => requestAnimationFrame(() => e.classList.remove("entering")));
        }
        e.style.cssText = `left:${R.x}%;top:${R.y}%;width:${R.w}%;height:${R.h}%;--rc:var(${R.color});z-index:${R.frame?1:2}`;
        const ent = e.classList.contains("entering");
        e.className = "h-region" + (R.frame?" frame":"") + (R.dom?" dom":"") + (R.dashed?" dashed":"") + (R.empty?" empty":"") + (ent?" entering":"");
        e.innerHTML = `<span class="r-name">${R.ja}</span>${R.sub?`<span class="r-sub">${R.sub}</span>`:""}`;
      });
      Object.entries(existing).forEach(([k,e]) => { if(!keep.has(k) && !e._rm){ e.classList.add("leaving"); e._rm = setTimeout(() => e.remove(), 700); } });

      /* トークンの大きさ：すべての領域に収まる最大の大きさ */
      const {labelH, top, groups} = G;
      let size = Math.min(W, H) * (portrait() ? .2 : .16);
      Object.entries(groups).forEach(([reg, ts]) => {
        const R = G.byId[reg];
        const rw = R.w/100*W - 10, rh = R.h/100*H - top - 6;
        for(let sz = size; sz > 22; sz -= 1){
          const cols = Math.max(1, Math.floor(rw / (sz + 6)));
          if(Math.ceil(ts.length / cols) * (sz + labelH + 6) <= rh){ size = sz; return; }
        }
        size = 22;
      });
      stage.style.setProperty("--tk", size + "px");
      stage.classList.toggle("no-names", size < 54 || labelH === 0);

      /* トークンを配置 */
      const pos = {};
      Object.entries(groups).forEach(([reg, ts]) => {
        const R = G.byId[reg];
        const rw = R.w/100*W - 10, rh = R.h/100*H - top;
        const cols = Math.max(1, Math.min(ts.length, Math.floor(rw / (size + 6))));
        const rows = Math.ceil(ts.length / cols);
        const cellW = Math.min(rw / cols, size * 1.9), cellH = Math.min((size + labelH + 6), rh / rows);
        const y0 = R.y/100*H + top + (rh - rows*cellH)/2;
        ts.forEach((t, j) => {
          const c = j % cols, rr = Math.floor(j / cols);
          const inRow = Math.min(cols, ts.length - rr*cols);
          const x0 = R.x/100*W + 5 + (rw - inRow*cellW)/2;
          pos[t] = {x: x0 + c*cellW + cellW/2, y: y0 + rr*cellH + size/2 + 3};
        });
      });
      // 2つの界の境目に置く生物（例：二界説のミドリムシ）
      Object.entries(s.place).forEach(([t, reg]) => {
        if(reg && reg.between){
          const A = G.byId[reg.between[0]], B = G.byId[reg.between[1]];
          if(portrait()) pos[t] = {x: (A.x + A.w/2)/100*W, y: ((A.y + A.h) + B.y)/2/100*H};
          else pos[t] = {x: ((A.x + A.w) + B.x)/2/100*W, y: (A.y + A.h/2)/100*H};
        }
      });
      const calls = Object.keys(s.call);
      App.$$(".h-token", tokBox).forEach(b => {
        const id = b.dataset.id, p = pos[id];
        b.classList.toggle("out", !p);
        if(p) b.style.transform = `translate(${p.x - size/2}px, ${p.y - size/2}px)`;
        b.classList.toggle("unsure", s.unsure.includes(id));
        b.classList.toggle("was-pro", !!s.protistRing && fivePro.includes(id));
        const ci = calls.indexOf(id);
        b.classList.toggle("called", ci >= 0);
        App.$(".tk-num", b).textContent = ci >= 0 ? CIRCLED[ci] : "";
      });
      App.$$(".lg-pro-li").forEach(li => li.style.display = s.protistRing ? "" : "none");

      /* 三ドメイン説：rRNAにもとづく系統の線（縦長では左側に縦向き） */
      lines.innerHTML = "";
      if(s.tree){
        const B = G.byId.bacteria, A = G.byId.archaea, E = G.byId.eukarya;
        let d, root, node;
        if(!portrait()){
          const bx = B.x + B.w/2, ax = A.x + A.w/2, ex = E.x + E.w/2, rootY = 9, aeY = 17, tipY = B.y;
          const rootX = (bx + (ax+ex)/2)/2, aeX = (ax+ex)/2;
          d = `M${bx},${tipY} V${rootY} H${aeX} V${aeY} M${ax},${tipY} V${aeY} H${ex} V${tipY} M${rootX},${rootY-4} V${rootY}`;
          root = [rootX, rootY-4]; node = [aeX, aeY];
        } else {
          const by = B.y + B.h/2, ay = A.y + A.h/2, ey = E.y + E.h/2, rootX = 3, aeX = 8, tipX = B.x;
          const aeY = (ay+ey)/2;
          d = `M${tipX},${by} H${rootX} V${aeY} H${aeX} M${tipX},${ay} H${aeX} V${ey} H${tipX}`;
          root = [rootX, (by+aeY)/2]; node = [aeX, aeY];
        }
        lines.innerHTML = `<path d="${d}" class="h-tree"/><circle cx="${root[0]}" cy="${root[1]}" r="0.9" class="h-root"/><circle cx="${node[0]}" cy="${node[1]}" r="0.7" class="h-node"/>`;
      }
    }

    function go(i, fromScroll){
      i = Math.max(0, Math.min(S.length-1, i));
      if(i === cur && !fromScroll) return;
      cur = i;
      layout(i);
      App.$$(".h-timeline button").forEach(b => b.classList.toggle("on", +b.dataset.i === i));
      App.$$(".h-step").forEach(a => a.classList.toggle("active", +a.dataset.i === i));
    }
    const scrollToStep = i => {
      const a = App.$(`.h-step[data-i="${i}"]`);
      const narrow = window.innerWidth < 1024;
      const off = narrow ? (App.$(".hist-stage-wrap").offsetHeight + 70) : 120;
      window.scrollTo({top: a.getBoundingClientRect().top + window.scrollY - off, behavior: App.reduced()? "auto":"smooth"});
      go(i);
    };
    App.$$(".h-timeline button").forEach(b => b.addEventListener("click", () => scrollToStep(+b.dataset.i)));
    App.$$(".h-arrow").forEach(b => b.addEventListener("click", () => scrollToStep(cur + (+b.dataset.dir))));
    // 注目点：押すと図の中のその生物が弾む
    view.addEventListener("click", e => {
      const t = e.target.closest("[data-tok]"); if(!t) return;
      const tk = App.$(`.h-token[data-id="${t.dataset.tok}"]`);
      tk.classList.remove("ping"); void tk.offsetWidth; tk.classList.add("ping");
    });

    // スクロール位置で体系を切り替える
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if(e.isIntersecting) go(+e.target.dataset.i, true); });
    }, {rootMargin: window.innerWidth < 1024 ? "-62% 0px -30% 0px" : "-45% 0px -50% 0px"});
    App.$$(".h-step").forEach(a => io.observe(a));
    this._io = io;

    // 大きさが変わったら配置し直す（回転・リサイズ）
    let t; this._rs = () => { clearTimeout(t); t = setTimeout(() => layout(cur), 120); };
    window.addEventListener("resize", this._rs);
    stage.classList.add("instant");
    go(0);
    requestAnimationFrame(() => stage.classList.remove("instant"));
  },
  unmount(){ this._io && this._io.disconnect(); window.removeEventListener("resize", this._rs); }
};
})();
