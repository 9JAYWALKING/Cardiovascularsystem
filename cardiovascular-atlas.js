(() => {
  const route='#cardiovascular-atlas';
  function audit(courses=[]) {
    const available=new Set(courses.map(c=>Number(c.id)));
    return (window.CARDIOVASCULAR_STARTER?.chapters||[]).flatMap(ch=>ch.lectureIds.filter(id=>!available.has(id)).map(id=>({chapter:ch.id,missingLecture:id})));
  }
  function render(root,options={}) {
    if(!root)return;
    const data=window.CARDIOVASCULAR_STARTER;
    if(!data){root.innerHTML='<p class="personal-note-empty">큰 그림을 불러오지 못했습니다. 새로고침해 주세요.</p>';return;}
    root.atlasOptions=options;
    if(root.dataset.atlasVersion!==data.version){
      root.innerHTML=`<article class="ra-root ra-content cv-atlas">${data.html}</article>`;
      root.dataset.atlasVersion=data.version;
      root.addEventListener('click',event=>{
        const reader=event.target.closest('.ca-figure-reading>summary');
        if(reader)reader.parentElement.dataset.manualReading='true';
        const link=event.target.closest('a');
        if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
        if(link.hasAttribute('data-atlas-lecture')){
          history.replaceState({...history.state,atlasScroll:window.scrollY},'',location.href);
          root.atlasOptions?.onLectureNavigation?.(Number(link.dataset.atlasLecture));
        }else if(link.getAttribute('href')===location.hash&&link.getAttribute('href').startsWith(route)){
          event.preventDefault();scroll(root,link.getAttribute('href').slice(route.length+1));
        }
      });
      const fit=()=>{
        const article=root.querySelector('.cv-atlas');if(!article||!article.clientWidth)return;
        const scale=(parseFloat(getComputedStyle(article).fontSize)||18)/18;
        const open=article.clientWidth<640*scale;
        root.querySelectorAll('[data-auto-reading]:not([data-manual-reading])').forEach(d=>{d.open=open;});
      };
      const observer=new ResizeObserver(fit);observer.observe(root);
      const preferences=new MutationObserver(fit);preferences.observe(document.documentElement,{attributes:true,attributeFilter:['style','class','data-theme']});
      requestAnimationFrame(fit);
    }
    const catalog=new Map((options.courses||[]).map(c=>[Number(c.id),c]));
    root.querySelectorAll('[data-atlas-lecture]').forEach(a=>{
      const c=catalog.get(Number(a.dataset.atlasLecture));
      if(c){a.title=`${c.id}강 ${c.title} · ${c.professor} 교수`;a.setAttribute('aria-label',a.title);}
    });
    requestAnimationFrame(()=>requestAnimationFrame(()=>scroll(root,options.section||'',true)));
  }
  function scroll(root,section,restore=false) {
    if(restore&&Number.isFinite(history.state?.atlasScroll)){
      window.scrollTo({top:history.state.atlasScroll,behavior:'instant'});return;
    }
    const target=section&&root.querySelector('#ca-'+CSS.escape(section));
    if(target){target.scrollIntoView({block:'start',behavior:'instant'});const focus=target.matches('h3')?target:target.querySelector('h2');if(focus){focus.tabIndex=-1;focus.focus({preventScroll:true});}}
    else window.scrollTo({top:0,behavior:'instant'});
  }
  window.CardiovascularAtlas={render,audit,get groups(){return window.CARDIOVASCULAR_STARTER?.chapters||[];}};
})();
