/* 海綿動物の体のつくり（体壁の断面の模式図）
   形の根拠：OpenStax Biology 2e §28.1（襟細胞の鞭毛が水流を起こし、襟で食物粒子を捕らえる。入水孔→中央腔→大孔）、research/04 §7.1。
   カイロウドウケツ（六放海綿）の体壁は合胞体でつくりが異なるため、ここでは海綿動物一般の模式図として示す。 */
(function(){
const App = window.App;
App.anatomyDefs = App.anatomyDefs || {};
const L = "#3a332b";

/* 壺形の体：左右の壁に入水孔の通路、内側に襟細胞 */
const wallL = "M150,380 C120,300 112,180 150,70 L210,70 C186,170 186,290 214,380 Z";
const wallR = "M450,380 C480,300 488,180 450,70 L390,70 C414,170 414,290 386,380 Z";
const pores = [110,170,230,290,340];
const poreL = pores.map(y => { const xo = 150 - (y>300?-4:0) - 30*Math.sin((y-70)/310*Math.PI); return `<path d="M${(xo-6).toFixed(0)},${y} L${(xo+56).toFixed(0)},${y+4}" stroke="#FBF6EC" stroke-width="9" stroke-linecap="round"/>`; }).join("");
const poreR = pores.map(y => { const xo = 450 + 30*Math.sin((y-70)/310*Math.PI); return `<path d="M${(xo+6).toFixed(0)},${y} L${(xo-56).toFixed(0)},${y+4}" stroke="#FBF6EC" stroke-width="9" stroke-linecap="round"/>`; }).join("");
const choano = (x, y, dir) => `<g><ellipse cx="${x}" cy="${y}" rx="6" ry="8" fill="#F0D9A8" stroke="${L}" stroke-width="1"/><path d="M${x+dir*5},${y-5} l${dir*6},-3 M${x+dir*5},${y+5} l${dir*6},3" stroke="${L}" stroke-width=".9"/><path class="flag" d="M${x+dir*6},${y} q${dir*6},-5 ${dir*12},0 t${dir*12},0" fill="none" stroke="${L}" stroke-width="1"/></g>`;
const choL = [100,140,180,220,260,300,340].map(y => choano(196 + (y>300?6:0) - 8*Math.sin((y-70)/310*Math.PI), y, 1)).join("");
const choR = [100,140,180,220,260,300,340].map(y => choano(404 - (y>300?6:0) + 8*Math.sin((y-70)/310*Math.PI), y, -1)).join("");
const spic = Array.from({length:14}, (_,i) => { const left = i%2===0, y = 90 + Math.floor(i/2)*42, x = left ? 152 + (i%4)*4 : 432 - (i%4)*4; return `<path d="M${x},${y} l14,10 M${x+14},${y} l-14,10 M${x+7},${y-3} l0,16" stroke="#8C7A3A" stroke-width="1.4"/>`; }).join("");

const svg = `
  <g data-layer="body">
    <path data-part="wall" d="${wallL}" fill="#E3C9A0" fill-opacity=".7" stroke="${L}" stroke-width="2.2"/>
    <path data-part="wall" d="${wallR}" fill="#E3C9A0" fill-opacity=".7" stroke="${L}" stroke-width="2.2"/>
    <g data-part="ostia">${poreL}${poreR}</g>
    <path data-part="spongocoel" d="M210,70 C186,170 186,290 214,380 L386,380 C414,290 414,170 390,70 Z" fill="#F4F8F6" stroke="none"/>
    <path data-part="osculum" d="M210,70 C240,58 360,58 390,70" fill="none" stroke="#4D8FA8" stroke-width="3" stroke-dasharray="6 4"/>
    <path d="M150,380 L450,380" stroke="${L}" stroke-width="1.6"/>
  </g>
  <g data-layer="cells">
    <g data-part="choanocyte">${choL}${choR}</g>
  </g>
  <g data-layer="spic"><g data-part="spicule">${spic}</g></g>
  <g data-layer="flow-l">
    ${pores.map(y => `<path class="flow f1" d="M70,${y} L200,${y+4}"/><path class="flow f1" d="M530,${y} L400,${y+4}"/>`).join("")}
    <path class="flow f2" d="M300,360 C300,280 300,180 300,90"/>
    <path class="flow f3" d="M300,90 C300,60 300,40 300,14"/>
  </g>`;

App.anatomyDefs.kairoudoukutsu = {
  anatomy:{
    title:"海綿動物の体のつくり（体壁の断面・模式図）",
    viewBox:"0 0 600 400",
    caption:"海綿動物一般の模式図（縦に切った断面）。体の壁の小さな穴から水が入り、上の大きな穴から出る。",
    svg,
    parts:{
      wall:{ja:"体壁",en:"body wall",text:"多くの細胞が集まった壁。はっきりした組織や器官、神経や筋肉をもたない。",src:["U6"]},
      ostia:{ja:"入水孔",en:"ostia",text:"体壁にあいた多数の小さな穴。ここから水が体の中へ入る。",src:["U6"]},
      choanocyte:{ja:"襟細胞",en:"choanocyte",text:"内側に並ぶ細胞。鞭毛を動かして水の流れを起こし、襟の部分で水中の食物の粒をとらえて取り込む。",wrong:"襟細胞は襟鞭毛虫によく似るが、「動物の祖先そのもの」ではない。",src:["U6"]},
      spongocoel:{ja:"中央腔",en:"spongocoel",text:"体の中央の空間。入水孔から入った水が集まる。消化管ではない。",src:["U6"]},
      osculum:{ja:"大孔（出水孔）",en:"osculum",text:"体の上端の大きな穴。中央腔の水がここから外へ出る。入水孔より大きい。",src:["U6"]},
      spicule:{ja:"骨片",en:"spicule",text:"体を支える小さな骨格の粒。カイロウドウケツではガラス質（ケイ酸）の骨片が編み上げたような骨格をつくる。",src:["U1","CHK"]}
    },
    layers:[
      {id:"body",ja:"体壁",color:"var(--c-porifera)"},
      {id:"cells",ja:"襟細胞",color:"#D9B26A"},
      {id:"spic",ja:"骨片",color:"#8C7A3A"},
      {id:"flow-l",ja:"水の流れ",color:"var(--water)"}
    ],
    actions:[{id:"flow",ja:"▶ 水の流れをたどる",run(api, done){
      const s = api.svg;
      api.setLayer("flow-l", true); api.setLayer("cells", true);
      s.classList.remove("flowing","s1","s2","s3","s4"); void s.getBoundingClientRect(); s.classList.add("flowing");
      const steps = [
        ["s1","<b>① 入水孔から入る</b>　襟細胞の鞭毛が動いて水の流れを起こし、体壁の小さな穴から水が入る。"],
        ["s2","<b>② 中央腔に集まる</b>　襟細胞が水の中の食物の粒をとらえる。水は中央の空間に集まる。"],
        ["s3","<b>③ 大孔から出る</b>　水は上の大きな穴から外へ出ていく。"]
      ];
      steps.forEach(([c, t], i) => api.later(i*1800, () => { s.classList.add(c); api.caption(t); }));
      api.later(steps.length*1800 + 1500, () => done());
    }}]
  }
};
const D = App.data && App.data.phylumDetail;
if(D && D.porifera && D.porifera.species && D.porifera.species.kairoudoukutsu) D.porifera.species.kairoudoukutsu.anatomy = "kairoudoukutsu";
})();
