/* A release collection reuses the J viewer: lecture note, its questions, next lecture. */
let updatedJblPosition = 0;
const updatedJblFilterTypes = ['정답 수정','보강 추가','문항 추가','강의 재분류'];
const updatedJblFilters = new Set();
const updatedGroupTitle = group => group.courseId ? `${group.courseId}강 · ${group.course.title}` : '출처 강의 확인 중';
const updatedGroupProfessor = group => group.courseId ? `${group.course.professor} 교수` : '강의 배정 검토';
const updatedGroupLink = group => group.courseId ? `<a href="#lecture-${group.courseId}">${escapeHtml(updatedGroupTitle(group))}</a>` : '<span>출처 강의 확인 중</span>';

function updatedJblGroups(all = false) {
  const byNumber = new Map(jblQuestions.map(q => [canonicalJblNumber(q.globalNumber),q]));
  const groups = new Map(), seen = new Set();
  for (const change of window.CARDIO_QUESTION_UPDATES?.entries || []) {
    if(!all && updatedJblFilters.size && !change.types.some(type=>updatedJblFilters.has(type)))continue;
    const number = canonicalJblNumber(change.number), question = byNumber.get(number);
    if (!question || seen.has(number)) continue;
    seen.add(number);
    // Current course metadata remains authoritative if a question moves again.
    const courseId = question.lectureId || questionLectureIds(question)[0] || 0;
    if (!groups.has(courseId)) groups.set(courseId,{courseId,course:byId(courseId) || emptyRenderCourse,items:[]});
    groups.get(courseId).items.push({...change,number,question});
  }
  return [...groups.values()].sort((a,b)=>(a.courseId || Infinity)-(b.courseId || Infinity)).map(group=>({
    ...group,items:group.items.sort((a,b)=>compareJblNumbers(a.number,b.number))
  }));
}

function updatedJblFiltersMarkup() {
  const items=updatedJblGroups(true).flatMap(group=>group.items);
  const button=(type,label,count,active)=>`<button type="button" class="update-filter${active?' active':''}" data-update-filter="${escapeHtml(type)}" aria-pressed="${active}">${label}<span>${count}</span></button>`;
  return `<div class="updates-filters" role="group" aria-label="업데이트 유형 필터 · 복수 선택">${button('','전체',items.length,!updatedJblFilters.size)}${updatedJblFilterTypes.map(type=>button(type,type,items.filter(item=>item.types.includes(type)).length,updatedJblFilters.has(type))).join('')}</div><p class="updates-filter-hint">여러 유형을 함께 선택할 수 있어요.</p>`;
}

function toggleUpdatedJblFilter(type) {
  if(type && !updatedJblFilterTypes.includes(type))return;
  closeQuestionExplanationSplit(false);
  if(!type)updatedJblFilters.clear();
  else if(updatedJblFilters.has(type))updatedJblFilters.delete(type);
  else updatedJblFilters.add(type);
  standaloneState().index=0;updatedJblPosition=0;
  renderJblStandalone();
  [...document.querySelectorAll('[data-update-filter]')].find(button=>button.dataset.updateFilter===type)?.focus({preventScroll:true});
}

function updatedJblEntries() {
  return updatedJblGroups().flatMap(group=>[{
    studyKind:'wiki',id:`jbl-update:${window.CARDIO_QUESTION_UPDATES.id}:${group.courseId}`,
    globalNumber:null,displayId:'변경 안내',question:updatedGroupTitle(group),
    choices:[],images:[],answerIndices:[],lectureIds:[group.courseId],
    group:{updateSummary:true,updateGroup:group}
  },...group.items.map(item=>item.question)]);
}

function updatedJblCounter(state,entries) {
  if(!entries.some(q=>q.group?.updateSummary))return null;
  const current=entries[state.index];
  return current?.group?.updateSummary ? (current.lectureIds[0] ? `${current.lectureIds[0]}강 안내` : '강의 확인 안내')
    : `${entries.slice(0,state.index+1).filter(q=>q.studyKind!=='wiki').length} / ${entries.filter(q=>q.studyKind!=='wiki').length}`;
}

function updatedQuestionCardMarkup(card) {
  const group=card.group.updateGroup, rows=new Map();
  for (const item of group.items) {
    const key=JSON.stringify([item.types,item.reason]);
    if(!rows.has(key))rows.set(key,{...item,numbers:[]});
    rows.get(key).numbers.push(item.number);
  }
  return `<article class="jbl-card jbl-wiki-card jbl-compact-card update-summary-card">
    <header class="jbl-card-head"><div class="jbl-meta"><div class="jbl-author-source"><span class="jbl-prof">변경 안내</span><span class="jbl-source">${escapeHtml(updatedGroupProfessor(group))} · ${group.items.length}문항</span></div></div><h2 class="jbl-title">${escapeHtml(card.question)}</h2></header>
    <div class="jbl-card-body"><p class="update-intro">이 안내 다음에 아래 문항들이 차례로 나와요.</p>
    <ul class="update-change-list">${[...rows.values()].map(row=>`<li><div class="update-change-types">${updatedJblFilterTypes.filter(type=>row.types.includes(type)).map(type=>`<span>${escapeHtml(type)}</span>`).join('')}</div><p>${escapeHtml(row.reason)}</p><div class="update-question-links">${row.numbers.map(number=>`<button type="button" data-update-question="${escapeHtml(number)}" aria-label="J${escapeHtml(number)} 문항으로 이동">J${escapeHtml(number)}</button>`).join('')}</div></li>`).join('')}</ul>
    <div class="update-card-footer">${group.courseId ? `<a href="#lecture-${group.courseId}">${group.courseId}강 Wiki로 이어보기</a>` : '<span>출처 강의 확인 중</span>'}<button type="button" data-update-question="${escapeHtml(group.items[0].number)}">문항 시작 <span aria-hidden="true">→</span></button></div></div></article>`;
}

function jumpUpdatedQuestion(number) {
  const entries=updatedJblEntries(), index=entries.findIndex(q=>q.globalNumber===canonicalJblNumber(number));
  if(index<0)return;
  closeQuestionExplanationSplit(false);
  standaloneState().index=index;
  renderJblStandalone();scrollCurrentQuestionToTop('jbl-all');
}

function bindUpdatedQuestionCard(container) {
  container.querySelectorAll('[data-update-question]').forEach(button=>button.addEventListener('click',()=>jumpUpdatedQuestion(button.dataset.updateQuestion)));
}

function renderUpdatedQuestions() {
  const root=document.querySelector('#jbl-standalone'), state=standaloneState();
  const groups=updatedJblGroups(), entries=updatedJblEntries();
  state.index=Math.max(0,Math.min(state.index,entries.length-1));
  updatedJblPosition=state.index;
  const item=entries[state.index], info=item?.studyKind==='wiki';
  const group=groups.find(g=>info ? g.courseId===item.lectureIds[0] : g.items.some(change=>change.question.id===item?.id));
  const count=groups.reduce((sum,g)=>sum+g.items.length,0);
  const total=updatedJblGroups(true).reduce((sum,g)=>sum+g.items.length,0);
  const change=group?.items.find(change=>change.question.id===item?.id);
  root.innerHTML=`<div class="jbl-wrap updates-wrap">
    <header class="updates-heading"><div><p>${escapeHtml(window.CARDIO_QUESTION_UPDATES.date.replaceAll('-','.'))} · ${updatedJblFilters.size?`선택 ${count} / 전체 ${total}문항`:`${count}문항`}</p><h1>최신 업데이트 문항 모아보기</h1></div><a class="updates-home" href="#home">홈으로</a></header>
    ${updatedJblFiltersMarkup()}
    <nav class="updates-course-nav" aria-label="업데이트 강의 이동"><label for="updates-course-select">강의 이동</label><select id="updates-course-select" ${!groups.length?'disabled':''}>${groups.map(g=>`<option value="${g.courseId}" ${g===group?'selected':''}>${escapeHtml(updatedGroupTitle(g))} (${g.items.length}문항)</option>`).join('')}</select><button type="button" data-update-summary ${info||!group?'disabled':''}>변경 안내</button></nav>
    ${!info&&group?`<div class="updates-question-context">${updatedGroupLink(group)}<span>${escapeHtml(updatedGroupProfessor(group))} · ${group.items.findIndex(c=>c.question.id===item.id)+1} / ${group.items.length}문항</span><details><summary>이 문항의 변경 내용</summary><p>${updatedJblFilterTypes.filter(type=>change.types.includes(type)).map(escapeHtml).join(' · ')}<br>${escapeHtml(change.reason)}</p></details></div>`:''}
    <div data-updated-question-root></div></div><div class="jbl-bottom-nav"><div class="jbl-bottom-inner">${navMarkup(state,entries)}</div></div>`;
  renderQuestionCard(root.querySelector('[data-updated-question-root]'),entries,'jbl-all',renderJblStandalone);
  const nav=root.querySelector('.jbl-bottom-inner');
  bindViewerNav(nav,entries,'jbl-all',renderJblStandalone);
  if(info)nav.querySelector('.jbl-nav-actions').innerHTML=`<span class="updates-nav-hint">다음은 실제 ${group.items.length}문항</span>`;
  const showGroup=id=>{
    const index=entries.findIndex(q=>q.studyKind==='wiki'&&q.lectureIds[0]===Number(id));
    if(index<0)return;
    closeQuestionExplanationSplit(false);state.index=index;renderJblStandalone();scrollCurrentQuestionToTop('jbl-all');
  };
  root.querySelector('#updates-course-select').addEventListener('change',event=>showGroup(event.target.value));
  root.querySelector('[data-update-summary]').addEventListener('click',()=>showGroup(group.courseId));
  root.querySelectorAll('[data-update-filter]').forEach(button=>button.addEventListener('click',()=>toggleUpdatedJblFilter(button.dataset.updateFilter)));
}
