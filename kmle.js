/* Clinical KMLE practice. J answers and progress are never read or overwritten. */
(() => {
  'use strict';
  const data = window.CARDIOVASCULAR_KMLE_DATA;
  const KEY = 'cardiovascular-kmle2025-clinical-progress-v1';
  const SESSION_KEY = 'cardiovascular-kmle2025-clinical-session-v1';
  const FILTER_KEY = 'cardiovascular-kmle2025-clinical-filters-v1';
  const qById = new Map(data.questions.map(q => [q.id, q]));
  const categories = new Map(data.categories.map(c => [c.key,c]));
  let root, config, current = null, picked = [], revealed = false, explanation = false, expanded = false;
  let records = {}, session = null, filters = {priority:'core',lecture:'',status:'all',search:''};
  let storageAvailable = true, explanationReturnY = 0, navObserver;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeObject = text => {try {const v=JSON.parse(text||'{}');return v&&typeof v==='object'&&!Array.isArray(v)?v:{};} catch {return {};}};
  try {records=safeObject(localStorage.getItem(KEY));} catch {}
  try {
    const saved=safeObject(sessionStorage.getItem(SESSION_KEY));
    if(Array.isArray(saved.ids)&&saved.ids.length)session={...saved,ids:[...new Set(saved.ids.filter(id=>qById.has(id)))]};
    const f=safeObject(sessionStorage.getItem(FILTER_KEY));
    if(['core','extra','all'].includes(f.priority))filters.priority=f.priority;
    if(['all','unseen','wrong','favorite'].includes(f.status))filters.status=f.status;
    filters.lecture=String(f.lecture||'');filters.search=String(f.search||'');
  } catch {}
  const state = q => records[q.key] && typeof records[q.key]==='object' ? records[q.key] : {};
  const savedSelection = q => Array.isArray(state(q).selected) ? state(q).selected.filter(n=>Number.isInteger(n)&&n>=1&&n<=q.choices.length) : [];
  function persist(q,patch) {
    records[q.key]={...state(q),...patch,updatedAt:Date.now()};
    try {localStorage.setItem(KEY,JSON.stringify(records));storageAvailable=true;} catch {storageAvailable=false;}
  }
  function saveSession() {try {sessionStorage.setItem(SESSION_KEY,JSON.stringify(session));}catch {}}
  function navigate(id) {
    window.CardiovascularQuickMode?.cancel();
    const hash='#kmle'+(id?'-'+id:'');
    if(location.hash===hash){if(id)openQuestion(id);else renderMap();return;}
    location.hash=hash;
  }
  const courseName = id => config.courses.find(c=>Number(c.id)===Number(id))?.title||`${id}강`;
  const lectureLinks = ids => [...new Set(ids||[])].map(id=>`<a href="#lecture-${id}">${id}강 · ${esc(courseName(id))}</a>`).join('');
  const sourceLabel = q => `2025 KMLE · 순환기계 p.${q.source.page} · ${String(q.source.number).padStart(2,'0')}번`;
  const statusLabel = q => ({o:'정답',x:'오답',triangle:'복습 필요'})[state(q).status]||'미풀이';
  const tierLabel = q => q.priority==='core'?'핵심':'더 연습';
  function filteredQuestions() {
    const query=filters.search.trim().toLowerCase();
    return data.questions.filter(q=>(filters.priority==='all'||q.priority===filters.priority)&&(!filters.lecture||q.tags.includes(Number(filters.lecture)))&&
      (filters.status==='all'||filters.status==='unseen'&&!state(q).gradedAt||filters.status==='wrong'&&state(q).status==='x'||filters.status==='favorite'&&state(q).favorite)&&
      (!query||`${q.id} ${q.question} ${q.title} ${q.choices.join(' ')} ${categories.get(q.category).title} ${sourceLabel(q)}`.toLowerCase().includes(query)));
  }
  function startSession(qs,short=false,label='선택한 문항') {
    if(!qs.length)return;
    let list=[...qs];
    if(short){
      // Mix disciplines, prefer unseen questions, then the least recently graded.
      list.sort((a,b)=>Number(!!state(a).gradedAt)-Number(!!state(b).gradedAt)||(state(a).gradedAt||0)-(state(b).gradedAt||0));
      const mixed=[],used=new Set();
      for(const group of [list.filter(q=>!state(q).gradedAt),list.filter(q=>state(q).gradedAt)]){
        for(const q of group)if(!used.has(q.category)&&mixed.length<5){mixed.push(q);used.add(q.category);}
        for(const q of group)if(!mixed.includes(q)&&mixed.length<5)mixed.push(q);
      }
      list=mixed;
    }
    session={ids:list.map(q=>q.id),label:short?`${list.length}문항 연습`:label,short};saveSession();navigate(list[0].id);
  }
  function renderMap() {
    navObserver?.disconnect();current=null;window.CardiovascularQuickMode?.cancel();
    root.className='kmle-root';
    const answered=data.questions.filter(q=>state(q).gradedAt).length;
    const coreDone=data.questions.filter(q=>q.priority==='core'&&state(q).gradedAt).length;
    const lectureIds=[...new Set(data.questions.flatMap(q=>q.tags))].sort((a,b)=>a-b);
    root.innerHTML=`<header class="kmle-heading"><span class="kmle-eyebrow">짧게 풀고, 판단을 넓히기</span><h1>국시 순환기계</h1><p>족보와 이어지는 문제, 한 걸음 더 생각하게 하는 임상 증례.</p>
      <div class="kmle-progress"><span>핵심 <b>${coreDone} / 30</b></span><span>전체 <b>${answered} / 40</b></span><progress value="${coreDone}" max="30" aria-label="핵심 문항 풀이 진행"></progress></div></header>
      <div class="kmle-map-tools"><div class="kmle-priority" role="group" aria-label="연습 분량">${[['core','핵심 30'],['extra','더 연습 10'],['all','전체 40']].map(([v,t])=>`<button data-k-tier="${v}" aria-pressed="${filters.priority===v}">${t}</button>`).join('')}</div>
      <div class="kmle-filters"><label>강의<select data-k-lecture><option value="">전체 임상 강의</option>${lectureIds.map(id=>`<option value="${id}" ${String(id)===filters.lecture?'selected':''}>${id}강 · ${esc(courseName(id))}</option>`).join('')}</select></label>
      <label>풀이 상태<select data-k-filter>${[['all','전체'],['unseen','아직 안 푼 문항'],['wrong','틀린 문항'],['favorite','즐겨찾기']].map(([v,t])=>`<option value="${v}" ${filters.status===v?'selected':''}>${t}</option>`).join('')}</select></label>
      <label>찾기<input type="search" data-k-search placeholder="증상·질환·K번호" value="${esc(filters.search)}"></label></div></div>
      <div class="kmle-start"><button class="kmle-primary" data-k-five>5문항만 풀기 <span aria-hidden="true">→</span></button><button data-k-all>선택 범위 풀기</button><span data-k-count aria-live="polite"></span></div>
      <div class="kmle-categories"></div>
      <details class="kmle-policy"><summary>어떤 기준으로 골랐나요?</summary><p>핵심 30문항을 먼저, 여유가 있으면 추가 10문항을 풀어 보자. 족보와 같은 핵심 판단을 확인하는 연결 문항 11개, 다른 조건·검사·처치를 연습하는 확장 문항 29개를 골랐어.</p><ul>${data.selectionPolicy.rules.map(t=>`<li>${esc(t)}</li>`).join('')}</ul><p>해설은 교재 해당 문항의 해설을 바탕으로 짧게 정리하고 필요한 부분을 보완했어. 선정 이유와 관련 J는 해설을 열면 볼 수 있어.</p><p class="kmle-small">강의 연결은 현재 족보의 분류와 강의명을 기준으로 했어. 임상 강의록 확인 전의 주제 연결이야. KMLE 풀이 기록은 J 기록과 별도로 저장돼.</p></details>`;
    function draw() {
      const qs=filteredQuestions();
      root.querySelector('[data-k-count]').textContent=`${qs.length}문항 선택됨`;
      root.querySelector('[data-k-five]').disabled=!qs.length;root.querySelector('[data-k-all]').disabled=!qs.length;
      root.querySelector('.kmle-categories').innerHTML=data.categories.map((cat,i)=>{
        const items=qs.filter(q=>q.category===cat.key);if(!items.length)return '';
        const done=items.filter(q=>state(q).gradedAt).length;
        return `<section class="kmle-category"><div class="kmle-category-title"><span class="kmle-category-index">${String(i+1).padStart(2,'0')}</span><h2>${esc(cat.title)}</h2></div><p>${esc(cat.description)}</p><div class="kmle-category-foot"><span>${done} / ${items.length} 풀이</span><button data-k-category="${cat.key}">이 파트 풀기 →</button></div><details class="kmle-question-list"><summary>문항 번호 보기</summary><nav>${items.map(q=>`<a href="#kmle-${q.id}" data-k-direct="${q.id}" aria-label="${q.id}, ${tierLabel(q)}, ${statusLabel(q)}${state(q).favorite?', 즐겨찾기':''}" class="${state(q).gradedAt?'is-solved':''}">${q.id}<span>${state(q).favorite?'☆':({o:'○',x:'×',triangle:'△'})[state(q).status]||'·'}</span></a>`).join('')}</nav></details></section>`;
      }).join('')||'<div class="kmle-empty"><p>조건에 맞는 문항이 없어.</p><button data-k-reset>필터 초기화</button></div>';
      root.querySelectorAll('[data-k-category]').forEach(b=>b.onclick=()=>startSession(qs.filter(q=>q.category===b.dataset.kCategory),false,categories.get(b.dataset.kCategory).title));
      root.querySelectorAll('[data-k-direct]').forEach(a=>a.onclick=e=>{e.preventDefault();session={ids:qs.map(q=>q.id),label:'선택한 문항',short:false};saveSession();navigate(a.dataset.kDirect);});
      root.querySelector('[data-k-reset]')?.addEventListener('click',()=>{filters={priority:'core',lecture:'',status:'all',search:''};saveFilters();renderMap();});
    }
    root.querySelectorAll('[data-k-tier]').forEach(b=>b.onclick=()=>{filters.priority=b.dataset.kTier;saveFilters();renderMap();});
    root.querySelector('[data-k-lecture]').onchange=e=>{filters.lecture=e.target.value;saveFilters();draw();};
    root.querySelector('[data-k-filter]').onchange=e=>{filters.status=e.target.value;saveFilters();draw();};
    root.querySelector('[data-k-search]').oninput=e=>{filters.search=e.target.value;saveFilters();draw();};
    root.querySelector('[data-k-five]').onclick=()=>startSession(filteredQuestions(),true);
    root.querySelector('[data-k-all]').onclick=()=>startSession(filteredQuestions(),false,'선택한 문항');draw();
  }
  function saveFilters(){try {sessionStorage.setItem(FILTER_KEY,JSON.stringify(filters));}catch {}}
  function answerText(q){return q.answers.map(n=>`${n}번 · ${q.choices[n-1]}`).join(' / ');}
  function resultFor(q){return picked.length===q.answers.length&&picked.every(n=>q.answers.includes(n));}
  function grade(){if(picked.length)persist(current,{selected:[...picked],status:resultFor(current)?'o':'x',gradedAt:Date.now()});revealed=true;}
  function choose(n){
    window.CardiovascularQuickMode?.cancel();
    picked=picked.includes(n)?[]:[n];revealed=false;explanation=false;expanded=false;
    if(window.CardiovascularQuickMode?.isEnabled()&&picked.length){
      grade();const id=current.id;const right=resultFor(current);renderQuestion(false);
      window.CardiovascularQuickMode?.schedule(()=>{if(current?.id===id&&location.hash==='#kmle-'+id&&!explanation)move(1);},right);
    }else renderQuestion(false);
  }
  function explanationHTML(q){
    const last=savedSelection(q);
    return `<div class="kmle-explanation-body"><div class="kmle-explanation-tags"><span>${tierLabel(q)}</span><span>${q.selection==='connection'?'족보 연결':'임상 확장'}</span></div><h2>${esc(q.title)}</h2><div class="kmle-answer">${esc(answerText(q))}</div>
      ${last.length?`<p class="kmle-attempt">내 선택 ${last.join(', ')}번 · ${last.length===q.answers.length&&last.every(n=>q.answers.includes(n))?'맞혔어':'다시 확인하자'}</p>`:''}
      <p>${esc(q.reasoning)}</p>${q.supplement?`<p class="kmle-supplement">${esc(q.supplement)}</p>`:''}
      <section class="kmle-selection"><h3>이 문항을 고른 이유</h3><p>${esc(q.selectionReason)}</p></section>
      <section><h3>관련 J</h3>${q.relatedJ.length?`<nav class="kmle-related-links">${q.relatedJ.map(j=>`<a href="#jbl-q-${esc(j.number)}"><strong>J${esc(j.number)}</strong><span>${esc(j.label)}</span></a>`).join('')}</nav>`:'<p class="kmle-small">직접 대응하는 임상 J를 확인하지 못했어. 아래 강의 주제로 이어서 정리하자.</p>'}</section>
      <section><h3>관련 강의</h3><nav class="kmle-lecture-links">${lectureLinks(q.tags)}</nav></section>
      <footer class="kmle-provenance"><p>${esc(sourceLabel(q))} 해설 기반 · 보완 정리</p>${q.references.length?`<details><summary>보완에 참고한 자료</summary><nav>${q.references.map(([t,u])=>`<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(t)}</a>`).join('')}</nav></details>`:''}</footer></div>`;
  }
  const expandIcon = () => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${expanded?'<path d="M9 3v6H3m12-6v6h6M9 21v-6H3m12 6v-6h6"/>':'<path d="M9 3H3v6m12-6h6v6M3 15v6h6m6 0h6v-6"/>'}</svg>`;
  const closeIcon = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
  function activeIds(){return session?.ids?.includes(current?.id)?session.ids:data.questions.map(q=>q.id);}
  function renderQuestion(resetScroll=true){
    const q=current,ids=activeIds(),index=ids.indexOf(q.id),saved=state(q),top=window.scrollY;
    const oldScroll=root.querySelector('.kmle-explanation')?.scrollTop||0;
    root.className=`kmle-root kmle-question-view ${explanation?'has-explanation':''} ${expanded?'explanation-expanded':''}`;
    root.innerHTML=`<header class="kmle-bank-heading"><button data-k-map>‹ 문항 목록</button><span>${esc(session?.label||'임상 증례')}</span><span class="kmle-small">${index+1} / ${ids.length}</span></header>
      <div class="kmle-split"><article class="kmle-question jbl-card" aria-label="${q.id} 문제"><header class="jbl-card-head"><div class="jbl-meta"><span class="kmle-source">${esc(sourceLabel(q))}</span><div class="jbl-meta-right"><button data-k-status class="study-answer-status is-${({o:'correct',x:'wrong',triangle:'uncertain'})[saved.status]||'unanswered'}" aria-label="풀이 상태: ${statusLabel(q)}. 변경하기"><span data-study-status-symbol>${({o:'○',x:'×',triangle:'△'})[saved.status]||''}</span></button><span class="jbl-qid">${q.id}</span><button data-k-favorite class="jbl-favorite ${saved.favorite?'active':''}" aria-label="${saved.favorite?'즐겨찾기 해제':'즐겨찾기 추가'}" aria-pressed="${!!saved.favorite}">${saved.favorite?'★':'☆'}</button></div></div></header>
      <div class="kmle-question-body jbl-card-body"><p class="kmle-stem">${esc(q.question)}</p>${q.findings.length?`<ul class="kmle-findings">${q.findings.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`:''}
      ${q.images.map(im=>`<figure class="kmle-image"><img data-jbl-image src="${esc(im.src)}" width="${im.width}" height="${im.height}" alt="${esc(im.alt)}"><figcaption>교재 제시 그림 · 눌러서 확대</figcaption></figure>`).join('')}
      <div class="kmle-choices jbl-choices" role="group" aria-label="선지">${q.choices.map((t,i)=>{const n=i+1,sel=picked.includes(n),correct=q.answers.includes(n);return `<button data-k-choice="${n}" class="kmle-choice jbl-choice ${sel?'selected':''} ${revealed&&correct?'correct':''} ${revealed&&sel&&!correct?'wrong':''}" aria-pressed="${sel}"><span class="jbl-choice-num">${n}</span><span>${esc(t)}</span>${revealed&&correct?'<span class="kmle-result-word">정답</span>':''}</button>`;}).join('')}</div>
      <details class="kmle-original"><summary>교재 원문 확인</summary><img data-jbl-image loading="lazy" src="${esc(q.sourceImage)}" alt="${q.id} 교재 원문 발문과 선지"><p>교재의 문항·그림·선지 순서를 유지했어. ${esc(sourceLabel(q))}</p></details>
      ${!storageAvailable?'<p role="alert" class="kmle-small">현재 브라우저에 풀이 기록을 저장하지 못했어.</p>':''}</div></article>
      <aside class="kmle-explanation" aria-label="${q.id} 해설" ${explanation?'':'hidden'}><header><strong>${q.id} 해설</strong><button data-k-expand class="kmle-icon-button" aria-label="${expanded?'해설 축소':'해설 확대'}">${expandIcon()}</button><button data-k-close class="kmle-icon-button" aria-label="해설 닫기">${closeIcon}</button></header>${explanation?explanationHTML(q):''}</aside></div>
      <nav class="kmle-bottom" aria-label="국시 문항 이동"><div class="kmle-bottom-inner"><div><button data-k-explanation aria-pressed="${explanation}">${explanation?'해설 닫기':'해설 보기'}</button><button data-k-answer aria-pressed="${revealed}">${revealed?'정답 숨김':'정답 보기'}</button></div><div><button data-k-prev ${index===0?'disabled':''}>이전</button><span>${index+1} / ${ids.length}</span><button data-k-next>${index===ids.length-1?'마무리':'다음'}</button></div></div></nav>`;
    root.querySelector('[data-k-map]').onclick=()=>navigate();
    root.querySelectorAll('[data-k-choice]').forEach(b=>b.onclick=()=>choose(Number(b.dataset.kChoice)));
    root.querySelector('[data-k-favorite]').onclick=()=>{persist(q,{favorite:!state(q).favorite});renderQuestion(false);};
    root.querySelector('[data-k-status]').onclick=()=>{const states=['','o','triangle','x'];persist(q,{status:states[(states.indexOf(state(q).status||'')+1)%states.length]});renderQuestion(false);};
    root.querySelector('[data-k-answer]').onclick=()=>{window.CardiovascularQuickMode?.cancel();if(revealed){if(explanation){closeExplanation();return;}revealed=false;picked=[];}else {if(picked.length)grade();else {picked=savedSelection(q);revealed=true;}}renderQuestion(false);};
    root.querySelector('[data-k-explanation]').onclick=toggleExplanation;
    root.querySelector('[data-k-close]').onclick=closeExplanation;
    root.querySelector('[data-k-expand]').onclick=()=>{expanded=!expanded;renderQuestion(false);root.querySelector('[data-k-expand]')?.focus({preventScroll:true});};
    root.querySelector('[data-k-prev]').onclick=()=>move(-1);root.querySelector('[data-k-next]').onclick=()=>move(1);
    config.bindImages?.(root);
    navObserver?.disconnect();navObserver=new ResizeObserver(entries=>{const h=entries[0].target.getBoundingClientRect().height;if(h)root.style.setProperty('--k-nav-height',h+'px');});navObserver.observe(root.querySelector('.kmle-bottom'));
    if(resetScroll)window.scrollTo({top:0,behavior:'instant'});else {window.scrollTo({top,behavior:'instant'});const pane=root.querySelector('.kmle-explanation');if(pane)pane.scrollTop=oldScroll;}
  }
  function move(delta){if(!current)return;const ids=activeIds(),i=ids.indexOf(current.id)+delta;if(i>=ids.length){renderSummary(ids);return;}if(i>=0)navigate(ids[i]);}
  function renderSummary(ids){
    window.CardiovascularQuickMode?.cancel();navObserver?.disconnect();current=null;
    history.replaceState(history.state,'','#kmle');
    const qs=ids.map(id=>qById.get(id)),done=qs.filter(q=>state(q).gradedAt),right=done.filter(q=>state(q).status==='o'),wrong=done.filter(q=>state(q).status==='x');
    root.className='kmle-root';root.innerHTML=`<section class="kmle-session-end"><span class="kmle-eyebrow">이 범위의 풀이 기록</span><h1>여기까지 잘 마쳤어.</h1><p>${qs.length}문항 중 ${done.length}문항 채점 · 정답 ${right.length} · 오답 ${wrong.length}</p><p class="kmle-small">각 문항의 최근 풀이 기록이야. 선지를 고르지 않고 정답만 확인한 문항은 채점되지 않아.</p><div><button class="kmle-primary" data-k-map>문항 목록</button>${wrong.length?'<button data-k-retry>틀린 문항 다시 풀기</button>':''}<button data-k-next-five ${filteredQuestions().length?'':'disabled'}>다음 5문항</button></div></section>`;
    root.querySelector('[data-k-map]').onclick=renderMap;
    root.querySelector('[data-k-retry]')?.addEventListener('click',()=>startSession(wrong,false,'오답 복습'));
    root.querySelector('[data-k-next-five]').onclick=()=>{const pool=filteredQuestions(),fresh=pool.filter(q=>!ids.includes(q.id));startSession(fresh.length?fresh:pool,true);};window.scrollTo({top:0,behavior:'instant'});
  }
  function toggleExplanation(){
    window.CardiovascularQuickMode?.cancel();if(explanation)return closeExplanation();
    explanationReturnY=window.scrollY;
    if(picked.length&&!revealed)grade();else {picked=savedSelection(current);revealed=true;}
    explanation=true;renderQuestion(false);
    if(matchMedia('(max-width:900px)').matches)root.querySelector('.kmle-explanation').scrollIntoView({block:'start',behavior:'instant'});
  }
  function closeExplanation(){
    if(!explanation)return;explanation=false;expanded=false;revealed=false;picked=[];renderQuestion(false);
    window.scrollTo({top:explanationReturnY,behavior:'instant'});root.querySelector('[data-k-explanation]')?.focus({preventScroll:true});
  }
  function openQuestion(id){
    current=qById.get(id);if(!current){renderMap();return;}
    explanation=false;expanded=false;revealed=false;picked=[];renderQuestion();
  }
  // Shared gesture handlers are appended by the integration script.
  const gesturesEnabled=()=>window.CardiovascularGestures?.isEnabled?.()!==false;
  // Delegate once: the question is rerendered on selection, while the reading
  // surface includes the empty page below it. Keep explanation/UI controls out.
  (()=>{
    const swipe=window.CardiovascularSwipe; if(!swipe)return;
    const excluded='button,a,input,img,select,textarea,label,summary,[role="button"],[contenteditable],nav,table,pre,video,canvas,iframe,.kmle-bank-heading,.kmle-explanation,.masthead';
    let clearTimer=null,gesture=null,lastTap=null,suppressUntil=0,touchDoubleUntil=0,mouseDown=null;
    const cancelClear=()=>{clearTimeout(clearTimer);clearTimer=null;};
    const selectedText=()=>!!window.getSelection?.()?.toString().trim();
    function surface(target,x,y,blank=false){
      if(!current||!root?.isConnected||!location.hash.startsWith('#kmle-K')||expanded||selectedText())return false;
      if(root.closest('[hidden],[inert]')||document.querySelector('dialog[open],#jbl-image-modal.show,.wiki-section-editor-overlay'))return false;
      if(!(target instanceof Element)||target.closest('[hidden],[inert]'))return false;
      const control=target.closest(excluded);
      if(control&&(blank||!control.matches('.kmle-choice')))return false;
      const card=root.querySelector('.kmle-question'),rect=card?.getBoundingClientRect();
      const bottom=root.querySelector('.kmle-bottom')?.getBoundingClientRect().top??innerHeight;
      if(!rect||x<rect.left||x>rect.right||y<Math.max(rect.top,document.querySelector('.masthead')?.getBoundingClientRect().bottom||0)||y>=bottom)return false;
      if(card.contains(target))return !blank||target.matches('.kmle-question,.jbl-card-head,.jbl-card-body,.jbl-meta,.jbl-author-source,.jbl-meta-right,.kmle-choices,.kmle-multiple');
      // Only the real question column's background, including page space past root.
      return target===root||target.matches('.kmle-split,#kmle-view,main,body,html');
    }
    function scheduleClear(){
      cancelClear();if(!picked.length&&!revealed)return;
      const question=current,container=root;
      clearTimer=setTimeout(()=>{
        clearTimer=null;
        if(current!==question||root!==container||!root.isConnected||!location.hash.startsWith('#kmle-K'))return;
        picked=[];revealed=false;
        // Clear the selection, not the last graded O/X record or favorite.
        renderQuestion(false);
      },500);
    }
    document.addEventListener('pointerdown',e=>{
      cancelClear();
      if(e.pointerType==='mouse'){suppressUntil=0;mouseDown={x:e.clientX,y:e.clientY};}
    },{passive:true});
    document.addEventListener('click',e=>{
      if(e.defaultPrevented||e.detail===0||e.button!==0||Date.now()<suppressUntil)return;
      if(mouseDown&&Math.hypot(e.clientX-mouseDown.x,e.clientY-mouseDown.y)>10){mouseDown=null;return;}
      mouseDown=null;
      if(surface(e.target,e.clientX,e.clientY,true))scheduleClear();
    });
    document.addEventListener('dblclick',e=>{
      if(e.defaultPrevented||e.button!==0||!gesturesEnabled()||!surface(e.target,e.clientX,e.clientY,true))return;
      e.preventDefault();cancelClear();
      if(Date.now()>=touchDoubleUntil)toggleExplanation();
    });
    document.addEventListener('touchstart',e=>{
      cancelClear();mouseDown=null;suppressUntil=0;
      if(e.touches.length!==1||!gesturesEnabled()){gesture=null;lastTap=null;return;}
      const p=e.touches[0];
      if(p.clientX<24||p.clientX>innerWidth-24||!surface(e.target,p.clientX,p.clientY)){gesture=null;lastTap=null;return;}
      gesture={question:current,target:e.target,id:p.identifier,x:p.clientX,y:p.clientY,t:Date.now(),distance:0,horizontal:false,blank:surface(e.target,p.clientX,p.clientY,true)};
    },{passive:true});
    document.addEventListener('touchmove',e=>{
      if(!gesture)return;
      if(e.touches.length!==1||!gesturesEnabled()||selectedText()){gesture=null;lastTap=null;return;}
      const p=e.touches[0],dx=Math.abs(p.clientX-gesture.x),dy=Math.abs(p.clientY-gesture.y);
      gesture.distance=Math.max(gesture.distance,dx,dy);
      if(!gesture.horizontal&&swipe.vertical(dx,dy)){gesture=null;lastTap=null;suppressUntil=Date.now()+650;return;}
      if(swipe.horizontal(dx,dy)){gesture.horizontal=true;lastTap=null;}
      if(gesture.horizontal&&e.cancelable)e.preventDefault();
    },{passive:false});
    document.addEventListener('touchend',e=>{
      const g=gesture;gesture=null;if(!g)return;
      const p=Array.from(e.changedTouches).find(p=>p.identifier===g.id);
      if(!p||e.touches.length||g.question!==current||!gesturesEnabled()||selectedText()){lastTap=null;return;}
      const dx=p.clientX-g.x,dy=p.clientY-g.y;
      if(g.horizontal){
        if(e.cancelable)e.preventDefault();suppressUntil=Date.now()+650;lastTap=null;cancelClear();
        if(swipe.accepts(dx,dy))move(dx<0?1:-1);
        return;
      }
      if(!g.blank||Math.max(g.distance,Math.hypot(dx,dy))>swipe.tapDistance||Date.now()-g.t>400){lastTap=null;suppressUntil=Date.now()+650;return;}
      const now=Date.now();
      if(lastTap&&lastTap.question===current&&now-lastTap.time<=swipe.doubleTapMs&&Math.hypot(p.clientX-lastTap.x,p.clientY-lastTap.y)<=swipe.doubleTapDistance){
        lastTap=null;cancelClear();suppressUntil=touchDoubleUntil=now+700;
        if(e.cancelable)e.preventDefault();toggleExplanation();
      }else lastTap={question:current,time:now,x:p.clientX,y:p.clientY};
    },{passive:false});
    const reset=()=>{cancelClear();gesture=null;lastTap=null;mouseDown=null;};
    document.addEventListener('touchcancel',()=>{reset();suppressUntil=Date.now()+650;},{passive:true});
    document.addEventListener('study-gestures-change',reset);
    window.addEventListener('hashchange',reset);
  })();
  window.addEventListener('keydown',e=>{
    if(!location.hash.startsWith('#kmle-K')||!current||document.querySelector('dialog[open],#jbl-image-modal.show')||e.target.closest('input,textarea,select,[contenteditable="true"]'))return;
    if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}
    if(e.key==='ArrowRight'){e.preventDefault();move(1);}
    if(e.key==='Escape'&&explanation)closeExplanation();
  });

  window.addEventListener('storage',e=>{
    if(e.key!==KEY)return;records=safeObject(e.newValue);
    if(!root||!location.hash.startsWith('#kmle'))return;
    if(current){if(explanation)picked=savedSelection(current);renderQuestion(false);}else renderMap();
  });
  window.CardiovascularKMLE={
    timedQuestion(){
      if(!/^#kmle-K\d+$/.test(location.hash)||!current)return null;
      const q=current;
      return {key:'kmle2025|'+q.id,paused:explanation,
        reveal:()=>{if(current!==q)return;grade();renderQuestion(false);},
        next:()=>{if(current===q)move(1);}};
    },
    render(container,options,id){
      root=container;config=options;
      if(!id){renderMap();return;}
      if(session&&!session.ids.includes(id)){session=null;saveSession();}
      openQuestion(id);
    }
  };
})();
