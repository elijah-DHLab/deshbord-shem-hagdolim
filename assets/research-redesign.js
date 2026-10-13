/* 1.3 — An entry is a doorway: integrated search, actual-data SVG network,
 * single-click analytic routing. The legacy dashboard remains intact. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const NS = 'http://www.w3.org/2000/svg';
  const seeds = ['G0646','G1096','G1321','G1108','S0208','S1268','G0813','G0429'];
  let seedIndex=0, edgeMode='all', data=null, focused='', searchMatches=[], activeResult=-1;
  const norm = s => String(s??'').normalize('NFKC').replace(/[\u0591-\u05c7]/g,'').toLocaleLowerCase().replace(/[\s"׳״']/g,'').trim();
  const language=()=>document.documentElement.lang==='en'?'en':'he';
  const T=(he,en)=>language()==='he'?he:en;
  const el=(name,attr={},text)=>{const node=document.createElementNS(NS,name);Object.entries(attr).forEach(([k,v])=>node.setAttribute(k,String(v)));if(text!==undefined)node.textContent=text;return node;};
  const short=(str,max=29)=>String(str||'').length>max?str.slice(0,max-1)+'…':str;
  const known=()=>typeof APP!=='undefined'&&Array.isArray(APP.nodes)&&APP.nodes.length>0;
  function findNodeId(value){if(!known())return '';const raw=String(value||'').trim(),exact=APP.nodeById.get(raw);if(exact)return exact.id;const n=norm(raw);if(!n)return '';const first=APP.nodes.find(x=>norm(x.label)===n)||APP.nodes.find(x=>norm(x.label).startsWith(n));return first?.id||'';}
  function showEntityInsight(id){const n=APP.nodeById.get(id);if(!n)return;
    const box=$('entityInsight');if(!box)return;box.hidden=false;
    $('entityInsightKind').textContent=n.kind==='person'?T('אדם / PERSON','PERSON / SCHOLAR'):n.kind==='book'?T('חיבור / BOOK','BOOK / WORK'):T('מקום / PLACE','PLACE');
    $('entityInsightName').textContent=n.label;
    $('entityInsightId').textContent=n.id;
    $('insightMentions').textContent=Number(n.a_in_degree||0).toLocaleString();
    $('insightIncoming').textContent=Number(n.c_in_wdeg||0).toLocaleString();
    $('insightOutgoing').textContent=Number(n.c_out_wdeg||0).toLocaleString();
    $('insightOpenSource').onclick=()=>window.jumpToSourceByNodeId?.(id);$('insightOpenNetwork').onclick=()=>{window.researchGoto?.('atlas');window.CorpusExplorer?.focus?.(id)};
    $('insightOpenData').onclick=()=>{window.researchGoto?.('data');const search=$('nodeSearch');if(search){search.value=id;search.dispatchEvent(new Event('input'))}};
  }
  /** All entry points call one analysis action, never merely mark a node. */
  function analyze(id){
    if(!id||!known())return false;
    const resolved=findNodeId(id)||id;
    if(!APP.nodeById.has(resolved))return false;
    window.researchSelectEntity?.(resolved);
    showEntityInsight(resolved);
    const person=$('personInput');if(person)person.value=resolved;
    const seed=$('seedNode');if(seed)seed.value=resolved;
    window.researchGoto?.('person');
    // trigger the original action: local Cytoscape, lazy Lite/Full, tree and evidence.
    const button=$('analyzePerson');if(button)button.click();
    const help=$('tab-person')?.querySelector('.help-card');
    if(help)help.scrollIntoView({behavior:'auto',block:'start'});
    return true;
  }
  window.openEntityAnalysis=analyze;
  function makeHeroResult(r,index){const b=document.createElement('button');b.className='hero-result'+(index===activeResult?' active':'');b.type='button';b.setAttribute('role','option');b.dataset.entityId=r.id;const title=document.createElement('b');title.textContent=r.label;const small=document.createElement('small');small.textContent=r.id+' · '+(r.kind==='person'?T('אדם','Person'):r.kind==='book'?T('ספר','Book'):T('מקום','Place'));b.append(title,small);b.onclick=()=>{analyze(r.id);closeResults()};return b;}
  function closeResults(){const list=$('heroSearchResults');if(list){list.hidden=true;list.replaceChildren()}$('heroEntitySearch')?.setAttribute('aria-expanded','false');activeResult=-1;}
  function showResults(){const q=norm($('heroEntitySearch')?.value);if(!known()||!q){closeResults();return;}
    searchMatches=APP.nodes.filter(n=>norm(n.id).includes(q)||norm(n.label).includes(q)).sort((a,b)=>Number(norm(b.label)===q)-Number(norm(a.label)===q)||Number(b.a_in_degree||0)-Number(a.a_in_degree||0)).slice(0,12);
    const box=$('heroSearchResults');box.replaceChildren();searchMatches.forEach((r,i)=>box.append(makeHeroResult(r,i)));if(!searchMatches.length){const t=document.createElement('p');t.className='hero-no-results';t.textContent=T('לא נמצאו ישויות מתאימות','No matching entities');box.append(t)}box.hidden=false;$('heroEntitySearch').setAttribute('aria-expanded','true');}
  function submitSearch(){const term=$('heroEntitySearch')?.value.trim();if(!term)return;
    const pick=searchMatches[activeResult]||searchMatches[0];const id=pick?.id||findNodeId(term);if(!id){showResults();return;}closeResults();analyze(id);
  }
  function setupSearch(){const input=$('heroEntitySearch');if(!input)return;
    input.addEventListener('input',()=>{activeResult=-1;showResults()});
    input.addEventListener('keydown',e=>{if(e.key==='Escape'){closeResults();return}if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();const delta=e.key==='ArrowDown'?1:-1;activeResult=(activeResult+delta+searchMatches.length)%Math.max(1,searchMatches.length);showResults();return}if(e.key==='Enter'){e.preventDefault();submitSearch()}});
    $('heroSearchSubmit')?.addEventListener('click',submitSearch);
    document.addEventListener('pointerdown',e=>{if(!e.target.closest('.primary-search'))closeResults()});
    document.querySelectorAll('[data-open-id]').forEach(b=>b.addEventListener('click',()=>analyze(b.dataset.openId)));
  }
  function matches(links){if(edgeMode==='all')return links.length>0;if(edgeMode==='explicit')return links.some(x=>x.type!=='mentions_in_entry'&&x.type!=='co_mentioned_with');return links.some(x=>x.type==='mentions_in_entry');}
  function edgeCategory(links){return links.some(x=>x.type!=='mentions_in_entry'&&x.type!=='co_mentioned_with')?'explicit':links.some(x=>x.type==='mentions_in_entry')?'mention':'co';}
  function tooltipText(n){const sourceId=data[seeds[seedIndex]].focus.id;const kind=n.kind==='person'?T('אדם','Person'):T('ספר','Book');return `${kind} · ${n.id} / ${sourceId}`;}
  function renderMap(){if(!data||!$('heroNetwork'))return;const key=seeds[seedIndex];const g=data[key];if(!g)return;
    const svg=$('heroNetwork'),tooltip=$('heroMapTooltip');svg.replaceChildren();
    const selected=g.nodes.filter(n=>matches(n.links));const persons=selected.filter(n=>n.kind==='person').slice(0,7);const books=selected.filter(n=>n.kind==='book').slice(0,7);
    svg.append(el('line',{x1:470,y1:70,x2:470,y2:540,class:'hero-guide-line'}));
    svg.append(el('text',{x:130,y:53,class:'hero-network-head','text-anchor':'middle'},T('ספרים · חיבורים','BOOKS · WORKS')));
    svg.append(el('text',{x:804,y:53,class:'hero-network-head','text-anchor':'middle'},T('חכמים · אנשים','SCHOLARS · PEOPLE')));
    svg.append(el('text',{x:470,y:66,class:'hero-hub-caption'},'FOCAL ENTRY'));
    const conns=[];const clickAnalysis=id=>{focused=id;analyze(id)};
    function drawSide(list,side){const x=side==='book'?130:800;const count=list.length;const ys=count?list.map((_,i)=>115+(i+0.5)*390/count):[];
      list.forEach((n,i)=>{const y=ys[i],dir=side==='book'?-1:1;
        const path=el('path',{d:`M ${470+dir*33} 293 C ${470+dir*180} ${295+(y-293)*.12}, ${x-dir*110} ${y}, ${x} ${y}`,class:'hero-link '+edgeCategory(n.links),'data-link-id':n.id});svg.append(path);conns.push([n.id,path]);
        const node=el('g',{class:'hero-node '+n.kind,'data-entity-id':n.id,tabindex:0,role:'button','aria-label':n.label+' · '+T('פתח ניתוח','Open analysis')});
        node.append(el(n.kind==='book'?'rect':'circle',n.kind==='book'?{x:x-7,y:y-7,width:14,height:14,rx:1,class:'hero-node-hit'}:{cx:x,cy:y,r:7,class:'hero-node-hit'}));
        const textx=side==='book'?x-18:x+18;
        node.append(el('text',{x:textx,y:y-4,class:'hero-node-label','text-anchor':side==='book'?'end':'start'},short(n.label,26)));
        node.append(el('text',{x:textx,y:y+14,class:'hero-node-id','text-anchor':side==='book'?'end':'start'},n.id));
        node.addEventListener('mouseenter',()=>highlight(n.id,n));node.addEventListener('mouseleave',restore);node.addEventListener('focus',()=>highlight(n.id,n));node.addEventListener('blur',restore);
        node.addEventListener('click',()=>clickAnalysis(n.id));node.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();clickAnalysis(n.id)}});
        svg.append(node);
      });
    }
    drawSide(books,'book');drawSide(persons,'person');
    const hub=el('g',{class:'hero-node hub',tabindex:0,role:'button','aria-label':g.focus.label});hub.append(el('circle',{cx:470,cy:293,r:38,class:'hero-node-hit'}));
    const name=short(g.focus.label,29);hub.append(el('text',{x:470,y:365,class:'hero-hub-label'},name));hub.append(el('text',{x:470,y:385,class:'hero-hub-caption'},`${g.focus.id} / ${g.focus.degree} ${T('ערכים','entries')}`));
    hub.append(el('path',{d:'M457 291h26m-13-13v26',stroke:'#24483f','stroke-width':'2.2','stroke-linecap':'round'}));hub.onclick=()=>analyze(g.focus.id);hub.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();analyze(g.focus.id)}};svg.append(hub);
    function highlight(id,n){svg.querySelectorAll('.hero-node:not(.hub)').forEach(node=>node.classList.toggle('dim',node.dataset.entityId!==id));conns.forEach(([k,path])=>{path.classList.toggle('glow',k===id);path.classList.toggle('dim',k!==id)});tooltip.hidden=false;tooltip.replaceChildren();tooltip.append(document.createTextNode(n.label));const small=document.createElement('span');small.textContent=tooltipText(n);tooltip.append(small);}
    function restore(){svg.querySelectorAll('.hero-node').forEach(node=>node.classList.remove('dim'));conns.forEach(([,p])=>p.classList.remove('glow','dim'));tooltip.hidden=true;}
    $('heroMapLoading').hidden=true;
    $('heroMapStage').dataset.seed=key;
  }
  async function initializeMap(){try{const req=await fetch('data/optimized/hero-neighborhoods.json');if(!req.ok)throw new Error('Hero data unavailable');data=await req.json();renderMap();}
    catch(e){$('heroMapLoading').textContent=T('המפה לא נטענה. ניתן להמשיך לחיפוש הישויות.','Map unavailable. Entity search remains accessible.');console.error(e)}}
  function setupMap(){document.querySelectorAll('[data-edge-mode]').forEach(btn=>btn.addEventListener('click',()=>{edgeMode=btn.dataset.edgeMode;document.querySelectorAll('[data-edge-mode]').forEach(b=>b.classList.toggle('active',b===btn));renderMap()}));
    $('heroMapNext')?.addEventListener('click',()=>{seedIndex=(seedIndex+1)%seeds.length;renderMap()});}
  function setupLinks(){document.querySelectorAll('.go-home').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();window.researchGoto?.('atlas');document.querySelector('main')?.scrollIntoView({behavior:'smooth',block:'start'});(location.origin!=='null'&&history.replaceState(null,'',location.pathname))}));
    document.querySelectorAll('.route-action').forEach(b=>b.addEventListener('click',()=>window.researchGoto?.(b.dataset.target)));
    // Make the selected-entity label actionable, not only a status string.
    const selected=$('selectedEntityLabel');if(selected){selected.setAttribute('role','button');selected.setAttribute('tabindex','0');selected.title=T('לחצו לניתוח הישות','Open entity analysis');selected.addEventListener('click',()=>{if(known())analyze(APP.selectedNodeId)});selected.addEventListener('keydown',e=>{if(e.key==='Enter')analyze(APP.selectedNodeId)})}
  }
  function init(){setupLinks();setupSearch();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
