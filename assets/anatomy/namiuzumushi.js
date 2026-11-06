/* ナミウズムシ（プラナリア）の体のつくり（背側から透かして見た図）・横断面
   根拠：OpenStax Biology 2e §28.3（無体腔、口のみで肛門なし、眼点・脳神経節、2本の神経索、原腎管（炎細胞））、research/04 §7.3。
   咽頭が腹面中央から突き出す点は research/04 で [K]（出典確認中）。 */
(function(){
const App = window.App;
App.anatomyDefs = App.anatomyDefs || {};
const L = "#3a332b";
const C = 200;

/* 外形（上が頭） */
const outline = `M200,42 C214,42 228,58 240,74 C252,84 266,86 270,96 C266,108 252,110 244,118
  C250,170 252,260 250,360 C248,450 236,520 214,556 C208,566 192,566 186,556 C164,520 152,450 150,360
  C148,260 150,170 156,118 C148,110 134,108 130,96 C134,86 148,84 160,74 C172,58 186,42 200,42Z`;

/* 腸：前に1本、後ろに2本の主枝。枝は外側へ */
function gutBranches(){
  let d = "";
  // 前の主枝
  d += `M200,300 L200,128`;
  for(let y = 140; y <= 286; y += 24){ d += ` M200,${y} q-18,-4 -30,-14 M200,${y+10} q18,-4 30,-14`; }
  // 後ろの2本
  d += ` M200,300 C186,312 184,330 184,350 L184,540 M200,300 C214,312 216,330 216,350 L216,540`;
  for(let y = 344; y <= 528; y += 22){ d += ` M184,${y} q-20,-2 -26,-14 M216,${y} q20,-2 26,-14`; }
  return d;
}
const ladder = (() => {
  let d = `M182,122 C176,200 172,300 174,540 M218,122 C224,200 228,300 226,540`;
  for(let y = 150; y <= 520; y += 30){ d += ` M${174 + (y<300?2:0)},${y} H${226 - (y<300?2:0)}`; }
  return d;
})();
const proto = `M150,130 C140,200 146,280 140,360 C136,440 146,500 164,540 M250,130 C260,200 254,280 260,360 C264,440 254,500 236,540`;
const flames = [[147,180],[143,260],[140,360],[146,460],[253,180],[257,260],[260,360],[254,460]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="3"/>`).join("");

const anatomySvg = `
  <g data-layer="body">
    <path data-part="body" d="${outline}" fill="#B9A08A" fill-opacity=".45" stroke="${L}" stroke-width="2.2" stroke-linejoin="round"/>
    <path data-part="auricle" d="M160,74 C148,84 134,86 130,96 C134,108 148,110 156,118 M240,74 C252,84 266,86 270,96 C266,108 252,110 244,118" fill="none" stroke="${L}" stroke-width="1.1"/>
    <g data-part="eyespot"><ellipse cx="186" cy="92" rx="7" ry="5" fill="#fff" stroke="${L}" stroke-width="1"/><circle cx="188" cy="92" r="3" fill="#2E2B27"/><ellipse cx="214" cy="92" rx="7" ry="5" fill="#fff" stroke="${L}" stroke-width="1"/><circle cx="212" cy="92" r="3" fill="#2E2B27"/></g>
  </g>
  <g data-layer="gut">
    <path class="nz-gut" data-part="gut" d="${gutBranches()}" fill="none" stroke="#C9A06A" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <path data-part="pharynx" d="M193,302 C190,330 192,360 196,384 L204,384 C208,360 210,330 207,302Z" fill="#E8C9A0" stroke="${L}" stroke-width="1.5"/>
    <ellipse data-part="mouth" cx="200" cy="388" rx="7" ry="4" fill="#F7EEE2" stroke="${L}" stroke-width="1.2"/>
    <g class="nz-food" opacity="0" pointer-events="none" fill="#7A4E2A">${[0,1,2,3,4].map(i => `<circle cx="200" cy="${392 + i*8}" r="3.4"/>`).join("")}</g>
  </g>
  <g data-layer="nerve">
    <path data-part="brain" d="M186,106 C176,112 176,124 186,126 C194,128 198,120 200,116 C202,120 206,128 214,126 C224,124 224,112 214,106 C208,104 204,110 200,112 C196,110 192,104 186,106Z" fill="#9C8CC6" stroke="#5E4F8C" stroke-width="1.3"/>
    <path data-part="nervecord" d="${ladder}" fill="none" stroke="#7B6BA8" stroke-width="2.2"/>
  </g>
  <g data-layer="excret">
    <path data-part="protonephridia" d="${proto}" fill="none" stroke="#5E8C6A" stroke-width="1.4"/>
    <g data-part="protonephridia" fill="#7FB08A">${flames}</g>
  </g>`;

const parts = {
  body:{ja:"体（背腹に平たい）",en:"body",text:"背腹に平たい左右相称の体。体腔をもたない。循環系・呼吸器官もなく、平たい体の表面から酸素を取り入れる。",src:["U6"]},
  auricle:{ja:"耳葉",en:"auricle",lv:"adv",text:"頭部の左右に突き出した部分。化学物質などを感じとる。",src:["CHK"]},
  eyespot:{ja:"眼点",en:"eyespot",text:"頭部の背側に1対ある。光の方向を感じとる。",src:["U6"]},
  gut:{ja:"腸（枝分かれする）",en:"gastrovascular cavity",text:"前に1本、後ろに2本の主枝があり、細かく枝分かれして体のすみずみまで広がる。消化した栄養を体じゅうへ運ぶ。",src:["U6","CHK"]},
  pharynx:{ja:"咽頭",en:"pharynx",text:"体の中央にある筋肉質の管。腹面から体外へ突き出して食物を吸い込む。",src:["CHK"]},
  mouth:{ja:"口（腹面の中央）",en:"mouth",text:"口は腹面の中央にある1つだけで、肛門はない。食べかすも同じ口から出す。",wrong:"頭の先に口があるわけではない。また肛門もない。",src:["U6","CHK"]},
  brain:{ja:"脳神経節",en:"cerebral ganglia",text:"頭部にある神経細胞の集まり。",src:["U6"]},
  nervecord:{ja:"神経索（はしご形神経系）",en:"nerve cords",text:"脳神経節から体の後ろへ2本の神経索が走り、横の神経でつながる。",src:["U6"]},
  protonephridia:{ja:"原腎管（炎細胞）",en:"protonephridia",text:"体の左右に走る細い管。先端の炎細胞の繊毛の動きで、余分な水や老廃物を体外へ出す。",src:["U6"]},
  epidermis:{ja:"表皮（腹側に繊毛）",en:"epidermis",text:"体の表面の細胞の層。腹側の繊毛で、粘液の上をすべるように動く。",src:["CHK"]},
  muscle:{ja:"筋肉の層",en:"muscle",text:"表皮の内側の筋肉。",src:["CHK"]},
  parenchyma:{ja:"間充織（柔組織）",en:"parenchyma",text:"体壁と腸の間をすき間なく埋める細胞の集まり。体腔（体壁と内臓の間の空間）がない＝無体腔。",src:["U6","CHK"]}
};

App.anatomyDefs.namiuzumushi = {
  anatomy:{
    title:"プラナリアの体のつくり（背側から透かして見た図）",
    viewBox:"0 0 400 600",
    caption:"背側から透かして見た模式図（上が頭）。部位を選ぶと説明が出る。",
    svg:anatomySvg,
    layers:[
      {id:"body",ja:"外形・眼点",color:"#9C8264"},
      {id:"gut",ja:"消化管",color:"#C9A06A"},
      {id:"nerve",ja:"神経",color:"#7B6BA8"},
      {id:"excret",ja:"原腎管",color:"#5E8C6A",on:false}
    ],
    parts,
    actions:[{id:"eat",ja:"▶ 食べる・出す",run(api, done){
      api.setLayer("gut", true);
      const food = api.svg.querySelector(".nz-food"), gut = api.svg.querySelector(".nz-gut");
      food.setAttribute("opacity", "1");
      api.caption("<b>① 口から取り込む</b>　咽頭を突き出し、食物を吸い込む。");
      const up = food.animate([{transform:"translate(0,0)"},{transform:"translate(0,-96px)", opacity:0}], {duration:1500, fill:"forwards", easing:"ease-in"});
      api.later(1500, () => {
        api.caption("<b>② 腸に広がる</b>　枝分かれした腸のすみずみまで行きわたり、消化・吸収される。");
        gut.animate([{stroke:"#C9A06A"},{stroke:"#8E5A2E"},{stroke:"#C9A06A"}], {duration:2200});
      });
      api.later(3900, () => {
        api.caption("<b>③ 同じ口から出す</b>　肛門はないので、消化されなかったものは口から出す。");
        up.cancel();
        food.animate([{transform:"translate(0,-96px)", opacity:0},{transform:"translate(0,0)", opacity:1},{transform:"translate(0,22px)", opacity:0}], {duration:1700, fill:"forwards"});
      });
      api.later(5800, () => { food.setAttribute("opacity", "0"); done(); });
    }}]
  },
  section:{
    title:"プラナリアの横断面",
    viewBox:"0 0 500 300",
    caption:"体を輪切りにした模式図（上が背側）。体壁と腸の間に空間がない＝無体腔。",
    svg:`
      <g data-layer="body">
        <ellipse data-part="epidermis" cx="250" cy="150" rx="214" ry="64" fill="#E3CDB6" stroke="${L}" stroke-width="2.2"/>
        <ellipse data-part="muscle" cx="250" cy="150" rx="204" ry="55" fill="#C99A82" stroke="${L}" stroke-width=".8"/>
        <ellipse data-part="parenchyma" cx="250" cy="150" rx="196" ry="48" fill="#F1E4D0" stroke="${L}" stroke-width=".8"/>
        <g data-part="parenchyma" fill="#D9C2A4">${Array.from({length:70}, (_,i) => { const x = 70 + (i*37) % 360, y = 112 + (i*23) % 76; return `<circle cx="${x}" cy="${y}" r="3"/>`; }).join("")}</g>
        <g data-part="epidermis" stroke="${L}" stroke-width=".8">${Array.from({length:30}, (_,i) => { const x = 80 + i*12; const y = 150 + 64*Math.sqrt(Math.max(0, 1 - ((x-250)/214)**2)); return `<path d="M${x},${y.toFixed(1)} v6"/>`; }).join("")}</g>
      </g>
      <g data-layer="gut"><g data-part="gut" fill="#D9B27A" stroke="${L}" stroke-width="1.3"><ellipse cx="250" cy="140" rx="30" ry="20"/><ellipse cx="150" cy="148" rx="24" ry="16"/><ellipse cx="350" cy="148" rx="24" ry="16"/></g></g>
      <g data-layer="nerve"><g data-part="nervecord" fill="#9C8CC6" stroke="#5E4F8C" stroke-width="1"><circle cx="205" cy="182" r="7"/><circle cx="295" cy="182" r="7"/></g></g>
      <g data-layer="excret"><g data-part="protonephridia" fill="#A9D1B4" stroke="#5E8C6A" stroke-width="1"><circle cx="96" cy="140" r="4"/><circle cx="404" cy="140" r="4"/></g></g>`,
    layers:[
      {id:"body",ja:"体壁・間充織",color:"#C99A82"},
      {id:"gut",ja:"腸",color:"#C9A06A"},
      {id:"nerve",ja:"神経",color:"#7B6BA8"},
      {id:"excret",ja:"原腎管",color:"#5E8C6A"}
    ],
    parts,
    actions:[]
  }
};
const sp = App.data.phylumDetail && App.data.phylumDetail.platyhelminthes && App.data.phylumDetail.platyhelminthes.species;
if(sp && sp.namiuzumushi) sp.namiuzumushi.anatomy = "namiuzumushi";
})();
