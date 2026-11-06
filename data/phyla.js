/* 動物の門。order は系統樹の並び（意味は「隣どうし」ではなく、P04 の樹の末端順）。
   coelom: none / pseudo / true / na（胚葉の分化がはっきりしない・体腔の概念を当てはめない）
   sym: radial / bilateral / penta / asym
   mouth: proto（旧口）/ deutero（新口）/ na
   clade: ecdysozoa / lophotrochozoa / deuterostomia / na */
App.data.phyla = [
  {id:"porifera",ja:"海綿動物",en:"Porifera",lead:"kairoudoukutsu",reps:["kairoudoukutsu"],
    coelom:"na",sym:"asym",mouth:"na",clade:"na",layers:"明確な胚葉の分化なし",
    summary:"襟細胞の鞭毛で水を通し、食物をこしとる。神経や筋肉、はっきりした組織や器官をもたない。",src:["U1","U6"]},
  {id:"cnidaria",ja:"刺胞動物",en:"Cnidaria",lead:"mizukurage",reps:["mizukurage"],
    coelom:"none",sym:"radial",mouth:"na",clade:"na",layers:"二胚葉",
    summary:"刺胞で獲物をとらえる。口は1つで肛門はなく、神経は網のように散らばる（散在神経系）。",src:["U1","U6"]},
  {id:"platyhelminthes",ja:"扁形動物",en:"Platyhelminthes",lead:"namiuzumushi",reps:["namiuzumushi"],
    coelom:"none",sym:"bilateral",mouth:"proto",clade:"lophotrochozoa",layers:"三胚葉",
    summary:"平たい体で体腔がない。消化管は枝分かれし、肛門はない。",src:["U1","U6","P23"]},
  {id:"nematoda",ja:"線形動物",en:"Nematoda",lead:"kaichu",reps:["kaichu"],
    coelom:"pseudo",sym:"bilateral",mouth:"proto",clade:"ecdysozoa",layers:"三胚葉",
    summary:"細長い円筒形の体をクチクラが覆い、脱皮して成長する。偽体腔をもち、筋肉は縦走筋だけ。",src:["U6","P22"]},
  {id:"annelida",ja:"環形動物",en:"Annelida",lead:"mimizu",reps:["mimizu"],
    coelom:"true",sym:"bilateral",mouth:"proto",clade:"lophotrochozoa",layers:"三胚葉",
    summary:"同じつくりの体節がくり返す。真体腔をもち、血管系は閉鎖血管系。",src:["U6","P23"]},
  {id:"mollusca",ja:"軟体動物",en:"Mollusca",lead:"madako",reps:["madako"],
    coelom:"true",sym:"bilateral",mouth:"proto",clade:"lophotrochozoa",layers:"三胚葉",
    summary:"外套膜が内臓を包み、多くは外套膜から殻を分泌する。体節はない。",src:["U6","P23"]},
  {id:"arthropoda",ja:"節足動物",en:"Arthropoda",lead:"kabutomushi",reps:["kabutomushi"],
    coelom:"true",sym:"bilateral",mouth:"proto",clade:"ecdysozoa",layers:"三胚葉",
    summary:"キチン質の外骨格と関節のある肢（関節肢）をもち、脱皮して成長する。",src:["U6","P22"]},
  {id:"echinodermata",ja:"棘皮動物",en:"Echinodermata",lead:"mahitode",reps:["mahitode","bafununi","manamako","kumohitode"],
    coelom:"true",sym:"penta",mouth:"deutero",clade:"deuterostomia",layers:"三胚葉",
    summary:"水管系と管足をもつ。成体は五放射相称だが、幼生は左右相称。",src:["U1","U6"],
    detail:true},
  {id:"chordata",ja:"脊索動物",en:"Chordata",lead:"namekujiuo",reps:["namekujiuo"],
    coelom:"true",sym:"bilateral",mouth:"deutero",clade:"deuterostomia",layers:"三胚葉",
    summary:"一生のどこかの時期に、脊索・背側の神経管・咽頭裂・肛門より後ろの尾をもつ。",src:["U6"]}
];

App.data.labels = {
  coelom:{none:"無体腔",pseudo:"偽体腔",true:"真体腔",na:"胚葉の分化なし"},
  sym:{radial:"放射相称",bilateral:"左右相称",penta:"五放射相称（成体）",asym:"多くは非相称"},
  mouth:{proto:"旧口動物（前口動物）",deutero:"新口動物（後口動物）",na:"旧口・新口の区分外"},
  clade:{ecdysozoa:"脱皮動物",lophotrochozoa:"冠輪動物",deuterostomia:"新口動物",na:"—"}
};

/* ---------- 各門の詳細（STEP 3 では棘皮動物のみ） ----------
   lv: basic / adv。st: debate（議論中）/ check（出典確認中） */
App.data.phylumDetail = {
  echinodermata:{
    species:{
      mahitode:{habitat:"浅い海の岩場・砂地",tag:"ヒトデ綱",note:"反口側（背側）から見た姿",anatomy:"hitode"},
      bafununi:{habitat:"潮間帯〜浅い岩礁",tag:"ウニ綱",note:"反口側から見た姿"},
      manamako:{habitat:"浅い海の砂泥底・岩礁",tag:"ナマコ綱",note:"側面から見た姿"},
      kumohitode:{habitat:"海底（種類により潮間帯〜深海）",tag:"クモヒトデ綱",note:"反口側から見た姿"}
    },
    sections:[
      {key:"body",title:"体のつくり",lv:"basic",html:`
        <p>成体の体は、中心から5方向に同じつくりがくり返す<b>五放射相称</b>。口のある面を<b>口側</b>、その反対を<b>反口側</b>と呼ぶ。<span class="src" data-src="U6">U6</span></p>
        <p>皮膚の下に、炭酸カルシウムでできた多数の骨片からなる<b>内骨格</b>がある。ウニでは骨片がすき間なく組み合わさって殻になり、ナマコでは骨片が小さく皮膚の中に散らばる。<span class="src" data-src="U1">U1</span><span class="badge b-check" title="ウニ・ナマコの骨片の違いは出典照合中">確認中</span></p>`},
      {key:"organ",title:"特徴的な器官 — 水管系と管足",lv:"basic",html:`
        <p><b>水管系</b>は棘皮動物だけがもつ器官で、体腔の一部に由来する。中を満たした液体の圧力で<b>管足</b>を伸び縮みさせ、移動・付着・呼吸に使う。<span class="src" data-src="U6">U6</span><span class="src" data-src="U9">U9</span></p>
        <ol class="flow-list">
          <li><b>多孔板</b> — 反口側の表面にある、ふるい状の小さな板</li>
          <li><b>石管</b> — 多孔板から口側へ下る管</li>
          <li><b>環状水管</b> — 口のまわりを一周する管</li>
          <li><b>放射水管</b> — 環状水管から5本の腕へ1本ずつ伸びる</li>
          <li><b>瓶嚢</b>（アンプル） — 管足の根もとにある袋。縮むと管足に液体が押し込まれる</li>
          <li><b>管足</b> — 口側の溝（歩帯溝）に並ぶ。先端で岩などに吸いつく</li>
        </ol>
        <p class="note-wrong"><b>よくある誤解</b>　「管足が海水を吸い込んで伸びる」のではない。水管系の中の液体が、瓶嚢の収縮で管足へ送られて伸びる。縮むときは管足の筋肉で液体が瓶嚢へ戻る。<span class="src" data-src="U9">U9</span></p>`},
      {key:"dev",title:"発生",lv:"basic",html:`
        <p><b>新口動物（後口動物）</b>の典型的な特徴をもつ：原腸胚の原口が<b>肛門</b>（またはその付近）になり、口は別にできる。卵割は放射卵割、体腔は原腸の壁が膨らんでできる<b>腸体腔</b>。<span class="src" data-src="U1">U1</span></p>
        <p>幼生（ヒトデのビピンナリア幼生、ウニのプルテウス幼生など）は<b>左右相称</b>。変態して五放射相称の成体になる。成体の放射相称は、左右相称の祖先から二次的に生じたもの。<span class="src" data-src="U6">U6</span></p>
        <p class="note-wrong"><b>注意</b>　「原口が肛門になる」は新口動物の<i>典型</i>であって、動物全体でみると例外がある。原口の運命だけで系統は決まらない。<span class="src" data-src="P23">P23</span><span class="src" data-src="P36">P36</span></p>`},
      {key:"life",title:"生活",lv:"basic",html:`
        <p>棘皮動物はすべて海にすむ。ヒトデ類の多くは貝類などを食べ、ウニ類は海藻を、ナマコ類は砂や泥の中の有機物を食べる。<span class="badge b-check">出典確認中</span></p>`},
      {key:"diff",title:"ほかの門との違い",lv:"basic",html:`
        <table class="cmp">
          <tr><th></th><th>棘皮動物</th><th>刺胞動物</th><th>脊索動物</th></tr>
          <tr><th>対称性</th><td>成体は五放射相称・幼生は左右相称</td><td>放射相称が基本</td><td>左右相称</td></tr>
          <tr><th>胚葉</th><td>三胚葉</td><td>二胚葉</td><td>三胚葉</td></tr>
          <tr><th>消化管</th><td>口と肛門がある</td><td>口のみ</td><td>口と肛門がある</td></tr>
          <tr><th>系統</th><td>新口動物</td><td>左右相称動物の外側</td><td>新口動物</td></tr>
        </table>
        <p>見た目の放射相称は刺胞動物と似ているが、系統的にはヒトを含む<b>脊索動物と同じ新口動物</b>に属する。<span class="src" data-src="U1">U1</span><span class="src" data-src="P23">P23</span></p>
        <p class="btn-row"><a class="btn" data-goto="#/compare">棘皮動物と脊索動物を比べる</a></p>`},
      {key:"terms",title:"重要な用語",lv:"basic",html:`
        <dl class="terms">
          <dt>水管系</dt><dd>体腔に由来する管のネットワーク。棘皮動物に固有。</dd>
          <dt>管足</dt><dd>水管系の液体の圧力で伸び縮みする小さな管状の足。</dd>
          <dt>瓶嚢</dt><dd>管足の根もとの袋。収縮して管足に液体を送る。</dd>
          <dt>多孔板</dt><dd>水管系の、反口側の表面にある入り口。</dd>
          <dt>五放射相称</dt><dd>5方向に同じつくりがくり返す体の対称性。</dd>
          <dt>新口動物</dt><dd>原口が肛門になり、口が別にできる動物（典型）。後口動物ともいう。</dd>
          <dt>腸体腔</dt><dd>原腸の壁が膨らんでできる体腔。</dd>
        </dl>`},
      {key:"adv",title:"発展 — 新口動物の中での位置",lv:"adv",html:`
        <p>棘皮動物は、ギボシムシなどの<b>半索動物</b>と近縁とされ、あわせて<b>水腔動物</b>（Ambulacraria）と呼ばれる。<span class="badge b-check">出典確認中</span></p>
        <p>体のつくりが単純な<b>珍無腸動物</b>が、この水腔動物に近縁とする解析<span class="src" data-src="P32">P32</span>と、左右相称動物の中で最初に分かれたとする解析<span class="src" data-src="P33">P33</span>があり、決着していない。<span class="badge b-debate">議論中</span></p>`}
    ]
  }
};
