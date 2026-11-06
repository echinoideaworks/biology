/* ===== P04 系統樹を探索する =====
   長方形のクラドグラム（左が根、右が現在）。拡大・移動、分岐点の選択、枝の回転、
   強調表示、最初の分岐の仮説切り替え、系統樹の読み方の練習。 */
(function(){
const App = window.App;
const NS = "http://www.w3.org/2000/svg";
const ROW = 92, COL = 64, IMG = 62;

const MODES = {
  none:{ja:"なし"},
  mouth:{ja:"旧口／新口",legend:[["g-proto","旧口動物（前口動物）"],["g-deu","新口動物（後口動物）"]]},
  clade:{ja:"脱皮／冠輪",legend:[["g-ecd","脱皮動物"],["g-lop","冠輪動物"],["g-deu","新口動物"]]},
  coelom:{ja:"体腔の型",legend:[["c-none","無体腔"],["c-pseudo","偽体腔"],["c-true","真体腔"],["c-na","胚葉の分化なし・区分外"]],
    note:"偽体腔の線形動物は脱皮動物、無体腔の扁形動物は冠輪動物に入る。体腔の型は系統のまとまりと一致しない。"},
  segment:{ja:"体節",legend:[["s-yes","体節をもつ門"]],
    note:"環形動物と節足動物はどちらも体節をもつが、属する系統（冠輪動物と脱皮動物）は離れている。体節が独立に生じたか、共通祖先から受け継いだかは議論がある。"},
  sym:{ja:"対称性",legend:[["y-radial","放射相称"],["y-penta","五放射相称（成体）"],["y-bilateral","左右相称"],["y-asym","非相称"]],
    note:"棘皮動物の成体の五放射相称は二次的なもの。幼生は左右相称。"}
};

function el(n, a={}, p){ const e = document.createElementNS(NS, n); for(const k in a) if(a[k] != null) e.setAttribute(k, a[k]); if(p) p.appendChild(e); return e; }
const tipName = l => l.tip && App.org(l.tip) ? App.org(l.tip).ja : l.label;

App.pages.tree = {
  mount(view, r){
    let first = App.store.get("treeFirst", "poly"), mode = "none", selected = null, pz = null, root = null;
    view.innerHTML = `
    <div class="tp">
      <aside class="tp-panel" id="tpPanel">
        <div class="tp-panel-in">
          <p class="eyebrow">Phylogenetic Tree</p>
          <h1>系統樹を探索する</h1>
          <p class="tp-lead">左が過去（根）、右の末端はすべて現在の生物。分岐点は共通祖先を表す。枝の長さに意味はない。</p>
          <h2>色で見る</h2>
          <div class="tp-chips" id="tpModes">${Object.entries(MODES).map(([k,m]) => `<button data-mode="${k}" aria-pressed="${k==="none"}">${m.ja}</button>`).join("")}</div>
          <div class="tp-legend" id="tpLegend"></div>
          <h2>動物で最初に分かれた系統 <span class="badge b-debate">議論中</span></h2>
          <div class="tp-chips" id="tpFirst">
            <button data-first="poly">未解決として表示</button>
            <button data-first="sponge">海綿動物が先</button>
            <button data-first="cteno">有櫛動物が先</button>
          </div>
          <p class="small muted">${App.srcLinks(["P29","P30","P33"])} 有櫛動物先行の解析と海綿動物先行の解析があり、どちらも確定していない。</p>
          <h2>系統樹の読み方</h2>
          <div class="tp-chips" id="tpDemo">
            <button data-demo="mono">単系統群</button><button data-demo="para">側系統群</button><button data-demo="poly">多系統群</button>
          </div>
          <div class="tp-demo-text" id="tpDemoText"><p class="small">分岐点を選ぶと、その共通祖先とすべての子孫（単系統群）が光る。「⟲ 枝を回転」で左右を入れ替えても、つながり方は変わらない。${App.srcLinks(["P41"])}</p></div>
        </div>
      </aside>
      <div class="tp-canvas lighttable" id="tpCanvas">
        <div class="tp-tools">
          <button class="tp-set" id="tpSet" aria-expanded="false">表示の設定</button>
          <span class="tp-hint">ドラッグで移動・2本指／ホイールで拡大</span>
          <button class="pz-btn" data-pz="in" aria-label="拡大">＋</button>
          <button class="pz-btn" data-pz="out" aria-label="縮小">−</button>
          <button class="pz-btn" data-pz="reset" aria-label="全体を表示">⟲</button>
        </div>
      </div>
    </div>`;
    const canvas = App.$("#tpCanvas");

    function render(keepView){
      const old = canvas.querySelector("svg.tp-svg");
      const oldVB = old && keepView ? old.getAttribute("viewBox") : null;
      if(!root) root = App.data.buildAnimalTree(first);
      // 発展のときだけ表示する枝
      const prune = n => { if(n.ch){ n._ch = n.ch.filter(c => !c.adv || App.level()==="adv"); n._ch.forEach(prune); } };
      prune(root);
      const leaves = [];
      (function walk(n, p, d){ n._p = p; n._d = d; if(n._ch && n._ch.length) n._ch.forEach(c => walk(c, n, d+1)); else leaves.push(n); })(root, null, 0);
      const maxD = Math.max(...leaves.map(l => l._d));
      leaves.forEach((l,i) => { l._y = 40 + i*ROW; l._x = 30 + maxD*COL; });
      (function setY(n){ if(n._ch && n._ch.length){ n._ch.forEach(setY); n._y = (n._ch[0]._y + n._ch[n._ch.length-1]._y)/2; n._x = 30 + n._d*COL; } })(root);
      const W = 30 + maxD*COL + 330, H = 40 + leaves.length*ROW;

      if(old) old.remove();
      const svg = el("svg", {class:"tp-svg mode-"+mode, viewBox: oldVB || `0 -56 ${W} ${H+56}`, role:"img", "aria-label":"動物の系統樹"});
      canvas.insertBefore(svg, canvas.firstChild);
      const gL = el("g", {class:"tp-links"}, svg), gN = el("g", {class:"tp-nodes"}, svg), gT = el("g", {class:"tp-tips"}, svg);
      const groupOf = n => { let m = n; while(m){ if(m.group) return m.group; m = m._p; } return ""; };
      const all = []; (function w(n){ all.push(n); (n._ch||[]).forEach(w); })(root);
      all.forEach(n => {
        if(!n._p) return;
        const p = n._p;
        const path = el("path", {d:`M${p._x},${p._y} V${n._y} H${n._x}`, class:`tp-link g-${groupOf(n)}${n.st==="debate"?" debate":""}`}, gL);
        n._link = path;
      });
      // 根の手前の短い幹
      el("path", {d:`M${root._x-22},${root._y} H${root._x}`, class:"tp-link"}, gL);
      all.filter(n => n._ch && n._ch.length).forEach(n => {
        const g = el("g", {class:"tp-node" + (root.poly && n===root || n.poly ? " poly" : ""), transform:`translate(${n._x},${n._y})`, tabindex:"0", role:"button", "aria-label":n.ja}, gN);
        el("circle", {r:20, class:"hit"}, g);
        el("circle", {r: n.poly ? 6 : 5.2, class:"dot"}, g);
        if(n._d <= 2 || n.group || ["chordata","vertebrata"].includes(n.id)){
          const t = el("text", {x:-8, y:-10, class:"tp-nlabel", "text-anchor":"end"}, g); t.textContent = n.ja;
        }
        g.addEventListener("click", e => { e.stopPropagation(); select(n); App.drawer.open(nodeCard(n)); });
        g.addEventListener("keydown", e => { if(e.key === "Enter"){ select(n); App.drawer.open(nodeCard(n)); } });
        n._g = g;
      });
      leaves.forEach(l => {
        const ph = App.phylum(l.phylum);
        const cls = ["tp-tip"];
        if(ph){ cls.push("c-"+ph.coelom, "y-"+ph.sym); if(["annelida","arthropoda"].includes(ph.id)) cls.push("s-yes"); }
        else cls.push("c-na","y-na");
        if(l.st === "debate") cls.push("debate");
        const g = el("g", {class:cls.join(" "), transform:`translate(${l._x},${l._y})`, tabindex:"0", role:"button", "aria-label":tipName(l)}, gT);
        el("path", {d:`M0,0 H14`, class:"tp-stub"}, g);
        el("rect", {x:14, y:-ROW/2+6, width:300, height:ROW-12, class:"hit", rx:10}, g);
        el("circle", {cx:14+IMG/2+4, cy:0, r:IMG/2+4, class:"disc"}, g);
        const o = l.tip ? App.org(l.tip) : null;
        if(o){
          const im = el("image", {href:o.img, x:18, y:-IMG/2, width:IMG, height:IMG, preserveAspectRatio:"xMidYMid meet"}, g);
          im.addEventListener("error", () => { im.remove(); const t = el("text",{x:18+IMG/2, y:4, class:"tp-ph","text-anchor":"middle"}, g); t.textContent = "制作中"; });
        } else { const t = el("text",{x:18+IMG/2, y:4, class:"tp-ph","text-anchor":"middle"}, g); t.textContent = "図版なし"; }
        const lab = el("text", {x:14+IMG+16, y:-3, class:"tp-label"}, g); lab.textContent = l.label;
        const sub = el("text", {x:14+IMG+16, y:16, class:"tp-sub"}, g);
        sub.textContent = l.sub ? "脊索動物門" : (ph ? (App.data.labels.coelom[ph.coelom] + "・" + App.data.labels.sym[ph.sym].replace("（成体）","")) : (l.st==="debate" ? "位置は議論中" : "高校の9門には含まれない"));
        g.addEventListener("click", e => { e.stopPropagation(); select(l); App.drawer.open(tipCard(l)); });
        g.addEventListener("keydown", e => { if(e.key === "Enter"){ select(l); App.drawer.open(tipCard(l)); } });
        l._g = g;
      });
      pz = App.Tree.panZoom(svg, {min:.5, max:4}); pz.enable(true);
      svg.addEventListener("click", () => { select(null); });
      api.svg = svg; api.W = W; api.H = H;
      if(selected) select(selected, true);
    }
    const api = {};

    /* 選択：その分岐点の子孫（単系統群）を光らせる */
    function select(n, quiet){
      selected = n;
      const svg = api.svg;
      svg.classList.toggle("has-sel", !!n);
      App.$$(".on", svg).forEach(e => e.classList.remove("on"));
      if(!n) return;
      (function down(m){ m._link && m._link.classList.add("on"); m._g && m._g.classList.add("on"); (m._ch||[]).forEach(down); })(n);
      // 根までの道も
      let m = n; while(m){ m._link && m._link.classList.add("on"); m._g && m._g.classList.add("on"); m = m._p; }
    }
    const members = n => { const a = []; (function w(m){ if(m._ch && m._ch.length) m._ch.forEach(w); else a.push(m); })(n); return a; };

    function nodeCard(n){
      return `<p class="eyebrow">分岐点 ＝ 共通祖先</p>
        <h2>${App.esc(n.ja)}${n.en?` <span class="sci muted" style="font-size:.6em">${n.en}</span>`:""}</h2>
        ${n.poly || (n===root && root.poly) ? `<p><span class="badge b-debate">内部の分岐順は未解決（くし状）</span></p>`:""}
        ${n.st==="debate" ? `<p><span class="badge b-debate">議論中の分岐</span></p>`:""}
        <p>${n.note||""} ${App.srcLinks(n.src||[])}</p>
        <h3 class="drawer-h3">この共通祖先から分かれたもの（単系統群）</h3>
        <ul class="kid-list">${members(n).map(l => `<li>${App.esc(tipName(l))}</li>`).join("")}</ul>
        <div class="btn-row"><button class="btn primary" id="rotBtn">⟲ この分岐点で枝を回転</button><button class="btn" id="zoomBtn">この範囲を拡大</button></div>
        <p class="muted small">回転しても、どの生物とどの生物が近いかは変わらない。${App.srcLinks(["P41"])}</p>`;
    }
    function tipCard(l){
      if(l.tip && App.org(l.tip)) return App.organismCard(l.tip);
      return `<p class="eyebrow">末端</p><h2>${App.esc(l.label)}</h2>
        ${l.st==="debate"?'<p><span class="badge b-debate">位置は議論中</span></p>':""}
        <p>${l.note||""}</p>`;
    }
    document.addEventListener("click", this._dc = e => {
      if(e.target.id === "rotBtn" && selected && selected._ch){ selected.ch.reverse(); render(true); select(selected); }
      if(e.target.id === "zoomBtn" && selected){
        const ms = members(selected), y0 = Math.min(...ms.map(x=>x._y)), y1 = Math.max(...ms.map(x=>x._y));
        const h = Math.max(260, y1 - y0 + 160), w = h * (api.svg.clientWidth / api.svg.clientHeight);
        api.svg.setAttribute("viewBox", `${selected._x - 60} ${(y0+y1)/2 - h/2} ${w} ${h}`);
        App.drawer.close();
      }
    });

    /* 操作 */
    const setMode = m => {
      mode = m;
      api.svg.setAttribute("class", "tp-svg mode-" + m + (selected ? " has-sel" : ""));
      App.$$("#tpModes button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.mode === m)));
      const M = MODES[m];
      App.$("#tpLegend").innerHTML = (M.legend||[]).map(([c,t]) => `<span class="lg ${c}"><i></i>${t}</span>`).join("") + (M.note ? `<p class="small">${M.note}</p>` : "");
    };
    App.$$("#tpModes button").forEach(b => b.addEventListener("click", () => setMode(b.dataset.mode)));
    const setFirst = f => {
      first = f; App.store.set("treeFirst", f); root = null; selected = null; render();
      App.$$("#tpFirst button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.first === f)));
      setMode(mode);
    };
    App.$$("#tpFirst button").forEach(b => b.addEventListener("click", () => setFirst(b.dataset.first)));
    const findNode = pred => { let r = null; (function w(n){ if(r) return; if(pred(n)) r = n; (n._ch||[]).forEach(w); })(root); return r; };
    App.$$("#tpDemo button").forEach(b => b.addEventListener("click", () => {
      const d = b.dataset.demo;
      App.$$("#tpDemo button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      const box = App.$("#tpDemoText");
      if(d === "mono"){
        select(findNode(n => n.id === "vertebrata"));
        box.innerHTML = `<p><b>単系統群</b>：共通祖先と、その子孫<b>すべて</b>を含むまとまり。樹の1か所を切ると切り取れる。例：脊椎動物。</p>`;
      } else if(d === "para"){
        const sau = findNode(n => n.id === "sauropsida");
        select(sau);
        const bird = findNode(n => n.tip === "kawarabato"); bird._g && bird._g.classList.add("excluded");
        box.innerHTML = `<p><b>側系統群</b>：共通祖先を含むが、子孫の一部を除いたまとまり。例：鳥類を除いた「爬虫類」。トカゲ類の共通祖先から鳥類も生じているので、鳥類を除くと単系統にならない。${App.srcLinks(["P41"])}</p>`;
      } else {
        select(null);
        const segs = [findNode(n => n.phylum === "annelida" && !n._ch), findNode(n => n.phylum === "arthropoda" && !n._ch)];
        api.svg.classList.add("has-sel");
        segs.forEach(s => { s._g.classList.add("on"); let m = s; while(m){ m._link && m._link.classList.add("on"); m = m._p; } });
        box.innerHTML = `<p><b>多系統群</b>：見た目などの似た特徴だけで集めた、起源の異なる寄せ集め。例：「体節をもつ動物」として環形動物と節足動物をまとめると、2つの共通祖先からの子孫（軟体動物・線形動物など）を含まない、離れた枝の寄せ集めになる。</p>`;
      }
    }));
    App.$$(".tp-tools .pz-btn").forEach(b => b.addEventListener("click", () => {
      const a = b.dataset.pz; if(a === "in") pz.zoom(1.4); else if(a === "out") pz.zoom(1/1.4); else { pz.reset(); }
    }));
    App.$("#tpSet").addEventListener("click", e => {
      const open = !App.$("#tpPanel").classList.contains("open");
      App.$("#tpPanel").classList.toggle("open", open); e.currentTarget.setAttribute("aria-expanded", open);
    });
    document.addEventListener("levelchange", this._lv = () => { selected = null; render(); setMode(mode); });

    setFirst(first);
    /* ?focus= で開いたとき */
    const f = r.query.focus;
    if(f){
      const n = findNode(x => x.id === f || x.phylum === f && !x._ch && !x.sub || x.tip === f);
      if(n){ select(n); App.drawer.open(n._ch ? nodeCard(n) : tipCard(n)); }
    }
  },
  unmount(){ document.removeEventListener("click", this._dc); document.removeEventListener("levelchange", this._lv); }
};
})();
