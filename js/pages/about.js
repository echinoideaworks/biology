/* ===== P07 出典・凡例・この教材について ===== */
(function(){
const App = window.App;
App.pages.about = {
  mount(view){
    const S = App.data.sources;
    view.innerHTML = `
    <section class="page-head wrap">
      <p class="eyebrow">Sources &amp; Notes</p>
      <h1>出典と凡例</h1>
      <p class="lead">この教材の内容の根拠、図版の出どころ、採用した分類体系、まだ確認が終わっていない点をまとめた。</p>
    </section>
    <div class="wrap about">
      <section>
        <h2>表示の凡例</h2>
        <ul class="about-legend">
          <li><span class="badge b-basic">基本</span>高校「生物」（学習指導要領）で扱う範囲</li>
          <li><span class="badge b-adv">発展</span>大学レベル・最新研究。ヘッダーの「発展も」で表示</li>
          <li><span class="badge b-debate">議論中</span>研究上、決着していない。系統樹では点線・くし状（多分岐）で描く</li>
          <li><span class="badge b-check">確認中</span>出典の照合、または学名の確認が終わっていない</li>
          <li><span class="src">U6</span>出典番号。押すと書誌と確認度が出る</li>
        </ul>
        <p>系統樹の枝の長さには意味がない（クラドグラム）。左右・上下の並びにも意味はなく、分岐点で枝を回転させても関係は変わらない。</p>
      </section>
      <section>
        <h2>採用した分類体系</h2>
        <ul>
          <li>生物全体：3ドメイン説（学習指導要領での扱い）${App.srcLinks(["P3","G1"])}。真核生物が古細菌の内部から生じたとする2ドメイン説は「議論中」として注記${App.srcLinks(["P16","P20"])}。</li>
          <li>真核生物の内部：Burki et al. 2020 と Adl et al. 2019 ${App.srcLinks(["P14","P13"])}。かつての「エクスカバータ」は単系統でないとされるため、ディスコバ・メタモナダなどに分けた。</li>
          <li>動物：分子系統にもとづく3大系統（脱皮動物・冠輪動物・新口動物）${App.srcLinks(["P22","P23"])}。最初の分岐（海綿動物か有櫛動物か）は未解決として切り替え表示${App.srcLinks(["P29","P30","P33"])}。冠輪動物の内部は多分岐。</li>
          <li>脊索動物・脊椎動物の内部：research/07_追加調査.md で確認した分岐のみ使用。</li>
        </ul>
      </section>
      <section>
        <h2>図版について</h2>
        <p>生物の図版・解剖図・断面図は、すべてこの教材のために新しく描いたSVG（独自作図）。教科書や OpenStax Biology 2e（CC BY-NC-SA 4.0）の図は転載していない。形の参考にした資料は、各SVGファイル内のコメントと research/04 に記録している。</p>
        <p>図版は <code>assets/</code> フォルダの画像を差し替えるだけで交換できる。写真などを追加する場合は、パブリックドメインまたは CC BY のものに限り、作者・ライセンス・URLを記録すること。</p>
      </section>
      <section>
        <h2>まだ確認が終わっていない主な点</h2>
        <ol>
          <li><b>高校教科書（5社）の本文との照合が未実施。</b>用語（旧口／前口など）、ミミズの「心臓」の対数、脊索動物の共通特徴の数は、教科書に合わせて確定する必要がある。</li>
          <li>学習指導要領解説のPDFは文字化けのため文字対応から読み取った。原文の目視確認が必要。</li>
          <li>一部の学名（ミズクラゲ、ナメクジウオ、ニホントカゲなど）に異説があり、「学名確認中」と表示している。</li>
          <li>微生物の大きさの多くは二次資料の値で、一次資料での確認が必要。</li>
          <li>分類の歴史の図で、点線の枠の生物は、その体系での所属を出典で確定できていない。</li>
        </ol>
      </section>
      <section>
        <h2>出典一覧</h2>
        <table class="cmp src-table">
          <tr><th>番号</th><th>資料</th><th>確認度</th></tr>
          ${Object.entries(S).filter(([k]) => k !== "CHK").map(([k,s]) => `<tr><th>${k}</th><td>${App.esc(s.full)}${s.url?`<br><a href="${s.url}" target="_blank" rel="noopener">${App.esc(s.url)}</a>`:""}</td><td>${App.esc(s.conf)}</td></tr>`).join("")}
        </table>
        <p class="muted small">詳しい書誌・食い違いの記録は research/05_参考文献と出典.md、注意点は research/06_科学的な注意点.md。</p>
      </section>
    </div>`;
  }
};
})();
