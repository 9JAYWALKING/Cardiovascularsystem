/* AI collections reuse the J viewer. Their progress and favorites stay separate. */
window.PredictionLab = (() => {
  const storageKey='cardiovascular-prediction-lab-v1';
  let saved={},session=null;
  try { saved=JSON.parse(localStorage.getItem(storageKey)||'{}'); } catch (_) {}
  if(!saved || typeof saved!=='object' || Array.isArray(saved))saved={};
  const collections=()=>[
    {...window.PREDICTION_LAB_DATA,shortTitle:'흉통과 호흡곤란',eyebrow:'증례 연구 01 · AI 예상문항',courseId:52,syntheticCourseId:-5201,wikiDescription:'증례의 단서부터 검사와 치료까지 연결해요.',topics:[['chest','흉통'],['dyspnea','호흡곤란']]},
    window.PREDICTION_LAB_LIPIDS_DATA
  ].filter(d=>d?.id);
  let activeId='cases';
  const data=()=>collections().find(d=>d.id===activeId)||collections()[0];
  const own=id=>String(id).startsWith('ai-lab:');
  const esc=value=>escapeHtml(String(value??''));
  const link=(mode,target='',collectionId=activeId)=>`#prediction-lab/${collectionId}/${mode}${target?'/'+target:''}`;
  const write=(id,change)=>{
    const next={...saved,[id]:{...saved[id],...change}};
    if(!writeStudyStorage(storageKey,next))return false;
    saved=next;return true;
  };
  const status=id=>['correct','uncertain','wrong'].includes(saved[id]?.status)?saved[id].status:'unanswered';
  const favorite=id=>Boolean(saved[id]?.favorite);
  const persistStatus=(id,value)=>{const ok=write(id,{status:value,updatedAt:Date.now()});refreshQuestionStudyStatus(id);return ok;};
  const toggleFavorite=id=>write(id,{favorite:!favorite(id)});
  const shuffle=items=>{const a=items.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const course=()=>({...emptyRenderCourse,id:data().syntheticCourseId,title:data().title,isAiLab:true});
  const card=g=>({id:`ai-lab:${activeId}:card:${g.key}`,globalNumber:'AI-C-'+g.key,studyKind:'wiki',isAiLab:true,question:g.heading,source:data().shortTitle+' · 핵심 개념',lectureIds:[data().courseId],group:{...g,source:g.source+'\n\n@labwiki '+g.key+'\n@labquestions '+g.numbers.join(','),compact:true,sourceCourse:data().courseId,wikiSections:[]}});
  const questionLinks=numbers=>`<div class="lab-question-links"><span>연습 문항</span><div>${numbers.filter(n=>data().questions.some(q=>q.labNumber===n)).map(n=>`<a href="${link('j',n)}">AI ${String(n).padStart(2,'0')}</a>`).join('')}</div></div>`;
  function renderBlock(line){
    if(line.startsWith('@labquestions '))return questionLinks(line.slice(14).split(',').map(Number));
    if(line.startsWith('@labwiki ')){
      const group=data().groups.find(g=>g.key===line.slice(9).trim());
      return group?`<div class="jbl-concept-links"><a href="${link('wiki',group.key)}">Wiki에서 자세히 · ${esc(group.heading)}</a></div>`:'';
    }
    return '';
  }
  function tabs(mode){return `<div class="lecture-view-tabs" role="group" aria-label="학습 화면 선택">${['wiki','j','jbl'].map(m=>`<button type="button" data-lab-view="${m}" aria-pressed="${m===mode}">${m==='wiki'?'Wiki':m.toUpperCase()}</button>`).join('')}</div>`;}
  function header(mode){
    const d=data(),items=collections(),index=items.findIndex(item=>item.id===activeId);
    const previous=items[index-1],next=items[index+1];
    return `<header class="detail-bar lab-detail-bar"><div class="detail-topline"><div><p class="detail-breadcrumb"><a class="lab-return" href="#prediction-lab">예상문항연구소</a> · AI 예상문항</p><h2>${esc(d.shortTitle)}</h2><p class="detail-info">${d.questions.length}문항 · 개념 카드 ${d.groups.length}개</p></div>${tabs(mode)}<div class="detail-course-controls" aria-label="연구 묶음 이동"><button class="content-tab detail-course-nav" type="button" data-lab-collection="${previous?.id||''}" aria-label="이전 연구 묶음" title="이전 연구 묶음" ${previous?'':'disabled'}><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19 12H5m6-6-6 6 6 6"/></svg></button><button class="content-tab detail-course-nav" type="button" data-lab-collection="${next?.id||''}" aria-label="다음 연구 묶음" title="다음 연구 묶음" ${next?'':'disabled'}><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button><form class="detail-number-form" data-lab-collection-form><button class="detail-number" type="button" data-lab-collection-number title="연구 묶음 번호를 입력하여 이동" aria-label="연구 묶음 ${index+1} · 번호 입력하여 이동">${index+1}</button><input class="detail-number-input" data-lab-collection-input type="text" inputmode="numeric" pattern="[0-9]*" value="${index+1}" aria-label="이동할 연구 묶음 번호" autocomplete="off" hidden /></form></div></div></header>`;
  }
  function bindHeader(root,mode){
    root.querySelectorAll('[data-lab-view]').forEach(button=>button.onclick=()=>{location.hash=link(button.dataset.labView);});
    root.querySelectorAll('[data-lab-collection]').forEach(button=>button.onclick=()=>{if(button.dataset.labCollection)location.hash=link(mode,'',button.dataset.labCollection);});
    const form=root.querySelector('[data-lab-collection-form]'),button=form.querySelector('[data-lab-collection-number]'),input=form.querySelector('[data-lab-collection-input]');
    const reset=()=>{input.hidden=true;button.hidden=false;input.value=String(collections().findIndex(d=>d.id===activeId)+1);input.setCustomValidity('');};
    const commit=report=>{
      if(input.hidden)return;
      const value=input.value.trim(),item=/^\d+$/.test(value)?collections()[Number(value)-1]:null;
      if(!value){reset();return;}
      if(!item){if(report){input.setCustomValidity('존재하는 연구 묶음 번호를 입력하세요.');input.reportValidity();}else reset();return;}
      reset();if(item.id!==activeId)location.hash=link(mode,'',item.id);
    };
    button.onclick=()=>{button.hidden=true;input.hidden=false;input.focus();input.select();};
    input.oninput=()=>input.setCustomValidity('');
    input.onkeydown=event=>{if(event.key==='Escape'){event.preventDefault();reset();button.focus();}};
    input.onblur=()=>commit(false);
    form.onsubmit=event=>{event.preventDefault();commit(true);};
  }
  function hub(root){
    const cards=collections().map((d,i)=>{
      const count=d.questions.filter(q=>status(q.id)!=='unanswered').length;
      return `<article class="lab-collection"><div class="lab-collection-number" aria-hidden="true">${String(i+1).padStart(2,'0')}</div><div class="lab-collection-main"><p class="lab-eyebrow">${esc(d.eyebrow)}</p><h2>${esc(d.title)}</h2><p>${esc(d.summary)}</p><div class="lab-stats"><span>${d.questions.length}문항</span><span>${d.groups.length}개 개념 카드</span><span>${count}/${d.questions.length} 학습</span></div><div class="lab-collection-actions"><a class="lab-primary" href="${link('j','',d.id)}">J · 문제 풀기 <span aria-hidden="true">→</span></a><a href="${link('wiki','',d.id)}">Wiki · 이해하기</a><a href="${link('jbl','',d.id)}">JBL · 빠른 복습</a></div></div></article>`;
    }).join('');
    root.innerHTML=`<header class="lab-home-head"><a class="lab-back" href="#home">← 홈</a><p class="lab-eyebrow">AI PRACTICE</p><h1>예상문항연구소</h1><p>익숙한 개념을 새로운 문제에서 꺼내 보는 곳.<br>Wiki로 이해하고, J로 풀고, JBL로 압축해서 복습해요.</p></header>${cards}<p class="lab-footnote">AI 문항의 풀이 상태와 즐겨찾기는 이 연구소 안에 따로 저장됩니다.</p>`;
  }
  function buildBatch(){
    const s=session;
    let qs=data().questions.filter(q=>(!s.topic||q.topic===s.topic)&&(!s.status||status(q.id)===s.status)&&(!s.favorites||favorite(q.id)));
    if(s.mode==='j')s.batch=s.random?shuffle(qs):qs;
    else {
      let groups=data().groups.filter(g=>qs.some(q=>q.labGroup===g.key));
      if(s.random)groups=shuffle(groups);
      s.batch=groups.flatMap(g=>[card(g),...qs.filter(q=>q.labGroup===g.key)]);
    }
    viewerState(s.key).index=0;
  }
  function controls(){
    const s=session;
    return `<div class="lab-controls"><div class="lab-topic" role="group" aria-label="주제 선택">${[['','전체'],...data().topics].map(([v,t])=>`<button type="button" data-lab-topic="${v}" aria-pressed="${s.topic===v}">${t}</button>`).join('')}</div><div class="lab-filter-row"><label>풀이 상태 <select data-lab-status>${[['','전체'],['unanswered','미풀이'],['correct','○ 정답'],['uncertain','△ 보류'],['wrong','X 오답']].map(([v,t])=>`<option value="${v}"${s.status===v?' selected':''}>${t}</option>`).join('')}</select></label><button type="button" data-lab-favorites aria-pressed="${s.favorites}">☆ 즐겨찾기</button><button type="button" data-lab-random aria-pressed="${s.random}">⇄ 랜덤</button><button type="button" data-lab-refilter title="현재 풀이 기록으로 필터를 다시 적용">필터 다시 적용</button></div><p class="lab-filter-note">풀고 나서 상태가 바뀌어도 현재 목록은 유지됩니다.</p></div>`;
  }
  function renderStudy(root){
    root.innerHTML=header(session.mode)+controls()+`<div data-lab-question-root></div><nav class="lab-bottom" data-lab-nav aria-label="AI 문항 탐색"></nav>`;
    bindHeader(root,session.mode);
    const draw=()=>{
      const host=root.querySelector('[data-lab-question-root]'),nav=root.querySelector('[data-lab-nav]');
      if(!host)return;
      renderQuestionCard(host,session.batch,session.key,draw);
      if(!session.batch.length)host.innerHTML='<div class="jbl-empty"><strong>조건에 맞는 문항이 없습니다.</strong><p>주제·풀이 상태·즐겨찾기 필터를 조정해 주세요.</p></div>';
      nav.innerHTML=navMarkup(viewerState(session.key),session.batch);
      bindViewerNav(nav,session.batch,session.key,draw);
    };
    session.draw=draw;
    root.querySelectorAll('[data-lab-topic]').forEach(b=>b.onclick=()=>{session.topic=b.dataset.labTopic;apply();});
    root.querySelector('[data-lab-status]').onchange=e=>{session.status=e.target.value;apply();};
    root.querySelector('[data-lab-favorites]').onclick=()=>{session.favorites=!session.favorites;apply();};
    root.querySelector('[data-lab-random]').onclick=()=>{session.random=!session.random;apply();};
    root.querySelector('[data-lab-refilter]').onclick=apply;
    function apply(){closeQuestionExplanationSplit(false);window.CardiovascularQuickMode?.cancel();buildBatch();renderStudy(root);}
    draw();
  }
  function renderWiki(root,target){
    root.innerHTML=header('wiki')+`<div class="lab-wiki">${renderWikiDocument(data().wiki,course())}</div>`;
    bindHeader(root,'wiki');
    const content=root.querySelector('.lab-wiki');bindWikiDocument(content,course());
    // Synthetic collections must never edit or bookmark the linked lecture's source.
    content.querySelectorAll('[data-wiki-heading-edit],.wiki-bookmark,[data-wiki-section-edit]').forEach(el=>el.remove());
    const groupIndex=data().groups.findIndex(g=>g.key===target);
    if(groupIndex>=0)requestAnimationFrame(()=>content.querySelectorAll('section[data-wiki-heading]')[groupIndex]?.scrollIntoView({block:'start'}));
  }
  function render(root,hash){
    window.CardiovascularQuickMode?.cancel();
    const match=hash.match(/^#prediction-lab\/([a-z0-9-]+)\/(wiki|j|jbl)(?:\/([a-z0-9-]+))?$/);
    const valid=Boolean(match&&collections().some(d=>d.id===match[1]));
    root.classList.toggle('lab-study',valid);
    if(!valid){session=null;hub(root);return;}
    const [,collectionId,mode,target]=match;
    activeId=collectionId;
    if(mode==='wiki'){session=null;renderWiki(root,target);return;}
    const key='lab:'+activeId+':'+mode;
    if(!session||session.mode!==mode||session.collectionId!==activeId){session={collectionId:activeId,mode,key,topic:'',status:'',favorites:false,random:false,batch:[]};buildBatch();}
    if(target){
      const group=data().groups.find(g=>g.key===target);
      const id=group?`ai-lab:${activeId}:card:${group.key}`:`ai-lab:${activeId}:q${String(Number(target)).padStart(2,'0')}`;
      let index=session.batch.findIndex(q=>q.id===id);
      if(index<0){session.topic='';session.status='';session.favorites=false;session.random=false;buildBatch();index=session.batch.findIndex(q=>q.id===id);}
      if(index>=0)viewerState(key).index=index;
    }
    renderStudy(root);
  }
  function jump(value){
    if(!session)return false;
    const n=Number(String(value).replace(/^AI\s*/i,''));
    if(!data().questions.some(q=>q.labNumber===n))return false;
    const i=session.batch.findIndex(q=>q.labNumber===n);
    if(i>=0){viewerState(session.key).index=i;session.draw();scrollTop();}
    else location.hash=link('j',n);
    return true;
  }
  function scrollTop(){requestAnimationFrame(()=>{const el=document.querySelector('#prediction-lab-view [data-lab-question-root]');if(el)window.scrollTo({top:Math.max(0,window.scrollY+el.getBoundingClientRect().top-(document.querySelector('.masthead')?.getBoundingClientRect().height||0)-12),behavior:'smooth'});});}
  return {render,renderBlock,own,status,persistStatus,favorite,toggleFavorite,jump,scrollTop};
})();
