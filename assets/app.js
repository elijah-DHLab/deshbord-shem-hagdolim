const DATA_PATHS = {
  sourceText: "data/source_text.txt",
  readme: "data/README.md",
  researchQuestions: "data/research_questions.md",
  reportEN: "data/reports/hida_bookshelf.md",
  reportHE: "data/reports/hida_bookshelf_accessible_HE.md",
  appendix: "data/reports/hida_bookshelf_appendix.md",
  dataDictionary: "data/graph/DATA_DICTIONARY.md",
  graphSummary: "data/graph/graph_summary.txt",
  nodeMetrics: "data/graph/node_metrics.csv",
  gexf: "data/graph/hagdolim_kg.gexf",
  graphLite: "data/optimized/graph_lite.json.gz",
  graphFull: "data/optimized/graph_full_correct.json.gz"
};

const BUILD_VERSION = (() => {
  if (typeof window !== "undefined" && window.__BUILD_VERSION__) {
    const raw = String(window.__BUILD_VERSION__).trim();
    if (raw && raw !== "__BUILD_VERSION__") return raw;
  }
  return "20261013-v11";
})();

function withBuildVersion(path) {
  if (typeof path !== "string") return path;
  if (/^https?:\/\//i.test(path)) return path;
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}v=${encodeURIComponent(BUILD_VERSION)}`;
}

const FIGURES = {
  F1: { file: "F1_bookshelf_map.png", en: "Global bookshelf topology; who is structurally central.", he: "טופולוגיית מדף הספרים: מי נמצא במרכז המבני." },
  F2: { file: "F2_role_typology.png", en: "Role typology (authority/compiler/balanced).", he: "טיפולוגיית תפקידים: סמכות/מלקט/מאוזן." },
  F3: { file: "F3_predicate_structural_backing.png", en: "How semantic predicates are backed by editorial structure.", he: "איך יחסים סמנטיים נתמכים במבנה העריכתי." },
  F4: { file: "F4_community_predicate_mix.png", en: "Communities and dominant relation types.", he: "קהילות וסוגי יחסים דומיננטיים." },
  F5: { file: "F5_silences.png", en: "High-attention entities missing standalone entries.", he: "ישויות בולטות ללא ערך עצמאי." },
  F6: { file: "F6_lineages.png", en: "Teacher lineages and transmission depth.", he: "שושלות רב-תלמיד ועומק ההעברה." },
  F7: { file: "F7_citation_modes.png", en: "Citation modes: person/text patterns.", he: "דפוסי ציטוט: אדם/טקסט." },
  F8: { file: "F8_book_derivation.png", en: "Book derivation genealogy.", he: "גנאולוגיה של נגזרות ספרים." },
  F9: { file: "F9_dispute_geometry.png", en: "Dispute geometry by communities.", he: "גיאומטריית מחלוקת לפי קהילות." },
  F10: { file: "F10_tacit_residual.png", en: "Tacit ties (A minus explicit C).", he: "קשרים סמויים (A פחות C מפורש)." },
  F11: { file: "F11_controversy_staging.png", en: "Where controversies are staged editorially.", he: "היכן מחלוקות נבנות עריכתית." },
  F12: { file: "F12_attention_residual.png", en: "Entry attention residuals.", he: "שאריות תשומת לב של ערכים." },
  F13: { file: "F13_soulroot.png", en: "Soul-root overlay network.", he: "רשת שכבת שורש נשמה." },
  F14: { file: "F14_motifs.png", en: "Network motifs of transmission/dispute/citation.", he: "מוטיבים ברשת: העברה/מחלוקת/ציטוט." },
  F15: { file: "F15_cocitation.png", en: "Co-citation families of texts.", he: "משפחות קו-ציטוט בין טקסטים." },
  F16: { file: "F16_self_position.png", en: "Author/family self-position in network.", he: "מיקום עצמי של המחבר/המשפחה ברשת." },
  F17: { file: "F17_eclipse.png", en: "Book eclipsing author signal.", he: "מקרים בהם הספר מאפיל על המחבר." },
  F18: { file: "F18_geography_map.png", en: "Geographic map of place relations.", he: "מפת יחסי מקומות." },
  F19: { file: "F19_place_roles.png", en: "Roles of places by predicate.", he: "תפקידי מקומות לפי predicate." },
  F20: { file: "F20_community_geography.png", en: "Communities projected onto geography.", he: "היטל קהילות על גיאוגרפיה." },
  F_entry: { file: "F_entry_centric.png", en: "Entry-centric vs ambient relation ratio.", he: "יחס בין יחסים ממוקדי-ערך לרקע." }
};

const I18N = {
  en: {
    tabs: {
      atlas: "Research Gateway",
      lenses: "Research Figures",
      reports: "Research & Method",
      data: "Index & Sources",
      networks: "Networks & Relations",
      person: "Entity Analysis",
      geo: "Places",
      validation: "Validation"
    },
    ui: {
      app_title: "Shem HaGdolim | The Living Index",
      app_subtitle: "Reports, methods, raw data, networks, personal analysis, geography",
      selected_entity: "Selected Entity:",
      graph_mode: "Graph Mode",
      copy_link: "Copy Share Link",
      copied: "Copied",
      info_title: "Info",
      close: "Close",
      reports_title: "Reports + Methods",
      reports_help: "Research reports, methods, and original figure explanations (F1-F20) with direct links to data and query workflows.",
      reports_choose: "Choose document:",
      goto_data: "Go To Data+Source",
      goto_networks: "Go To Networks",
      figures_title: "Original Figures Explained",
      data_title: "Raw Data + Source Text",
      data_help: "Search by value or name (not only ID), filter node types, and open direct source-text evidence.",
      search_node: "Search by name/value",
      node_kinds: "Node kinds",
      node_classes: "Node classes",
      communities: "Communities",
      raw_min_prominence: "Min prominence",
      export_csv: "Export CSV",
      search_source: "Search in source text",
      search: "Search",
      networks_title: "Networks + Slicing",
      networks_help: "This tab opens with a global network overview. Use layers/predicates/node-kinds plus analysis modes and then inspect edge analytics below.",
      global_network_title: "Global Network (Main Workspace)",
      global_network_help: "Start with the broad view. Communities are one dedicated mode; selecting it opens community controls.",
      seed_node: "Optional focus node: name or ID",
      layers: "Layers",
      predicates: "Predicates",
      source_kinds: "Source kinds",
      target_kinds: "Target kinds",
      community_split_count: "Communities to compute (K)",
      separate_communities: "Visually separate communities",
      layout_mode: "Layout",
      layout_force: "Force (organic)",
      layout_degree_rings: "Degree rings (20/20/core)",
      layout_bipartite: "Bipartite (books/people)",
      layout_community_clusters: "Community clusters",
      show_node_labels: "Show node names",
      show_edge_labels: "Show edge names",
      analysis_mode: "Analysis mode",
      color_kind: "Color by Kind",
      color_community: "Color by Community",
      color_network_communities: "Communities in Network",
      color_role: "Color by Role",
      color_degree: "Degree centrality",
      color_in_degree: "In-degree centrality",
      color_out_degree: "Out-degree centrality",
      color_weighted_degree: "Weighted degree",
      color_pagerank: "PageRank",
      color_clustering: "Clustering coefficient",
      metric_top_nodes: "Top nodes by metric",
      hops: "Hops",
      max_edges: "Max edges",
      build_global: "Build Global Network",
      maximize_graph: "Maximize Graph",
      minimize_graph: "Exit Fullscreen",
      download_png: "Download PNG",
      network_functions: "Network Functions (How to Use)",
      source_node: "Source: name or ID",
      target_node: "Target: name or ID",
      run_query: "Run Query",
      export_result: "Export Result CSV",
      person_title: "Personal Network Analysis",
      person_help: "Ego network, improved tradition tree, and Wikidata period/year enrichment.",
      person_input: "Choose person/entity",
      tradition_types: "Tradition types",
      forward: "Forward",
      backward: "Backward",
      both: "Both",
      layout_tree: "Tree layout",
      layout_radial: "Radial layout",
      depth: "Depth",
      fanout: "Max children per node",
      analyze_person: "Analyze Person",
      open_source: "Open Source Text",
      download_tree_png: "Download Tree PNG",
      ego_network: "Ego Network",
      tradition_tree: "Tradition Tree",
      tradition_explain_title: "What Tradition Tree Gives You",
      person_metrics: "Person Metrics",
      wikidata_title: "Wikidata Time/Period",
      geo_title: "Geography",
      geo_help: "Place relations map with optional network-on-map overlay between places. Overlay predicates are shown only when overlay is enabled; linked records panel is always available.",
      heat_radius: "Heat radius",
      overlay_map: "Overlay network on map",
      overlay_predicates: "Overlay predicates",
      geo_records_title: "Linked Records By Place",
      geo_records_help: "Choose a place on the map to inspect linked entities and source records.",
      linked_records: "Linked records",
      draw_map: "Draw Map",
      validation_title: "Validation",
      run_validation: "Run Validation",
      extra_visuals: "Extra Visualizations From Web Research"
    }
  },
  he: {
    tabs: {
      atlas: "שער המחקר",
      lenses: "מפות המחקר",
      reports: "מחקר ומתודה",
      data: "מפתח ומקורות",
      networks: "רשתות והקשרים",
      person: "ניתוח ישות",
      geo: "מקומות",
      validation: "ולידציה"
    },
    ui: {
      app_title: "שם הגדולים | מפתח חי",
      app_subtitle: "דוחות, שיטות, נתונים, רשתות, ניתוח אישי וגיאוגרפיה",
      selected_entity: "ישות נבחרת:",
      graph_mode: "מצב גרף",
      copy_link: "העתקת קישור",
      copied: "הועתק",
      info_title: "מידע",
      close: "סגירה",
      reports_title: "דוחות + שיטות",
      reports_help: "דוחות מחקר, שיטות, והסבר לגרפים המקוריים (F1-F20) עם קישור ישיר לנתונים ולתשאול.",
      reports_choose: "בחירת מסמך:",
      goto_data: "מעבר לנתונים+מקור",
      goto_networks: "מעבר לרשתות",
      figures_title: "הסבר גרפים מקוריים",
      data_title: "נתונים גולמיים + טקסט מקור",
      data_help: "חיפוש לפי שם/ערך (לא רק ID), סינון סוגי קודקודים ופתיחת הוכחת מקור ישירה.",
      search_node: "חפש לפי שם/ערך",
      node_kinds: "סוגי קודקודים",
      node_classes: "קטגוריות קודקוד",
      communities: "קהילות",
      raw_min_prominence: "סף בולטות מינימלי",
      export_csv: "ייצוא CSV",
      search_source: "חפש בטקסט המקור",
      search: "חיפוש",
      networks_title: "רשתות + חיתוכים",
      networks_help: "הלשונית הזו נפתחת עם מבט-על של רשת כללית. משתמשים בשכבות/סוגי קשר/סוגי קודקודים ומצבי ניתוח, ואז יורדים לניתוח קשתות.",
      global_network_title: "רשת כללית (מרחב עבודה ראשי)",
      global_network_help: "כאן רואים את התמונה הרחבה של הרשת. קהילות היא אפשרות ייעודית, ורק בבחירה שלה נפתחות בקרות קהילה.",
      seed_node: "ישות למיקוד (אופציונלי): שם או ID",
      layers: "שכבות",
      predicates: "סוגי קשר (predicates)",
      source_kinds: "סוגי מקור",
      target_kinds: "סוגי יעד",
      community_split_count: "מספר קהילות לחישוב (K)",
      separate_communities: "הפרדה ויזואלית בין קהילות",
      layout_mode: "פריסה",
      layout_force: "פריסת כוח (אורגנית)",
      layout_degree_rings: "טבעות דרגה (20/20/ליבה)",
      layout_bipartite: "דו-חלקי (ספרים/אנשים)",
      layout_community_clusters: "אשכולות קהילתיים",
      show_node_labels: "הצג שמות קודקודים",
      show_edge_labels: "הצג שמות קשתות",
      analysis_mode: "מצב ניתוח",
      color_kind: "צביעה לפי סוג",
      color_community: "צביעה לפי קהילה",
      color_network_communities: "קהילות ברשת",
      color_role: "צביעה לפי תפקיד",
      color_degree: "מרכזיות דרגה",
      color_in_degree: "מרכזיות דרגה נכנסת",
      color_out_degree: "מרכזיות דרגה יוצאת",
      color_weighted_degree: "דרגה משוקללת",
      color_pagerank: "PageRank",
      color_clustering: "מקדם צפיפות מקומי",
      metric_top_nodes: "צמתים מובילים לפי המדד",
      hops: "קפיצות",
      max_edges: "מקסימום קשתות",
      build_global: "בניית רשת כללית",
      maximize_graph: "מסך מלא לגרף",
      minimize_graph: "יציאה ממסך מלא",
      download_png: "הורדת PNG",
      network_functions: "פונקציות רשת (איך להשתמש)",
      source_node: "מקור: שם או ID",
      target_node: "יעד: שם או ID",
      run_query: "הרצת שאילתה",
      export_result: "ייצוא תוצאה ל-CSV",
      person_title: "רשתות וניתוח אישי",
      person_help: "רשת אגו, Tradition Tree משוכלל, והעשרה מ-Wikidata (שנים/תקופה).",
      person_input: "בחר דמות/ישות",
      tradition_types: "סוגי מסורת",
      forward: "קדימה",
      backward: "אחורה",
      both: "דו-כיווני",
      layout_tree: "פריסת עץ",
      layout_radial: "פריסה רדיאלית",
      depth: "עומק",
      fanout: "מס' ילדים מקסימלי",
      analyze_person: "ניתוח דמות",
      open_source: "פתיחת טקסט מקור",
      download_tree_png: "הורדת PNG של העץ",
      ego_network: "רשת אגו",
      tradition_tree: "עץ מסורות",
      tradition_explain_title: "מה נותן Tradition Tree",
      person_metrics: "מדדי דמות",
      wikidata_title: "Wikidata: שנים/תקופה",
      geo_title: "גיאוגרפיה",
      geo_help: "מפת קשרי מקומות עם אפשרות שכבת רשת-על-מפה. חלונית predicates לשכבת-על מוצגת רק כשה-Overlay פעיל; פאנל הרשומות המקושרות תמיד זמין.",
      heat_radius: "רדיוס חום",
      overlay_map: "הצג שכבת רשת על המפה",
      overlay_predicates: "Predicates לשכבת-על",
      geo_records_title: "רשומות מקושרות לפי מקום",
      geo_records_help: "בחר מקום במפה כדי לראות ישויות קשורות ורשומות מקור.",
      linked_records: "רשומות מקושרות",
      draw_map: "שרטוט מפה",
      validation_title: "ולידציה",
      run_validation: "הרצת ולידציה",
      extra_visuals: "ויזואליזציות נוספות ממחקר רשת"
    }
  }
};

const INFO_TEXTS = {
  dataMode: {
    en: { title: "Graph Mode", body: "Lite loads fast and is recommended for exploration. Full reads the source GEXF file and may be much heavier." },
    he: { title: "מצב גרף", body: "Lite נטען מהר ומתאים לעבודה שוטפת. Full טוען את קובץ ה-GEXF המלא ויכול להיות כבד משמעותית." }
  },
  buildNetwork: {
    en: { title: "Build Global Network", body: "Builds the graph from current filters: layers, predicates, node kinds, community settings, and layout." },
    he: { title: "בניית רשת כללית", body: "בונה את הרשת לפי המסננים הפעילים: שכבות, predicates, סוגי קודקודים, הגדרות קהילה ופריסה." }
  },
  networkLayoutPreset: {
    en: { title: "Layout", body: "Force = organic. Degree rings = top 20 degree nodes in outer ring, next 20 in middle ring, all others in center cluster. Bipartite separates books vs people even if same-kind edges still exist." },
    he: { title: "פריסה", body: "Force היא פריסה אורגנית. Degree rings: 20 קודקודים בדרגה הגבוהה ביותר במעגל חיצוני, 20 הבאים במעגל אמצעי, וכל השאר כאשכול מרכזי. Bipartite מחלק ספרים מול אנשים גם אם קיימות קשתות בתוך אותו סוג." }
  },
  networkColorBy: {
    en: { title: "Analysis Mode", body: "Controls node coloring: by kind, dynamic communities, role, or centrality metrics (degree, in/out, weighted degree, PageRank, clustering)." },
    he: { title: "מצב ניתוח", body: "קובע איך לצבוע קודקודים: לפי סוג, קהילות דינמיות, תפקיד, או מדדי מרכזיות (דרגה, in/out, דרגה משוקללת, PageRank, clustering)." }
  },
  networkCommunityCount: {
    en: { title: "Community Algorithm", body: "Communities are computed with a Louvain modularity optimization flow (multi-level clustering). K is used as a target count for final grouping after Louvain, so all in-scope data is still partitioned before display filtering." },
    he: { title: "אלגוריתם קהילות", body: "הקהילות מחושבות באמצעות Louvain (אופטימיזציית modularity רב-שלבית). K משמש כמספר יעד לקיבוץ הסופי אחרי Louvain, כך שכל הדאטה בתחום מתחלק קודם לקהילות לפני סינון תצוגה." }
  },
  runEdgeQuery: {
    en: { title: "Run Query", body: "Queries edges by layer, predicate, source/target kinds, and optional source/target entity. Results feed table, heatmap, and flow Sankey." },
    he: { title: "הרצת שאילתה", body: "מבצע סינון קשתות לפי שכבה, predicate, סוגי מקור/יעד וישות מקור/יעד אופציונלית. התוצאה מזינה טבלה, heatmap ו-Sankey." }
  },
  analyzePerson: {
    en: { title: "Analyze Person", body: "Builds ego network + tradition tree and enriches with Wikidata period/year candidates." },
    he: { title: "ניתוח אישי", body: "בונה רשת אגו ועץ מסורות, ומעשיר במועמדי שנים/תקופה מ-Wikidata." }
  },
  drawGeo: {
    en: { title: "Draw Map", body: "Draws place network intensity on map and optional network overlay between related places." },
    he: { title: "שרטוט מפה", body: "מציג עוצמת קשרי מקום על מפה ואפשרות שכבת-על של קישורים בין מקומות קשורים." }
  },
  runValidation: {
    en: { title: "Validation", body: "Runs integrity checks on reports, source files, graph artifacts, and figure reachability." },
    he: { title: "ולידציה", body: "מריץ בדיקות תקינות על דוחות, קבצי מקור, ארטיפקטים של גרף וזמינות איורים." }
  },
  reportSelect: {
    en: { title: "Document Selector", body: "Switches between README, research questions, reports, appendix, and graph dictionary/summary." },
    he: { title: "בחירת מסמך", body: "מעביר בין README, שאלות מחקר, דוחות, נספח, ומילון/סיכום גרף." }
  },
  figureSelect: {
    en: { title: "Figure Explorer", body: "Displays one of the original figures (F1-F20 and entry-centric figure) with research explanation text." },
    he: { title: "סייר איורים", body: "מציג איור מקורי (F1-F20 וגם גרף entry-centric) יחד עם הסבר מחקרי." }
  },
  nodeSearch: {
    en: { title: "Node Search", body: "Searches entities by label or ID across the raw-node table." },
    he: { title: "חיפוש קודקוד", body: "מחפש ישויות לפי תווית או ID בטבלת הקודקודים הגולמיים." }
  },
  exportNodes: {
    en: { title: "Export Nodes CSV", body: "Exports the currently filtered node table to CSV." },
    he: { title: "ייצוא קודקודים", body: "מייצא ל-CSV את טבלת הקודקודים לאחר הסינון הנוכחי." }
  },
  runSourceSearch: {
    en: { title: "Source Search", body: "Searches the source text and opens a contextual snippet around selected hit lines." },
    he: { title: "חיפוש מקור", body: "מחפש בטקסט המקור ומציג קטע הקשר סביב שורות תוצאה נבחרות." }
  },
  networkHops: {
    en: { title: "Hops", body: "Controls neighborhood depth from focus node when focus is set in global mode." },
    he: { title: "קפיצות", body: "קובע עומק שכנות מהישות הממוקדת כשמוגדר מיקוד במצב גלובלי." }
  },
  networkMaxEdges: {
    en: { title: "Max Edges", body: "Limits rendered edges to reduce visual and runtime load." },
    he: { title: "מקסימום קשתות", body: "מגביל את מספר הקשתות המוצגות כדי להפחית עומס חישובי וחזותי." }
  },
  personTreePredicate: {
    en: { title: "Tradition Types", body: "Chooses which relation predicates build the tradition tree." },
    he: { title: "סוגי מסורת", body: "בוחר אילו predicates של קשרים ישמשו לבניית עץ המסורות." }
  },
  personTreeLayout: {
    en: { title: "Tree Layout", body: "Tree layout favors lineage reading; radial layout emphasizes branching shape." },
    he: { title: "פריסת עץ", body: "פריסת עץ מתאימה לקריאת שושלת; פריסה רדיאלית מדגישה את צורת ההסתעפות." }
  },
  personTreeDepth: {
    en: { title: "Tree Depth", body: "Maximum generations/levels traversed from selected entity." },
    he: { title: "עומק עץ", body: "מספר הדורות/הרמות המקסימלי לסריקה מהישות הנבחרת." }
  },
  personTreeFanout: {
    en: { title: "Fanout", body: "Limits children kept per node to control noise in dense areas." },
    he: { title: "רוחב הסתעפות", body: "מגביל מספר ילדים לכל צומת כדי לשלוט ברעש באזורים צפופים." }
  },
  heatRadius: {
    en: { title: "Heat Radius", body: "Adjusts spread of geographic density heatmap." },
    he: { title: "רדיוס חום", body: "שולט בהתרחבות מפת החום של צפיפות גיאוגרפית." }
  },
  geoNetworkOverlay: {
    en: { title: "Network Overlay", body: "Draws links between places that are co-related by entities in the semantic graph." },
    he: { title: "שכבת רשת על מפה", body: "מצייר קישורים בין מקומות המקושרים יחד דרך ישויות בגרף הסמנטי." }
  },
  geoOverlayPredicate: {
    en: { title: "Overlay Predicates", body: "Shown only when map-overlay is enabled. These predicates control which place-to-place overlay connections are drawn." },
    he: { title: "Predicates לשכבת-על", body: "מוצג רק כשה-Overlay פעיל. ערכים אלו קובעים אילו חיבורי מקום-למקום יוצגו בשכבת העל." }
  },
  saveState: {
    en: { title: "Share Link", body: "Copies current tab/language/entity state into a URL for quick sharing." },
    he: { title: "קישור שיתוף", body: "מעתיק URL עם מצב נוכחי של לשונית/שפה/ישות לשיתוף מהיר." }
  },
  toggleNodeLabels: {
    en: { title: "Node Labels", body: "Shows or hides node names on all network views to balance readability vs clutter." },
    he: { title: "תוויות קודקודים", body: "מציג או מסתיר שמות קודקודים בכל התצוגות כדי לאזן בין קריאות לעומס." }
  },
  toggleEdgeLabels: {
    en: { title: "Edge Labels", body: "Shows or hides edge predicate labels. This can be visually dense on large graphs." },
    he: { title: "תוויות קשתות", body: "מציג או מסתיר תוויות predicates לקשתות. בגרפים גדולים זה עשוי להיות צפוף." }
  }
};

const APP = {
  lang: "he",
  activeTab: "atlas",
  docs: {},
  sourceText: "",
  sourceLines: [],
  sourceLoadingPromise: null,
  nodes: [],
  nodeById: new Map(),
  normLabelToIds: new Map(),
  filteredNodes: [],
  gLoaded: false,
  gMode: "",
  gNodes: [],
  gEdges: [],
  gNodeById: new Map(),
  edgePredicates: [],
  edgeLayers: [],
  currentEdgeResult: [],
  selectedNodeId: "",
  activeEdgePredicateTags: new Set(),
  showNodeLabels: true,
  showEdgeLabels: false,
  graphDefaultsApplied: false,
  networkCommunityFilterReady: false,
  syncingCommunityFilter: false,
  cyGlobal: null,
  cyEgo: null,
  cyTree: null,
  map: null,
  mapMarkers: null,
  mapHeat: null,
  mapOverlay: null,
  wikidataCache: new Map(),
  graphPromises: new Map(),
  reportPromise: null
};

function missingRequiredDomIds() {
  const required = [
    "tabs", "langToggle", "saveState", "reportSelect", "figureSelect", "figurePreview", "figureExplanation",
    "nodeSearch", "kindFilter", "fourWayFilter", "communityFilter", "nodeTableWrap",
    "network", "seedNode", "networkLayerFilter", "networkPredicateFilter", "networkCommunityControls", "networkCommunityFilter", "networkCommunityCount", "networkSeparateCommunities", "buildNetwork",
    "personInput", "analyzePerson", "treeNetwork", "wikidataBox",
    "geoMap", "drawGeo", "runValidation", "toggleNodeLabels", "toggleEdgeLabels"
  ];
  return required.filter(id => !document.getElementById(id));
}

function handleMismatchedHtml() {
  const missing = missingRequiredDomIds();
  if (!missing.length) return false;

  // If the app was opened from workspace root, jump to canonical dashboard path.
  if (!location.pathname.includes("deshbord-shem hagdolim")) {
    location.replace(`/deshbord-shem%20hagdolim/index.html?ts=${Date.now()}`);
    return true;
  }

  const msg = `Dashboard HTML mismatch. Missing IDs: ${missing.slice(0, 8).join(", ")}${missing.length > 8 ? "..." : ""}`;
  console.error(msg);
  const box = document.createElement("div");
  box.style.cssText = "position:fixed;top:10px;left:10px;right:10px;z-index:99999;background:#fff3cd;color:#5f4500;border:1px solid #ead28a;padding:10px;border-radius:8px;font:14px/1.4 sans-serif";
  box.textContent = msg;
  document.body.appendChild(box);
  return true;
}

function t(k) {
  return I18N[APP.lang]?.ui?.[k] || k;
}

function esc(s) {
  return String(s ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function num(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/["'`\[\](){}:;,.!?\\/\-|_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function labelOf(node) {
  return node?.label || node?.id || "";
}

function kindOf(node) {
  return node?.kind || "unknown";
}

const KIND_HE = {
  person: "אדם",
  book: "ספר",
  place: "מקום",
  unknown: "לא ידוע"
};

const PREDICATE_HE = {
  teacherOf: "רב של",
  soulRootOf: "שורש נשמה של",
  commentaryOn: "פירוש על",
  authored: "חיבר",
  cites: "מצטט",
  citedBy: "מצוטט על ידי",
  disputes: "חולק על",
  mentionedIn: "מוזכר ב",
  bornIn: "נולד ב",
  diedIn: "נפטר ב",
  livedIn: "חי ב"
};

const LAYER_HE = {
  A: "שכבה A",
  B: "שכבה B",
  C: "שכבה C",
  place: "שכבת מקום",
  text: "שכבת טקסט",
  person: "שכבת אנשים"
};

function humanizeToken(v) {
  return String(v ?? "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function localizeKind(v) {
  const raw = String(v ?? "");
  if (APP.lang !== "he") return raw;
  const he = KIND_HE[raw] || `סוג ${raw}`;
  return he === raw ? he : `${he} (${raw})`;
}

function localizePredicate(v) {
  const raw = String(v ?? "");
  if (APP.lang !== "he") return raw;
  const he = PREDICATE_HE[raw] || humanizeToken(raw);
  return he === raw ? he : `${he} (${raw})`;
}

function localizeLayer(v) {
  const raw = String(v ?? "");
  if (APP.lang !== "he") return raw;
  const he = LAYER_HE[raw] || `שכבה ${humanizeToken(raw)}`;
  return he === raw ? he : `${he} (${raw})`;
}

function localizeCommunity(v) {
  const raw = String(v ?? "");
  if (APP.lang !== "he") return `Community ${raw}`;
  return `קהילה ${raw}`;
}

function selValues(id) {
  return Array.from(document.getElementById(id).selectedOptions).map(o => o.value);
}

function isAllSelected(id) {
  const el = document.getElementById(id);
  return el.selectedOptions.length === el.options.length;
}

function setMultiOptions(id, values, selectedValues = [], labelFormatter = null) {
  const chosen = new Set(selectedValues);
  const el = document.getElementById(id);
  el.innerHTML = values.map(v => {
    const label = labelFormatter ? labelFormatter(v) : String(v);
    const selected = chosen.size === 0 || chosen.has(String(v));
    return `<option value="${esc(v)}" ${selected ? "selected" : ""}>${esc(label)}</option>`;
  }).join("");
}

function setMultiSelection(id, values) {
  const wanted = new Set(values.map(v => String(v)));
  const el = document.getElementById(id);
  if (!el) return;
  Array.from(el.options).forEach(opt => {
    opt.selected = wanted.has(String(opt.value));
  });
}

function currentSelection(id) {
  return Array.from(document.getElementById(id)?.selectedOptions || []).map(o => String(o.value));
}

function chooseDefaultSubset(allValues, preferred) {
  const allSet = new Set(allValues.map(v => String(v)));
  const picked = preferred.filter(v => allSet.has(String(v)));
  return picked.length ? picked : allValues;
}

function defaultLayerValues(values) {
  const preferred = ["semantic", "structure"];
  return chooseDefaultSubset(values, preferred);
}

function defaultKindValues(values) {
  const preferred = ["book", "person"];
  return chooseDefaultSubset(values, preferred);
}

function showInfoModal(key) {
  const data = INFO_TEXTS[key]?.[APP.lang] || INFO_TEXTS[key]?.en;
  if (!data) return;
  const modal = document.getElementById("infoModal");
  const title = document.getElementById("infoModalTitle");
  const body = document.getElementById("infoModalBody");
  if (!modal || !title || !body) return;
  title.textContent = data.title;
  body.textContent = data.body;
  modal.classList.remove("hidden");
}

function hideInfoModal() {
  document.getElementById("infoModal")?.classList.add("hidden");
}

function addInfoButtonNearControl(controlId, infoKey) {
  const target = document.getElementById(controlId);
  if (!target || !target.parentNode) return;

  const existing = target.parentNode.querySelector(`.info-btn[data-info-key="${infoKey}"]`);
  if (existing) return;

  const b = document.createElement("button");
  b.type = "button";
  b.className = "info-btn";
  b.textContent = "I";
  b.setAttribute("aria-label", APP.lang === "he" ? "מידע" : "Information");
  b.dataset.infoKey = infoKey;
  b.onclick = () => showInfoModal(infoKey);
  target.insertAdjacentElement("afterend", b);
}

function attachInfoButtons() {
  const map = [
    ["dataMode", "dataMode"],
    ["saveState", "saveState"],
    ["reportSelect", "reportSelect"],
    ["figureSelect", "figureSelect"],
    ["nodeSearch", "nodeSearch"],
    ["exportNodes", "exportNodes"],
    ["runSourceSearch", "runSourceSearch"],
    ["buildNetwork", "buildNetwork"],
    ["networkLayoutPreset", "networkLayoutPreset"],
    ["networkColorBy", "networkColorBy"],
    ["networkCommunityCount", "networkCommunityCount"],
    ["networkHops", "networkHops"],
    ["networkMaxEdges", "networkMaxEdges"],
    ["runEdgeQuery", "runEdgeQuery"],
    ["personTreePredicate", "personTreePredicate"],
    ["personTreeLayout", "personTreeLayout"],
    ["personTreeDepth", "personTreeDepth"],
    ["personTreeFanout", "personTreeFanout"],
    ["analyzePerson", "analyzePerson"],
    ["heatRadius", "heatRadius"],
    ["geoNetworkOverlay", "geoNetworkOverlay"],
    ["geoOverlayPredicate", "geoOverlayPredicate"],
    ["drawGeo", "drawGeo"],
    ["runValidation", "runValidation"],
    ["toggleNodeLabels", "toggleNodeLabels"],
    ["toggleEdgeLabels", "toggleEdgeLabels"]
  ];
  map.forEach(([controlId, infoKey]) => addInfoButtonNearControl(controlId, infoKey));
}

function localizeSingleSelectOptions(selectId, formatter) {
  const el = document.getElementById(selectId);
  if (!el) return;
  Array.from(el.options).forEach(opt => {
    opt.textContent = formatter(opt.value);
  });
}

function relabelFilterOptions() {
  ["kindFilter", "sourceKindFilter", "targetKindFilter", "networkNodeKindFilter"].forEach(id => {
    localizeSingleSelectOptions(id, localizeKind);
  });
  ["predicateFilter", "networkPredicateFilter", "geoPredicateFilter", "geoOverlayPredicate", "personTreePredicate"].forEach(id => {
    localizeSingleSelectOptions(id, localizePredicate);
  });
  ["layerFilter", "networkLayerFilter"].forEach(id => {
    localizeSingleSelectOptions(id, localizeLayer);
  });
  ["communityFilter", "networkCommunityFilter"].forEach(id => {
    localizeSingleSelectOptions(id, localizeCommunity);
  });
}

function isCommunityMode(mode) {
  return mode === "network_communities" || mode === "community";
}

function isCommunityLayoutPreset() {
  return (document.getElementById("networkLayoutPreset")?.value || "force") === "community_clusters";
}

function updateCommunityControlsVisibility() {
  const mode = document.getElementById("networkColorBy")?.value || "kind";
  const box = document.getElementById("networkCommunityControls");
  if (!box) return;
  const shouldShow = isCommunityMode(mode) && isCommunityLayoutPreset();
  box.classList.toggle("hidden", !shouldShow);
}

function setNetworkFullscreenButtonLabel() {
  const btn = document.getElementById("toggleNetworkFullscreen");
  if (!btn) return;
  const full = !!document.fullscreenElement;
  btn.textContent = full ? t("minimize_graph") : t("maximize_graph");
}

async function getText(path) {
  const r = await fetch(withBuildVersion(path));
  if (!r.ok) throw new Error(`${path} HTTP ${r.status}`);
  if (path.endsWith(".gz")) {
    const bytes = new Uint8Array(await r.arrayBuffer());
    // Some hosts transparently decompress Content-Encoding. Detect the magic bytes.
    if (bytes[0] !== 0x1f || bytes[1] !== 0x8b) return new TextDecoder().decode(bytes);
    if (typeof DecompressionStream === "undefined") throw new Error("A modern browser with gzip support is required");
    return await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"))).text();
  }
  return r.text();
}

async function ensureSourceTextLoaded() {
  if (APP.sourceText) return;
  if (!APP.sourceLoadingPromise) {
    APP.sourceLoadingPromise = (async () => {
      const txt = await getText(DATA_PATHS.sourceText);
      APP.sourceText = txt;
      APP.sourceLines = txt.split(/\r?\n/);
    })().finally(() => {
      APP.sourceLoadingPromise = null;
    });
  }
  await APP.sourceLoadingPromise;
}

function parseCsv(text) {
  const rows = [];
  let i = 0, f = "", row = [], q = false;
  while (i < text.length) {
    const c = text[i];
    if (q) {
      if (c === '"') {
        if (text[i + 1] === '"') { f += '"'; i++; } else { q = false; }
      } else f += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(f); f = ""; }
    else if (c === '\n') { row.push(f); rows.push(row); row = []; f = ""; }
    else if (c !== '\r') f += c;
    i++;
  }
  if (f.length || row.length) { row.push(f); rows.push(row); }
  const head = rows.shift() || [];
  return rows.filter(r => r.some(x => x !== "")).map(r => {
    const o = {};
    head.forEach((h, ix) => o[h] = r[ix] ?? "");
    return o;
  });
}

function csvFromObjects(arr) {
  if (!arr.length) return "";
  const cols = Object.keys(arr[0]);
  const e = (v) => {
    const s = String(v ?? "");
    return (s.includes(',') || s.includes('"') || s.includes('\n')) ? `"${s.replaceAll('"','""')}"` : s;
  };
  return [cols.join(','), ...arr.map(o => cols.map(c => e(o[c])).join(','))].join('\n');
}

function download(name, text, mime = "text/plain;charset=utf-8") {
  const u = URL.createObjectURL(new Blob([text], { type: mime }));
  const a = document.createElement("a");
  a.href = u;
  a.download = name;
  a.click();
  URL.revokeObjectURL(u);
}

function downloadCyPng(cy, name) {
  if (!cy) return;
  const a = document.createElement("a");
  a.href = cy.png({ full: true, bg: "#ffffff", scale: 2 });
  a.download = name;
  a.click();
}

function setStatus() {
  const el = document.getElementById("selectedEntityLabel");
  if (APP.selectedNodeId) {
    const n = APP.nodeById.get(APP.selectedNodeId) || APP.gNodeById.get(APP.selectedNodeId);
    el.textContent = n ? `${labelOf(n)} (${APP.selectedNodeId})` : APP.selectedNodeId;
  } else {
    el.textContent = "-";
  }
}

function setSelectedNode(id) {
  APP.selectedNodeId = id || "";
  setStatus();
  document.dispatchEvent(new CustomEvent("research:entity",{detail:{id:APP.selectedNodeId}}));
  if (window.AtlasResearch) window.AtlasResearch.selected(APP.selectedNodeId);
  if(window.livingIndexContext) window.livingIndexContext();
}

function buildTabs() {
  const tabs = document.getElementById("tabs");
  const labels = I18N[APP.lang].tabs;
  tabs.innerHTML = "";
  Object.entries(labels).sort(([a],[b]) => ({atlas:0,lenses:1,data:2,networks:3,person:4,geo:5,reports:6,validation:7}[a] ?? 50)-({atlas:0,lenses:1,data:2,networks:3,person:4,geo:5,reports:6,validation:7}[b] ?? 50)).forEach(([k, txt]) => {
    const b = document.createElement("button");
    b.className = `tab-btn ${APP.activeTab === k ? "active" : ""}`;
    b.textContent = txt;
    b.onclick = () => activateTab(k);
    tabs.appendChild(b);
  });
}

function activateTab(tab) {
  APP.activeTab = tab;
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
  const panel = document.getElementById(`tab-${tab}`);
  if (panel) panel.classList.add("active");
  buildTabs();
  if (tab === "lenses") window.AtlasResearch?.activate?.();
  if (tab === "reports") ensureReportDocsLoaded().catch(err => console.error(err));
  if (tab === "data" && !APP.rawNodesRendered) { APP.rawNodesRendered=true;filterRawNodes(); }
  if (tab === "geo") {
    setTimeout(() => {
      if (APP.map) {
        APP.map.invalidateSize(true);
        if (APP.mapMarkers?.getLayers().length) {
          const bounds = L.latLngBounds(APP.mapMarkers.getLayers().map(layer => [layer.getLatLng().lat, layer.getLatLng().lng]));
          if (bounds.isValid()) APP.map.fitBounds(bounds.pad(0.2));
        }
      } else {
        drawGeo().catch(() => {});
      }
    }, 120);
  }
}

function applyLanguage() {
  document.documentElement.lang = APP.lang === "he" ? "he" : "en";
  document.documentElement.dir = APP.lang === "he" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    if (val) el.textContent = val;
  });

  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    const val = t(key);
    if (val) el.setAttribute("placeholder", val);
  });

  document.getElementById("langToggle").textContent = APP.lang === "he" ? "English" : "עברית";
  if (!document.getElementById("saveState").dataset.stateCopied) {
    document.getElementById("saveState").textContent = t("copy_link");
  }
  document.querySelectorAll(".info-btn").forEach(btn => {
    btn.setAttribute("aria-label", APP.lang === "he" ? "מידע" : "Information");
  });

  relabelFilterOptions();
  updateCommunityControlsVisibility();
  setNetworkFullscreenButtonLabel();
  applyLabelVisibilityToAllGraphs();

  buildTabs();
  if (window.AtlasResearch) window.AtlasResearch.localize(APP.lang);
  if(window.livingIndexContext) window.livingIndexContext();
  if (document.getElementById("figureSelect")?.options.length) renderFigurePreview();
  renderNetworkFunctionsHelp();
  renderTraditionExplain();
  setExtraFeaturesFromResearch();
}

function roleOf(n) {
  const cin = num(n?.c_in_wdeg);
  const cout = num(n?.c_out_wdeg);
  const sum = cin + cout;
  if (sum < 8) return "peripheral";
  const r = (cin - cout) / (sum + 1);
  if (r >= 0.2) return "authority";
  if (r <= -0.2) return "compiler";
  return "balanced";
}

function colorByCommunity(c) {
  const p = ["#247a83", "#247a83", "#94d2bd", "#ee9b00", "#ca6702", "#ac653e", "#9b2226", "#6c757d"];
  return p[Math.abs(num(c)) % p.length];
}

function buildNormIndex() {
  APP.normLabelToIds = new Map();
  APP.nodes.forEach(n => {
    const key = norm(n.label);
    if (!key) return;
    if (!APP.normLabelToIds.has(key)) APP.normLabelToIds.set(key, []);
    APP.normLabelToIds.get(key).push(n.id);
  });
}

function resolveInputToId(v) {
  const raw = String(v || "").trim();
  if (!raw) return "";
  if (APP.nodeById.has(raw) || APP.gNodeById.has(raw)) return raw;
  const nrm = norm(raw);
  if (APP.normLabelToIds.has(nrm)) return APP.normLabelToIds.get(nrm)[0];
  const f = APP.nodes.find(n => norm(n.label).includes(nrm));
  return f ? f.id : "";
}

function nodeById(id) {
  return APP.gNodeById.get(id) || APP.nodeById.get(id) || null;
}

function jumpToSourceByNodeId(id) {
  const n = nodeById(id);
  if (!n) return;
  setSelectedNode(id);
  document.getElementById("sourceSearch").value = labelOf(n);
  activateTab("data");
  runSourceSearch();
}

function renderNetworkFunctionsHelp() {
  const rows = APP.lang === "he"
    ? [
        "מבט-על כברירת מחדל: אין חובה לבחור אדם או ישות כדי לבנות רשת כללית.",
        "מיקוד אופציונלי: אם מזינים ישות, היא תסומן ותעזור בהתמצאות בלבד.",
        "Layers/Predicates: חיתוך סמנטי מדויק של סוגי הקשרים.",
        "Node Kinds: בקרה האם להציג אנשים, ספרים, מקומות או שילוב.",
        "Layout: Force (אורגני), Degree Rings (20/20/ליבה), Bipartite (ספרים מול אנשים), Community Clusters.",
        "מצב ניתוח: קהילה היא אפשרות אחת לצד מדדי רשת (Degree, In/Out Degree, Weighted Degree, PageRank, Clustering).",
        "במצב 'קהילות ברשת', K מגדיר לכמה קהילות לחלק את כל הדאטה הנוכחי; אחר כך ניתן לבחור אילו קהילות להציג.",
        "Hops + Max edges: איזון בין עומק מחקר לבין עומס ויזואלי.",
        "תגיות predicates מעל טבלת הקשתות הן אינטראקטיביות: לחיצה מפעילה/מכבה חיתוך מיידי."
      ]
    : [
        "Global overview is the default: no person/entity input is required.",
        "Optional focus: if provided, the entity is highlighted for orientation.",
        "Layers/Predicates: semantic slicing over relation families.",
        "Node Kinds: include people, books, places, or any mix.",
        "Layout: Force (organic), Degree Rings (20/20/core), Bipartite (books vs people), Community Clusters.",
        "Analysis mode: communities are one option among network metrics (degree, in/out degree, weighted degree, PageRank, clustering).",
        "In 'Communities in Network', K controls how many communities are computed for all current data before display filtering.",
        "Hops + Max edges: tune depth versus visual load.",
        "Predicate tags above edge results are active filters; click to toggle live slicing."
      ];
  document.getElementById("networkFunctions").innerHTML = rows.map(x => `<li>${esc(x)}</li>`).join("");
}

function renderTraditionExplain() {
  const html = APP.lang === "he"
    ? `<p><strong>Tradition Tree</strong> מדגיש שרשראות העברה (למשל רב-תלמיד, פירוש, חיבור) סביב דמות נבחרת.</p>
       <ul>
         <li>עומק מראה כמה דורות/שכבות אפשר לעקוב.</li>
         <li>Fanout שולט ברעש: בכל צומת נשמרים רק הענפים החזקים יותר.</li>
         <li>כיוון מאפשר לעקוב קדימה, אחורה, או דו-כיווני.</li>
         <li>פריסה רדיאלית טובה לזיהוי הסתעפויות; פריסת עץ טובה למעקב שושלת.</li>
       </ul>
       <p>מבוסס על עקרונות visualization של עצים היררכיים (dendrogram/collapsible tree): שליטה בעומק, הפחתת עומס, והצגת מבנה הסתעפות באופן פרשני.</p>`
    : `<p><strong>Tradition Tree</strong> highlights transmission chains (teacherhood, commentary, authorship, soul-root) around a selected entity.</p>
       <ul>
         <li>Depth controls how many generations/layers are traversed.</li>
         <li>Fanout reduces clutter by keeping stronger branches per node.</li>
         <li>Direction follows downstream, upstream, or both.</li>
         <li>Radial layout emphasizes branching shape; tree layout emphasizes lineage reading.</li>
       </ul>
       <p>Grounded in hierarchy-visualization practice (dendrogram/collapsible-tree): depth control, clutter reduction, and branch-structure interpretability.</p>`;
  document.getElementById("traditionExplain").innerHTML = html;
}

function populateReportSelector() {
  const s = document.getElementById("reportSelect");
  const opts = [
    ["readme", "README"],
    ["researchQuestions", APP.lang === "he" ? "שאלות מחקר" : "Research Questions"],
    ["reportEN", "Main Report EN"],
    ["reportHE", "Main Report HE"],
    ["appendix", APP.lang === "he" ? "נספח שיטות" : "Appendix (Methods)"],
    ["dataDictionary", APP.lang === "he" ? "מילון נתונים" : "Data Dictionary"],
    ["graphSummary", APP.lang === "he" ? "סיכום גרף" : "Graph Summary"]
  ];
  s.innerHTML = opts.map(([k, txt]) => `<option value="${k}">${txt}</option>`).join("");
  s.value = APP.lang === "he" ? "reportHE" : "reportEN";
  s.onchange = renderReport;
  renderReport();
}

function renderReport() {
  const key = document.getElementById("reportSelect").value;
  const txt = APP.docs[key] || "";
  document.getElementById("reportContent").innerHTML = key === "graphSummary" ? `<pre>${esc(txt)}</pre>` : marked.parse(txt);
}

function populateFigureExplorer() {
  const s = document.getElementById("figureSelect");
  if (!s) return;
  const keys = Object.keys(FIGURES);
  s.innerHTML = keys.map(k => `<option value="${k}">${k} - ${FIGURES[k].file}</option>`).join("");
  s.value = "F1";
  s.onchange = renderFigurePreview;
  renderFigurePreview();
}

function renderFigurePreview() {
  const k = document.getElementById("figureSelect")?.value;
  const f = FIGURES[k];
  if (!f) return;
  const preview = document.getElementById("figurePreview");
  const expl = document.getElementById("figureExplanation");
  if (!preview || !expl) return;
  preview.src = `data/figures/${f.file}`;
  expl.textContent = APP.lang === "he" ? f.he : f.en;
}

function populateNodeDatalist() {
  const dl = document.getElementById("nodeNameList");
  const top = [...APP.nodes].sort((a, b) => num(b.a_in_degree) - num(a.a_in_degree)).slice(0, 2500);
  dl.innerHTML = top.map(n => `<option value="${esc(n.label)}">${esc(n.id)}</option>`).join("");
}

function populateFilters() {
  const kinds = [...new Set(APP.nodes.map(n => n.kind))].sort();
  const four = [...new Set(APP.nodes.map(n => n.four_way))].sort();
  const comm = Array.from(new Set(APP.nodes.map(n => String(n.community)))).sort((a, b) => num(a) - num(b));
  const defaultKinds = defaultKindValues(kinds);

  setMultiOptions("kindFilter", kinds, defaultKinds, localizeKind);
  setMultiOptions("fourWayFilter", four);
  setMultiOptions("communityFilter", comm, [], localizeCommunity);

  setMultiOptions("sourceKindFilter", kinds, defaultKinds, localizeKind);
  setMultiOptions("targetKindFilter", kinds, defaultKinds, localizeKind);
  setMultiOptions("networkNodeKindFilter", kinds, defaultKinds, localizeKind);
}

function filterRawNodes() {
  const q = norm(document.getElementById("nodeSearch").value);
  const selectedKinds = new Set(selValues("kindFilter"));
  const selectedFour = new Set(selValues("fourWayFilter"));
  const selectedComm = new Set(selValues("communityFilter"));
  const minProm = num(document.getElementById("minProm").value);

  APP.rawPageSize=200;
  APP.filteredNodes = APP.nodes.filter(n => {
    if (selectedKinds.size && !selectedKinds.has(n.kind)) return false;
    if (selectedFour.size && !selectedFour.has(n.four_way)) return false;
    if (selectedComm.size && !selectedComm.has(String(n.community))) return false;
    if (num(n.a_in_degree) < minProm) return false;
    if (q && !(norm(n.label).includes(q) || norm(n.id).includes(q))) return false;
    return true;
  });

  renderNodeTable();
}

function renderNodeTable() {
  const rows = APP.filteredNodes.slice(0, APP.rawPageSize || 200);
  const cols = ["id","label","kind","four_way","community","a_in_degree","c_in_wdeg","c_out_wdeg","place_in"];
  const head = [...cols, "source"].map(c => `<th>${esc(c)}</th>`).join("");
  const body = rows.map(r => {
    const cells = cols.map(c => c === "label" ? `<td><button type="button" class="entity-open" data-id="${esc(r.id)}" title="Open analysis">${esc(r[c])}</button></td>` : `<td>${esc(r[c])}</td>`).join("");
    return `<tr data-node-id="${esc(r.id)}">${cells}<td><button class="btn ghost raw-source" data-id="${esc(r.id)}">${APP.lang === "he" ? "מקור" : "Source"}</button></td></tr>`;
  }).join("");
  document.getElementById("nodeTableWrap").innerHTML = `<table class="table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table><p>${rows.length}/${APP.filteredNodes.length} ${rows.length<APP.filteredNodes.length ? `<button class="btn ghost" id="rawLoadMore">${APP.lang === "he" ? "טען עוד 200" : "Load 200 more"}</button>` : ""}</p>`;
  document.getElementById("rawLoadMore")?.addEventListener("click",()=>{APP.rawPageSize=(APP.rawPageSize||200)+200;renderNodeTable();});

  document.querySelectorAll(".raw-source").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      jumpToSourceByNodeId(btn.getAttribute("data-id"));
    };
  });

  document.querySelectorAll("#nodeTableWrap .entity-open").forEach(btn => {
    // Pointer-up is intentional: in a densely scrollable table some browsers
    // consume the first click when focus transfers from a graph. Keyboard
    // activation still uses click (Enter/Space).
    let down = false, openedAt = 0;
    btn.addEventListener("pointerdown", e => { down = e.button === 0; });
    btn.addEventListener("pointerup", e => {
      if (!down || e.button !== 0) return;
      down = false;
      openedAt = performance.now();
      e.stopPropagation();
      window.openEntityAnalysis?.(btn.dataset.id);
    });
    btn.onclick = e => {
      e.stopPropagation();
      if (performance.now() - openedAt < 600) return;
      window.openEntityAnalysis?.(btn.dataset.id);
    };
  });

  document.querySelectorAll("#nodeTableWrap tbody tr").forEach(tr => {
    tr.onclick = (e) => {
      if (e.target.classList.contains("raw-source")) return;
      const id = tr.getAttribute("data-node-id");
      // Selecting a name starts analysis immediately, not merely navigation.
      if (window.openEntityAnalysis) window.openEntityAnalysis(id);
      else { setSelectedNode(id); document.getElementById("personInput").value=id; activateTab("person"); document.getElementById("analyzePerson").click(); }
    };
  });
}

async function loadGraphIfNeeded(mode = "lite", forceReload = false) {
  if (APP.gLoaded && APP.gMode === mode && !forceReload) return;
  if (APP.graphPromises.has(mode)) return APP.graphPromises.get(mode);
  const promise = (async () => {
    const txt = await getText(mode === "lite" ? DATA_PATHS.graphLite : DATA_PATHS.graphFull);
    const j = JSON.parse(txt);
    const knownLabels = mode === "full" ? new Map(APP.nodes.map(n => [n.id, n.label])) : null;
    APP.gNodes = (j.nodes || []).map(n => ({
      id: n.i, label: (knownLabels?.get(n.i)) || n.l || n.i, kind: n.k, four_way: n.f,
      a_in_degree: n.a, c_in_wdeg: n.ci, c_out_wdeg: n.co, place_in: n.p,
      community: n.m, lat: n.lat, lon: n.lon
    }));
    APP.gEdges = (j.edges || []).map(e => ({
      id: e.i, source: e.s, target: e.t, weight: e.w, layer: e.ly,
      predicate: e.pr, subtype: e.sb, evidence: e.ev, source_entries: e.se
    }));
    APP.gNodeById = new Map(APP.gNodes.map(n => [n.id, n]));
    APP.edgePredicates = [...new Set(APP.gEdges.map(e => e.predicate).filter(Boolean))].sort();
    APP.edgeLayers = [...new Set(APP.gEdges.map(e => e.layer).filter(Boolean))].sort();
    APP.gLoaded = true;
    APP.gMode = mode;
    populateGraphFilters();
  })();
  APP.graphPromises.set(mode, promise);
  try { await promise; } finally { APP.graphPromises.delete(mode); }
}

function populateGraphFilters() {
  const defaultLayers = defaultLayerValues(APP.edgeLayers);
  const savedLayerFilter = APP.graphDefaultsApplied ? selValues("layerFilter") : defaultLayers;
  const savedNetworkLayerFilter = APP.graphDefaultsApplied ? selValues("networkLayerFilter") : defaultLayers;

  setMultiOptions("layerFilter", APP.edgeLayers, savedLayerFilter, localizeLayer);
  setMultiOptions("predicateFilter", APP.edgePredicates, selValues("predicateFilter"), localizePredicate);
  setMultiOptions("networkLayerFilter", APP.edgeLayers, savedNetworkLayerFilter, localizeLayer);
  setMultiOptions("networkPredicateFilter", APP.edgePredicates, selValues("networkPredicateFilter"), localizePredicate);

  const communities = Array.from(new Set(APP.gNodes.map(n => String(n.community)).filter(v => v !== ""))).sort((a, b) => num(a) - num(b));
  const communitySelection = APP.networkCommunityFilterReady ? selValues("networkCommunityFilter") : communities;
  setMultiOptions("networkCommunityFilter", communities, communitySelection, localizeCommunity);
  APP.networkCommunityFilterReady = true;

  const placePreds = [...new Set(APP.gEdges.filter(e => e.subtype === "place").map(e => e.predicate).filter(Boolean))].sort();
  setMultiOptions("geoPredicateFilter", placePreds, selValues("geoPredicateFilter"), localizePredicate);
  setMultiOptions("geoOverlayPredicate", placePreds, selValues("geoOverlayPredicate"), localizePredicate);

  APP.graphDefaultsApplied = true;
}

function clearEdgeTagFilters() {
  APP.activeEdgePredicateTags = new Set();
}

function runEdgeQuery() {
  const layers = new Set(selValues("layerFilter"));
  const preds = new Set(selValues("predicateFilter"));
  const srcKinds = new Set(selValues("sourceKindFilter"));
  const tgtKinds = new Set(selValues("targetKindFilter"));
  const srcId = resolveInputToId(document.getElementById("sourceNodeFilter").value);
  const tgtId = resolveInputToId(document.getElementById("targetNodeFilter").value);

  APP.currentEdgeResult = APP.gEdges.filter(e => {
    if (layers.size && !layers.has(e.layer)) return false;
    if (preds.size && !preds.has(e.predicate)) return false;
    if (srcId && e.source !== srcId) return false;
    if (tgtId && e.target !== tgtId) return false;
    if (srcKinds.size) {
      const sk = kindOf(nodeById(e.source));
      if (!srcKinds.has(sk)) return false;
    }
    if (tgtKinds.size) {
      const tk = kindOf(nodeById(e.target));
      if (!tgtKinds.has(tk)) return false;
    }
    return true;
  });

  if (APP.activeEdgePredicateTags.size) {
    APP.currentEdgeResult = APP.currentEdgeResult.filter(e => APP.activeEdgePredicateTags.has(e.predicate));
  }

  const byPred = APP.currentEdgeResult.reduce((a, e) => {
    a[e.predicate] = (a[e.predicate] || 0) + 1;
    return a;
  }, {});

  const tagHtml = Object.entries(byPred)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 24)
    .map(([k, v]) => {
      const active = APP.activeEdgePredicateTags.has(k) ? "active" : "";
      return `<button class="pill filter-pill ${active}" data-pred="${esc(k)}">${esc(localizePredicate(k))}: ${v}</button>`;
    })
    .join(" ");

  document.getElementById("edgeStats").innerHTML = `<p><strong>${APP.currentEdgeResult.length.toLocaleString()}</strong> ${APP.lang === "he" ? "קשתות" : "edges"}</p><div>${tagHtml}</div>`;

  document.querySelectorAll(".filter-pill").forEach(btn => {
    btn.onclick = () => {
      const p = btn.getAttribute("data-pred");
      if (APP.activeEdgePredicateTags.has(p)) APP.activeEdgePredicateTags.delete(p);
      else APP.activeEdgePredicateTags.add(p);
      runEdgeQuery();
    };
  });

  const rows = APP.currentEdgeResult.slice(0, 1400);
  const cols = ["layer", "predicate", "source", "target", "weight", "evidence"];
  const head = [...cols, APP.lang === "he" ? "מקור טקסט" : "source text"].map(c => `<th>${esc(c)}</th>`).join("");
  const body = rows.map(r => {
    const s = nodeById(r.source), tNode = nodeById(r.target);
    return `<tr><td>${esc(localizeLayer(r.layer || ""))}</td><td>${esc(localizePredicate(r.predicate || ""))}</td><td>${esc(r.source)}<br/><small>${esc(labelOf(s))}</small></td><td>${esc(r.target)}<br/><small>${esc(labelOf(tNode))}</small></td><td>${esc(r.weight)}</td><td>${esc(r.evidence || "")}</td><td><button class="btn ghost edge-source" data-id="${esc(r.source)}">${APP.lang === "he" ? "מקור" : "Source"}</button></td></tr>`;
  }).join("");
  document.getElementById("edgeTableWrap").innerHTML = `<table class="table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;

  document.querySelectorAll(".edge-source").forEach(b => {
    b.onclick = () => jumpToSourceByNodeId(b.getAttribute("data-id"));
  });

  ensurePlotly().then(() => {
    renderPredicateLayerHeat(APP.currentEdgeResult);
    renderFlowSankey(APP.currentEdgeResult);
  }).catch(e => console.error("Plotly failed", e));
}

function renderPredicateLayerHeat(edges) {
  const preds = [...new Set(edges.map(e => e.predicate).filter(Boolean))].slice(0, 30);
  const layers = [...new Set(edges.map(e => e.layer).filter(Boolean))];
  const counts = new Map();
  for (const e of edges) {const key = `${e.predicate}::${e.layer}`;counts.set(key,(counts.get(key)||0)+1);}
  const z = preds.map(p => layers.map(l => counts.get(`${p}::${l}`)||0));
  Plotly.newPlot("predicateLayerHeat", [{ z, x: layers, y: preds, type: "heatmap", colorscale: [[0,"#f4f0e7"],[0.5,"#8daaaa"],[1,"#247a83"]] }], { height: 320, margin: { t: 20, l: 130, r: 8, b: 60 } }, { displaylogo: false, responsive: true });
}

function renderFlowSankey(edges) {
  const labelToIx = new Map();
  const labels = [];
  const src = [], tgt = [], val = [];

  const addLabel = (s) => {
    if (!labelToIx.has(s)) {
      labelToIx.set(s, labels.length);
      labels.push(s);
    }
    return labelToIx.get(s);
  };

  const agg = new Map();
  edges.forEach(e => {
    const sk = kindOf(nodeById(e.source));
    const tk = kindOf(nodeById(e.target));
    const key = `${sk}||${e.predicate}||${tk}`;
    agg.set(key, (agg.get(key) || 0) + 1);
  });

  agg.forEach((v, key) => {
    const [sk, pr, tk] = key.split("||");
    const a = addLabel(`src:${localizeKind(sk)}`);
    const b = addLabel(`pred:${localizePredicate(pr)}`);
    const c = addLabel(`tgt:${localizeKind(tk)}`);
    src.push(a); tgt.push(b); val.push(v);
    src.push(b); tgt.push(c); val.push(v);
  });

  Plotly.newPlot("flowSankey", [{ type: "sankey", node: { label: labels, pad: 10, thickness: 12 }, link: { source: src, target: tgt, value: val } }], { height: 320, margin: { t: 20, l: 10, r: 10, b: 10 } }, { displaylogo: false, responsive: true });
}

function subgraphFromSeed(seed, opts) {
  const { layers, predicates, kinds, hops, maxEdges, mode } = opts;

  const cand = APP.gEdges.filter(e => {
    if (layers.length && !layers.includes(e.layer)) return false;
    if (predicates.length && !predicates.includes(e.predicate)) return false;
    if (kinds.length) {
      const sk = kindOf(nodeById(e.source));
      const tk = kindOf(nodeById(e.target));
      if (!kinds.includes(sk) || !kinds.includes(tk)) return false;
    }
    return true;
  });

  const adj = new Map();
  cand.forEach(e => {
    if (!adj.has(e.source)) adj.set(e.source, []);
    if (!adj.has(e.target)) adj.set(e.target, []);
    adj.get(e.source).push(e);
    adj.get(e.target).push(e);
  });

  const nodes = new Set([seed]);
  let frontier = new Set([seed]);
  for (let h = 0; h < hops; h++) {
    const next = new Set();
    for (const n of frontier) {
      (adj.get(n) || []).forEach(e => {
        const other = e.source === n ? e.target : e.source;
        if (!nodes.has(other)) {
          nodes.add(other);
          next.add(other);
        }
      });
    }
    frontier = next;
    if (!frontier.size) break;
  }

  let edges = cand.filter(e => mode === "ego" ? (nodes.has(e.source) && nodes.has(e.target)) : (nodes.has(e.source) || nodes.has(e.target)));
  edges = edges.slice(0, maxEdges);

  if (mode !== "ego") {
    edges.forEach(e => {
      nodes.add(e.source);
      nodes.add(e.target);
    });
  }

  const cyNodes = [...nodes].map(id => {
    const n = nodeById(id) || { id, label: id, kind: "unknown" };
    return { data: { id, label: labelOf(n), kind: kindOf(n), community: n.community, role: roleOf(n) } };
  });
  const cyEdges = edges.map(e => ({ data: { id: e.id, source: e.source, target: e.target, predicate: e.predicate, layer: e.layer, weight: e.weight } }));
  return { cyNodes, cyEdges };
}

function buildGlobalOverviewSubgraph(opts) {
  const { layers, predicates, kinds, communityValues, communityCount, maxEdges, focusId, hops } = opts;

  let cand = APP.gEdges.filter(e => {
    if (layers.length && !layers.includes(e.layer)) return false;
    if (predicates.length && !predicates.includes(e.predicate)) return false;
    if (kinds.length) {
      const sk = kindOf(nodeById(e.source));
      const tk = kindOf(nodeById(e.target));
      if (!kinds.includes(sk) || !kinds.includes(tk)) return false;
    }
    return true;
  });

  const preNodes = new Set();
  cand.forEach(e => {
    preNodes.add(e.source);
    preNodes.add(e.target);
  });

  const preCyNodes = [...preNodes].map(id => ({ data: { id } }));
  const preCyEdges = cand.map(e => ({ data: { source: e.source, target: e.target, weight: e.weight } }));
  const computedCommunities = communityCount > 0 ? computeKCommunities(preCyNodes, preCyEdges, communityCount) : new Map();
  const availableCommunities = communityCount > 0
    ? Array.from(new Set(computedCommunities.values())).sort((a, b) => num(a) - num(b))
    : Array.from(new Set(APP.gNodes.map(n => String(n.community)).filter(v => v !== ""))).sort((a, b) => num(a) - num(b));

  const selectedPool = communityValues.length ? availableCommunities.filter(c => communityValues.includes(c)) : availableCommunities;
  const communitySet = communityCount > 0 ? new Set(selectedPool) : new Set();

  if (communitySet.size) {
    cand = cand.filter(e => {
      const s = String(computedCommunities.get(e.source) ?? "");
      const tNode = String(computedCommunities.get(e.target) ?? "");
      return communitySet.has(s) && communitySet.has(tNode);
    });
  }

  if (focusId) {
    const adj = new Map();
    cand.forEach(e => {
      if (!adj.has(e.source)) adj.set(e.source, []);
      if (!adj.has(e.target)) adj.set(e.target, []);
      adj.get(e.source).push(e);
      adj.get(e.target).push(e);
    });

    const scope = new Set([focusId]);
    let frontier = new Set([focusId]);
    for (let h = 0; h < Math.max(1, hops || 1); h++) {
      const next = new Set();
      for (const n of frontier) {
        (adj.get(n) || []).forEach(e => {
          const other = e.source === n ? e.target : e.source;
          if (!scope.has(other)) {
            scope.add(other);
            next.add(other);
          }
        });
      }
      frontier = next;
      if (!frontier.size) break;
    }

    cand = cand.filter(e => scope.has(e.source) && scope.has(e.target));
  }

  cand = [...cand].sort((a, b) => num(b.weight) - num(a.weight)).slice(0, maxEdges);

  const nodes = new Set();
  cand.forEach(e => {
    nodes.add(e.source);
    nodes.add(e.target);
  });

  const cyNodes = [...nodes].map(id => {
    const n = nodeById(id) || { id, label: id, kind: "unknown" };
    const dynamicCommunity = computedCommunities.get(id);
    return { data: { id, label: labelOf(n), kind: kindOf(n), community: dynamicCommunity ?? n.community, role: roleOf(n) } };
  });
  const cyEdges = cand.map(e => ({ data: { id: e.id, source: e.source, target: e.target, predicate: e.predicate, layer: e.layer, weight: e.weight } }));

  const includedCommunities = communityCount > 0 ? [...communitySet] : [];

  return {
    cyNodes,
    cyEdges,
    includedCommunities,
    availableCommunities,
    computedCommunities
  };
}

function componentsCount(cyNodes, cyEdges) {
  const ids = new Set(cyNodes.map(n => n.data.id));
  const adj = new Map([...ids].map(id => [id, new Set()]));
  cyEdges.forEach(e => {
    const s = e.data.source;
    const tNode = e.data.target;
    if (adj.has(s) && adj.has(tNode)) {
      adj.get(s).add(tNode);
      adj.get(tNode).add(s);
    }
  });

  const seen = new Set();
  let c = 0;
  for (const id of ids) {
    if (seen.has(id)) continue;
    c++;
    const q = [id];
    seen.add(id);
    while (q.length) {
      const x = q.pop();
      adj.get(x).forEach(n => {
        if (!seen.has(n)) {
          seen.add(n);
          q.push(n);
        }
      });
    }
  }
  return c;
}

function clamp01(v) {
  return Math.max(0, Math.min(1, num(v)));
}

function metricColor(v) {
  const x = clamp01(v);
  const r = Math.round(12 + (238 - 12) * x);
  const g = Math.round(87 + (155 - 87) * x);
  const b = Math.round(115 + (0 - 115) * x);
  return `rgb(${r},${g},${b})`;
}

function isMetricMode(mode) {
  return ["degree", "in_degree", "out_degree", "weighted_degree", "pagerank", "clustering"].includes(mode);
}

function normalizeMap(valuesMap) {
  const vals = [...valuesMap.values()];
  const min = vals.length ? Math.min(...vals) : 0;
  const max = vals.length ? Math.max(...vals) : 1;
  const span = (max - min) || 1;
  const out = new Map();
  valuesMap.forEach((v, k) => out.set(k, (num(v) - min) / span));
  return out;
}

function computeGlobalNodeMetrics(cyNodes, cyEdges) {
  const ids = cyNodes.map(n => n.data.id);
  const idSet = new Set(ids);
  const inDeg = new Map(ids.map(id => [id, 0]));
  const outDeg = new Map(ids.map(id => [id, 0]));
  const weightedDeg = new Map(ids.map(id => [id, 0]));
  const outWeight = new Map(ids.map(id => [id, 0]));
  const undirectedAdj = new Map(ids.map(id => [id, new Set()]));

  cyEdges.forEach(e => {
    const s = e.data.source;
    const tNode = e.data.target;
    if (!idSet.has(s) || !idSet.has(tNode)) return;
    const w = Math.max(0.0001, num(e.data.weight) || 1);
    outDeg.set(s, (outDeg.get(s) || 0) + 1);
    inDeg.set(tNode, (inDeg.get(tNode) || 0) + 1);
    outWeight.set(s, (outWeight.get(s) || 0) + w);
    weightedDeg.set(s, (weightedDeg.get(s) || 0) + w);
    weightedDeg.set(tNode, (weightedDeg.get(tNode) || 0) + w);
    undirectedAdj.get(s).add(tNode);
    undirectedAdj.get(tNode).add(s);
  });

  const degree = new Map(ids.map(id => [id, (inDeg.get(id) || 0) + (outDeg.get(id) || 0)]));

  const clustering = new Map();
  ids.forEach(id => {
    const neigh = [...(undirectedAdj.get(id) || new Set())];
    const k = neigh.length;
    if (k < 2) {
      clustering.set(id, 0);
      return;
    }
    let links = 0;
    for (let i = 0; i < k; i++) {
      for (let j = i + 1; j < k; j++) {
        const a = neigh[i], b = neigh[j];
        if ((undirectedAdj.get(a) || new Set()).has(b)) links++;
      }
    }
    clustering.set(id, links / (k * (k - 1) / 2));
  });

  const n = Math.max(1, ids.length);
  const d = 0.85;
  let pr = new Map(ids.map(id => [id, 1 / n]));
  for (let iter = 0; iter < 36; iter++) {
    const next = new Map(ids.map(id => [id, (1 - d) / n]));
    ids.forEach(id => {
      const outgoing = outWeight.get(id) || 0;
      if (!outgoing) {
        const leak = d * (pr.get(id) || 0) / n;
        ids.forEach(tNode => next.set(tNode, (next.get(tNode) || 0) + leak));
        return;
      }
      const base = d * (pr.get(id) || 0);
      cyEdges.forEach(e => {
        if (e.data.source !== id) return;
        const tNode = e.data.target;
        if (!idSet.has(tNode)) return;
        const w = Math.max(0.0001, num(e.data.weight) || 1);
        next.set(tNode, (next.get(tNode) || 0) + base * (w / outgoing));
      });
    });
    pr = next;
  }

  return {
    degree,
    in_degree: inDeg,
    out_degree: outDeg,
    weighted_degree: weightedDeg,
    pagerank: pr,
    clustering
  };
}

function metricLabel(mode) {
  if (mode === "degree") return t("color_degree");
  if (mode === "in_degree") return t("color_in_degree");
  if (mode === "out_degree") return t("color_out_degree");
  if (mode === "weighted_degree") return t("color_weighted_degree");
  if (mode === "pagerank") return t("color_pagerank");
  if (mode === "clustering") return t("color_clustering");
  return "";
}

function applyGlobalAnalysisMetric(graph, mode) {
  if (!isMetricMode(mode)) {
    graph.cyNodes.forEach(n => {
      n.data.metricValue = 0;
      n.data.metricNorm = 0;
      n.data.metricName = "";
    });
    return { mode, topRows: [] };
  }

  const metrics = computeGlobalNodeMetrics(graph.cyNodes, graph.cyEdges);
  const rawMap = metrics[mode] || new Map();
  const normMap = normalizeMap(rawMap);

  graph.cyNodes.forEach(n => {
    const id = n.data.id;
    n.data.metricValue = num(rawMap.get(id));
    n.data.metricNorm = num(normMap.get(id));
    n.data.metricName = mode;
  });

  const topRows = [...rawMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, v]) => ({ id, label: labelOf(nodeById(id) || { id }), value: v }));

  return { mode, topRows };
}

function renderMetricsBox(targetId, cyNodes, cyEdges) {
  const n = cyNodes.length;
  const m = cyEdges.length;
  const density = n > 1 ? (2 * m) / (n * (n - 1)) : 0;
  const deg = new Map(cyNodes.map(x => [x.data.id, 0]));
  cyEdges.forEach(e => {
    deg.set(e.data.source, (deg.get(e.data.source) || 0) + 1);
    deg.set(e.data.target, (deg.get(e.data.target) || 0) + 1);
  });
  const top = [...deg.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id, d]) => `${labelOf(nodeById(id) || { id })} (${d})`).join(" | ");
  const avg = n ? (2 * m) / n : 0;
  const comps = componentsCount(cyNodes, cyEdges);

  const cards = [
    [APP.lang === "he" ? "צמתים" : "Nodes", n],
    [APP.lang === "he" ? "קשתות" : "Edges", m],
    ["Density", density.toFixed(4)],
    [APP.lang === "he" ? "דרגה ממוצעת" : "Avg degree", avg.toFixed(2)],
    [APP.lang === "he" ? "רכיבים" : "Components", comps],
    [APP.lang === "he" ? "דרגה מובילה" : "Top degree", top || "-"]
  ];
  document.getElementById(targetId).innerHTML = cards.map(([k, v]) => `<div class="metric-card"><div class="metric-k">${esc(k)}</div><div class="metric-v">${esc(v)}</div></div>`).join("");
}

function computeCommunityPresetPositions(cyNodes) {
  const byCommunity = new Map();
  cyNodes.forEach(n => {
    const c = String(n.data.community ?? "unknown");
    if (!byCommunity.has(c)) byCommunity.set(c, []);
    byCommunity.get(c).push(n.data.id);
  });

  const groups = [...byCommunity.entries()].sort((a, b) => b[1].length - a[1].length);
  const cols = Math.max(1, Math.ceil(Math.sqrt(groups.length)));
  const spacing = 420;
  const positions = {};

  groups.forEach(([community, ids], ix) => {
    const col = ix % cols;
    const row = Math.floor(ix / cols);
    const cx = col * spacing;
    const cy = row * spacing;
    const radius = Math.max(42, 56 + Math.sqrt(ids.length) * 18);

    if (ids.length === 1) {
      positions[ids[0]] = { x: cx, y: cy };
      return;
    }

    ids.forEach((id, idx) => {
      const angle = (2 * Math.PI * idx) / ids.length;
      const tier = 0.68 + ((idx % 5) * 0.08);
      positions[id] = {
        x: cx + Math.cos(angle) * radius * tier,
        y: cy + Math.sin(angle) * radius * tier
      };
    });
  });

  return positions;
}

function computeDegreeMap(cyNodes, cyEdges) {
  const deg = new Map(cyNodes.map(n => [n.data.id, 0]));
  cyEdges.forEach(e => {
    const s = e.data.source;
    const tNode = e.data.target;
    if (deg.has(s)) deg.set(s, (deg.get(s) || 0) + 1);
    if (deg.has(tNode)) deg.set(tNode, (deg.get(tNode) || 0) + 1);
  });
  return deg;
}

function computeDegreeRingPositions(cyNodes, cyEdges) {
  const deg = computeDegreeMap(cyNodes, cyEdges);
  const ranked = [...cyNodes].sort((a, b) => (deg.get(b.data.id) || 0) - (deg.get(a.data.id) || 0));

  const outer = ranked.slice(0, 20);
  const mid = ranked.slice(20, 40);
  const core = ranked.slice(40);

  const positions = {};
  const placeRing = (arr, radius) => {
    arr.forEach((n, i) => {
      const ang = (2 * Math.PI * i) / Math.max(1, arr.length);
      positions[n.data.id] = {
        x: Math.cos(ang) * radius,
        y: Math.sin(ang) * radius
      };
    });
  };

  placeRing(outer, 760);
  placeRing(mid, 430);

  core.forEach((n, i) => {
    const ang = i * 0.35;
    const r = 10 + Math.sqrt(i + 1) * 17;
    positions[n.data.id] = {
      x: Math.cos(ang) * r,
      y: Math.sin(ang) * r
    };
  });

  return positions;
}

function computeBipartitePositions(cyNodes, cyEdges) {
  const deg = computeDegreeMap(cyNodes, cyEdges);
  const books = [];
  const people = [];
  const others = [];

  cyNodes.forEach(n => {
    const kind = String(n.data.kind || "");
    if (kind === "book") books.push(n);
    else if (kind === "person") people.push(n);
    else others.push(n);
  });

  const sortByDegree = (arr) => arr.sort((a, b) => (deg.get(b.data.id) || 0) - (deg.get(a.data.id) || 0));
  sortByDegree(books);
  sortByDegree(people);
  sortByDegree(others);

  const positions = {};
  const colHeight = Math.max(books.length, people.length, 1);
  const step = Math.max(18, Math.min(36, 1800 / colHeight));
  const startY = -((colHeight - 1) * step) / 2;

  books.forEach((n, i) => {
    positions[n.data.id] = { x: -520, y: startY + (i * step) };
  });

  people.forEach((n, i) => {
    positions[n.data.id] = { x: 520, y: startY + (i * step) };
  });

  others.forEach((n, i) => {
    const ang = (2 * Math.PI * i) / Math.max(1, others.length);
    const radius = 130 + Math.sqrt(i + 1) * 10;
    positions[n.data.id] = {
      x: Math.cos(ang) * radius,
      y: Math.sin(ang) * radius
    };
  });

  return positions;
}

function computeKCommunities(cyNodes, cyEdges, requestedK) {
  const nodeIds = [...new Set(cyNodes.map(n => n.data.id))];
  if (!nodeIds.length) return new Map();

  const targetK = Math.max(2, Math.min(num(requestedK) || 2, nodeIds.length));

  const edgeMap = new Map();
  const addW = (a, b, w) => {
    const x = String(a), y = String(b);
    const key = x < y ? `${x}||${y}` : `${y}||${x}`;
    edgeMap.set(key, (edgeMap.get(key) || 0) + w);
  };

  cyEdges.forEach(e => {
    const s = e.data.source;
    const tNode = e.data.target;
    if (s == null || tNode == null) return;
    const w = Math.max(0.0001, num(e.data.weight) || 1);
    addW(s, tNode, w);
  });

  const baseEdges = [...edgeMap.entries()].map(([k, w]) => {
    const [a, b] = k.split("||");
    return { source: a, target: b, weight: w };
  });

  let levelNodes = [...nodeIds];
  let levelEdges = baseEdges;

  let labels = new Map(nodeIds.map(id => [id, id]));
  let stableRounds = 0;

  for (let level = 0; level < 8; level++) {
    const pass = louvainOneLevel(levelNodes, levelEdges);
    const changed = pass.changed;

    labels = composePartitionLabels(labels, pass.partition);
    const aggregated = aggregateGraph(levelNodes, levelEdges, pass.partition);

    if (!changed) stableRounds++;
    else stableRounds = 0;

    if (!aggregated.edges.length || aggregated.nodes.length === levelNodes.length || stableRounds >= 2) {
      break;
    }

    levelNodes = aggregated.nodes;
    levelEdges = aggregated.edges;
  }

  let finalLabels = relabelCompact(labels);
  finalLabels = enforceTargetCommunityCount(finalLabels, nodeIds, baseEdges, targetK);
  return relabelCompact(finalLabels);
}

function buildUndirectedAdjacency(nodeIds, edges) {
  const adj = new Map(nodeIds.map(id => [id, new Map()]));
  const deg = new Map(nodeIds.map(id => [id, 0]));
  let totalWeight = 0;

  edges.forEach(e => {
    const s = e.source;
    const tNode = e.target;
    const w = Math.max(0.0001, num(e.weight) || 1);
    if (!adj.has(s) || !adj.has(tNode)) return;
    adj.get(s).set(tNode, (adj.get(s).get(tNode) || 0) + w);
    if (s !== tNode) adj.get(tNode).set(s, (adj.get(tNode).get(s) || 0) + w);
    deg.set(s, (deg.get(s) || 0) + w);
    if (s !== tNode) deg.set(tNode, (deg.get(tNode) || 0) + w);
    totalWeight += w;
  });

  return { adj, deg, m2: Math.max(0.0001, totalWeight * 2) };
}

function louvainOneLevel(nodeIds, edges) {
  const { adj, deg, m2 } = buildUndirectedAdjacency(nodeIds, edges);
  const commOf = new Map(nodeIds.map(id => [id, id]));
  const commTot = new Map(nodeIds.map(id => [id, deg.get(id) || 0]));

  const nodeOrder = [...nodeIds].sort((a, b) => (deg.get(b) || 0) - (deg.get(a) || 0));
  let changed = false;

  for (let iter = 0; iter < 25; iter++) {
    let moved = 0;
    for (const node of nodeOrder) {
      const kI = deg.get(node) || 0;
      if (kI <= 0) continue;

      const neigh = adj.get(node) || new Map();
      const current = commOf.get(node);

      const neighCommWeight = new Map();
      neigh.forEach((w, nb) => {
        const c = commOf.get(nb);
        neighCommWeight.set(c, (neighCommWeight.get(c) || 0) + w);
      });

      commTot.set(current, (commTot.get(current) || 0) - kI);

      let bestComm = current;
      let bestGain = 0;

      const candidates = new Set([current, ...neighCommWeight.keys()]);
      candidates.forEach(c => {
        const kiIn = neighCommWeight.get(c) || 0;
        const gain = kiIn - ((commTot.get(c) || 0) * kI) / m2;
        if (gain > bestGain + 1e-10) {
          bestGain = gain;
          bestComm = c;
        }
      });

      commOf.set(node, bestComm);
      commTot.set(bestComm, (commTot.get(bestComm) || 0) + kI);

      if (bestComm !== current) {
        moved++;
        changed = true;
      }
    }
    if (!moved) break;
  }

  return { partition: commOf, changed };
}

function composePartitionLabels(prevLabels, levelPartition) {
  const out = new Map();
  prevLabels.forEach((prevCluster, originalNodeId) => {
    const next = levelPartition.get(prevCluster) ?? prevCluster;
    out.set(originalNodeId, next);
  });
  return out;
}

function aggregateGraph(levelNodes, levelEdges, partition) {
  const superNodeSet = new Set();
  const edgeMap = new Map();

  const superOf = (id) => partition.get(id) ?? id;
  levelNodes.forEach(id => superNodeSet.add(superOf(id)));

  const add = (a, b, w) => {
    const x = String(a), y = String(b);
    const key = x < y ? `${x}||${y}` : `${y}||${x}`;
    edgeMap.set(key, (edgeMap.get(key) || 0) + w);
  };

  levelEdges.forEach(e => {
    const s = superOf(e.source);
    const tNode = superOf(e.target);
    const w = Math.max(0.0001, num(e.weight) || 1);
    add(s, tNode, w);
  });

  const nodes = [...superNodeSet];
  const edges = [...edgeMap.entries()].map(([k, w]) => {
    const [a, b] = k.split("||");
    return { source: a, target: b, weight: w };
  });
  return { nodes, edges };
}

function relabelCompact(labels) {
  const map = new Map();
  let ix = 1;
  const out = new Map();
  labels.forEach((c, id) => {
    const key = String(c);
    if (!map.has(key)) {
      map.set(key, String(ix));
      ix++;
    }
    out.set(id, map.get(key));
  });
  return out;
}

function communitySizes(labels) {
  const sizes = new Map();
  labels.forEach(c => sizes.set(c, (sizes.get(c) || 0) + 1));
  return sizes;
}

function enforceTargetCommunityCount(labels, nodeIds, edges, targetK) {
  let out = new Map(labels);

  const buildCommGraph = (lab) => {
    const weights = new Map();
    const add = (a, b, w) => {
      const x = String(a), y = String(b);
      const key = x < y ? `${x}||${y}` : `${y}||${x}`;
      weights.set(key, (weights.get(key) || 0) + w);
    };
    edges.forEach(e => {
      const a = lab.get(e.source);
      const b = lab.get(e.target);
      if (!a || !b) return;
      add(a, b, Math.max(0.0001, num(e.weight) || 1));
    });
    return weights;
  };

  while (new Set(out.values()).size > targetK) {
    const sizes = communitySizes(out);
    const comms = [...sizes.keys()].sort((a, b) => (sizes.get(a) || 0) - (sizes.get(b) || 0));
    const from = comms[0];
    const commGraph = buildCommGraph(out);

    let bestTo = "";
    let bestW = -1;
    commGraph.forEach((w, key) => {
      const [a, b] = key.split("||");
      if (a === from && b !== from && w > bestW) { bestW = w; bestTo = b; }
      if (b === from && a !== from && w > bestW) { bestW = w; bestTo = a; }
    });

    if (!bestTo) {
      const fallback = comms.find(c => c !== from);
      if (!fallback) break;
      bestTo = fallback;
    }

    out.forEach((c, id) => {
      if (c === from) out.set(id, bestTo);
    });
  }

  while (new Set(out.values()).size < targetK) {
    const sizes = communitySizes(out);
    const largest = [...sizes.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
    if (!largest || (sizes.get(largest) || 0) < 2) break;

    const nodesInLargest = nodeIds.filter(id => out.get(id) === largest);
    const deg = new Map(nodesInLargest.map(id => [id, 0]));
    edges.forEach(e => {
      if (out.get(e.source) !== largest || out.get(e.target) !== largest) return;
      const w = Math.max(0.0001, num(e.weight) || 1);
      deg.set(e.source, (deg.get(e.source) || 0) + w);
      if (e.source !== e.target) deg.set(e.target, (deg.get(e.target) || 0) + w);
    });

    const sorted = [...nodesInLargest].sort((a, b) => (deg.get(b) || 0) - (deg.get(a) || 0));
    const splitTake = Math.max(1, Math.floor(sorted.length / 2));
    let splitIx = 1;
    let newLabel = `${largest}_split_${splitIx}`;
    const usedLabels = new Set(out.values());
    while (usedLabels.has(newLabel)) {
      splitIx++;
      newLabel = `${largest}_split_${splitIx}`;
    }
    sorted.slice(0, splitTake).forEach(id => out.set(id, newLabel));
  }

  return out;
}

function applyLabelVisibilityToCy(cy) {
  if (!cy) return;
  cy.style()
    .selector("node")
    .style("label", APP.showNodeLabels ? "data(label)" : "")
    .selector("edge")
    .style("label", (ele) => APP.showEdgeLabels ? localizePredicate(ele.data("predicate")) : "")
    .update();
}

function applyLabelVisibilityToAllGraphs() {
  applyLabelVisibilityToCy(APP.cyGlobal);
  applyLabelVisibilityToCy(APP.cyEgo);
  applyLabelVisibilityToCy(APP.cyTree);
}

function buildCy(containerId, cyNodes, cyEdges, colorBy = "kind", treeLike = false, target = "global", layoutMode = "breadth", extra = {}) {
  if (target === "global" && APP.cyGlobal) APP.cyGlobal.destroy();
  if (target === "ego" && APP.cyEgo) APP.cyEgo.destroy();
  if (target === "tree" && APP.cyTree) APP.cyTree.destroy();

  const nodeStyle = {
    label: APP.showNodeLabels ? "data(label)" : "",
    "font-size": 8,
    "text-wrap": "wrap",
    "text-max-width": 95,
    width: (ele) => {
      if (isMetricMode(colorBy)) {
        return 18 + (clamp01(ele.data("metricNorm")) * 30);
      }
      return 24;
    },
    height: (ele) => {
      if (isMetricMode(colorBy)) {
        return 18 + (clamp01(ele.data("metricNorm")) * 30);
      }
      return 24;
    },
    "background-color": (ele) => {
      const d = ele.data();
      if (isMetricMode(colorBy)) {
        return metricColor(d.metricNorm);
      }
      if (isCommunityMode(colorBy)) return colorByCommunity(d.community);
      if (colorBy === "role") {
        if (d.role === "authority") return "#247a83";
        if (d.role === "compiler") return "#ac653e";
        if (d.role === "balanced") return "#247a83";
        return "#6c757d";
      }
      if (d.kind === "book") return "#ac653e";
      if (d.kind === "place") return "#6c757d";
      return "#247a83";
    },
    shape: (ele) => ele.data("kind") === "place" ? "diamond" : "ellipse"
  };

  let layout;
  const preset = String(extra.layoutPreset || "force");
  if (treeLike && layoutMode === "radial") {
    layout = {
      name: "concentric",
      animate: false,
      concentric: (node) => 100 - (num(node.data("depth")) * 8),
      levelWidth: () => 8
    };
  } else if (treeLike) {
    layout = { name: "breadthfirst", directed: true, padding: 24, animate: false };
  } else if (preset === "degree_rings") {
    const pos = computeDegreeRingPositions(cyNodes, cyEdges);
    layout = {
      name: "preset",
      fit: true,
      padding: 28,
      positions: (node) => pos[node.id()] || { x: 0, y: 0 }
    };
  } else if (preset === "bipartite") {
    const pos = computeBipartitePositions(cyNodes, cyEdges);
    layout = {
      name: "preset",
      fit: true,
      padding: 28,
      positions: (node) => pos[node.id()] || { x: 0, y: 0 }
    };
  } else if (preset === "community_clusters" || extra.separateByCommunity) {
    const pos = computeCommunityPresetPositions(cyNodes);
    layout = {
      name: "preset",
      fit: true,
      padding: 28,
      positions: (node) => pos[node.id()] || { x: 0, y: 0 }
    };
  } else {
    layout = { name: "cose", animate: false, nodeRepulsion: 6800 };
  }

  const cy = cytoscape({
    container: document.getElementById(containerId),
    elements: [...cyNodes, ...cyEdges],
    style: [
      { selector: "node", style: nodeStyle },
      { selector: "edge", style: { width: 1, "line-color": "#9fb3c8", "curve-style": "bezier", opacity: 0.68, "target-arrow-shape": treeLike ? "triangle" : "none", "target-arrow-color": "#8da8bd", label: (ele) => APP.showEdgeLabels ? localizePredicate(ele.data("predicate")) : "", "font-size": 7, color: "#24445c", "text-background-color": "#ffffff", "text-background-opacity": 0.85, "text-background-padding": 2 } },
      { selector: ":selected", style: { "background-color": "#ffb703", "line-color": "#ffb703" } }
    ],
    layout
  });

  cy.on("tap", "node", evt => {
    const id = evt.target.data("id");
    // Clicking a name in any Cytoscape view opens its actual analysis.
    if (window.openEntityAnalysis) window.openEntityAnalysis(id);
    else { setSelectedNode(id); document.getElementById("seedNode").value=id; document.getElementById("personInput").value=id; }
  });

  if (target === "global") APP.cyGlobal = cy;
  if (target === "ego") APP.cyEgo = cy;
  if (target === "tree") APP.cyTree = cy;
  applyLabelVisibilityToCy(cy);
  return cy;
}

function getDefaultSeed() {
  const top = [...APP.nodes].sort((a, b) => num(b.a_in_degree) - num(a.a_in_degree))[0];
  return top?.id || "";
}

function buildGlobalNetwork() {
  const focusId = resolveInputToId(document.getElementById("seedNode").value);
  const analysisMode = document.getElementById("networkColorBy").value;
  const layoutPreset = document.getElementById("networkLayoutPreset")?.value || "force";
  const useCommunityMode = isCommunityMode(analysisMode);
  const useCommunityLayout = useCommunityMode && layoutPreset === "community_clusters";
  const communityCount = useCommunityMode ? Math.max(2, Math.min(30, num(document.getElementById("networkCommunityCount").value))) : 0;

  const graph = buildGlobalOverviewSubgraph({
    layers: selValues("networkLayerFilter"),
    predicates: selValues("networkPredicateFilter"),
    kinds: selValues("networkNodeKindFilter"),
    communityValues: useCommunityMode ? selValues("networkCommunityFilter") : [],
    communityCount,
    focusId: focusId && APP.gNodeById.has(focusId) ? focusId : "",
    hops: Math.max(1, Math.min(3, num(document.getElementById("networkHops").value))),
    maxEdges: Math.max(50, Math.min(6000, num(document.getElementById("networkMaxEdges").value)))
  });

  if (useCommunityMode) {
    const prevSelection = currentSelection("networkCommunityFilter");
    const nextSelection = prevSelection.length ? graph.availableCommunities.filter(c => prevSelection.includes(c)) : graph.availableCommunities;
    setMultiOptions("networkCommunityFilter", graph.availableCommunities, nextSelection, localizeCommunity);
  }

  if (!graph.cyNodes.length) {
    document.getElementById("networkInfo").innerHTML = `<p class="status-err">${APP.lang === "he" ? "לא נמצאו תוצאות עבור הסינון הנוכחי." : "No graph results for current filters."}</p>`;
    document.getElementById("networkMetrics").innerHTML = "";
    if (APP.cyGlobal) {
      APP.cyGlobal.destroy();
      APP.cyGlobal = null;
    }
    return;
  }

  if (focusId && APP.gNodeById.has(focusId)) {
    setSelectedNode(focusId);
  }

  const metricState = applyGlobalAnalysisMetric(graph, analysisMode);

  buildCy(
    "network",
    graph.cyNodes,
    graph.cyEdges,
    analysisMode,
    false,
    "global",
    "broad",
    {
      separateByCommunity: useCommunityLayout && document.getElementById("networkSeparateCommunities").checked,
      layoutPreset
    }
  );

  const commText = graph.availableCommunities.map(c => localizeCommunity(c)).join(" | ");
  const focusText = focusId && APP.gNodeById.has(focusId)
    ? (APP.lang === "he" ? ` | מיקוד: ${esc(labelOf(nodeById(focusId)))}` : ` | Focus: ${esc(labelOf(nodeById(focusId)))}`)
    : "";
  const metricInfo = metricState.topRows.length
    ? `<p><strong>${esc(t("metric_top_nodes"))} (${esc(metricLabel(metricState.mode))}):</strong> ${metricState.topRows.map(x => `${esc(x.label)} (${num(x.value).toFixed(4)})`).join(" | ")}</p>`
    : "";
  const communityInfo = useCommunityMode
    ? `<p>${APP.lang === "he" ? "קהילות מחושבות" : "Computed communities"}: ${commText || "-"}</p>`
    : "";
  document.getElementById("networkInfo").innerHTML = APP.lang === "he"
    ? `<p>מבט-על לרשת הכללית${focusText} | צמתים: ${graph.cyNodes.length} | קשתות: ${graph.cyEdges.length}</p>${communityInfo}${metricInfo}`
    : `<p>Global network overview${focusText} | Nodes: ${graph.cyNodes.length} | Edges: ${graph.cyEdges.length}</p>${communityInfo}${metricInfo}`;

  renderMetricsBox("networkMetrics", graph.cyNodes, graph.cyEdges);
}

function scoreTreeEdge(edge, baseNodeId) {
  const otherId = edge.source === baseNodeId ? edge.target : edge.source;
  const other = nodeById(otherId);
  return num(other?.a_in_degree) + num(other?.c_in_wdeg) + num(other?.c_out_wdeg);
}

function buildTraditionTree(seed, predicates, direction, depth, fanout) {
  const predSet = new Set(predicates);
  const edges = APP.gEdges.filter(e => predSet.has(e.predicate));

  const byOut = new Map();
  const byIn = new Map();
  edges.forEach(e => {
    if (!byOut.has(e.source)) byOut.set(e.source, []);
    if (!byIn.has(e.target)) byIn.set(e.target, []);
    byOut.get(e.source).push(e);
    byIn.get(e.target).push(e);
  });

  const depthMap = new Map([[seed, 0]]);
  const nodes = new Set([seed]);
  const outEdges = [];
  const outKeys = new Set();
  let frontier = new Set([seed]);

  for (let d = 0; d < depth; d++) {
    const next = new Set();
    for (const n of frontier) {
      let cand = [];
      if (direction === "out" || direction === "both") cand = cand.concat(byOut.get(n) || []);
      if (direction === "in" || direction === "both") cand = cand.concat(byIn.get(n) || []);

      cand.sort((a, b) => scoreTreeEdge(b, n) - scoreTreeEdge(a, n));
      cand = cand.slice(0, fanout);

      cand.forEach(e => {
        const other = e.source === n ? e.target : e.source;
        const key = `${e.source}|${e.target}|${e.predicate}`;
        if (!outKeys.has(key)) {
          outKeys.add(key);
          outEdges.push(e);
        }
        nodes.add(e.source);
        nodes.add(e.target);

        if (!depthMap.has(other)) depthMap.set(other, d + 1);
        if (!depthMap.has(e.source)) depthMap.set(e.source, d + 1);
        if (!depthMap.has(e.target)) depthMap.set(e.target, d + 1);

        if (!next.has(other) && !frontier.has(other)) next.add(other);
      });
    }
    frontier = next;
    if (!frontier.size) break;
  }

  const levelCounts = {};
  depthMap.forEach(v => {
    levelCounts[v] = (levelCounts[v] || 0) + 1;
  });

  const predicateCounts = outEdges.reduce((a, e) => {
    a[e.predicate] = (a[e.predicate] || 0) + 1;
    return a;
  }, {});

  const cyNodes = [...nodes].map(id => {
    const n = nodeById(id) || { id, label: id, kind: "unknown" };
    return { data: { id, label: labelOf(n), kind: kindOf(n), community: n.community, role: roleOf(n), depth: depthMap.get(id) ?? 0 } };
  });
  const cyEdges = outEdges.slice(0, 3200).map(e => ({ data: { id: `t-${e.id}-${e.source}-${e.target}`, source: e.source, target: e.target, predicate: e.predicate, layer: e.layer, weight: e.weight } }));

  return { cyNodes, cyEdges, levelCounts, predicateCounts };
}

function renderTraditionSummary(summary) {
  const levels = Object.entries(summary.levelCounts).sort((a, b) => num(a[0]) - num(b[0])).map(([lvl, c]) => `${APP.lang === "he" ? "עומק" : "Depth"} ${lvl}: ${c}`).join(" | ");
  const preds = Object.entries(summary.predicateCounts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([k, c]) => `${localizePredicate(k)}: ${c}`).join(" | ");
  document.getElementById("traditionSummary").innerHTML = APP.lang === "he"
    ? `<p><strong>תקציר עץ:</strong> צמתים ${summary.cyNodes.length}, קשתות ${summary.cyEdges.length}</p><p>${levels}</p><p><strong>Predicates מובילים:</strong> ${preds || "-"}</p>`
    : `<p><strong>Tree summary:</strong> nodes ${summary.cyNodes.length}, edges ${summary.cyEdges.length}</p><p>${levels}</p><p><strong>Top predicates:</strong> ${preds || "-"}</p>`;
}

async function analyzePerson() {
  const pid = resolveInputToId(document.getElementById("personInput").value);
  if (!pid || !APP.gNodeById.has(pid)) {
    document.getElementById("wikidataBox").innerHTML = `<p class="status-err">${APP.lang === "he" ? "דמות/ישות לא נמצאה." : "Person/entity not found."}</p>`;
    return;
  }

  setSelectedNode(pid);

  const ego = subgraphFromSeed(pid, {
    layers: selValues("networkLayerFilter"),
    predicates: selValues("networkPredicateFilter"),
    kinds: selValues("networkNodeKindFilter"),
    hops: 1,
    maxEdges: 1800,
    mode: "ego"
  });
  buildCy("egoNetwork", ego.cyNodes, ego.cyEdges, "kind", false, "ego");

  let selectedPreds = selValues("personTreePredicate");
  if (!selectedPreds.length) selectedPreds = ["teacherOf"];

  const dir = document.getElementById("personTreeDirection").value;
  const depth = Math.max(1, Math.min(5, num(document.getElementById("personTreeDepth").value)));
  const fanout = Math.max(2, Math.min(20, num(document.getElementById("personTreeFanout").value)));
  const layoutMode = document.getElementById("personTreeLayout").value === "radial" ? "radial" : "breadth";

  const tree = buildTraditionTree(pid, selectedPreds, dir, depth, fanout);
  buildCy("treeNetwork", tree.cyNodes, tree.cyEdges, "community", true, "tree", layoutMode);
  renderTraditionSummary(tree);

  renderMetricsBox("personStats", ego.cyNodes, ego.cyEdges);
  await loadWikidataForEntity(pid);
}

function parseWikidataTime(claims, pid) {
  const arr = claims?.[pid] || [];
  if (!arr.length) return null;
  const val = arr[0]?.mainsnak?.datavalue?.value?.time;
  if (!val) return null;
  const m = val.match(/([+-]\d{1,6})-/);
  return m ? Number(m[1]) : null;
}

function periodFromYear(y) {
  if (!Number.isFinite(y)) return "";
  if (y < 0) return `${Math.ceil(Math.abs(y) / 100)}th c. BCE`;
  return `${Math.floor((y - 1) / 100) + 1}th c. CE`;
}

function hasClaimQid(claims, property, qid) {
  const arr = claims?.[property] || [];
  return arr.some(x => x?.mainsnak?.datavalue?.value?.id === qid);
}

function scoreWikidataCandidate(e, searchLabel) {
  const label = e.labels?.he?.value || e.labels?.en?.value || "";
  const desc = (e.descriptions?.he?.value || e.descriptions?.en?.value || "").toLowerCase();
  let score = 0;
  if (norm(label) === norm(searchLabel)) score += 3;
  if (hasClaimQid(e.claims, "P31", "Q5")) score += 4;
  if (desc.includes("rabbi") || desc.includes("jewish") || desc.includes("scholar") || desc.includes("רב") || desc.includes("חכם")) score += 4;
  if (parseWikidataTime(e.claims, "P569") || parseWikidataTime(e.claims, "P570")) score += 2;
  return score;
}

async function loadWikidataForEntity(entityId) {
  const n = nodeById(entityId);
  const label = labelOf(n);
  const cacheKey = `${APP.lang}:${label}`;
  const box = document.getElementById("wikidataBox");

  if (APP.wikidataCache.has(cacheKey)) {
    box.innerHTML = APP.wikidataCache.get(cacheKey);
    return;
  }

  box.innerHTML = `<p>${APP.lang === "he" ? "מחפש ב-Wikidata עבור:" : "Searching Wikidata for:"} ${esc(label)}</p>`;

  try {
    const lang = APP.lang === "he" ? "he" : "en";
    const sr = await fetch(`https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(label)}&language=${lang}&format=json&origin=*`);
    const sj = await sr.json();
    const ids = (sj.search || []).slice(0, 8).map(x => x.id);

    if (!ids.length) {
      const html = `<p class="status-warn">${APP.lang === "he" ? "לא נמצאו התאמות ב-Wikidata." : "No Wikidata matches found."}</p>`;
      box.innerHTML = html;
      APP.wikidataCache.set(cacheKey, html);
      return;
    }

    const er = await fetch(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${ids.join('|')}&props=labels|descriptions|claims&languages=he|en&format=json&origin=*`);
    const ej = await er.json();
    const ents = Object.values(ej.entities || {})
      .map(e => ({
        id: e.id,
        label: e.labels?.he?.value || e.labels?.en?.value || e.id,
        desc: e.descriptions?.he?.value || e.descriptions?.en?.value || "",
        birth: parseWikidataTime(e.claims, "P569") ?? "",
        death: parseWikidataTime(e.claims, "P570") ?? "",
        period: periodFromYear(parseWikidataTime(e.claims, "P569")),
        score: scoreWikidataCandidate(e, label)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const scoreLabel = APP.lang === "he" ? "ציון התאמה" : "Match score";
    const html = `<table class="table"><thead><tr><th>QID</th><th>${APP.lang === "he" ? "תווית" : "Label"}</th><th>${APP.lang === "he" ? "תיאור" : "Description"}</th><th>${APP.lang === "he" ? "לידה" : "Birth"}</th><th>${APP.lang === "he" ? "פטירה" : "Death"}</th><th>${APP.lang === "he" ? "תקופה" : "Period"}</th><th>${scoreLabel}</th></tr></thead><tbody>${ents.map(r => `<tr><td>${esc(r.id)}</td><td>${esc(r.label)}</td><td>${esc(r.desc)}</td><td>${esc(r.birth)}</td><td>${esc(r.death)}</td><td>${esc(r.period)}</td><td>${esc(r.score)}</td></tr>`).join('')}</tbody></table>`;

    box.innerHTML = html;
    APP.wikidataCache.set(cacheKey, html);
  } catch (e) {
    box.innerHTML = `<p class="status-err">${APP.lang === "he" ? "חיפוש Wikidata נכשל:" : "Wikidata lookup failed:"} ${esc(e.message || String(e))}</p>`;
  }
}

function initMap() {
  if (!APP.map) APP.map = {invalidateSize(){}, fitBounds(){}, setView(){}};
}

function setGeoRecordsPanelVisible(visible) {
  const card = document.getElementById("geoRecordsCard");
  if (!card) return;
  card.classList.toggle("hidden", !visible);
}

function setGeoOverlayPredicateVisible(visible) {
  const wrap = document.getElementById("geoOverlayPredicateWrap");
  if (!wrap) return;
  wrap.classList.toggle("hidden", !visible);
}

function renderGeoLinkedRecords(placeNode, placeEdges) {
  const wrap = document.getElementById("geoRecordsWrap");
  if (!wrap) return;
  if (!placeNode) {
    wrap.innerHTML = "";
    return;
  }

  const edges = placeEdges.filter(e => e.target === placeNode.id);
  const bySource = new Map();

  edges.forEach(e => {
    const src = nodeById(e.source);
    const key = e.source;
    if (!bySource.has(key)) {
      bySource.set(key, {
        sourceId: e.source,
        label: labelOf(src || { id: e.source }),
        kind: kindOf(src || { kind: "unknown" }),
        count: 0,
        predicates: new Map()
      });
    }
    const row = bySource.get(key);
    row.count += 1;
    row.predicates.set(e.predicate, (row.predicates.get(e.predicate) || 0) + 1);
  });

  const rows = [...bySource.values()]
    .map(r => ({
      ...r,
      predText: [...r.predicates.entries()].sort((a, b) => b[1] - a[1]).map(([p, c]) => `${localizePredicate(p)}:${c}`).join(" | ")
    }))
    .sort((a, b) => b.count - a.count);

  const title = APP.lang === "he" ? `רשומות מקושרות למקום: ${labelOf(placeNode)} (${placeNode.id})` : `Linked records for place: ${labelOf(placeNode)} (${placeNode.id})`;
  const noRows = APP.lang === "he" ? "לא נמצאו רשומות מקושרות." : "No linked records found.";

  wrap.innerHTML = rows.length
    ? `<p><strong>${esc(title)}</strong> | ${rows.length}</p><table class="table"><thead><tr><th>${APP.lang === "he" ? "ישות" : "Entity"}</th><th>${APP.lang === "he" ? "סוג" : "Kind"}</th><th>${APP.lang === "he" ? "כמות קישורים" : "Links"}</th><th>Predicates</th><th>${APP.lang === "he" ? "פעולות" : "Actions"}</th></tr></thead><tbody>${rows.map(r => `<tr><td>${esc(r.label)}<br/><small>${esc(r.sourceId)}</small></td><td>${esc(localizeKind(r.kind))}</td><td>${esc(r.count)}</td><td>${esc(r.predText)}</td><td><button class="btn ghost geo-open-source" data-id="${esc(r.sourceId)}">${APP.lang === "he" ? "מקור" : "Source"}</button></td></tr>`).join("")}</tbody></table>`
    : `<p class="status-warn">${esc(noRows)}</p>`;

  document.querySelectorAll(".geo-open-source").forEach(btn => {
    btn.onclick = () => jumpToSourceByNodeId(btn.getAttribute("data-id"));
  });
}

function openGeoPlaceDetails(placeId, placeEdges, forceOpenPanel = true) {
  const place = nodeById(placeId);
  if (!place) return;
  if (forceOpenPanel) setGeoRecordsPanelVisible(true);
  renderGeoLinkedRecords(place, placeEdges);
}

let worldOutlinesPromise = null;
async function drawGeo() {
  await loadGraphIfNeeded(document.getElementById("dataMode")?.value || "lite");
  initMap();
  const selectedPreds = new Set(selValues("geoPredicateFilter"));
  const overlay = document.getElementById("geoNetworkOverlay").checked;
  const overlayPreds = new Set(selValues("geoOverlayPredicate"));
  const pEdges = APP.gEdges.filter(e => e.subtype === "place" && (!selectedPreds.size || selectedPreds.has(e.predicate)));
  const pEdgePlaceIds = selectedPreds.size ? new Set(pEdges.map(e => e.target)) : null;
  const places = APP.gNodes.filter(n => kindOf(n) === "place" && n.lat !== null && n.lon !== null && n.lat !== "" && n.lon !== "" && (!pEdgePlaceIds || pEdgePlaceIds.has(n.id)));
  if (!worldOutlinesPromise) worldOutlinesPromise = fetch("data/optimized/world-outline.json").then(r => {if(!r.ok) throw new Error("Missing local geography");return r.json();});
  const countries = await worldOutlinesPromise;
  const W=1100,H=540;
  const lng=places.map(p=>num(p.lon)),lat=places.map(p=>num(p.lat));
  let west=lng.length?Math.max(-180,Math.min(...lng)-13):-35;
  let east=lng.length?Math.min(180,Math.max(...lng)+13):75;
  let south=lat.length?Math.max(-86,Math.min(...lat)-10):3;
  let north=lat.length?Math.min(86,Math.max(...lat)+10):72;
  if(east-west<55){const mid=(east+west)/2;west=mid-27.5;east=mid+27.5;}
  if(north-south<32){const mid=(north+south)/2;south=mid-16;north=mid+16;}
  const X=x=>(num(x)-west)/(east-west)*W;
  const Y=y=>(north-num(y))/(north-south)*H;
  const geomPath = g => {
    const polys = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
    const segments=[];
    for (const poly of polys) for (const ring of poly) {
      if(ring.length<3)continue;
      segments.push(ring.map((v,i)=>`${i?'L':'M'}${X(v[0]).toFixed(1)},${Y(v[1]).toFixed(1)}`).join('')+'Z');
    }
    return segments.join('');
  };
  const lines=[];
  if(overlay){
    const bySource=new Map();
    for(const e of pEdges){if(overlayPreds.size&&!overlayPreds.has(e.predicate))continue;
      if(!bySource.has(e.source))bySource.set(e.source,[]);bySource.get(e.source).push(e.target);}
    for(const ids of bySource.values()){
      for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){
        if(lines.length>=1300)break;
        const a=nodeById(ids[i]),b=nodeById(ids[j]);if(a?.lat!=null&&b?.lat!=null)lines.push(`<path d="M${X(a.lon).toFixed(1)} ${Y(a.lat).toFixed(1)} L${X(b.lon).toFixed(1)} ${Y(b.lat).toFixed(1)}"/>`);
      }
    }
  }
  const grid=[];
  for(let i=-180;i<=180;i+=20)if(i>west&&i<east)grid.push(`<line x1="${X(i)}" y1="0" x2="${X(i)}" y2="${H}"/>`);
  for(let i=-80;i<=80;i+=20)if(i>south&&i<north)grid.push(`<line x1="0" y1="${Y(i)}" x2="${W}" y2="${Y(i)}"/>`);
  const heatRadius=Math.max(5,Math.min(40,num(document.getElementById("heatRadius")?.value||18)));
  const heatCircles=places.map(p=>{
    const size=Math.max(7,Math.min(85,Math.sqrt(num(p.place_in)||1)*heatRadius*.66));
    return `<circle cx="${X(p.lon).toFixed(1)}" cy="${Y(p.lat).toFixed(1)}" r="${size}" fill="url(#heatGlow)" opacity=".36" pointer-events="none"/>`;
  }).join('');
  const circles=places.map(p=>{
    const radius=Math.max(3,Math.min(13,Math.sqrt(num(p.place_in)||1)+1.7));
    return `<circle class="geo-point" data-id="${esc(p.id)}" cx="${X(p.lon).toFixed(1)}" cy="${Y(p.lat).toFixed(1)}" r="${radius}" tabindex="0"><title>${esc(labelOf(p))} · ${esc(p.id)} · ${num(p.place_in)} </title></circle>`;
  }).join('');
  document.getElementById("geoMap").innerHTML=`<div class="geo-local-hint">${APP.lang==='he'?'מפה וקטורית מקומית · ללא אריחי רשת · לחצו על נקודה לפתיחת רשומות':'Offline vector map · click a point for linked records'}</div><div class="geo-zoom-buttons"><button type="button" class="geo-zoom-in" aria-label="Zoom in">+</button><button type="button" class="geo-zoom-out" aria-label="Zoom out">−</button><button type="button" class="geo-zoom-reset" aria-label="Reset zoom">↺</button></div><svg class="geo-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Place relations by geographic coordinate"><defs><radialGradient id="heatGlow"><stop offset="0" stop-color="#ac653e" stop-opacity=".75"/><stop offset="1" stop-color="#ac653e" stop-opacity="0"/></radialGradient></defs><rect width="${W}" height="${H}" fill="#e5ece8"/><g id="geoZoomGroup"><g stroke="#ccd8d0" stroke-width="1" opacity=".7">${grid.join('')}</g><g fill="#efece4" stroke="#aab9b0" stroke-width=".8">${countries.map(g=>`<path d="${geomPath(g)}"/>`).join('')}</g><g>${heatCircles}</g><g fill="none" stroke="#a35f48" stroke-width=".8" opacity=".27">${lines.join('')}</g><g fill="#247a83" fill-opacity=".87" stroke="#fff7e8" stroke-width="2">${circles}</g></g></svg>`;
  // Offline SVG map: wheel/drag/zoom controls preserve exploration without a tile service.
  const geoSvg=document.querySelector('#geoMap .geo-svg'), geoGroup=document.getElementById('geoZoomGroup');
  let zoom=1,offX=0,offY=0,dragging=false,last=null,moved=false;
  function paint(){geoGroup.setAttribute('transform',`translate(${offX} ${offY}) scale(${zoom})`);}
  function adjust(mult,cx=W/2,cy=H/2){
    const z=Math.max(1,Math.min(12,zoom*mult));
    const ratio=z/zoom;offX=cx-(cx-offX)*ratio;offY=cy-(cy-offY)*ratio;zoom=z;paint();
  }
  const pt=e=>{const rect=geoSvg.getBoundingClientRect();return [(e.clientX-rect.left)/rect.width*W,(e.clientY-rect.top)/rect.height*H]};
  geoSvg.addEventListener('wheel',e=>{e.preventDefault();const [x,y]=pt(e);adjust(e.deltaY<0?1.17:.85,x,y);},{passive:false});
  geoSvg.addEventListener('pointerdown',e=>{if(e.target.closest('.geo-point'))return;dragging=true;moved=false;last=pt(e);geoSvg.setPointerCapture(e.pointerId);});
  geoSvg.addEventListener('pointermove',e=>{if(!dragging)return;const curr=pt(e);offX+=curr[0]-last[0];offY+=curr[1]-last[1];moved=true;last=curr;paint();});
  geoSvg.addEventListener('pointerup',()=>{dragging=false;last=null;});
  document.querySelector('#geoMap .geo-zoom-in').onclick=()=>adjust(1.35);
  document.querySelector('#geoMap .geo-zoom-out').onclick=()=>adjust(1/1.35);
  document.querySelector('#geoMap .geo-zoom-reset').onclick=()=>{zoom=1;offX=0;offY=0;paint();};
  document.querySelectorAll(".geo-point").forEach(el=>{
    el.addEventListener("click",()=>openGeoPlaceDetails(el.dataset.id,pEdges,true));
    el.addEventListener("keydown",ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();openGeoPlaceDetails(el.dataset.id,pEdges,true);}});
  });
  const counts=new Map();
  for(const e of pEdges){const key=`${e.target}::${e.predicate}`;counts.set(key,(counts.get(key)||0)+1);}
  const rows=places.map(p=>({
    id:p.id,label:labelOf(p),lat:p.lat,lon:p.lon,place_in:p.place_in||0,
    predicates:[...counts].filter(([k])=>k.startsWith(`${p.id}::`)).map(([k,v])=>`${k.split('::')[1]}:${v}`).join(' | ')
  })).sort((a,b)=>num(b.place_in)-num(a.place_in));
  const cols=["id","label","lat","lon","place_in","predicates"];
  document.getElementById("placeTableWrap").innerHTML=`<table class="table"><thead><tr>${cols.map(c=>`<th>${c}</th>`).join('')}<th>${APP.lang==='he'?'רשומות':'Records'}</th></tr></thead><tbody>${rows.map(r=>`<tr data-place-id="${esc(r.id)}">${cols.map(c=>`<td>${esc(r[c])}</td>`).join('')}<td><button class="btn ghost geo-open-place" data-place-id="${esc(r.id)}">${APP.lang==='he'?'פתח':'Open'}</button></td></tr>`).join('')}</tbody></table>`;
  document.querySelectorAll(".geo-open-place").forEach(btn=>btn.onclick=e=>{e.stopPropagation();openGeoPlaceDetails(btn.dataset.placeId,pEdges,true)});
  document.querySelectorAll("#placeTableWrap tbody tr").forEach(tr=>tr.onclick=()=>openGeoPlaceDetails(tr.dataset.placeId,pEdges,true));
}


function showLoadingOverlay(msg) {
  let el = document.getElementById("_loadOverlay");
  if (!el) {
    el = document.createElement("div");
    el.id = "_loadOverlay";
    el.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;z-index:9999;";
    el.innerHTML = `<div style="background:#fff;padding:1.5rem 2rem;border-radius:12px;font-size:1.1rem;color:#1b2430">${esc(msg)}</div>`;
    document.body.appendChild(el);
  } else {
    el.querySelector("div").textContent = msg;
  }
}
function hideLoadingOverlay() {
  document.getElementById("_loadOverlay")?.remove();
}

function showNetworkReadyPrompt() {
  const el = document.getElementById("networkInfo");
  if (!el) return;
  el.innerHTML = `<p style="color:var(--muted);">${APP.lang === "he" ? "לחץ על \u2018בניית רשת כללית\u2019 כדי לטעון מבט-על (5.5MB). אפשר לבחור ישות למיקוד, אך זה אופציונלי." : "Click \u2018Build Global Network\u2019 to load the broad overview (5.5 MB). Focus entity is optional."}</p>`;
}

async function loadInitialGlobalNetwork() {
  const msg = APP.lang === "he" ? "טוען רשת כללית ראשונית..." : "Loading initial global network...";
  showLoadingOverlay(msg);
  try {
    await ensureCytoscape();
    await loadGraphIfNeeded(document.getElementById("dataMode").value);
    buildGlobalNetwork();
  } catch (e) {
    showNetworkReadyPrompt();
    document.getElementById("networkInfo").innerHTML += `<p class="status-err">${esc(e?.message || String(e))}</p>`;
  } finally {
    hideLoadingOverlay();
  }
}

async function runSourceSearch() {
  const qRaw = document.getElementById("sourceSearch").value.trim();
  if (!qRaw) {
    document.getElementById("sourceHits").innerHTML = "";
    document.getElementById("sourceContext").textContent = "";
    return;
  }

  // Lazy-load source text (1.8 MB) only on first search
  if (!APP.sourceText) {
    const box = document.getElementById("sourceHits");
    box.innerHTML = `<p>${APP.lang === "he" ? "טוען טקסט מקור..." : "Loading source text..."}</p>`;
    try {
      await ensureSourceTextLoaded();
    } catch (e) {
      box.innerHTML = `<p class="status-err">${esc(e.message)}</p>`;
      return;
    }
  }

  const q = norm(qRaw);
  const hits = [];
  for (let i = 0; i < APP.sourceLines.length; i++) {
    if (norm(APP.sourceLines[i]).includes(q)) {
      hits.push({ lineNo: i + 1, text: APP.sourceLines[i] });
      if (hits.length >= 300) break;
    }
  }

  document.getElementById("sourceHits").innerHTML = `<table class="table"><thead><tr><th>${APP.lang === "he" ? "שורה" : "Line"}</th><th>${APP.lang === "he" ? "טקסט" : "Text"}</th></tr></thead><tbody>${hits.map(h => `<tr data-line="${h.lineNo}"><td>${h.lineNo}</td><td>${esc(h.text)}</td></tr>`).join("")}</tbody></table><p>${hits.length} ${APP.lang === "he" ? "תוצאות" : "hits"}</p>`;

  document.querySelectorAll("#sourceHits tbody tr").forEach(tr => {
    tr.onclick = () => {
      const line = num(tr.getAttribute("data-line"));
      const s = Math.max(1, line - 4);
      const e = Math.min(APP.sourceLines.length, line + 4);
      const chunk = [];
      for (let i = s; i <= e; i++) {
        chunk.push(`${String(i).padStart(6, " ")} | ${APP.sourceLines[i - 1]}`);
      }
      document.getElementById("sourceContext").textContent = chunk.join("\n");
    };
  });
}

function setupCrossLinks() {
  document.querySelectorAll(".jump-tab").forEach(b => {
    b.onclick = () => activateTab(b.getAttribute("data-tab"));
  });
}

function saveShareLink() {
  const params = new URLSearchParams();
  params.set("tab", APP.activeTab);
  params.set("lang", APP.lang);
  if (APP.selectedNodeId) params.set("entity", APP.selectedNodeId);
  if (APP.activeTab === "lenses" && window.AtlasResearch) params.set("lens",window.AtlasResearch.getCurrent());

  const url = `${location.origin}${location.pathname}?${params.toString()}`;
  navigator.clipboard.writeText(url);

  const btn = document.getElementById("saveState");
  btn.dataset.stateCopied = "1";
  btn.textContent = t("copied");
  setTimeout(() => {
    btn.dataset.stateCopied = "";
    btn.textContent = t("copy_link");
  }, 1200);
}

function hydrateFromUrl() {
  const p = new URLSearchParams(location.search);
  const tab = p.get("tab");
  const lang = p.get("lang");
  const ent = p.get("entity");
  if (lang === "he" || lang === "en") APP.lang = lang;
  if (tab && I18N.he.tabs[tab]) APP.activeTab = tab;
  if (ent) APP.selectedNodeId = ent;
}

async function runValidation() {
  const checks = [];
  await ensureReportDocsLoaded();
  checks.push(["README", !!APP.docs.readme]);
  checks.push(["Research Questions", !!APP.docs.researchQuestions]);
  checks.push(["Main report EN", !!APP.docs.reportEN]);
  checks.push(["Main report HE", !!APP.docs.reportHE]);
  checks.push(["Appendix", !!APP.docs.appendix]);
  checks.push(["Data dictionary", !!APP.docs.dataDictionary]);
  checks.push(["Graph summary", !!APP.docs.graphSummary]);
  // Source text is lazy-loaded; verify reachability with a partial GET
  const srcOk = await fetch(withBuildVersion(DATA_PATHS.sourceText)).then(r => r.ok).catch(() => false);
  checks.push(["Source text (reachable)", srcOk]);
  checks.push(["Node metrics rows == 5124", APP.nodes.length === 5124]);

  await loadGraphIfNeeded("lite");
  checks.push(["Lite graph nodes == 5128", APP.gNodes.length === 5128]);
  checks.push(["Lite graph edges > 10000", APP.gEdges.length > 10000]);

  // Verify full GEXF is reachable without downloading 57MB
  const gexfOk = await fetch(withBuildVersion(DATA_PATHS.graphFull), {method:"HEAD"}).then(r => r.ok).catch(() => false);
  checks.push(["Optimized full graph reachable (not downloaded)", gexfOk]);

  const figOk = await Promise.all(Object.values(FIGURES).map(async f => {
    try {
      const r = await fetch(withBuildVersion(`data/figures/${f.file}`));
      return r.ok;
    } catch {
      return false;
    }
  }));
  checks.push([`Figures reachable (${Object.keys(FIGURES).length})`, figOk.every(Boolean)]);

  const pass = checks.filter(x => x[1]).length;
  document.getElementById("validationResult").innerHTML = `<p><strong>${pass}</strong> ${APP.lang === "he" ? "עברו" : "pass"} / <strong>${checks.length - pass}</strong> ${APP.lang === "he" ? "נכשלו" : "fail"}</p><ul>${checks.map(([n, ok]) => `<li class="${ok ? "status-ok" : "status-err"}">${ok ? "PASS" : "FAIL"} - ${esc(n)}</li>`).join("")}</ul>`;
}

function setExtraFeaturesFromResearch() {
  const items = APP.lang === "he"
    ? [
        "Sankey של זרימה: source kind -> predicate -> target kind להבנת קומפוזיציית הקשרים",
        "Tradition Tree משופר עם עומק, fanout, כיוון ופריסה רדיאלית",
        "Network-on-map overlay בין מקומות לפי קשרי מקום משותפים",
        "העשרת Wikidata עם דירוג התאמה, שנים ותקופה",
        "קישוריות בין טאבים: בחירת ישות אחת שממשיכה לכל זרימות העבודה"
      ]
    : [
        "Sankey flow: source kind -> predicate -> target kind for relation composition",
        "Improved Tradition Tree with depth, fanout, direction, and radial layout",
        "Network-on-map overlay from shared place relations",
        "Wikidata enrichment with match ranking, years, and period",
        "Cross-tab continuity: one selected entity reused across workflows"
      ];
  document.getElementById("extraFeatures").innerHTML = items.map(x => `<li>${esc(x)}</li>`).join("");
}

function wireEvents() {
  document.getElementById("toggleNodeLabels").checked = APP.showNodeLabels;
  document.getElementById("toggleEdgeLabels").checked = APP.showEdgeLabels;
  updateCommunityControlsVisibility();
  setGeoRecordsPanelVisible(true);
  setGeoOverlayPredicateVisible(!!document.getElementById("geoNetworkOverlay")?.checked);
  setNetworkFullscreenButtonLabel();
  attachInfoButtons();

  const infoModal = document.getElementById("infoModal");
  document.getElementById("closeInfoModal").onclick = hideInfoModal;
  infoModal?.addEventListener("click", (evt) => {
    if (evt.target === infoModal) hideInfoModal();
  });

  document.getElementById("toggleNetworkFullscreen").onclick = async () => {
    const stage = document.getElementById("networkStage");
    if (!stage) return;
    if (!document.fullscreenElement) await stage.requestFullscreen();
    else await document.exitFullscreen();
  };

  document.addEventListener("fullscreenchange", () => {
    setNetworkFullscreenButtonLabel();
    if (APP.cyGlobal) {
      APP.cyGlobal.resize();
      APP.cyGlobal.fit(undefined, 20);
    }
  });

  document.getElementById("langToggle").onclick = () => {
    APP.lang = APP.lang === "he" ? "en" : "he";
    APP.wikidataCache.clear();
    applyLanguage();
    populateReportSelector();
    renderNodeTable();
  };

  document.getElementById("toggleNodeLabels").onchange = (e) => {
    APP.showNodeLabels = !!e.target.checked;
    applyLabelVisibilityToAllGraphs();
  };

  document.getElementById("toggleEdgeLabels").onchange = (e) => {
    APP.showEdgeLabels = !!e.target.checked;
    applyLabelVisibilityToAllGraphs();
  };

  ["nodeSearch", "kindFilter", "fourWayFilter", "communityFilter", "minProm"].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener("input", filterRawNodes);
    el.addEventListener("change", filterRawNodes);
  });

  ["layerFilter", "predicateFilter", "sourceKindFilter", "targetKindFilter", "sourceNodeFilter", "targetNodeFilter"].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener("change", clearEdgeTagFilters);
    el.addEventListener("input", clearEdgeTagFilters);
  });

  document.getElementById("exportNodes").onclick = () => {
    if (APP.filteredNodes.length) download("filtered_nodes.csv", csvFromObjects(APP.filteredNodes), "text/csv;charset=utf-8");
  };

  document.getElementById("runSourceSearch").onclick = runSourceSearch;
  document.getElementById("sourceSearch").addEventListener("keydown", e => {
    if (e.key === "Enter") runSourceSearch();
  });

  document.getElementById("runEdgeQuery").onclick = async () => {
    const msg = APP.lang === "he" ? "\u05d8וען גרף..." : "Loading graph...";
    if (!APP.gLoaded) showLoadingOverlay(msg);
    try {
      await loadGraphIfNeeded(document.getElementById("dataMode").value);
      runEdgeQuery();
    } finally { hideLoadingOverlay(); }
  };

  document.getElementById("exportEdges").onclick = () => {
    if (APP.currentEdgeResult.length) download("query_edges.csv", csvFromObjects(APP.currentEdgeResult), "text/csv;charset=utf-8");
  };

  document.getElementById("buildNetwork").onclick = async () => {
    const msg = APP.lang === "he" ? "\u05d8וען גרף (5.5MB)..." : "Loading graph (5.5 MB)...";
    if (!APP.gLoaded) showLoadingOverlay(msg);
    try {
      await ensureCytoscape();
      await loadGraphIfNeeded(document.getElementById("dataMode").value);
      buildGlobalNetwork();
    } finally { hideLoadingOverlay(); }
  };

  ["networkColorBy", "networkSeparateCommunities", "networkCommunityFilter", "networkCommunityCount", "networkHops", "networkLayerFilter", "networkPredicateFilter", "networkNodeKindFilter", "networkMaxEdges"].forEach(id => {
    const el = document.getElementById(id);
    const evt = el.tagName === "INPUT" ? "input" : "change";
    el.addEventListener(evt, () => {
      if (id === "networkColorBy") updateCommunityControlsVisibility();
      if (APP.gLoaded && APP.cyGlobal) buildGlobalNetwork();
    });
  });

  document.getElementById("networkLayoutPreset")?.addEventListener("change", () => {
    updateCommunityControlsVisibility();
    if (APP.gLoaded && APP.cyGlobal) buildGlobalNetwork();
  });

  document.getElementById("downloadGlobalPng").onclick = () => {
    downloadCyPng(APP.cyGlobal, "global_network.png");
  };

  document.getElementById("analyzePerson").onclick = async () => {
    const msg = APP.lang === "he" ? "\u05d8וען גרף..." : "Loading graph...";
    if (!APP.gLoaded) showLoadingOverlay(msg);
    try {
      await ensureCytoscape();
      await loadGraphIfNeeded(document.getElementById("dataMode").value);
      await analyzePerson();
    } finally { hideLoadingOverlay(); }
  };

  document.getElementById("openPersonSource").onclick = () => {
    const id = resolveInputToId(document.getElementById("personInput").value);
    if (id) jumpToSourceByNodeId(id);
  };

  document.getElementById("downloadTreePng").onclick = () => {
    downloadCyPng(APP.cyTree, "tradition_tree.png");
  };

  document.getElementById("drawGeo").onclick = async () => {
    const msg = APP.lang === "he" ? "\u05d8וען גרף..." : "Loading graph...";
    if (!APP.gLoaded) showLoadingOverlay(msg);
    try {
      await drawGeo();
    } finally { hideLoadingOverlay(); }
  };

  document.getElementById("geoNetworkOverlay")?.addEventListener("change", (e) => {
    setGeoOverlayPredicateVisible(!!e.target.checked);
    if (APP.gLoaded) drawGeo().catch(() => {});
  });

  document.getElementById("geoPredicateFilter")?.addEventListener("change", () => {
    if (APP.gLoaded) drawGeo().catch(() => {});
  });

  document.getElementById("heatRadius")?.addEventListener("input", () => {
    if (APP.gLoaded) drawGeo().catch(() => {});
  });

  document.getElementById("geoOverlayPredicate")?.addEventListener("change", () => {
    if (APP.gLoaded) drawGeo().catch(() => {});
  });

  document.getElementById("runValidation").onclick = runValidation;
  document.getElementById("saveState").onclick = saveShareLink;

  document.getElementById("dataMode").onchange = () => {
    APP.gLoaded = false;
    APP.gMode = "";
  };

  setupCrossLinks();
}

let _cyPromise = null;
function ensureCytoscape() {
  if (window.cytoscape) return Promise.resolve();
  if (_cyPromise) return _cyPromise;
  _cyPromise = new Promise((resolve,reject) => {
    const s=document.createElement("script");s.src="assets/vendor/cytoscape.min.js";
    s.onload=resolve;s.onerror=()=>reject(new Error("Local Cytoscape unavailable"));
    document.head.appendChild(s);
  });
  return _cyPromise;
}
let _plotlyPromise = null;
function ensurePlotly() {
  if (window.Plotly) return Promise.resolve();
  if (_plotlyPromise) return _plotlyPromise;
  _plotlyPromise = new Promise((resolve,reject) => {
    const s=document.createElement("script");s.src="assets/vendor/plotly.min.js";
    s.onload=resolve;s.onerror=()=>reject(new Error("Local Plotly unavailable"));
    document.head.appendChild(s);
  });
  return _plotlyPromise;
}
async function ensureReportDocsLoaded() {
  if (APP.reportPromise) return APP.reportPromise;
  APP.reportPromise = (async()=>{
    const keys = [["readme",DATA_PATHS.readme],["researchQuestions",DATA_PATHS.researchQuestions],
      ["reportEN",DATA_PATHS.reportEN],["reportHE",DATA_PATHS.reportHE],
      ["appendix",DATA_PATHS.appendix],["dataDictionary",DATA_PATHS.dataDictionary],
      ["graphSummary",DATA_PATHS.graphSummary]];
    const result = await Promise.all(keys.map(async ([key,path]) => [key,await getText(path)]));
    APP.docs = Object.fromEntries(result);
    populateReportSelector();
    populateFigureExplorer();
  })();
  return APP.reportPromise;
}
async function init() {
  if (handleMismatchedHtml()) return;
  hydrateFromUrl();
  applyLanguage();
  const nodeCsv = await getText(DATA_PATHS.nodeMetrics);
  APP.nodes = parseCsv(nodeCsv).map(r => ({
    ...r, a_in_degree:num(r.a_in_degree), b_wdegree:num(r.b_wdegree),
    c_in_wdeg:num(r.c_in_wdeg), c_out_wdeg:num(r.c_out_wdeg),
    place_in:num(r.place_in), community:num(r.community)
  }));
  APP.nodeById = new Map(APP.nodes.map(n=>[n.id,n]));
  buildNormIndex();
  populateNodeDatalist();
  populateFilters();
  renderNetworkFunctionsHelp();
  renderTraditionExplain();
  setExtraFeaturesFromResearch();
  wireEvents();
  activateTab(APP.activeTab);
  setStatus();
  if(window.livingIndexContext)window.livingIndexContext();
  showNetworkReadyPrompt();
  window.dispatchEvent(new Event("referenceAtlasReady"));
  if (APP.activeTab === "reports") await ensureReportDocsLoaded();
  // Graphs, full text, reports and Plotly are loaded only when explicitly requested.
}

window.researchGoto = activateTab;
window.researchSelectEntity = setSelectedNode;
init().catch(err => {
  console.error(err);
  document.getElementById("validationResult").innerHTML = `<p class="status-err">Init error: ${esc(err.message || String(err))}</p>`;
});
