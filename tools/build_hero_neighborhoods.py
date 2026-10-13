#!/usr/bin/env python3
"""Build the lightweight interactive atlas from real edges in the study graph.

Do not infer a historical connection from a co-mention. All links retain
original predicates; the browser can filter explicit/mention/co-mention.
"""
from pathlib import Path
import json,csv,collections
root=Path(__file__).resolve().parent.parent
seeds=['G0646','G1096','G1321','G1108','S0208','S1268','G0813','G0429']
rows=list(csv.DictReader((root/'data/graph/node_metrics.csv').open()))
byid={r['id']:r for r in rows}
graph=json.loads((root/'data/graph/graph_compact.json').read_text())
output={}
for seed in seeds:
    links=collections.defaultdict(list)
    for e in graph['edges']:
        if seed in (e['s'],e['t']):
            other=e['t'] if e['s']==seed else e['s']
            links[other].append({'type':e.get('pr',''),'layer':e.get('ly','')})
    candidates=[(n,v) for n,v in links.items() if n in byid and byid[n]['kind'] in ('person','book')]
    def rank(pair):
        n,records=pair
        strength=sum(8 if e['type'] not in ('co_mentioned_with','mentions_in_entry') else 3 if e['type']=='mentions_in_entry' else 0 for e in records)
        return strength+min(60,int(byid[n]['a_in_degree']))/2
    people=sorted((p for p in candidates if byid[p[0]]['kind']=='person'),key=rank,reverse=True)[:7]
    books=sorted((p for p in candidates if byid[p[0]]['kind']=='book'),key=rank,reverse=True)[:7]
    results=[]
    for n,edges in people+books:
        x=byid[n]
        results.append({'id':n,'label':x['label'],'kind':x['kind'],'degree':int(x['a_in_degree']),'links':edges})
    x=byid[seed]
    output[seed]={'focus':{'id':seed,'label':x['label'],'kind':x['kind'],'degree':int(x['a_in_degree'])},'nodes':results}
path=root/'data/optimized/hero-neighborhoods.json'
path.write_text(json.dumps(output,ensure_ascii=False,separators=(',',':')))
print(f'{path}: {path.stat().st_size} bytes')
