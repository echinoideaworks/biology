/* 残り8門の詳細（STEP 4 本文）。phyla.js の後に読み込む。
   学名は research/07_追加調査.md の確認結果に従う。未確定は sciCheck:true。 */
(function(){
const O = App.data.organisms;
const add = (id, o) => { if(!O[id]) O[id] = Object.assign({kind:"animal", img:"assets/organisms/"+id+".svg"}, o); };

/* ---- 追加の代表生物 ---- */
add("hidora",{ja:"ヒドラ",kana:"ひどら",sci:"Hydra sp.",phylum:"cnidaria",line:"淡水にすむ小さなポリプ。触手の刺胞で獲物をとらえる。",src:["U6"]});
add("isoginchaku",{ja:"イソギンチャク類",alias:["イソギンチャク"],kana:"いそぎんちゃく",sci:"Actiniaria",phylum:"cnidaria",line:"岩に付着して暮らすポリプ型の刺胞動物。",src:["U1"]});
add("gyouchu",{ja:"ギョウチュウ",alias:["蟯虫"],kana:"ぎょうちゅう",sci:"Enterobius vermicularis",phylum:"nematoda",line:"ヒトの腸に寄生する小さな線虫。",src:["CHK"]});
add("celegans",{ja:"線虫 C. elegans",alias:["シーエレガンス","センチュウ"],kana:"せんちゅう しーえれがんす",sci:"Caenorhabditis elegans",phylum:"nematoda",line:"土の中で自由生活をする線虫。発生や遺伝の研究に使われる。",src:["U6"]});
add("gokai",{ja:"ゴカイ類",alias:["ゴカイ"],kana:"ごかい",sci:"Hediste sp.",sciCheck:true,phylum:"annelida",line:"体節ごとに剛毛の生えたいぼ足をもつ。",src:["U6"]});
add("hiru",{ja:"ヒル類",alias:["ヒル"],kana:"ひる",sci:"Hirudinea",phylum:"annelida",line:"体の前後に吸盤をもつ環形動物。",src:["U6"]});
add("surumeika",{ja:"スルメイカ",alias:["イカ"],kana:"するめいか いか",sci:"Todarodes pacificus",phylum:"mollusca",line:"腕8本と触腕2本をもつ頭足類。殻は体内の薄い甲になっている。",src:["U6"]});
add("asari",{ja:"アサリ",kana:"あさり",sci:"Ruditapes philippinarum",phylum:"mollusca",line:"2枚の殻をもつ二枚貝。えらで水中の有機物をこしとる。",src:["U6"]});
add("katatsumuri",{ja:"カタツムリ（マイマイ類）",alias:["カタツムリ","マイマイ"],kana:"かたつむり まいまい",sci:"Stylommatophora",sciCheck:true,phylum:"mollusca",line:"陸にすむ巻貝。外套腔が肺としてはたらく。",src:["CHK"]});
add("jorougumo",{ja:"ジョロウグモ",alias:["クモ"],kana:"じょろうぐも くも",sci:"Trichonephila clavata",phylum:"arthropoda",line:"体は頭胸部と腹部の2つ、脚は4対。昆虫ではない。",src:["U6"]});
add("kurumaebi",{ja:"クルマエビ",alias:["エビ"],kana:"くるまえび えび",sci:"Penaeus japonicus",phylum:"arthropoda",line:"触角2対をもつ甲殻類。えらで呼吸する。",src:["U6"]});
add("sawagani",{ja:"サワガニ",alias:["カニ"],kana:"さわがに かに",sci:"Geothelphusa dehaani",phylum:"arthropoda",line:"淡水にすむカニ。腹部は小さく、胸の下に折りたたまれる。",src:["CHK"]});
add("tobizumukade",{ja:"トビズムカデ",alias:["ムカデ"],kana:"とびずむかで むかで",sci:"Scolopendra mutilans",sciCheck:true,phylum:"arthropoda",line:"多数の体節に1対ずつ脚をもつ多足類。",src:["U6"]});
add("maboya",{ja:"マボヤ",alias:["ホヤ"],kana:"まぼや ほや",sci:"Halocynthia roretzi",phylum:"chordata",line:"幼生はオタマジャクシ形で脊索をもつが、成体では脊索が消える。",src:["U6"]});
add("medaka",{ja:"メダカ",kana:"めだか",sci:"Oryzias latipes",phylum:"chordata",line:"条鰭類の魚。脊椎動物。",src:["CHK"]});
add("tonosamagaeru",{ja:"トノサマガエル",alias:["カエル"],kana:"とのさまがえる かえる",sci:"Pelophylax nigromaculatus",phylum:"chordata",line:"両生類。幼生（オタマジャクシ）は水中でえら呼吸をする。",src:["CHK"]});
add("nihontokage",{ja:"ニホントカゲ",alias:["トカゲ"],kana:"にほんとかげ とかげ",sci:"Plestiodon japonicus",sciCheck:true,phylum:"chordata",line:"有羊膜類の爬虫類。殻のある卵を陸に産む。",src:["CHK"]});
add("kawarabato",{ja:"カワラバト",alias:["ハト"],kana:"かわらばと はと",sci:"Columba livia",phylum:"chordata",line:"鳥類。系統的には爬虫類のワニ類に近い。",src:["P41"]});
add("hatsukanezumi",{ja:"ハツカネズミ",alias:["マウス","ネズミ"],kana:"はつかねずみ まうす ねずみ",sci:"Mus musculus",phylum:"chordata",line:"哺乳類。実験動物（マウス）としても使われる。",src:["CHK"]});

const REPS = {
  porifera:["kairoudoukutsu"], cnidaria:["mizukurage","hidora","isoginchaku"], platyhelminthes:["namiuzumushi"],
  nematoda:["kaichu","gyouchu","celegans"], annelida:["mimizu","gokai","hiru"],
  mollusca:["madako","surumeika","asari","katatsumuri"],
  arthropoda:["kabutomushi","jorougumo","kurumaebi","sawagani","tobizumukade"],
  chordata:["namekujiuo","maboya","medaka","tonosamagaeru","nihontokage","kawarabato","hatsukanezumi"]
};
Object.entries(REPS).forEach(([id, reps]) => { const p = App.data.phyla.find(x => x.id === id); if(p){ p.reps = reps; p.detail = true; } });

const S = id => `<span class="src" data-src="${id}">${id}</span>`;
const CHK = `<span class="badge b-check">出典確認中</span>`;
const DEB = `<span class="badge b-debate">議論中</span>`;
const W = t => `<p class="note-wrong"><b>よくある誤解</b>　${t}</p>`;
const sp = (habitat, tag, note) => ({habitat, tag, note});
const D = App.data.phylumDetail;

/* ===== 海綿動物 ===== */
D.porifera = {
  species:{kairoudoukutsu:sp("深海の砂泥底","六放海綿綱","側面から見た骨格")},
  sections:[
    {key:"body",title:"体のつくり",lv:"basic",html:`
      <p>体は水の通り道（水溝系）をもつ袋や筒のような形。体の壁の小さな孔（入水孔）から水が入り、中央の空所を通って、上の大きな孔（大孔）から出ていく。${S("U6")}</p>
      <p>神経や筋肉をもたず、はっきりした組織や器官もない。体は骨片（石灰質やガラス質）や海綿質繊維で支えられる。${S("U1")}${S("U6")}</p>`},
    {key:"organ",title:"特徴的な器官 — 襟細胞",lv:"basic",html:`
      <p><b>襟細胞</b>は、鞭毛を動かして水の流れを起こし、細胞のまわりの「襟」で食物の粒子をとらえて取り込む。${S("U6")}</p>
      <p>襟細胞は単細胞の<b>襟鞭毛虫</b>とよく似ている。${S("U1")}</p>
      ${W("襟細胞が似ているからといって、襟鞭毛虫が動物の祖先そのものというわけではない。両者は共通の祖先をもつ近縁なグループとされる。")}`},
    {key:"dev",title:"発生",lv:"basic",html:`
      <p>はっきりした胚葉の区別がなく、体腔や原口の運命といった考え方は当てはまらない。多くは泳ぐ幼生の時期を経て、岩などに付着する。${S("U1")}${CHK}</p>`},
    {key:"life",title:"生活",lv:"basic",html:`
      <p>ほとんどが海にすみ、一部は淡水にすむ。岩などに固着して、水をこしとって食べる。${CHK}</p>`},
    {key:"diff",title:"ほかの門との違い",lv:"basic",html:`
      <table class="cmp">
        <tr><th></th><th>海綿動物</th><th>刺胞動物</th></tr>
        <tr><th>組織・器官</th><td>はっきりしない</td><td>ある（二胚葉）</td></tr>
        <tr><th>神経</th><td>ない</td><td>散在神経系</td></tr>
        <tr><th>食べ方</th><td>襟細胞で水からこしとる</td><td>刺胞で獲物をとらえ、消化循環腔で消化</td></tr>
      </table>`},
    {key:"terms",title:"重要な用語",lv:"basic",html:`
      <dl class="terms"><dt>襟細胞</dt><dd>鞭毛で水流を起こし、襟で食物をとらえる細胞。</dd>
      <dt>水溝系</dt><dd>体の中を水が通り抜ける流路。</dd><dt>骨片</dt><dd>体を支える小さな骨格の粒。</dd></dl>`},
    {key:"adv",title:"発展 — 動物で最初に分かれたのは？",lv:"adv",html:`
      <p>動物の系統で最初に分かれたのが海綿動物か有櫛動物（クシクラゲ）かは、決着していない。${DEB}</p>
      <p>海綿動物を最初とする解析${S("P29")}と、有櫛動物を最初とする解析${S("P30")}がある。系統誤差の影響を論じた研究もある${S("P33")}。</p>`}
  ]
};

/* ===== 刺胞動物 ===== */
D.cnidaria = {
  species:{mizukurage:sp("沿岸の海","鉢虫綱","上から見たクラゲ型"),hidora:sp("池・沼など淡水","ヒドロ虫綱","ポリプ型"),isoginchaku:sp("岩礁の海岸","花虫綱","ポリプ型")},
  sections:[
    {key:"body",title:"体のつくり",lv:"basic",html:`
      <p>体は<b>二胚葉</b>：外側の表皮と内側の胃層があり、その間にゼラチン質の中膠がある。${S("U6")}</p>
      <p>消化管は袋状の<b>消化循環腔</b>で、出入り口は1つ（口が肛門を兼ねる）。神経は網のように散らばる<b>散在神経系</b>。${S("U1")}${S("U6")}</p>
      <p>体の形は、付着して暮らす<b>ポリプ型</b>（ヒドラ・イソギンチャク）と、泳ぐ<b>クラゲ型</b>がある。${CHK}</p>`},
    {key:"organ",title:"特徴的な器官 — 刺胞",lv:"basic",html:`
      <p><b>刺胞</b>は刺細胞の中にある小さなカプセル。引き金になる毛に触れると、中の糸が飛び出して獲物に刺さる。${S("U6")}</p>
      ${W("中膠は細胞の層ではない。細胞をほとんど含まないゼラチン質の層である。")}`},
    {key:"dev",title:"発生",lv:"basic",html:`
      <p>二胚葉で、中胚葉をもたない。体腔はない。発生の途中でプラヌラ幼生の時期を経るものが多い。${S("U1")}${CHK}</p>`},
    {key:"life",title:"生活",lv:"basic",html:`
      <p>ほとんどが海にすみ、ヒドラなど一部は淡水にすむ。イシサンゴ類は石灰質の骨格をつくり、サンゴ礁を形づくる。${CHK}</p>`},
    {key:"diff",title:"ほかの門との違い",lv:"basic",html:`
      <table class="cmp">
        <tr><th></th><th>刺胞動物</th><th>棘皮動物</th></tr>
        <tr><th>対称性</th><td>放射相称が基本</td><td>成体は五放射相称・幼生は左右相称</td></tr>
        <tr><th>胚葉</th><td>二胚葉</td><td>三胚葉</td></tr>
        <tr><th>消化管</th><td>口のみ</td><td>口と肛門</td></tr>
      </table>
      <p>どちらも放射状の体だが、系統は大きく離れている。${S("P23")}</p>`},
    {key:"terms",title:"重要な用語",lv:"basic",html:`
      <dl class="terms"><dt>刺胞</dt><dd>糸を発射して獲物をとらえる細胞内の構造。</dd><dt>二胚葉</dt><dd>外胚葉と内胚葉の2層からなる体。</dd>
      <dt>散在神経系</dt><dd>神経細胞が網のように散らばる神経系。</dd><dt>消化循環腔</dt><dd>口が1つの袋状の消化管。</dd></dl>`},
    {key:"adv",title:"発展 — 本当に「放射相称」？",lv:"adv",html:`
      <p>イソギンチャク類などの花虫綱には、口の溝などによる二放射的な軸があり、「単純な放射相称」とは言い切れない。${CHK}</p>
      <p>平板動物（センモウヒラムシ）が刺胞動物に近縁とする解析もある。${DEB}</p>`}
  ]
};

/* ===== 扁形動物 ===== */
D.platyhelminthes = {
  species:{namiuzumushi:sp("川の石の裏など淡水","渦虫類","上から見た姿")},
  sections:[
    {key:"body",title:"体のつくり",lv:"basic",html:`
      <p>体は平たく、<b>三胚葉</b>だが<b>体腔がない（無体腔）</b>。消化管は枝分かれし、出入り口は口だけで肛門はない。${S("U6")}</p>
      <p>頭部に眼点と脳（神経節）があり、そこから2本の神経索がはしごのように伸びる。循環系や呼吸のための器官はない。${S("U6")}</p>`},
    {key:"organ",title:"特徴的な器官",lv:"basic",html:`
      <p>プラナリアは腹側の中央から<b>咽頭</b>を突き出して食物を吸い込む。排出には<b>原腎管</b>（炎細胞）を使う。${S("U6")}${CHK}</p>
      ${W("プラナリアに肛門や血管はない。")}`},
    {key:"dev",title:"発生",lv:"basic",html:`<p>多くは<b>らせん卵割</b>をおこない、旧口動物（前口動物）に含まれる。${CHK}</p>`},
    {key:"life",title:"生活",lv:"basic",html:`<p>プラナリアのように自由生活するもののほか、吸虫類や条虫類（サナダムシ）のように寄生するものも多い。プラナリアは再生能力が高いことで知られる。${CHK}</p>`},
    {key:"diff",title:"ほかの門との違い",lv:"basic",html:`
      <table class="cmp"><tr><th></th><th>扁形動物</th><th>線形動物</th></tr>
      <tr><th>体の形</th><td>平たい</td><td>細長い円筒形</td></tr><tr><th>体腔</th><td>なし</td><td>偽体腔</td></tr>
      <tr><th>消化管</th><td>口のみ（枝分かれ）</td><td>口→肛門</td></tr><tr><th>系統</th><td>冠輪動物</td><td>脱皮動物</td></tr></table>`},
    {key:"terms",title:"重要な用語",lv:"basic",html:`<dl class="terms"><dt>無体腔</dt><dd>体壁と消化管の間に空所がない体。</dd><dt>原腎管</dt><dd>炎細胞をもつ排出器官。</dd><dt>はしご形神経系</dt><dd>左右の神経索が横の連絡でつながる神経系。</dd></dl>`},
    {key:"adv",title:"発展 — 扁形動物の位置の変化",lv:"adv",html:`
      <p>かつては単純な体のつくりから、左右相称動物の中で早く分かれたものとみなされることがあった。現在は、無腸類などが扁形動物から外され、残りは冠輪動物の中に位置づけられる。${S("P23")}</p>
      <p>体腔がないのは、祖先から体のつくりが単純化した結果とする見方もある。${DEB}</p>
      ${W("「体が単純だから原始的」とは言えない。")}`}
  ]
};

/* ===== 線形動物 ===== */
D.nematoda = {
  species:{kaichu:sp("ヒトの小腸（寄生）","回虫目","雌の全身"),gyouchu:sp("ヒトの大腸（寄生）","蟯虫目",""),celegans:sp("土の中（自由生活）","桿線虫目","")},
  sections:[
    {key:"body",title:"体のつくり",lv:"basic",html:`
      <p>体は細長い円筒形で、体節はない。表面は丈夫な<b>クチクラ</b>に覆われ、成長のときに脱皮する。${S("U6")}</p>
      <p>体壁と腸の間に液体で満たされた<b>偽体腔</b>がある。消化管は口から肛門まで1本につながる。${S("U6")}</p>`},
    {key:"organ",title:"特徴的な器官 — 体の断面",lv:"basic",html:`
      <p>筋肉は<b>縦走筋だけ</b>で環状筋がない。そのため体をむちのようにくねらせて動く。偽体腔の液体が体の形を保つ骨格の役目をする。${S("U6")}</p>
      <p>表皮には背・腹・左右の4か所に厚い部分があり、左右の部分（側線）には排出管が通る。${CHK}</p>
      ${W("偽体腔は「体腔がない」という意味ではない。空所はあるが、真体腔とはつくりが違う。")}`},
    {key:"dev",title:"発生",lv:"basic",html:`<p>旧口動物（前口動物）のうち<b>脱皮動物</b>に含まれる。C. elegans では、受精卵から成体までの細胞の系譜がすべて調べられている。${S("P22")}${CHK}</p>`},
    {key:"life",title:"生活",lv:"basic",html:`<p>土の中や水中で自由生活するものが非常に多く、ヒトや動植物に寄生するもの（回虫・ギョウチュウ・アニサキスなど）もいる。${CHK}</p>`},
    {key:"diff",title:"ほかの門との違い",lv:"basic",html:`
      <table class="cmp"><tr><th></th><th>線形動物</th><th>環形動物</th></tr>
      <tr><th>体節</th><td>ない</td><td>ある</td></tr><tr><th>体腔</th><td>偽体腔</td><td>真体腔</td></tr>
      <tr><th>筋肉</th><td>縦走筋のみ</td><td>環状筋と縦走筋</td></tr><tr><th>系統</th><td>脱皮動物</td><td>冠輪動物</td></tr></table>
      <p>同じ細長い体でも、系統は大きく離れている。${S("P22")}</p>`},
    {key:"terms",title:"重要な用語",lv:"basic",html:`<dl class="terms"><dt>偽体腔</dt><dd>体壁と腸の間にあり、体腔上皮に囲まれない空所。</dd><dt>クチクラ</dt><dd>体表を覆う丈夫な層。脱皮で取り替える。</dd><dt>脱皮動物</dt><dd>脱皮して成長する動物の系統。線形・節足動物など。</dd></dl>`},
    {key:"adv",title:"発展 — 偽体腔動物は1つのまとまり？",lv:"adv",html:`<p>偽体腔をもつ動物（線形動物・輪形動物など）はかつて「袋形動物」としてまとめられたが、分子系統では離れた系統に属し、1つのまとまりではない（多系統）。${S("P23")}${S("P22")}</p>`}
  ]
};

/* ===== 環形動物 ===== */
D.annelida = {
  species:{mimizu:sp("畑・森の土の中","貧毛類","側面から見た姿"),gokai:sp("河口・干潟","多毛類",""),hiru:sp("水田・川など","ヒル類","")},
  sections:[
    {key:"body",title:"体のつくり",lv:"basic",html:`
      <p>同じつくりの<b>体節</b>がくり返す。体節は外見の輪だけでなく、体の中も<b>隔膜</b>で仕切られ、神経節や排出器官（腎管）が体節ごとにくり返す。${S("U6")}</p>
      <p><b>真体腔</b>をもち、血管系は<b>閉鎖血管系</b>。ミミズは少数の剛毛で体を支えて進む。${S("U6")}</p>`},
    {key:"organ",title:"特徴的な器官",lv:"basic",html:`
      <p>背側の血管（背行血管）と腹側の血管（腹行血管）を、体節ごとの環状の血管がつなぐ。前方の数対の太い環状血管は拍動し、「心臓」と呼ばれることがある（対数は資料により3〜5対と異なる）。${S("U6")}${CHK}</p>
      <p>成熟したミミズでは前方に<b>環帯</b>ができ、卵を包む繭をつくる。${S("U6")}</p>
      ${W("ミミズの「心臓」はヒトの心臓のような部屋をもつ器官ではなく、拍動する血管である。")}`},
    {key:"dev",title:"発生",lv:"basic",html:`<p>旧口動物（前口動物）で<b>冠輪動物</b>に含まれる。多くはらせん卵割をおこない、体腔は裂体腔としてできる。ゴカイ類はトロコフォア幼生を経る。${S("U1")}${S("U6")}</p>`},
    {key:"life",title:"生活",lv:"basic",html:`<p>ミミズは土を食べて有機物を消化し、土を耕す。ゴカイ類は海や河口に、ヒル類は淡水に多い。${CHK}</p>`},
    {key:"diff",title:"ほかの門との違い",lv:"basic",html:`
      <table class="cmp"><tr><th></th><th>環形動物</th><th>節足動物</th></tr>
      <tr><th>体節</th><td>ある</td><td>ある</td></tr><tr><th>体の表面</th><td>やわらかい</td><td>外骨格</td></tr>
      <tr><th>血管系</th><td>閉鎖血管系</td><td>開放血管系</td></tr><tr><th>系統</th><td>冠輪動物</td><td>脱皮動物</td></tr></table>
      <p>どちらも体節をもつが、近縁ではない。${S("P22")} 体節が別々に生じたのかどうかは議論がある。${DEB}</p>`},
    {key:"terms",title:"重要な用語",lv:"basic",html:`<dl class="terms"><dt>体節</dt><dd>体の前後方向にくり返す単位。</dd><dt>環帯</dt><dd>成熟したミミズの前方にある太い帯。</dd><dt>閉鎖血管系</dt><dd>血液が血管の中だけを流れる血管系。</dd><dt>冠輪動物</dt><dd>環形動物・軟体動物などを含む旧口動物の系統。</dd></dl>`},
    {key:"adv",title:"発展 — 環形動物の範囲",lv:"adv",html:`<p>かつて独立の門とされたユムシ類やハオリムシ類（有鬚動物）は、分子系統で環形動物の内部に含まれるとされる。${S("P23")}</p>`}
  ]
};

/* ===== 軟体動物 ===== */
D.mollusca = {
  species:{madako:sp("岩礁の海底","頭足綱","側面から見た姿"),surumeika:sp("外洋","頭足綱",""),asari:sp("干潟の砂泥","二枚貝綱",""),katatsumuri:sp("陸上","腹足綱","")},
  sections:[
    {key:"body",title:"体のつくり",lv:"basic",html:`
      <p>体は頭部・足・内臓塊からなり、<b>外套膜</b>が内臓塊を包む。多くは外套膜から殻を分泌する。体節はない。${S("U6")}</p>
      <p>真体腔はあるが小さく、心臓のまわりなどに限られる。血管系は多くが開放血管系だが、イカ・タコ（頭足類）は閉鎖血管系。${S("U6")}</p>`},
    {key:"organ",title:"特徴的な器官 — 外套膜と漏斗",lv:"basic",html:`
      <p>外套膜と内臓の間のすき間（<b>外套腔</b>）にえらがある。タコやイカは外套腔に水を取り込み、<b>漏斗</b>から勢いよく噴き出して進む。漏斗は足が変化したもの。${S("U6")}</p>
      ${W("外套膜は貝殻そのものではない。殻を分泌する軟らかい膜である。また、タコは漏斗から水を吸い込むのではなく、外套膜のすき間から取り込んで漏斗から出す。")}`},
    {key:"dev",title:"発生",lv:"basic",html:`<p>旧口動物（前口動物）で<b>冠輪動物</b>に含まれる。多くはらせん卵割をおこない、トロコフォア幼生を経るものがある。${S("U6")}${S("P23")}</p>`},
    {key:"life",title:"生活",lv:"basic",html:`<p>海・淡水・陸に広く分布する。アサリはえらで水中の有機物をこしとり、カタツムリは歯舌で植物を削りとって食べる。${CHK}</p>`},
    {key:"diff",title:"ほかの門との違い",lv:"basic",html:`
      <table class="cmp"><tr><th></th><th>軟体動物</th><th>節足動物</th></tr>
      <tr><th>体を守るもの</th><td>外套膜が分泌する殻（ないものも）</td><td>キチン質の外骨格</td></tr>
      <tr><th>体節</th><td>ない</td><td>ある</td></tr><tr><th>成長</th><td>殻を大きくしていく</td><td>脱皮する</td></tr>
      <tr><th>系統</th><td>冠輪動物</td><td>脱皮動物</td></tr></table>`},
    {key:"terms",title:"重要な用語",lv:"basic",html:`<dl class="terms"><dt>外套膜</dt><dd>内臓塊を包み、殻を分泌する膜。</dd><dt>外套腔</dt><dd>外套膜と内臓の間のすき間。えらがある。</dd><dt>漏斗</dt><dd>頭足類で水を噴き出す管。</dd><dt>歯舌</dt><dd>やすり状の摂食器官。</dd></dl>`},
    {key:"adv",title:"発展 — 殻の変化",lv:"adv",html:`<p>オウムガイは外側に殻をもつが、イカでは殻は体内の甲に、タコではほとんど失われている。殻の有無は系統の遠近とは一致しない。${S("U6")}</p>`}
  ]
};

/* ===== 節足動物 ===== */
D.arthropoda = {
  species:{kabutomushi:sp("雑木林","昆虫類","側面から見た雄"),jorougumo:sp("林・庭","クモ類（鋏角類）",""),kurumaebi:sp("内湾の砂泥底","甲殻類",""),sawagani:sp("山地の渓流","甲殻類",""),tobizumukade:sp("森林の落ち葉の下","多足類","")},
  sections:[
    {key:"body",title:"体のつくり",lv:"basic",html:`
      <p>体はキチン質の<b>外骨格</b>に覆われ、関節で曲がる<b>関節肢</b>をもつ。体節がいくつかまとまって、頭部・胸部・腹部などの区分をつくる。${S("U6")}</p>
      <p>昆虫は頭部・胸部・腹部に分かれ、脚3対はすべて胸部にある。${S("U6")}</p>`},
    {key:"organ",title:"特徴的な器官 — 外骨格・気管",lv:"basic",html:`
      <p>外骨格は表皮が分泌したもので、筋肉はその内側に付く。成長するには古い外骨格を脱ぎ捨てる（<b>脱皮</b>）。${S("U6")}</p>
      <p>昆虫は体の側面の<b>気門</b>から体内に枝分かれする<b>気管</b>で呼吸し、酸素は主に気管で運ばれる。血管系は開放血管系。${S("U6")}</p>
      ${W("昆虫は肺で呼吸するのではない。また、クモやムカデは昆虫ではない。")}`},
    {key:"dev",title:"発生",lv:"basic",html:`<p>旧口動物（前口動物）で<b>脱皮動物</b>に含まれる。卵黄の多い卵では表割という卵割をおこなう。${S("P22")}${CHK}</p>`},
    {key:"life",title:"生活",lv:"basic",html:`<p>海・淡水・陸・空中に広がり、種数が非常に多い。エビ・カニはえらで、昆虫やムカデは気管で呼吸する。${S("U6")}</p>`},
    {key:"diff",title:"ほかの門との違い",lv:"basic",html:`
      <table class="cmp"><tr><th></th><th>昆虫類</th><th>クモ類</th><th>甲殻類</th><th>多足類</th></tr>
      <tr><th>体の区分</th><td>頭・胸・腹</td><td>頭胸部・腹部</td><td>頭胸部・腹部など</td><td>頭部と多数の胴節</td></tr>
      <tr><th>脚</th><td>3対</td><td>4対</td><td>多数（種類による）</td><td>多数</td></tr>
      <tr><th>触角</th><td>1対</td><td>なし</td><td>2対</td><td>1対</td></tr></table>
      <p class="muted small">体の区分と脚の数は一般的な特徴。${CHK}</p>
      <p>体節をもつ環形動物とは近縁ではない。${S("P22")}</p>`},
    {key:"terms",title:"重要な用語",lv:"basic",html:`<dl class="terms"><dt>外骨格</dt><dd>体の外側を覆う硬い骨格。</dd><dt>関節肢</dt><dd>関節で曲がる付属肢。</dd><dt>脱皮</dt><dd>古いクチクラを脱いで成長すること。</dd><dt>気管</dt><dd>気門から体内に伸びる呼吸のための管。</dd></dl>`},
    {key:"adv",title:"発展 — 昆虫と甲殻類",lv:"adv",html:`<p>昆虫は甲殻類の中から生じたとする見方（汎甲殻類）が近年有力とされる。${CHK}</p>`}
  ]
};

/* ===== 脊索動物 ===== */
D.chordata = {
  species:{namekujiuo:sp("浅い海の砂の中","頭索動物","側面から見た姿"),maboya:sp("浅い海の岩","尾索動物",""),medaka:sp("水田・小川","条鰭類",""),tonosamagaeru:sp("水田・池","両生類",""),nihontokage:sp("草地・石垣","爬虫類",""),kawarabato:sp("市街地","鳥類",""),hatsukanezumi:sp("人家の周辺","哺乳類","")},
  sections:[
    {key:"body",title:"体のつくり",lv:"basic",html:`
      <p>一生のどこかの時期に、<b>脊索</b>・背側の<b>神経管</b>・<b>咽頭裂（えら穴）</b>・<b>肛門より後ろの尾</b>をもつ。共通の特徴をいくつと数えるかは資料により異なる。${S("U6")}</p>
      <p>背中側から 神経管 → 脊索 → 消化管 の順に並ぶ。${S("U6")}</p>`},
    {key:"organ",title:"特徴的な器官 — 脊索",lv:"basic",html:`
      <p><b>脊索</b>は体を支える柔らかい棒状の構造。ナメクジウオは一生もち続けるが、脊椎動物では発生の途中で<b>脊椎（背骨）</b>に置き換わる。${S("U6")}</p>
      ${W("脊索は背骨（脊椎）と同じものではない。また、ホヤの成体には脊索がない（幼生にはある）。")}`},
    {key:"dev",title:"発生",lv:"basic",html:`<p><b>新口動物（後口動物）</b>：原口が肛門（またはその付近）になり、口は別にできる（典型）。ホヤの幼生はオタマジャクシ形で脊索・神経管・尾をもつが、固着して成体になると脊索・神経管・尾は消える。${S("U1")}${S("U6")}</p>`},
    {key:"life",title:"生活",lv:"basic",html:`<p>ナメクジウオは砂にもぐって水中の粒子をこしとり、ホヤは岩に固着して咽頭でこしとる。脊椎動物は水中から陸上まで広く暮らす。${CHK}</p>`},
    {key:"diff",title:"ほかの門との違い",lv:"basic",html:`
      <table class="cmp"><tr><th></th><th>頭索動物</th><th>尾索動物</th><th>脊椎動物</th></tr>
      <tr><th>例</th><td>ナメクジウオ</td><td>ホヤ</td><td>魚類〜哺乳類</td></tr>
      <tr><th>脊索</th><td>一生ある</td><td>幼生のみ</td><td>胚のみ（脊椎に置換）</td></tr>
      <tr><th>脊椎</th><td>ない</td><td>ない</td><td>ある</td></tr></table>
      ${W("ホヤやナメクジウオは脊索動物だが、脊椎動物ではない。")}`},
    {key:"terms",title:"重要な用語",lv:"basic",html:`<dl class="terms"><dt>脊索</dt><dd>体を支える柔らかい棒状の構造。</dd><dt>神経管</dt><dd>背側にできる管状の神経。脳と脊髄になる。</dd><dt>咽頭裂</dt><dd>のどの部分にある穴（えら穴）。</dd><dt>新口動物</dt><dd>原口が肛門になる動物（典型）。</dd></dl>`},
    {key:"adv",title:"発展 — ホヤは脊椎動物に近い",lv:"adv",html:`
      <p>分子系統では、尾索動物（ホヤ）が脊椎動物に最も近く、頭索動物（ナメクジウオ）はそれより早く分かれたとする見方が主流。${CHK}</p>
      <p>「魚類」は四肢動物を除いたまとまりなので単系統ではない。鳥類は爬虫類のワニ類に近い。${S("P41")}</p>`}
  ]
};
})();
