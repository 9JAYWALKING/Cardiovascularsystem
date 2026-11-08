/* 기존 Wiki 편집 문법, 링크, 글자 설정을 공유하는 병리 학습 블록. */
function renderPathologyLearningBlock(line, course, footnotes){
  const data=window.CARDIO_PATHOLOGY_LEARNING;
  if(!data)return '';
  const inline=s=>renderWikiInline(s,course,footnotes);
  if(line==='@pathmap'){
    return `<div class="path-learning path-map" data-path-map tabindex="-1"><div class="path-map-heading"><strong>순환기 병리 전체 지도</strong><span>${course.id}강의 위치</span></div><div class="path-map-grid">${data.courses.map(c=>`<section class="path-map-branch ${Number(course.id)===c.id?'is-current':''}" data-path-course="${c.id}"><div class="path-branch-title"><span>${c.id}강${Number(course.id)===c.id?' · 현재':''}</span><strong>${inline(`[[${c.id}강|${c.title}]]`)}</strong></div><p>${c.subtitle}</p><ul>${c.groups.map(g=>`<li data-path-node="${g.id}">${inline(`[[${c.id}강#${g.heading}|${g.title}]]`)}<small>${g.children}</small></li>`).join('')}</ul></section>`).join('')}</div><p class="path-map-bridge">혈관이 좁아지면 허혈로, 벽이 약해지면 동맥류로, 심근이 손상되면 심부전으로 이어진다.</p></div>`;
  }
  if(line.startsWith('@pathpos ')){
    const id=line.slice(9).trim();const c=data.courses.find(c=>c.groups.some(g=>g.id===id));const g=c?.groups.find(g=>g.id===id);if(!g)return '';
    return `<nav class="path-learning path-location" aria-label="전체 분류에서 현재 위치"><span>순환기 병리 <i aria-hidden="true">›</i> ${c.title} <i aria-hidden="true">›</i> <strong>${g.title}</strong></span><button type="button" data-path-return="${id}">전체 지도 ↑</button></nav>`;
  }
  if(line==='@mitimeline')return `<section class="path-learning path-timeline" data-path-timeline><div class="path-map-heading"><strong>손상에서 흉터까지</strong><span>시간을 눌러 비교</span></div><div class="path-time-buttons" role="group" aria-label="심근경색 후 경과 시간">${data.timeline.map((t,i)=>`<button type="button" data-path-time="${i}" aria-pressed="${i===0}">${t.label}</button>`).join('')}</div><div class="path-time-copy" aria-live="polite">${pathologyTimeCopy(0)}</div></section>`;
  return '';
}
function pathologyTimeCopy(i){
  const t=window.CARDIO_PATHOLOGY_LEARNING.timeline[i];
  return `<h6>${t.title}</h6><dl><div><dt>육안</dt><dd>${t.gross}</dd></div><div><dt>현미경·세포</dt><dd>${t.micro}</dd></div><div><dt>의미</dt><dd>${t.meaning}</dd></div></dl>`;
}
function bindPathologyLearning(container,course){
  if(window.CARDIO_PATHOLOGY_LEARNING?.courses.some(c=>c.id===Number(course.id))){
    container.querySelectorAll('.wiki-note,.jbl-wiki-text').forEach(note=>note.classList.add('wiki-pathology'));
  }
  container.querySelectorAll('[data-path-return]:not([data-path-bound])').forEach(button=>{
    button.dataset.pathBound='1';button.addEventListener('click',()=>{
      const scope=button.closest('.wiki-note,.jbl-wiki-content,.jbl-wiki-text')||container;
      let map=scope.querySelector('[data-path-map]');
      if(!map){
        // A saved section or a narrow Wiki popup may not contain the opening map.
        const inset=document.createElement('details');inset.className='learning-detail path-inline-map';inset.open=true;
        inset.innerHTML='<summary>순환기 병리 전체 지도</summary>'+renderPathologyLearningBlock('@pathmap',course,{items:[],named:new Map()});
        button.closest('.path-location').before(inset);bindWikiDocument(inset,course);map=inset.querySelector('[data-path-map]');
      }
      const disclosure=map.closest('details');if(disclosure)disclosure.open=true;
      map.querySelectorAll('[data-path-node]').forEach(n=>{n.classList.toggle('is-focus',n.dataset.pathNode===button.dataset.pathReturn);});
      const section=map.closest('.wiki-section');
      const toggle=section?.querySelector('[data-wiki-section-toggle][aria-expanded="false"]');toggle?.click();
      const node=map.querySelector(`[data-path-node="${button.dataset.pathReturn}"]`);
      (node||map).scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
      (node?.querySelector('a')||map).focus({preventScroll:true});
    });
  });
  container.querySelectorAll('[data-path-timeline]:not([data-path-bound])').forEach(block=>{
    block.dataset.pathBound='1';block.querySelectorAll('[data-path-time]').forEach(button=>button.addEventListener('click',()=>{
      block.querySelectorAll('[data-path-time]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      block.querySelector('.path-time-copy').innerHTML=pathologyTimeCopy(Number(button.dataset.pathTime));
    }));
  });
}
