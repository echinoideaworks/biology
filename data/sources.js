/* 出典データ。IDは research/05_参考文献と出典.md と共通。
   conf: 本文確認 / 要旨のみ / 書誌のみ / 要確認 */
window.App = window.App || {};
App.data = App.data || {};
App.data.sources = {
  G1:{short:"文部科学省 2018（学習指導要領解説 理科編）",full:"文部科学省『高等学校学習指導要領（平成30年告示）解説 理科編 理数編』",url:"https://www.mext.go.jp/content/20250311-mxt_kyoiku02-100002620_05.pdf",conf:"本文確認（文字化けのため要目視確認）"},
  U1:{short:"遠藤 2019（高知大 講義資料）",full:"遠藤広光「動物系統学・無脊椎動物学」講義資料 metazoa01, 高知大学, 2019",url:"https://www.kochi-u.ac.jp/w3museum/Fish_Labo/Member/Endoh/Metazoa/20191021_metazoa01.pdf",conf:"本文確認"},
  U4:{short:"UC Berkeley: Trees, not ladders",full:"Understanding Evolution, UC Berkeley. Trees, not ladders",url:"https://evolution.berkeley.edu/evolution-101/the-history-of-life-looking-at-the-patterns/trees-not-ladders/",conf:"要旨のみ"},
  U6:{short:"OpenStax Biology 2e（2018）",full:"Clark MA, Douglas M, Choi J. Biology 2e. OpenStax, 2018（CC BY-NC-SA 4.0。図は転載していない）",url:"https://openstax.org/books/biology-2e/pages/28-7-superphylum-deuterostomia",conf:"本文確認"},
  U9:{short:"京大瀬戸臨海実験所 ヒトデ教材",full:"京都大学瀬戸臨海実験所 白浜水族館「ヒトデの体」2011",url:"https://www.seto.kyoto-u.ac.jp/shirahama_aqua/wp-content/uploads/2023/03/hitode-no-karada.pdf",conf:"要旨のみ"},
  P1:{short:"Whittaker 1969",full:"Whittaker RH (1969) New concepts of kingdoms of organisms. Science 163:150–160",url:"https://doi.org/10.1126/science.163.3863.150",conf:"書誌のみ"},
  P2:{short:"Woese & Fox 1977",full:"Woese CR, Fox GE (1977) Phylogenetic structure of the prokaryotic domain: the primary kingdoms. PNAS 74:5088–5090",url:"https://doi.org/10.1073/pnas.74.11.5088",conf:"要旨のみ"},
  P10:{short:"Adl et al. 2005",full:"Adl SM et al. (2005) The new higher level classification of eukaryotes with emphasis on the taxonomy of protists. J Eukaryot Microbiol 52:399–451",url:"https://doi.org/10.1111/j.1550-7408.2005.00053.x",conf:"要旨のみ"},
  P12:{short:"Adl et al. 2012",full:"Adl SM et al. (2012) The revised classification of eukaryotes. J Eukaryot Microbiol 59:429–493",url:"https://doi.org/10.1111/j.1550-7408.2012.00644.x",conf:"要旨のみ"},
  P3:{short:"Woese et al. 1990",full:"Woese CR, Kandler O, Wheelis ML (1990) Towards a natural system of organisms. PNAS 87:4576–4579",url:"https://doi.org/10.1073/pnas.87.12.4576",conf:"本文確認"},
  P13:{short:"Adl et al. 2019",full:"Adl SM et al. (2019) Revisions to the classification, nomenclature, and diversity of eukaryotes. J Eukaryot Microbiol 66:4–119",url:"https://doi.org/10.1111/jeu.12691",conf:"本文確認（一部）"},
  P14:{short:"Burki et al. 2020",full:"Burki F, Roger AJ, Brown MW, Simpson AGB (2020) The new tree of eukaryotes. Trends Ecol Evol 35:43–55",url:"https://doi.org/10.1016/j.tree.2019.08.008",conf:"要旨のみ"},
  P16:{short:"Williams et al. 2013",full:"Williams TA et al. (2013) An archaeal origin of eukaryotes supports only two primary domains of life. Nature 504:231–236",url:"https://doi.org/10.1038/nature12779",conf:"要旨のみ"},
  P20:{short:"Eme et al. 2023",full:"Eme L et al. (2023) Inference and reconstruction of the heimdallarchaeial ancestry of eukaryotes. Nature 618:992–999",url:"https://doi.org/10.1038/s41586-023-06186-2",conf:"要旨のみ"},
  P22:{short:"Aguinaldo et al. 1997",full:"Aguinaldo AMA et al. (1997) Evidence for a clade of nematodes, arthropods and other moulting animals. Nature 387:489–493",url:"https://doi.org/10.1038/387489a0",conf:"書誌のみ"},
  P23:{short:"Halanych 2004",full:"Halanych KM (2004) The new view of animal phylogeny. Annu Rev Ecol Evol Syst 35:229–256",url:"https://doi.org/10.1146/annurev.ecolsys.35.112202.130124",conf:"本文確認（一部）"},
  P29:{short:"Simion et al. 2017",full:"Simion P et al. (2017) A large and consistent phylogenomic dataset supports sponges as the sister group to all other animals. Curr Biol 27:958–967",url:"https://doi.org/10.1016/j.cub.2017.02.031",conf:"要旨のみ"},
  P30:{short:"Schultz et al. 2023",full:"Schultz DT et al. (2023) Ancient gene linkages support ctenophores as sister to other animals. Nature 618:110–117",url:"https://doi.org/10.1038/s41586-023-05936-6",conf:"書誌確認"},
  P32:{short:"Philippe et al. 2019",full:"Philippe H et al. (2019) Mitigating anticipated effects of systematic errors supports sister-group relationship between Xenacoelomorpha and Ambulacraria. Curr Biol 29:1818–1826",url:"https://doi.org/10.1016/j.cub.2019.04.009",conf:"書誌のみ"},
  P33:{short:"Kapli & Telford 2020",full:"Kapli P, Telford MJ (2020) Topology-dependent asymmetry in systematic errors affects phylogenetic placement of Ctenophora and Xenacoelomorpha. Sci Adv 6:eabc5162",url:"https://doi.org/10.1126/sciadv.abc5162",conf:"書誌のみ"},
  P36:{short:"Martín-Durán et al. 2016/2017",full:"Martín-Durán JM, Passamaneck YJ, Martindale MQ, Hejnol A. The developmental basis for the recurrent evolution of deuterostomy and protostomy. Nat Ecol Evol 1:0005",url:"https://doi.org/10.1038/s41559-016-0005",conf:"書誌確認"},
  P41:{short:"Gregory 2008",full:"Gregory TR (2008) Understanding evolutionary trees. Evolution: Education and Outreach 1:121–137",url:"https://doi.org/10.1007/s12052-008-0035-x",conf:"本文確認"},
  CHK:{short:"出典確認中",full:"この記述は一般的な動物学の知識に基づき、出典の照合が完了していません（research/07 で確認予定）",url:"",conf:"要確認"}
};
