/* ヒドラの縦断面
   根拠：OpenStax Biology 2e §28.2（二胚葉性：外胚葉由来の表皮と内胚葉由来の胃層、間の中膠は非細胞性、
   消化循環腔の開口は口1つ、刺胞細胞の刺胞・刺針で刺糸を発射）、research/04 §7.2。
   体の管（体・触手）を太さの異なる線を重ねて描き、外胚葉→中膠→内胚葉→腔の層にしている。 */
(function(){
const App = window.App;
App.anatomyDefs = App.anatomyDefs || {};
const L = "#3a332b";

const column = "M200,560 L200,168";
const tentL = "M188,160 C160,120 120,80 70,40";
const tentR = "M212,160 C240,120 280,80 330,40";
const tentM = "M176,164 C150,150 110,150 60,168";
const tentN = "M224,164 C250,150 290,150 340,168";
const tubes = [[column, 120],[tentL, 30],[tentR, 30],[tentM, 26],[tentN, 26]];
const layer = (w, color, cls, extra) => tubes.map(([d, W]) => `<path d="${d}" stroke="${color}" stroke-width="${W - w}" fill="none" stroke-linecap="round" ${extra||""}/>`).join("");
// 刺胞細胞（触手の外胚葉に並ぶ）
function cnidos(){
  const pts = [];
  [[70,40,188,160],[330,40,212,160],[60,168,176,164],[340,168,224,164]].forEach(([x0,y0,x1,y1]) => {
    for(let t = 0.08; t < 0.8; t += 0.12){ pts.push([x0 + (x1-x0)*t, y0 + (y1-y0)*t]); }
  });
  return pts.map(([x,y]) => `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="4" ry="3" fill="#F3E6C4" stroke="#7A5C2E" stroke-width="1"/>`).join("");
}

const anatomySvg = `
  <g data-layer="ecto"><g data-part="ecto">${layer(0, "#D9B89A")}</g></g>
  <g data-layer="meso"><g data-part="meso">${layer(14, "#3a332b")}</g><g pointer-events="none">${layer(16, "#D9B89A")}</g></g>
  <g data-layer="endo"><g data-part="endo">${layer(16, "#A7B98A")}</g></g>
  <g data-layer="cavity">
    <g data-part="cavity">${tubes.map(([d, W]) => `<path d="${d}" stroke="#F3F1E6" stroke-width="${W - 46 > 2 ? W - 46 : 3}" fill="none" stroke-linecap="round"/>`).join("")}</g>
    <path data-part="mouth" d="M200,176 L200,100" stroke="#F3F1E6" stroke-width="16" fill="none"/>
    <path data-part="cavity" d="M200,544 L200,150" stroke="#F3F1E6" stroke-width="74" fill="none"/>
  </g>
  <g data-layer="cnido"><g data-part="cnidocyte">${cnidos()}</g></g>
  <g data-layer="ecto"><path data-part="basal" d="M144,560 Q200,590 256,560" fill="#C9A27C" stroke="${L}" stroke-width="2"/></g>
  <g class="hd-zoom" opacity="0" pointer-events="none">
    <circle cx="300" cy="420" r="86" fill="#FFFDF7" stroke="${L}" stroke-width="1.6"/>
    <path d="M233,374 L118,90" stroke="${L}" stroke-width=".8" stroke-dasharray="4 3"/>
    <path d="M250,352 Q300,330 350,352 L350,470 Q300,494 250,470Z" fill="#E7CDA9" stroke="${L}" stroke-width="1.2"/>
    <ellipse cx="300" cy="420" rx="22" ry="32" fill="#F7EBC9" stroke="#7A5C2E" stroke-width="1.6"/>
    <path class="hd-coil" d="M300,440 c-10,-6 10,-12 0,-18 c-10,-6 10,-12 0,-18 c-10,-6 10,-12 0,-12" fill="none" stroke="#7A5C2E" stroke-width="1.4"/>
    <path d="M318,394 l16,-14" stroke="${L}" stroke-width="1.6"/>
    <path class="hd-thread" d="M300,388 C300,360 310,330 300,300 C292,276 310,258 302,236" fill="none" stroke="#7A5C2E" stroke-width="2" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>
  </g>`;

App.anatomyDefs.hidora = {
  anatomy:{
    title:"ヒドラの縦断面",
    viewBox:"0 0 400 600",
    caption:"体を縦に切った模式図（触手は4本だけ描いている）。体の壁は2つの細胞の層と、その間の中膠でできている。",
    svg:anatomySvg,
    layers:[
      {id:"ecto",ja:"外胚葉",color:"#D9B89A"},
      {id:"meso",ja:"中膠",color:"#3a332b"},
      {id:"endo",ja:"内胚葉",color:"#A7B98A"},
      {id:"cavity",ja:"消化循環腔・口",color:"#C4B9A3"},
      {id:"cnido",ja:"刺胞細胞",color:"#7A5C2E"}
    ],
    parts:{
      ecto:{ja:"外胚葉（表皮）",en:"epidermis",text:"体の外側の細胞の層。外胚葉に由来する。",src:["U6"]},
      meso:{ja:"中膠",en:"mesoglea",text:"外胚葉と内胚葉の間にある、ゼラチン状の層。細胞でできた層ではない。",wrong:"中膠を「中胚葉」と混同しない。刺胞動物は二胚葉性。",src:["U6"]},
      endo:{ja:"内胚葉（胃層）",en:"gastrodermis",text:"体の内側の細胞の層。内胚葉に由来し、消化を行う。",src:["U6"]},
      cavity:{ja:"消化循環腔",en:"gastrovascular cavity",text:"体と触手の内側に続く空間。消化と、栄養を体じゅうへ運ぶ働きを兼ねる。",src:["U6"]},
      mouth:{ja:"口",en:"mouth",text:"消化循環腔の開口は口1つだけ。食べかすも口から出す。肛門はない。",src:["U6"]},
      cnidocyte:{ja:"刺胞細胞",en:"cnidocyte",text:"触手の外胚葉に多く並ぶ。中の刺胞に、毒をもつ刺糸が巻いておさめられている。刺針に触れると刺糸を発射して獲物をとらえる。",src:["U6"]},
      basal:{ja:"足盤",en:"basal disc",text:"体の下端で、水草などに付着する。",src:["CHK"]}
    },
    actions:[{id:"fire",ja:"▶ 刺胞を発射する",run(api, done){
      api.setLayer("cnido", true);
      const z = api.svg.querySelector(".hd-zoom"), th = api.svg.querySelector(".hd-thread"), coil = api.svg.querySelector(".hd-coil");
      z.setAttribute("opacity", "1");
      api.caption("<b>① 刺胞細胞（拡大）</b>　刺胞の中に刺糸が巻いておさめられている。右上の突起が刺針。");
      api.later(1500, () => {
        api.caption("<b>② 刺針に触れると発射</b>　刺糸が一瞬で飛び出し、獲物に刺さる。");
        coil.setAttribute("opacity", ".2");
        th.animate([{strokeDashoffset:1},{strokeDashoffset:0}], {duration:App.reduced()?10:450, fill:"forwards", easing:"ease-out"});
      });
      api.later(5000, () => { z.setAttribute("opacity", "0"); coil.setAttribute("opacity", "1"); th.getAnimations().forEach(a => a.cancel()); done(); });
    }}]
  }
};
const sp = App.data.phylumDetail && App.data.phylumDetail.cnidaria && App.data.phylumDetail.cnidaria.species;
if(sp && sp.hidora) sp.hidora.anatomy = "hidora";
})();
