# The Hida's Bookshelf — Technical Appendix

*Methods, metrics, null models, and reproducibility for the narrative report
**[hida_bookshelf.md](hida_bookshelf.md)**. Kept separate so the main text stays readable. Everything here is
deterministic and reproducible; no claim in the report depends on a number not derivable from the tables in
`data/analysis/` via the scripts in `code/hagdolim/analysis/`.*

---

## A. Data provenance & scale

The graph is the output of the HagdolimKG pipeline (Stages 0–XII; see `documentation/research_plan_v2.md`):
deterministic parsing of the source into 3,535 entries → LLM mention extraction → candidate generation (lexical +
free lab-Ollama embeddings) → LLM entity linking (Sonnet-5, 22/22 letters, 19,591 links) → canonicalization &
node-QA (Opus; 4,338 nodes frozen) → deterministic Layer-A/B edges → **Layer-C relation extraction**
(`EntityConstrainedRelationGenerator`, Sonnet-5, ontology **hida-v1.1**, held-out test F1 ≈ 0.92) → multiplex
assembly.

**Assembled multiplex:** originally 4,948 nodes · 129,848 edges (**A** structural 15,285 · **B** association 103,608 ·
**C** semantic 11,033 aggregated / **12,191 raw** pre-symmetric-expansion). Node typology: I person-entry 1,484 ·
II person-external 632 · III book-entry 2,033 · IV book-external 799. **64** Louvain communities (baked into
`node_metrics.csv`). **With places (Stage XI): 5,124 nodes (+176 `V_place`) · 130,613 edges (+765 Layer-C place
edges, `subtype=place`).** Places are kept OUT of the person/book centralities and the Louvain partition (community
IDs verified unchanged), so all Chapters 1–5 numbers are unaffected; place nodes carry lat/long and a `place_in`
degree. Chapters 1–5 report the raw C convention; Chapter 6 uses the place layer.

**Count convention (binding).** Layer-C counts are **RAW** — as stored in `edges_semantic.jsonl`, i.e. *before*
symmetric predicates (`relativeOf`, `contemporaryOf`) are expanded into two directed edges. The `*_expanded`
columns in the substrate (copied from assembly) count symmetric ties twice and are retained only for provenance;
**all analysis uses the raw columns.** Raw C = 12,191; assembly's symmetric-expanded in-degree total = 12,907
(gap 716 = doubled symmetric edges); the "11,033" elsewhere is the count of *aggregated* directed C edges. These
three numbers are reconciled and are not in conflict.

---

## B. The analytical substrate

All Phase-1–4 scripts read one joined table, `data/analysis/substrate.csv` (built by `build_substrate.py`): per node,
its typing (`kind`, `class`, `four_way`, `in_set`), baked `community`, the four centralities, raw per-predicate
in/out profiles (`in_<pred>`, `out_<pred>` × 12), and — for in-set nodes (entry id == node id, 100% join) — entry
metadata (`n_chars`, `subsection`, `is_kuntres`, `system`). Two Phase-0 prerequisites: `self_nodes.json` (9 Azulai
candidates + 311 first-person entries, heuristic) and `authored_backbone.csv` (2,577 clean person→book pairs; only
**7** non-canonical `authored` edges exist corpus-wide, and **zero** book→book — correcting an earlier assumption of
"~375").

---

## C. Metrics (definitions)

| Report term | Column / computation | Meaning |
|---|---|---|
| **prominence** | `a_in_degree` = in-degree in Layer A | # entries invoking the node |
| **authority** | `c_in_raw` = Σ incoming C edges (raw) | cited / authored-by / commented-on |
| **compiling / productivity** | `c_out_raw` = Σ outgoing C edges (raw) | citing / authoring / commenting outward |
| **authority asymmetry** | `(c_in_raw − c_out_raw)/(c_in_raw + c_out_raw + 1)` | + = authority, − = compiler |
| **co-mention** | `b_wdegree` | weighted Layer-B degree (backdrop only) |
| **brokerage** | `betweenness_centrality` on A∪C (k-sampled, k≈500, seed 42) | on the paths between others |
| **circle** | `community` = Louvain on A∪C (seed 42, size-sorted) | 64 clusters |
| **chain depth** | longest directed path via SCC condensation | generations in a lineage / derivation |
| **articulation point** | `nx.articulation_points` (undirected) | removal fragments the network |

---

## D. Null models (how "more/less than chance" is judged)

One toolkit (`nulls.py`), version-independent (pure-python), seed 42:

- **Label-permutation** (T2.1 assortativity, T2.2 dispute geometry): shuffle community labels among nodes,
  recompute the within-circle share, 500–1000 reps → z-score. Tests concentration while holding the partition and
  edge set fixed.
- **Degree-preserving edge-swap** (T3.1 motifs): `directed_edge_swap_list` swaps (a,b),(c,d)→(a,d),(c,b), preserving
  every node's in/out degree and keeping the edge set simple; 10·|E| swaps, 200 reps → z-score. Undirected variant for
  dispute triangles.
- **Matched (degree-weighted) random pairs** (T2.4 soul-root): sample node pairs weighted by C-degree so random pairs
  match the degree profile of the observed pairs; 500 reps of |observed| pairs → z-score. The right null for "do
  observed X-pairs coincide with tie Y more than chance?"
- **Bipartite projection** (T3.2 co-citation): person↔book incidence → weighted one-mode projections.

---

## E. Analysis register (finding → script → outputs → null)

| Report claim | Script | Tables | Figure | Null / guardrail |
|---|---|---|---|---|
| Centrality rankings; layer overlap; structural backing P(A\|C=p) | `p1_rq1_centrality.py` | centrality_rankings, layer_overlap, predicate_structural_overlap | F1, F3 | — (descriptive) |
| Role typology (authority/compiler/balanced/connector/peripheral) | `p1_t11_roles.py` | role_typology | F2 | ARI vs single-metric bins ≤ 0.21 (**PASS**) |
| Circle relational genres; predicate assortativity | `p1_t21_communities.py` | community_profiles, predicate_assortativity | F4 | label-permutation (⚠ intra-C partly circular) |
| The silences (external attention) | `p1_t15_silences.py` | silences | F5 | — |
| Teacher lineages; articulation masters; kinship-vs-pedagogy | `p2_rq2_transmission.py` | lineages, kin_vs_school | F6 | — |
| Citation modes (P/B × P/B) | `p2_t13_citation_modes.py` | citation_modes | F7 | — |
| Book-derivation DAG; roots | `p2_t14_book_derivation.py` | book_derivation | F8 | root-vs-a_in validation |
| Author–book eclipse | `p2_t34_eclipse.py` | eclipse | F17 | — (on the clean authored backbone) |
| Dispute geometry (intra/inter circle; overlays) | `p2_t22_dispute.py` | dispute_geometry | F9 | label-permutation (z=+29; ⚠ circular) |
| Motif census | `p2_t31_motifs.py` | motifs | F14 | degree-preserving edge-swap, 200 reps |
| Co-citation clusters; bridge persons | `p2_t32_cocitation.py` | cocitation_bookclusters, cocitation_bridges | F15 | ARI vs Louvain = 0.297 |
| Tacit (A−C) residual; P(C=p\|A) | `p3_t12_tacit.py` | a_minus_c_by_predicate, a_minus_c_summary | F10 | — |
| Controversy staging (self vs 3rd-party host) | `p3_t23_controversy.py` | controversy_staging | F11 | — (uses entry_id provenance) |
| Attention residual (n_chars vs prominence) | `p3_dh_attention.py` | attention_residual | F12 | studentized residuals |
| Kuntres supplement stratum | `p3_dh_kuntres.py` | kuntres | — | — |
| Entry-centric vs ambient C | `p3_t25_entry_centric.py` | entry_centric, narrative_hubs | F_entry_centric | — |
| Self-position (Azulai + first-person) | `p3_t33_self.py` | self_position, first_person_summary | F16 | brokerage vs authority percentile |
| Soul-root coupling | `p4_t24_soulroot.py` | soulroot_coupling, soulroot_pairs | F13 | matched-random-pair, 500 reps |
| Geography (printing vs rabbinic; circle homelands; mobility/aliyah) | `p6_geography.py` | place_profiles, geography_mobility | F18 (map), F19, F20 | — (descriptive; place layer) |

**Key headline numbers** (raw convention): structural backing P(A\|C) — teacherOf 67% · relativeOf 57% · authored 55%
· parentOf 51% · cites 40% · commentaryOn 35% · glossOn 24%; overall 39% of C pairs also in A. Tacit share of A =
69%. Citation cited-object person 61% / text 39%. Kinship∩pedagogy 5.4%. Dispute third-party-hosted 72%. Entry
subject-incident 25% / ambient 75%. Soul-root: teacher/kin 3%, contemporary 0%, cites 4%, same-circle 52% (null 11%),
endpoints a_in pctile 78% / c_in pctile 86%, 100% cross-generational. Motifs: transitive-teacher z=−5.0,
dispute-triangle z=+4.9, student-cites-teacher z=+8.4.

---

## F. Reproducibility

- **Interpreters (two, by need).** `base` = `/Users/hadarmiller/anacondam1/anaconda3/bin/python` (numpy/pandas/
  sklearn/matplotlib; networkx 2.8) runs all Phase-1–4 analyses + figures. `m1cuda2` = `…/envs/m1cuda2/bin/python`
  (networkx 3.2.1) runs Phase-0/assembly graph algorithms (louvain) and originally `nulls.py`; `nulls.py` is now
  version-independent so it runs on `base` too. Each script's header names its interpreter.
- **Determinism.** Seed = 42 everywhere randomness appears (KMeans, betweenness sampling, all null models). All
  scripts are $0 (no LLM) and idempotent.
- **Rebuild order.** `build_substrate.py` → any `p1_*`/`p2_*`/`p3_*`/`p4_*`. Figures write to
  `documentation/report/figures/`; tables to `data/analysis/`.

---

## G. Limitations (full)

1. **No temporal data; geography now included but partial.** Chronology is inferred only through `contemporaryOf`
   (no birth/death years), so claims about "generations"/"across time" rest on graph depth, not dates. **Places were
   added in Stage XI** (Chapter 6): 176 gazetteer-resolved locations (lab `labgen` gazetteer; `code/hagdolim/places/`)
   attached as **Layer-C-only** edges (766), 92% of place-references resolved. Disambiguation is **region-first**
   (a generous Old-World country/lat-lon prior — the strongest signal ~95%, replacing the contaminated
   attached-flag prior), then curated overrides, then a candidate-aware gemini-2.5-flash pass for within-region ties
   (e.g. a Polish vs. Ukrainian town of the same name); an unresolved fallback handles the rest. Junk `'0'`-name
   gazetteer rows and biblical allusions (e.g. "כעדן") are filtered. Place relations are themselves Layer-C-partial
   (only where the text states a location), and ~8% remain unresolved. Ambiguous cases are logged for SME review in
   `data/analysis/place_duplicates_review.csv`.
2. **Layer B inflation.** Co-mention is a per-entry clique: one dense entry (Rambam's ~105 mentions) manufactures
   thousands of pairs. B is reported only as backdrop, with a clique down-weight available but not load-bearing here.
3. **Layer C is partial and model-extracted.** It captures a relation only where the text states one, so absence of a
   C edge is not evidence of absence of a relationship. Extraction is LLM-based (Sonnet-5, hida-v1.1), validated at
   held-out F1 ≈ 0.92 in the Stage-VIII model-selection study; residual extraction error is inherited by every C
   result.
4. **Community circularity.** Louvain used A∪C, so any statistic of the form "tie-type X stays within circles" is
   partly true by construction (flagged at T2.1, T2.2, T2.4). The *relative* ordering across predicates, and results
   that do **not** use community (role typology, tacit residual, citation modes, motifs, eclipse, controversy
   staging, soul-root independence-from-worldly-ties), are not affected.
5. **Homonym conflation.** ~0.2% of same-named figures share a node (documented in
   `within_entry_homonym_disambiguation.md`); negligible for global structure, but a few individual nodes (e.g. the
   several Raʾavads) may locally merge distinct people.
6. **Heuristic self-identification.** The Azulai-family nodes and the 310 first-person entries (T3.3) are Phase-0
   heuristics (label substring; marker substrings) pending SME confirmation; treat the self-position result as
   suggestive.
7. **"Super-entry" artifacts.** A few very long entries (R. Yaʿaḳov he-Ḥasid, *Tosafot*) dominate the over-attention,
   narrative-hub, and tacit-hub rankings simultaneously; part of this is a single long passage rather than many
   independent signals.
8. **Directionality of soul-root.** `soulRootOf` direction is taken as stored; the "against the arrow of transmission"
   reading rests on the cross-generational finding, not on a verified temporal ordering.
9. **Hebrew figure labels.** matplotlib cannot render Hebrew, so all figures label nodes by id; names are in the
   tables and the narrative. Publication figures will need Hebrew typesetting (a report-production task).

---

*Companion to [hida_bookshelf.md](hida_bookshelf.md). Full per-phase execution log: `documentation/stage13_analysis_plan.md` §9.*
