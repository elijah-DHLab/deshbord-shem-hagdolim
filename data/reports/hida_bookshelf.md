# The Hida's Bookshelf
### A network reading of *Shem HaGedolim* — who mattered in the Jewish scholarly world of 1774, and how one scholar mapped it

*A study of **שם הגדולים (השלם)** by Ḥayim Yosef David Azulai (the **Hida**, 1724–1806), read as a knowledge
graph. This report is written for readers of Jewish intellectual history; the network methods are explained in plain
language as they arise, and every quantitative claim is paired with what it does — and does not — show. Technical
definitions, null models, and reproducibility are in the companion **[technical appendix](hida_bookshelf_appendix.md)**.
An interactive version of the map is (or will be) at **hagdolim.dhlab.info**.*

---

## How to read this report

**The book.** *Shem HaGedolim* ("The Name of the Great Ones") is the Hida's biographical-and-bibliographical
dictionary of the Jewish scholarly tradition — some **3,535 entries** covering roughly **1,489 scholars** (מערכת
גדולים) and **2,046 books** (מערכת ספרים), from the Talmudic sages to the Hida's own eighteenth-century contemporaries.
It is one of the foundational works of Jewish bibliography: a learned, opinionated survey of who and what a
late-eighteenth-century master of the tradition considered worth recording.

**The graph.** We turned that dictionary into a **knowledge graph** — a network of **nodes** (the people and books)
joined by **edges** (relationships). There are **4,948 nodes**, each typed four ways: a scholar *with* his own entry
(1,484), a scholar only *mentioned* (632), a book *with* an entry (2,033), and a book only mentioned (799). "Having
an entry" is itself one of the Hida's editorial decisions, and we will make use of it.

**Three kinds of tie — and why their disagreements are the argument.** Every relationship in the book was captured in
one of three *layers*, each built a different way:

- **Layer A — placement** (15,285 ties). Whom does the Hida *discuss inside* whose entry? This is his editorial hand:
  a directed link from an entry's subject to everyone named in that passage. It is complete and objective (a machine
  can read it off the text) but it does not say *what* the relationship is.
- **Layer B — company** (103,608 ties). Which two figures merely *appear together* in some entry? This is a crude,
  very dense web of "co-mention"; we use it sparingly, and mostly as a backdrop.
- **Layer C — stated relations** (about 12,000 ties). The *named, typed* relationships the text actually asserts —
  *cites, authored, teacher-of, commentary-on, disputed-with, parent-of, contemporary-of, based-on, gloss-on,* and
  the mystical *soul-root-of*. These were extracted with a language model against a fixed vocabulary, and each carries
  the sentence that justifies it.

The three layers describe the *same* people, so the interesting question is not any one of them but **where they
disagree**. A figure the Hida constantly *places* at the center of his book but rarely records anyone *citing* is
telling us something a single measure would hide. Much of this report lives in those gaps.

**How to read a network (a five-word glossary).** *Prominence* = how many entries invoke a figure (his weight on the
Hida's "bookshelf"). *Authority* = how often others cite, are-authored-by, or comment-on him. *Compiling* = how often
*he* cites and authors outward. *Brokerage* = sitting on the paths between otherwise-separate groups. *Circle* = a
densely interconnected cluster of scholars and books (found automatically, then named by us). Each term is glossed
again where it first matters.

**What the instrument cannot do (stated up front).** The graph has no **dates** and no **places** yet, so all chronology
is indirect. Layer B massively over-counts "relationships" (a single dense entry manufactures thousands of co-mention
pairs). Layer C is **partial by design** — it records a relation only where the text states one. A handful of
same-named scholars (~0.2%) are locally conflated. And the automatically-found *circles* were computed partly from
Layer C, so when we say a certain kind of tie "stays inside circles" we flag where that reasoning risks circularity.
These limits are revisited in full at the end.

*(Figures are referenced as F-numbers and collected in `documentation/report/figures/`. Because the plotting library
cannot render Hebrew, figure labels use node ids; the accompanying tables in `data/analysis/` give the names.)*

---

## Chapter 1 — Who mattered, and in what way

**The question.** Every canon has a center. Whom did the Hida treat as central — and is "central" even one thing?

**The center of the bookshelf.** By sheer *prominence* — the number of entries that invoke him — the top of the Hida's
world is exactly whom a historian would expect: **Rambam** (Maimonides, invoked in 189 entries), **Yosef Karo** (168),
the chronicle *Seder ha-Dorot* (143), **Rashi** (119), the **Ari** (Isaac Luria, 113) and **Ramban** (Naḥmanides, 113),
then Ḥayim Benveniste, *Aderet Eliyahu*, Ḥayim Vital, the Rosh, the *Ṭur*, the Rashba, the *Shulḥan Arukh*, the Rif
(F1, the full map). That this falls out of a purely mechanical count is the first, reassuring result: the graph sees
the tradition's giants.

**But prominence is not authority, and authority is not the same as productivity.** Here the layers begin to disagree —
and the disagreement is the finding. Consider two towering figures:

- **Rambam is an *authority*.** He is *cited, commented-upon, and authored-by* far more than he himself cites outward
  (incoming typed relations 226 vs. outgoing 118). The tradition speaks *about* him.
- **Karo is a *compiler*.** The opposite: he cites and authors outward far more than he is cited (outgoing 283 vs.
  incoming 100). His genius, as the graph sees it, is to *move and organize* the material of others.

This is not a quirk of two men. Setting aside the 754 minor figures with too little activity to have a shape, the
remaining **730 active scholars sort into stable roles** defined precisely by this incoming-vs-outgoing *asymmetry*
(F2). There are **128 authorities** (cited ≫ citing — Rambam, the Rif, Rabbeinu Gershom, the Maharam of Rothenburg),
a large body of **405 compilers/transmitters** (citing ≫ cited — Karo, Ḥayim Benveniste, Ḥayim Vital, the Maharshal,
and, revealingly, the Rashba and Rashbaṣ, whom the Hida encounters mainly as prolific responders and citers), **138
balanced** figures who are heavily both (Rashi, Ramban, the Ari), and **59 connectors** bound into the web by sheer
company. *Why this matters:* it converts a familiar intuition — that some sages are "sources" and others "channels" —
into a measured typology across the whole canon, and it is a genuinely *multi-layer* result (we checked that the roles
cannot be recovered from any single measure; technical appendix §Guardrails). *Caveat:* "authority vs. compiler" is
read through the Hida's own lens — a later compiler naturally cites more simply because he wrote later.

**The silences.** A canon is defined as much by exclusion as inclusion, and the four-way typing lets us see the Hida's
*boundary*. Roughly **30% of the scholars and 28% of the books he invokes he never granted an entry of their own**
(F5). Ranked by the attention they nonetheless receive, the most-invoked-yet-unprofiled works are the tradition's
substrate — the **Talmud** itself (invoked in 85 entries with no entry of its own), the divisions of the *Ṭur*
(*Oraḥ Ḥayim, Yoreh Deʿah, Ḥoshen Mishpaṭ*), *Sefer Yuḥasin*, individual tractates. Some silences are structural
(the Talmud is a *substrate*, not a "great one" to be profiled; biblical figures such as Moshe and Eliyahu precede
the book's scope). But others are pointed **editorial** choices: near-contemporaries of real stature the Hida chose
*not* to profile — the **Baḥ** (Yoel Sirkis), the **Tosafot Yom Ṭov** (Yom-Ṭov Lipmann Heller), **Yaʿaḳov Emden**.
The boundary of the book is itself an argument about who counts as a *gadol*. *Caveat:* the report separates genuine
omissions from scope-exclusions; the raw ranking mixes them (see `silences.csv`).

---

## Chapter 2 — How Torah was transmitted

**The question.** Rabbinic culture understands itself as an unbroken *chain* of transmission (שלשלת הקבלה). Does the
Hida's text actually encode such chains — and did learning pass by blood, or by discipleship?

**Chains, and their load-bearing links.** Taking only the explicit *teacher-of* relations gives a network of **508
scholars in 62 lineage-families**, the largest binding 350 of them; the deepest single master→disciple chain the Hida
records runs **thirteen generations** deep (F6). Within it, **124 masters are "load-bearing"** in the precise sense
that removing them would fragment the transmission web (they are *articulation points*). The greatest *brokers* —
figures on the most paths between others — are Ramban, the Ari, the Rashba, Elʿazar of Worms, the Maharam of
Rothenburg, and, strikingly, **Eliyahu ha-Naviʾ** (Elijah), whose appearances as a broker encode the *kabbalistic*
motif of prophetic revelation to mystics. *Why it matters:* the "chain of tradition" is not a pious metaphor here but
a measurable structure with identifiable hinges. *Caveat:* a thirteen-link chain may stitch together ties the Hida
states in different places and directions; chain *depth* is suggestive, not a verified genealogy.

**Discipleship, not dynasty.** Did authority run in families? The graph co-encodes *kinship* (parent-of, relative-of)
and *pedagogy* (teacher-of) as separate ties over the same people, so we can simply overlay them. They barely
coincide: **only 5.4% of teacher–student ties are also family ties.** In the world the Hida records, Torah passed
overwhelmingly **by school, not by blood**. *Caveat:* the text may simply state kinship less often than teaching;
this is a floor, not a ceiling.

**The circles have names.** Left to itself, the network falls into **64 densely-knit circles**. They are not
anonymous: characterizing each by the *kind* of tie that holds it together turns them into recognizable schools (F4).
One circle is bound by *commentary* (Ramban, the Rosh — the Rishonim-commentary world); another by *teacher-of*
(around Rashi); the family-dense circles are rabbinic *dynasties*; and — most striking — one circle is held together
by the mystical *soul-root* relation (the Ari, Ḥayim Vital), i.e. the **Safed kabbalists**, while another is bound by
*gloss-on* at four-and-a-half times the background rate: the **halakhic codes** (the *Ṭur*, the *Shulḥan Arukh*, the
*Beit Yosef*, with their glosses). *Why it matters:* the automatic grouping recovers the actual sociological shape of
the tradition — commentary schools, dynasties, the Safed circle, the codificatory mainstream. And the *kind* of tie
differs by circle in a consistent way: **kinship and authorship concentrate *within* circles** (84% and 71% of those
ties stay inside a single circle), while **dispute and citation *reach across* them** — the ties that build a school
are not the ties that connect schools. *Caveat (important):* the circles were computed partly *from* Layer C, so the
absolute "within-circle" percentages are inflated by construction; only the *relative* ordering (kinship most inward,
dispute most outward) is safe to lean on.

**A rule of transmission.** Finally, do these ties combine into higher-order patterns? Against a chance baseline that
holds each figure's number of ties fixed, two results stand out (F14). First, teacher-chains **do not close into
triangles** (transitive teacher-triples are *under*-represented, z = −5): transmission runs as *lineages*, not cliques
— a master's students do not typically all teach one another. Second, and more humanly, **students cite their teachers
far more than chance would predict** (z = +8.4). The chain of tradition is not only a genealogy; it is a citation
practice. *Caveat:* the mystical soul-root and gloss relations are too sparse for triangle statistics.

---

## Chapter 3 — A world of books

**The question.** *Shem HaGedolim* is unusual in treating books as first-class subjects alongside their authors. Does
the Hida locate authority in *texts* or in *people* — and can a work outshine its author?

**Texts vs. people.** Because books are nodes, every citation has a *type* on each end. Of the 4,566 citations the
Hida records, the cited object is a **person 61%** of the time and a **text 39%** (the single most common pattern,
37%, is "a book cites a person"). The Hida's instinct, more often than not, is to anchor authority in a named *master*
rather than a *title* (F7). *Caveat:* author-by-title metonymy ("the *Ṭur* holds…") blurs the line the Hida himself
sometimes blurs.

**A genealogy of texts.** The commentary relations (*commentary-on, based-on, gloss-on*) are almost entirely
book-to-book, and they form a directed *genealogy of texts* — a gloss on a commentary on a code — that can be read
without reference to any author (F8). Its **roots**, the works most-derived-upon, identify the foundations of the
tradition with no prompting: the **Talmud** (32 works derive from it), the **Ṭur** (27), the **Shulḥan Arukh** (27),
the **Zohar** (18), the **Beit Yosef** (12). That these self-select — and that they coincide with the most
structurally prominent books — is a strong internal validation of the whole method.

**The book that outshines the man.** With authors and works separately measured, we can ask when a scholar survives in
the canon chiefly *as a book* (F17). The extreme cases are pure metonymy: authors with essentially no personal
citation whose *works* are heavily cited. But the most telling are the "balanced eclipses," where both are
substantial: **Karo** the person carries an authority of 100, yet the books he wrote carry **710** between them; the
Rema 58 vs. 465; the Maharshal 25 vs. 496; Ramban 121 vs. 374. The great exception is **Rambam**, whose *personal*
authority (226) nearly equals that of *all his works combined* (263, a ratio of 1.16) — the rare figure who towers as
a man, not only as a shelf of titles. At the opposite pole stand teachers remembered as *persons* more than through
any attributed book (the Ri Migash, the Ri "Baal ha-Tosafot"). *Caveat:* this rests on the clean author→book backbone
built in preprocessing (which, incidentally, corrected a mistaken belief that hundreds of "book-wrote-book" links
existed — there are only seven anomalies in the entire corpus).

**Books that travel together.** Finally, which works are habitually *cited together*? Clustering books by shared
citers recovers coherent bibliographic families — the halakhic codes, the Talmud-and-Tosafot complex, a **kabbalistic
cluster** (Zohar, *Etz Ḥayim*), a midrash-halakha group — and this co-citation view is **only partly aligned with the
sociological circles** of Chapter 2 (it is a genuinely different lens on the material). The scholars who *bridge* the
most distinct textual traditions are **Karo, Ḥayim Benveniste, Rashi, the Rashbaṣ, the Rosh, the Rema** — which is to
say, exactly the *compilers* of Chapter 1. The role a figure plays among people and the role he plays among texts are
the same role, seen twice: a clean cross-validation.

---

## Chapter 4 — The Hida's hand

**The question.** *Shem HaGedolim* is not a neutral database; it is an authored work. Where can we see the author —
his assumptions, his silences, his framing, his own place in the story?

**What he shows but does not say.** The single most revealing number in this study: of the 15,285 times the Hida
*places* one figure inside another's entry, **69% carry no stated relation at all** (F10). More than two-thirds of his
editorial connections are *tacit* — he shows us that two figures belong together without ever telling us how. Only
31% are made explicit, and those are dominated by citation and authorship. *Why it matters:* this makes concrete the
idea that a dictionary's *structure* carries knowledge its sentences leave unsaid — the placement *is* the argument.
*Caveat:* "no stated relation" partly reflects that Layer C is extracted only where the text is explicit; some tacit
links are merely *unstated*, not *unstatable*.

**Where controversy is staged.** Because every stated relation carries the entry it came from, we can ask a purely
rhetorical question: when the Hida records that A disputed B, *in whose entry* does he say it? Overwhelmingly — **72%
of the time — in a third party's entry**, not in either combatant's own (F11). The clearest case is **Rambam**: the
Hida records **33 disputes concerning him, every single one narrated in someone *else's* entry, never in Rambam's own**.
The giants' controversies are discussed *around* them, not *at* them — a consistent act of editorial deference.

**Attention is not importance.** How long an entry is measures how much the Hida chose to *say*; it tracks a figure's
structural prominence only loosely (correlation 0.56 for people, 0.34 for books). The residual — long entries for
minor figures, terse entries for giants — is the fingerprint of authorial subjectivity (F12). He lavishes **13,233
characters on R. Yaʿaḳov he-Ḥasid**, a figure invoked in only two entries, yet gives his *own grandfather* Abraham
Azulai a 46-character line despite the grandfather's real prominence. The canonical authorities he can assume; the
figures he *cares* about he expands.

**The gaze that looks past the subject.** Strikingly, **only a quarter of the Hida's stated relations are actually
about the entry's own subject; three-quarters are "ambient"** — relations he narrates *between other people* while
discussing someone else. *Shem HaGedolim* is less a set of self-contained biographies than a connected survey in which
each entry becomes a vantage point onto a whole milieu. The relations most likely to concern the subject himself are
his *soul-root* (50%) and his *teacher* (41%); the ones most likely to be third-party asides are *commentary* and
*gloss* (14%, 10%). A handful of **"narrative-hub" entries** recur throughout this study as long, ambient,
controversy-hosting surveys — R. Yaʿaḳov he-Ḥasid, *Tosafot*, the Maharam of Rothenburg — entries the Hida uses to map
an entire scholarly world. *Caveat:* one or two such entries are simply very long, which mechanically inflates their
"hub" status.

**The author writes himself in.** Finally, where is the Hida in his own book? His family, the Azulai line, sits at the
very top of the *brokerage* measure — and the Hida *himself* brokers **far beyond his citation warrant**: he sits in
the 78th percentile of brokerage but only the 19th of authority, a gap larger than almost anyone's (F16). He inserts
himself into the network by *editorial placement* — the connective tissue of the book — rather than by being cited.
And the ~310 entries where he speaks in the first person ("ואני", "ראיתי אני") are markedly more prominent and far
longer than the rest: where the Hida becomes a *witness*, the entry swells. *Caveat:* the identification of the Hida's
family nodes and first-person entries is a heuristic pending expert confirmation.

---

## Chapter 5 — A mystical lineage over a halakhic bookshelf

**The question.** The Hida was a kabbalist as well as a bibliographer. Scattered through *Shem HaGedolim* are
statements of *soul-root* (gilgul) — that one sage's soul is "from the root of" an earlier one ("שורשו מ…"). Is this
mystical genealogy simply a re-description of ordinary transmission — the same masters, re-labeled — or is it an
*independent* structure the Hida lays over the halakhic world?

**The answer: independent, and aimed at the center.** The 70 soul-root statements (66 pairs, 73 figures, spoken from
just 29 mostly-kabbalistic entries) form a lineage that is **orthogonal to worldly transmission** (F13). Tested against
a matched random baseline, soul-root pairs **almost never coincide with an actual teacher–student or kinship tie (3%)
or with a citation (4%, no better than chance)**, and they are **100% cross-generational** (never between
contemporaries) — as reincarnation-lineage must be. Yet the overlay is not scattered at random across the tradition:
its endpoints sit at the **78th percentile of prominence and the 86th of authority**. In other words, the Hida binds
his *most central, most authoritative* figures — Rav Aḥai, the Ari, Ḥayim Vital, Karo — into a mystical genealogy that
runs *across* the ordinary lines of teaching, family, and citation, and *across* the generations. *Why it matters:*
this is a claim no standard prosopography records — that the Hida wove a second, esoteric order of lineage over the
halakhic bookshelf, reserved for its summits. *Caveat:* soul-root pairs do tend to fall within the same automatically-
found circle (52% vs. 11% expected), but because those circles were computed partly from the soul-root ties
themselves, that particular number is partly circular; the *independence* from teaching, kinship, citation, and
contemporaneity is not, and it is the heart of the finding.

---

## Chapter 6 — The geography of the book

**The question.** The Hida records where books were printed and where scholars served, were born, lived, and died.
Mapped, does a geography emerge — and is the geography of *making books* the same as the geography of *living Torah*?

**Books were made in the West; Torah was lived in the East.** Resolving the Hida's place-references against a
gazetteer yields **176 places** carrying coordinates, joined to scholars and books by **822 typed relations** (F18,
the map). Two distinct geographies appear. **Printing** concentrates in the Christian-European trade and port cities:
**Venice (51), Amsterdam (42)**, then Constantinople, Frankfurt, Prague, Żółkiew, Salonika, Dyhernfurth — the top
five centers account for **half of all located printing**. But the **rabbinic** geography — where scholars *served,
lived, and died* — leans East and toward the Land of Israel: **Jerusalem (20), Izmir (16), Constantinople (13),
Egypt (10), Hebron (10)**, then Krakow, Prague, Salonika (F19). In the Hida's world the printing press ran in
Venice and Amsterdam, but the yeshiva sat in Jerusalem, Izmir, and Constantinople — a real split between the
geography of *production* and the geography of *scholarship*, with **Constantinople the great hinge** that was both.
*Why it matters:* it makes visible a structural feature of early-modern Jewish culture — that the material book and
the living tradition had different capitals. *Caveat:* place relations are Layer-C-partial (recorded only where the
text states them), and there are still no dates, so this is a geography without a timeline.

**The circles have homelands.** Overlaying the automatically-found circles of Chapter 2 onto the map (F20) shows they
are not only intellectual but *geographic*: the citation-and-responsa circle bound to **Constantinople and Salonika**
is the Sephardi-Ottoman world; a **Prague**-centered circle is Bohemian; the halakhic-codes circle sits over
**Krakow and the Polish presses**; and the **Safed kabbalists** show the split in miniature — their books printed in
**Venice**, their lives lived in **Jerusalem**. A "school," in this corpus, is often also a place.

**Scholars moved — and some came home to die.** Where the text records both a scholar's origin and his death place,
they almost always differ: the itinerant rabbinate of the early-modern period is visible even in this sparse signal,
and a handful of scholars who **originated abroad but died and were buried in the Land of Israel** (Hebron, Safed)
trace the thread of *aliyah* through the bookshelf. *Caveat:* very few entries state both an origin and a death place,
so this is a suggestive trace, not a migration statistic.

---

## What this reading shows, and what it cannot

Across five chapters a consistent picture emerges. The Hida's *Shem HaGedolim* is not a flat register but a
**structured, opinionated map** of the Jewish scholarly tradition: it distinguishes authorities from compilers,
records transmission as deep lineages rather than cliques, treats books as a world of their own with self-evident
foundational roots, and everywhere bears the marks of its author — in what he leaves tacit (69% of his connections),
in how he stages controversy (away from the giants), in whom he over- and under-attends, in the connective role he
gives his own family, and in the esoteric lineage he reserves for the tradition's summits. The network does not
replace reading the Hida; it tells us *where* to read him closely.

**Limitations, in brief** (full version in the [appendix](hida_bookshelf_appendix.md)):
- **No dates.** All chronology here is indirect (via *contemporary-of*). **Places are now included** (Chapter 6:
  176 gazetteer-resolved locations with coordinates, Layer-C-only), but they are partial — recorded only where the
  text states a location, and ~8% of place-references remain unresolved.
- **Layer B is inflated.** Co-mention manufactures dense pseudo-relationships; we used it only as backdrop.
- **Layer C is partial and model-extracted.** It records a relation only where the text is explicit, and a language
  model did the extracting (validated at F1 ≈ 0.92 on held-out gold; see the model-selection study).
- **Circularity.** The automatically-found circles used Layer C, so "stays within a circle" claims are flagged wherever
  that risks double-counting; independent results are marked as such.
- **Homonyms.** ~0.2% of same-named figures are locally conflated (a documented, non-structural limitation).
- **Heuristic self-identification.** The Hida's family and first-person entries are provisional, pending expert review.
- **Hebrew figure labels.** Charts use node ids; names are in the tables and in this text.

**Companion.** The full graph is explorable interactively (color by circle or role, size by any measure, filter by tie
type) at **hagdolim.dhlab.info**; every table behind these findings is in `data/analysis/`, and the exact methods,
metrics, and null models are in the **[technical appendix](hida_bookshelf_appendix.md)**.

*Prepared from the Stage-XIII analysis of the HagdolimKG project. A Hebrew adaptation of this report is planned.*
