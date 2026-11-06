/* マダコの解剖図（側面から見た縦断の模式図）
   形の根拠：OpenStax Biology 2e §28.4（外套膜・外套腔・漏斗によるジェット推進・頭足類の閉鎖血管系・殻の退化）、research/04 §5。
   心臓の数（体心臓1＋鰓心臓2）・墨汁嚢・脳の位置は出典照合中。 */
(function(){
const App = window.App;
App.anatomyDefs = App.anatomyDefs || {};
const L = "#3a332b";

/* 腕（左へ伸びる8本のうち見える4本）と吸盤 */
function arms(){
  const defs = [
    "M235,215 C180,230 130,260 92,300 C70,322 52,330 40,322",
    "M232,225 C190,262 160,310 150,360 C147,378 136,388 124,384",
    "M240,232 C232,280 236,330 262,372 C270,386 262,396 250,392",
    "M228,205 C170,200 115,212 70,236 C48,248 32,248 26,238"
  ];
  let s = "";
  defs.forEach((d,i) => {
    s += `<path d="${d}" fill="none" stroke="#C98A6B" stroke-width="${18-i}" stroke-linecap="round"/>`;
    s += `<path d="${d}" fill="none" stroke="${L}" stroke-width="1.1" opacity=".5"/>`;
  });
  // 吸盤（腕の下側に並ぶ）
  const pts = [[200,236],[176,247],[152,262],[130,278],[110,294],[205,262],[190,290],[178,318],[168,346],[240,268],[242,300],[248,330],[200,214],[170,214],[140,220],[110,228]];
  pts.forEach(([x,y]) => s += `<circle cx="${x}" cy="${y}" r="4.2" fill="#F2D7C4" stroke="${L}" stroke-width=".9"/>`);
  return s;
}

const svg = `
  <g data-layer="body">
    <g data-part="arm">${arms()}</g>
    <path data-part="mantle" d="M300,150 C330,70 440,40 520,70 C585,95 600,170 570,230 C545,280 470,300 400,285 C350,275 318,250 305,222 Z"
      fill="#D9A07F" fill-opacity=".55" stroke="${L}" stroke-width="2.2"/>
    <path data-part="head" d="M228,190 C228,150 258,128 290,132 C312,135 324,160 320,190 C318,225 300,245 270,246 C245,246 228,225 228,190 Z"
      fill="#D9A07F" fill-opacity=".7" stroke="${L}" stroke-width="2.2"/>
    <g data-part="eye"><circle cx="286" cy="165" r="13" fill="#F4E6D2" stroke="${L}" stroke-width="1.6"/><rect x="279" y="162" width="14" height="6" rx="3" fill="${L}"/></g>
  </g>
  <g data-layer="cavity">
    <path data-part="cavity" d="M318,228 C350,262 420,280 480,262 C520,250 548,226 556,200 C520,232 450,246 390,236 C356,230 334,224 318,228 Z"
      fill="#EAF3F5" stroke="#4D8FA8" stroke-width="1.3" stroke-dasharray="4 3"/>
    <g data-part="gill">
      <path d="M380,236 C410,226 445,228 470,240 C445,250 410,252 380,236 Z" fill="#E7B7A8" stroke="${L}" stroke-width="1.2"/>
      ${Array.from({length:9},(_,i)=>`<path d="M${388+i*9},236 l3,${i%2?6:-6}" stroke="${L}" stroke-width=".7" opacity=".6"/>`).join("")}
    </g>
    <path data-part="funnel" d="M300,236 C292,250 282,262 266,272 L262,262 C276,252 286,242 292,230 Z" fill="#C98A6B" stroke="${L}" stroke-width="1.8"/>
    <path class="flow f1" d="M552,206 C520,236 450,250 390,242 C360,238 330,232 312,236"/>
    <path class="flow f2" d="M312,236 C296,250 280,262 230,286"/>
  </g>
  <g data-layer="organs">
    <path data-part="gut" d="M250,198 C275,196 300,190 330,176 C370,158 420,150 460,168 C490,182 492,214 462,224 C440,232 410,230 360,234 C340,236 322,236 310,238"
      fill="none" stroke="#B88A4E" stroke-width="5" stroke-linecap="round"/>
    <g data-part="beak"><path d="M244,198 l-10,-6 l2,12 z" fill="${L}"/></g>
    <g data-part="brain"><ellipse cx="262" cy="192" rx="17" ry="11" fill="#E8DDF0" stroke="#7C6D9E" stroke-width="1.4"/></g>
    <g data-part="inksac"><ellipse cx="438" cy="214" rx="13" ry="8" fill="#4a4038" stroke="${L}" stroke-width="1"/></g>
    <g data-part="heart">
      <circle cx="476" cy="236" r="9" fill="#C2554A" stroke="${L}" stroke-width="1.2"/>
      <circle cx="392" cy="246" r="6" fill="#D9776A" stroke="${L}" stroke-width="1"/>
    </g>
  </g>`;

const parts = {
  mantle:{ja:"外套膜",en:"mantle",text:"内臓を包む筋肉質の袋。軟体動物では殻を分泌する組織だが、タコでは殻はほぼ失われ、外套膜だけが残る。収縮して外套腔の水を押し出す。",wrong:"外套膜は貝殻ではない。殻を分泌する軟らかい組織。",src:["U6"]},
  cavity:{ja:"外套腔",en:"mantle cavity",text:"外套膜と内臓の間のすき間。えらがあり、肛門や排出口もここに開く。",src:["U6"]},
  gill:{ja:"えら（1対）",en:"gill",text:"外套腔の中に左右1対ある（この図では片側だけ見える）。外套腔を通る水から酸素をとり入れる。",src:["U6","CHK"]},
  funnel:{ja:"漏斗",en:"funnel (siphon)",text:"足が変化したもの。外套腔の水をここから勢いよく噴き出して進む（ジェット推進）。向きを変えて進む方向を調節する。",wrong:"水は漏斗から吸い込むのではない。外套膜の縁のすき間から外套腔に入り、漏斗から出る。",src:["U6"]},
  arm:{ja:"腕と吸盤",en:"arms & suckers",text:"足の前の部分が変化した8本の腕。内側に吸盤が並ぶ（この図では4本だけ描いている）。",src:["U6"]},
  head:{ja:"頭部",en:"head",text:"目と脳がある。「頭から足（腕）が出ている」ことが頭足類の名の由来。",src:["CHK"]},
  eye:{ja:"目",en:"eye",text:"よく発達した目をもつ。",src:["CHK"]},
  beak:{ja:"カラストンビ（顎板）",en:"beak",text:"腕のつけ根の中心にある口の、硬い顎板。口の中には歯舌もある。",src:["CHK"]},
  brain:{ja:"脳",en:"brain",text:"食道をとり囲むように集まった神経節。",src:["CHK"]},
  gut:{ja:"消化管",en:"gut",text:"口から食道・胃・腸を経て、外套腔に開く肛門へ。",src:["CHK"]},
  inksac:{ja:"墨汁嚢",en:"ink sac",text:"墨をためる袋。墨は外套腔を経て漏斗から吐き出される。",src:["CHK"]},
  heart:{ja:"心臓",en:"hearts",text:"頭足類は閉鎖血管系をもつ。体全体に血液を送る心臓のほかに、えらの根もとにも心臓（鰓心臓）があるとされる（この図では各1つを描いている）。",src:["U6","CHK"]}
};

App.anatomyDefs.madako = {
  anatomy:{
    title:"マダコの体のつくり（側面の模式図）",
    viewBox:"0 0 600 420",
    caption:"左が腕の側、右上が外套膜（体の背側の袋）。部位を選ぶと説明が出る。",
    svg, parts,
    layers:[
      {id:"body",ja:"外形",color:"var(--c-mollusca)"},
      {id:"cavity",ja:"外套腔・えら・漏斗",color:"var(--water)"},
      {id:"organs",ja:"内臓",color:"#B88A4E"}
    ],
    actions:[{id:"jet",ja:"▶ ジェット推進",run(api, done){
      const s = api.svg, m = s.querySelector('[data-part="mantle"]');
      api.setLayer("cavity", true);
      s.classList.remove("flowing","s1","s2"); void s.getBoundingClientRect(); s.classList.add("flowing");
      m.style.transformBox = "fill-box"; m.style.transformOrigin = "100% 50%"; m.style.transition = "transform .9s cubic-bezier(.22,.7,.2,1)";
      api.caption("<b>① 水が入る</b>　外套膜がゆるみ、外套膜の縁のすき間から外套腔に水が入る（えらを通る）。");
      s.classList.add("s1"); m.style.transform = "scale(1.04)";
      api.later(2200, () => { s.classList.remove("s1"); s.classList.add("s2"); m.style.transform = "scale(.9)";
        api.caption("<b>② 漏斗から噴き出す</b>　外套膜が縮み、外套腔の水が漏斗から勢いよく出る。その反動で体は反対向きに進む。"); });
      api.later(4600, () => { m.style.transform = ""; s.classList.remove("s2");
        api.caption("水は漏斗から吸い込むのではなく、外套膜の縁から入って漏斗から出る。"); done(); });
    }}]
  }
};
const D = App.data && App.data.phylumDetail;
if(D && D.mollusca && D.mollusca.species && D.mollusca.species.madako) D.mollusca.species.madako.anatomy = "madako";
})();
