/* ===== 系統樹の描画（クラドグラム） =====
   radial(): 円形。根を中心に置き、枝が外へ伸びる。
   mini():   長方形の小さな樹（図鑑の「系統樹上の位置」）。
   枝の長さには意味がない。並び順にも意味はない（回転しても関係は同じ）。 */
(function(){
const App = window.App;
const NS = "http://www.w3.org/2000/svg";
const T = App.Tree = {};
let uid = 0;

function el(name, attrs={}, parent){
  const e = document.createElementNS(NS, name);
  for(const k in attrs) if(attrs[k] !== undefined && attrs[k] !== null) e.setAttribute(k, attrs[k]);
  if(parent) parent.appendChild(e);
  return e;
}

/* 木を走査して親・深さ・末端を付ける */
function prepare(root){
  const nodes = [], leaves = [];
  (function walk(n, parent, depth, domain){
    n._uid = n._uid || ("n" + (++uid));
    n._parent = parent; n._depth = depth;
    if(n.domain) domain = n;
    n._domain = domain;
    nodes.push(n);
    if(n.ch && n.ch.length){ n.ch.forEach(c => walk(c, n, depth+1, domain)); }
    else leaves.push(n);
  })(root, null, 0, null);
  const maxDepth = Math.max(...leaves.map(l => l._depth));
  return {nodes, leaves, maxDepth};
}
T.prepare = prepare;
T.ancestors = n => { const a = []; while(n){ a.push(n); n = n._parent; } return a; };
T.mrca = (a, b) => { const A = new Set(T.ancestors(a)); let n = b; while(n && !A.has(n)) n = n._parent; return n; };
T.find = (root, pred) => { let r = null; (function w(n){ if(r) return; if(pred(n)) r = n; (n.ch||[]).forEach(w); })(root); return r; };

const rad = d => (d - 90) * Math.PI / 180;
const P = (r, a) => [r * Math.cos(rad(a)), r * Math.sin(rad(a))];
const f = n => Math.round(n * 10) / 10;

/* ---------- 円形の系統樹 ---------- */
T.radial = function(container, root, opts={}){
  const o = Object.assign({R:300, img:58, onTip:null, onNode:null, grow:true}, opts);
  const {nodes, leaves, maxDepth} = prepare(root);

  /* 角度：末端を等間隔に、ドメインの境目に少し間をあける */
  let slots = 0, lastDom = null;
  leaves.forEach(l => { if(lastDom && l._domain !== lastDom) slots += 0.7; l._slot = slots; slots += 1; lastDom = l._domain; });
  slots += 0.7; // 最後と最初の間
  const start = -8;
  leaves.forEach(l => { l._a = start + (l._slot + 0.5) / slots * 360; });
  (function setA(n){
    if(n.ch && n.ch.length){ n.ch.forEach(setA); n._a = (n.ch[0]._a + n.ch[n.ch.length-1]._a) / 2; }
  })(root);
  const R = o.R, step = R / maxDepth;
  nodes.forEach(n => { n._r = (n.ch && n.ch.length) ? n._depth * step : R; });

  const svg = el("svg", {viewBox:"-520 -520 1040 1040", class:"tree-radial", role:"img", "aria-label":"生命の系統樹（円形）"});
  container.appendChild(svg);
  const gRing = el("g", {class:"rings"}, svg);
  const gLinks = el("g", {class:"links"}, svg);
  const gNodes = el("g", {class:"nodes"}, svg);
  const gTips = el("g", {class:"tips"}, svg);

  /* ドメイン・動物の帯 */
  function ringArc(r, a0, a1){
    const [x0,y0] = P(r, a0), [x1,y1] = P(r, a1);
    return `M${f(x0)},${f(y0)} A${r},${r} 0 ${a1-a0>180?1:0} 1 ${f(x1)},${f(y1)}`;
  }
  const bands = nodes.filter(n => n.domain || n.animals);
  bands.forEach(n => {
    const ls = leaves.filter(l => T.ancestors(l).includes(n));
    const half = 180 / slots * 0.9;
    const a0 = ls[0]._a - half, a1 = ls[ls.length-1]._a + half;
    const r = n.animals ? R + 150 : R + 168;
    const id = "band-" + n._uid;
    el("path", {d:ringArc(r, a0, a1), class:"band " + (n.animals?"band-animals":"band-domain"), style:n.color?`stroke:var(${n.color})`:null, "data-node":n._uid}, gRing);
    const lr = r + (n.animals ? -14 : 14);
    // 文字が逆さまにならないよう、下半分は逆向きの弧に載せる
    const mid = (a0 + a1) / 2, bottom = (mid > 90 && mid < 270);
    const tp = bottom
      ? (() => { const [x0,y0] = P(lr+6, a1), [x1,y1] = P(lr+6, a0); return `M${f(x0)},${f(y0)} A${lr+6},${lr+6} 0 ${a1-a0>180?1:0} 0 ${f(x1)},${f(y1)}`; })()
      : ringArc(lr, a0, a1);
    el("path", {id, d:tp, fill:"none", stroke:"none"}, gRing);
    const t = el("text", {class:"band-label" + (n.animals?" animals":"")}, gRing);
    const tpEl = el("textPath", {href:"#"+id, startOffset:"50%", "text-anchor":"middle"}, t);
    tpEl.textContent = n.band || (n.ja + (n.en? "  " + n.en : ""));
  });

  /* 枝 */
  const linkOf = {};
  nodes.forEach(n => {
    if(!n._parent) return;
    const p = n._parent;
    const [x0,y0] = P(p._r, p._a), [x1,y1] = P(p._r, n._a), [x2,y2] = P(n._r, n._a);
    let d = `M${f(x0)},${f(y0)}`;
    if(Math.abs(n._a - p._a) > 0.01 && p._r > 0) d += ` A${f(p._r)},${f(p._r)} 0 0 ${n._a > p._a ? 1 : 0} ${f(x1)},${f(y1)}`;
    else d += ` L${f(x1)},${f(y1)}`;
    d += ` L${f(x2)},${f(y2)}`;
    const w = Math.max(1.4, 3.4 - n._depth * 0.22);
    const dom = n._domain;
    const path = el("path", {d, class:"link" + (n.st==="debate"?" debate":""), "stroke-width":f(w), pathLength:"1",
      style: dom && dom.color ? `--lc:var(${dom.color})` : null, "data-node":n._uid}, gLinks);
    path.style.setProperty("--delay", (n._depth * 0.16) + "s");
    linkOf[n._uid] = path;
  });

  /* 分岐点（共通祖先） */
  nodes.filter(n => n.ch && n.ch.length).forEach(n => {
    const [x,y] = P(n._r, n._a);
    const g = el("g", {class:"node" + (n.poly?" poly":"") + (n._parent? "":" root"), transform:`translate(${f(x)},${f(y)})`, tabindex:"0", role:"button", "aria-label":n.ja, "data-node":n._uid}, gNodes);
    g.style.setProperty("--delay", (n._depth * 0.16 + 0.1) + "s");
    el("circle", {r: n._parent ? 9 : 14, class:"hit"}, g);
    el("circle", {r: n._parent ? (n.poly? 4.2 : 3.6) : 7, class:"dot"}, g);
    const title = el("title", {}, g); title.textContent = n.ja + (n.poly ? "（内部の分岐順は未解決）" : "");
    g.addEventListener("click", e => { e.stopPropagation(); o.onNode && o.onNode(n); });
    g.addEventListener("keydown", e => { if(e.key==="Enter") o.onNode && o.onNode(n); });
    g.addEventListener("mouseenter", () => api.light(n));
    g.addEventListener("mouseleave", () => api.light(null));
  });

  /* 末端（生物） */
  leaves.forEach(l => {
    const org = App.org(l.tip) || {ja:l.tip};
    const ri = R + 42, [x,y] = P(ri, l._a);
    const g = el("g", {class:"tip", transform:`translate(${f(x)},${f(y)})`, tabindex:"0", role:"button", "aria-label":org.ja, "data-node":l._uid, "data-tip":l.tip}, gTips);
    g.style.setProperty("--delay", (maxDepth * 0.16 + 0.15 + (l._a+8)/360*0.5) + "s");
    const s = o.img;
    el("circle", {r:s/2+20, class:"tip-hit"}, g);
    el("circle", {r:s/2+6, class:"tip-disc"}, g);
    const im = el("image", {href:org.img, x:-s/2, y:-s/2, width:s, height:s, preserveAspectRatio:"xMidYMid meet"}, g);
    im.addEventListener("error", () => { im.remove(); const t = el("text",{class:"tip-ph","text-anchor":"middle",dy:"4"}, g); t.textContent = "制作中"; });
    // ラベル：外側へ
    const [lx,ly] = P(s/2 + 22, l._a);
    const lab = el("text", {class:"tip-label", x:f(lx), y:f(ly + 4), "text-anchor": Math.abs(lx) < 12 ? "middle" : (lx > 0 ? "start" : "end")}, g);
    lab.textContent = org.ja;
    if(l.phylum){ const pl = el("text", {class:"tip-phylum", x:f(lx), y:f(ly + 19), "text-anchor": lab.getAttribute("text-anchor")}, g); pl.textContent = App.phylum(l.phylum).ja; }
    g.addEventListener("click", e => { e.stopPropagation(); o.onTip && o.onTip(l.tip, l); });
    g.addEventListener("keydown", e => { if(e.key==="Enter") o.onTip && o.onTip(l.tip, l); });
    g.addEventListener("mouseenter", () => api.light(l));
    g.addEventListener("mouseleave", () => api.light(null));
  });

  const api = {
    svg, root, nodes, leaves,
    /* 根からその点までの系統をたどって光らせる */
    light(n){
      svg.classList.toggle("lighting", !!n);
      App.$$(".link.lit, .node.lit, .tip.lit", svg).forEach(e => e.classList.remove("lit"));
      if(!n) return;
      // 選んだ点より下（子孫）と、根までの祖先
      T.ancestors(n).forEach(a => { linkOf[a._uid] && linkOf[a._uid].classList.add("lit"); const ne = svg.querySelector(`.node[data-node="${a._uid}"]`); ne && ne.classList.add("lit"); });
      (function down(m){ (m.ch||[]).forEach(c => { linkOf[c._uid] && linkOf[c._uid].classList.add("lit"); const t = svg.querySelector(`[data-node="${c._uid}"].tip, .node[data-node="${c._uid}"]`); t && t.classList.add("lit"); down(c); }); })(n);
      const t = svg.querySelector(`.tip[data-node="${n._uid}"]`); t && t.classList.add("lit");
    },
    /* 2つの生物の共通祖先を示す */
    pair(a, b){
      App.$$(".pairlit, .mrca", svg).forEach(e => e.classList.remove("pairlit","mrca"));
      svg.classList.toggle("pairing", !!(a||b));
      [a,b].filter(Boolean).forEach(x => {
        const m = b && a ? T.mrca(a,b) : null;
        let n = x;
        while(n && n !== m){ linkOf[n._uid] && linkOf[n._uid].classList.add("pairlit"); n = n._parent; }
        const t = svg.querySelector(`.tip[data-node="${x._uid}"]`); t && t.classList.add("pairlit");
      });
      if(a && b){ const m = T.mrca(a,b); const ne = svg.querySelector(`.node[data-node="${m._uid}"]`); ne && ne.classList.add("mrca"); return m; }
      return null;
    },
    grow(){
      if(App.reduced() || !o.grow){ svg.classList.add("grown"); return; }
      svg.classList.add("growing");
      requestAnimationFrame(() => requestAnimationFrame(() => svg.classList.add("grown")));
    },
    leafOf(tipId){ return leaves.find(l => l.tip === tipId); }
  };
  return api;
};

/* ---------- 小さな長方形の樹（図鑑用） ---------- */
T.mini = function(container, root, opts={}){
  const o = Object.assign({highlight:null, labelOf:n => n.ja, onTip:null, rowH:26, colW:22, labelW:96}, opts);
  const {nodes, leaves, maxDepth} = prepare(root);
  leaves.forEach((l,i) => { l._y = i * o.rowH + o.rowH/2; l._x = maxDepth * o.colW; });
  (function setY(n){ if(n.ch && n.ch.length){ n.ch.forEach(setY); n._y = (n.ch[0]._y + n.ch[n.ch.length-1]._y)/2; n._x = n._depth * o.colW; } })(root);
  const W = maxDepth * o.colW + 10 + o.labelW, H = leaves.length * o.rowH;
  const svg = el("svg", {viewBox:`-6 0 ${W+6} ${H}`, class:"tree-mini", role:"img", "aria-label":"系統樹上の位置"});
  container.appendChild(svg);
  const hl = o.highlight ? leaves.find(o.highlight) : null;
  const lit = new Set(hl ? T.ancestors(hl) : []);
  nodes.forEach(n => {
    if(!n._parent) return;
    const p = n._parent;
    el("path", {d:`M${p._x},${p._y} V${n._y} H${n._x}`, class:"mlink" + (lit.has(n)?" lit":"") + (n.st==="debate"?" debate":"")}, svg);
  });
  nodes.filter(n => n.ch && n.ch.length).forEach(n => {
    const c = el("circle", {cx:n._x, cy:n._y, r: n.poly? 3 : 2.4, class:"mnode" + (n.poly?" poly":"") + (lit.has(n)?" lit":"")}, svg);
    const t = el("title", {}, c); t.textContent = n.ja + (n.poly?"（内部の分岐順は未解決）":"");
  });
  leaves.forEach(l => {
    const t = el("text", {x:l._x + 8, y:l._y + 4, class:"mlabel" + (l === hl ? " lit" : "")}, svg);
    t.textContent = o.labelOf(l);
    if(o.onTip){ t.style.cursor = "pointer"; t.addEventListener("click", () => o.onTip(l)); }
  });
  return svg;
};

/* ---------- 拡大・移動（マウス・タッチ共通） ----------
   1本指／ドラッグ：移動　2本指：拡大縮小　ホイール：拡大縮小
   少しでも動かした操作は「タップ」として扱わない */
T.panZoom = function(svg, opts={}){
  const o = Object.assign({min:.35, max:4}, opts);
  const vb0 = svg.getAttribute("viewBox").split(/[\s,]+/).map(Number);
  let vb = vb0.slice(), enabled = false, moved = false;
  const pts = new Map();
  let start = null;
  const set = () => svg.setAttribute("viewBox", vb.map(n => Math.round(n*10)/10).join(" "));
  const toSvg = (cx, cy) => { const r = svg.getBoundingClientRect(); return [vb[0] + (cx - r.left)/r.width*vb[2], vb[1] + (cy - r.top)/r.height*vb[3]]; };
  function zoomAt(cx, cy, k){
    const s = vb0[2] / (vb[2] / k);
    if(s < o.min || s > o.max) return;
    const [px, py] = toSvg(cx, cy);
    vb = [px - (px - vb[0])/k, py - (py - vb[1])/k, vb[2]/k, vb[3]/k]; set();
  }
  const snapshot = () => {
    const a = [...pts.values()];
    if(a.length === 1) return {x:a[0].x, y:a[0].y, vb:vb.slice()};
    const [p, q] = a; return {x:(p.x+q.x)/2, y:(p.y+q.y)/2, d:Math.hypot(p.x-q.x, p.y-q.y), vb:vb.slice()};
  };
  svg.addEventListener("pointerdown", e => {
    if(!enabled) return;
    pts.set(e.pointerId, {x:e.clientX, y:e.clientY});
    if(pts.size === 1) moved = false;
    start = snapshot();
  });
  svg.addEventListener("pointermove", e => {
    if(!enabled || !pts.has(e.pointerId)) return;
    pts.set(e.pointerId, {x:e.clientX, y:e.clientY});
    const r = svg.getBoundingClientRect(), cur = snapshot();
    const dx = (cur.x - start.x)/r.width*start.vb[2], dy = (cur.y - start.y)/r.height*start.vb[3];
    if(Math.abs(cur.x-start.x) + Math.abs(cur.y-start.y) > 6){
      if(!moved){ moved = true; try{ svg.setPointerCapture(e.pointerId); }catch(_){} }
    }
    if(!moved) return;
    if(pts.size === 1){ vb = [start.vb[0]-dx, start.vb[1]-dy, start.vb[2], start.vb[3]]; set(); }
    else if(start.d){
      const k = Math.max(o.min*start.vb[2]/vb0[2], Math.min(cur.d/start.d, o.max));
      vb = start.vb.slice(); vb[0] -= dx; vb[1] -= dy; set();
      zoomAt(cur.x, cur.y, cur.d/start.d);
    }
  });
  const up = e => { pts.delete(e.pointerId); start = pts.size ? snapshot() : null; };
  svg.addEventListener("pointerup", up); svg.addEventListener("pointercancel", up);
  svg.addEventListener("click", e => { if(moved){ e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  svg.addEventListener("wheel", e => { if(!enabled) return; e.preventDefault(); zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.15 : 1/1.15); }, {passive:false});
  return {
    enable(on){ enabled = on; svg.classList.toggle("pz-on", on); },
    reset(){ vb = vb0.slice(); set(); },
    zoom(k){ const r = svg.getBoundingClientRect(); zoomAt(r.left + r.width/2, r.top + r.height/2, k); },
    focus(x, y, scale){ const w = vb0[2]/scale, h = vb0[3]/scale; vb = [x - w/2, y - h/2, w, h]; set(); }
  };
};
})();
