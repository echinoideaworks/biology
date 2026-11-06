/* P05 体のつくりを比べる：横断面の模式図（自作）と比較項目
   すべて viewBox 0 0 260 220、背側が上、同じ縮尺の「模式」。
   data-layer: body（体壁・筋）/ coelom（体腔）/ gut（消化管）/ nerve（神経）/ support（骨格・支持）/ special（特徴的な器官）
   断定できない細部は描かず、note に注記する（research/04, 06）。 */
(function(){
const L = "#3a332b";
const S = {
  porifera:`
    <g data-layer="body"><circle cx="130" cy="110" r="88" fill="#E8D6A6" stroke="${L}" stroke-width="2.2"/></g>
    <circle cx="130" cy="110" r="50" fill="#FBF7EE" stroke="${L}" stroke-width="1.2"/>
    <g data-layer="body" fill="#FBF7EE" stroke="${L}" stroke-width="1">${[0,40,80,120,160,200,240,280,320].map(a=>{const r=a*Math.PI/180;return `<path d="M${130+88*Math.cos(r)},${110+88*Math.sin(r)} L${130+52*Math.cos(r)},${110+52*Math.sin(r)}" stroke-width="5" stroke="#FBF7EE"/>`}).join("")}</g>
    <g data-layer="support" stroke="#8C6E46" stroke-width="1.4">${[20,60,100,140,180,220,260,300,340].map(a=>{const r=a*Math.PI/180;return `<path d="M${130+62*Math.cos(r)},${110+62*Math.sin(r)} l${10*Math.cos(r+1)},${10*Math.sin(r+1)}"/>`}).join("")}</g>
    <g data-layer="special" fill="#C9874A" stroke="${L}" stroke-width=".6">${Array.from({length:18},(_,i)=>{const r=i*20*Math.PI/180;return `<circle cx="${130+47*Math.cos(r)}" cy="${110+47*Math.sin(r)}" r="3.4"/>`}).join("")}</g>`,
  cnidaria:`
    <g data-layer="body"><circle cx="130" cy="110" r="82" fill="#BFD9DE" stroke="${L}" stroke-width="2.2"/></g>
    <g data-layer="support"><circle cx="130" cy="110" r="64" fill="#EDE6CF" stroke="${L}" stroke-width="1"/></g>
    <g data-layer="gut"><circle cx="130" cy="110" r="60" fill="#D6C29A" stroke="${L}" stroke-width="1"/><circle cx="130" cy="110" r="42" fill="#F6EBD3" stroke="${L}" stroke-width="1.1"/></g>
    <g data-layer="special" fill="#B05A3C">${Array.from({length:14},(_,i)=>{const r=i*25.7*Math.PI/180;return `<circle cx="${130+75*Math.cos(r)}" cy="${110+75*Math.sin(r)}" r="2.8"/>`}).join("")}</g>
    <g data-layer="nerve" stroke="#8C7AAE" stroke-width="1" fill="none"><path d="M96,58 l14,6 l10,-8 l16,5 l12,-6 l16,7"/><path d="M78,140 l10,8 l12,-2 M180,150 l10,-6 l8,6"/></g>`,
  platyhelminthes:`
    <g data-layer="body"><ellipse cx="130" cy="112" rx="112" ry="38" fill="#E3C9D2" stroke="${L}" stroke-width="2.2"/></g>
    <g data-layer="gut" fill="#D9B47E" stroke="${L}" stroke-width="1"><ellipse cx="130" cy="108" rx="16" ry="11"/><ellipse cx="82" cy="108" rx="11" ry="9"/><ellipse cx="178" cy="108" rx="11" ry="9"/><ellipse cx="44" cy="110" rx="8" ry="7"/><ellipse cx="216" cy="110" rx="8" ry="7"/></g>
    <g data-layer="nerve" fill="#8C7AAE" stroke="${L}" stroke-width=".6"><circle cx="104" cy="134" r="5"/><circle cx="156" cy="134" r="5"/></g>
    <g data-layer="special" fill="#7FA6B5" stroke="${L}" stroke-width=".6"><circle cx="60" cy="96" r="3.5"/><circle cx="200" cy="96" r="3.5"/></g>`,
  nematoda:`
    <g data-layer="support"><circle cx="130" cy="110" r="84" fill="#E9DDBD" stroke="${L}" stroke-width="2.2"/></g>
    <g data-layer="body"><circle cx="130" cy="110" r="76" fill="#E7C9A6" stroke="${L}" stroke-width="1"/></g>
    <g data-layer="body" fill="#C99A78" stroke="${L}" stroke-width="1">${[45,135,225,315].map(a=>{const r=a*Math.PI/180;return `<path d="M${130+74*Math.cos(r-.6)},${110+74*Math.sin(r-.6)} A74,74 0 0 1 ${130+74*Math.cos(r+.6)},${110+74*Math.sin(r+.6)} L${130+56*Math.cos(r+.5)},${110+56*Math.sin(r+.5)} A56,56 0 0 0 ${130+56*Math.cos(r-.5)},${110+56*Math.sin(r-.5)}Z"/>`}).join("")}</g>
    <g data-layer="coelom"><path d="M130,56 a54,54 0 1 0 .1,0Z" fill="#F7EFD9" stroke="none"/></g>
    <g data-layer="gut"><circle cx="130" cy="110" r="22" fill="#D9B47E" stroke="${L}" stroke-width="1.2"/></g>
    <g data-layer="nerve" fill="#8C7AAE" stroke="${L}" stroke-width=".6"><circle cx="130" cy="37" r="5"/><circle cx="130" cy="183" r="6.5"/></g>
    <g data-layer="special" fill="#7FA6B5" stroke="${L}" stroke-width=".6"><circle cx="57" cy="110" r="4.5"/><circle cx="203" cy="110" r="4.5"/></g>`,
  annelida:`
    <g data-layer="body"><circle cx="130" cy="110" r="86" fill="#D7A08E" stroke="${L}" stroke-width="2.2"/><circle cx="130" cy="110" r="76" fill="#C98E7A" stroke="${L}" stroke-width="1"/></g>
    <g data-layer="coelom"><circle cx="130" cy="110" r="64" fill="#F7EFD9" stroke="${L}" stroke-width="1" stroke-dasharray="3 2"/></g>
    <g data-layer="gut"><circle cx="130" cy="108" r="26" fill="#D9B47E" stroke="${L}" stroke-width="1.2"/></g>
    <g data-layer="special" fill="#B44A3C" stroke="${L}" stroke-width=".6"><circle cx="130" cy="76" r="5.5"/><circle cx="130" cy="140" r="4.5"/></g>
    <g data-layer="nerve" fill="#8C7AAE" stroke="${L}" stroke-width=".6"><ellipse cx="130" cy="160" rx="9" ry="5"/></g>
    <g data-layer="special" stroke="${L}" stroke-width="1.6"><path d="M80,178 l-10,10 M92,186 l-6,13 M180,178 l10,10 M168,186 l6,13"/></g>`,
  mollusca:`
    <g data-layer="support"><path d="M44,96 C52,34 208,34 216,96 L204,96 C196,48 64,48 56,96Z" fill="#CDB98F" stroke="${L}" stroke-width="2.2"/></g>
    <g data-layer="body"><path d="M56,96 C64,52 196,52 204,96 C214,120 208,150 196,158 L188,110 C180,96 80,96 72,110 L64,158 C52,150 46,120 56,96Z" fill="#D6C2DE" stroke="${L}" stroke-width="1.4"/></g>
    <g data-layer="body"><path d="M88,150 C88,120 172,120 172,150 C172,190 150,206 130,206 C110,206 88,190 88,150Z" fill="#C7A7B6" stroke="${L}" stroke-width="1.6"/></g>
    <g data-layer="special" fill="#A9CFC0" stroke="${L}" stroke-width="1"><path d="M72,112 c-6,10 -4,26 4,34 c4,-10 4,-24 -4,-34Z"/><path d="M188,112 c6,10 4,26 -4,34 c-4,-10 -4,-24 4,-34Z"/></g>
    <g data-layer="coelom"><ellipse cx="130" cy="74" rx="20" ry="11" fill="#F7EFD9" stroke="${L}" stroke-width="1" stroke-dasharray="3 2"/></g>
    <g data-layer="gut"><circle cx="130" cy="108" r="15" fill="#D9B47E" stroke="${L}" stroke-width="1.2"/></g>
    <g data-layer="nerve" fill="#8C7AAE" stroke="${L}" stroke-width=".6"><circle cx="116" cy="164" r="5"/><circle cx="144" cy="164" r="5"/></g>`,
  arthropoda:`
    <g data-layer="support"><path d="M30,120 C30,56 230,56 230,120 C230,168 196,184 130,184 C64,184 30,168 30,120Z" fill="#B8945E" stroke="${L}" stroke-width="2.4"/></g>
    <g data-layer="coelom"><path d="M42,120 C42,68 218,68 218,120 C218,160 190,172 130,172 C70,172 42,160 42,120Z" fill="#F4E7C8" stroke="${L}" stroke-width="1"/></g>
    <g data-layer="body" fill="#C99A78" stroke="${L}" stroke-width=".8"><path d="M60,92 c10,-10 26,-14 36,-12 l-4,12 c-10,0 -22,4 -30,8Z"/><path d="M200,92 c-10,-10 -26,-14 -36,-12 l4,12 c10,0 22,4 30,8Z"/><path d="M70,160 c12,4 24,4 32,2 l-2,-10 c-8,2 -20,2 -28,-1Z"/><path d="M190,160 c-12,4 -24,4 -32,2 l2,-10 c8,2 20,2 28,-1Z"/></g>
    <g data-layer="gut"><circle cx="130" cy="122" r="22" fill="#D9B47E" stroke="${L}" stroke-width="1.2"/></g>
    <g data-layer="special"><ellipse cx="130" cy="82" rx="8" ry="6" fill="#B44A3C" stroke="${L}" stroke-width=".8"/><path d="M48,128 C70,128 80,112 96,110 M212,128 C190,128 180,112 164,110" fill="none" stroke="#7FA6B5" stroke-width="2.2"/></g>
    <g data-layer="nerve" fill="#8C7AAE" stroke="${L}" stroke-width=".6"><ellipse cx="122" cy="162" rx="5" ry="4"/><ellipse cx="138" cy="162" rx="5" ry="4"/></g>`,
  echinodermata:`
    <g data-layer="body"><path d="M40,150 C40,72 92,30 130,30 C168,30 220,72 220,150 L150,150 L140,132 C134,124 126,124 120,132 L110,150Z" fill="#E7BE8E" stroke="${L}" stroke-width="2.2"/></g>
    <g data-layer="support" fill="#F5EBD8" stroke="#8C6E46" stroke-width=".9">${Array.from({length:10},(_,i)=>{const a=Math.PI*(1-(i+.5)/10);return `<rect x="${130+80*Math.cos(a)-6}" y="${146-104*Math.sin(a)-3.5}" width="12" height="7" rx="3"/>`}).join("")}</g>
    <g data-layer="coelom"><path d="M54,142 C54,84 98,46 130,46 C162,46 206,84 206,142 L154,142 L146,126 C138,112 122,112 114,126 L106,142Z" fill="#FBF6EC" stroke="${L}" stroke-width="1"/></g>
    <g data-layer="gut" fill="#E3CFA6" stroke="#8A7246" stroke-width="1"><ellipse cx="96" cy="84" rx="22" ry="16"/><ellipse cx="164" cy="84" rx="22" ry="16"/></g>
    <g data-layer="special"><ellipse cx="104" cy="118" rx="9" ry="12" fill="#A9CFDB" stroke="#3F7890"/><ellipse cx="156" cy="118" rx="9" ry="12" fill="#A9CFDB" stroke="#3F7890"/><circle cx="130" cy="140" r="5" fill="#A9CFDB" stroke="#3F7890"/><path d="M106,130 L100,190 M154,130 L160,190" stroke="#4F7A68" stroke-width="7" stroke-linecap="round"/></g>
    <g data-layer="nerve"><path d="M122,150 Q130,154 138,150" stroke="#8C7AAE" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>`,
  chordata:`
    <g data-layer="body"><path d="M130,14 C176,40 190,96 186,130 C182,170 160,206 130,206 C100,206 78,170 74,130 C70,96 84,40 130,14Z" fill="#BCCFD6" stroke="${L}" stroke-width="2.2"/></g>
    <g data-layer="body" stroke="${L}" stroke-width=".8" fill="none"><path d="M130,60 C110,80 96,100 92,128 M130,60 C150,80 164,100 168,128"/></g>
    <g data-layer="nerve"><circle cx="130" cy="58" r="10" fill="#B9A6D6" stroke="${L}" stroke-width="1.2"/><circle cx="130" cy="58" r="3" fill="#FBF6EC"/></g>
    <g data-layer="support"><circle cx="130" cy="88" r="15" fill="#E9DDBD" stroke="${L}" stroke-width="1.4"/></g>
    <g data-layer="coelom"><ellipse cx="130" cy="150" rx="34" ry="34" fill="#F7EFD9" stroke="${L}" stroke-width="1" stroke-dasharray="3 2"/></g>
    <g data-layer="gut"><circle cx="130" cy="146" r="18" fill="#D9B47E" stroke="${L}" stroke-width="1.2"/></g>`
};

App.data.compare = {
  sections:S,
  info:{
    porifera:{gut:"消化管なし（襟細胞が食物をとらえる）",seg:"なし",nerve:"なし",support:"骨片",special:"襟細胞・入水孔",note:"筒状の体の壁の断面。中央は消化管ではなく水の通り道（中央腔）。"},
    cnidaria:{gut:"口のみ（胃腔・肛門なし）",seg:"なし",nerve:"散在神経系",support:"中膠",special:"刺胞",note:"ヒドラの胴の断面（外胚葉・中膠・内胚葉）。"},
    platyhelminthes:{gut:"口のみ（腸は枝分かれ・肛門なし）",seg:"なし",nerve:"はしご形（2本の神経索）",support:"なし",special:"原腎管",note:"体腔はなく、体壁と腸の間は組織で埋まる（無体腔）。"},
    nematoda:{gut:"口→肛門（完全な消化管）",seg:"なし",nerve:"背側・腹側の神経索",support:"クチクラ（静水骨格）",special:"排出管（側線）",note:"筋は縦走筋のみ。側線を通る神経の有無は資料で異なるため省略。"},
    annelida:{gut:"口→肛門（完全な消化管）",seg:"あり（同じつくりのくり返し）",nerve:"はしご形（腹側）",support:"体腔の静水骨格",special:"背行・腹行血管、剛毛",note:"外側から環状筋→縦走筋。体腔は体節ごとに隔膜で仕切られる。"},
    mollusca:{gut:"口→肛門（完全な消化管）",seg:"なし",nerve:"神経節が集まる",support:"殻（多くの種）",special:"外套膜・えら",note:"腹足類・二枚貝などを一般化した模式。真体腔は囲心腔などに小さくなっている。"},
    arthropoda:{gut:"口→肛門（完全な消化管）",seg:"あり（体節が合わさり頭・胸・腹など）",nerve:"はしご形（腹側）",support:"外骨格（キチン）",special:"背側の心臓・気管",note:"昆虫の腹部の模式。体腔の大部分は血体腔（真体腔は小さくなっている）。"},
    echinodermata:{gut:"口→肛門（完全な消化管）",seg:"なし",nerve:"放射神経",support:"内骨格（骨片）",special:"水管系・管足",note:"ヒトデの腕の断面。"},
    chordata:{gut:"口→肛門（完全な消化管）",seg:"筋節がくり返す（体節的な構造。教科書の扱いは要確認）",nerve:"背側の神経管",support:"脊索",special:"脊索・背側神経管・咽頭裂",note:"ナメクジウオの咽頭より後ろの断面の模式。咽頭裂は前方の断面で見られる。"}
  },
  presets:[
    ["platyhelminthes","nematoda","無体腔と偽体腔。口だけの消化管と、口から肛門への消化管。"],
    ["nematoda","annelida","偽体腔と真体腔。体節の有無。縦走筋だけか、環状筋＋縦走筋か。"],
    ["annelida","arthropoda","どちらも体節をもつが、環形動物は冠輪動物、節足動物は脱皮動物。体節があっても系統は離れている。"],
    ["mollusca","arthropoda","殻と外骨格。体を支えるしくみは違っても、どちらも旧口動物。"],
    ["echinodermata","chordata","どちらも新口動物。成体の形はまったく違うが、系統的には近い。"]
  ]
};
})();
