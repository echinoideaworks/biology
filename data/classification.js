/* 分類体系の歴史（P02）。同じ16種の生物（トークン）を置いたまま、境界（region）だけを組み替える。
   座標はステージに対する％（x,w は幅、y,h は高さ）。
   place: { トークン: 領域ID }（"out" はステージの外へ退場）
   unsure: 所属を出典で確定できていないトークン（点線の枠で表示）
   call: 図の中の吹き出し { トークン: 文 } */
App.data.historyTokens = ["mahitode","kabutomushi","mizukurage","sakura","asakusanori","kuramidomonas","shiitake",
  "midorimushi","zourimushi","ameba","keiso","erikabemouchu","hoshachu","daichokin","cyanobacteria","methanogen"];

App.data.systems = [
  {
    id:"two", ja:"二界説", year:"18世紀〜", who:"リンネ（Linnaeus）ほか",
    purpose:"身近な生物を名前を付けて整理する（博物学的な整理）",
    basis:"動くか、動かずに育つか（外見・生活のしかた）",
    background:"顕微鏡で見る小さな生物はまだよく知られておらず、分類の対象は主に肉眼で見える動物と植物だった。",
    problem:"ミドリムシのように「鞭毛で泳ぎ、しかも光合成をする」生物は、どちらに入れても特徴が合わない。細菌や菌類も扱いに困った。",
    change:"—（出発点）",
    now:"正式な分類体系としては使われない。「動物」「植物」という日常のことばとして残る。",
    src:["CHK"], srcNote:"リンネの原典は未確認。下の図の配置は、二界説での一般的な扱いを示したもの。",
    regions:[
      {id:"plantae",ja:"植物界",x:2,y:6,w:46,h:86,color:"--k-plant"},
      {id:"animalia",ja:"動物界",x:52,y:6,w:46,h:86,color:"--k-animal"}
    ],
    place:{sakura:"plantae",asakusanori:"plantae",kuramidomonas:"plantae",shiitake:"plantae",keiso:"plantae",daichokin:"plantae",cyanobacteria:"plantae",methanogen:"plantae",
      mahitode:"animalia",kabutomushi:"animalia",mizukurage:"animalia",zourimushi:"animalia",ameba:"animalia",erikabemouchu:"animalia",hoshachu:"animalia",
      midorimushi:{between:["plantae","animalia"]}},
    unsure:["kuramidomonas","daichokin","cyanobacteria","methanogen","erikabemouchu","keiso"],
    call:{midorimushi:"動く（鞭毛）＋光合成（葉緑体）。どちらの界にも当てはまる",
      shiitake:"動かないので植物とされたが、光合成はしない"}
  },
  {
    id:"three", ja:"三界説", year:"1866", who:"ヘッケル（Haeckel）",
    purpose:"単細胞の生物を受け止める「第三の界」をつくる",
    basis:"体のつくりの単純さ（単細胞かどうか）",
    background:"顕微鏡観察が進み、動物とも植物とも言いにくい単細胞の生物が数多く知られるようになった。ヘッケル自身、放散虫の研究者だった。",
    problem:"核をもたない細菌と、核をもつ単細胞生物が、同じ「原生生物」にまとめられていた。菌類の位置も定まらなかった。",
    change:"単細胞の生物のための受け皿（原生生物界）ができた。ミドリムシは原生生物に入り、二界説の困りごとが解消された。",
    now:"歴史的な体系。「原生生物」という呼び方は今も使われるが、系統のまとまりではない。",
    src:["CHK"], srcNote:"1866年は二次資料による。ヘッケルの原生生物の範囲は何度も改訂されており、下の配置は要確認を含む。",
    regions:[
      {id:"plantae",ja:"植物界",x:2,y:6,w:28,h:86,color:"--k-plant"},
      {id:"protista",ja:"原生生物界",x:33,y:6,w:34,h:86,color:"--k-protist"},
      {id:"animalia",ja:"動物界",x:70,y:6,w:28,h:86,color:"--k-animal"}
    ],
    place:{sakura:"plantae",asakusanori:"plantae",shiitake:"plantae",
      midorimushi:"protista",zourimushi:"protista",ameba:"protista",keiso:"protista",erikabemouchu:"protista",hoshachu:"protista",kuramidomonas:"protista",daichokin:"protista",cyanobacteria:"protista",methanogen:"protista",
      mahitode:"animalia",kabutomushi:"animalia",mizukurage:"animalia"},
    unsure:["shiitake","kuramidomonas","daichokin","cyanobacteria","methanogen","asakusanori"],
    call:{hoshachu:"ヘッケルが詳しく研究し、原生生物に置いた",
      daichokin:"核のない細菌も、ここでは原生生物と同じ枠に入る"}
  },
  {
    id:"five", ja:"五界説", year:"1969", who:"ホイッタカー（Whittaker）",
    purpose:"細胞のつくりと栄養のとり方による、生態的・実用的な整理（系統そのものを示すことが目的ではない）",
    basis:"①原核か真核か　②単細胞か多細胞か　③栄養のとり方（光合成＝生産者、吸収＝分解者、摂食＝消費者）",
    background:"電子顕微鏡で細胞の微細なつくりが分かり、核をもたない原核細胞と、核をもつ真核細胞の違いがはっきりした。生態学では生産者・消費者・分解者という見方が広まっていた。",
    problem:"原生生物界は「動物・植物・菌のどれでもないもの」の寄せ集めで、系統のまとまりではない。モネラ界の中にも大きな違いが隠れていた（→三ドメイン説）。",
    change:"原核生物（モネラ界）が独立した。菌類が、栄養のとり方の違いから植物界と分けられた。",
    now:"歴史的な体系だが、教育の場で参照されることがある。原生生物界・モネラ界はどちらも単系統ではない。",
    src:["P1"], srcNote:"基準の数え方は資料により3〜5項目と揺れる（research/01）。",
    regions:[
      {id:"monera",ja:"モネラ界",sub:"原核生物",x:1.5,y:6,w:17,h:86,color:"--k-monera"},
      {id:"protista",ja:"原生生物界",sub:"真核・おもに単細胞",x:20.5,y:6,w:33,h:86,color:"--k-protist"},
      {id:"fungi",ja:"菌界",sub:"吸収（分解者）",x:55.5,y:6,w:13,h:86,color:"--k-fungi"},
      {id:"plantae",ja:"植物界",sub:"光合成（生産者）",x:70.5,y:6,w:13,h:86,color:"--k-plant"},
      {id:"animalia",ja:"動物界",sub:"摂食（消費者）",x:85.5,y:6,w:13,h:86,color:"--k-animal"}
    ],
    place:{daichokin:"monera",cyanobacteria:"monera",methanogen:"monera",
      midorimushi:"protista",zourimushi:"protista",ameba:"protista",keiso:"protista",erikabemouchu:"protista",hoshachu:"protista",kuramidomonas:"protista",asakusanori:"protista",
      shiitake:"fungi",sakura:"plantae",mahitode:"animalia",kabutomushi:"animalia",mizukurage:"animalia"},
    unsure:["asakusanori"],
    call:{shiitake:"光合成をせず、体の外で分解して吸収する。だから植物と分けた",
      asakusanori:"ホイッタカーの原案では多細胞の藻類は植物界。原生生物界に置くのはマーギュリスらの改訂版に多い（要確認）",
      methanogen:"細菌と同じ「原核生物」として、まとめてモネラ界に"}
  },
  {
    id:"domain", ja:"三ドメイン説", year:"1977 → 1990", who:"ウーズ（Woese）ら",
    purpose:"分子（rRNA）の配列を比べて、生物の最も大きな系統の区分を示す",
    basis:"リボソームRNA（rRNA）の塩基配列の違い",
    background:"rRNAはすべての生物がもち、変化がゆっくりなため、遠い関係の生物どうしも比べられる。1977年、メタン生成菌などが細菌とは根本的に異なる系統（当時は「原界 urkingdom」と呼んだ）だと報告された。1990年に「ドメイン」という界より上の階級が提案された。",
    problem:"五界説も「原核／真核」の二分も、生物の3つの大きなまとまりを反映していなかった。3つの間の違いは、動物と植物の違いよりずっと深い。",
    change:"原核生物が1つのまとまりではなくなり、細菌と古細菌（アーキア）に分かれた。界はドメインの中に置かれる。",
    now:"学習指導要領で扱う標準の体系。<span class='lv-adv'>真核生物は古細菌の内部から生じたとする説（2ドメイン説）が有力な仮説として検討されており、決着していない。</span>",
    src:["P2","P3","G1"], srcNote:"「1977年に三ドメイン説」は不正確。1977年は原界、ドメインの提案は1990年。",
    regions:[
      {id:"bacteria",ja:"細菌",sub:"Bacteria",x:1.5,y:28,w:22,h:64,color:"--c-bacteria",dom:true},
      {id:"archaea",ja:"古細菌（アーキア）",sub:"Archaea",x:25.5,y:28,w:15,h:64,color:"--c-archaea",dom:true},
      {id:"eukarya",ja:"真核生物",sub:"Eukarya",x:42.5,y:28,w:56,h:64,color:"--c-eukarya",dom:true}
    ],
    tree:true,
    place:{daichokin:"bacteria",cyanobacteria:"bacteria",methanogen:"archaea",
      midorimushi:"eukarya",zourimushi:"eukarya",ameba:"eukarya",keiso:"eukarya",erikabemouchu:"eukarya",hoshachu:"eukarya",kuramidomonas:"eukarya",asakusanori:"eukarya",
      shiitake:"eukarya",sakura:"eukarya",mahitode:"eukarya",kabutomushi:"eukarya",mizukurage:"eukarya"},
    unsure:[],
    call:{methanogen:"細菌と同じ原核生物だが、rRNAの配列は細菌と大きく異なる",
      cyanobacteria:"光合成をしても細菌。真核の藻類とは別のドメイン"}
  },
  {
    id:"super", ja:"真核生物のスーパーグループ", year:"2005 → 2019 / 2020", who:"アドル（Adl）ら、バーキ（Burki）ら",
    purpose:"真核生物ドメインの<b>内部</b>を、分子系統にもとづく単系統のまとまりで整理する",
    basis:"多数の遺伝子を使った系統解析（系統ゲノム解析）",
    background:"分子系統解析で、原生生物は多系統（起源の異なる寄せ集め）だと分かった。国際原生生物学会は2005年に新しい分類を発表し、2012年・2019年に改訂した。",
    problem:"「原生生物界」のような界の枠では、真核生物の実際の系統を表せない。",
    change:"かつての原生生物は、いくつものスーパーグループに散らばった。動物と菌類は同じオピストコンタに入り、植物は紅藻・緑藻とともにアーケプラスチダに入る。",
    now:"研究の枠組みとして使われるが暫定的。グループの数・構成・根の位置は研究者や年によって異なる。<b>三ドメイン説とは階層が違う</b>（ドメインの中をさらに分けている）。",
    src:["P10","P12","P13","P14"], srcNote:"採用：Burki et al. 2020 ＋ Adl et al. 2019。かつての「エクスカバータ」は単系統でないとされ、ディスコバ・メタモナダなどに分けた。",
    zoom:true,
    regions:[
      {id:"euk",ja:"真核生物ドメインの中",x:1,y:2,w:98,h:94,color:"--c-eukarya",dom:true,frame:true},
      {id:"amorphea",ja:"アモルフェア",x:2,y:11,w:56.5,h:84,color:"--k-amorphea",frame:true},
      {id:"opis",ja:"オピストコンタ",x:3.5,y:19,w:44,h:74,color:"--k-opis",frame:true},
      {id:"animalia",ja:"動物",x:4.5,y:29,w:19.5,h:62,color:"--k-animal"},
      {id:"fungi",ja:"菌類",x:25,y:29,w:10,h:62,color:"--k-fungi"},
      {id:"choano",ja:"襟鞭毛虫類",x:36,y:29,w:10.5,h:62,color:"--k-protist"},
      {id:"amoebozoa",ja:"アメーボゾア",x:48.5,y:19,w:9,h:74,color:"--k-protist"},
      {id:"archaeplastida",ja:"アーケプラスチダ",sub:"単系統かは議論中",x:60,y:11,w:19.5,h:41,color:"--k-plant",dashed:true},
      {id:"tsar",ja:"TSAR",sub:"内部の分岐順は未解決",x:60,y:54,w:19.5,h:41,color:"--k-tsar"},
      {id:"discoba",ja:"ディスコバ",sub:"旧エクスカバータの一部",x:80.5,y:11,w:18,h:41,color:"--k-discoba"},
      {id:"others",ja:"ハプティスタ・クリプティスタ・メタモナダ ほか",x:80.5,y:54,w:18,h:41,color:"--k-other",empty:true}
    ],
    place:{mahitode:"animalia",kabutomushi:"animalia",mizukurage:"animalia",shiitake:"fungi",erikabemouchu:"choano",ameba:"amoebozoa",
      sakura:"archaeplastida",kuramidomonas:"archaeplastida",asakusanori:"archaeplastida",
      keiso:"tsar",zourimushi:"tsar",hoshachu:"tsar",midorimushi:"discoba",
      daichokin:"out",cyanobacteria:"out",methanogen:"out"},
    unsure:[],
    protistRing:true,
    /* 縦長の画面での配置（入れ子のため専用） */
    portrait:{
      euk:{x:1,y:1,w:98,h:98}, amorphea:{x:3,y:6,w:94,h:47}, opis:{x:5,y:12,w:66,h:39},
      animalia:{x:7,y:19,w:30,h:30}, fungi:{x:38.5,y:19,w:15,h:30}, choano:{x:55,y:19,w:15,h:30},
      amoebozoa:{x:73,y:12,w:22,h:39},
      archaeplastida:{x:3,y:55,w:46,h:22}, tsar:{x:51,y:55,w:46,h:22},
      discoba:{x:3,y:79,w:46,h:19}, others:{x:51,y:79,w:46,h:19}
    },
    call:{erikabemouchu:"動物にいちばん近い単細胞生物",
      midorimushi:"かつての「原生生物」。いまは別々のまとまりに散らばる",
      shiitake:"菌類は植物より動物に近い"}
  }
];
