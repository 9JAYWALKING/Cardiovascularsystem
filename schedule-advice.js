/* Timetable study advice: separate from lecture navigation and exam answers. */
(() => {
  'use strict';
  const data = window.SCHEDULE_ADVICE_DATA;
  if (!data) return;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const chevron = '<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="m6 3 5 5-5 5"/></svg>';
  const pill = (key,extra='') => `<span class="op-tier" data-op-tier="${esc(key)}" ${extra}>${esc(data.tiers[key].label)}</span>`;
  let dialog;
  let trigger;

  function getDialog() {
    if (dialog) return dialog;
    dialog = document.createElement('dialog');
    dialog.className = 'schedule-advice-dialog';
    dialog.id = 'schedule-advice-dialog';
    dialog.setAttribute('aria-labelledby','schedule-advice-title');
    dialog.innerHTML = '<header class="op-dialog-head"><div data-op-heading></div><button type="button" class="op-dialog-close" aria-label="공부 조언 닫기" autofocus><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></header><div class="op-dialog-body" data-op-body></div>';
    dialog.querySelector('.op-dialog-close').addEventListener('click',()=>dialog.close());
    // Close only when both the down and up occur on the backdrop, not when a
    // drag that started in the content ends outside the panel.
    let backdropStart = false;
    const outside = event => {
      const r=dialog.getBoundingClientRect();
      return event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom;
    };
    dialog.addEventListener('pointerdown',event=>{backdropStart=event.target===dialog&&outside(event);});
    dialog.addEventListener('click',event=>{
      if (event.target.closest('a[href]')) { dialog.close('navigate'); return; }
      if (backdropStart&&event.target===dialog&&outside(event)) dialog.close();
      backdropStart=false;
    });
    dialog.addEventListener('close',()=>{
      document.body.classList.remove('schedule-advice-open');
      if(dialog.returnValue!=='navigate'&&trigger?.isConnected) trigger.focus({preventScroll:true});
    });
    document.body.append(dialog);
    return dialog;
  }

  function show(title,subtitle,body,opener) {
    const d=getDialog();
    trigger=opener;
    d.querySelector('[data-op-heading]').innerHTML=`<p class="op-eyebrow">${esc(subtitle)}</p><h2 id="schedule-advice-title">${esc(title)}</h2>`;
    const content=d.querySelector('[data-op-body]');
    content.innerHTML=body;
    d.returnValue='';
    if(!d.open)d.showModal();
    document.body.classList.add('schedule-advice-open');
    content.scrollTop=0;
  }

  function openCourse(id,opener) {
    const c=data.courses[id];
    if(!c)return;
    const t=data.tiers[c.tier],p=data.profiles[c.professor];
    const examples=c.questions.length ? `<nav class="op-example-links" aria-label="판정 근거 문항">${c.questions.map(q=>`<a href="#jbl-q-${encodeURIComponent(q.id)}" aria-label="J ${esc(q.id)} 근거 문항 보기" title="${esc(q.source)}"><span aria-hidden="true">J</span> ${esc(q.id)}</a>`).join('')}</nav>` : '';
    const review=c.hideReview ? '' : `<section class="op-section"><h3>수업에서 챙길 것</h3><p>${esc(p.classTip)}</p><div class="op-review"><span class="op-source-label">${p.page?'선배 리뷰 · '+p.page+'쪽':'현재 담당자 후기 없음'}</span><p>${esc(p.review)}</p></div></section>`;
    const history=p.history&&!c.hideReview ? `<p>${esc(p.history)}</p>` : '';
    show(`${c.courseId}강 · ${c.title}`,`${c.professor} 교수 · 공부 방향`,
      `<div class="op-advice-lead"><div class="op-tier-line">${pill(c.tier)}<span class="op-basis">${esc(c.basis||'후기 + 기출 대조')}</span></div><h3>${esc(c.summary)}</h3><p>${esc(c.study)}</p></div>
      ${review}
      <section class="op-section"><h3>${c.tier==='new-course'?'관련 기출 활용':'기출에서 확인한 경향'}</h3><p>${esc(c.evidence)}</p>${examples}${c.material?`<p class="op-material">${esc(c.material)}</p>`:''}<p class="op-sample">${c.tier==='new-course'?'동일 강의의 과거 출제 이력 없음':`현재 담당자 표기 문항 ${c.stats.count}개${c.stats.years.length?' · 확보 연도 '+c.stats.years.join(' · '):''}<br>현재 배정 자료 기준이며, 실제 출제량을 뜻하지 않습니다.`}</p></section>
      ${c.caveat?`<aside class="op-caveat"><strong>함께 확인</strong><p>${esc(c.caveat)}</p></aside>`:''}
      <details class="op-method"><summary>분류 기준·자료 범위</summary><p><strong>${esc(t.label)}</strong> · ${esc(t.description)}</p>${history}<p>${esc(data.method)}</p><p>${esc(data.scope)}</p><p class="op-sample">${esc(data.sources)}<br>${esc(data.version)} 검토</p></details>
      <a class="op-course-link" href="#lecture-${c.courseId}">${c.stats.hasWiki?'Wiki · J로 이어서 공부':'강의 · J 보기'}${chevron}</a>`,opener);
  }

  function openGuide(opener) {
    show('나에게 맞는 공부 순서','OP · 강의별 출제 경향',
      `<p class="op-guide-intro">같은 교수라도 강의마다 필요한 공부가 달라요. 배지를 누르면 공부 순서와 근거 문항을 볼 수 있어요.</p><div class="op-guide-list">${Object.entries(data.tiers).map(([key,t])=>`<div>${pill(key)}<p>${esc(t.description)}</p></div>`).join('')}</div><p class="op-caveat">${esc(data.scope)}</p><p class="op-sample">${esc(data.sources)}<br>${esc(data.version)} 검토</p>`,opener);
  }

  function renderBadge(course) {
    const c=data.courses[course.id];
    if(!c || c.professor!==course.professor.trim())return '';
    return `<button type="button" class="schedule-advice" data-schedule-advice="${c.courseId}" aria-haspopup="dialog" aria-controls="schedule-advice-dialog" aria-label="${c.courseId}강 ${esc(c.title)}, ${esc(data.tiers[c.tier].label)}: ${esc(c.summary)}. 공부 조언 보기" title="${esc(c.summary)}"><span class="op-badge-row">${pill(c.tier)}${chevron}</span><span class="op-card-advice">${esc(c.summary)}</span></button>`;
  }

  function bind(root) {
    root.querySelectorAll('[data-schedule-advice]').forEach(button=>button.addEventListener('click',()=>openCourse(button.dataset.scheduleAdvice,button)));
  }
  document.querySelector('[data-schedule-op-guide]')?.addEventListener('click',event=>openGuide(event.currentTarget));
  window.ScheduleAdvice={renderBadge,bind};
})();
