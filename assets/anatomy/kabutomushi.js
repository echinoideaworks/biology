/* 昆虫（カブトムシ）の体のつくり（側面の模式図）と、脚の関節の拡大
   形の根拠：OpenStax Biology 2e §28.6（頭・胸・腹、胸部に脚3対、中胸・後胸に翅、キチンの外骨格、脱皮、気管系、マルピーギ管）、research/04 §4。
   背脈管・腹側神経索・気門の数は出典照合中。 */
(function(){
const App = window.App;
App.anatomyDefs = App.anatomyDefs || {};
const L = "#3a332b";

const leg = (x, y, k) => `<path d="M${x},${y} L${x-14+k},${y+38} L${x-34+k*2},${y+80} L${x-44+k*2},${y+96}" fill="none" stroke="#5B3F2A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M${x},${y} L${x-14+k},${y+38} L${x-34+k*2},${y+80} L${x-44+k*2},${y+96}" fill="none" stroke="${L}" stroke-width="1" opacity=".5"/>
  <circle cx="${x-14+k}" cy="${y+38}" r="3" fill="#F2E3CF" stroke="${L}" stroke-width=".8"/><circle cx="${x-34+k*2}" cy="${y+80}" r="3" fill="#F2E3CF" stroke="${L}" stroke-width=".8"/>`;

const spiracles = [[262,206],[318,206],[392,214],[420,218],[448,220],[476,220],[504,218],[530,214],[552,208],[570,200]];

const svg = `
  <g data-layer="exo">
    <g data-part="leg">${leg(250,232,0)}${leg(318,236,8)}${leg(370,236,16)}</g>
    <path data-part="abdomen" d="M370,150 C430,128 540,136 588,170 C600,190 588,222 556,232 C500,248 420,246 372,236 Z" fill="#8C5A3C" fill-opacity=".35" stroke="${L}" stroke-width="2.2"/>
    <path data-part="thorax" d="M220,150 C250,128 300,124 340,134 L376,150 L374,236 C340,244 270,242 232,232 C214,212 212,170 220,150 Z" fill="#8C5A3C" fill-opacity=".45" stroke="${L}" stroke-width="2.2"/>
    <path d="M292,128 L294,240 M336,134 L336,242" stroke="${L}" stroke-width="1.1" stroke-dasharray="3 3"/>
    <path data-part="head" d="M150,186 C150,160 175,146 205,150 C222,152 230,170 228,196 C226,220 206,232 182,230 C162,228 150,210 150,186 Z" fill="#8C5A3C" fill-opacity=".5" stroke="${L}" stroke-width="2.2"/>
    <path data-part="head" d="M170,160 C150,120 120,96 92,60 C110,70 126,64 132,52 C140,84 160,116 186,150" fill="#7A4C30" fill-opacity=".55" stroke="${L}" stroke-width="1.8"/>
    <path data-part="thorax" d="M260,132 C270,110 300,98 330,96 C312,104 296,116 286,130" fill="#7A4C30" fill-opacity=".55" stroke="${L}" stroke-width="1.8"/>
    <g data-part="antenna"><path d="M160,206 C138,212 124,224 116,240" fill="none" stroke="${L}" stroke-width="1.8"/><path d="M116,240 l-7,4 M116,240 l-3,8 M116,240 l2,9" stroke="${L}" stroke-width="1.6"/></g>
    <path data-part="wing" d="M340,138 C420,112 540,124 590,166 C560,150 440,140 352,152 Z" fill="#6B4630" fill-opacity=".55" stroke="${L}" stroke-width="1.6"/>
    <path data-part="hindwing" d="M360,150 C430,140 520,150 560,176" fill="none" stroke="#9C8A70" stroke-width="1.4" stroke-dasharray="5 4"/>
    <g data-part="cuticle-old" class="old-cuticle" opacity="0">
      <path d="M150,186 C150,150 200,140 230,150 C260,126 330,124 376,148 C440,124 560,134 590,170 C600,200 580,232 540,238 C440,252 300,250 232,234 C200,234 152,216 150,186 Z" fill="none" stroke="#B7A890" stroke-width="2" stroke-dasharray="6 4"/>
      <path class="split" d="M230,148 L300,128" stroke="#C47A3D" stroke-width="3" opacity="0"/>
    </g>
  </g>
  <g data-layer="trachea">
    <g data-part="spiracle">${spiracles.map(([x,y]) => `<circle cx="${x}" cy="${y}" r="3.6" fill="#FFFDF7" stroke="${L}" stroke-width="1.2"/>`).join("")}</g>
    <g data-part="trachea" fill="none" stroke="#6F9AA6" stroke-width="1.6" stroke-linecap="round">
      <path d="M200,190 C260,182 360,186 470,190 C520,192 560,190 584,184"/>
      ${spiracles.map(([x,y]) => `<path d="M${x},${y} C${x+2},${y-8} ${x-2},${y-14} ${x},${y-20}"/><path d="M${x},${y-12} l10,-10 M${x},${y-12} l-9,-9" stroke-width="1"/>`).join("")}
      <path d="M200,190 C190,182 178,176 170,170" />
    </g>
  </g>
  <g data-layer="circ">
    <path data-part="heart" d="M196,158 C260,150 330,148 380,152 C460,148 540,156 582,172" fill="none" stroke="#C2554A" stroke-width="4" stroke-linecap="round"/>
  </g>
  <g data-layer="nerve">
    <g data-part="nerve">
      <path d="M190,180 C200,214 260,226 330,228 C420,232 520,226 560,214" fill="none" stroke="#8C7AAE" stroke-width="2.4"/>
      ${[[190,178],[250,222],[300,226],[350,229],[420,230],[490,226]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="${x===190?8:4.5}" fill="#E8DDF0" stroke="#7C6D9E" stroke-width="1.2"/>`).join("")}
    </g>
  </g>
  <g data-layer="gut">
    <path data-part="gut" d="M152,200 C190,200 230,196 280,198 C330,200 380,196 430,200 C480,204 530,206 590,196" fill="none" stroke="#B88A4E" stroke-width="7" stroke-linecap="round" opacity=".85"/>
    <g data-part="malpighi" fill="none" stroke="#D0A24A" stroke-width="1.3">
      <path d="M452,202 C440,214 452,222 440,232"/><path d="M456,202 C470,214 458,224 474,232"/><path d="M450,200 C432,192 442,182 426,178"/><path d="M458,200 C476,190 466,180 484,176"/>
    </g>
  </g>`;

const parts = {
  head:{ja:"頭部",en:"head",text:"触角・目・口器がある。カブトムシの雄では長い角が頭部から伸びる。",src:["U6"]},
  thorax:{ja:"胸部（前胸・中胸・後胸）",en:"thorax",text:"3つの節からなる。脚はすべて胸部に付き、各節に1対ずつ、合計3対。翅は中胸と後胸に付く。胸の角は前胸の背中にある。",wrong:"脚は腹部にも付いているように見えることがあるが、6本すべてが胸部から出る。",src:["U6"]},
  abdomen:{ja:"腹部",en:"abdomen",text:"消化管や生殖器官の多くが入る。脚はない。",src:["U6"]},
  leg:{ja:"脚（3対・関節肢）",en:"jointed legs",text:"関節でつながった節からなる関節肢。3対すべてが胸部から出る。（断面図で関節のしくみを見る）",src:["U6"]},
  antenna:{ja:"触角（1対）",en:"antenna",text:"においなどを感じとる。昆虫は触角を1対もつ。",src:["U6"]},
  wing:{ja:"前翅（さやばね）",en:"elytra",text:"中胸に付く前翅。甲虫では硬いさや状になり、後翅を守る。",src:["U6","CHK"]},
  hindwing:{ja:"後翅",en:"hind wing",text:"後胸に付く膜状の翅。飛ぶときに広げ、ふだんは前翅の下にたたまれている（点線）。",src:["U6","CHK"]},
  "cuticle-old":{ja:"古いクチクラ",en:"old cuticle",text:"脱皮で脱ぎ捨てられる外骨格。",src:["U6"]},
  spiracle:{ja:"気門",en:"spiracle",text:"体の側面に並ぶ空気の出入り口。開閉して水分が失われるのを調節する。数は種類によって異なる。",src:["U6","CHK"]},
  trachea:{ja:"気管系",en:"tracheae",text:"気門から体の中へ枝分かれして広がる管。酸素を直接、組織まで届ける。",wrong:"昆虫は肺で呼吸するのではなく、血液（血リンパ）が酸素の運搬の主役でもない。",src:["U6"]},
  heart:{ja:"背脈管（心臓）",en:"dorsal vessel",text:"背側を前後に走る管状の心臓。血リンパを前へ送り出し、体腔（血体腔）に流す開放血管系。",src:["U6","CHK"]},
  nerve:{ja:"脳と腹側神経索",en:"brain & ventral nerve cord",text:"頭部の脳から、腹側を神経索が走り、節ごとに神経節がある（はしご形神経系）。",src:["CHK"]},
  gut:{ja:"消化管",en:"gut",text:"口から前腸・中腸・後腸を経て肛門へ。",src:["CHK"]},
  malpighi:{ja:"マルピーギ管",en:"Malpighian tubules",text:"中腸と後腸の境目に付く細い管。体液から老廃物をこしとって後腸に送る排出器官。後腸で水が再吸収される。",src:["U6"]}
};

/* 脚の関節の拡大（断面） */
const section = `
  <g data-layer="exo">
    <path data-part="exo" d="M40,120 L330,96 C350,95 360,108 360,122 L360,170 C360,184 348,196 330,196 L40,190 Z" fill="#8C5A3C" fill-opacity=".55" stroke="${L}" stroke-width="2.2"/>
    <path d="M54,134 L326,112 C340,112 344,120 344,128 L344,164 C344,174 338,180 326,180 L54,176 Z" fill="#FBF6EC" stroke="${L}" stroke-width="1.1"/>
    <path data-part="exo" d="M392,118 L572,182 C584,186 588,200 582,210 L570,232 C564,242 552,246 540,242 L382,184 Z" fill="#8C5A3C" fill-opacity=".55" stroke="${L}" stroke-width="2.2"/>
    <path d="M398,134 L564,194 C572,198 572,206 568,212 L560,226 C556,232 550,232 544,230 L392,174 Z" fill="#FBF6EC" stroke="${L}" stroke-width="1.1"/>
    <path data-part="membrane" d="M360,108 C376,104 392,112 392,118 M360,188 C372,196 380,192 382,184" fill="none" stroke="#C9A77E" stroke-width="5" stroke-linecap="round"/>
    <circle data-part="membrane" cx="372" cy="150" r="7" fill="#F2E3CF" stroke="${L}" stroke-width="1.4"/>
  </g>
  <g data-layer="muscle">
    <path data-part="flexor" d="M90,172 C160,168 250,164 330,160 L372,170 L392,166" fill="none" stroke="#C2554A" stroke-width="9" stroke-linecap="round" opacity=".85"/>
    <path data-part="extensor" d="M90,140 C170,132 260,126 330,124 L372,128 L396,136" fill="none" stroke="#D9776A" stroke-width="7" stroke-linecap="round" opacity=".85"/>
    <path data-part="apodeme" d="M330,160 L392,166 M330,124 L396,136" stroke="${L}" stroke-width="1.6"/>
  </g>`;

App.anatomyDefs.kabutomushi = {
  anatomy:{
    title:"昆虫（カブトムシ）の体のつくり（側面の模式図）",
    viewBox:"0 0 640 330",
    caption:"左が頭。層を切り替えると、気管系・循環・神経・消化管が見える。",
    svg, parts,
    layers:[
      {id:"exo",ja:"外骨格・外形",color:"var(--c-arthropoda)"},
      {id:"trachea",ja:"気管系",color:"#6F9AA6"},
      {id:"circ",ja:"循環",color:"#C2554A"},
      {id:"nerve",ja:"神経",color:"#8C7AAE"},
      {id:"gut",ja:"消化",color:"#B88A4E"}
    ],
    actions:[{id:"molt",ja:"▶ 脱皮",run(api, done){
      const s = api.svg, old = s.querySelector(".old-cuticle"), split = s.querySelector(".split");
      const body = [...s.querySelectorAll('[data-layer="exo"] > [data-part]:not(.old-cuticle)')];
      api.setLayer("exo", true);
      old.style.transition = "opacity .6s, transform 1.4s cubic-bezier(.22,.7,.2,1)"; split.style.transition = "opacity .4s";
      body.forEach(b => { b.style.transformBox = "view-box"; b.style.transformOrigin = "370px 190px"; b.style.transition = "transform 1.2s cubic-bezier(.22,.7,.2,1), fill-opacity 1.2s"; });
      api.caption("<b>① 新しいクチクラができる</b>　古い外骨格の内側で、表皮が新しいクチクラ（まだ柔らかい）をつくる。");
      old.style.opacity = "1"; old.style.transform = "none";
      api.later(1500, () => { split.style.opacity = "1"; api.caption("<b>② 背中が割れる</b>　古いクチクラの背中が割れ、そこから抜け出す。"); });
      api.later(3000, () => { old.style.transform = "translate(30px,-26px)"; old.style.opacity = ".5";
        body.forEach(b => b.style.transform = "scale(1.07)");
        api.caption("<b>③ 膨らんでから硬くなる</b>　抜け出した直後の柔らかいうちに体が膨らみ、そのあと新しいクチクラが硬くなる。外骨格の昆虫は、脱皮で一段ずつ大きくなる。"); });
      api.later(6200, () => { old.style.opacity = "0"; old.style.transform = "none"; split.style.opacity = "0"; body.forEach(b => b.style.transform = ""); done(); });
    }}]
  },
  section:{
    title:"脚の関節の拡大（縦断面）",
    viewBox:"0 0 620 290",
    caption:"外骨格は筒のようになっていて、筋肉は筒の内側に付く。関節の部分だけ外骨格が薄く柔らかい（関節膜）。",
    svg:section,
    parts:{
      exo:{ja:"外骨格（キチン質のクチクラ）",en:"exoskeleton",text:"体の外側を覆う硬い殻。主成分はキチン。筋肉はこの内側に付く。",wrong:"外骨格は死んだ殻ではなく、表皮が分泌してつくったもの。",src:["U6"]},
      membrane:{ja:"関節膜（関節）",en:"joint membrane",text:"節と節の間だけ、外骨格が薄く柔らかい。ここで曲がる。",src:["CHK"]},
      flexor:{ja:"屈筋",en:"flexor muscle",text:"縮むと関節が曲がる筋肉。外骨格の内側に付く。",src:["CHK"]},
      extensor:{ja:"伸筋",en:"extensor muscle",text:"縮むと関節が伸びる筋肉。屈筋と対になって働く。",src:["CHK"]},
      apodeme:{ja:"腱（筋肉の付着部）",en:"apodeme",lv:"adv",text:"筋肉の力を次の節に伝える、外骨格が内側に突き出した部分。",src:["CHK"]}
    },
    layers:[
      {id:"exo",ja:"外骨格",color:"var(--c-arthropoda)"},
      {id:"muscle",ja:"筋肉",color:"#C2554A"}
    ],
    actions:[]
  }
};
const D = App.data && App.data.phylumDetail;
if(D && D.arthropoda && D.arthropoda.species && D.arthropoda.species.kabutomushi) D.arthropoda.species.kabutomushi.anatomy = "kabutomushi";
})();
