# Graph — Data Dictionary

*What the files in `graph/` contain and what every field means.*

## Files
- **`hagdolim_kg.gexf`** — the full graph in GEXF (open in [Gephi](https://gephi.org)). Contains all nodes and all
  edges of every layer, with node attributes (type, centralities, community, place lat/long) and edge attributes
  (layer, predicate, weight, evidence).
- **`node_metrics.csv`** — one row per node (the human-readable node table; open in any spreadsheet).
- **`graph_summary.txt`** — counts and top nodes at a glance.

## Node types (`four_way`)
| value | meaning |
|---|---|
| `I_person_entry` | a scholar who **has his own entry** in the dictionary |
| `II_person_external` | a scholar only **mentioned**, no entry |
| `III_book_entry` | a book **with its own entry** |
| `IV_book_external` | a book only **mentioned** |
| `V_place` | a **place** (city/region), resolved to a gazetteer with coordinates |

Ids: persons `G####`, in-set books `S####`, external persons/books `O####`, places = gazetteer `uid`
(e.g. `IT-00016` = Venice).

## `node_metrics.csv` columns
| column | meaning |
|---|---|
| `id`, `label` | node id and Hebrew name |
| `kind` | person / book / place |
| `class` | G (person-entry) · S (book-entry) · O (external) · L (place) |
| `in_set` | True if the node has its own dictionary entry |
| `four_way` | node type (table above) |
| `a_in_degree` | **prominence** — # entries that invoke this node (Layer A in-degree) |
| `b_wdegree` | co-mention weight (Layer B; noisy — use sparingly) |
| `c_in_wdeg` | **authority** — typed relations *into* the node (cited / authored-by / commented-on) |
| `c_out_wdeg` | **productivity** — typed relations *out of* the node (citing / authoring) |
| `place_in` | (places only) # place-relations pointing at this place |
| `community` | Louvain circle id (persons/books; places = −1) |
| — | *for places, latitude/longitude are in the GEXF (and `nodes_places` in the repo)* |

## Edge layers (in the GEXF, attribute `layer`)
| layer | predicate(s) | meaning |
|---|---|---|
| **A** `structure` | `mentions_in_entry` | the Hida discusses B inside A's entry (directed; editorial placement) |
| **B** `association` | `co_mentioned_with` | A and B appear in the same entry (undirected; dense/noisy backdrop) |
| **C** `semantic` | `cites, authored, teacherOf, commentaryOn, disputedWith, parentOf, relativeOf, contemporaryOf, basedOn, glossOn, soulRootOf, relatedTo` | the stated, typed relationships (directed; each carries an `evidence` sentence) |
| **C** `semantic` (`subtype=place`) | `printedIn, diedIn, buriedIn, rabbiOf, fromPlace, bornIn, livedIn, traveledTo, associatedWith` | a scholar/book's relation to a **place** |

## Provenance & caveats (short — full version in the appendix)
- Layers A/B are deterministic; **Layer C and entity linking used language models** (validated at F1 ≈ 0.92 on a
  held-out gold standard). Layer C is **partial by design** — a relation is recorded only where the text states it.
- **Symmetric** predicates (`relativeOf`, `contemporaryOf`) appear as two directed edges in the GEXF.
- **Communities** (Louvain) were computed on layers A+C; place nodes are excluded (community = −1).
- Names in figures are transliterated/English because the chart library cannot render Hebrew; Hebrew names are here
  and in the reports.
