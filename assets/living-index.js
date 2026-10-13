(()=>{
 function updateContext(){
  const input=document.getElementById('selectedEntityLabel');if(!input)return;
  const id=(typeof APP!=='undefined'&&APP.selectedNodeId)||'';
  const node=(typeof APP!=='undefined'&&APP.nodeById?.get(id))||null;
  input.textContent=id?(node?.label?`${node.label} · ${id}`:id):(document.documentElement.lang==='he'?'לא נבחרה ישות':'No entity selected');
 }
 window.researchClearEntity=()=>{if(typeof APP!=='undefined'){APP.selectedNodeId='';updateContext();}};
 document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('mobileSettingsToggle')?.addEventListener('click',()=>{const el=document.getElementById('headerSettings');const opened=el.classList.toggle('expanded');document.getElementById('mobileSettingsToggle').setAttribute('aria-expanded',String(opened));});
  document.getElementById('contextToAtlas')?.addEventListener('click',()=>window.researchGoto?.('atlas'));
  document.getElementById('contextToData')?.addEventListener('click',()=>{window.researchGoto?.('data');const id=typeof APP!=='undefined'&&APP.selectedNodeId;if(id){const inp=document.getElementById('nodeSearch');inp.value=id;inp.dispatchEvent(new Event('input'))}});
  document.getElementById('contextToPerson')?.addEventListener('click',()=>{window.researchGoto?.('person');const id=typeof APP!=='undefined'&&APP.selectedNodeId;if(id){document.getElementById('personInput').value=id;document.getElementById('analyzePerson').click()}});
  // Function parity patch: context bar is updated by app's setStatus, no independent data store.
  window.livingIndexContext=updateContext;
  const old=window.researchSelectEntity;
  if(typeof old==='function')window.researchSelectEntity=(id)=>{old(id);updateContext();};
  updateContext();
 });
})();
