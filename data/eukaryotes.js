/* P06 真核生物のスーパーグループ図鑑（採用：Burki et al. 2020 ＋ Adl et al. 2019）
   所属・大きさは research/07_追加調査.md。sizeConf: "二次" = 二次資料、"要確認" = 記憶ベース・未確認 */

/* 図版がまだ無い生物（App.imgTag が「図版制作中」を表示する） */
Object.assign(App.data.organisms, {
  mojihokori:{ja:"モジホコリ",alias:["真正粘菌","粘菌"],kana:"もじほこり ねんきん",sci:"Physarum polycephalum",group:"amoebozoa",kind:"micro",img:"assets/microorganisms/mojihokori.svg",
    line:"多核の変形体が網目状に広がり、原形質流動で移動する粘菌。",src:["P13"]},
  haiirosou:{ja:"灰色藻（キアノフォラ）",kana:"かいしょくそう きあのふぉら",sci:"Cyanophora paradoxa",group:"archaeplastida",kind:"micro",img:"assets/microorganisms/haiirosou.svg",
    line:"シアネルと呼ばれる、シアノバクテリアに似た葉緑体をもつ。",src:["P13"]},
  uzubenmousou:{ja:"渦鞭毛藻（ツノモ類）",kana:"うずべんもうそう つのも",sci:"Ceratium s.l.",group:"tsar",kind:"micro",img:"assets/microorganisms/uzubenmousou.svg",
    line:"横溝と縦溝に1本ずつ鞭毛をもつ。赤潮の原因になる種もいる。",src:["P13"]},
  mararia:{ja:"マラリア原虫",kana:"まらりあげんちゅう",sci:"Plasmodium spp.",group:"tsar",kind:"micro",img:"assets/microorganisms/mararia.svg",
    line:"赤血球の中に寄生する。ゾウリムシと同じアルベオラータに属する。",src:["P13"]},
  entsekisou:{ja:"円石藻",kana:"えんせきそう",sci:"Emiliania huxleyi",group:"haptista",kind:"micro",img:"assets/microorganisms/entsekisou.svg",
    line:"石灰質の小板（円石）で細胞を覆う海の藻類。",src:["P13"]},
  kuriputomonasu:{ja:"クリプトモナス",kana:"くりぷともなす",sci:"Cryptomonas sp.",group:"cryptista",kind:"micro",img:"assets/microorganisms/kuriputomonasu.svg",
    line:"長さの違う2本の鞭毛をもつ。二次共生の痕跡（ヌクレオモルフ）が残る。",src:["P13"]},
  toripanosoma:{ja:"トリパノソーマ",kana:"とりぱのそーま",sci:"Trypanosoma brucei",group:"discoba",kind:"micro",img:"assets/microorganisms/toripanosoma.svg",
    line:"アフリカ睡眠病の病原体。ミドリムシと同じディスコバに属する。",src:["P13"]},
  ranburu:{ja:"ランブル鞭毛虫",kana:"らんぶるべんもうちゅう",sci:"Giardia intestinalis",group:"metamonada",kind:"micro",img:"assets/microorganisms/ranburu.svg",
    line:"核を2つもち、腸の壁に吸着する。典型的なミトコンドリアをもたない。",src:["P13"]},
  torikomonasu:{ja:"トリコモナス",kana:"とりこもなす",sci:"Trichomonas vaginalis",group:"metamonada",kind:"micro",img:"assets/microorganisms/torikomonasu.svg",
    line:"前方に4本、波動膜に沿って1本の鞭毛をもつ寄生性の生物。",src:["P13"]}
});

App.data.eukaryotes = {
  adopted:"Burki et al. 2020（Trends Ecol Evol）＋ Adl et al. 2019（J Eukaryot Microbiol）",
  /* 地図上の位置（SVG viewBox 0 0 640 520、中心 320,260） */
  groups:[
    {id:"opisthokonta",ja:"オピストコンタ",en:"Opisthokonta",parent:"amorphea",x:120,y:120,color:"--k-opis",
      note:"動物・菌類・襟鞭毛虫を含む。動物と菌類は、植物よりも互いに近い。",orgs:["erikabemouchu","shiitake"],
      extra:"動物（棘皮動物・脊索動物など）もこのグループ。→ 動物図鑑"},
    {id:"amoebozoa",ja:"アメーボゾア",en:"Amoebozoa",parent:"amorphea",x:90,y:270,color:"--k-protist",
      note:"仮足で動くアメーバや、粘菌を含む。",orgs:["ameba","mojihokori"]},
    {id:"archaeplastida",ja:"アーケプラスチダ",en:"Archaeplastida",x:330,y:58,color:"--k-plant",dashed:true,
      note:"シアノバクテリアを取り込んだ一次共生に由来する葉緑体をもつ。紅藻・灰色藻・緑藻・陸上植物。<b>単系統かどうかは議論中</b>（点線）。",
      orgs:["kuramidomonas","sakura","asakusanori","haiirosou"]},
    {id:"tsar",ja:"TSAR",en:"Telonemia + SAR",x:540,y:150,color:"--k-tsar",
      note:"ストラメノパイル（ケイ藻・褐藻）、アルベオラータ（ゾウリムシ・渦鞭毛藻・マラリア原虫）、リザリア（放散虫・有孔虫）など。<b>内部の3つの分岐順は未解決</b>。",
      orgs:["keiso","zourimushi","uzubenmousou","mararia","hoshachu"]},
    {id:"haptista",ja:"ハプティスタ",en:"Haptista",x:560,y:330,color:"--k-other",
      note:"円石藻などを含む。ハプトネマという糸状の構造をもつ。",orgs:["entsekisou"]},
    {id:"cryptista",ja:"クリプティスタ",en:"Cryptista",x:470,y:450,color:"--k-other",
      note:"クリプトモナスなど。長さの違う2本の鞭毛をもつ。",orgs:["kuriputomonasu"]},
    {id:"discoba",ja:"ディスコバ",en:"Discoba",x:250,y:455,color:"--k-discoba",excavate:true,
      note:"ミドリムシやトリパノソーマを含む。かつての「エクスカバータ」の一部。",orgs:["midorimushi","toripanosoma"]},
    {id:"metamonada",ja:"メタモナダ",en:"Metamonada",x:100,y:420,color:"--k-other",excavate:true,
      note:"酸素の少ない環境にすみ、典型的なミトコンドリアをもたない生物が多い。かつての「エクスカバータ」の一部。",orgs:["ranburu","torikomonasu"]}
  ],
  /* 大きさ（µm）と根拠の確かさ */
  info:{
    erikabemouchu:{size:"約5〜10 µm",conf:"要確認",see:"襟（微絨毛）が1本の鞭毛を囲む。海綿動物の襟細胞とよく似る。"},
    shiitake:{size:"子実体は数cm（胞子は数µm）",conf:"要確認",see:"体は細い菌糸の集まり。キノコは胞子をつくる子実体。"},
    ameba:{size:"最大約500〜600 µm",conf:"二次",see:"形を変える仮足をのばして動き、食物を包みこむ。"},
    mojihokori:{size:"変形体はcm規模（胞子は約10 µm）",conf:"二次",see:"多核の変形体が網目状に広がり、原形質流動で移動する。"},
    kuramidomonas:{size:"約5〜12 µm",conf:"二次",see:"頂端に等長の鞭毛2本、杯状の葉緑体、眼点。"},
    sakura:{size:"樹木（m規模）",conf:"二次",see:"陸上植物。緑藻と共通の祖先から分かれた。"},
    asakusanori:{size:"葉状体は数cm〜数十cm",conf:"要確認",see:"紅藻。赤い色素（フィコエリトリン）をもつ。"},
    haiirosou:{size:"約10〜20 µm",conf:"要確認",see:"シアネル（原始的な葉緑体）をもつ。"},
    keiso:{size:"2 µm〜数百 µm",conf:"要確認",see:"ケイ酸の殻（被殻）が、ふたのように合わさる。"},
    zourimushi:{size:"約60〜300 µm（属）",conf:"二次",see:"全身の繊毛で泳ぐ。大核と小核をもつ。"},
    uzubenmousou:{size:"約100〜400 µm",conf:"要確認",see:"横溝と縦溝にそれぞれ鞭毛が1本。板状の殻と角状の突起。"},
    mararia:{size:"メロゾイト約1〜2 µm",conf:"要確認",see:"赤血球の中で増える細胞内寄生者。"},
    hoshachu:{size:"数十µm〜約2 mm",conf:"要確認",see:"放射状の骨格と細い仮足（軸足）。"},
    entsekisou:{size:"約4〜5 µm",conf:"二次",see:"石灰質の円石（ココリス）で細胞を覆う。"},
    kuriputomonasu:{size:"約10〜50 µm",conf:"要確認",see:"長さの違う2本の鞭毛。ヌクレオモルフをもつ。"},
    midorimushi:{size:"約35〜55 µm",conf:"二次",see:"鞭毛で泳ぎ、葉緑体で光合成もする。葉緑体は緑藻の二次共生に由来。"},
    toripanosoma:{size:"約15〜35 µm",conf:"要確認",see:"1本の鞭毛が波動膜に沿って体表を走る。"},
    ranburu:{size:"約12〜15 µm",conf:"二次",see:"核が2つ、鞭毛は4対。腹側の吸着円盤で腸に付く。"},
    torikomonasu:{size:"約10〜20 µm",conf:"二次",see:"前方に4本、後方に波動膜に沿う1本の鞭毛。"}
  },
  /* 五界説で原生生物界とされることが多い生物（一般的な扱い） */
  wasProtist:["erikabemouchu","ameba","mojihokori","kuramidomonas","asakusanori","haiirosou","keiso","zourimushi","uzubenmousou","mararia","hoshachu","entsekisou","kuriputomonasu","midorimushi","toripanosoma","ranburu","torikomonasu"],
  /* 大きさ比較（µm、代表値） */
  sizes:[
    {id:"daichokin",um:2,label:"約2 µm",conf:"二次"},
    {id:"kuramidomonas",um:10,label:"約10 µm",conf:"二次"},
    {id:"midorimushi",um:50,label:"約50 µm",conf:"二次"},
    {id:"zourimushi",um:200,label:"約200 µm",conf:"二次"},
    {id:"ameba",um:500,label:"約500 µm",conf:"二次"},
    {id:"hoshachu",um:1000,label:"約1 mm（種により大きく違う）",conf:"要確認"}
  ]
};
