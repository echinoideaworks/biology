/* 系統樹データ（クラドグラム：枝の長さに意味はない）
   st: "ok"（支持が強い）/ "debate"（議論中：点線）
   poly:true … 内部の分岐順が未解決のため多分岐（くし状）で描く
   tip … organisms.js のID
   出典のない分岐は作らない（research/06 §4）。 */
App.data.lifeTree = {
  id:"luca",ja:"全生物の共通祖先",
  note:"すべての生物がもつ共通の祖先。細菌・古細菌・真核生物の3つに分かれたとするのが3ドメイン説。<span class='lv-adv'>系統樹の根の位置、真核生物の起源は研究が続いている。</span>",
  src:["P3"],
  ch:[
    {id:"bacteria",ja:"細菌",en:"Bacteria",band:"細菌 Bacteria",domain:true,color:"--c-bacteria",
      note:"核膜をもたない原核生物の一群。古細菌とは別のドメイン。",src:["P3"],
      poly:true,ch:[{tip:"daichokin"},{tip:"cyanobacteria"}]},
    {id:"arch_euk",ja:"古細菌と真核生物の共通祖先",
      note:"3ドメイン説では、古細菌と真核生物が姉妹群とされる。<span class='lv-adv'>真核生物は古細菌の<b>内部</b>から生じたとする説（2ドメイン説）が有力な仮説として検討されている。<span class='badge b-debate'>議論中</span></span>",
      src:["P3","P16","P20"],
      ch:[
        {id:"archaea",ja:"古細菌（アーキア）",en:"Archaea",band:"古細菌",domain:true,color:"--c-archaea",
          note:"核膜をもたない原核生物だが、rRNAの配列は細菌と大きく異なる。",src:["P3"],
          ch:[{tip:"methanogen"}]},
        {id:"eukarya",ja:"真核生物",en:"Eukarya",domain:true,color:"--c-eukarya",
          note:"核膜に包まれた核をもつ生物。内部の大きなまとまり（スーパーグループ）どうしの分岐順や根の位置は未解決のため、くし状に描いている。",
          src:["P13","P14"],poly:true,
          ch:[
            {id:"amorphea",ja:"アモルフェア",en:"Amorphea",
              note:"動物・菌類・アメーボゾアなどを含む大きなまとまり。",src:["P13"],
              ch:[
                {id:"opisthokonta",ja:"オピストコンタ",en:"Opisthokonta",
                  note:"動物と菌類を含む。後ろ向きの1本の鞭毛をもつ細胞（精子など）が共通の特徴とされる。",src:["P13"],
                  ch:[
                    {id:"fungi",ja:"菌類",en:"Fungi",ch:[{tip:"shiitake"}],src:["P13"]},
                    {id:"holozoa",ja:"動物と襟鞭毛虫の共通祖先",
                      note:"襟鞭毛虫は動物にいちばん近縁な単細胞生物とされる。",src:["U1"],
                      ch:[
                        {tip:"erikabemouchu"},
                        {id:"metazoa",ja:"動物",en:"Metazoa",animals:true,
                          note:"多細胞で、ほかの生物を食べて栄養をとる。<b>最初に分かれた系統</b>は、海綿動物とする説と有櫛動物とする説があり決着していない。",
                          src:["P29","P30","P33"],st:"ok",poly:true,
                          ch:[
                            {tip:"kairoudoukutsu",phylum:"porifera"},
                            {tip:"mizukurage",phylum:"cnidaria"},
                            {id:"bilateria",ja:"左右相称動物",en:"Bilateria",
                              note:"左右相称の体と三胚葉をもつ動物。旧口動物と新口動物に分かれる。",src:["P23"],
                              ch:[
                                {id:"protostomia",ja:"旧口動物（前口動物）",en:"Protostomia",
                                  note:"分子系統では、脱皮動物と冠輪動物の2つにまとまる。",src:["P23"],
                                  ch:[
                                    {id:"ecdysozoa",ja:"脱皮動物",en:"Ecdysozoa",
                                      note:"クチクラを脱ぎ捨てて（脱皮して）成長する動物。18S rRNAの解析で提案された。",src:["P22"],
                                      ch:[{tip:"kaichu",phylum:"nematoda"},{tip:"kabutomushi",phylum:"arthropoda"}]},
                                    {id:"lophotrochozoa",ja:"冠輪動物",en:"Lophotrochozoa",
                                      note:"トロコフォア幼生や触手冠をもつ動物を含む。内部の門どうしの分岐順は未解決。",src:["P23"],poly:true,
                                      ch:[{tip:"namiuzumushi",phylum:"platyhelminthes"},{tip:"mimizu",phylum:"annelida"},{tip:"madako",phylum:"mollusca"}]}
                                  ]},
                                {id:"deuterostomia",ja:"新口動物（後口動物）",en:"Deuterostomia",
                                  note:"原口が肛門になり、口が別にできる（典型）。棘皮動物と脊索動物などを含む。",src:["U1","P23"],
                                  ch:[{tip:"mahitode",phylum:"echinodermata"},{tip:"namekujiuo",phylum:"chordata"}]}
                              ]}
                          ]}
                      ]}
                  ]},
                {id:"amoebozoa",ja:"アメーボゾア",en:"Amoebozoa",note:"仮足で動くアメーバや粘菌を含む。",src:["P13"],ch:[{tip:"ameba"}]}
              ]},
            {id:"archaeplastida",ja:"アーケプラスチダ",en:"Archaeplastida",
              note:"シアノバクテリアを取り込んだ一次共生に由来する葉緑体をもつ。紅藻・緑藻・陸上植物など。",src:["P13"],
              ch:[
                {tip:"asakusanori"},
                {id:"chloroplastida",ja:"緑色植物",en:"Chloroplastida",note:"緑藻と陸上植物。",src:["P13"],ch:[{tip:"kuramidomonas"},{tip:"sakura"}]}
              ]},
            {id:"tsar",ja:"TSAR",en:"TSAR",
              note:"ストラメノパイル・アルベオラータ・リザリアなどを含む大きなまとまり。内部の分岐順は図では省略。",src:["P14"],poly:true,
              ch:[{tip:"keiso"},{tip:"zourimushi"},{tip:"hoshachu"}]},
            {id:"discoba",ja:"ディスコバ",en:"Discoba",
              note:"ミドリムシやトリパノソーマを含む。かつての「エクスカバータ」の一部。",src:["P13"],ch:[{tip:"midorimushi"}]}
          ]}
      ]}
  ]
};

/* ---------- P04 動物の系統樹（門レベル＋脊索動物の内部） ----------
   脊索動物内部：頭索が先に分かれ、尾索＋脊椎が姉妹群（Delsuc 2006/2008、research/07）。
   脊椎動物内部：Irisarri 2017（research/07 本文確認）。
   最初の分岐は仮説で切り替える（first: "poly" | "sponge" | "cteno"）。 */
App.data.buildAnimalTree = function(first){
  const t = (phylum, tip, label, extra) => Object.assign({phylum, tip, label}, extra||{});
  const porifera = t("porifera","kairoudoukutsu","海綿動物");
  const cteno = t("ctenophora",null,"有櫛動物",{note:"クシクラゲの仲間。8列の櫛板で泳ぐ。高校の9門には含まれない。"});
  const cnid = t("cnidaria","mizukurage","刺胞動物");
  const xeno = t("xenacoelomorpha",null,"珍無腸動物",{st:"debate",adv:true,note:"左右相称動物で最初に分かれたとする解析と、水腔動物（棘皮動物など）に近いとする解析がある。"});
  const vert = {id:"vertebrata",ja:"脊椎動物",en:"Vertebrata",note:"脊索が発生の途中で脊椎（背骨）に置き換わる。",src:["CHK"],ch:[
    t("chordata","medaka","条鰭類（メダカ）",{sub:true}),
    {id:"tetrapoda",ja:"四肢動物",note:"4本の肢をもつ脊椎動物。「魚類」は四肢動物を除いたまとまりなので側系統。",src:["CHK"],ch:[
      t("chordata","tonosamagaeru","両生類（カエル）",{sub:true}),
      {id:"amniota",ja:"有羊膜類",note:"胚が羊膜に包まれて育つ。哺乳類と、爬虫類＋鳥類に分かれる。",src:["CHK"],ch:[
        t("chordata","hatsukanezumi","哺乳類（ネズミ）",{sub:true}),
        {id:"sauropsida",ja:"爬虫類＋鳥類",note:"鳥類は爬虫類の内部に入る（ワニ類にもっとも近い）。鳥類を除いた「爬虫類」は側系統。",src:["P41"],ch:[
          t("chordata","nihontokage","トカゲ類",{sub:true}),
          t("chordata","kawarabato","鳥類（ハト）",{sub:true})]}]}]}]};
  const bilateria = {id:"bilateria",ja:"左右相称動物",en:"Bilateria",note:"左右相称の体と三胚葉をもつ。旧口動物と新口動物に分かれる。",src:["P23"],poly:false,ch:[
    xeno,
    {id:"protostomia",ja:"旧口動物（前口動物）",en:"Protostomia",group:"proto",note:"分子系統では脱皮動物と冠輪動物の2つにまとまる。原口が口になるのは典型であって、例外がある。",src:["P23","P36"],ch:[
      {id:"ecdysozoa",ja:"脱皮動物",en:"Ecdysozoa",group:"ecd",note:"クチクラを脱ぎ捨てて（脱皮して）成長する。18S rRNA の解析で提案された。",src:["P22"],ch:[
        t("nematoda","kaichu","線形動物"), t("arthropoda","kabutomushi","節足動物")]},
      {id:"lophotrochozoa",ja:"冠輪動物",en:"Lophotrochozoa",group:"lop",poly:true,note:"トロコフォア幼生や触手冠をもつ動物を含む。門どうしの分岐順は未解決。",src:["P23"],ch:[
        t("platyhelminthes","namiuzumushi","扁形動物"), t("annelida","mimizu","環形動物"), t("mollusca","madako","軟体動物")]}]},
    {id:"deuterostomia",ja:"新口動物（後口動物）",en:"Deuterostomia",group:"deu",note:"原口が肛門になり、口が別にできる（典型）。",src:["U1","P23"],ch:[
      t("echinodermata","mahitode","棘皮動物"),
      {id:"chordata",ja:"脊索動物",en:"Chordata",note:"一生のどこかで脊索・背側の神経管・咽頭裂・肛門より後ろの尾をもつ。",src:["U6"],ch:[
        t("chordata","namekujiuo","頭索動物（ナメクジウオ）",{sub:true}),
        {id:"olfactores",ja:"尾索動物＋脊椎動物",note:"ホヤ（尾索動物）は、ナメクジウオより脊椎動物に近いとされる。",src:["CHK"],ch:[
          t("chordata","maboya","尾索動物（ホヤ）",{sub:true}), vert]}]}]}]};
  const noteFirst = "動物で最初に分かれた系統は、海綿動物とする説と有櫛動物とする説があり、決着していない。";
  const root = {id:"metazoa",ja:"動物",en:"Metazoa",src:["P29","P30","P33"]};
  if(first === "sponge"){
    root.note = noteFirst + "（いまは「海綿動物が先」の仮説で表示）"; root.ch = [porifera, {id:"m2",ja:"海綿動物以外の動物",st:"debate",ch:[cteno, {id:"m3",ja:"有櫛動物以外の動物",note:"平板動物（センモウヒラムシ）もこの付近に入る（省略）。",ch:[cnid, bilateria]}]}];
  } else if(first === "cteno"){
    root.note = noteFirst + "（いまは「有櫛動物が先」の仮説で表示）"; root.ch = [cteno, {id:"m2",ja:"有櫛動物以外の動物",st:"debate",ch:[porifera, {id:"m3",ja:"海綿・有櫛以外の動物",note:"平板動物（センモウヒラムシ）もこの付近に入る（省略）。",ch:[cnid, bilateria]}]}];
  } else {
    root.note = noteFirst + "そのため、根元はくし状（未解決）で表示している。"; root.poly = true; root.ch = [porifera, cteno, cnid, bilateria];
  }
  return root;
};
