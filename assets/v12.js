/* 1.2: interactive knowledge-map navigation and universal chart enlargement. */
(()=>{
const $=(s)=>document.querySelector(s);
const svgNS='http://www.w3.org/2000/svg';
function init(){
 const map=$('#livingMap');
 if(map){
  const svg=map.querySelector('svg');
  const points=[['person',72,257,'data'],['book',401,86,'data'],['mention',230,174,'networks'],['relations',307,274,'person'],['figures',160,54,'lenses'],['geo',408,308,'geo']];
  const routes=[...map.querySelectorAll('.map-route')];
  const choose=(node,target)=>{routes.forEach(b=>b.classList.toggle('chosen',b.dataset.node===node));map.dataset.chosen=node;const b=routes.find(b=>b.dataset.node===node);$('#mapLiveCaption').textContent=b?.textContent||'';window.researchGoto?.(target);if(target==='lenses')window.AtlasResearch?.activate?.();};
  const group=document.createElementNS(svgNS,'g');group.setAttribute('class','map-hotspots');
  for(const [id,x,y,target] of points){const g=document.createElementNS(svgNS,'g');g.setAttribute('class','map-hotspot');g.setAttribute('role','button');g.setAttribute('tabindex','0');g.setAttribute('aria-label',routes.find(b=>b.dataset.node===id)?.textContent||id);g.dataset.node=id;const c=document.createElementNS(svgNS,'circle');c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('r',24);c.setAttribute('fill','transparent');c.setAttribute('stroke','transparent');g.append(c);const halo=document.createElementNS(svgNS,'circle');halo.setAttribute('cx',x);halo.setAttribute('cy',y);halo.setAttribute('r',20);halo.setAttribute('class','map-halo');g.append(halo);g.addEventListener('click',()=>choose(id,target));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(id,target)}});g.addEventListener('mouseenter',()=>{map.dataset.hover=id;$('#mapLiveCaption').textContent=routes.find(b=>b.dataset.node===id)?.textContent||id});g.addEventListener('mouseleave',()=>{map.dataset.hover='';$('#mapLiveCaption').textContent='בחרו נקודת מוצא במפת הידע'});group.append(g)}
  svg.append(group);routes.forEach(b=>{b.addEventListener('click',()=>choose(b.dataset.node,b.dataset.target));b.addEventListener('mouseenter',()=>{map.dataset.hover=b.dataset.node});b.addEventListener('mouseleave',()=>{map.dataset.hover=''})});
 }
 const overlay=document.createElement('div');overlay.id='graphZoomOverlay';overlay.className='graph-zoom-overlay';overlay.hidden=true;overlay.innerHTML='<div class="zoom-top"><span id="zoomCaption">תצוגה מוגדלת</span><button id="zoomClose" type="button" aria-label="סגור הגדלה">✕ סגור</button></div><div class="zoom-content" id="zoomContent"></div>';document.body.append(overlay);
 const content=overlay.querySelector('#zoomContent');let liveClone=null;
 function close(){overlay.hidden=true;content.replaceChildren();document.body.style.overflow='';liveClone=null}
 overlay.querySelector('#zoomClose').onclick=close;
 overlay.addEventListener('click',e=>{if(e.target===overlay)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!overlay.hidden)close()});
 function zoom(source){if(!source)return;content.replaceChildren();const tag=source.tagName.toLowerCase();let node;
  if(tag==='iframe'){node=document.createElement('iframe');node.src=source.src;node.title=source.title;node.setAttribute('allowfullscreen','');node.style.cssText='width:100%;height:100%;border:0;background:white';}
  else if(tag==='canvas'){node=new Image();node.src=source.toDataURL('image/png');node.alt='תצלום של הגרף';}
  else{node=source.cloneNode(true);node.removeAttribute('id');node.style.cssText='width:100%;max-width:100%;height:100%;object-fit:contain';if(tag==='svg')node.setAttribute('preserveAspectRatio','xMidYMid meet');}
  content.append(node);overlay.hidden=false;document.body.style.overflow='hidden';overlay.querySelector('#zoomCaption').textContent=source.closest('.card,.chartbox,.panel,.research-workbench')?.querySelector('h2,h3')?.textContent||'תצוגה מוגדלת';liveClone=node;
 }
 document.addEventListener('click',e=>{const btn=e.target.closest('[data-zoom]');if(btn){zoom($(btn.dataset.zoom));return}if(e.target.closest('[data-viz-zoom]')){zoom($('#atlasVizStage iframe:not([hidden])'));return}});
 // Native graphics and original figures can be enlarged without replacing their interaction in the original workspace.
 document.addEventListener('dblclick',e=>{const el=e.target.closest('svg,canvas,img');if(el&&!el.closest('#livingMap')&&!el.closest('#graphZoomOverlay')&&!el.closest('.leaflet-container'))zoom(el)});
 const workbench=$('#atlasVizStage');if(workbench){const z=document.createElement('button');z.type='button';z.className='viz-zoom-button';z.dataset.vizZoom='1';z.textContent='⤢ הגדל הדמיה';workbench.parentElement.prepend(z)}
 // Make zoom controls discoverable for existing small visualizations and figure preview.
 const ids=['network','egoNetwork','treeNetwork','geoMap'];ids.forEach(id=>{const el=document.getElementById(id);if(!el)return;const b=document.createElement('button');b.type='button';b.className='inline-zoom-button';b.textContent='⤢ הגדל';b.onclick=()=>{const surface=el.querySelector('canvas,svg')||el;zoom(surface)};el.parentElement?.insertBefore(b,el)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
