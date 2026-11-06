/* ミミズ（フトミミズ類）の縦断面・横断面
   根拠：OpenStax Biology 2e §28.4、コトバンク「ミミズ」（世界大百科事典）、research/04 §3。
   「心臓」（前方の環状血管）の対数は資料により3〜5対と揺れる。図では5対を描くが、対数は教科書で確認すること。 */
(function(){
const App = window.App;
App.anatomyDefs = App.anatomyDefs || {};
const f = n => Math.round(n*10)/10;
const L = "#3a332b";

/* ---------- 縦断面（左が前） ---------- */
const X0 = 40, X1 = 760, YT = 120, YB = 240, YM = 180;
const halfH = x => { const t = (x - X0) / (X1 - X0); return 60 * Math.min(1, Math.min(t, 1 - t) * 9 + 0.35); };
function outline(){
  let top = "", bot = "";
  for(let x = X0; x <= X1; x += 10){ top += `${top?" L":"M"}${x},${f(YM - halfH(x))}`; }
  for(let x = X1; x >= X0; x -= 10){ bot += ` L${x},${f(YM + halfH(x))}`; }
  return top + bot + "Z";
}
const segs = []; for(let x = X0 + 22; x < X1 - 10; x += 18) segs.push(x);
const septa = segs.map(x => `<path d="M${x},${f(YM - halfH(x) + 3)} V${f(YM + halfH(x) - 3)}"/>`).join("");
const rings = segs.map(x => `<path d="M${x},${f(YM - halfH(x))} q-3,${f(halfH(x))} 0,${f(halfH(x)*2)}"/>`).join("");
const hearts = [128,146,164,182,200].map(x => `<ellipse cx="${x}" cy="${YM}" rx="5" ry="38"/>`).join("");
const ganglia = segs.filter(x => x > 110).map(x => `<circle cx="${x}" cy="${YM+48}" r="3.2"/>`).join("");
const nephr = segs.filter((x,i) => x > 230 && i % 2 === 0).map(x => `<path d="M${x-6},${YM+28} c4,-8 8,8 12,0 c-4,-6 -8,6 -6,10"/>`).join("");

const anatomySvg = `
  <g data-layer="body">
    <path data-part="body" d="${outline()}" fill="#E6B8A2" fill-opacity=".55" stroke="${L}" stroke-width="2.2" stroke-linejoin="round"/>
    <g fill="none" stroke="${L}" stroke-width=".7" opacity=".4" pointer-events="none">${rings}</g>
    <rect data-part="clitellum" x="${segs[13]}" y="${f(YM-halfH(segs[13])-2)}" width="54" height="${f(halfH(segs[13])*2+4)}" rx="6" fill="#C9826A" fill-opacity=".75" stroke="${L}" stroke-width="1.4"/>
  </g>
  <g data-layer="septa"><g data-part="septum" fill="none" stroke="#8C6E5A" stroke-width="1" stroke-dasharray="3 3">${septa}</g></g>
  <g data-layer="gut">
    <path data-part="intestine" d="M240,${YM-14} H745 V${YM+14} H240Z" fill="#D9C08E" stroke="${L}" stroke-width="1.4"/>
    <path data-part="esophagus" d="M110,${YM-5} H172 V${YM+5} H110Z" fill="#E2CFA5" stroke="${L}" stroke-width="1.2"/>
    <ellipse data-part="pharynx" cx="88" cy="${YM}" rx="24" ry="13" fill="#D7B48C" stroke="${L}" stroke-width="1.3"/>
    <ellipse data-part="crop" cx="190" cy="${YM}" rx="19" ry="15" fill="#E7D4A8" stroke="${L}" stroke-width="1.3"/>
    <ellipse data-part="gizzard" cx="224" cy="${YM}" rx="17" ry="16" fill="#B99466" stroke="${L}" stroke-width="1.6"/>
    <path data-part="mouth" d="M42,${YM-4} L64,${YM-4} L64,${YM+4} L42,${YM+4}Z" fill="#F4E6D3" stroke="${L}" stroke-width="1"/>
    <circle data-part="anus" cx="754" cy="${YM}" r="4" fill="#F4E6D3" stroke="${L}" stroke-width="1"/>
  </g>
  <g data-layer="blood">
    <path data-part="dorsal" d="M60,${YM-36} H748" fill="none" stroke="#B23A2E" stroke-width="4" stroke-linecap="round"/>
    <path data-part="ventral" d="M60,${YM+32} H748" fill="none" stroke="#C4574A" stroke-width="3" stroke-linecap="round"/>
    <g data-part="hearts" fill="none" stroke="#9E2F25" stroke-width="3.2">${hearts}</g>
    <path class="mz-flow mz-d" d="M748,${YM-36} H60" fill="none" stroke="#F6D2CC" stroke-width="2" stroke-dasharray="6 14" opacity="0" pointer-events="none"/>
    <path class="mz-flow mz-v" d="M60,${YM+32} H748" fill="none" stroke="#F6D2CC" stroke-width="2" stroke-dasharray="6 14" opacity="0" pointer-events="none"/>
  </g>
  <g data-layer="nerve">
    <path data-part="nervecord" d="M100,${YM+48} H748" fill="none" stroke="#7B6BA8" stroke-width="2.6"/>
    <g data-part="nervecord" fill="#7B6BA8">${ganglia}</g>
    <path data-part="brain" d="M84,${YM-26} q10,-10 20,0 q-4,10 -10,12 q-6,-2 -10,-12Z M100,${YM-18} C116,${YM} 112,${YM+40} 106,${YM+48}" fill="#9C8CC6" stroke="#5E4F8C" stroke-width="1.6"/>
  </g>
  <g data-layer="excret"><g data-part="nephridium" fill="none" stroke="#5E8C6A" stroke-width="1.5">${nephr}</g></g>`;

const parts = {
  body:{ja:"体表・体壁",en:"body wall",text:"同じつくりの体節が前から後ろまでくり返す。外側から、薄いクチクラ・表皮・環状筋・縦走筋の順に重なる。",src:["U6","CHK"]},
  clitellum:{ja:"環帯",en:"clitellum",text:"成熟した個体の前方にできる、太く盛り上がった帯。粘液や卵を包む繭（卵包）を分泌する。",wrong:"環帯は一生あるわけではなく、成熟すると目立つ。",src:["U6"]},
  septum:{ja:"隔膜",en:"septum",text:"体節ごとに体腔を仕切る薄い膜。体節ごとの区切りが外見だけでなく体の内部にもあることを示す。",src:["U6"]},
  mouth:{ja:"口",en:"mouth",text:"体の前端にある。ここから肛門まで1本の消化管が通る。",src:["U6"]},
  pharynx:{ja:"咽頭",en:"pharynx",text:"筋肉の発達した部分で、土や落ち葉を吸い込む。",src:["CHK"]},
  esophagus:{ja:"食道",en:"esophagus",text:"咽頭からそのうへ食物を送る管。",src:["CHK"]},
  crop:{ja:"そのう",en:"crop",text:"食物を一時的にためておく袋。",src:["CHK"]},
  gizzard:{ja:"砂のう",en:"gizzard",text:"厚い筋肉の壁で、食物を砂粒とともにすりつぶす。",src:["CHK"]},
  intestine:{ja:"腸",en:"intestine",text:"消化と吸収を行う。体の後半の大部分を占める。",src:["CHK"]},
  anus:{ja:"肛門",en:"anus",text:"体の後端にある。口と肛門のある完全な消化管をもつ。",src:["U6"]},
  dorsal:{ja:"背行血管",en:"dorsal vessel",text:"消化管の背側を走る血管。脈打って、血液を体の後ろから前へ送る。",src:["CHK"]},
  ventral:{ja:"腹行血管",en:"ventral vessel",text:"消化管の腹側を走る血管。血液を前から後ろへ送る。背行血管とは体節ごとの血管でつながる（閉鎖血管系）。",src:["U6","CHK"]},
  hearts:{ja:"「心臓」（前方の環状血管）",en:"aortic arches",text:"背行血管と腹行血管を結ぶ前方の環状血管のうち、太く強く拍動するもの。図では5対を描いたが、対数は資料により3〜5対と異なる。対数は使っている教科書で確認すること。",wrong:"ヒトの心臓のような部屋をもつ器官ではなく、拍動する血管。",src:["CHK"]},
  nervecord:{ja:"腹側神経索と神経節",en:"ventral nerve cord",text:"体の腹側を走る神経索に、体節ごとに神経節がある（はしご形神経系）。",src:["U6"]},
  brain:{ja:"脳（咽頭上神経節）",en:"cerebral ganglion",text:"咽頭の背側にある神経節。咽頭を囲む神経で腹側神経索につながる。",src:["U6"]},
  nephridium:{ja:"腎管",en:"nephridium",text:"ほぼ各体節に1対ある排出器官（図では一部のみ）。体腔液から老廃物をこしとって体の外へ出す。",src:["U6","CHK"]}
};

App.anatomyDefs.mimizu = {
  anatomy:{
    title:"ミミズの縦断面（左が前）",
    viewBox:"0 0 800 360",
    caption:"体の前方（左）を縦に切った模式図。部位を選ぶと説明が出る。",
    svg:anatomySvg,
    layers:[
      {id:"body",ja:"外形・環帯",color:"#C9826A"},
      {id:"septa",ja:"隔膜",color:"#8C6E5A"},
      {id:"gut",ja:"消化管",color:"#B99466"},
      {id:"blood",ja:"血管",color:"#B23A2E"},
      {id:"nerve",ja:"神経",color:"#7B6BA8"},
      {id:"excret",ja:"腎管",color:"#5E8C6A",on:false}
    ],
    parts,
    actions:[{id:"blood",ja:"▶ 血液の流れ",run(api, done){
      api.setLayer("blood", true);
      const d = api.svg.querySelector(".mz-d"), v = api.svg.querySelector(".mz-v");
      [d, v].forEach(p => p.setAttribute("opacity", "1"));
      const anims = [d, v].map(p => p.animate([{strokeDashoffset:0},{strokeDashoffset:-40}], {duration:900, iterations:6}));
      api.caption("<b>背行血管</b>では血液が後ろから<b>前へ</b>、<b>腹行血管</b>では前から<b>後ろへ</b>流れる。前方の太い環状血管（「心臓」）が背側から腹側へ血液を送る。");
      api.later(5400, () => { [d, v].forEach(p => p.setAttribute("opacity", "0")); anims.forEach(a => a.cancel()); done(); });
    }}]
  },
  section:{
    title:"ミミズの横断面",
    viewBox:"0 0 500 400",
    caption:"体を輪切りにした模式図（上が背側）。",
    svg:`
      <g data-layer="body">
        <circle data-part="cuticle" cx="250" cy="200" r="152" fill="#F2E3D6" stroke="${L}" stroke-width="2.2"/>
        <circle data-part="circular" cx="250" cy="200" r="146" fill="#D99C86" stroke="${L}" stroke-width="1"/>
        <g data-part="longitudinal">${Array.from({length:36}, (_,i) => { const a = i*10*Math.PI/180; const x1 = 250+130*Math.cos(a), y1 = 200+130*Math.sin(a), x2 = 250+112*Math.cos(a), y2 = 200+112*Math.sin(a); return `<path d="M${f(x1)},${f(y1)} L${f(x2)},${f(y2)}" stroke="#A8574A" stroke-width="7" stroke-linecap="round"/>`; }).join("")}</g>
        <circle data-part="coelom" cx="250" cy="200" r="108" fill="#FBF6EC" stroke="${L}" stroke-width="1"/>
        <g data-part="setae" stroke="${L}" stroke-width="2.2" stroke-linecap="round">${[35,55,125,145].map(dg => { const a = dg*Math.PI/180; return `<path d="M${f(250+138*Math.cos(a))},${f(200+138*Math.sin(a))} L${f(250+168*Math.cos(a))},${f(200+168*Math.sin(a))}"/>`; }).join("")}</g>
      </g>
      <g data-layer="gut">
        <path data-part="intestine" d="M250,148 C300,148 312,180 312,205 C312,240 285,258 250,258 C215,258 188,240 188,205 C188,180 200,148 250,148Z M250,150 C238,170 238,192 250,200 C262,192 262,170 250,150Z" fill="#D9C08E" fill-rule="evenodd" stroke="${L}" stroke-width="1.6"/>
        <path data-part="typhlosole" d="M250,150 C238,170 238,192 250,200 C262,192 262,170 250,150Z" fill="#C7A974" stroke="${L}" stroke-width="1.2"/>
      </g>
      <g data-layer="blood">
        <circle data-part="dorsal" cx="250" cy="126" r="9" fill="#B23A2E" stroke="${L}" stroke-width="1"/>
        <circle data-part="ventral" cx="250" cy="274" r="7" fill="#C4574A" stroke="${L}" stroke-width="1"/>
      </g>
      <g data-layer="nerve"><ellipse data-part="nervecord" cx="250" cy="297" rx="13" ry="7" fill="#9C8CC6" stroke="#5E4F8C" stroke-width="1.2"/></g>
      <g data-layer="excret"><g data-part="nephridium" fill="none" stroke="#5E8C6A" stroke-width="1.6"><path d="M178,262 c8,-10 14,6 22,-4 c-6,-8 -12,8 -16,16"/><path d="M322,262 c-8,-10 -14,6 -22,-4 c6,-8 12,8 16,16"/></g></g>`,
    layers:[
      {id:"body",ja:"体壁・体腔",color:"#C9826A"},
      {id:"gut",ja:"消化管",color:"#B99466"},
      {id:"blood",ja:"血管",color:"#B23A2E"},
      {id:"nerve",ja:"神経",color:"#7B6BA8"},
      {id:"excret",ja:"腎管",color:"#5E8C6A"}
    ],
    parts:{
      cuticle:{ja:"クチクラ・表皮",en:"cuticle / epidermis",text:"体の最も外側の薄い層。",src:["CHK"]},
      circular:{ja:"環状筋",en:"circular muscle",text:"体を取り巻く筋肉。縮むと体が細く長くなる。",src:["CHK"]},
      longitudinal:{ja:"縦走筋",en:"longitudinal muscle",text:"体の前後方向に走る筋肉。縮むと体が太く短くなる。環状筋と交互に縮めて進む（蠕動運動）。",src:["CHK"]},
      coelom:{ja:"真体腔",en:"coelom",text:"中胚葉に囲まれた体腔。体節ごとに隔膜で仕切られ、体腔液が満ちる。",src:["U6"]},
      setae:{ja:"剛毛",en:"setae",text:"体壁から出る短い毛。地面に引っかけてすべり止めにする。ゴカイ類より少ないので「貧毛類」と呼ばれる。",src:["U6"]},
      intestine:parts.intestine,
      typhlosole:{ja:"腸の背側のくぼみ（チフロソール）",en:"typhlosole",lv:"adv",text:"腸の背側の壁が内側へ折れ込んだ部分。吸収する面積を広げる。",src:["CHK"]},
      dorsal:parts.dorsal, ventral:parts.ventral, nervecord:parts.nervecord, nephridium:parts.nephridium
    },
    actions:[]
  }
};
const sp = App.data.phylumDetail && App.data.phylumDetail.annelida && App.data.phylumDetail.annelida.species;
if(sp && sp.mimizu) sp.mimizu.anatomy = "mimizu";
})();
