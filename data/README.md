# Shem HaGedolim Knowledge Graph — Research Package

*A self-contained delivery package: the essence of the project — the reports, the questions that drove them,
and the graph itself. Snapshot prepared 2026-08-05.*

---

## The project in brief

We turned the **Hida's *Shem HaGedolim*** (ר' חיים יוסף דוד אזולאי, 1774) — a biographical-and-bibliographical
dictionary of the Jewish scholarly tradition — into a **knowledge graph** and read it with network analysis. The
graph has **5,124 nodes** (1,484 scholars and 2,033 books that have their own entries, plus 632 externally-mentioned
scholars, 799 externally-mentioned books, and **176 places**) connected by **~130,000 edges** across a **three-layer
"multiplex" model**: (A) *editorial placement* — whom the Hida discusses inside whose entry; (B) *co-mention* — who
merely appears together; and (C) *stated typed relations* — the ~12,000 relationships the text actually asserts
(*cites, authored, teacher-of, commentary-on, disputed-with, parent-of, contemporary-of, soul-root-of*, and place
relations like *printed-in / rabbi-of / died-in*). Layers A and B are deterministic; Layer C and the entity linking
were produced with language models against a controlled vocabulary and validated against a human gold standard.

The analytical payoff is that the three layers describe the *same* people, so the findings live in **where the
layers disagree**. The full study answers the project's research questions (see `research_questions.md`) across six
themes: **who mattered and in what role** (a corpus-wide typology of *authorities* vs. *compilers*), **how Torah was
transmitted** (multi-generation lineages, and the finding that authority passed by discipleship, not blood), **the
world of books** (texts vs. people as loci of authority; a self-validating genealogy of foundational works), **the
Hida's own hand** (69% of his editorial connections are *tacit*; he stages the giants' controversies in third
parties' entries; he writes his own family into the graph as brokers), a **mystical lineage** (his *soul-root*/gilgul
statements form a genealogy *independent* of ordinary transmission, reserved for the canon's summits), and the
**geography of the book** (books were printed in the West — Venice, Amsterdam — while Torah was lived in the East —
Jerusalem, Izmir, Constantinople).

The package below contains the two reports (an accessible narrative in **English** and in **Hebrew**, plus a
technical appendix), the research questions, and the graph in a standard interchange format (GEXF, openable in
Gephi) together with a per-node table. An interactive web explorer of the graph is being prepared at
**hagdolim.dhlab.info**.

---

## What's in this package

```
delivery/
├─ README.md                    ← you are here (overview + project summary)
├─ research_questions.md         ← the original + extended research questions the reports answer
├─ reports/
│  ├─ hida_bookshelf.md          ← the study, written for a humanities reader (ENGLISH)
│  ├─ hida_bookshelf_accessible_HE.md   ← the same study in HEBREW (נגיש)
│  ├─ hida_bookshelf_appendix.md ← methods, metrics, null models, reproducibility, full limitations
│  └─ figures/                   ← F1–F20 (the maps and charts referenced in the reports)
└─ graph/
   ├─ hagdolim_kg.gexf           ← THE FULL GRAPH (all layers + places; open in Gephi)
   ├─ node_metrics.csv           ← per-node table (type, centralities, community, place coords)
   ├─ graph_summary.txt          ← counts + top nodes at a glance
   └─ DATA_DICTIONARY.md         ← what every column / layer / node type means
```

## How to read it
1. Start with **this summary**, then skim **`research_questions.md`** to see what was asked.
2. Read **`reports/hida_bookshelf.md`** (English) or **`…_accessible_HE.md`** (Hebrew) — six short chapters, each a
   historical question answered with evidence and honest caveats. The figures are in `reports/figures/`.
3. For methods and reproducibility, see **`reports/hida_bookshelf_appendix.md`**.
4. To explore the graph yourself, open **`graph/hagdolim_kg.gexf`** in **[Gephi](https://gephi.org)** (free), or read
   **`graph/node_metrics.csv`** in any spreadsheet. **`graph/DATA_DICTIONARY.md`** explains every field.

## A note on the figures
The charts label nodes/places by **id or English name** because the plotting library cannot render Hebrew; the
full Hebrew names are in the reports' text and in `node_metrics.csv`. A Hebrew-typeset figure set can be produced
for publication if needed.
