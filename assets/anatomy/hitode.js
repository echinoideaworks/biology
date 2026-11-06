/* ヒトデ（マヒトデ）の解剖図・断面図
   形の根拠：OpenStax Biology 2e §28.7（多孔板は反口側、環状水管は口のまわり、瓶嚢が管足を制御）、
   京大瀬戸臨海実験所「ヒトデの体」（瓶嚢の収縮で管足が伸びる）、research/04 §1。
   高校範囲外の構造（ポーリ嚢、チーデマン体、叉棘、皮鰓、血洞系）は省略している。 */
(function(){
const App = window.App;
App.anatomyDefs = App.anatomyDefs || {};
const f = n => Math.round(n*10)/10;
const C = 300; // 中心
const pol = (r, a) => [C + r*Math.cos(a*Math.PI/180), C + r*Math.sin(a*Math.PI/180)];
const pt = (r, a) => pol(r, a).map(f).join(",");
const ARMS = [-90, -18, 54, 126, 198];

/* ---------- 外形 ---------- */
function outline(){
  let d = `M${pt(82, ARMS[0]-36)}`;
  ARMS.forEach(a => {
    d += ` C${pt(118, a-15)} ${pt(214, a-6.2)} ${pt(250, a-2.6)}`;
    d += ` Q${pt(266, a)} ${pt(250, a+2.6)}`;
    d += ` C${pt(214, a+6.2)} ${pt(118, a+15)} ${pt(82, a+36)}`;
  });
  return d + "Z";
}
/* 腕の半幅（中心線からの距離 px）— 外形の近似 */
const halfW = r => Math.max(6, 44 - (r-60) * 0.19);

function spines(){
  let s = "";
  ARMS.forEach(a => {
    for(let r = 96; r <= 238; r += 13){
      const w = halfW(r);
      [-0.62, 0, 0.62].forEach((k, j) => {
        if(j !== 1 && r > 215) return;
        const off = k * w, rr = r + (j===1 ? 0 : 6);
        const ang = a + Math.atan2(off, rr) * 180/Math.PI;
        const [x,y] = pol(Math.hypot(rr, off), ang);
        s += `<circle cx="${f(x)}" cy="${f(y)}" r="${j===1?2.6:2.1}"/>`;
      });
    }
  });
  // 中央盤の棘
  for(let i = 0; i < 10; i++){ const [x,y] = pol(i%2? 50 : 34, i*36 + 18); s += `<circle cx="${f(x)}" cy="${f(y)}" r="2.2"/>`; }
  return s;
}

/* ---------- 水管系 ---------- */
const MAD_A = (ARMS[0] + ARMS[1]) / 2; // 腕と腕の間（反口側）
const MAD = pol(58, MAD_A);
function madreporite(){
  let s = `<circle cx="${f(MAD[0])}" cy="${f(MAD[1])}" r="10.5" class="mad"/>`;
  for(let i = 0; i < 12; i++){
    const a = i * 30, [x0,y0] = [MAD[0] + 3*Math.cos(a*Math.PI/180), MAD[1] + 3*Math.sin(a*Math.PI/180)];
    const [x1,y1] = [MAD[0] + 9*Math.cos((a+12)*Math.PI/180), MAD[1] + 9*Math.sin((a+12)*Math.PI/180)];
    s += `<path d="M${f(x0)},${f(y0)} L${f(x1)},${f(y1)}" class="mad-line"/>`;
  }
  return s;
}
const stoneD = () => {
  const [x1,y1] = pol(30, MAD_A + 10);
  return `M${f(MAD[0])},${f(MAD[1])} C${pt(52, MAD_A+22)} ${pt(38, MAD_A+24)} ${f(x1)},${f(y1)}`;
};
const ringD = () => `M${C+30},${C} A30,30 0 1 1 ${C-30},${C} A30,30 0 1 1 ${C+30},${C}`;
const radialD = a => `M${pt(30, a)} L${pt(244, a)}`;

function ampullae(){
  let s = "", lat = "";
  ARMS.forEach(a => {
    let k = 0;
    for(let r = 52; r <= 232; r += 12){
      const side = (k++ % 2) ? 1 : -1;
      const off = Math.min(17, halfW(r) * 0.5);
      [side, -side].forEach((sd, j) => {
        const o = sd * (off + (j? 0 : 0));
        const ang = a + Math.atan2(o, r) * 180/Math.PI;
        const [x,y] = pol(Math.hypot(r, o), ang);
        const [xb,yb] = pol(r, a);
        lat += `<path d="M${f(xb)},${f(yb)} L${f(x)},${f(y)}"/>`;
        const sz = r > 200 ? 0.7 : 1;
        s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(3.6*sz)}" ry="${f(5.8*sz)}" transform="rotate(${f(a+90)} ${f(x)} ${f(y)})"/>`;
      });
    }
  });
  return {s, lat};
}
function tubefeet(){
  let s = "";
  ARMS.forEach(a => {
    let k = 0;
    for(let r = 50; r <= 240; r += 8){
      const w = Math.min(1, halfW(r)/40);
      const o = (k++ % 2 ? 9.5 : 4) * w;
      [o, -o].forEach(oo => {
        const ang = a + Math.atan2(oo, r) * 180/Math.PI;
        const [x,y] = pol(Math.hypot(r, oo), ang);
        s += `<circle cx="${f(x)}" cy="${f(y)}" r="${r>210?2.2:2.9}"/>`;
      });
    }
  });
  return s;
}
/* ---------- 消化系（発展） ---------- */
function digestive(){
  let s = "";
  // 胃（中央盤）
  let d = "";
  ARMS.forEach((a,i) => { d += `${i?" ":"M"}${pt(46, a)} Q${pt(30, a+36)} `; });
  d = `M${pt(46, ARMS[0])}` + ARMS.map((a,i) => ` Q${pt(26, a+36)} ${pt(46, ARMS[(i+1)%5])}`).join("") + "Z";
  s += `<path d="${d}" data-part="stomach" class="stomach"/>`;
  // 幽門盲嚢（各腕に1対）
  ARMS.forEach(a => {
    [-1,1].forEach(sd => {
      const pts = [];
      for(let r = 56; r <= 200; r += 12){ const o = sd*Math.min(22, halfW(r)*0.62); pts.push(pol(Math.hypot(r,o), a + Math.atan2(o,r)*180/Math.PI)); }
      const inner = [];
      for(let r = 200; r >= 56; r -= 12){ const o = sd*Math.min(9, halfW(r)*0.24); inner.push(pol(Math.hypot(r,o), a + Math.atan2(o,r)*180/Math.PI)); }
      const all = pts.concat(inner);
      s += `<path data-part="caeca" class="caeca" d="M${all.map(p => p.map(f).join(",")).join(" L")}Z"/>`;
    });
  });
  return s;
}

/* 流れ（動き）の線 */
const flowSvg = () => `
  <g class="flow-g" data-layer="wvs">
    <path class="flow f1" d="${stoneD()}"/>
    <path class="flow f2" d="${ringD()}"/>
    ${ARMS.map(a => `<path class="flow f3" d="${radialD(a)}"/>`).join("")}
  </g>`;

const amp = ampullae();
const anatomySvg = `
  <g data-layer="body">
    <path d="${outline()}" class="body-fill" data-part="skin"/>
    <path d="${outline()}" class="body-line"/>
    <g class="spines">${spines()}</g>
  </g>
  <g data-layer="digest" class="digest">${digestive()}</g>
  <g data-layer="feet" class="feet" data-part="tubefoot">${tubefeet()}</g>
  <g data-layer="wvs" class="wvs">
    <g class="lat">${amp.lat}</g>
    <g class="amp" data-part="ampulla">${amp.s}</g>
    ${ARMS.map(a => `<path class="canal radial" data-part="radial" d="${radialD(a)}"/>`).join("")}
    <path class="canal ring" data-part="ring" d="${ringD()}"/>
    <path class="canal stone" data-part="stone" d="${stoneD()}"/>
    <g data-part="madreporite">${madreporite()}</g>
    <g data-part="mouth"><path class="mouth" d="M${ARMS.map(a => pt(9, a+36)).join(" L")}Z"/></g>
  </g>
  ${flowSvg()}`;

/* ---------- 部位の説明 ---------- */
const parts = {
  skin:{ja:"体表（反口側）",en:"aboral surface",text:"背側の面。皮膚の下に炭酸カルシウムの骨片が網目状に並び（内骨格）、表面に小さな棘が突き出す。",src:["U1","U6"]},
  madreporite:{ja:"多孔板",en:"madreporite",text:"反口側（背側）の、腕と腕の間にある小さな板。ふるいのような細かい孔があり、水管系の入り口になる。",wrong:"多孔板は口側ではなく反口側にある。",src:["U6"]},
  stone:{ja:"石管",en:"stone canal",text:"多孔板から口側へ下り、環状水管につながる管。壁に石灰質を含む。",src:["U6","CHK"]},
  ring:{ja:"環状水管",en:"ring canal",text:"口のまわりを一周する管。ここから5本の放射水管に液体が分かれる。",src:["U6"]},
  radial:{ja:"放射水管",en:"radial canal",text:"環状水管から各腕の中央に沿って先端まで伸びる。腕の口側の溝（歩帯溝）の上を走る。",src:["U6"]},
  ampulla:{ja:"瓶嚢（アンプル）",en:"ampulla",text:"管足の根もとにある袋。体の内側にある。瓶嚢が縮むと、中の液体が管足に押し込まれて管足が伸びる。",wrong:"管足が海水を直接吸い込んで伸びるのではない。",src:["U6","U9"]},
  tubefoot:{ja:"管足",en:"tube foot",text:"口側の歩帯溝に並ぶ小さな管状の足（この図は背側から透かして見ている）。先端で岩などに吸いつき、移動・付着・呼吸に使う。",src:["U6","U9"]},
  mouth:{ja:"口（口側）",en:"mouth",text:"口側（腹側）の中央にある。この図は反口側から透かして見ているので、口は体の裏側にある。",src:["U6"]},
  stomach:{ja:"胃",en:"stomach",lv:"adv",text:"中央盤の中にある。ヒトデの仲間には、胃の一部を口の外へ出して獲物を消化するものがいる。",src:["CHK"]},
  caeca:{ja:"幽門盲嚢（消化腺）",en:"pyloric caeca",lv:"adv",text:"各腕に1対ずつ伸びる消化腺。消化と栄養の貯蔵に働く。",src:["CHK"]}
};

App.anatomyDefs.hitode = {
  anatomy:{
    title:"ヒトデの水管系（反口側から透かして見た図）",
    viewBox:"0 0 600 600",
    caption:"反口側（背側）から透かして見た図。部位を選ぶと説明が出る。",
    svg:anatomySvg,
    layers:[
      {id:"body",ja:"外形",color:"var(--c-echinodermata)"},
      {id:"wvs",ja:"水管系",color:"var(--water)"},
      {id:"feet",ja:"管足（口側）",color:"#9DB7A7"},
      {id:"digest",ja:"消化系",on:false,lv:"adv",color:"#B79A6B"}
    ],
    parts,
    actions:[{id:"flow",ja:"▶ 水の流れをたどる",run(api, done){
      const s = api.svg;
      api.setLayer("wvs", true);
      s.classList.remove("flowing","s1","s2","s3","s4");
      void s.getBoundingClientRect();
      s.classList.add("flowing");
      const steps = [
        ["s1","<b>① 多孔板 → 石管</b>　反口側の多孔板から、石管を通って口側へ。"],
        ["s2","<b>② 環状水管</b>　口のまわりを一周する管に入る。"],
        ["s3","<b>③ 放射水管</b>　5本の腕へ分かれて、先端まで送られる。"],
        ["s4","<b>④ 瓶嚢 → 管足</b>　瓶嚢が縮むと液体が管足に押し込まれ、管足が伸びる（断面図で詳しく）。"]
      ];
      steps.forEach(([c, t], i) => api.later(i*1700, () => { s.classList.add(c); api.caption(t); }));
      api.later(steps.length*1700 + 1200, () => done());
    }}]
  },

  /* ---------- 腕の横断面 ---------- */
  section:{
    title:"ヒトデの腕の横断面",
    viewBox:"0 0 600 440",
    caption:"腕を輪切りにした断面（上が反口側＝背側、下が口側）。瓶嚢と管足のしくみを見る。",
    svg:`
      <g data-layer="body">
        <path class="sec-wall" data-part="wall" d="M70,268 C70,150 170,64 300,64 C430,64 530,150 530,268 C530,286 512,298 488,300 L360,300 C352,300 346,296 342,288 L326,252 C318,240 282,240 274,252 L258,288 C254,296 248,300 240,300 L112,300 C88,298 70,286 70,268Z"/>
        <path class="sec-coelom" data-part="coelom" d="M92,262 C92,166 182,86 300,86 C418,86 508,166 508,262 C508,272 500,278 488,278 L362,278 C356,278 352,274 349,268 L338,240 C326,220 274,220 262,240 L251,268 C248,274 244,278 238,278 L112,278 C100,278 92,272 92,262Z"/>
        <g class="ossicles" data-part="ossicle">
          ${Array.from({length:15}, (_,i) => { const t = (i+0.5)/15, a = Math.PI*(1-t); const x = 300 + 219*Math.cos(a), y = 270 - 194*Math.sin(a)*1.0; const rot = (-(a*180/Math.PI) + 90); return `<rect x="${f(x-9)}" y="${f(y-5)}" width="18" height="10" rx="4" transform="rotate(${f(rot)} ${f(x)} ${f(y)})"/>`; }).join("")}
        </g>
        <g class="sp" data-part="spine">
          ${Array.from({length:9}, (_,i) => { const t = (i+0.5)/9, a = Math.PI*(1-t); const x = 300 + 232*Math.cos(a), y = 268 - 206*Math.sin(a); const x2 = 300 + 258*Math.cos(a), y2 = 268 - 230*Math.sin(a); const nx = -Math.sin(a)*5, ny = -Math.cos(a)*5; return `<path d="M${f(x-nx)},${f(y+ny)} L${f(x2)},${f(y2)} L${f(x+nx)},${f(y-ny)}Z"/>`; }).join("")}
        </g>
      </g>
      <g data-layer="digest">
        <path class="caeca" data-part="caeca" d="M150,190 C150,140 200,112 250,120 C270,124 276,150 262,166 C248,182 268,196 250,210 C226,228 160,232 150,190Z"/>
        <path class="caeca" data-part="caeca" d="M450,190 C450,140 400,112 350,120 C330,124 324,150 338,166 C352,182 332,196 350,210 C374,228 440,232 450,190Z"/>
      </g>
      <g data-layer="wvs">
        <path class="amb-oss" data-part="ambossicle" d="M268,234 C282,214 318,214 332,234 L326,244 C314,232 286,232 274,244Z"/>
        <path class="canal lat" data-part="lateral" d="M300,256 C280,256 262,246 252,232 M300,256 C320,256 338,246 348,232"/>
        <g class="tf-unit tf-l">
          <ellipse class="amp-s" data-part="ampulla" cx="236" cy="200" rx="20" ry="27"/>
          <path class="tf" data-part="tubefoot" d="M244,224 C246,250 236,300 218,350 L204,350 C220,300 228,252 230,226Z"/>
          <ellipse class="sucker" data-part="tubefoot" cx="211" cy="352" rx="13" ry="5"/>
        </g>
        <g class="tf-unit tf-r">
          <ellipse class="amp-s" data-part="ampulla" cx="364" cy="200" rx="20" ry="27"/>
          <path class="tf" data-part="tubefoot" d="M356,224 C354,250 364,300 382,350 L396,350 C380,300 372,252 370,226Z"/>
          <ellipse class="sucker" data-part="tubefoot" cx="389" cy="352" rx="13" ry="5"/>
        </g>
        <circle class="canal radial-s" data-part="radial" cx="300" cy="256" r="8"/>
      </g>
      <g data-layer="nerve">
        <path class="nerve" data-part="nerve" d="M282,270 Q300,278 318,270"/>
      </g>`,
    layers:[
      {id:"body",ja:"体壁・骨片",color:"var(--c-echinodermata)"},
      {id:"wvs",ja:"水管系",color:"var(--water)"},
      {id:"digest",ja:"消化腺",lv:"adv",color:"#B79A6B"},
      {id:"nerve",ja:"神経",lv:"adv",color:"#8C7AAE"}
    ],
    parts:{
      wall:{ja:"体壁",text:"表皮と、骨片を含む結合組織、筋肉の層。",src:["U1","CHK"]},
      ossicle:{ja:"骨片（内骨格）",en:"ossicle",text:"炭酸カルシウムでできた小さな骨片が体壁の中に並ぶ。皮膚の下にあるので内骨格という。",src:["U1"]},
      spine:{ja:"棘",en:"spine",text:"体表に突き出す小さな棘。棘皮動物（棘のある皮膚の動物）という名前の由来。",src:["CHK"]},
      coelom:{ja:"体腔",en:"coelom",text:"体壁と内臓の間の広い空間（真体腔）。棘皮動物の体腔は腸体腔としてできる。水管系も体腔の一部に由来する。",src:["U1","U6"]},
      caeca:parts.caeca,
      ambossicle:{ja:"歩帯板",en:"ambulacral ossicle",lv:"adv",text:"歩帯溝の屋根をつくる骨片。すき間を管足が通り抜ける。",src:["U6"]},
      lateral:{ja:"側管",en:"lateral canal",text:"放射水管から左右の管足へ分かれる短い管。",src:["CHK"]},
      ampulla:parts.ampulla,
      tubefoot:parts.tubefoot,
      radial:parts.radial,
      nerve:{ja:"放射神経",en:"radial nerve",lv:"adv",text:"放射水管の下（口側）を、腕に沿って走る神経。",src:["CHK"]}
    },
    actions:[{id:"pump",ja:"▶ 瓶嚢を縮めて管足を伸ばす",run(api, done){
      const s = api.svg;
      s.classList.remove("pumped");
      api.caption("<b>① 瓶嚢が縮む</b>　瓶嚢の筋肉が収縮し、中の液体が押し出される。");
      api.later(300, () => s.classList.add("pumped"));
      api.later(1600, () => api.caption("<b>② 管足が伸びる</b>　液体が管足に入り、管足が伸びて先端が岩に吸いつく。（逆流は弁で防がれる）"));
      api.later(4200, () => { s.classList.remove("pumped"); api.caption("<b>③ 管足が縮む</b>　管足の筋肉が縮み、液体は瓶嚢へ戻る。"); });
      api.later(5600, () => done());
    }}]
  }
};
})();
