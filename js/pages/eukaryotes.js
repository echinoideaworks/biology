/* ===== P06 真核生物のスーパーグループ図鑑 ===== */
(function(){
const App = window.App;

App.pages.eukaryotes = {
  mount(view, r){
    const E = App.data.eukaryotes;
    const G = E.groups;
    let gid = (r.params[0] && G.find(g => g.id === r.params[0])) ? r.params[0] : "discoba";
    let oid = null, hiPro = false;
    const grp = id => G.find(g => g.id === id);
    const confBadge = c => c === "二次" ? `<span class="badge b-check" title="大きさは二次資料による">二次資料</span>` : `<span class="badge b-check" title="大きさは未確認（記憶ベース）">確認中</span>`;

    /* 根のない地図（SVG） */
    const C = {x:320, y:260};
    const amor = {x:175, y:210};
    function mapSvg(){
      let s = `<svg class="eu-map-svg" viewBox="0 0 640 520" role="img" aria-label="真核生物のスーパーグループ（根のない図）">`;
      // 旧エクスカバータの点線の囲み
      s += `<ellipse class="eu-exc" cx="175" cy="445" rx="135" ry="58"/><text class="eu-exc-t" x="175" y="380" text-anchor="middle">かつての「エクスカバータ」（単系統でない）</text>`;
      // 枝：中心（未解決の多分岐）から各グループへ。アモルフェアは1本にまとまる
      s += `<path class="eu-br" d="M${C.x},${C.y} L${amor.x},${amor.y}"/>`;
      G.forEach(g => {
        const from = g.parent === "amorphea" ? amor : C;
        s += `<path class="eu-br${g.dashed?" dashed":""}" d="M${from.x},${from.y} L${g.x},${g.y}" data-g="${g.id}"/>`;
      });
      s += `<circle class="eu-center" cx="${C.x}" cy="${C.y}" r="9"/><text class="eu-center-t" x="${C.x}" y="${C.y+28}" text-anchor="middle">根の位置は未確定</text>`;
      s += `<circle class="eu-amor" cx="${amor.x}" cy="${amor.y}" r="5"/><text class="eu-amor-t" x="${amor.x+12}" y="${amor.y+18}">アモルフェア</text>`;
      G.forEach(g => {
        s += `<g class="eu-node${g.dashed?" dashed":""}" data-g="${g.id}" tabindex="0" role="button" aria-label="${g.ja}" style="--gc:var(${g.color})">
          <circle r="44" class="eu-hit"/><circle r="34" class="eu-disc"/>
          <image href="${App.org(g.orgs[0]).img}" x="-24" y="-24" width="48" height="48"/>
          <text y="56" text-anchor="middle" class="eu-name">${g.ja}</text>
        </g>`.replace('<g class', `<g transform="translate(${g.x},${g.y})" class`);
      });
      return s + `</svg>`;
    }

    view.innerHTML = `
    <section class="page-head wrap">
      <p class="eyebrow">Eukaryotic Supergroups</p>
      <h1>真核生物の図鑑 <span class="badge b-adv">発展</span></h1>
      <p class="lead">核をもつ生物（真核生物）の中の大きなまとまりを「スーパーグループ」と呼ぶ。動物や植物だけでなく、顕微鏡でしか見えない多様な生物がいる。グループを選ぶと、代表的な生物が顕微鏡の視野に現れる。</p>
      <p class="eu-adopt small">採用した体系：${E.adopted} ${App.srcLinks(["P13","P14"])}<br>
        <span class="muted">グループの数・構成・根の位置は研究によって変わり続けている暫定的な枠組み。三ドメイン説の「ドメイン」とは階層が違う（真核生物ドメインの中をさらに分けたもの）。</span></p>
    </section>

    <section class="eu-top wrap">
      <div class="eu-map lighttable">
        ${mapSvg()}
        <ul class="eu-legend small">
          <li><i class="lg-line"></i>枝の長さ・角度に意味はない</li>
          <li><i class="lg-dash"></i>点線：単系統か議論中</li>
        </ul>
      </div>
      <div class="eu-detail">
        <div class="eu-ghead" id="euGhead"></div>
        <div class="eu-scope lighttable" id="euScope"></div>
        <div id="euLabel"></div>
        <div class="eu-strip" id="euStrip" role="group" aria-label="このグループの生物"></div>
      </div>
    </section>

    <section class="wrap eu-tools">
      <label class="eu-switch"><input type="checkbox" id="euPro"><span>旧・原生生物界の生物をハイライト</span></label>
      <p class="muted small">五界説で「原生生物界」にまとめられることが多かった生物が、どれだけ多くのグループに散らばっているかが分かる。</p>
      <div class="eu-all" id="euAll"></div>
    </section>

    <section class="wrap eu-size">
      <h2>大きさを比べる</h2>
      <p class="muted small">基準の生物を選ぶと、ほかの生物が同じ縮尺で並ぶ。原核生物（約1 µm）と真核生物（10〜100 µm以上）は、大きさの桁が違う。</p>
      <input type="range" id="euRange" min="0" max="${E.sizes.length-1}" step="1" value="2" aria-label="基準にする生物">
      <div class="eu-size-names">${E.sizes.map((z,i) => `<button data-i="${i}">${App.org(z.id).ja}</button>`).join("")}</div>
      <div class="eu-size-row lighttable" id="euSizeRow"></div>
      <p class="small muted">大きさは代表値（二次資料）。放散虫は種により数十µm〜約2 mmと大きく違う <span class="badge b-check">確認中</span></p>
    </section>`;

    const svg = App.$(".eu-map-svg", view);
    App.$$("image", svg).forEach(im => im.addEventListener("error", () => im.remove()));

    function drawAll(){
      const all = [];
      G.forEach(g => g.orgs.forEach(id => all.push([g, id])));
      App.$("#euAll").innerHTML = all.map(([g,id]) => `<button class="eu-chip${hiPro && E.wasProtist.includes(id) ? " pro" : ""}" data-o="${id}" data-g="${g.id}" style="--gc:var(${g.color})">
        <span class="eu-chip-fig">${App.imgTag(id)}</span><span><b>${App.org(id).ja}</b><br><span class="muted small">${g.ja}</span></span></button>`).join("");
      App.$$(".eu-node", svg).forEach(n => {
        const g = grp(n.dataset.g);
        n.classList.toggle("pro", hiPro && g.orgs.some(id => E.wasProtist.includes(id)));
      });
    }

    function selectGroup(id, keepOrg){
      gid = id; const g = grp(id);
      App.$$(".eu-node", svg).forEach(n => n.classList.toggle("on", n.dataset.g === id));
      App.$$(".eu-br", svg).forEach(b => b.classList.toggle("on", b.dataset.g === id));
      App.$("#euGhead").innerHTML = `<p class="eyebrow">${g.en}${g.parent?"　／ アモルフェア":""}</p>
        <h2>${g.ja} ${g.dashed?'<span class="badge b-debate">単系統か議論中</span>':""}${g.excavate?'<span class="badge b-check">旧エクスカバータ</span>':""}</h2>
        <p>${g.note} ${App.srcLinks(["P13","P14"])}</p>${g.extra?`<p class="small"><a href="#/atlas">${g.extra}</a></p>`:""}`;
      App.$("#euStrip").innerHTML = g.orgs.map(o => `<button data-o="${o}" aria-pressed="false"><span class="eu-th">${App.imgTag(o)}</span><span>${App.org(o).ja}</span></button>`).join("");
      App.$$("#euStrip button").forEach(b => b.addEventListener("click", () => selectOrg(b.dataset.o)));
      selectOrg(keepOrg && g.orgs.includes(keepOrg) ? keepOrg : g.orgs[0]);
      history.replaceState(null, "", "#/eukaryotes/" + id);
    }

    function selectOrg(id){
      oid = id; const o = App.org(id), inf = E.info[id] || {}, g = grp(gid);
      App.$$("#euStrip button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.o === id)));
      App.$("#euScope").innerHTML = `<button class="eu-scope-btn" aria-label="${App.esc(o.ja)}の詳細">${App.imgTag(id)}</button>`;
      App.$(".eu-scope-btn").addEventListener("click", () => App.drawer.open(App.organismCard(id) + `<p class="small muted">グループ：${g.ja}（${g.en}）</p>`));
      App.$("#euLabel").innerHTML = `<div class="label">
        <h3 class="label-title">${App.esc(o.ja)}</h3>
        <div class="label-sub"><span class="sci">${App.esc(o.sci)}</span></div>
        <dl>
          <dt>グループ</dt><dd>${g.ja}</dd>
          <dt>大きさ</dt><dd>${inf.size||"—"} ${inf.conf?confBadge(inf.conf):""}</dd>
          <dt>見どころ</dt><dd>${inf.see||App.esc(o.line)}</dd>
        </dl></div>`;
    }

    function drawSize(i){
      const Z = E.sizes, ref = Z[i];
      const row = App.$("#euSizeRow");
      const max = Math.min(row.clientWidth * 0.42, 220);
      const k = max / ref.um;
      row.innerHTML = Z.map((z,j) => {
        const d = Math.max(2, z.um * k);
        const cap = max * 1.15, big = d > cap;
        return `<div class="eu-sz${j===i?" ref":""}"><div class="eu-sz-c${big?" big":""}" style="width:${Math.min(d, cap)}px;height:${Math.min(d, cap)}px">${d >= 26 && !big ? App.imgTag(z.id) : ""}</div>
          <span class="eu-sz-l"><b>${App.org(z.id).ja}</b><br>${z.label}${big?"<br>（この縮尺では収まらない：約" + Math.round(z.um/ref.um) + "倍）":""}${d<26?"<br>（点ほどの大きさ）":""}</span></div>`;
      }).join("");
      App.$$(".eu-size-names button").forEach(b => b.classList.toggle("on", +b.dataset.i === i));
    }

    App.$$(".eu-node", svg).forEach(n => {
      n.addEventListener("click", () => selectGroup(n.dataset.g));
      n.addEventListener("keydown", e => { if(e.key === "Enter") selectGroup(n.dataset.g); });
    });
    App.$("#euAll").addEventListener("click", e => {
      const b = e.target.closest("[data-o]"); if(!b) return;
      selectGroup(b.dataset.g, b.dataset.o);
      const top = App.$(".eu-top").getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({top, behavior: App.reduced() ? "auto" : "smooth"});
    });
    App.$("#euPro").addEventListener("change", e => { hiPro = e.target.checked; drawAll(); });
    const range = App.$("#euRange");
    range.addEventListener("input", () => drawSize(+range.value));
    App.$$(".eu-size-names button").forEach(b => b.addEventListener("click", () => { range.value = b.dataset.i; drawSize(+b.dataset.i); }));
    this._rs = () => drawSize(+range.value);
    window.addEventListener("resize", this._rs);

    drawAll();
    selectGroup(gid);
    drawSize(+range.value);
  },
  unmount(){ window.removeEventListener("resize", this._rs); }
};
})();
