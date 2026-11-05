/* Small, buildless UI layer. Course/question/notes storage remains in the main app. */
(() => {
  'use strict';
  if (new URLSearchParams(location.search).get('examPreview') === '1') return;
  const app = window.CardiovascularStudy;
  if (!app) return;
  // Per-question countdown, separate from the named study timer and exam timer.
  const quickKey='cardiovascular-question-quick-mode-v1',quickSecondsKey='cardiovascular-question-quick-seconds-v1',quickTimedKey='cardiovascular-question-quick-timed-v1';
  const validQuickSeconds=n=>Number.isInteger(n)&&n>=2&&n<=3600&&(n<10?n%2===0:n%10===0);
  const quickStep=direction=>direction<0?(quickSeconds<=10?2:10):(quickSeconds<10?2:10);
  let quickEnabled=false,quickTimed=true,quickSeconds=60,quickRun=null,quickLastTick=performance.now();
  try{quickEnabled=localStorage.getItem(quickKey)==='true';quickTimed=localStorage.getItem(quickTimedKey)!=='false';const saved=Number(localStorage.getItem(quickSecondsKey));if(validQuickSeconds(saved))quickSeconds=saved;}catch(_){}
  const quickBar=document.createElement('div');quickBar.className='study-quick-countdown';quickBar.hidden=true;
  quickBar.setAttribute('role','progressbar');quickBar.setAttribute('aria-label','문항 남은 시간');quickBar.innerHTML='<span></span>';document.body.append(quickBar);
  const quickContext=()=>window.CardiovascularPathology?.timedQuestion?.()||window.CardiovascularKMLE?.timedQuestion?.()||app.quickQuestionContext?.();
  const cancelQuick=()=>{quickRun=null;quickLastTick=performance.now();quickBar.hidden=true;};
  function startQuick(context){quickRun={key:context.key,remaining:quickSeconds*1000,phase:quickTimed?'countdown':'waiting',wait:0,advance:null};quickLastTick=performance.now();}
  function paintQuick(){
    quickBar.hidden=!quickEnabled||!quickRun||quickRun.phase!=='countdown';
    if(quickBar.hidden)return;
    const left=Math.max(0,Math.min(1,quickRun.remaining/(quickSeconds*1000)));
    quickBar.firstElementChild.style.transform=`scaleX(${left})`;
    quickBar.firstElementChild.style.opacity=String(.2+.62*(1-left));
    const seconds=String(Math.ceil(quickRun.remaining/1000));
    if(quickBar.getAttribute('aria-valuenow')!==seconds){quickBar.setAttribute('aria-valuenow',seconds);quickBar.setAttribute('aria-valuemin','0');quickBar.setAttribute('aria-valuemax',String(quickSeconds));quickBar.setAttribute('aria-valuetext',seconds+'초 남음');}
  }
  function tickQuick(now){
    const elapsed=Math.max(0,now-quickLastTick);quickLastTick=now;
    const context=quickEnabled?quickContext():null;
    if(!context){quickRun=null;quickBar.hidden=true;requestAnimationFrame(tickQuick);return;}
    const changed=!quickRun||quickRun.key!==context.key;
    if(changed)startQuick(context);
    const paused=document.hidden||context.paused||Boolean(document.querySelector('dialog[open],.wiki-section-editor-overlay,#jbl-image-modal.show'));
    if(!paused&&!changed){
      if(quickRun.phase==='countdown'){
        quickRun.remaining=Math.max(0,quickRun.remaining-elapsed);
        if(quickRun.remaining===0){quickRun.phase='feedback';quickRun.wait=1000;quickRun.advance=context.next;context.reveal();}
      }else if(quickRun.phase==='feedback'){
        quickRun.wait-=elapsed;
        if(quickRun.wait<=0){const advance=quickRun.advance;quickRun.phase='done';quickRun.advance=null;advance?.();}
      }
    }
    paintQuick();requestAnimationFrame(tickQuick);
  }
  window.CardiovascularQuickMode={
    isEnabled:()=>quickEnabled,isTimed:()=>quickTimed,getSeconds:()=>quickSeconds,cancel:cancelQuick,
    setEnabled(value){cancelQuick();quickEnabled=!!value;try{localStorage.setItem(quickKey,String(quickEnabled));}catch(_){}},
    setTimed(value){quickTimed=!!value;cancelQuick();try{localStorage.setItem(quickTimedKey,String(quickTimed));}catch(_){}},
    setSeconds(value){const n=Number(value),step=n<10?2:10;quickSeconds=Number.isFinite(n)?Math.max(2,Math.min(3600,Math.round(n/step)*step)):60;cancelQuick();try{localStorage.setItem(quickSecondsKey,String(quickSeconds));}catch(_){}},
    schedule(advance,correct=false){
      if(!quickEnabled)return;const context=quickContext();if(!context)return;
      if(!quickRun||quickRun.key!==context.key)startQuick(context);
      quickRun.phase='feedback';quickRun.wait=correct?500:1000;quickRun.advance=advance;quickLastTick=performance.now();paintQuick();
    },
    status:()=>quickRun?{key:quickRun.key,remaining:quickRun.remaining,phase:quickRun.phase,seconds:quickSeconds,timed:quickTimed}:null
  };
  addEventListener('hashchange',cancelQuick);
  document.addEventListener('visibilitychange',()=>{quickLastTick=performance.now();});
  addEventListener('storage',event=>{
    if(event.key===quickKey||event.key===null){quickEnabled=event.key!==null&&event.newValue==='true';cancelQuick();}
    if(event.key===quickTimedKey||event.key===null){quickTimed=event.key===null||event.newValue!=='false';cancelQuick();}
    if(event.key===quickSecondsKey||event.key===null){const n=Number(event.newValue);quickSeconds=event.key!==null&&validQuickSeconds(n)?n:60;cancelQuick();}
    if(dialog.open)renderTools();
  });
  requestAnimationFrame(tickQuick);
  const shell = document.querySelector('.masthead');
  const syncHeaderHeight=()=>document.documentElement.style.setProperty('--study-header-height',shell.getBoundingClientRect().height+'px');
  const headerObserver=new ResizeObserver(syncHeaderHeight);
  headerObserver.observe(shell);
  syncHeaderHeight();
  const actions = shell.querySelector('.top-actions');
  document.body.classList.add('study-ui');
  const icons = {
    quick:'<path d="m13 2-9 12h7l-1 8L20 9h-7l1-7Z"/>',
    calendar:'<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4m8-4v4M4 10h16m-11 4h2m2 0h2m-6 3h2"/>',
    collapse:'<path d="M5 12h14"/>',
    expand:'<path d="M5 12h14M12 5v14"/>',
    unanswered:'<rect x="4" y="4" width="16" height="16"/>',
    correct:'<circle cx="12" cy="12" r="8"/>',
    uncertain:'<path d="M12 4 22 21H2Z"/>',
    wrong:'<path d="m5 5 14 14M19 5 5 19"/>',
    favorite:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>',
    shuffle:'<path d="M3 6h3c5 0 7 12 12 12h3m-4-4 4 4-4 4M3 18h3c5 0 7-12 12-12h3m-4-4 4 4-4 4"/>',
    lectureOrder:'<path d="M4 4v16m-3-3 3 3 3-3M11 5h10M11 12h7M11 19h4"/>',
    hand:'<path d="M18 11V7a2 2 0 0 0-4 0v4M14 10V5a2 2 0 0 0-4 0v6M10 10.5V7a2 2 0 0 0-4 0v9M18 8a2 2 0 0 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-1-6-3l-3.6-4.8a2 2 0 0 1 3.2-2.4L6 13"/>',
    edit:'<path d="m15 5 4 4M4 20l4-1L20 7a2.8 2.8 0 0 0-4-4L4 15l-1 6Z"/>',
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    tools:'<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2" fill="currentColor"/><circle cx="15" cy="12" r="2" fill="currentColor"/><circle cx="8" cy="18" r="2" fill="currentColor"/>'
  };
  const svg = name => '<svg viewBox="0 0 24 24" aria-hidden="true">'+icons[name]+'</svg>';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const button = (attr,label,icon) => {
    const el=document.createElement('button');el.type='button';el.className='study-icon-button';el.setAttribute(attr,'');el.setAttribute('aria-label',label);el.title=label;el.innerHTML=svg(icon);return el;
  };
  const search=button('data-study-search','Wiki · J 검색','search');
  const tools=button('data-study-tools','도구 열기','tools');
  tools.setAttribute('aria-haspopup','dialog');tools.setAttribute('aria-controls','study-control-center');tools.setAttribute('aria-expanded','false');
  actions.prepend(search);actions.append(tools);
  const examDate=window.SITE_CONFIG?.examDate || '';
  const ddayStorageKey='cardiovascular-exam-dday-visible-v1';
  let ddayEnabled=false;
  try{ddayEnabled=localStorage.getItem(ddayStorageKey)==='true';}catch(_){}
  const examDday=document.createElement('span');
  examDday.className='study-exam-dday';
  examDday.hidden=!ddayEnabled || !examDate;
  search.before(examDday);
  function updateExamDday(){
    if(!examDate){examDday.hidden=true;examDday.textContent='';return;}
    const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const value=type=>Number(parts.find(part=>part.type===type).value);
    const today=Date.UTC(value('year'),value('month')-1,value('day'));
    const remaining=Math.round((Date.parse(examDate+'T00:00:00Z')-today)/86400000);
    examDday.textContent=remaining>0?'D−'+remaining:remaining===0?'D-DAY':'D+'+Math.abs(remaining);
    examDday.title='시험일: '+examDate+' · 한국시간 기준';
    examDday.setAttribute('aria-label',remaining>0?'시험까지 '+remaining+'일':remaining===0?'오늘 시험':'시험 종료 후 '+Math.abs(remaining)+'일');
  }
  updateExamDday();
  window.setInterval(updateExamDday,1000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateExamDday();});
  const dialog=document.createElement('dialog');dialog.id='study-control-center';dialog.setAttribute('aria-label','도구');document.body.append(dialog);
  const timerKey='cardiovascular-study-timer-v1';
  let studyTimer=null,timerEditorOpen=false,timerDraft='25',timerNameDraft='';
  function readTimer(raw){
    try{const t=JSON.parse(raw);if(t&&Number.isInteger(t.minutes)&&t.minutes>=1&&t.minutes<=1440&&Number.isFinite(t.startedAt)&&Number.isFinite(t.endsAt)&&t.endsAt-t.startedAt===t.minutes*60000)return {...t,name:typeof t.name==='string'?t.name.trim().slice(0,80):''};}catch(_){}
    return null;
  }
  try{studyTimer=readTimer(localStorage.getItem(timerKey));if(studyTimer){timerDraft=String(studyTimer.minutes);timerNameDraft=studyTimer.name||'';}}catch(_){}
  const timerDisplay=document.createElement('div');
  timerDisplay.className='study-header-timer';timerDisplay.hidden=true;
  timerDisplay.setAttribute('role','timer');timerDisplay.setAttribute('aria-live','off');
  timerDisplay.innerHTML='<span class="study-timer-caption"><span class="study-timer-name" hidden></span><span class="study-timer-label"></span></span><span class="study-timer-track" aria-hidden="true"><span class="study-timer-elapsed"></span><span class="study-timer-dot"></span></span>';
  actions.before(timerDisplay);
  const timerLabel=timerDisplay.querySelector('.study-timer-label'),timerName=timerDisplay.querySelector('.study-timer-name');
  function updateStudyTimer(){
    timerDisplay.hidden=!studyTimer;shell.classList.toggle('has-study-timer',!!studyTimer);
    if(!studyTimer)return;
    const remaining=Math.max(0,studyTimer.endsAt-Date.now());
    const minutes=Math.ceil(remaining/60000);
    const progress=Math.max(0,Math.min(1,1-remaining/(studyTimer.minutes*60000)));
    const label=minutes+'분';
    if(timerLabel.textContent!==label)timerLabel.textContent=label;
    const name=studyTimer.name||'';
    if(timerName.textContent!==name){timerName.textContent=name;timerName.title=name;}
    timerName.hidden=!name;timerDisplay.classList.toggle('has-name',!!name);
    timerDisplay.setAttribute('aria-label',(name?name+' · ':'')+(minutes?'타이머 '+minutes+'분 남음':'타이머 종료'));
    timerDisplay.style.setProperty('--timer-progress',String(progress));
    timerDisplay.classList.toggle('is-finished',remaining===0);
  }
  function saveStudyTimer(){try{if(studyTimer)localStorage.setItem(timerKey,JSON.stringify(studyTimer));else localStorage.removeItem(timerKey);}catch(_){}updateStudyTimer();}
  const timerIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="14" r="8"/><path d="M9 2h6m-3 0v4m6 1 2 2m-8 1v5l3 2"/></svg>';
  function timerToolsHTML(){return `<section class="study-center-section study-timer-tools"><div class="study-timer-heading"><button type="button" class="study-random-toggle" data-center-timer aria-pressed="${!!studyTimer}" aria-expanded="${timerEditorOpen}" aria-controls="study-timer-form"><span class="study-filter-icon">${timerIcon}</span><span>타이머</span></button><div class="study-timer-buttons" ${timerEditorOpen||studyTimer?'':'hidden'}><button type="submit" form="study-timer-form" class="study-timer-start">시작</button>${studyTimer?'<button type="button" data-timer-stop>중지</button>':''}</div></div><form id="study-timer-form" class="study-timer-form" ${timerEditorOpen?'':'hidden'}><label class="study-timer-field study-timer-name-field" for="study-timer-name"><span>이름</span><div class="study-timer-input-wrap"><input id="study-timer-name" name="timerName" type="text" maxlength="80" value="${escape(timerNameDraft)}" placeholder="예: 병리 복습" autocomplete="off"></div></label><label class="study-timer-field study-timer-minutes-field" for="study-timer-minutes"><span>시간</span><div class="study-timer-input-wrap"><input id="study-timer-minutes" name="minutes" type="number" inputmode="numeric" min="1" max="1440" step="1" required value="${escape(timerDraft)}" autocomplete="off" aria-label="타이머 시간(분)"><span aria-hidden="true">분</span></div></label></form></section>`;}
  function bindTimerTools(){
    const toggle=dialog.querySelector('[data-center-timer]'),form=dialog.querySelector('#study-timer-form'),input=dialog.querySelector('#study-timer-minutes');
    toggle.onclick=()=>{timerEditorOpen=!timerEditorOpen;form.hidden=!timerEditorOpen;toggle.setAttribute('aria-expanded',String(timerEditorOpen));dialog.querySelector('.study-timer-buttons').hidden=!timerEditorOpen&&!studyTimer;if(timerEditorOpen){input.focus({preventScroll:true});input.select();requestAnimationFrame(()=>form.scrollIntoView({block:'nearest',behavior:'smooth'}));}};
    dialog.querySelector('.study-timer-start').addEventListener('click',()=>{
      if(!form.checkValidity() && form.hidden){timerEditorOpen=true;form.hidden=false;toggle.setAttribute('aria-expanded','true');}
    });
    input.oninput=()=>{timerDraft=input.value;};
    const nameInput=dialog.querySelector('#study-timer-name');
    nameInput.oninput=()=>{timerNameDraft=nameInput.value;};
    form.onsubmit=event=>{
      event.preventDefault();if(!form.reportValidity())return;
      const minutes=Number(input.value);if(!Number.isInteger(minutes)||minutes<1||minutes>1440)return;
      const startedAt=Date.now();timerNameDraft=nameInput.value.trim();studyTimer={name:timerNameDraft,minutes,startedAt,endsAt:startedAt+minutes*60000};timerDraft=String(minutes);timerEditorOpen=false;
      saveStudyTimer();renderTools();close(true);
    };
    dialog.querySelector('[data-timer-stop]')?.addEventListener('click',()=>{studyTimer=null;timerEditorOpen=false;saveStudyTimer();renderTools();});
  }
  updateStudyTimer();
  setInterval(()=>{if(!document.hidden)updateStudyTimer();},250);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateStudyTimer();});
  addEventListener('pageshow',updateStudyTimer);
  addEventListener('storage',event=>{if(event.key===timerKey||event.key===null){studyTimer=event.key===null?null:readTimer(event.newValue);if(studyTimer){timerDraft=String(studyTimer.minutes);timerNameDraft=studyTimer.name||'';}updateStudyTimer();if(dialog.open)renderTools();}});
  const recall=document.createElement('button');
  recall.type='button';recall.className='study-lecture-recall';recall.hidden=true;
  recall.setAttribute('aria-label','강의 제목 바 펼치기');recall.setAttribute('aria-expanded','false');
  recall.innerHTML='<span aria-hidden="true"></span>';document.body.append(recall);
  let recalledBar=null,barPlaceholder=null;
  function closeRecalledBar() {
    recalledBar?.classList.remove('is-recalled');
    barPlaceholder?.remove();barPlaceholder=null;recalledBar=null;
    recall.setAttribute('aria-expanded','false');recall.setAttribute('aria-label','강의 제목 바 펼치기');
  }
  function syncLectureRecall() {
    if(document.body.classList.contains('context-link-open')){
      closeRecalledBar();recall.hidden=true;return;
    }
    const bar=document.querySelector('#detail-view:not([hidden]) .detail-bar');
    if(!bar || (recalledBar && recalledBar!==bar))closeRecalledBar();
    if(!bar){recall.hidden=true;return;}
    const edge=shell.getBoundingClientRect().bottom;
    const rect=(barPlaceholder||bar).getBoundingClientRect();
    const outside=rect.bottom<=edge+1;
    if(!outside && recalledBar)closeRecalledBar();
    recall.hidden=!outside;
  }
  recall.addEventListener('click',()=>{
    if(recalledBar){closeRecalledBar();syncLectureRecall();return;}
    const bar=document.querySelector('#detail-view:not([hidden]) .detail-bar');if(!bar)return;
    barPlaceholder=document.createElement('div');barPlaceholder.className='study-lecture-placeholder';
    const rect=bar.getBoundingClientRect();barPlaceholder.style.height=rect.height+'px';
    bar.before(barPlaceholder);recalledBar=bar;bar.classList.add('is-recalled');
    recall.setAttribute('aria-expanded','true');recall.setAttribute('aria-label','강의 제목 바 접기');
  });
  document.addEventListener('scroll',syncLectureRecall,{passive:true,capture:true});
  document.addEventListener('context-link-visibility',syncLectureRecall);
  document.addEventListener('lecture-question-navigation',()=>{closeRecalledBar();syncLectureRecall();});
  window.addEventListener('resize',syncLectureRecall);
  new MutationObserver(syncLectureRecall).observe(document.querySelector('main'),{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
  const minScale=.5, maxScale=1.5;
  let returnFocus=null, sourceScroll=0, typographyOpen=false;
  let closeTimer=null, motionVersion=0, travel=120;
  const reducedMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function reveal(progress, dragging=false) {
    const value=Math.max(0,Math.min(1,progress));
    dialog.classList.toggle('is-dragging',dragging);
    dialog.style.setProperty('--study-center-y',(-travel*(1-value))+'px');
    dialog.style.setProperty('--study-center-opacity',String(value));
    dialog.style.setProperty('--study-center-backdrop',String(value));
  }
  function stopClosing() {
    motionVersion++;
    if(closeTimer!==null){window.clearTimeout(closeTimer);closeTimer=null;}
    dialog.classList.remove('is-closing');
  }
  const typographyKey='cardiovascular-typography-v1';
  const baseFont='Pretendard,"Noto Sans KR","Apple SD Gothic Neo",system-ui,sans-serif';
  const fonts={
    default:{label:'기본 고딕',family:baseFont},
    nanum:{label:'나눔고딕',family:'"Study Nanum Gothic",'+baseFont},
    maru:{label:'마루부리',family:'"MaruBuri Learning","Noto Serif KR",serif'},
    barunpen:{label:'나눔바른펜',family:'"Study Nanum Barunpen",'+baseFont},
    hanna:{label:'배민 한나체 Air',family:'"Study Hanna Air","Study Nanum Gothic",'+baseFont}
  };
  const typeScopes=[
    {id:'ui',label:'화면 UI',hint:'메뉴 · 버튼 · 시간표',sample:'시간표 · 즐겨찾기 · 다음 문제'},
    {id:'content',label:'학습 내용',hint:'Wiki · 발문 · 선지 · 상세 해설',sample:'심박출량 = 심박수 × 일회박출량'},
    {id:'note',label:'선지 해설',hint:'선지 아래 암기 문장 · 요약',sample:'β₁ 차단 → 심박수↓ · Propranolol'}
  ];
  const defaultTypography=()=>({version:1,ui:{font:'default',scale:1},content:{font:'default',scale:1},note:{font:'maru',scale:1}});
  const normalizeTypography=value=>{
    const result=defaultTypography();
    if(!value||typeof value!=='object')return result;
    for(const {id} of typeScopes){
      const item=value[id];if(!item||typeof item!=='object')continue;
      if(Object.hasOwn(fonts,item.font))result[id].font=item.font;
      if(typeof item.scale==='number'&&Number.isFinite(item.scale))result[id].scale=Math.round(Math.min(maxScale,Math.max(minScale,item.scale))*100)/100;
    }
    return result;
  };
  let typography=defaultTypography();
  try{
    const saved=localStorage.getItem(typographyKey);
    if(saved!==null)typography=normalizeTypography(JSON.parse(saved));
    else{
      const legacy=Number(localStorage.getItem('cardiovascular-reading-scale-v1'));
      if(legacy>=minScale&&legacy<=maxScale){typography.content.scale=legacy;typography.note.scale=legacy;}
    }
  }catch(_){}
  function applyTypography(){
    const style=document.documentElement.style;
    for(const {id} of typeScopes){
      style.setProperty('--study-'+id+'-scale',String(typography[id].scale));
      // Leaving the default family unset preserves the original J/system font stacks.
      if(typography[id].font==='default'&&id!=='note')style.removeProperty('--study-'+id+'-font');
      else style.setProperty('--study-'+id+'-font',fonts[typography[id].font].family);
    }
    style.setProperty('--study-text-scale',String(typography.content.scale));
    syncTypographyControls();
    requestAnimationFrame(()=>{syncHeaderHeight();if(dialog.open)positionTools();});
  }
  function saveTypography(){
    try{localStorage.setItem(typographyKey,JSON.stringify(typography));}catch(_){}
    applyTypography();
  }
  function syncTypographyControls(){
    for(const {id} of typeScopes){
      const group=dialog.querySelector('[data-type-scope="'+id+'"]');if(!group)continue;
      const item=typography[id];
      group.querySelector('select').value=item.font;
      group.querySelector('[data-type-percent]').textContent=Math.round(item.scale*100)+'%';
      group.querySelector('[data-type-step="-1"]').disabled=item.scale<=minScale;
      group.querySelector('[data-type-step="1"]').disabled=item.scale>=maxScale;
    }
  }
  function typographyToolsHTML(){
    return `<section id="study-typography-settings" class="study-center-section study-typography" ${typographyOpen?'':'hidden'}>
      <div class="study-type-heading"><h3>글꼴 변경</h3><button type="button" data-type-reset>기본값으로</button></div>
      ${typeScopes.map(({id,label,hint,sample})=>{
        const item=typography[id];
        return `<div class="study-type-group" data-type-scope="${id}"><label for="study-type-${id}"><strong>${label}</strong><span>${hint}</span></label>
          <div class="study-type-controls"><select id="study-type-${id}" data-type-font="${id}" aria-label="${label} 글꼴">${Object.entries(fonts).map(([key,font])=>`<option value="${key}" ${key===item.font?'selected':''}>${font.label}</option>`).join('')}</select>
          <div class="study-type-stepper" role="group" aria-label="${label} 글자 크기"><button type="button" data-type-step="-1" aria-label="${label} 글자 작게">−</button><button type="button" data-type-size-reset aria-label="${label} 글자 크기 100%로" title="100%로 되돌리기"><output data-type-percent>${Math.round(item.scale*100)}%</output></button><button type="button" data-type-step="1" aria-label="${label} 글자 크게">+</button></div></div>
          <p class="study-type-preview" data-type-preview="${id}">${sample}</p></div>`;
      }).join('')}
      <p class="study-type-hint">50–150% · 선택한 설정은 이 브라우저에 자동 저장돼요.</p>
    </section>`;
  }
  function bindTypographyTools(){
    dialog.querySelector('[data-center-typography]').addEventListener('click',event=>{
      typographyOpen=!typographyOpen;
      event.currentTarget.setAttribute('aria-expanded',String(typographyOpen));
      event.currentTarget.setAttribute('aria-pressed',String(typographyOpen));
      dialog.querySelector('#study-typography-settings').hidden=!typographyOpen;
      positionTools();
    });
    dialog.querySelectorAll('[data-type-font]').forEach(select=>select.addEventListener('change',()=>{
      if(!Object.hasOwn(fonts,select.value))return;
      typography[select.dataset.typeFont].font=select.value;saveTypography();
    }));
    dialog.querySelectorAll('[data-type-step]').forEach(button=>button.addEventListener('click',()=>{
      const id=button.closest('[data-type-scope]').dataset.typeScope;
      typography[id].scale=Math.round(Math.min(maxScale,Math.max(minScale,typography[id].scale+Number(button.dataset.typeStep)*.05))*100)/100;
      saveTypography();
    }));
    dialog.querySelectorAll('[data-type-size-reset]').forEach(button=>button.addEventListener('click',()=>{
      typography[button.closest('[data-type-scope]').dataset.typeScope].scale=1;saveTypography();
    }));
    dialog.querySelector('[data-type-reset]').addEventListener('click',()=>{typography=defaultTypography();saveTypography();});
    syncTypographyControls();
  }
  addEventListener('storage',event=>{
    if(event.key!==typographyKey&&event.key!==null)return;
    try{typography=normalizeTypography(event.newValue?JSON.parse(event.newValue):null);}catch(_){typography=defaultTypography();}
    applyTypography();
  });
  applyTypography();
  // Larger UI text can wrap the fixed question toolbar onto two lines.
  const typeNavs=new Set();let typeLayoutFrame=0;
  function syncTypeLayout(){
    typeLayoutFrame=0;
    const navs=document.querySelectorAll('.jbl-bottom-nav,[data-course-j-nav]');
    for(const node of typeNavs)if(!node.isConnected){typeNavObserver.unobserve(node);typeNavs.delete(node);}
    let height=0;
    for(const node of navs){
      if(!typeNavs.has(node)){typeNavObserver.observe(node);typeNavs.add(node);}
      if(getComputedStyle(node).position==='fixed'&&node.getClientRects().length)height=Math.max(height,node.getBoundingClientRect().height);
    }
    document.documentElement.style.setProperty('--study-question-nav-height',height+'px');
  }
  function queueTypeLayout(){if(!typeLayoutFrame)typeLayoutFrame=requestAnimationFrame(syncTypeLayout);}
  const typeNavObserver=new ResizeObserver(queueTypeLayout);
  new MutationObserver(queueTypeLayout).observe(document.querySelector('main'),{childList:true,subtree:true});
  addEventListener('hashchange',queueTypeLayout);queueTypeLayout();
  function finishClose() {
    stopClosing();
    dialog.removeAttribute('data-preview');
    dialog.classList.remove('is-dragging');
    if(!returnFocus)return;
    document.body.classList.remove('study-center-open');
    tools.setAttribute('aria-expanded','false');
    const opener=returnFocus;returnFocus=null;
    window.scrollTo({top:sourceScroll,behavior:'auto'});
    if(opener.isConnected)opener.focus({preventScroll:true});
  }
  function close(animated=false) {
    if(!dialog.open&&!dialog.hasAttribute('data-preview'))return;
    stopClosing();
    const finish=()=>{if(dialog.open){if(dialog.close)dialog.close();else dialog.removeAttribute('open');}finishClose();};
    if(!animated||reducedMotion()){finish();return;}
    dialog.classList.add('is-closing');reveal(0);
    const version=motionVersion;
    closeTimer=window.setTimeout(()=>{if(version===motionVersion)finish();},260);
  }
  const dismiss=()=>close(true);
  const visibleRoot=()=>document.querySelector('main>.view:not([hidden])');
  function proxy(selector) {close();visibleRoot()?.querySelector(selector)?.click();}
  function syncGestureButton() {
    const toggle=dialog.querySelector('[data-center-gestures]');
    if(!toggle)return;
    const enabled=window.CardiovascularGestures.isEnabled();
    toggle.dataset.enabled=String(enabled);
    toggle.querySelector('[data-gesture-label]').textContent=enabled?'제스처 끄기':'제스처 켜기';
    toggle.title='스와이프·해설 더블클릭 '+(enabled?'켜짐':'꺼짐');
  }
  function syncDdayButton(){
    examDday.hidden=!ddayEnabled || !examDate;
    const toggle=dialog.querySelector('[data-center-dday]');
    if(!toggle)return;
    toggle.setAttribute('aria-pressed',String(ddayEnabled));
    toggle.disabled=!examDate;
    toggle.querySelector('[data-dday-label]').textContent=!examDate?'시험일 미설정':ddayEnabled?'디데이 끄기':'디데이 켜기';
    toggle.title='시험 디데이 '+(ddayEnabled?'켜짐':'꺼짐');
  }
  window.addEventListener('storage',event=>{
    if(event.key===ddayStorageKey||event.key===null){ddayEnabled=event.key!==null&&event.newValue==='true';syncDdayButton();}
  });
  function renderTools() {
    const expandedFilters=new Set(Array.from(dialog.querySelectorAll('[data-center-multi][open]'),element=>element.dataset.centerMulti));
    const scrollTop=dialog.scrollTop;
    const state=app.context(),root=visibleRoot(), isJ=state.hash.startsWith('#jbl');
    const pathology=window.CardiovascularPathology?.isActive()?window.CardiovascularPathology:null;
    const questionFilters=pathology?null:app.questionFilterContext();
    if(questionFilters){state.filters=questionFilters.filters;state.randomEnabled=questionFilters.randomEnabled;}
    const wiki=app.wikiTools();
    const question=app.questionTools();
    const documentEdit=root?.querySelector('[data-personal-action="edit"]');
    const canEditDocument=Boolean(documentEdit && !documentEdit.disabled && !documentEdit.closest('[hidden], [aria-hidden="true"]') && !document.querySelector('.context-link-split'));
    const editButton=(attr,label)=>`<button type="button" ${attr}><span class="study-edit-icon" aria-hidden="true">${svg('edit')}</span><span>${label}</span></button>`;
    const editActions=[
      wiki.editable ? editButton('data-center-wiki-edit','Wiki 편집') : '',
      question.available ? editButton('data-center-question-edit',question.editing ? '문항 편집 닫기' : '문항 편집') : '',
      canEditDocument ? editButton('data-center-proxy="[data-personal-action=&quot;edit&quot;]"','문서 편집') : ''
    ].join('');
    const filterIcons=[['unanswered','미풀이 문항'],['correct','정답 문항'],['uncertain','보류 문항'],['wrong','오답 문항'],['favorite','즐겨찾기 문항']].map(([key,label])=>{
      const selected=key==='favorite'?state.filters.favoritesOnly:(state.filters.statuses||[]).includes(key)||(key==='wrong'&&state.filters.wrongOnly);
      return `<button type="button" class="study-filter-icon" data-center-status="${key}" aria-label="${label}" title="${label}" aria-pressed="${Boolean(selected)}">${svg(key)}</button>`;
    }).join('');
    const options=(items,selected,label)=>'<option value="">'+label+'</option>'+items.map(([value,text])=>`<option value="${escape(value)}" ${String(selected)===String(value)?'selected':''}>${escape(text)}</option>`).join('');
    const multiFilter=(key,label,items,allLabel)=>{
      const selected=new Set(app.filterValues(state.filters[key]));
      const summary=items.filter(([value])=>selected.has(String(value))).map(([,text,shortLabel=text])=>shortLabel).join(', ')||allLabel;
      return `<div class="study-multi-filter"><span id="study-filter-${key}">${label}</span><details data-center-multi="${key}" ${expandedFilters.has(key)?'open':''}><summary aria-label="${label} 복수 선택"><span data-center-multi-summary>${escape(summary)}</span></summary><div class="study-multi-options" role="group" aria-labelledby="study-filter-${key}"><button type="button" data-center-multi-clear="${key}" aria-pressed="${!selected.size}">${allLabel}</button>${items.map(([value,text,shortLabel=text])=>`<label><input type="checkbox" data-center-multi-value="${key}" data-summary-label="${escape(shortLabel)}" value="${escape(value)}" ${selected.has(String(value))?'checked':''}><span>${escape(text)}</span></label>`).join('')}</div></details></div>`;
    };
    const isJbl=questionFilters?.mode==='jbl';
    const orderControls=questionFilters ? `<div class="study-order-controls" role="group" aria-label="문항 순서"><button type="button" class="study-random-toggle" data-center-random aria-pressed="${state.randomEnabled}" aria-label="문항 순서 랜덤 ${state.randomEnabled?'켜짐':'꺼짐'}"><span class="study-filter-icon">${svg('shuffle')}</span><span>${isJbl?'유형 안 문항 순서 랜덤':'문항 순서 랜덤'}</span></button>${questionFilters.standalone ? `<button type="button" class="study-random-toggle" data-center-lecture-order aria-pressed="${questionFilters.lectureOrderEnabled}" aria-label="강의순 정렬 ${questionFilters.lectureOrderEnabled?'켜짐':'꺼짐'}"><span class="study-filter-icon">${svg('lectureOrder')}</span><span>강의순 정렬</span></button>` : ''}</div>` : '';
    const chapterFilter=questionFilters?.course ? `<div class="study-center-filters"><label>${isJbl?'유형':'세부 분류'}<select data-center-chapter aria-label="관련 문항 범위">${options(questionFilters.chapters.map(item=>[item.slug,item.heading+' · '+item.count]),questionFilters.chapter,(isJbl?'전체 유형 · ':'전체 문항 · ')+questionFilters.total)}</select></label></div>` : '';
    dialog.innerHTML=`<button class="study-center-grip" type="button" aria-label="도구 닫기 · 위로 쓸어올리기"></button>
      <div class="study-center-controls"><div class="study-center-theme"><button type="button" class="theme-button" data-theme-toggle></button><span>화면 모드</span></div><button type="button" class="study-random-toggle study-type-toggle" data-center-typography aria-controls="study-typography-settings" aria-expanded="${typographyOpen}" aria-pressed="${typographyOpen}"><span class="study-filter-icon study-type-symbol" aria-hidden="true">Aa</span><span>글꼴 변경</span></button></div>
      <div class="study-preference-row"><button type="button" class="study-random-toggle study-gesture-toggle" data-center-gestures><span class="study-filter-icon" aria-hidden="true">${svg('hand')}</span><span data-gesture-label></span></button>
      <button type="button" class="study-random-toggle" data-center-dday aria-pressed="${ddayEnabled}"><span class="study-filter-icon" aria-hidden="true">${svg('calendar')}</span><span data-dday-label></span></button></div>
      ${typographyToolsHTML()}
      ${questionFilters ? `<section class="study-center-section"><h3>${isJbl?'학습 필터':'문항 필터'}</h3>${isJ ? `<div class="study-center-filters">${multiFilter('year','연도',state.years.map(y=>[y,y]),'전체 연도')}${multiFilter('lectureId','강의',state.courses.map(c=>[c.id,c.id===0?c.title:c.id+'강 '+c.title,c.id===0?'과거 강의':c.id+'강']),'전체 강의')}${multiFilter('professor','출제교수',state.professors.map(p=>[p,p]),'전체 교수')}</div>` : ''}<div class="study-status-filters" role="group" aria-label="문항 상태 · 중복 선택 가능">${filterIcons}</div>${orderControls}</section>` : ''}
      ${pathology ? pathology.toolsHTML() : ''}
      ${pathology||question.available||questionFilters||/^#kmle-K\d+$/.test(state.hash) ? `<section class="study-center-section study-quick-settings"><button type="button" class="study-random-toggle" data-center-quick aria-pressed="${quickEnabled}"><span class="study-filter-icon">${svg('quick')}</span><span>빠른 모드</span></button><div class="study-quick-stepper" ${quickEnabled?'':'hidden'} role="group" aria-label="문항 제한 시간"><button type="button" data-quick-minus aria-label="${quickStep(-1)}초 줄이기" ${!quickTimed||quickSeconds<=2?'disabled':''}>−</button><output aria-live="polite">${quickTimed?`<strong>${quickSeconds}</strong><span>초</span>`:'<span>제한 없음</span>'}</output><button type="button" data-quick-plus aria-label="${quickStep(1)}초 늘리기" ${!quickTimed||quickSeconds>=3600?'disabled':''}>+</button><button type="button" class="study-quick-unlimited" data-quick-unlimited aria-label="시간 제한 없음" title="${quickTimed?'시간 제한 끄기':'시간 제한 다시 켜기'}" aria-pressed="${!quickTimed}">∞</button></div></section>` : ''}
      ${timerToolsHTML()}

      ${wiki.available ? `<section class="study-center-section"><h3>현재 화면</h3><button type="button" class="study-random-toggle" data-center-wiki-toggle aria-pressed="${wiki.collapsed}"><span class="study-filter-icon">${svg(wiki.collapsed ? 'expand' : 'collapse')}</span><span>${wiki.collapsed ? '모든 문단 펼치기' : '모든 문단 접기'}</span></button></section>` : ''}
      ${editActions ? `<section class="study-center-section study-edit-section"><h3>편집하기</h3><div class="study-edit-tools">${editActions}</div></section>` : ''}`;
    bindTimerTools();
    if(pathology)pathology.bindTools(dialog,renderTools);
    dialog.querySelector('[data-center-quick]')?.addEventListener('click',()=>{window.CardiovascularQuickMode.setEnabled(!quickEnabled);renderTools();});
    dialog.querySelector('[data-quick-unlimited]')?.addEventListener('click',()=>{window.CardiovascularQuickMode.setTimed(!quickTimed);renderTools();dialog.querySelector('[data-quick-unlimited]')?.focus();});
    for(const [selector,direction] of [['[data-quick-minus]',-1],['[data-quick-plus]',1]])dialog.querySelector(selector)?.addEventListener('click',()=>{window.CardiovascularQuickMode.setSeconds(quickSeconds+direction*quickStep(direction));renderTools();dialog.querySelector(selector)?.focus();});
    bindTypographyTools();
    syncGestureButton();
    syncDdayButton();
    dialog.querySelector('[data-center-dday]').addEventListener('click',()=>{
      ddayEnabled=!ddayEnabled;
      try{localStorage.setItem(ddayStorageKey,String(ddayEnabled));}catch(_){}
      updateExamDday();syncDdayButton();
    });
    dialog.querySelector('[data-center-gestures]').addEventListener('click',()=>window.CardiovascularGestures.setEnabled(!window.CardiovascularGestures.isEnabled()));
    const statusFilters=dialog.querySelector('.study-status-filters');
    if(statusFilters && chapterFilter)statusFilters.insertAdjacentHTML('beforebegin',chapterFilter);
    dialog.querySelector('[data-center-chapter]')?.addEventListener('change',event=>{
      app.selectQuestionChapter(event.target.value);
      renderTools();dialog.querySelector('[data-center-chapter]')?.focus();
    });
    dialog.querySelector('[data-center-wiki-toggle]')?.addEventListener('click',()=>{close();app.toggleWiki();});
    dialog.querySelector('[data-center-wiki-edit]')?.addEventListener('click',()=>{close();app.editWiki();});
    dialog.querySelector('[data-center-question-edit]')?.addEventListener('click',()=>{close();app.editQuestion();});
    dialog.querySelectorAll('[data-center-proxy]').forEach(b=>b.onclick=()=>proxy(b.dataset.centerProxy));
    dialog.querySelectorAll('[data-center-filter]').forEach(input=>input.onchange=()=>{
      const value=input.type==='checkbox'?input.checked:input.value;
      app.filter({[input.dataset.centerFilter]:value});
    });
    const applyMultiFilter=(key,values)=>{
      app.filter({[key]:values});
      const group=dialog.querySelector(`[data-center-multi="${key}"]`);
      const selected=new Set(values);
      const labels=[];
      group.querySelectorAll('[data-center-multi-value]').forEach(input=>{
        input.checked=selected.has(input.value);
        if(input.checked)labels.push(input.dataset.summaryLabel||input.nextElementSibling.textContent);
      });
      const clear=group.querySelector('[data-center-multi-clear]');
      clear.setAttribute('aria-pressed',String(!selected.size));
      group.querySelector('[data-center-multi-summary]').textContent=labels.join(', ')||clear.textContent;
    };
    dialog.querySelectorAll('[data-center-multi-value]').forEach(input=>input.addEventListener('change',()=>{
      const key=input.dataset.centerMultiValue;
      const values=new Set(app.filterValues(app.context().filters[key]));
      if(input.checked)values.add(input.value);else values.delete(input.value);
      applyMultiFilter(key,[...values]);
    }));
    dialog.querySelectorAll('[data-center-multi-clear]').forEach(button=>button.onclick=()=>applyMultiFilter(button.dataset.centerMultiClear,[]));
    dialog.querySelectorAll('[data-center-status]').forEach(button=>button.onclick=()=>{
      const key=button.dataset.centerStatus,filters=app.questionFilterContext().filters;
      const statuses=new Set(filters.statuses||[]);
      if(filters.wrongOnly)statuses.add('wrong');
      if(key!=='favorite'){if(statuses.has(key))statuses.delete(key);else statuses.add(key);}
      app.filterQuestions({statuses:[...statuses],wrongOnly:false,favoritesOnly:key==='favorite'?!filters.favoritesOnly:filters.favoritesOnly});
      renderTools();dialog.querySelector(`[data-center-status="${key}"]`)?.focus();
    });
    dialog.querySelector('[data-center-random]')?.addEventListener('click',()=>{app.randomQuestions();renderTools();dialog.querySelector('[data-center-random]')?.focus();});
    dialog.querySelector('[data-center-lecture-order]')?.addEventListener('click',()=>{app.toggleLectureOrder();renderTools();dialog.querySelector('[data-center-lecture-order]')?.focus();});
    gesture(dialog.querySelector('.study-center-grip'),-1,dismiss,dismiss);
    window.CardiovascularTheme.syncButtons();dialog.scrollTop=scrollTop;
  }
  function positionTools() {
    // Fixed-position coordinates use the layout viewport; the visible viewport can
    // be smaller or offset by a keyboard, browser chrome, zoom, or device rotation.
    const edge=12, layoutWidth=Math.min(document.documentElement.clientWidth||window.innerWidth,document.documentElement.getBoundingClientRect().width||window.innerWidth);
    const viewport=window.visualViewport;
    const viewportLeft=viewport?.offsetLeft||0, viewportTop=viewport?.offsetTop||0;
    const viewportWidth=viewport?.width||layoutWidth, viewportHeight=viewport?.height||window.innerHeight;
    const style=getComputedStyle(dialog);
    const safe=side=>Math.max(0,parseFloat(style.getPropertyValue('--study-center-safe-'+side))||0);
    const leftBound=viewportLeft+Math.max(edge,safe('left'));
    const rightBound=Math.min(layoutWidth,viewportLeft+viewportWidth)-Math.max(edge,safe('right'));
    const topBound=viewportTop+Math.max(edge,safe('top'));
    const bottomBound=viewportTop+viewportHeight-Math.max(edge,safe('bottom'));
    const width=Math.min(460,Math.max(0,rightBound-leftBound));
    const anchorRight=Math.max(leftBound+width,Math.min(tools.getBoundingClientRect().right,rightBound));
    const top=Math.max(topBound,Math.min(shell.getBoundingClientRect().bottom+8,bottomBound-84));
    const right=layoutWidth-anchorRight;
    dialog.style.setProperty('--study-center-top',top+'px');
    dialog.style.setProperty('--study-center-right',right+'px');
    dialog.style.setProperty('--study-center-width',width+'px');
    dialog.style.setProperty('--study-center-max-height',Math.max(0,bottomBound-top)+'px');
  }
  function prepare(opener) {
    stopClosing();
    shell.classList.remove('search-open');sourceScroll=window.scrollY;returnFocus=opener||tools;
    renderTools();positionTools();dialog.scrollTop=0;
    reveal(0,true);
    // Non-modal preview preserves the header's pointer capture throughout a pull.
    dialog.setAttribute('data-preview','');
    travel=Math.min(160,Math.max(96,dialog.getBoundingClientRect().height*.4));
    reveal(0,true);
    document.body.classList.add('study-center-open');
  }
  function open(opener) {
    if(dialog.open){stopClosing();reveal(1);return;}
    if(!dialog.hasAttribute('data-preview'))prepare(opener);
    stopClosing();
    if(dialog.showModal)dialog.showModal();else dialog.setAttribute('open','');
    dialog.removeAttribute('data-preview');
    // Flush the pulled position before settling, rather than popping to the end.
    dialog.getBoundingClientRect();
    reveal(1);tools.setAttribute('aria-expanded','true');
    dialog.querySelector('[data-theme-toggle]').focus({preventScroll:true});
  }
  function gesture(element,direction,onSwipe,onClick) {
    let start=null,ignoreClickUntil=0;
    element.addEventListener('pointerdown',e=>{
      if(!window.CardiovascularGestures.isEnabled())return;
      if(!e.isPrimary||e.button!==0)return;
      // Header swipes start only on its background, never on navigation or search controls.
      if(!onClick && e.target.closest('button, a, input, select, textarea'))return;
      if(direction===1&&(dialog.open||dialog.hasAttribute('data-preview')))return;
      if(dialog.classList.contains('is-closing'))return;
      start={id:e.pointerId,x:e.clientX,y:e.clientY,dragging:false,rejected:false};element.setPointerCapture?.(e.pointerId);
    });
    element.addEventListener('pointermove',e=>{
      if(!window.CardiovascularGestures.isEnabled()){cancel();return;}
      if(!start||e.pointerId!==start.id||start.rejected)return;
      const dx=e.clientX-start.x,dy=e.clientY-start.y,distance=dy*direction;
      if(!start.dragging){
        if(Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)){start.rejected=true;return;}
        if(distance<8||Math.abs(dy)<Math.abs(dx)*1.4)return;
        start.dragging=true;
        if(direction===1)prepare(tools);else stopClosing();
      }
      if(e.cancelable)e.preventDefault();
      reveal(direction===1 ? distance/120 : 1-distance/120,true);
    });
    const cancel=()=>{
      if(!start)return;
      const {dragging:wasDragging,id}=start;start=null;ignoreClickUntil=Date.now()+600;
      try{element.releasePointerCapture?.(id);}catch(_){}
      if(wasDragging){if(direction===1)close(true);else reveal(1);}
    };
    element._studyGestureCancel=()=>{cancel();ignoreClickUntil=0;};
    element.addEventListener('pointerup',e=>{
      if(!window.CardiovascularGestures.isEnabled()){cancel();return;}
      if(!start||e.pointerId!==start.id)return;
      const gestureState=start,dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;
      try{element.releasePointerCapture?.(e.pointerId);}catch(_){}
      if(Math.max(Math.abs(dx),Math.abs(dy))>10)ignoreClickUntil=Date.now()+600;
      if(!gestureState.rejected&&dy*direction>=40&&Math.abs(dy)>Math.abs(dx)*1.4)onSwipe(element);
      else if(gestureState.dragging){if(direction===1)close(true);else reveal(1);}
    });
    element.addEventListener('pointercancel',cancel);
    element.addEventListener('lostpointercapture',cancel);
    element.addEventListener('click',()=>{if(Date.now()>ignoreClickUntil)onClick?.(element);});
  }
  gesture(shell.querySelector('.masthead-inner'),1,()=>open(tools),null);
  document.addEventListener('study-gestures-change',()=>{
    shell.querySelector('.masthead-inner')._studyGestureCancel?.();
    dialog.querySelector('.study-center-grip')?._studyGestureCancel?.();
    syncGestureButton();
  });
  tools.onclick=()=>dialog.open?dismiss():open(tools);
  search.onclick=()=>{close();shell.classList.toggle('search-open');const expanded=shell.classList.contains('search-open');search.setAttribute('aria-expanded',String(expanded));if(expanded)shell.querySelector('[data-global-search-input]').focus();};
  dialog.addEventListener('cancel',e=>{e.preventDefault();dismiss();});
  dialog.addEventListener('close',()=>{if(!dialog.open&&!dialog.hasAttribute('data-preview'))finishClose();});
  dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)dismiss();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')shell.classList.remove('search-open');});
  document.addEventListener('click',e=>{if(shell.classList.contains('search-open')&&!shell.contains(e.target))shell.classList.remove('search-open');});
  window.addEventListener('hashchange',()=>close());window.addEventListener('popstate',()=>close());
  const repositionTools=()=>{if(dialog.open||dialog.hasAttribute('data-preview'))positionTools();};
  window.addEventListener('resize',repositionTools,{passive:true});
  window.visualViewport?.addEventListener('resize',repositionTools,{passive:true});
  window.visualViewport?.addEventListener('scroll',repositionTools,{passive:true});
  new ResizeObserver(repositionTools).observe(shell);
})();
