/* The tutorial never calls the bank's selection, status, storage or filter APIs. */
(()=>{
  'use strict';
  const paths={book:'M12 5v15M12 5C8 3 5 3 2 4v15c3-1 6-1 10 1 4-2 7-2 10-1V4c-3-1-6-1-10 1',hand:'M8 13V5a2 2 0 0 1 4 0v7-4a2 2 0 0 1 4 0v4-2a2 2 0 0 1 4 0v5c0 4-3 6-6 6h-1c-3 0-4-2-6-4l-3-4a2 2 0 0 1 3-2l1 2',search:'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',arrow:'M5 12h14m-6-6 6 6-6 6',back:'M19 12H5m6-6-6 6 6 6',close:'m6 6 12 12M6 18 18 6',check:'m5 12 4 4L19 6',star:'m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z',left:'M20 12H4m6-6-6 6 6 6',right:'M4 12h16m-6-6 6 6-6 6'};
  const icon=name=>`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]||paths.book}"/></svg>`;
  const dialog=document.createElement('dialog');dialog.id='study-tutorial';dialog.setAttribute('aria-labelledby','t-title');
  dialog.innerHTML=`<header class="t-head"><button class="t-icon-button" data-t="hub" aria-label="사용법 목록으로">${icon('back')}</button><div><div class="t-eyebrow">STUDY GUIDE</div><h2 id="t-title">사이트 사용법</h2></div><button class="t-icon-button" data-t="close" aria-label="사용법 닫기">${icon('close')}</button></header><div class="t-body"></div><footer class="t-foot" hidden></footer>`;
  document.body.append(dialog);
  const body=dialog.querySelector('.t-body'),foot=dialog.querySelector('.t-foot'),title=dialog.querySelector('#t-title');
  let mode='hub',step=0,done=false,selected=null,revealed=false,explained=false,status=0,star=false,statusTried=false,starTried=false,filter='all',jblNext=false,gesturePage=1,gestureExplanation=false,gestureSelection=true,faqCategory='전체',returnFocus=null,returnScroll=0,oldOverflow='',gestureCleanup=()=>{};
  // Keep the controls reachable after pinch zoom or when the mobile keyboard opens.
  function fitViewport(){
    if(!dialog.open)return;const v=window.visualViewport;if(!v)return;
    const gap=v.width<=650?16:32;
    Object.assign(dialog.style,{position:'fixed',margin:'0',inset:'auto',left:`${v.offsetLeft+v.width/2}px`,top:`${v.offsetTop+v.height/2}px`,transform:'translate(-50%,-50%)',width:`${Math.max(240,Math.min(1040,v.width-gap))}px`,maxHeight:`${Math.max(160,v.height-gap)}px`});
  }
  window.visualViewport?.addEventListener('resize',fitViewport);
  window.visualViewport?.addEventListener('scroll',fitViewport);
  const basic=[
    ['강의 하나를 열어볼까요?','강의 안에서 Wiki·J·JBL을 오가며 공부할 수 있어요.'],
    ['읽다가, 바로 한 문제','Wiki 아래의 J 링크를 눌러보세요.'],
    ['선지를 고르고 해설 열기','답을 한 번 고른 다음, 해설 보기를 눌러보세요.'],
    ['다시 볼 문제 표시하기','풀이 상태와 별표를 각각 한 번 눌러보세요.'],
    ['틀린 문제만 모아보기','× 필터를 선택해보세요.'],
    ['JBL로 짧게 복습하기','개념을 확인하고 다음 문항으로 넘어가보세요.']
  ];
  const gestures=[
    ['왼쪽으로 밀면 다음 문제','아래 연습 영역을 왼쪽으로 밀어보세요. 천천히 밀어도 괜찮아요.'],
    ['오른쪽으로 밀면 이전 문제','이번에는 오른쪽으로 밀어보세요.'],
    ['여백을 두 번 누르면 해설','버튼이 없는 여백을 톡톡 눌러보세요.'],
    ['한 번 더 두 번 누르면 닫기','같은 여백을 다시 두 번 눌러보세요.'],
    ['여백을 한 번 누르면 선택 해제','여백을 한 번 눌러 선택 표시를 지워보세요. 풀이 기록은 유지돼요.']
  ];
  function open(){
    if(dialog.open)return;returnFocus=document.activeElement;returnScroll=window.scrollY;oldOverflow=document.documentElement.style.overflow;
    mode='hub';render();dialog.showModal();document.documentElement.style.overflow='hidden';fitViewport();
    body.querySelector('button')?.focus({preventScroll:true});
  }
  function close(){dialog.close();}
  dialog.addEventListener('close',()=>{gestureCleanup();document.documentElement.style.overflow=oldOverflow;window.scrollTo({top:returnScroll,behavior:'instant'});returnFocus?.isConnected&&returnFocus.focus({preventScroll:true});});
  document.addEventListener('click',e=>{if(e.target.closest('[data-study-tutorial-open]')){e.preventDefault();open();}});
  function resetStep(){done=false;selected=null;revealed=false;explained=false;status=0;star=false;statusTried=starTried=false;filter='all';jblNext=false;gestureExplanation=mode==='gesture'&&step===3;gestureSelection=true;gesturePage=step===1?2:1;}
  function enter(next){mode=next;step=0;resetStep();render();}
  function feedback(text,complete=false){const el=body.querySelector('.t-feedback');if(el){el.textContent=text;el.classList.toggle('done',complete);}if(complete){done=true;const next=foot.querySelector('[data-t="next"]');if(next)next.disabled=false;}}
  function demo(content){return `<div class="t-demo"><div class="t-demo-label"><span>사용법 연습</span><span>기록 저장 안 함</span></div>${content}</div>`;}
  function render(){
    gestureCleanup();gestureCleanup=()=>{};
    title.textContent=mode==='basic'?'기본 사용 연습':mode==='gesture'?'제스처 연습':mode==='find'?'기능 찾아보기':'사이트 사용법';
    dialog.querySelector('[data-t="hub"]').hidden=mode==='hub';foot.hidden=true;
    if(mode==='hub')renderHub();else if(mode==='basic')renderBasic();else if(mode==='gesture')renderGesture();else if(mode==='find')renderFind();else renderFinish();
    body.scrollTop=0;
  }
  function renderHub(){body.innerHTML=`<div class="t-lead"><h3>읽고, 풀고, 다시 기억하기.</h3><p>처음부터 따라 해도, 필요한 기능만 찾아봐도 좋아요.</p></div><div class="t-hub-grid"><button class="t-module" data-t="basic">${icon('book')}<span><strong>기본 사용 연습</strong><small>Wiki에서 문제로, 문제에서 복습으로.<br>한 번 눌러보면 익숙해져요.</small></span><span>6단계 · 약 2분 ${icon('arrow')}</span></button><button class="t-module" data-t="gesture">${icon('hand')}<span><strong>제스처 연습</strong><small>밀어서 이동하고, 두 번 눌러 해설 열기.<br>손에 익도록 가볍게 연습해요.</small></span><span>5단계 · 약 1분 ${icon('arrow')}</span></button><button class="t-module" data-t="find">${icon('search')}<span><strong>기능 찾아보기</strong><small>필터, 랜덤, 빠른 모드, 글꼴 변경…<br>하고 싶은 일을 검색해보세요.</small></span><span>필요할 때 바로 찾기 ${icon('arrow')}</span></button></div><p class="t-record-note">연습 내용은 실제 문항의 답·풀이 상태·즐겨찾기에 영향을 주지 않아요.</p>`;}
  function frame(items,content){body.innerHTML=`<div class="t-steps" aria-label="${items.length}단계 중 ${step+1}단계">${items.map((_,i)=>`<span class="${i<=step?'on':''}"></span>`).join('')}</div><div class="t-coach"><span class="t-step-number">${step+1}</span><div><h3>${items[step][0]}</h3><p>${items[step][1]}</p></div></div>${content}<div class="t-feedback" role="status" aria-live="polite">직접 눌러보세요. 건너뛰어도 괜찮아요.</div>`;
    foot.hidden=false;foot.innerHTML=`<div><button class="t-button" data-t="previous" ${step===0?'disabled':''}>이전</button><small>${step+1} / ${items.length}</small></div><div><button class="t-text-button" data-t="skip">건너뛰기</button><button class="t-button t-primary" data-t="next" ${done?'':'disabled'}>${step===items.length-1?'연습 마치기':'다음'} ${icon('arrow')}</button></div>`;
  }
  function question(){return `<div class="t-demo-content"><h4>심박수가 70회/분, 1회 박출량이 70 mL일 때 심박출량은?</h4><div class="t-options">${['2.1','3.5','4.9','7.0','9.8'].map((v,i)=>`<button class="t-choice ${revealed&&i===2?'correct':''} ${revealed&&selected===i&&i!==2?'wrong':''} ${selected===i?'selected':''}" data-t="choice" data-choice="${i}" aria-pressed="${selected===i}"><span>${i+1}</span><span>${v} L/min</span></button>${revealed&&i===2?'<div class="t-inline-note">↳ CO = HR × SV = 70 × 70 = 4.9 L/min</div>':''}`).join('')}</div><div class="t-actions"><button class="t-button t-primary" data-t="explanation" aria-expanded="${explained}">해설 ${explained?'닫기':'보기'}</button><button class="t-button" data-t="answer">정답 보기</button></div></div>`;}
  function renderQuestion(){const zone=body.querySelector('[data-t-question]');zone.classList.toggle('t-demo-split',explained);zone.innerHTML=question()+(explained?'<div class="t-demo-content t-explanation"><h4>정답 ③ · 심박출량</h4><p><b>1분 동안 심장이 내보낸 혈액량</b>이에요. 한 번에 보내는 양에 1분의 박동 수를 곱해요.</p><div class="t-formula">CO = HR × SV</div><p>70 × 70 = 4,900 mL/min<br>mL를 L로 바꾸면 <b>4.9 L/min</b>이에요.</p><p>이런 계산 문제는 정답 선지 아래에 공식을 한 번만 보여줘요.</p></div>':'');}
  function renderBasic(){
    let content='';
    if(step===0)content=demo(`<div class="t-demo-content"><button class="t-lecture" data-t="lecture"><span>6강</span><span><strong>심장의 기계적 활동</strong><small>강의 열기</small></span>${icon('arrow')}</button><div data-t-lecture-detail hidden class="t-concept"><p><b>Wiki</b> · 개념을 이해하는 문서<br><b>J</b> · 기출문제를 풀고 해설 확인<br><b>JBL</b> · 핵심 개념과 관련 문제를 이어서 복습</p></div></div>`);
    if(step===1)content=demo(`<div class="t-demo-split"><div class="t-demo-content"><div class="t-tabs"><span class="active">Wiki</span><span>J</span><span>JBL</span></div><h4>심장이 1분 동안 보내는 혈액량</h4><p>심박출량은 심박수와 1회 박출량을 곱한 값이에요.</p><div class="t-formula">CO = HR × SV</div><button class="t-demo-link" data-t="wiki-link">J · 연습 01 ${icon('arrow')}</button></div><div class="t-demo-content" data-t-linked><small>J 링크를 누르면 이쪽에 문제가 열려요.</small></div></div>`);
    if(step===2)content=demo('<div data-t-question></div>');
    if(step===3)content=demo(`<div class="t-demo-content"><div class="t-status-row"><small>연습 01</small><button class="t-icon-button t-status" data-t="status" aria-label="풀이 상태: 미풀이. 누르면 정답" aria-pressed="false"></button><button class="t-icon-button t-status" data-t="star" aria-label="즐겨찾기" aria-pressed="false">${icon('star')}</button></div><h4>알지만 조금 헷갈렸던 문제라면?</h4><p>풀이 상태를 직접 바꾸고, 다시 보고 싶은 문제는 별표로 모아두세요.</p><div class="t-state-key"><span>빈칸: 미풀이</span><span>○ 정답</span><span>△ 세모</span><span>× 오답</span></div></div>`);
    if(step===4)content=demo(`<div class="t-demo-content"><h4>문항 필터</h4><p>실제 문제 화면에서는 상단 설정에서 필터를 바꿀 수 있어요.</p><div class="t-filter"><button class="t-button" data-t="filter" data-filter="all" aria-pressed="true">전체</button><button class="t-button" data-t="filter" data-filter="triangle" aria-pressed="false">△ 세모</button><button class="t-button" data-t="filter" data-filter="wrong" aria-pressed="false">× 오답</button></div><div class="t-result-list" data-t-results></div></div>`);
    if(step===5)content=demo(`<div class="t-demo-content" data-t-jbl><div class="t-tabs"><span>Wiki</span><span>J</span><span class="active">JBL</span></div><small>핵심 개념</small><div class="t-concept"><h4>심박출량</h4><p><b>CO = HR × SV</b><br>심박수 × 1회 박출량<br>결과가 mL라면 1,000으로 나누어 L로.</p></div><button class="t-button t-primary" data-t="jbl-next">다음 · 관련 문제 ${icon('arrow')}</button></div>`);
    frame(basic,content);if(step===2)renderQuestion();if(step===4)renderResults();
  }
  function renderResults(){const rows=[['○','연습 01 · 심박출량','correct'],['×','연습 02 · 1회 박출량','wrong'],['△','연습 03 · 박출률','triangle']];body.querySelector('[data-t-results]').innerHTML=rows.filter(r=>filter==='all'||r[2]===filter).map(r=>`<div><span>${r[0]}</span>${r[1]}</div>`).join('');}
  function renderGesture(){frame(gestures,`<div class="t-gesture-pad" tabindex="0" aria-label="제스처 연습 영역. 아래 동작 예시 보기로도 학습할 수 있습니다."><div class="t-gesture-card"></div></div><div class="t-gesture-cue">${icon(step===0?'left':step===1?'right':'hand')}<span>${step<2?'손가락으로 밀기 · 마우스로도 드래그 가능':'버튼이 없는 영역을 눌러보세요'}</span></div><div class="t-gesture-help"><span>실제 풀이 화면과 같은 스와이프 기준이에요.</span><button class="t-text-button" data-t="gesture-example">동작 예시 보기</button></div>`);updateGesture();feedback(step<2?'선지 위에서 시작해도 이동할 수 있어요. 사진과 도구 버튼은 각자의 기능을 유지해요.':'실제 화면에서도 여백에서 해보세요.');bindGesture();}
  function updateGesture(){const card=body.querySelector('.t-gesture-card');if(!card)return;card.innerHTML=`<small>연습 ${String(gesturePage).padStart(2,'0')}</small><h4>${gesturePage===1?'심박출량을 구하는 공식은?':'1회 박출량을 구하는 공식은?'}</h4><span class="t-gesture-pill ${step===4&&gestureSelection?'selected':''}">${gesturePage===1?'CO = HR × SV':'SV = EDV − ESV'}</span>${gestureExplanation?'<div class="t-gesture-answer"><strong>해설</strong><br>심박출량 = 심박수 × 1회 박출량</div>':''}`;}
  function gestureAction(action,example=false){if(done)return;
    const expected=['left','right','double','double','single'][step];
    if(action!==expected){feedback(step<2?'화면을 '+(step===0?'왼쪽':'오른쪽')+'으로 조금 더 밀어보세요.':step<4?'같은 여백을 톡톡, 두 번 눌러보세요.':'이번에는 여백을 한 번만 눌러보세요.');return;}
    if(step===0)gesturePage=2;if(step===1)gesturePage=1;if(step===2)gestureExplanation=true;if(step===3)gestureExplanation=false;if(step===4)gestureSelection=false;updateGesture();
    feedback((example?'동작 예시를 확인했어요. ':'')+['다음 문제로 이동했어요.','이전 문제로 돌아왔어요.','해설이 열렸어요.','해설을 닫았어요.','선택 표시만 사라졌어요. 실제 풀이 기록은 그대로예요.'][step],true);
  }
  function bindGesture(){const pad=body.querySelector('.t-gesture-pad'),policy=window.CardiovascularSwipe;let down=null,lastTap=null,timer=null;
    const reset=()=>{down=null;lastTap=null;clearTimeout(timer);const card=pad.querySelector('.t-gesture-card');if(card)card.style.transform='';};
    pad.addEventListener('pointerdown',e=>{if(e.button!==0||e.isPrimary===false){reset();return;}clearTimeout(timer);down={id:e.pointerId,x:e.clientX,y:e.clientY,t:Date.now(),distance:0,horizontal:false};});
    pad.addEventListener('pointermove',e=>{if(!down||e.pointerId!==down.id)return;const dx=e.clientX-down.x,dy=e.clientY-down.y;down.distance=Math.max(down.distance,Math.hypot(dx,dy));if(!down.horizontal&&policy.vertical(dx,dy)){reset();return;}if(policy.horizontal(dx,dy)){down.horizontal=true;lastTap=null;pad.setPointerCapture(e.pointerId);}if(down.horizontal){if(e.cancelable)e.preventDefault();if(!matchMedia('(prefers-reduced-motion:reduce)').matches)pad.querySelector('.t-gesture-card').style.transform=`translateX(${Math.max(-24,Math.min(24,dx*.2))}px)`;}});
    pad.addEventListener('pointerup',e=>{if(!down||e.pointerId!==down.id)return;const g=down;down=null;const dx=e.clientX-g.x,dy=e.clientY-g.y;pad.querySelector('.t-gesture-card').style.transform='';if(g.horizontal){lastTap=null;if(policy.accepts(dx,dy))gestureAction(dx<0?'left':'right');else feedback('옆으로 조금 더 밀어보세요. 빠르게 움직일 필요는 없어요.');return;}if(g.distance>policy.tapDistance||Math.hypot(dx,dy)>policy.tapDistance||Date.now()-g.t>400){lastTap=null;return;}const now=Date.now();if(lastTap&&now-lastTap.t<=policy.doubleTapMs&&Math.hypot(e.clientX-lastTap.x,e.clientY-lastTap.y)<=policy.doubleTapDistance){lastTap=null;clearTimeout(timer);gestureAction('double');}else{lastTap={x:e.clientX,y:e.clientY,t:now};timer=setTimeout(()=>{lastTap=null;if(step===4)gestureAction('single');},policy.doubleTapMs+20);}});
    pad.addEventListener('pointercancel',reset);gestureCleanup=reset;
  }
  const faqs=[
    ['Wiki','Wiki, J, JBL은 어떻게 다른가요?','<b>Wiki</b>는 강의 내용을 이해하는 문서, <b>J</b>는 기출문제와 해설, <b>JBL</b>은 핵심 개념과 관련 문제를 이어 보는 복습 화면이에요. 강의를 열고 위쪽 탭에서 바꿔보세요.','시작 강의 공부'],
    ['Wiki','Wiki를 읽다가 관련 문제를 풀고 싶어요.','문단 아래 <b>J 링크</b>를 누르면 연결된 문제가 옆에 열려요. 문서를 계속 보면서 풀 수 있고, 문제 창을 닫으면 읽던 곳으로 돌아가요.','링크 분할 화면'],
    ['Wiki','내용을 외웠는지 확인하고 싶어요.','개념 끝의 <b>백지복습</b>을 펼쳐 질문에 답해보세요. 문단 제목 옆 <b>출제 횟수</b>를 누르면 연결 문항을 확인할 수 있어요. 아래 J 링크로 바로 풀어봐도 좋아요.','회상 암기 횟수'],
    ['문제풀이','정답 보기와 해설 보기는 뭐가 다른가요?','<b>정답 보기</b>는 문제 안에서 답과 선지 아래 학습 내용을 보여줘요. <b>해설 보기</b>는 여기에 상세 설명까지 열어요. 선지별 설명이 작성된 문항은 헷갈린 표현의 교정과 핵심 암기 문장도 볼 수 있어요.','답 설명 취소선'],
    ['문제풀이','풀이 상태의 빈칸, ○, △, ×는 무엇인가요?','빈칸은 <b>미풀이</b>, ○는 정답, △는 세모, ×는 오답이에요. 상태 칸을 누를 때마다 이 순서로 바뀌어요. 직접 정할 수 있고, 다시 풀어 채점하면 최근 풀이 결과가 반영돼요.','미풀이 상태 동그라미 세모 네모'],
    ['복습','틀린 문제나 헷갈린 문제만 다시 풀고 싶어요.','문제 화면에서 <b>상단 설정 → 문항 필터</b>를 열고 × 또는 △를 선택하세요. 연도·강의·출제교수도 함께 좁힐 수 있어요. 빈 네모 필터는 아직 풀지 않은 문항을 모아줘요.','오답 세모 미풀이 필터 교수'],
    ['복습','다시 볼 문제를 따로 모으고 싶어요.','문항의 <b>별표</b>를 눌러 즐겨찾기에 담으세요. 문항 필터의 별표로 즐겨찾기 문제만 볼 수 있고, 홈의 <b>즐겨찾기</b>에서도 모아볼 수 있어요. 문서도 별표로 저장할 수 있어요.','북마크 별 즐겨찾기'],
    ['문제풀이','랜덤으로 풀다가 강의를 추가해도 되나요?','네. <b>이미 본 문항의 순서는 유지</b>하고, 아직 보지 않은 문항들에 새로 추가한 문항이 섞여요. 필터를 바꿔도 방금까지 보던 흐름을 이어가도록 되어 있어요.','문항 순서 랜덤 무작위 정렬'],
    ['문제풀이','고유번호와 기본 정렬은 어떻게 읽나요?','<b>25001</b>은 2025년 1번이에요. <b>23오09</b>는 2023년 오답30 자료의 아홉 번째 문항이에요. 기본은 최근 연도부터, 같은 연도 안에서는 문항번호 순서예요.','ID 번호 2025 2023 순서 연도'],
    ['문제풀이','발문 옆 GPT 로고는 무엇인가요?','복원 정보를 보강한 문항이에요. 처음에는 <b>보강 문항</b>이 보이고, 로고를 누르면 같은 자리에서 <b>원복원문</b>으로 바뀌어요. 원문을 보는 동안은 로고가 흐려져요. 다시 누르면 보강 문항으로 돌아와요.','원본 원문 추정 지피티'],
    ['문제풀이','밀기와 두 번 누르기는 어디에서 쓰나요?','문제 영역을 <b>왼쪽으로 밀면 다음, 오른쪽으로 밀면 이전</b> 문제예요. 선지 위에서도 밀 수 있어요. <b>여백을 두 번 누르면 해설을 열고 닫고</b>, 한 번 누르면 선택 표시를 지워요. 사진·링크·버튼은 각자의 기능을 유지해요. 설정의 제스처 버튼으로 켜고 끌 수 있어요.','제스처 스와이프 더블클릭 터치'],
    ['설정','상단 설정은 어떻게 여나요?','오른쪽 위 <b>설정 아이콘</b>을 누르거나 상단 바를 아래로 당기세요. 화면 모드·글꼴·제스처·문항 필터·빠른 모드·타이머를 조정할 수 있어요. 위쪽 손잡이를 누르거나 위로 밀면 닫혀요.','슬라이드 바 메뉴 열기 닫기'],
    ['설정','빠른 모드는 어떻게 쓰나요?','문제 화면에서 <b>상단 설정 → 빠른 모드</b>를 켜면 시간 설정이 나타나요. 선지를 고르면 <b>정답은 0.5초, 오답은 1초</b> 뒤 다음 문항으로 넘어가요. 제한 시간이 끝나도 답을 보여준 뒤 넘어가요. ±로 시간을 바꾸고 <b>∞</b>를 누르면 제한 시간 없이 쓸 수 있어요.','자동 다음 카운트 초 제한시간'],
    ['설정','공부 시간을 정해두고 싶어요.','상단 설정의 <b>타이머</b>에 이름과 분 단위 시간을 넣고 시작하세요. 상단 바에 남은 분과 진행선이 보여요. 시간이 다 되면 타이머 글자가 깜빡여요. 문항별 제한 시간은 빠른 모드에서 따로 설정해요.','시간 이름 분 시계 집중'],
    ['설정','글씨가 작거나 글꼴을 바꾸고 싶어요.','상단 설정의 <b>글꼴 변경</b>에서 시스템 UI, Wiki·발문·선지 등 본문, 선지 아래 학습 문장의 글꼴과 크기를 각각 조정할 수 있어요. 화면 모드 버튼으로 밝은 화면과 어두운 화면도 바꿔보세요.','폰트 크기 다크 화면 모드'],
    ['문제풀이','사진을 더 크게 보고 싶어요.','문항 사진을 누르면 확대해서 볼 수 있어요. 확대 창을 닫으면 문제로 돌아와요. Wiki 사진에 <b>표시하기</b> 버튼이 있다면 그림 위 표시를 켜고 끌 수 있어요.','이미지 확대 그림'],
    ['Wiki','개념이나 문항을 바로 찾고 싶어요.','오른쪽 위 <b>돋보기</b>에서 개념, 강의명, 문항 고유번호를 검색해보세요. 검색 결과의 링크로 원하는 위치에 이동할 수 있어요.','검색 찾기 돋보기'],
    ['설정','다른 기기에서도 풀이 기록이 이어지나요?','풀이 상태와 개인 설정은 <b>현재 브라우저에 저장</b>돼요. 다른 기기나 다른 브라우저에는 자동으로 연결되지 않아요. 같은 브라우저에서 이어 공부하면 기록을 유지할 수 있어요.','저장 기기 동기화 기록 백업']
  ];
  function renderFind(){body.innerHTML=`<div class="t-lead"><h3>무엇을 하고 싶으세요?</h3><p>기능 이름을 몰라도 괜찮아요. ‘틀린 문제’, ‘글씨’처럼 검색해보세요.</p></div><div class="t-search-wrap">${icon('search')}<input class="t-search" type="search" aria-label="사용법 검색" placeholder="예: 틀린 문제, 랜덤, 글씨" autocomplete="off"></div><div class="t-filter" data-t-categories>${['전체','Wiki','문제풀이','복습','설정'].map(c=>`<button class="t-button" data-t="category" data-category="${c}" aria-pressed="${faqCategory===c}">${c}</button>`).join('')}</div><div class="t-faq-count" role="status"></div><div class="t-faq"></div>`;renderFaq();}
  function renderFaq(){const query=(body.querySelector('.t-search').value||'').toLowerCase().trim(),matches=faqs.filter(f=>(faqCategory==='전체'||f[0]===faqCategory)&&query.split(/\s+/).every(q=>f.join(' ').toLowerCase().includes(q)));body.querySelector('.t-faq-count').textContent=`${matches.length}개의 사용법`;body.querySelector('.t-faq').innerHTML=matches.length?matches.map(f=>`<details><summary>${f[1]}</summary><div>${f[2]}</div></details>`).join(''):'<div class="t-empty">찾는 내용이 없어요.<br>단어를 짧게 바꾸거나 ‘전체’를 선택해보세요.</div>';}
  function renderFinish(){
    const quickIcon='<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m13 2-9 12h7l-1 8L20 9h-7l1-7Z"/></svg>';
    const timerIcon='<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="14" r="8"/><path d="M9 2h6m-3 0v4m6 1 2 2m-8 1v5l3 2"/></svg>';
    body.innerHTML=`<div class="t-extras-intro"><span class="t-complete-label">${icon('check')} 연습 마무리</span><h3>이런 기능도 있어요</h3><p>공부하는 방식에 맞춰 골라 써보세요.<br>모두 <b>오른쪽 위 설정</b>에서 찾을 수 있어요.</p></div>
      <div class="t-extras-grid">
        <article class="t-extra-card"><div class="t-extra-title"><span class="t-extra-icon">${quickIcon}</span><div><h4>빠른 모드</h4><small>문제를 쭉 이어서 풀고 싶을 때</small></div></div><p>선지를 고르면 <b>자동으로 다음 문항</b>으로 넘어가요.</p><div class="t-extra-detail">정답은 <b>0.5초</b>, 오답은 <b>1초</b> 뒤 이동<br>문항별 제한 시간 조절 · <b>∞</b>로 제한 끄기</div><span class="t-extra-location">문제 화면 → 설정 → 빠른 모드</span></article>
        <article class="t-extra-card"><div class="t-extra-title"><span class="t-extra-icon">${timerIcon}</span><div><h4>타이머</h4><small>공부할 시간을 정해두고 싶을 때</small></div></div><p><b>이름과 시간</b>을 입력하고 시작하면 상단 바에 남은 시간이 보여요.</p><div class="t-extra-detail">진행선으로 흐른 시간 확인<br>시간이 끝나면 타이머 글자가 깜빡여요.</div><span class="t-extra-location">설정 → 타이머 → 시작</span></article>
        <article class="t-extra-card"><div class="t-extra-title"><span class="t-extra-icon t-extra-font" aria-hidden="true">Aa</span><div><h4>글꼴 변경</h4><small>내 눈에 편하게 읽고 싶을 때</small></div></div><p><b>글꼴과 글자 크기</b>를 영역별로 따로 맞출 수 있어요.</p><div class="t-extra-detail">메뉴 등 시스템 글씨<br>Wiki·발문·선지 본문 · 선지 아래 해설</div><span class="t-extra-location">설정 → 글꼴 변경</span></article>
      </div><p class="t-record-note">더 자세한 사용법은 ‘기능 찾아보기’에서 언제든 확인할 수 있어요.</p><div class="t-extras-links"><button class="t-text-button" data-t="find">기능 찾아보기</button><button class="t-text-button" data-t="${mode==='finish-gesture'?'basic':'gesture'}">${mode==='finish-gesture'?'기본 사용 연습':'제스처 연습'}</button></div>`;
    foot.hidden=false;foot.innerHTML=`<button class="t-button" data-t="hub">사용법 목록</button><button class="t-button t-primary" data-t="close">홈으로 돌아가기 ${icon('arrow')}</button>`;
  }
  function advance(){const count=mode==='basic'?basic.length:gestures.length;if(step<count-1){step++;resetStep();render();}else{mode=mode==='basic'?'finish-basic':'finish-gesture';render();}body.querySelector('button')?.focus({preventScroll:true});}
  dialog.addEventListener('input',e=>{if(e.target.matches('.t-search'))renderFaq();});
  dialog.addEventListener('click',e=>{
    const button=e.target.closest('[data-t]');if(!button||button.disabled)return;const action=button.dataset.t;
    if(action==='close'){close();return;}if(action==='hub'){mode='hub';render();return;}if(['basic','gesture','find'].includes(action)){enter(action);return;}
    if(action==='next'||action==='skip'){advance();return;}if(action==='previous'){step=Math.max(0,step-1);resetStep();render();return;}
    if(action==='lecture'){body.querySelector('[data-t-lecture-detail]').hidden=false;feedback('강의를 열었어요. Wiki → J → JBL, 이 세 가지만 기억하면 돼요.',true);}
    if(action==='wiki-link'){body.querySelector('[data-t-linked]').innerHTML='<small>연결 문항 · 연습 01</small><h4 style="margin-top:12px">심박수 70회/분, 1회 박출량 70 mL일 때 심박출량은?</h4><p>Wiki를 보던 위치는 그대로예요.</p>';feedback('문제가 옆에 열렸어요. 다음 단계에서 풀어볼게요.',true);}
    if(action==='choice'){selected=Number(button.dataset.choice);revealed=true;renderQuestion();feedback(explained?'정답과 상세 해설을 모두 확인했어요.':'답을 확인했어요. 이제 해설 보기를 눌러보세요.',explained);}
    if(action==='answer'){revealed=true;renderQuestion();feedback('정답 선지 아래에서 공식을 볼 수 있어요. 선지도 직접 고르고 해설을 열어보세요.');}
    if(action==='explanation'){explained=!explained;revealed=true;renderQuestion();feedback(selected!==null?'선지 아래 공식과 자세한 해설을 함께 확인할 수 있어요.':'해설을 열었어요. 선지도 한 번 골라보세요.',selected!==null);}
    if(action==='status'){status=(status+1)%4;statusTried=true;button.textContent=['','○','△','×'][status];button.setAttribute('aria-label',`풀이 상태: ${['미풀이','정답','세모','오답'][status]}. 누르면 ${['정답','세모','오답','미풀이'][status]}`);button.setAttribute('aria-pressed',String(status!==0));feedback('한 번 누를 때마다 빈칸 → ○ → △ → × 순서로 바뀌어요.',statusTried&&starTried);}
    if(action==='star'){star=!star;starTried=true;button.setAttribute('aria-pressed',String(star));button.querySelector('svg').setAttribute('fill',star?'currentColor':'none');feedback(star?'즐겨찾기에 담았어요. 상태 칸도 눌러보세요.':'별표를 다시 누르면 즐겨찾기에서 빠져요.',statusTried&&starTried);}
    if(action==='filter'){filter=button.dataset.filter;body.querySelectorAll('[data-t="filter"]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));renderResults();feedback(filter==='wrong'?'틀린 문제 한 개만 남았어요. 실제 화면에서도 같은 방식으로 좁힐 수 있어요.':'이번에는 × 오답을 골라보세요.',filter==='wrong');}
    if(action==='jbl-next'){jblNext=true;body.querySelector('[data-t-jbl]').innerHTML='<small>관련 문제 · 연습 01</small><h4 style="margin-top:12px">심박수 70회/분, 1회 박출량 70 mL일 때 심박출량은?</h4><div class="t-concept"><p>방금 본 <b>CO = HR × SV</b>를 떠올려보세요.</p></div><p>이렇게 핵심 개념과 관련 문항이 이어져요.</p>';feedback('Wiki로 이해하고, J로 풀고, JBL로 짧게 반복하면 돼요.',true);}
    if(action==='gesture-example')gestureAction(['left','right','double','double','single'][step],true);
    if(action==='category'){faqCategory=button.dataset.category;body.querySelectorAll('[data-t="category"]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));renderFaq();}
  });
})();
