/* Name to Network 1.4. A browsable corpus, not a rotating illustration.
   Preserve legacy code and original research figures. */
(()=>{'use strict';
const $=id=>document.getElementById(id), NS='http://www.w3.org/2000/svg';
const nrm=s=>String(s??'').normalize('NFKC').replace(/[\u0591-\u05c7]/g,'').toLowerCase().replace(/[\s\"׳״']/g,'').trim();
const en=()=>document.documentElement.lang==='en';
const t=(he,english)=>en()?english:he;
const nameOf=id=>window.APP?.nodeById?.get(id)?.label||explorer.nodes?.[id]?.[0]||id;
const kindOf=id=>window.APP?.nodeById?.get(id)?.kind||explorer.nodes?.[id]?.[1]||'other';
const make=(tag,atts={},txt)=>{const v=document.createElementNS(NS,tag);Object.entries(atts).forEach(([k,val])=>v.setAttribute(k,String(val)));if(txt!==undefined)v.textContent=txt;return v;};
const setTxt=(id,text)=>{const el=$(id);if(el)el.textContent=text;};
const seed=['G0646','G1096','G1321','G1108','S0208','S1268','G0813','G0429'];
const explorer={index:null,co:null,nodes:null,id:'G0646',back:[],forward:[],mode:'all',offset:0,limit:16,zoom:1,vb:null};
const cats={person:'#4ab9b4',book:'#e1a06f',place:'#d5c88b'};
function modeIncludes(bits){if(explorer.mode==='explicit')return !!(bits&4);if(explorer.mode==='mentions')return !!(bits&1);if(explorer.mode==='co')return !!(bits&2);return !!(bits&5);}
function indexFor(id){const a=explorer.index?.adjacency?.[id]||[];if(explorer.mode!=='co')return a;return explorer.co?.adjacency?.[id]||[];}
function short(s,max=23){return String(s||'').length<=max?s:String(s).slice(0,max-1)+'…';}
function neighbors(){const all=indexFor(explorer.id).filter(x=>modeIncludes(x[1])&&explorer.nodes[x[0]]);
 // Bibliographic rank guides order, but users can page through every neighbor.
 all.sort((a,b)=> ((b[1]&4)?1:0)-((a[1]&4)?1:0) || (explorer.nodes[b[0]]?.[2]||0)-(explorer.nodes[a[0]]?.[2]||0) || (b[2]-a[2]));return all;}
function pivot(id,back=true){if(!explorer.nodes?.[id])return;if(id!==explorer.id){if(back)explorer.back.push(explorer.id);explorer.id=id;explorer.forward=[];}explorer.offset=0;render();
 window.researchSelectEntity?.(id);
 // Preserve selected name as a path through the corpus, not an automatic tab switch.
 }
function changeMode(mode){explorer.mode=mode;explorer.offset=0;document.querySelectorAll('[data-edge-mode]').forEach(b=>b.classList.toggle('active',b.dataset.edgeMode===mode));
 if(mode==='co'&&!explorer.co){setTxt('heroMapLoading',t('טוען שכבת הופעות משותפות…','Loading co-occurrences…'));$('heroMapLoading').hidden=false;
 fetch('data/optimized/explorer-cooccurrences.json').then(r=>{if(!r.ok)throw Error(r.status);return r.json()}).then(d=>{explorer.co=d;render()}).catch(e=>{console.error(e);setTxt('heroMapLoading',t('לא ניתן לטעון את שכבת B.','Cannot load layer B.'))});return;}render();}
function typeText(bits){return bits&4?t('יחס מפורש (C)','Explicit relation (C)'):bits&1?t('אזכור בתוך ערך (A)','Within-entry mention (A)'):t('הופעה משותפת (B)','Co-occurrence (B)');}
function description(row){if(!row)return t('בחרו קשת להצגת סוג העדות; לחיצה על שם ממשיכה לסביבתו.','Select an edge for evidence; select a name to continue exploring.');
 const [id,bits,count,pred,evidence,dir]=row;const label=nameOf(id);
 const d=dir===1?'→':dir===2?'←':'↔';return {name:label,type:typeText(bits),relation:pred||'—',count,evidence,dir:d,id};}
function showRow(row){const c=$('mapCurrent');if(!c)return;const desc=description(row);c.replaceChildren();
 if(typeof desc==='string'){c.textContent=desc;return;}
 const box=document.createElement('div');box.className='map-current-copy';
 const header=document.createElement('div');header.className='map-current-title';const title=document.createElement('strong');title.textContent=desc.name;const cat=document.createElement('span');cat.textContent=desc.type;header.append(title,cat);box.append(header);
 const detail=document.createElement('p');detail.textContent=desc.relation==='—'?t('מסלול בין צמתים · '+desc.dir+' · '+desc.count+' מופעים','Node link · '+desc.dir+' · '+desc.count+' occurrences'):desc.relation+' · '+desc.dir+' · '+desc.count;box.append(detail);
 if(desc.evidence){const q=document.createElement('blockquote');q.textContent=desc.evidence;box.append(q);}
 else if(desc.type.includes('(B)')){const p=document.createElement('p');p.textContent=t('הופעה משותפת אינה הוכחה ליחס ישיר.','Co-occurrence is not evidence of a direct relationship.');box.append(p)}
 const btn=document.createElement('button');btn.type='button';btn.className='map-current-analyze';btn.textContent=t('לניתוח מלא של '+desc.name+' ←','Analyze '+desc.name+' →');btn.onclick=()=>window.openEntityAnalysis?.(desc.id);box.append(btn);c.append(box);
}
function zoomState(view){const svg=$('heroNetwork');if(!svg)return;const vb=explorer.vb||[0,0,940,590];const rect=svg.getBoundingClientRect();let [x,y,w,h]=vb;const vw=Math.min(2.7,Math.max(.45,explorer.zoom));const nw=w/vw,nh=h/vw;
 const midX=x+w/2,midY=y+h/2;svg.setAttribute('viewBox',`${midX-nw/2} ${midY-nh/2} ${nw} ${nh}`);}
function svgNode(svg,point,x,y,anchor){const [id,bits,count]=point;const isBook=kindOf(id)==='book';const isPlace=kindOf(id)==='place';const color=cats[kindOf(id)]||'#9cbcb2';const textx=anchor==='start'?x+17:x-17;
 const g=make('g',{class:'hero-node '+(isBook?'book':isPlace?'place':'person'),'data-entity-id':id,tabindex:0,role:'button','aria-label':nameOf(id)+' — '+t('עבור למוקד','Visit node')});
 g.append(make('rect',{x:anchor==='start'?x-13:x-278,y:y-19,width:290,height:43,fill:'transparent','pointer-events':'all'}));
 const hit=isBook?make('rect',{x:x-7,y:y-7,width:14,height:14,rx:2,fill:color}):make('circle',{cx:x,cy:y,r:7.5,fill:color});hit.setAttribute('class','hero-node-hit');g.append(hit);
 const title=make('text',{x:textx,y:y-2,'text-anchor':anchor,class:'hero-node-label'},short(nameOf(id),26));const sub=make('text',{x:textx,y:y+15,'text-anchor':anchor,class:'hero-node-id'},id+' · '+(explorer.nodes?.[id]?.[2]||0));g.append(title,sub);
 const activate=()=>pivot(id);g.addEventListener('click',activate);g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate()}});
 g.addEventListener('mouseenter',()=>showRow(point));g.addEventListener('focus',()=>showRow(point));/* Preserve the evidence card when the pointer leaves, so its analysis link stays clickable. */svg.append(g);
}
function render(){if(!explorer.index)return;const svg=$('heroNetwork');if(!svg)return;svg.replaceChildren();$('heroMapLoading').hidden=true;
 let adj=neighbors();if(explorer.offset>=adj.length)explorer.offset=0;const page=adj.slice(explorer.offset,explorer.offset+explorer.limit);
 const books=page.filter(row=>kindOf(row[0])==='book');const other=page.filter(row=>kindOf(row[0])!=='book');
 const sideMax=Math.max(books.length,other.length);const height=Math.max(590,160+sideMax*48);const centerY=height/2;
 svg.setAttribute('viewBox',`0 0 940 ${height}`);explorer.vb=[0,0,940,height];explorer.zoom=1;
 svg.append(make('line',{x1:470,x2:470,y1:60,y2:height-40,class:'hero-guide-line'}));
 svg.append(make('text',{x:155,y:53,'text-anchor':'middle',class:'hero-network-head'},t('ספרים · חיבורים','BOOKS / WORKS')));
 svg.append(make('text',{x:785,y:53,'text-anchor':'middle',class:'hero-network-head'},t('אנשים · מקומות','PEOPLE / PLACES')));
 const draw=(list,side)=>{const left=side==='book';const x=left?165:785;const anchor=left?'end':'start';list.forEach((row,i)=>{const y=105+(i+1)*(height-180)/(list.length+1);const mask=row[1],isSemantic=!!(mask&4);
 let path=make('path',{d:`M ${470+(left?-37:37)} ${centerY} C ${left?340:610} ${centerY+(y-centerY)*.13} ${left?290:650} ${y} ${x} ${y}`,class:'hero-link '+(explorer.mode==='co'?'co':isSemantic?'explicit':'mention')});
 const lineTitle=make('title',{},typeText(mask)+(row[3]?' · '+row[3]:''));path.append(lineTitle);path.addEventListener('mouseenter',()=>showRow(row));svg.append(path);svgNode(svg,row,x,y,anchor);});};
 draw(books,'book');draw(other,'person');
 const g=make('g',{class:'hero-node hub',role:'button',tabindex:0,'aria-label':t('נתח','Analyze')+' '+nameOf(explorer.id)});
 g.append(make('rect',{x:335,y:centerY-45,width:270,height:148,fill:'transparent','pointer-events':'all'}));
 g.append(make('circle',{cx:470,cy:centerY,r:37,class:'hero-node-hit'}));
 g.append(make('path',{d:`M458 ${centerY}h24 m-12 -12v24`,stroke:'#24483f','stroke-width':2,fill:'none'}));
 g.append(make('text',{x:470,y:centerY+73,class:'hero-hub-label'},short(nameOf(explorer.id),32)));
 g.append(make('text',{x:470,y:centerY+93,class:'hero-hub-caption'},explorer.id));
 const analyze=()=>window.openEntityAnalysis?.(explorer.id);g.onclick=analyze;g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();analyze();}};svg.append(g);
 const crumb=$('mapBreadcrumb');crumb.replaceChildren();const history=explorer.back.slice(-5).concat(explorer.id);
 history.forEach((id,i)=>{if(i){const sep=document.createElement('span');sep.textContent=' / ';sep.className='map-crumb-sep';crumb.append(sep);}const b=document.createElement('button');b.type='button';b.textContent=short(nameOf(id),19);b.title=nameOf(id);b.setAttribute('aria-current',i===history.length-1?'location':'false');b.onclick=()=>{const index=explorer.back.lastIndexOf(id);if(index>=0){explorer.forward=[...explorer.back.slice(index+1),explorer.id,...explorer.forward];explorer.back=explorer.back.slice(0,index);explorer.id=id;explorer.offset=0;render();}};crumb.append(b)});
 $('mapBack').disabled=!explorer.back.length;$('mapForward').disabled=!explorer.forward.length;
 let current=$('mapCurrent');current.replaceChildren();const text=document.createElement('span');text.textContent=t(`${nameOf(explorer.id)} · מציגים ${page.length} מתוך ${adj.length} שכנים. לחיצה על שם תעבור לסביבתו; לחיצה על הצומת המרכזי תפתח ניתוח.`,`${nameOf(explorer.id)} · ${page.length} of ${adj.length} neighbors. Select a name to visit; select the central node to analyze.`);current.append(text);
 let more=$('mapMore');more.disabled=adj.length<=explorer.limit;more.textContent=t(`עוד שכנים (${explorer.offset+1}–${Math.min(explorer.offset+explorer.limit,adj.length)} / ${adj.length})` ,`More neighbors (${explorer.offset+1}–${Math.min(explorer.offset+explorer.limit,adj.length)} / ${adj.length})`);
 $('heroMapStage').dataset.seed=explorer.id;
}
async function loadExplorer(){if(explorer.index)return;try{const response=await fetch('data/optimized/explorer-index.json');if(!response.ok)throw Error(response.status);explorer.index=await response.json();explorer.nodes=explorer.index.nodes;render();}catch(e){console.error('Explorer index unavailable',e);setTxt('heroMapLoading',t('טעינת הרשת נכשלה. החיפוש עדיין זמין.','Network data unavailable. Search remains accessible.'));}}
function setupExplorer(){// Replace the old eight-neighborhood demonstration with the corpus-wide graph.
 const bottom=document.querySelector('.edge-modes');if(bottom){const old=bottom.querySelector('[data-edge-mode="all"]');if(old)old.textContent=t('מבנה ויחסים (A+C)','Structure + explicit (A+C)');
 const b=document.createElement('button');b.type='button';b.dataset.edgeMode='co';b.textContent=t('הופעה משותפת (B)','Co-occurrence (B)');bottom.append(b);bottom.querySelectorAll('button').forEach(x=>x.addEventListener('click',()=>changeMode(x.dataset.edgeMode)));}
 const input=$('mapEntityJump');const candidate=$('mapEntityCandidates');const resolve=raw=>{const val=String(raw||'').trim();const id=val.match(/(?:G|S|O)\d{4}|[A-Z]{2}-\d{5}/)?.[0];if(id&&explorer.nodes?.[id])return id;if(explorer.nodes?.[val])return val;const norm=nrm(val);if(!norm)return '';const entries=Object.entries(explorer.nodes||{});return (entries.find(([_,n])=>nrm(n[0])===norm)||entries.find(([_,n])=>nrm(n[0]).includes(norm)))?.[0]||''};
 input?.addEventListener('input',()=>{if(!candidate||!explorer.nodes)return;const q=nrm(input.value);candidate.replaceChildren();if(q.length<2)return;const found=Object.entries(explorer.nodes).filter(([id,n])=>nrm(n[0]).includes(q)||nrm(id).includes(q)).slice(0,20);for(const [id,n] of found){const op=document.createElement('option');op.value=n[0]+' · '+id;candidate.append(op)}});
 const jump=()=>{const id=resolve(input?.value);if(id){pivot(id);input.value='';candidate?.replaceChildren();}else if(input){input.setCustomValidity(t('לא נמצאה ישות — נסו שם או מזהה אחר','No matching entity found'));input.reportValidity();setTimeout(()=>input.setCustomValidity(''),1800)}};
 $('mapJumpGo')?.addEventListener('click',jump);input?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();jump()}});
 const next=$('heroMapNext');next?.addEventListener('click',()=>{const i=seed.indexOf(explorer.id);pivot(seed[(i+1+seed.length)%seed.length])});
 $('mapBack')?.addEventListener('click',()=>{if(!explorer.back.length)return;explorer.forward.unshift(explorer.id);explorer.id=explorer.back.pop();explorer.offset=0;render();window.researchSelectEntity?.(explorer.id)});
 $('mapForward')?.addEventListener('click',()=>{if(!explorer.forward.length)return;explorer.back.push(explorer.id);explorer.id=explorer.forward.shift();explorer.offset=0;render();window.researchSelectEntity?.(explorer.id)});
 $('mapFit')?.addEventListener('click',()=>{explorer.zoom=1;const b=explorer.vb;if(b)$('heroNetwork').setAttribute('viewBox',b.join(' '))});
 $('mapLimit')?.addEventListener('change',e=>{explorer.limit=Number(e.target.value)||16;explorer.offset=0;render()});
 const more=document.createElement('button');more.type='button';more.id='mapMore';more.className='map-more';more.textContent=t('עוד שכנים ↻','More neighbors ↻');more.addEventListener('click',()=>{const n=neighbors().length;if(n)explorer.offset=(explorer.offset+explorer.limit)%n;render()});
 $('mapCurrent')?.after(more);
 let pointer=null;const svg=$('heroNetwork');svg.addEventListener('wheel',e=>{e.preventDefault();explorer.zoom=Math.max(.7,Math.min(2.4,explorer.zoom*(e.deltaY<0?1.09:.92)));zoomState()}, {passive:false});
 // Pointer panning over whitespace: browser-level SVG viewBox, no DOM re-creation.
 svg.addEventListener('pointerdown',e=>{if(e.target.closest('.hero-node'))return;pointer={x:e.clientX,y:e.clientY,view:{x:svg.viewBox.baseVal.x,y:svg.viewBox.baseVal.y,width:svg.viewBox.baseVal.width,height:svg.viewBox.baseVal.height}};svg.setPointerCapture?.(e.pointerId)});
 svg.addEventListener('pointermove',e=>{if(!pointer)return;const width=svg.clientWidth||940,height=svg.clientHeight||590;const vb=explorer.vb;const a=pointer.view;svg.setAttribute('viewBox',`${a.x-(e.clientX-pointer.x)*a.width/width} ${a.y-(e.clientY-pointer.y)*a.height/height} ${a.width} ${a.height}`)});
 svg.addEventListener('pointerup',()=>pointer=null);svg.addEventListener('pointercancel',()=>pointer=null);
 document.addEventListener('research:entity',e=>{const id=e.detail.id;if(id&&explorer.index&&$('tab-atlas').classList.contains('active')&&id!==explorer.id&&explorer.nodes[id]){pivot(id)}});
 document.querySelectorAll('.go-home,#contextToAtlas').forEach(a=>a.addEventListener('click',()=>{const id=APP?.selectedNodeId;if(explorer.nodes?.[id]&&id!==explorer.id)pivot(id)}));
 loadExplorer();
}
// All figures: one fullscreen mechanism that keeps each *live* graph interactive.
let fallback=null;
function resizeGraphs(){requestAnimationFrame(()=>{window.dispatchEvent(new Event('resize'));if(typeof APP!=='undefined'){for(const key of ['cyGlobal','cyEgo','cyTree'])try{APP[key]?.resize();}catch(e){}}});}
async function toggleFull(target){if(!target)return;if(target.id==='figurePreview')target=target.closest('.figure-full-stage')||target;const open=document.fullscreenElement===target||fallback===target;
 if(open){if(document.fullscreenElement)await document.exitFullscreen().catch(()=>{});if(fallback){fallback.classList.remove('full-fallback');fallback=null;document.body.classList.remove('modal-open');}resizeGraphs();return;}
 if(document.fullscreenElement)await document.exitFullscreen().catch(()=>{});
 if(fallback){fallback.classList.remove('full-fallback');fallback=null;document.body.classList.remove('modal-open')}
 try{if(!target.requestFullscreen)throw Error('unsupported');await target.requestFullscreen()}catch(e){target.classList.add('full-fallback');fallback=target;document.body.classList.add('modal-open')}
 target.classList.add('full-screen-stage');resizeGraphs();
}
function setupFullscreen(){const img=$('figurePreview');if(img&&!img.closest('.figure-full-stage')){const wrap=document.createElement('div');wrap.className='figure-full-stage';img.before(wrap);wrap.append(img)}const targets=[['#networkStage','רשת מלאה'],['#egoNetwork','רשת אגו'],['#treeNetwork','עץ מסורת'],['#geoMap','מפת מקומות'],['#predicateLayerHeat','מפת שכבות'],['#flowSankey','זרימת הקשרים'],['#figurePreview','איור המחקר'],['#heroMapStage','רשת פתוחה'],['#atlasVizStage','מפת מחקר']];
 const managed=new Set();for(const [selector,label] of targets){const el=document.querySelector(selector);if(!el||managed.has(el))continue;managed.add(el);el.classList.add('fullscreen-target');const stage=el.id==='figurePreview'?el.closest('.figure-full-stage'):el;if(stage&&!stage.querySelector(':scope > .fullscreen-internal-exit')){const exitBtn=document.createElement('button');exitBtn.type='button';exitBtn.className='fullscreen-internal-exit';exitBtn.textContent=t('✕ חזרה לתצוגה רגילה','✕ Exit full screen');exitBtn.addEventListener('click',()=>toggleFull(stage));stage.append(exitBtn)}if(el.id==='heroMapStage'||el.id==='atlasVizStage')continue;
 const btn=document.createElement('button');btn.type='button';btn.className='stage-fullscreen-button';btn.setAttribute('aria-label',t('הגדל למסך מלא: '+label,'Full screen: '+label));btn.textContent=t('⛶ מסך מלא','⛶ Full screen');btn.addEventListener('click',()=>toggleFull(el));el.before(btn);
 }
 const close=document.createElement('button');close.type='button';close.id='fullscreenExit';close.textContent=t('✕ סגירה','✕ Close');close.onclick=async()=>{if(document.fullscreenElement)await document.exitFullscreen().catch(()=>{});else if(fallback)toggleFull(fallback)};document.body.append(close);
 document.addEventListener('click',e=>{const btn=e.target.closest('[data-fullscreen],[data-zoom]');if(!btn)return;e.preventDefault();e.stopPropagation();const id=btn.dataset.fullscreen||btn.dataset.zoom;toggleFull(document.querySelector(id));},true);
 document.addEventListener('fullscreenchange',()=>{document.querySelectorAll('.full-screen-stage').forEach(x=>{if(x!==document.fullscreenElement)x.classList.remove('full-screen-stage')});resizeGraphs()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&fallback){const t=fallback;fallback=null;t.classList.remove('full-fallback');document.body.classList.remove('modal-open');resizeGraphs()}});
 document.addEventListener('dblclick',e=>{if(e.target.closest('#heroNetwork, .hero-node, .map-current, button, .controls, .toolbar'))return;const surface=e.target.closest('#geoMap,#networkStage,#egoNetwork,#treeNetwork,#figurePreview,#predicateLayerHeat,#flowSankey,#atlasVizStage');if(surface)toggleFull(surface)});
}
const explanations={
entry:{he:['מה רואים?','כל נקודה מייצגת ישות. ההשוואה היא בין ישות שיש לה ערך עצמאי לבין ישות המוזכרת בערכים אחרים בלבד. גובה הנקודה מייצג מספר ערכים שונים, ולא מספר מילים בטקסט.','מה אפשר ללמוד?','נוכחות של אדם או ספר יכולה להיות גבוהה גם ללא ערך עצמאי. בדקו מקרים חריגים וחזרו אל הערכים שבהם הם נזכרים.','מה לא להסיק?','היעדר ערך אינו עדות שהחיד״א דחה את האדם או את הספר. בנוסף, גבולות הערכים נסמכים על מהדורת בן־יעקב מ־1852.'],en:['What is shown?','Each point is an entity, grouped by whether it has a standalone entry. Height counts distinct mentioning entries, not word frequency.','Research question','Visibility and entry status can diverge. Select outliers and inspect the source entries.','Caution','No entry does not indicate rejection; entry structure follows the 1852 Ben-Jacob edition.']},
personbook:{he:['מה רואים?','כל נקודה מייצגת מחבר. הציר האופקי סופר ערכים המזכירים אותו, והאנכי ערכים המזכירים לפחות אחד מן הספרים המיוחסים לו.','מה אפשר ללמוד?','ספר עשוי להיות נוכח במקומות שבהם המחבר עצמו אינו מוזכר. תצוגת אדם–ספר מאפשרת לפתוח את הנקודה ולראות אילו חיבורים נכללו בחישוב.','מה לא להסיק?','ציר Y סופר ערכים ייחודיים; אינו סכום כל האזכורים. הצבע אינו מדד לחשיבות היסטורית, אלא לפער בין שני מסלולי נוכחות.'],en:['What is shown?','Each point is an author. X counts entries mentioning the person; Y counts distinct entries mentioning one or more linked works.','Research question','Works may be visible where the author is not. Open a point to inspect the attributed books.','Caution','Y is a count of distinct entries, not tokens. Color indicates the balance of modes of presence, not historical importance.']},
centrality:{he:['מה רואים?','אותם אנשים יכולים לקבל דירוג שונה בהתאם למבנה הרשת ולמדד. משמאל רשת ציטוט; מימין רשת קשרים רחבה הכוללת גם זיקות שאינן ציטוטים.','מה אפשר ללמוד?','באיור 4ב, מתוך 15 הראשונים בכל מדד, תשעה בלבד משותפים לשתי הקבוצות. אפשר לחפש חכם ולראות כיצד מקומו משתנה.','מה לא להסיק?','דירוג גבוה אינו אומר שהחכם ״חשוב יותר״. מרכזיות בציטוט, מספר אזכורים ותיווך מבני הן שאלות שונות.'],en:['What is shown?','The same scholars occupy different positions under citation and broader relation-network metrics.','Research question','In Figure 4b, only 9 of the top 15 scholars overlap between two rankings. Search for a scholar to compare positions.','Caution','Rank is specific to a network and measure; it is not a universal historical importance score.']},
hida:{he:['מה רואים?','רשת העדויות בלשון גוף ראשון — ״ראיתי״, ״שמעתי״, ״מצאתי״ — עם הבחנה בין דרגות סיווג: ישיר, סביר, ולבדיקה.','מה אפשר ללמוד?','אפשר לעבור מרשת של דיווחים אל ניסוחם המדויק במקור, ולבדוק איך החיד״א הופך מפגש עם ספר, כתב־יד או ידיעה למסורת כתובה.','מה לא להסיק?','״ראיתי״ עשוי להתייחס לחיבור או לעדות ולא בהכרח למפגש ישיר עם אדם. דרגת ביטחון חילוצית אינה אמת היסטורית מאומתת.'],en:['What is shown?','A first-person evidence graph: saw, heard, found, with direct/probable/review extraction tiers.','Research question','Follow claims back to their wording to study how encounters with texts and reports become bibliographic knowledge.','Caution','“Saw” may refer to a manuscript or testimony, not a meeting with a person. Extraction confidence is not historical certainty.']}
};
let selected='',rankDebounce=null;
function question(){return window.AtlasResearch?.getCurrent?.()||'entry'}
function showGuide(){const box=$('lensReadingGuide');if(!box)return;const texts=explanations[question()]?.[en()?'en':'he'];if(!texts)return;box.replaceChildren();for(let i=0;i<texts.length;i+=2){const details=document.createElement('details');details.className='method-guide';details.open=i===0;const head=document.createElement('summary');head.textContent=texts[i];const p=document.createElement('p');p.textContent=texts[i+1];details.append(head,p);box.append(details)}}
function dataStats(){if(typeof APP==='undefined'||!APP.nodes?.length)return;const c=APP.nodes.reduce((acc,n)=>{acc[n.kind]=(acc[n.kind]||0)+1;acc.entry+=(String(n.in_set).toLowerCase()==='true'?1:0);return acc},{entry:0});const box=$('corpusStats');if(box){box.replaceChildren();for(const [k,v] of [[t('ישויות','Entities'),APP.nodes.length],[t('אנשים','People'),c.person],[t('חיבורים','Works'),c.book],[t('מקומות','Places'),c.place]]){const cell=document.createElement('div'),b=document.createElement('b'),span=document.createElement('span');b.textContent=Number(v||0).toLocaleString();span.textContent=k;cell.append(b,span);box.append(cell)}}}
function selectLensEntity(id){const n=APP?.nodeById?.get(id);if(!n)return;selected=id;window.researchSelectEntity?.(id);const box=$('corpusSelection');box.hidden=false;box.replaceChildren();const left=document.createElement('div');left.className='corpus-selection-name';const h=document.createElement('b');h.textContent=n.label;const p=document.createElement('small');p.textContent=`${id} · ${n.kind} · ${t('אזכורים','mentions')} ${n.a_in_degree}`;left.append(h,p);box.append(left);
 const actions=[['ניתוח מלא','Analyze',()=>window.openEntityAnalysis?.(id)],['רשת פתוחה','Explore',()=>{window.researchGoto?.('atlas');loadExplorer().then(()=>pivot(id));}],['הנתונים','Index',()=>{window.researchGoto?.('data');$('nodeSearch').value=id;$('nodeSearch').dispatchEvent(new Event('input'))}],['מקור','Source',()=>window.jumpToSourceByNodeId?.(id)]];
 for(const [heLabel,enLabel,fn] of actions){const b=document.createElement('button');b.type='button';b.textContent=t(heLabel,enLabel);b.onclick=fn;box.append(b)}
 window.AtlasResearch?.selected?.(id);
}
function renderRanking(){if(typeof APP==='undefined'||!APP.nodes?.length)return;const metric=$('lensRankMetric').value,limit=Number($('lensRankSize').value)||25,q=nrm($('lensEntitySearch').value),kind=$('lensRankKind')?.value||'all';
 const box=$('corpusRanked');const list=APP.nodes.filter(n=>(kind==='all'||n.kind===kind)&&(!q||nrm(n.label).includes(q)||nrm(n.id).includes(q)))
 .sort((a,b)=>Number(b[metric]||0)-Number(a[metric]||0));
 const show=list.slice(0,limit);box.replaceChildren();const table=document.createElement('table');table.className='corpus-ranking-table';const head=document.createElement('thead');head.innerHTML='<tr><th>'+t('שם','Entity')+'</th><th>'+t('אזכורים','Mentions')+'</th><th>'+t('נכנסים','In')+'</th><th>'+t('יוצאים','Out')+'</th><th>'+t('מעבר','Open')+'</th></tr>';table.append(head);
 const body=document.createElement('tbody');show.forEach(n=>{const tr=document.createElement('tr'),cell=document.createElement('td'),b=document.createElement('button');b.className='corpus-row-name';b.type='button';b.textContent=n.label;b.onclick=()=>selectLensEntity(n.id);cell.append(b);tr.append(cell);for(const col of ['a_in_degree','c_in_wdeg','c_out_wdeg']){const td=document.createElement('td');td.textContent=Number(n[col]||0).toLocaleString();tr.append(td)}const td=document.createElement('td'),btn=document.createElement('button');btn.className='corpus-row-action';btn.type='button';btn.textContent=t('ניתוח ←','Analyze →');btn.onclick=()=>window.openEntityAnalysis?.(n.id);td.append(btn);tr.append(td);body.append(tr)});table.append(body);box.append(table);
 setTxt('corpusRankNote',t(`מוצגות ${show.length} מתוך ${list.length} ישויות מתאימות; המספרים מחושבים מטבלת המדדים של כלל הקורפוס.`,`Showing ${show.length} of ${list.length} matched entities. Measures are drawn from the complete corpus metrics.`));}
function setupLens(){['lensRankMetric','lensRankSize','lensRankKind'].forEach(id=>$(id)?.addEventListener('change',renderRanking));$('lensEntitySearch')?.addEventListener('input',()=>{clearTimeout(rankDebounce);rankDebounce=setTimeout(()=>{renderRanking();const q=$('lensEntitySearch').value.trim();const exact=APP?.nodes?.find(n=>n.id===q||nrm(n.label)===nrm(q));if(exact)selectLensEntity(exact.id)},110)});
 $('corpusAllData')?.addEventListener('click',()=>{window.researchGoto?.('data');$('nodeSearch').value='';$('nodeSearch').dispatchEvent(new Event('input'))});
 document.querySelectorAll('.lens-tab').forEach(btn=>btn.addEventListener('click',()=>{requestAnimationFrame(()=>{showGuide();renderRanking()})}));
 document.addEventListener('research:entity',e=>{if(e.detail.id&&$('tab-lenses').classList.contains('active')&&e.detail.id!==selected)selectLensEntity(e.detail.id)});
 dataStats();renderRanking();showGuide();
}
function workspaceGuides(){const notes={
 data:[t('מה רואים? מפתח הישויות כולל גם שמות שאין להם ערך עצמאי. נתוני הנראות מתארים אזכורים בתוך חיבור זה, לא דירוג חשיבות היסטורית.','The index includes entities without independent entries. Counts describe mentions in this corpus, not historical importance.')],
 networks:[t('מה רואים? רשת המבנה (A), רשת ההופעה המשותפת (B) ויחסים מנוסחים (C) הן ראיות מסוגים שונים. יש לבחון את המשפט המקורי לפני שמפרשים קשר כהיסטורי.','Structural entry mentions (A), co-occurrences (B) and asserted relations (C) are different forms of evidence; inspect source wording before historical interpretation.')],
 person:[t('מה רואים? רשת האגו מציגה שכנים והעץ מציג מסלולים שנבחרו לפי סוג יחס וכיוון. אין להסיק שמכלול הקשרים משחזר שושלת היסטורית מלאה.','The ego network and tradition tree show filtered, corpus-derived paths, not a complete historical lineage.')],
 geo:[t('מה רואים? המפה מציגה קשרים למקומות המופיעים בנתונים. מקום דפוס, מקום מגורים ומקום מסע אינם אותה צורה של נוכחות.','The map shows corpus-linked places. Printing sites, residences and travel destinations are different relations.')],
 reports:[t('מה רואים? האיורים הישנים והדוחות מתארים בחירות מדידה ומידול שונות. חזרו אל הנתונים והטקסט כדי לבדוק ממצאים.','The original figures and reports use different modeling and measurement choices; return to the data and text to test findings.')],
 validation:[t('מה רואים? כלי הולידציה בודק עקביות מבנית של הנתונים והממשק; אינו מאמת את הדיוק ההיסטורי של כל זיהוי או קשר.','Validation checks structural consistency; it does not establish historical correctness for every linked entity or relation.')]
 };for(const [key,arr] of Object.entries(notes)){const panel=$('tab-'+key);if(!panel||panel.querySelector('.scholarly-note'))continue;const div=document.createElement('div');div.className='scholarly-note';const b=document.createElement('b');b.textContent=t('מפתח לקריאה','READING GUIDE');const p=document.createElement('p');p.textContent=arr[0];div.append(b,p);const help=panel.querySelector('.help-card');(help||panel).after?.(div);if(!help)panel.prepend(div);}}
function waitForData(){if(window.APP?.nodes?.length){dataStats();setupLens();workspaceGuides();}else window.addEventListener('referenceAtlasReady',()=>{dataStats();setupLens();workspaceGuides()},{once:true})}
window.CorpusExplorer={focus:id=>loadExplorer().then(()=>{if(explorer.nodes?.[id])pivot(id)}),getFocus:()=>explorer.id};
function init(){setupExplorer();setupFullscreen();waitForData();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
