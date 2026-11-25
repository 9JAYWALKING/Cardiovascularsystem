/* The existing exam presentation, backed by the live J bank and filters. */
window.CardiovascularPractice=(()=>{
  'use strict';
  const VIEW='practice-feedback'; let archive=[],starting=false;
  let run=null,screen='setup',tab='report',filter='wrong',detail=false,warning='',dialog=null;
  let settings={immediate:false,timed:true,minutes:60};

  const active=()=>location.hash==='#jbl-practice';
  const locked=()=>active()&&screen!=='setup';
  const esc=v=>escapeHtml(v);
  const root=()=>document.querySelector('#jbl-standalone');
  const all=()=>run?.snapshots|| (run?run.items.map(item=>{const q=jblQuestions.find(q=>q.id===item.id);return q&&(item.version==='inferred'?questionInferredView(q)||q:item.version==='original'?questionOriginalView(q)||q:q);}).filter(Boolean):[]);
  const answered=q=>Array.isArray(run.answers[q.id])?run.answers[q.id].length>0:!!String(run.answers[q.id]||'').trim();
  const reveal=q=>run.phase==='finished'||run.immediate&&answered(q);
  const seconds=ms=>{const n=Math.max(0,Math.floor(ms/1000));return `${Math.floor(n/60)}분 ${n%60}초`;};
  const elapsed=()=>Math.max(0,(run.finishedAt||Date.now())-run.startedAt);
  const clock=()=>{const n=Math.max(0,Math.ceil((run.endsAt?run.endsAt-Date.now():elapsed())/1000));return `${Math.floor(n/3600)+':'+String(Math.floor(n%3600/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;};
  const course=q=>CardioPracticeRules.assignedCourse(q,courses,jblFilterValues(run?.filters?.lectureId));
  const status=q=>CardioPracticeRules.status(run?.results[q.id],run?.flags.includes(q.id));
  const statusMarkup=q=>{const value=status(q),label=questionStudyStatuses[value];return `<span class="study-answer-status is-${value}" aria-label="이번 시험: ${esc(label.label)}" title="이번 시험: ${esc(label.label)}"><span aria-hidden="true">${label.symbol}</span></span>`;};
  function save(){if(!run?.id)return Promise.resolve();return CardioPracticeStore.put(run).catch(()=>{warning='연습 기록을 저장하지 못했어요. 이 창을 닫기 전에 저장 공간을 확인해 주세요.';const n=document.querySelector('[data-practice-warning]');if(n)n.textContent=warning;});}
  async function loadArchive(){try{archive=await CardioPracticeStore.list();}catch(_){warning='연습 기록 저장소를 열지 못했어요.';}}
  async function loadRun(id){const found=await CardioPracticeStore.get(id);if(!found)return;if(contextLinkState.active)closeContextLinkSplit(false);closeQuestionExplanationSplit(false);run=found;freshQuestionAttempt(viewerState(VIEW));viewerState(VIEW).index=0;tab='report';filter='wrong';setScreen(run.phase==='running'?'exam':'feedback');}
  const automaticName=now=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}).format(now).replaceAll('-','.');

  function orderLabel(){const s=standaloneState();return s.professorOrderEnabled?'교수 가나다순':s.randomEnabled?'랜덤':s.lectureOrderEnabled?'강의순':'기본 순서';}
  function filterLabel(){const f=standaloneState().filters;return [jblFilterValues(f.year).join('·'),jblFilterValues(f.lectureId).map(n=>n+'강').join('·'),jblFilterValues(f.professor).join('·'),(f.statuses||[]).map(s=>questionStudyStatuses[s]?.label).join('·'),f.favoritesOnly?'즐겨찾기':'',f.wrongOnly?'오답':''].filter(Boolean).join(' / ')||'전체 문항';}
  async function launch(){await save();await loadArchive();run=null;screen='setup';standaloneState().linkedQuestionNumber=null;window.CardiovascularQuickMode?.cancel();quickNavigate('#jbl-practice');}
  function setScreen(value){screen=value;detail=false;render();window.scrollTo({top:0,behavior:'instant'});}
  async function start(){
    if(starting)return;
    const input=root().querySelector('[data-p-minutes]');if(settings.timed&&!input.reportValidity())return;
    const base=standaloneState(),qs=currentStandaloneQuestions().filter(q=>q.studyKind!=='wiki');if(!qs.length)return;
    const now=Date.now();run={name:automaticName(now),version:2,phase:'running',startedAt:now,endsAt:settings.timed?now+Number(input.value)*60000:null,minutes:Number(input.value),immediate:settings.immediate,answers:{},flags:[],index:0,filters:JSON.parse(JSON.stringify(base.filters)),filterLabel:filterLabel(),orderLabel:orderLabel(),items:qs.map(q=>{const shown=questionForViewer(q,base);return {id:q.id,version:shown.isInferredVersion?'inferred':shown.isOriginalVersion?'original':'base'};})};
    run.snapshots=run.items.map(item=>{const base=jblQuestions.find(q=>q.id===item.id);const shown=item.version==='inferred'?questionInferredView(base):item.version==='original'?questionOriginalView(base):base;return CardioPracticeRules.snapshot(shown||base);});
    starting=true;root().querySelector('[data-p-start]').disabled=true;
    try{run.id=await CardioPracticeStore.add(run);await save();await loadArchive();warning='';setScreen('exam');}catch(_){run=null;warning='연습 기록을 저장할 수 없어 시작하지 못했어요. 브라우저 저장 공간을 확인해 주세요.';render();}finally{starting=false;}
  }
  function finish(timeout=false){
    if(!run||run.phase!=='running')return;
    dialog?.close();if(active()&&contextLinkState.active)closeContextLinkSplit(false);run.phase='finished';run.finishedAt=timeout&&run.endsAt?run.endsAt:Date.now();run.timeout=timeout;
    run.results=Object.fromEntries(all().map(q=>[q.id,CardioPracticeRules.grade(q,run.answers[q.id])]));run.score=CardioPracticeRules.score(all(),run.answers);
    run.gradesSaved=true;save().then(loadArchive);freshQuestionAttempt(viewerState(VIEW));screen='result';if(active())render();
  }
  function ensureRunning(){if(run?.phase!=='running')return false;if(run.endsAt&&Date.now()>=run.endsAt){finish(true);return false;}return true;}
  function choose(q,n){
    if(!ensureRunning())return;
    const a=run.answers[q.id]||[],multi=q.answerIndices?.length>1&&q.answerGradingMode!=='any';
    run.answers[q.id]=multi?(a.includes(n)?a.filter(v=>v!==n):[...a,n]):a.includes(n)?[]:[n];save();detail=false;render();root().querySelector(`[data-p-choice="${n}"]`)?.focus({preventScroll:true});
  }
  function move(index){run.index=Math.max(0,Math.min(index,all().length-1));save();detail=false;render();window.scrollTo({top:0,behavior:'instant'});root().querySelector('#practice-question-text')?.focus({preventScroll:true});}
  function submit(){
    if(dialog?.open)return;const blank=all().filter(q=>!answered(q)).length;
    dialog=document.createElement('dialog');dialog.className='px-dialog';dialog.setAttribute('aria-label','답안 제출 확인');
    dialog.innerHTML=`<h2>답안을 제출할까요?</h2><p>${all().length}문항 중 ${all().length-blank}문항 응답${blank?` · 미응답 ${blank}문항`:''}</p><footer><button data-p-cancel>계속 풀기</button><button class="px-primary" data-p-confirm>제출하기</button></footer>`;
    dialog.querySelector('[data-p-cancel]').onclick=()=>dialog.close();dialog.querySelector('[data-p-confirm]').onclick=()=>finish();dialog.addEventListener('close',()=>{dialog.remove();dialog=null;});document.body.append(dialog);dialog.showModal();
  }
  function confirmDelete(id){
    const record=archive.find(r=>r.id===Number(id));if(!record||dialog?.open)return;
    const modal=document.createElement('dialog');dialog=modal;modal.className='px-dialog';modal.setAttribute('aria-label','학습기록 삭제 확인');
    modal.innerHTML=`<h2>학습기록을 삭제할까요?</h2><p>${record.id}회 · ${esc(record.name)}</p><p>이 회차의 답안과 Report·J 기록이 삭제되며 복구할 수 없습니다. 다른 회차와 사이트 즐겨찾기는 유지됩니다.</p><p role="alert" data-delete-error></p><footer><button data-delete-cancel autofocus>취소</button><button class="practice-delete-confirm" data-delete-confirm>기록 삭제</button></footer>`;
    let deleting=false;
    modal.querySelector('[data-delete-cancel]').onclick=()=>modal.close();
    modal.addEventListener('cancel',e=>{if(deleting)e.preventDefault();});
    modal.addEventListener('close',()=>{modal.remove();if(dialog===modal)dialog=null;});
    modal.querySelector('[data-delete-confirm]').onclick=async()=>{
      if(deleting)return;deleting=true;modal.querySelectorAll('button').forEach(b=>b.disabled=true);
      const current=run?.id===record.id,previous=current?run:null;
      if(current)run=null; // Prevent pagehide or the timer from saving a deleted run again.
      try{
        await CardioPracticeStore.remove(record.id);
      }catch(_){
        if(current)run=previous;deleting=false;modal.querySelectorAll('button').forEach(b=>b.disabled=false);
        modal.querySelector('[data-delete-error]').textContent='삭제하지 못했어요. 잠시 후 다시 시도해 주세요.';return;
      }
      archive=archive.filter(r=>r.id!==record.id);warning='';modal.close();
      if(current){if(contextLinkState.active)closeContextLinkSplit(false);closeQuestionExplanationSplit(false);freshQuestionAttempt(viewerState(VIEW));setScreen('setup');}else render();
      const history=root().querySelector('.practice-history');if(history)history.open=true;
      root().querySelector('.practice-history summary')?.focus();
    };
    document.body.append(modal);modal.showModal();
  }
  function setupHTML(){
    const qs=currentStandaloneQuestions().filter(q=>q.studyKind!=='wiki');
    const manual=qs.filter(q=>CardioPracticeRules.grade(questionForViewer(q,standaloneState()),null)==='ungraded').length;
    return `<section class="px-setup"><h2>실전처럼 풀기</h2><p>현재 J 필터로 고른 문항을 시험 화면에서 연습합니다.</p><div class="px-pool"><div><strong>${qs.length}문항</strong><p>${esc(filterLabel())}</p><small>${esc(orderLabel())}</small></div><button data-p-tools>필터 · 정렬</button></div><label class="px-setting"><span>정답 즉시 공개<small>켜면 답을 고른 뒤 정답과 상세 해설을 확인할 수 있습니다.</small></span><input type="checkbox" role="switch" aria-label="정답 즉시 공개" data-p-immediate ${settings.immediate?'checked':''}></label><label class="px-setting"><span>제한 시간<small>시간이 끝나면 자동으로 제출합니다.</small></span><input type="checkbox" role="switch" aria-label="제한 시간 사용" data-p-timed ${settings.timed?'checked':''}></label><label class="px-minutes">${settings.timed?'설정 시간':'시간 제한 없이 연습'}<span><input aria-label="제한 시간(분)" data-p-minutes type="number" min="1" max="1440" step="1" value="${settings.minutes}" required ${settings.timed?'':'disabled'}> 분</span></label>${manual?`<p class="px-note">${manual}문항은 자동 채점에서 제외됩니다. 해설에서 직접 확인해 주세요.</p>`:''}<details class="practice-history"><summary>저장된 연습 ${archive.length}회</summary>${archive.map(r=>`<div class="practice-history-row"><button data-p-load="${r.id}">${r.id} · ${esc(r.name)} · ${r.phase==='running'?'진행 중':'완료'}</button><button class="practice-record-delete" data-p-delete="${r.id}" aria-label="${r.id}회 학습기록 삭제" title="학습기록 삭제"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7M14 10v7"/></svg></button></div>`).join('')||'<p>아직 저장된 연습이 없습니다.</p>'}</details><footer><button class="px-primary" data-p-start ${qs.length?'':'disabled'}>연습 시작</button></footer></section>`;
  }
  function examHTML(){
    const qs=all();run.index=Math.max(0,Math.min(run.index,qs.length-1));const q=qs[run.index];if(!q)return '<p>연습 문항을 찾을 수 없습니다.</p>';
    const c=course(q)||emptyRenderCourse,inline=t=>renderWikiInline(t,c,{items:[],named:new Map()},false),shown=reveal(q),answers=q.answerIndices?.length?q.answerIndices:q.answerIndex?[q.answerIndex]:[],selected=run.answers[q.id]||[],multiple=answers.length>1&&q.answerGradingMode!=='any';
    return `<div id="practice-exam-surface" class="${detail?'detail-open':''}">
      <header class="topbar"><h1 class="brand"><a href="#home" aria-label="홈 화면으로 이동">CARDIOVASCULAR SYSTEM</a></h1><div class="exam-name">순환기계 실전풀이</div></header>
      <div class="study-workspace"><div class="layout">
        <aside class="sidebar" aria-label="문항 탐색"><h2>문항 선택</h2><div class="sidebar-body">
          <nav class="number-grid" aria-label="실전 문항 번호">${qs.map((item,i)=>`<button class="question-number ${answered(item)?'answered ':''}${run.flags.includes(item.id)?'flagged':''}" data-p-index="${i}" aria-current="${i===run.index?'step':'false'}" aria-label="${i+1}번 ${answered(item)?'응답':'미응답'}">${i+1}</button>`).join('')}</nav>
          <div class="save-area"><button class="submit-button" data-p-submit>답안 저장</button><p class="remaining-time">${run.endsAt?'남은 시간':'경과 시간'} <span id="remaining-time" role="timer" data-p-clock>${clock()}</span></p></div>
        </div></aside>
        <main class="main"><div class="question-layout">
          <aside class="question-info" aria-label="문항 정보"><h2>문제 <span>${run.index+1}</span></h2><p>${CardioPracticeRules.grade(q,null)==='ungraded'?'직접 확인':'총 1.00점'}</p>
            <button class="flag-button" data-p-flag aria-pressed="${run.flags.includes(q.id)}"><svg viewBox="0 0 16 18" aria-hidden="true"><path d="M3 16V2"/><path class="flag-cloth" d="M3 2c3-2 6 2 10 0l-2 6c-3 2-5-2-8 0Z"/></svg><span>문제 표시</span></button>
            ${shown?`<button class="detail-button" data-p-detail aria-expanded="${detail}">${detail?'해설 닫기':'상세 해설'}</button>`:''}
          </aside>
          <div class="question-body"><section class="formulation" aria-labelledby="practice-question-text">
            <h2 class="question-text" id="practice-question-text" tabindex="-1">${inline(q.question)}</h2>
            ${q.passage?`<div class="passage">${renderJblWikiFragment(q.passage,q,'exam-passage')}</div>`:''}
            <div class="question-images">${(q.images||[]).map((src,i)=>`<img data-jbl-image src="${esc(encodeURI(src))}" alt="문제 ${run.index+1} 이미지 ${i+1}">`).join('')}</div>
            ${q.choices.length?`<fieldset class="answers"><legend>${multiple?'해당하는 답을 모두 선택하세요.':'하나를 선택하세요.'}</legend><div>${q.choices.map((t,i)=>`<label class="choice ${shown&&selected.includes(i+1)&&answers.length?(answers.includes(i+1)?'review-correct':'review-incorrect'):''}"><input type="${multiple?'checkbox':'radio'}" name="exam-answer" data-p-choice="${i+1}" ${selected.includes(i+1)?'checked':''}><span class="choice-content">${i+1}. ${inline(t)}${shown&&selected.includes(i+1)&&answers.length?`<span class="correctness-icon" aria-label="${answers.includes(i+1)?'정답 선지':'오답 선지'}">${answers.includes(i+1)?'✓':'✕'}</span>`:''}</span></label>`).join('')}</div></fieldset>`:`<textarea class="free-answer" aria-label="주관식 답안" data-p-written>${esc(run.answers[q.id]||'')}</textarea>`}
          </section>
          ${shown?`<p class="review-answer">정답: ${esc(answers.length?answers.join(', ')+'번':q.answerLabel||'해설에서 확인')}</p>`:''}
          <nav class="page-controls" aria-label="문제 페이지 이동"><button class="page-button" data-p-prev ${run.index?'':'disabled'}><span class="arrow" aria-hidden="true">‹</span> 이전 페이지</button><button class="page-button" data-p-next ${run.index===qs.length-1?'disabled':''}>다음 페이지 <span class="arrow" aria-hidden="true">›</span></button></nav>
          </div></div></main>
      </div>${detail?`<aside class="detail-pane practice-native-detail"><header class="detail-heading"><h2>상세 해설</h2><button class="detail-close" data-p-detail aria-label="상세 해설 닫기">×</button></header><div data-p-explanation>${questionExplanationMarkup(q)}</div></aside>`:''}</div></div>`;
  }
  function resultHTML(){const s=run.score;return `<section class="px-results"><div class="px-breadcrumb">CARDIOVASCULAR SYSTEM › 순환기계 실전풀이</div><h2>순환기계 실전풀이</h2><div class="px-quizinfo"><p><strong>답안 제출 가능 횟수: 1</strong></p><p>제출일시: ${new Date(run.finishedAt).toLocaleString('ko-KR',{timeZone:'Asia/Seoul'})}</p><p><strong>시간제한: ${run.endsAt?run.minutes+'분':'제한 없음'}</strong></p></div><h3>퀴즈 기록 설명 보기</h3><table><thead><tr><th>진행 상황</th><th>성적 / ${s.denominator.toFixed(2)}</th><th>피드백 보기</th></tr></thead><tbody><tr><td>${run.timeout?'시간 종료':'종료됨'}<small>소요 시간 ${seconds(elapsed())}</small></td><td>${s.correct.toFixed(2)}</td><td><button class="px-link" data-p-feedback>피드백 보기</button></td></tr></tbody></table><p class="px-final-score">최종 성적: ${s.percent??'—'}${s.percent===null?'':' / 100점'}</p>${s.ungraded?`<p>정답 미등록·주관식 ${s.ungraded}문항은 자동 채점에서 제외했습니다.</p>`:''}${!run.gradesSaved?'<p role="alert">학습 기록에 저장하지 못했습니다. 이 결과에서 답안을 확인해 주세요.</p>':''}<footer><p>답안 제출 기회를 모두 사용하였습니다.</p><button data-p-new>다시 풀어보기</button></footer></section>`;}
  function reviewQuestions(){return all().filter(q=>{
    if(filter==='all')return true;
    if(filter==='checked')return run.flags.includes(q.id);
    if(filter==='blank')return !answered(q);
    return run.results[q.id]==='wrong';
  }).sort((a,b)=>compareJblNumbers(a.globalNumber,b.globalNumber));}
  function viewer(){return active()&&screen==='feedback'&&tab==='j'?{key:VIEW,questions:reviewQuestions(),rerender:render}:null;}
  function openReview(id,kind='wrong'){filter=kind;tab='j';const qs=reviewQuestions();viewerState(VIEW).index=Math.max(0,qs.findIndex(q=>q.id===id));detail=false;render();}
  const links=(qs,kind)=>qs.length?qs.sort((a,b)=>compareJblNumbers(a.globalNumber,b.globalNumber)).map(q=>`<button class="practice-report-link" data-p-review="${esc(q.id)}" data-kind="${kind}">J ${esc(q.displayId)}</button>`).join(''):'<span class="practice-report-empty">없음</span>';
  function reportHTML(){
    const qs=all(),s=run.score,groups=new Map();
    for(const q of qs){const c=course(q),id=c?.id||0;if(!groups.has(id))groups.set(id,{c,questions:[]});groups.get(id).questions.push(q);}
    return `<article class="wiki-article practice-report"><h2>이번 연습의 기록</h2><div class="practice-metrics">${[['점수',s.percent===null?'채점 제외':s.percent+'점'],['전체',s.total+'문항'],['정답',s.correct+'문항'],['오답',s.wrong+'문항'],['미응답',qs.filter(q=>!answered(q)).length+'문항'],['체크',run.flags.length+'문항'],['총 경과 시간',seconds(elapsed())],['문항당 평균',seconds(elapsed()/Math.max(1,s.total))]].map(([k,v])=>`<div><span>${k}</span><strong>${v}</strong></div>`).join('')}</div><p class="practice-report-meta">${esc(run.filterLabel)} · ${esc(run.orderLabel)}${s.ungraded?` · 자동 채점 제외 ${s.ungraded}문항`:''}</p><h2>강의별로 돌아보기</h2>${[...groups].sort(([a],[b])=>(a||Infinity)-(b||Infinity)).map(([id,g])=>{
      const wrong=g.questions.filter(q=>run.results[q.id]==='wrong'),blank=g.questions.filter(q=>!answered(q)),checked=g.questions.filter(q=>run.flags.includes(q.id)),graded=g.questions.filter(q=>run.results[q.id]!=='ungraded');
      const chapters=g.c?lectureStudyChapters(g.c).map(ch=>({...ch,wrong:wrong.filter(q=>ch.numbers.includes(canonicalJblNumber(q.globalNumber)))})).filter(ch=>ch.wrong.length):[];
      return `<section><h3>${g.c?`${id}강 · ${esc(g.c.title)}`:'강의 미배정'}</h3><p>${g.questions.length}문항 중 ${g.questions.filter(answered).length}문항 응답 · 오답 ${wrong.length} / 채점 가능 ${graded.length}문항${graded.length?' ('+Math.round(wrong.length/graded.length*100)+'%)':''} · 체크 ${checked.length}문항</p>${chapters.length?`<ul>${chapters.map(ch=>`<li><a href="#lecture-${id}" data-wiki-course="${id}" data-wiki-section="${esc(ch.slug)}">${esc(ch.heading)}</a> · 오답 ${ch.wrong.length}문항</li>`).join('')}</ul>`:''}<h4>틀린 문항</h4><div class="practice-report-links">${links(wrong,'wrong')}</div><h4>체크한 문항</h4><div class="practice-report-links">${links(checked,'checked')}</div>${blank.length?`<h4>미응답 문항</h4><div class="practice-report-links">${links(blank,'blank')}</div>`:''}</section>`;
    }).join('')}</article>`;
  }
  function feedbackHTML(){
    const counts={wrong:all().filter(q=>run.results[q.id]==='wrong').length,checked:run.flags.length,blank:all().filter(q=>!answered(q)).length,all:all().length};
    const position=archive.findIndex(r=>r.id===run.id);
    return `<div class="practice-feedback-wrap"><header class="detail-bar"><div class="detail-topline">
      <div><p class="detail-breadcrumb">실전처럼 풀기 · 학습 피드백</p><h2>${esc(run.name)}</h2><p class="detail-info">${run.score.total}문항 · ${seconds(elapsed())}</p></div>
      <nav class="lecture-view-tabs" role="tablist" aria-label="학습 피드백">${[['report','Report'],['j','J']].map(([key,label])=>`<button role="tab" data-p-tab="${key}" aria-selected="${tab===key}" class="${tab===key?'active':''}">${label}</button>`).join('')}</nav>
      <div class="practice-run-nav"><button data-p-run-prev ${position>0?'':'disabled'} aria-label="이전 연습">‹</button><input data-p-run-number type="number" min="1" value="${run.id}" aria-label="연습 번호" title="연습 번호를 입력하여 이동"><button data-p-run-next ${position<archive.length-1?'':'disabled'} aria-label="다음 연습">›</button></div>
      </div><div class="practice-header-actions"><button data-p-rename>이름 수정</button><button data-p-result>결과창으로</button><button data-p-library>연습 목록</button><button data-p-delete="${run.id}">기록 삭제</button></div></header>
      ${tab==='report'?reportHTML():`<div class="practice-review-filters" role="group" aria-label="피드백 문항 필터">${[['wrong','틀린 문항'],['checked','체크한 문항'],['blank','미응답'],['all','전체']].map(([key,label])=>`<button data-p-review-filter="${key}" aria-pressed="${filter===key}">${label} <span>${counts[key]}</span></button>`).join('')}<small>J 문항번호순</small></div><div data-practice-j-root></div><div class="jbl-bottom-nav"><div class="jbl-bottom-inner" data-practice-j-nav></div></div>`}</div>`;
  }
  function render(){
    if(!active())return;
    if(run?.phase==='running'&&run.endsAt&&Date.now()>=run.endsAt){finish(true);return;}
    document.body.classList.toggle('practice-exam',screen!=='feedback');document.body.classList.toggle('practice-feedback',screen==='feedback');
    document.body.classList.toggle('practice-taking',screen==='exam');
    const el=root(),historyOpen=el.querySelector('.practice-history')?.open;
    const numberScroll=el.querySelector('.number-grid')?.scrollTop||0,viewScroll=window.scrollY;
    el.innerHTML=screen==='setup'?setupHTML():screen==='exam'?examHTML():screen==='result'?resultHTML():feedbackHTML();
    if(historyOpen&&el.querySelector('.practice-history'))el.querySelector('.practice-history').open=true;
    el.insertAdjacentHTML('afterbegin',`<p role="alert" data-practice-warning>${esc(warning)}</p>`);
    el.querySelectorAll('[data-p-load]').forEach(b=>b.onclick=()=>loadRun(b.dataset.pLoad).catch(()=>{warning='저장된 연습을 열지 못했어요.';render();}));
    const navIndex=archive.findIndex(r=>r.id===run?.id);
    el.querySelector('[data-p-run-prev]')?.addEventListener('click',()=>loadRun(archive[navIndex-1]?.id));
    el.querySelector('[data-p-run-next]')?.addEventListener('click',()=>loadRun(archive[navIndex+1]?.id));
    el.querySelector('[data-p-run-number]')?.addEventListener('change',e=>{if(archive.some(r=>r.id===Number(e.target.value)))loadRun(Number(e.target.value));else e.target.value=run.id;});
    el.querySelector('[data-p-rename]')?.addEventListener('click',()=>{const heading=el.querySelector('.detail-topline h2');heading.innerHTML=`<form data-p-name-form><input aria-label="연습 이름" value="${esc(run.name)}" maxlength="80" required><button>저장</button></form>`;const form=heading.querySelector('form');form.onsubmit=async e=>{e.preventDefault();const name=form.querySelector('input').value.trim();if(!name)return;run.name=name;await save();await loadArchive();render();};form.querySelector('input').focus();});
    el.querySelectorAll('[data-p-delete]').forEach(b=>b.onclick=()=>confirmDelete(b.dataset.pDelete));
    el.querySelector('[data-p-tools]')?.addEventListener('click',()=>document.querySelector('[data-study-tools]').click());
    el.querySelector('[data-p-start]')?.addEventListener('click',start);
    el.querySelector('[data-p-library]')?.addEventListener('click',launch);
    el.querySelector('[data-p-immediate]')?.addEventListener('change',e=>settings.immediate=e.target.checked);
    el.querySelector('[data-p-minutes]')?.addEventListener('input',e=>settings.minutes=Number(e.target.value));
    el.querySelector('[data-p-timed]')?.addEventListener('change',e=>{settings.timed=e.target.checked;render();});
    el.querySelector('[data-p-submit]')?.addEventListener('click',submit);
    el.querySelector('[data-p-new]')?.addEventListener('click',async()=>{
      const state=standaloneState();updateQuestionFilters(state,structuredClone(run.filters));
      settings={immediate:run.immediate,timed:Boolean(run.endsAt),minutes:run.minutes};
      await save();await loadArchive();run=null;warning='';setScreen('setup');
    });
    el.querySelector('[data-p-feedback]')?.addEventListener('click',()=>{tab='report';setScreen('feedback');});el.querySelector('[data-p-result]')?.addEventListener('click',()=>setScreen('result'));
    el.querySelectorAll('[data-p-tab]').forEach(b=>b.onclick=()=>{closeQuestionExplanationSplit(false);tab=b.dataset.pTab;if(tab==='j')filter='wrong';viewerState(VIEW).index=0;render();});
    el.querySelectorAll('[data-p-review]').forEach(b=>b.onclick=()=>openReview(b.dataset.pReview,b.dataset.kind));
    el.querySelectorAll('.practice-report [data-wiki-course]').forEach(link=>link.onclick=event=>{event.preventDefault();openContextLinkSplit({type:'wiki',courseId:Number(link.dataset.wikiCourse),section:link.dataset.wikiSection},link);});
    el.querySelectorAll('[data-p-review-filter]').forEach(b=>b.onclick=()=>{closeQuestionExplanationSplit(false);filter=b.dataset.pReviewFilter;viewerState(VIEW).index=0;render();});
    if(screen==='exam'){
      el.querySelector('.number-grid').scrollTop=numberScroll;
      window.scrollTo({top:viewScroll,behavior:'instant'});
      const q=all()[run.index];el.querySelectorAll('[data-p-choice]').forEach(b=>b.onclick=()=>choose(q,Number(b.dataset.pChoice)));
      el.querySelector('[data-p-written]')?.addEventListener('input',e=>{if(ensureRunning()){run.answers[q.id]=e.target.value;save();}});
      el.querySelector('[data-p-flag]').onclick=()=>{run.flags=run.flags.includes(q.id)?run.flags.filter(id=>id!==q.id):[...run.flags,q.id];save();render();};
      el.querySelectorAll('[data-p-index]').forEach(b=>b.onclick=()=>move(Number(b.dataset.pIndex)));el.querySelector('[data-p-prev]').onclick=()=>move(run.index-1);el.querySelector('[data-p-next]').onclick=()=>move(run.index+1);
      el.querySelectorAll('[data-p-detail]').forEach(b=>b.onclick=()=>{detail=!detail;render();});
      const explanation=el.querySelector('[data-p-explanation]');if(explanation){namespaceContextPreviewIds(explanation,'practice');bindWikiDocument(explanation,course(q)||emptyRenderCourse);}bindContentImages(el);
    }
    if(screen==='feedback'&&tab==='j'){
      const qs=reviewQuestions(),s=viewerState(VIEW);s.questionVersions={};s.selected=structuredClone(run.answers);s.index=Math.max(0,Math.min(s.index,qs.length-1));
      if(qs[s.index])s.answerShown[qs[s.index].id]??=true;
      renderQuestionCard(el.querySelector('[data-practice-j-root]'),qs,VIEW,render);el.querySelectorAll('[data-jbl-choice],[data-jbl-version-toggle],[data-jbl-number-button],[data-study-status]').forEach(b=>b.disabled=true);
      const nav=el.querySelector('[data-practice-j-nav]');nav.innerHTML=navMarkup(s,qs);bindViewerNav(nav,qs,VIEW,render);
      if(!qs.length)el.querySelector('[data-practice-j-root]').innerHTML='<p class="personal-note-empty">이 조건에 해당하는 문항이 없습니다.</p>';
    }
  }
  function route(){document.body.classList.toggle('practice-taking',active()&&screen==='exam');document.body.classList.toggle('practice-exam',active()&&screen!=='feedback');document.body.classList.toggle('practice-feedback',active()&&screen==='feedback');}
  setInterval(()=>{if(run?.phase!=='running')return;if(run.endsAt&&Date.now()>=run.endsAt){finish(true);return;}if(active()){const timer=document.querySelector('[data-p-clock]');if(timer)timer.textContent=clock();}},500);
  addEventListener('pagehide',save);addEventListener('hashchange',route);
  document.addEventListener('keydown',e=>{if(!active()||screen!=='exam'||e.repeat||e.ctrlKey||e.altKey||e.metaKey||e.target.closest('input,textarea,button,select,[contenteditable="true"]')||document.querySelector('dialog[open],#jbl-image-modal.show'))return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(run.index+(e.key==='ArrowLeft'?-1:1));}});
  document.addEventListener('DOMContentLoaded',async()=>{await loadArchive();if(active()&&screen==='setup')render();});
  return {active,locked,launch,render,route,viewer,status,statusMarkup,reviewReadOnly:state=>state?._randomKey===VIEW,feedback:()=>screen==='feedback'};
})();
