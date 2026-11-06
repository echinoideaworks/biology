/* ナメクジウオの体のつくり（側面の縦断・咽頭部の横断の模式図）
   形の根拠：OpenStax Biology 2e §29.1（脊索・背側の中空の神経管・咽頭裂・肛門より後ろの尾・内柱。ナメクジウオは成体でも保持、脊索が頭部先端まで伸びる）、research/04 §6。
   位置関係：背側から 神経管 → 脊索 → 消化管（腹側）。 */
(function(){
const App = window.App;
App.anatomyDefs = App.anatomyDefs || {};
const L = "#3a332b";

const body = "M40,152 C60,128 120,112 220,108 C360,104 500,110 600,128 C630,134 650,142 664,150 C650,160 630,166 600,170 C500,190 360,196 220,192 C120,190 60,176 40,152 Z";
const myomeres = Array.from({length:30}, (_,i) => { const x = 120 + i*17; return `<path d="M${x},116 L${x-9},150 L${x},186" fill="none" stroke="#C98A6B" stroke-width="1" opacity=".6"/>`; }).join("");
const slits = Array.from({length:14}, (_,i) => { const x = 104 + i*13; return `<path d="M${x},146 L${x+7},180" stroke="${L}" stroke-width="1.6"/>`; }).join("");
const cirri = Array.from({length:7}, (_,i) => `<path d="M${60+i*5},164 l-${8+i},${14+i%3*3}" stroke="${L}" stroke-width="1.1"/>`).join("");

const svg = `
  <g data-layer="body">
    <path data-part="fin" d="M120,112 C260,92 480,96 640,140 C650,146 662,150 664,150 C600,186 520,204 480,196" fill="#F1DCC9" stroke="${L}" stroke-width="1.2" opacity=".9"/>
    <path data-part="body" d="${body}" fill="#EBC9B3" fill-opacity=".6" stroke="${L}" stroke-width="2.2"/>
    <g data-part="myomere">${myomeres}</g>
    <g data-part="cirri">${cirri}</g>
  </g>
  <g data-layer="nerve">
    <path data-part="nervecord" d="M62,132 C200,120 420,118 640,142" fill="none" stroke="#8C7AAE" stroke-width="5" stroke-linecap="round"/>
  </g>
  <g data-layer="noto">
    <path data-part="notochord" d="M44,146 C200,134 420,132 660,150" fill="none" stroke="#C8B26A" stroke-width="7" stroke-linecap="round"/>
  </g>
  <g data-layer="gut">
    <path data-part="pharynx" d="M90,158 C140,152 240,150 290,154 L292,184 C240,188 140,188 92,182 Z" fill="#F4E3C6" stroke="${L}" stroke-width="1.4"/>
    <g data-part="slits">${slits}</g>
    <path data-part="endostyle" d="M96,186 C150,190 240,190 290,186" fill="none" stroke="#5C97A3" stroke-width="3.4"/>
    <path data-part="gut" d="M290,168 C360,166 440,166 520,172" fill="none" stroke="#B88A4E" stroke-width="7" stroke-linecap="round"/>
    <circle data-part="anus" cx="522" cy="176" r="5" fill="#FFFDF7" stroke="${L}" stroke-width="1.6"/>
    <path data-part="tail" d="M530,130 C580,136 630,142 664,150 C630,160 580,168 530,176" fill="#C8E0D4" fill-opacity=".45" stroke="#4F7A68" stroke-width="1.6" stroke-dasharray="5 3"/>
  </g>`;

const parts = {
  body:{ja:"体",en:"body",text:"魚のような形だが、ひれの骨・目・あごはない。砂にもぐって生活する。",src:["U6","CHK"]},
  fin:{ja:"ひれ状のひだ",en:"fin fold",text:"背と尾の縁にあるひだ。脊椎動物のひれのような骨はない。",src:["CHK"]},
  myomere:{ja:"筋節",en:"myomere",text:"く字形の筋肉のかたまりが前後にくり返し並ぶ。体を左右にくねらせて泳ぐ。",src:["U6","CHK"]},
  cirri:{ja:"触鬚（口ひげ）",en:"oral cirri",text:"口のまわりの細い突起。大きな粒子が入るのを防ぐ。",src:["CHK"]},
  nervecord:{ja:"背側の神経管",en:"dorsal hollow nerve cord",text:"脊索の背側を走る中空の神経の管。脊椎動物では脳と脊髄になる。",src:["U6"]},
  notochord:{ja:"脊索",en:"notochord",text:"神経管と消化管の間にある、柔らかく弾力のある棒。体を支える。ナメクジウオでは頭の先端まで伸びる（頭索動物の名の由来）。",wrong:"脊索は背骨（脊椎）ではない。脊椎動物では発生の途中で脊椎に置き換わる。",src:["U6"]},
  pharynx:{ja:"咽頭",en:"pharynx",text:"口の奥の大きな部屋。壁に多数のすき間（咽頭裂）がある。",src:["U6"]},
  slits:{ja:"咽頭裂（鰓裂）",en:"pharyngeal slits",text:"咽頭の壁のすき間。水はここを通って外へ出て、食物の粒は咽頭に残る（ろ過食）。魚類ではえらに発達する。",src:["U6"]},
  endostyle:{ja:"内柱",en:"endostyle",lv:"adv",text:"咽頭の底にある溝。粘液を出して食物の粒をからめとる。脊椎動物の甲状腺と相同とされる。",src:["U6"]},
  gut:{ja:"腸",en:"intestine",text:"咽頭から肛門へ続く消化管。",src:["CHK"]},
  anus:{ja:"肛門",en:"anus",text:"消化管の出口。尾はこの肛門より後ろに伸びる。",src:["U6"]},
  tail:{ja:"肛門より後ろの尾",en:"post-anal tail",text:"肛門より後ろまで伸びる、筋肉と脊索をもつ部分（点線の範囲）。",src:["U6"]}
};

/* 咽頭部の横断面 */
const bars = Array.from({length:16}, (_,i) => { const a = (i/16)*Math.PI*2; const x1 = 200 + 52*Math.cos(a), y1 = 228 + 64*Math.sin(a), x2 = 200 + 66*Math.cos(a), y2 = 228 + 80*Math.sin(a); return `<path d="M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}" stroke="${L}" stroke-width="3"/>`; }).join("");
const section = `
  <g data-layer="body">
    <path data-part="body" d="M200,30 C250,40 300,90 304,170 C308,260 290,330 250,360 C230,374 170,374 150,360 C110,330 92,260 96,170 C100,90 150,40 200,30 Z" fill="#EBC9B3" fill-opacity=".55" stroke="${L}" stroke-width="2.2"/>
    <path data-part="myomere" d="M200,62 C240,66 278,100 284,160 C260,150 230,140 214,124 Z M200,62 C160,66 122,100 116,160 C140,150 170,140 186,124 Z" fill="#D9A07F" fill-opacity=".6" stroke="${L}" stroke-width="1.1"/>
    <path data-part="atrium" d="M120,190 C122,150 160,140 200,140 C240,140 278,150 280,190 C284,250 266,316 200,330 C134,316 116,250 120,190 Z" fill="#EAF3F5" stroke="#4D8FA8" stroke-width="1.3" stroke-dasharray="4 3"/>
  </g>
  <g data-layer="nerve"><circle data-part="nervecord" cx="200" cy="72" r="11" fill="#E8DDF0" stroke="#7C6D9E" stroke-width="2"/><circle cx="200" cy="72" r="3" fill="#FFFDF7"/></g>
  <g data-layer="noto"><ellipse data-part="notochord" cx="200" cy="108" rx="16" ry="20" fill="#E9DFAE" stroke="#8C7A3A" stroke-width="2"/></g>
  <g data-layer="gut">
    <ellipse data-part="pharynx" cx="200" cy="228" rx="60" ry="74" fill="#F4E3C6" stroke="${L}" stroke-width="1.4"/>
    <g data-part="slits">${bars}</g>
    <path data-part="endostyle" d="M182,300 C190,310 210,310 218,300" fill="none" stroke="#5C97A3" stroke-width="5" stroke-linecap="round"/>
  </g>`;

App.anatomyDefs.namekujiuo = {
  anatomy:{
    title:"ナメクジウオの体のつくり（側面の縦断・模式図）",
    viewBox:"0 0 700 230",
    caption:"左が頭。背側から 神経管 → 脊索 → 消化管 の順に並ぶ。",
    svg, parts,
    layers:[
      {id:"body",ja:"外形・筋節",color:"var(--c-chordata)"},
      {id:"nerve",ja:"神経管",color:"#8C7AAE"},
      {id:"noto",ja:"脊索",color:"#C8B26A"},
      {id:"gut",ja:"咽頭・消化管",color:"#B88A4E"}
    ],
    actions:[{id:"four",ja:"▶ 脊索動物の特徴を順に見る",run(api, done){
      const s = api.svg;
      const mark = id => { s.classList.add("has-sel"); s.querySelectorAll("[data-part]").forEach(e => e.classList.toggle("sel", e.dataset.part === id)); };
      const steps = [
        ["notochord","<b>① 脊索</b>　神経管と消化管の間を通る、体を支える棒。"],
        ["nervecord","<b>② 背側の神経管</b>　脊索の背側を走る中空の管。"],
        ["slits","<b>③ 咽頭裂</b>　咽頭の壁に並ぶすき間。水が通り抜ける。"],
        ["tail","<b>④ 肛門より後ろの尾</b>　肛門より後ろまで、筋肉と脊索が伸びる。"]
      ];
      ["body","nerve","noto","gut"].forEach(l => api.setLayer(l, true));
      steps.forEach(([id, t], i) => api.later(i*1800, () => { mark(id); api.caption(t); }));
      api.later(steps.length*1800 + 600, () => { s.classList.remove("has-sel"); s.querySelectorAll(".sel").forEach(e => e.classList.remove("sel"));
        api.caption("ナメクジウオは一生この4つをもつ。ホヤは幼生のときだけもち、成体では脊索・神経管・尾がなくなる。"); done(); });
    }}]
  },
  section:{
    title:"ナメクジウオの咽頭部の横断面（模式図）",
    viewBox:"0 0 400 400",
    caption:"上が背側。神経管・脊索・咽頭が上から順に並び、咽頭のまわりを囲鰓腔がとり囲む。",
    svg:section,
    parts:Object.assign({}, parts, {
      atrium:{ja:"囲鰓腔",en:"atrium",lv:"adv",text:"咽頭のまわりをとり囲む空間。咽頭裂を通った水がここに集まり、体外へ出る。",src:["CHK"]},
      myomere:{ja:"筋節",en:"myomere",text:"背側の左右に厚い筋肉がある。",src:["CHK"]}
    }),
    layers:[
      {id:"body",ja:"体壁・筋肉",color:"var(--c-chordata)"},
      {id:"nerve",ja:"神経管",color:"#8C7AAE"},
      {id:"noto",ja:"脊索",color:"#C8B26A"},
      {id:"gut",ja:"咽頭",color:"#B88A4E"}
    ],
    actions:[]
  }
};
const D = App.data && App.data.phylumDetail;
if(D && D.chordata && D.chordata.species && D.chordata.species.namekujiuo) D.chordata.species.namekujiuo.anatomy = "namekujiuo";
})();
