/* Bridge: preserve independent visualizations, without nested scroll panels. */
(()=>{
 if(!new URLSearchParams(location.search).has('embedded'))return;
 document.body.classList.add('embedded');
 let frame=0,lastHeight=0;
 function measure(){
   cancelAnimationFrame(frame);
   frame=requestAnimationFrame(()=>{
     // Never derive height from scrollHeight: that includes the iframe viewport and causes feedback loops.
     const children=[...document.body.children].filter(el=>!['SCRIPT','STYLE'].includes(el.tagName) && getComputedStyle(el).position!=='fixed');
     const bottom=children.reduce((max,el)=>Math.max(max,el.getBoundingClientRect().bottom+window.scrollY),0);
     const height=Math.ceil(bottom+18);
     if(height>220&&Math.abs(height-lastHeight)>5){lastHeight=height;window.parent.postMessage({kind:'lens-size',height},location.origin==='null'?'*':location.origin);}
   });
 }
 window.addEventListener('load',()=>{measure();setTimeout(measure,250)});
 if('ResizeObserver' in window)new ResizeObserver(measure).observe(document.body);
 window.addEventListener('resize',measure);
})();
