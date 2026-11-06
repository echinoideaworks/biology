/* ヒトカイチュウ（回虫）の縦断・横断面
   根拠：OpenStax Biology 2e §28.5・§27.2、寄生虫学実験マニュアル（Nematoda I）、research/04 §2・06 §5。
   側線を通る神経（側神経）は資料で記述が割れるため描いていない。雌の生殖器官は省略。 */
(function(){
const App = window.App;
App.anatomyDefs = App.anatomyDefs || {};
const f = n => Math.round(n*10)/10;
const L = "#3a332b";

/* ---------- 縦断（左が前）。くねりの動きのため、中心線から形を計算する ---------- */
const X0 = 30, X1 = 770, YM = 130;
const halfW = x => { const t = (x - X0) / (X1 - X0); return 26 * Math.min(1, Math.min(t * 7, (1 - t) * 5)) + 1.5; };
function shapes(phase, amp){
  const cy = x => YM + amp * Math.sin((x - X0) / 120 * Math.PI - phase) * Math.min(1, (x - X0)/200);
  let top = "", bot = "", mid = "", gut = "", gutB = "";
  for(let x = X0; x <= X1; x += 8){
    top += `${top?" L":"M"}${x},${f(cy(x) - halfW(x))}`;
    mid += `${mid?" L":"M"}${x},${f(cy(x))}`;
    if(x >= 110 && x <= 738){ gut += `${gut?" L":"M"}${x},${f(cy(x) - Math.min(8, halfW(x)*0.32))}`; }
  }
  for(let x = X1; x >= X0; x -= 8){
    bot += ` L${x},${f(cy(x) + halfW(x))}`;
    if(x >= 110 && x <= 738) gutB += ` L${x},${f(cy(x) + Math.min(8, halfW(x)*0.32))}`;
  }
  const ph = [];
  for(let x = 34; x <= 110; x += 8) ph.push(x);
  const phT = ph.map((x,i) => `${i?" L":"M"}${x},${f(cy(x) - 5)}`).join(""), phB = ph.slice().reverse().map(x => ` L${x},${f(cy(x) + 5)}`).join("");
  const rx = 738, ax = 752;
  return {
    body: top + bot + "Z",
    lat: mid,
    gut: gut + gutB + "Z",
    phar: phT + phB + "Z",
    rect: `M${rx},${f(cy(rx))} L${ax},${f(cy(ax) + halfW(ax) - 1)}`,
    mouth: [X0 + 2, cy(X0 + 2)],
    anus: [ax, cy(ax) + halfW(ax) - 1]
  };
}
const s0 = shapes(0, 0);
const anatomySvg = `
  <g data-layer="body">
    <path class="kc-body" data-part="body" d="${s0.body}" fill="#EAD9C6" stroke="${L}" stroke-width="2.2" stroke-linejoin="round"/>
    <path class="kc-lat" data-part="lateral" d="${s0.lat}" fill="none" stroke="#9C8264" stroke-width="1.1" stroke-dasharray="5 4"/>
  </g>
  <g data-layer="gut">
    <path class="kc-gut" data-part="intestine" d="${s0.gut}" fill="#D2B47E" stroke="${L}" stroke-width="1.2"/>
    <path class="kc-phar" data-part="pharynx" d="${s0.phar}" fill="#B98F62" stroke="${L}" stroke-width="1.3"/>
    <path class="kc-rect" data-part="rectum" d="${s0.rect}" fill="none" stroke="#8A6A44" stroke-width="3" stroke-linecap="round"/>
    <circle class="kc-mouth" data-part="mouth" cx="${f(s0.mouth[0])}" cy="${f(s0.mouth[1])}" r="5" fill="#F7EEE2" stroke="${L}" stroke-width="1.2"/>
    <circle class="kc-anus" data-part="anus" cx="${f(s0.anus[0])}" cy="${f(s0.anus[1])}" r="3.5" fill="#F7EEE2" stroke="${L}" stroke-width="1.2"/>
  </g>`;

const parts = {
  body:{ja:"体（クチクラに覆われる）",en:"body",text:"細長い円筒形で、両端がとがる。体節はない。体の表面は丈夫なクチクラで覆われ、成長するときは脱皮する。",wrong:"ミミズのような体節はない。",src:["U6"]},
  lateral:{ja:"側線",en:"lateral line",text:"体の左右に見える縦のすじ。内側の表皮が厚くなった部分で、中を排出管が通る。",src:["U6","CHK"]},
  mouth:{ja:"口",en:"mouth",text:"前端にある（3つの唇で囲まれる）。",src:["CHK"]},
  pharynx:{ja:"咽頭",en:"pharynx",text:"筋肉の発達した部分で、食物を吸い込んで腸へ送る。",src:["U6"]},
  intestine:{ja:"腸",en:"intestine",text:"体の大部分を貫く1本の管。消化と吸収を行う。",src:["U6"]},
  rectum:{ja:"直腸",en:"rectum",text:"腸の後端から肛門までの短い部分。",src:["U6"]},
  anus:{ja:"肛門",en:"anus",text:"後端近くの腹側に開く。口から肛門までつながった消化管（完全な消化管）をもつ。",wrong:"扁形動物（プラナリア）とちがい、肛門がある。",src:["U6"]},
  cuticle:{ja:"クチクラ",en:"cuticle",text:"体の最も外側の丈夫な層。厚いクチクラが体の円い断面を保つ。脱皮して新しくする（脱皮動物）。",src:["U6"]},
  hypodermis:{ja:"表皮",en:"hypodermis",text:"クチクラの内側の薄い層。背・腹・左右の4か所で厚くなり、内側へ張り出す（索）。",src:["U6","CHK"]},
  cordD:{ja:"背側の索・腹側の索",en:"dorsal / ventral cords",text:"表皮の背側と腹側の厚い部分。中を主要な神経索が通る（腹側がよく発達する）。",src:["U6"]},
  cordL:{ja:"側線（側索）",en:"lateral cord",text:"左右の表皮の厚い部分。中を排出管が通る。側線を通る神経については資料で記述が分かれるため、この図では描いていない。",src:["U6","CHK"]},
  muscle:{ja:"縦走筋",en:"longitudinal muscle",text:"体の前後方向に走る筋肉だけをもち、環状筋がない。そのため、体を左右（背腹）にむちのようにくねらせて動く。",wrong:"ミミズのような環状筋はない。",src:["U6"]},
  pseudocoel:{ja:"偽体腔",en:"pseudocoelom",text:"体壁の筋肉と腸の間の、液体で満たされた腔。中胚葉由来の体腔の膜に完全には囲まれていない。中の液体の圧力が体を支える。",wrong:"「偽体腔＝体腔がない」ではない。腔はあるが真体腔ではない。",src:["U6","CHK"]}
};

App.anatomyDefs.kaichu = {
  anatomy:{
    title:"回虫の縦断（左が前）",
    viewBox:"0 0 800 260",
    caption:"体を縦に見た模式図。雌の生殖器官（体の中の大部分を占める）は省略している。",
    svg:anatomySvg,
    layers:[
      {id:"body",ja:"体・側線",color:"#9C8264"},
      {id:"gut",ja:"消化管",color:"#B98F62"}
    ],
    parts,
    actions:[{id:"wiggle",ja:"▶ くねって動く",run(api, done){
      const q = c => api.svg.querySelector(c);
      const els = {body:q(".kc-body"), lat:q(".kc-lat"), gut:q(".kc-gut"), phar:q(".kc-phar"), rect:q(".kc-rect"), mouth:q(".kc-mouth"), anus:q(".kc-anus")};
      const t0 = performance.now(), dur = App.reduced() ? 50 : 4200;
      api.caption("縦走筋だけをもつので、体の背側と腹側を交互に縮めて、むちのようにくねらせる。");
      let stop = false;
      (function frame(now){
        if(stop || !els.body.isConnected) return;
        const t = Math.min(1, (now - t0) / dur);
        const amp = 18 * Math.sin(Math.PI * t);
        const s = shapes((now - t0) / 260, amp);
        els.body.setAttribute("d", s.body); els.lat.setAttribute("d", s.lat); els.gut.setAttribute("d", s.gut);
        els.phar.setAttribute("d", s.phar); els.rect.setAttribute("d", s.rect);
        els.mouth.setAttribute("cy", f(s.mouth[1])); els.anus.setAttribute("cy", f(s.anus[1]));
        if(t < 1) requestAnimationFrame(frame); else done();
      })(t0);
      api.later(dur + 400, () => { stop = true; });
    }}]
  },
  section:{
    title:"回虫の横断面",
    viewBox:"0 0 500 400",
    caption:"体を輪切りにした模式図（上が背側）。",
    svg:`
      <g data-layer="body">
        <circle data-part="cuticle" cx="250" cy="200" r="146" fill="#F1E5D3" stroke="${L}" stroke-width="2.2"/>
        <circle data-part="hypodermis" cx="250" cy="200" r="134" fill="#E3CFB4" stroke="${L}" stroke-width="1"/>
        <g data-part="muscle">${Array.from({length:40}, (_,i) => { const dg = i*9 + 4.5; if([0,90,180,270].some(c => Math.abs(((dg - c + 540) % 360) - 180) < 13)) return ""; const a = dg*Math.PI/180; return `<path d="M${f(250+128*Math.cos(a))},${f(200+128*Math.sin(a))} L${f(250+98*Math.cos(a))},${f(200+98*Math.sin(a))}" stroke="#B0705A" stroke-width="9" stroke-linecap="round"/>`; }).join("")}</g>
        <ellipse data-part="cordD" cx="250" cy="76" rx="15" ry="22" fill="#E3CFB4" stroke="${L}" stroke-width="1.2"/>
        <ellipse data-part="cordD" cx="250" cy="324" rx="17" ry="24" fill="#E3CFB4" stroke="${L}" stroke-width="1.2"/>
        <circle data-part="cordD" cx="250" cy="74" r="5" fill="#9C8CC6" stroke="#5E4F8C" stroke-width="1"/>
        <circle data-part="cordD" cx="250" cy="327" r="6.5" fill="#9C8CC6" stroke="#5E4F8C" stroke-width="1"/>
        <ellipse data-part="cordL" cx="126" cy="200" rx="24" ry="17" fill="#E3CFB4" stroke="${L}" stroke-width="1.2"/>
        <ellipse data-part="cordL" cx="374" cy="200" rx="24" ry="17" fill="#E3CFB4" stroke="${L}" stroke-width="1.2"/>
        <circle data-part="cordL" cx="126" cy="200" r="5" fill="#A9CFDB" stroke="#3F7890" stroke-width="1"/>
        <circle data-part="cordL" cx="374" cy="200" r="5" fill="#A9CFDB" stroke="#3F7890" stroke-width="1"/>
      </g>
      <g data-layer="coelom"><path data-part="pseudocoel" d="M250,104 C320,104 352,150 352,200 C352,252 318,296 250,296 C182,296 148,252 148,200 C148,150 180,104 250,104Z M250,172 C290,172 302,186 302,200 C302,214 290,228 250,228 C210,228 198,214 198,200 C198,186 210,172 250,172Z" fill="#FBF6EC" fill-rule="evenodd" stroke="#C4B9A3" stroke-width="1" stroke-dasharray="4 3"/></g>
      <g data-layer="gut"><path data-part="intestine" d="M250,172 C290,172 302,186 302,200 C302,214 290,228 250,228 C210,228 198,214 198,200 C198,186 210,172 250,172Z" fill="#D2B47E" stroke="${L}" stroke-width="1.6"/></g>`,
    layers:[
      {id:"body",ja:"体壁",color:"#B0705A"},
      {id:"coelom",ja:"偽体腔",color:"#C4B9A3"},
      {id:"gut",ja:"消化管",color:"#B98F62"}
    ],
    parts,
    actions:[]
  }
};
const sp = App.data.phylumDetail && App.data.phylumDetail.nematoda && App.data.phylumDetail.nematoda.species;
if(sp && sp.kaichu) sp.kaichu.anatomy = "kaichu";
})();
