/* Lecture 22–23 learning diagrams. ECG photographs use the shared original-image gallery. */
(function(){
  'use strict';
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const buttons=(items,attr='data-tachy-state',active=0)=>items.map((s,i)=>`<button type="button" ${attr}="${i}" aria-pressed="${i===active}">${esc(s.label||s)}</button>`).join('');
  const maps={
    map22:{title:'22강 · 신호의 출발점과 회로',root:'조기박동 → 상심실성 빈맥 → 심방 리듬',items:[
      {label:'PAC · PVC',path:'한 박동이 먼저 나온다',text:'심방에서 먼저 나온 P′인지, 심실에서 먼저 나온 넓은 QRS인지 구분한다. 다음에는 증상·급사 가족력·심장 구조를 본다.',link:'[[22강#한 박동이 먼저 나왔다 · PAC와 PVC|조기박동으로 이어 보기]]'},
      {label:'AVNRT · AVRT',path:'AV node를 포함한 회귀',text:'갑자기 시작하는 규칙적 빈맥. 회로의 필수 길인 AV node를 잠깐 막으면 종료될 수 있다. 절제 표적은 slow pathway와 부전도로다.',link:'[[22강#PSVT · AV node가 회로 안에 있다|PSVT로 이어 보기]]'},
      {label:'WPW + AF',path:'부전도로로 빠르게 내려간다',text:'평소 짧은 PR·델타파를 확인하고 발작 중 불규칙하고 넓은 QRS를 읽는다. AF가 부전도로를 타면 AV node 차단제 선택이 달라진다.',link:'[[22강#WPW · 평소의 델타파와 발작 때의 리듬|WPW 비교로 이어 보기]]'},
      {label:'AT',path:'심방의 다른 지점에서 계속 발화',text:'동성 P와 다른 심방파를 찾는다. 긴 RP와 P–QRS 관계를 살피고, 방실전도가 줄어도 심방 빈맥은 계속될 수 있다는 점을 연결한다.',link:'[[22강#심방에서 계속 나온다 · AT와 좁은 QRS 감별|심방빈맥으로 이어 보기]]'},
      {label:'AF · AFL',path:'심방의 무질서 / 큰 회귀회로',text:'AF는 일정한 P 없이 불규칙한 RR, AFL은 반복되는 F파다. 진단 뒤에는 CARE: 위험요인·항응고·증상 조절·재평가를 함께 관리한다.',link:'[[22강#심방세동 · 리듬을 찾고 환자를 본다|심방세동으로 이어 보기]]'}]},
    map23:{title:'23강 · 빈맥과 실신의 위험 지도',root:'위험 리듬 → 급사 예방 → 실신 원인 찾기',items:[
      {label:'VT · VF',path:'심실 기원 · 맥박과 안정성',text:'넓은 QRS 빈맥에서 맥박·혈압·의식을 확인한다. 맥박이 있는 불안정 단형 VT와 무맥성 VT·VF의 전기치료를 구분한다.',link:'[[23강#넓고 빠른 QRS · VT와 VF|VT·VF로 이어 보기]]'},
      {label:'TdP',path:'다형 VT 중 QT가 긴 경우',text:'발작 전 long QT, short–long–short, R-on-T를 묶는다. 지속성 다형 VT의 전기충격과 반복 TdP의 Mg·원인 교정을 연결한다.',link:'[[23강#QT가 긴 다형 VT · TdP|TdP로 이어 보기]]'},
      {label:'Long QT · Brugada',path:'심장 이온통로 이상',text:'구조가 정상이어도 전기적 위험이 있다. QTc·유전자와 V1·V2의 coved ST를 각각 구분하고 실신·급사 가족력을 함께 본다.',link:'[[23강#구조가 정상이어도 급사할 수 있다 · 유전성 전기질환|유전성 전기질환으로 이어 보기]]'},
      {label:'SCD · ICD',path:'소생과 재발 예방',text:'현재 심정지에는 신고·CPR·AED. 소생 뒤에는 원인과 재발 위험을 살펴 ICD의 일차·이차 예방을 결정한다.',link:'[[23강#돌연심장사와 ICD · 지금 살리고, 다음을 막기|급사 예방으로 이어 보기]]'},
      {label:'실신 · Tilt · ILR',path:'저관류의 원인과 위험도',text:'병력·기립 혈압·12유도 ECG로 위험도를 나눈다. Tilt는 자세에 따른 혈압·맥박 반응, ILR은 드문 실신 순간의 리듬을 보여 준다.',link:'[[23강#실신 · 병력으로 시작해 위험도를 가르기|실신으로 이어 보기]]'}]}
  };
  function mapMarkup(id,course){const m=maps[id];return `<section class="ecg-learning tachy-learning tachy-map" data-tachy-map="${id}"><div class="ecg-heading"><strong>${m.title}</strong><span>눌러서 위치 확인</span></div><p class="tachy-route">${m.root}</p><div class="tachy-map-nodes" role="group" aria-label="${m.title}">${m.items.map((x,i)=>`<button type="button" data-tachy-map-state="${i}" aria-pressed="${i===0}"><span>${String(i+1).padStart(2,'0')}</span><strong>${x.label}</strong></button>`).join('')}</div><div class="tachy-map-copy" aria-live="polite">${mapCopy(m.items[0],course)}</div></section>`;}
  function mapCopy(x,course){return `<div class="tachy-location">지금 위치 · ${esc(x.path)}</div><p>${esc(x.text)}</p><div class="tachy-jump">${typeof renderWikiInline==='function'?renderWikiInline(x.link,course,null):''}</div>`;}
  const reentryStates=[
    {label:'정상 전달',head:'빠른 길은 먼저 도착하고 오래 쉰다',text:'Fast pathway는 빠르게 전도하지만 불응기가 길다. Slow pathway는 느리게 전도하지만 불응기가 짧다. 정상 박동에서는 회전하는 회로가 이어지지 않는다.'},
    {label:'조기박동 진입',head:'Fast가 쉬는 동안 Slow로 내려간다',text:'조기 심방 신호가 오면 fast pathway는 아직 불응기여서 막힌다. 먼저 회복한 slow pathway를 따라 신호가 천천히 내려간다.'},
    {label:'회귀 지속',head:'내려가는 동안 Fast가 회복된다',text:'Slow pathway로 내려간 신호가 아래에서 돌아, 이제 회복한 fast pathway를 역방향으로 올라간다. 다시 slow로 내려갈 수 있으면 회귀가 반복된다.'},
    {label:'회로 끊기',head:'필수 경로를 막으면 회전이 끝난다',text:'AV node 전도를 잠깐 억제하거나, AVNRT의 slow pathway를 절제하면 필수 회로가 이어지지 않는다. AVRT의 절제 표적은 부전도로다.'}
  ];
  function reentry(i){
    const fast='M210 55C105 55 105 115 105 165V205C105 260 150 270 210 270';
    const slow='M210 55C315 55 315 115 315 165V205C315 260 270 270 210 270';
    return `<svg viewBox="0 0 420 340" role="img" aria-label="${esc(reentryStates[i].head)}"><path class="tachy-wire" d="M210 25V55 M210 270V308 ${fast} ${slow}"/><path class="tachy-active" d="${i===0?fast:i===1?slow:i===2?fast+' '+slow:''}"/>
      <text x="210" y="20" text-anchor="middle">심방 신호</text><text x="210" y="334" text-anchor="middle">아래쪽 전도</text><text x="100" y="145" text-anchor="middle">Fast</text><text x="320" y="145" text-anchor="middle">Slow</text>
      ${i===0?'<path class="tachy-arrow" d="M90 184l15 17 15-17"/>':i===1?'<path class="tachy-stop" d="M93 175l24 24m-24 0l24-24"/><path class="tachy-arrow" d="M300 184l15 17 15-17"/>':i===2?'<path class="tachy-arrow" d="M300 184l15 17 15-17 M90 201l15-17 15 17"/>':'<path class="tachy-stop" d="M298 174l34 34m-34 0l34-34"/>'}
      </svg><div class="ecg-copy"><strong>${reentryStates[i].head}</strong><p>${reentryStates[i].text}</p></div>`;
  }
  const careStates=[
    {label:'C · 위험요인',head:'Comorbidity & risk factors',text:'혈압·심부전·당뇨·비만·수면무호흡을 관리하고, 운동과 음주를 조정한다. AF가 반복될 바탕을 함께 줄인다.',flow:['혈압·체중','동반 질환','운동·음주']},
    {label:'A · 뇌졸중 예방',head:'Avoid stroke & thromboembolism',text:'혈전색전 위험을 계산해 항응고를 결정한다. 일반적인 AF에서는 DOAC를 연결하고, 기계판막·중등도 이상 승모판협착은 별도로 구분한다.',flow:['위험인자 점수','항응고 선택','출혈 위험 교정']},
    {label:'R · 증상 조절',head:'Reduce symptoms',text:'심실 박동수를 낮추는 rate control과 동율동을 회복·유지하는 rhythm control을 구분한다. 증상·박출률·AF 경과를 함께 본다.',flow:['심박수','리듬 회복','약물·절제술']},
    {label:'E · 재평가',head:'Evaluation & reassessment',text:'나이와 동반 질환, 증상과 치료 반응은 달라진다. 처음 진단 후 약 6개월, 이후 적어도 매년을 기본으로 개인에 맞춰 재평가한다.',flow:['위험도 변화','치료 반응','다시 CARE']}
  ];
  const triageStates=[
    {label:'맥박 + 불안정 단형 VT',head:'R파에 맞추는 동기화 전환',text:'맥박은 있지만 저혈압·쇼크·의식 변화·허혈성 흉통·급성 심부전이 있으면 동기화 전기율동전환을 연결한다.',flow:['맥박 있음','단형 VT','동기화 전환']},
    {label:'지속성 다형 VT',head:'비동기화 충격',text:'모양이 계속 바뀌어 안정적으로 R파에 맞추기 어렵다. 지속성 다형 VT는 즉시 비동기화 전기충격으로 연결한다. Long-QT TdP의 반복에는 Mg와 원인 교정을 더한다.',flow:['다형 파형','동기화 어려움','비동기화 충격']},
    {label:'무맥성 VT · VF',head:'CPR + 제세동',text:'반응·호흡·맥박을 확인하고 심정지 처치를 시작한다. 신고와 CPR, 빠른 제세동을 연결하고 가역적 원인을 찾는다.',flow:['맥박 없음','CPR','제세동']}
  ];
  const syncopeStates=[
    {label:'반사성',head:'혈관 확장·심박수 감소',text:'오래 서기·더위·통증·감정 자극, 오심·식은땀·창백함. 전형적 상황과 전구증상을 찾고 위험한 심장 단서가 없는지 확인한다.',flow:['유발 상황','반사 반응','혈압·맥박 저하']},
    {label:'기립성',head:'일어설 때 혈압을 유지하지 못한다',text:'자세 변화 시점과 혈압 변화를 맞춘다. 체액 감소·약물·자율신경 기능 저하를 평가한다. 뚜렷한 혈압 저하 없이 빈맥이 중심인 POTS와 구분한다.',flow:['기립','보상 부족','혈압 하강']},
    {label:'심장성',head:'부정맥·구조적 원인을 먼저 평가',text:'운동 중·누운 자세에서 실신, 갑작스러운 두근거림, 구조적 심질환·급사 가족력·비정상 ECG가 단서다. 원인과 급사 위험을 신속하게 평가한다.',flow:['심장 단서','ECG·심장 평가','원인 치료']}
  ];
  function cards(states,i){const s=states[i];return `<div class="tachy-sequence">${s.flow.map((x,n)=>`<div><small>${n+1}</small><strong>${x}</strong></div>`).join('')}</div><div class="ecg-copy"><strong>${s.head}</strong><p>${s.text}</p></div>`;}
  const tiltStates=[
    {label:'정상',head:'기립 뒤에도 혈압을 유지한다',text:'기울인 직후 심박수가 조금 증가한다. 보상이 유지되어 큰 혈압 하강이나 실신이 생기지 않는다.',hr:'M50 80H128Q145 80 153 70H522',bp:'M50 175H128Q145 175 153 170H522'},
    {label:'혈관억제형',head:'혈압이 떨어져도 맥박 감소는 두드러지지 않는다',text:'실신 무렵 혈압이 크게 낮아진다. 심박수는 비교적 유지되거나 증가한 상태다. 다시 눕히면 혈압이 회복된다.',hr:'M50 80H128Q145 80 153 65L360 60H522',bp:'M50 175H128Q145 175 153 170H300C355 170 368 196 405 235Q420 177 452 172H522'},
    {label:'심장억제형',head:'맥박 감소·긴 휴지기가 두드러진다',text:'현저한 서맥이나 심정지가 저관류에 크게 기여하는 반응이다. 실제 판정은 심박수·정지 시간과 혈압 하강 순서를 함께 본다.',hr:'M50 80H128Q145 80 153 65H350Q382 65 405 123Q421 65 452 65H522',bp:'M50 175H128Q145 175 153 170H350Q382 170 405 226Q420 177 452 172H522'},
    {label:'혼합형',head:'혈압과 심박수가 함께 감소한다',text:'혈관 확장과 심장억제 반응이 함께 나타난다. BP 하강과 HR 하강을 증상 시점에 맞춰 읽고, 다시 눕힌 뒤 회복도 확인한다.',hr:'M50 80H128Q145 80 153 65H350Q380 65 405 106Q421 65 452 65H522',bp:'M50 175H128Q145 175 153 170H300C355 170 368 196 405 235Q420 177 452 172H522'}
  ];
  function tilt(i){const s=tiltStates[i];return `<svg viewBox="0 0 565 285" role="img" aria-label="${esc(s.head)} · 위 심박수, 아래 혈압"><path class="ecg-grid" d="M45 40V130H535 M45 150V245H535"/><path class="tachy-guide" d="M140 35V245 M405 35V245"/><text x="70" y="30">HR · 심박수</text><text x="70" y="155">BP · 혈압</text><text x="140" y="275" text-anchor="middle">Tilt up</text><text x="405" y="275" text-anchor="middle">${i?'실신 · Tilt down':'관찰'}</text><path class="tachy-hr" d="${s.hr}"/><path class="tachy-bp" d="${s.bp}"/></svg><div class="ecg-copy"><strong>${s.head}</strong><p>${s.text}</p></div>`;}
  const labs={
    reentry:{title:'회귀회로 · 한 신호를 끝까지 따라가기',states:reentryStates,draw:reentry,note:'전도 원리를 설명하는 AVNRT 개념도 · 실제 해부학적 크기·전도 시간은 반영하지 않았습니다.'},
    care:{title:'AF-CARE · 같은 환자를 네 방향에서',states:careStates,draw:i=>cards(careStates,i)},
    triage:{title:'전기치료 · 맥박과 파형을 먼저 확인',states:triageStates,draw:i=>cards(triageStates,i)},
    syncope:{title:'실신의 큰 분류',states:syncopeStates,draw:i=>cards(syncopeStates,i)},
    tilt:{title:'기립 반응 · 정상과 세 가지 반사 비교',states:tiltStates,draw:tilt,note:'원리 비교용 개념도 · 실선은 HR, 점선은 BP. 실제 수치·진단은 아래 강의 원본과 임상 맥락에서 확인합니다.'}
  };
  let scoreSerial=0;
  const risks=[['hf','심부전·좌심실 기능 저하',1],['htn','고혈압',1],['dm','당뇨병',1],['stroke','과거 뇌졸중·TIA·혈전색전',2],['vascular','혈관질환',1]];
  function scoreValues(state){const age=Number(state.age)||0;let va=age;risks.forEach(([key,,weight])=>{if(state[key])va+=weight;});return {va,vasc:va+(state.female?1:0)};}
  function scoreCopy(state){const {va,vasc}=scoreValues(state);const threshold=state.female?3:2;const old=vasc>=threshold?'항응고 권고':vasc===threshold-1?'항응고 고려':'저위험';const current=va>=2?'항응고 권고':va===1?'항응고 고려':'저위험';return `<div class="tachy-score-results"><div><span>기존 · CHA₂DS₂-VASc</span><strong>${vasc}<small>점</small></strong><p>${old}</p></div><div><span>올해 · CHA₂DS₂-VA</span><strong>${va}<small>점</small></strong><p>${current}</p></div></div><p class="ecg-note">나이 점수 ${Number(state.age)||0}점${state.female?' · 여성 1점은 VASc에만 포함':' · 성별 추가 점수 없음'}. 점수 기준을 비교하는 연습입니다. 기계판막·중등도 이상 승모판협착, HCM·심장 아밀로이드증 등은 별도의 항응고 기준을 함께 봅니다.</p>`;}
  function scoreMarkup(){const id=++scoreSerial;return `<section class="ecg-learning tachy-learning" data-tachy-score><div class="ecg-heading"><strong>항목을 바꿔 두 점수를 비교해 보기</strong><span>학습용 점수 연습</span></div><div class="ecg-buttons" role="group" aria-label="점수 연습 예시">${buttons(['초기화','50세 · 고혈압·당뇨','76세 여성 · 고혈압·당뇨'],'data-tachy-preset')}</div><div class="tachy-score-fields"><label class="tachy-age" for="tachy-age-${id}">나이<select id="tachy-age-${id}" data-tachy-age><option value="0">65세 미만 · 0점</option><option value="1">65–74세 · 1점</option><option value="2">75세 이상 · 2점</option></select></label><label><input type="checkbox" data-tachy-risk="female"><span>여성 <small>VASc +1</small></span></label>${risks.map(([key,label,weight])=>`<label><input type="checkbox" data-tachy-risk="${key}"><span>${label} <small>+${weight}</small></span></label>`).join('')}</div><div data-tachy-score-result aria-live="polite">${scoreCopy({age:0})}</div></section>`;}
  function readScore(block){const s={age:Number(block.querySelector('[data-tachy-age]').value)};block.querySelectorAll('[data-tachy-risk]').forEach(input=>s[input.dataset.tachyRisk]=input.checked);return s;}
  window.renderTachyLearningBlock=function(line,course){if(!line.startsWith('@tachy '))return '';const id=line.slice(7).trim();if(maps[id])return mapMarkup(id,course);if(id==='score')return scoreMarkup();const l=labs[id];if(!l)return '';return `<section class="ecg-learning tachy-learning" data-tachy-lab="${id}"><div class="ecg-heading"><strong>${l.title}</strong><span>눌러서 비교</span></div><div class="ecg-buttons" role="group" aria-label="${l.title}">${buttons(l.states)}</div><div class="tachy-lab-content" aria-live="polite">${l.draw(0)}</div>${l.note?`<p class="ecg-note">${l.note}</p>`:''}</section>`;};
  window.bindTachyLearning=function(container,course){
    container.querySelectorAll('[data-tachy-map]:not([data-tachy-bound])').forEach(block=>{block.dataset.tachyBound='1';block.addEventListener('click',e=>{const b=e.target.closest('[data-tachy-map-state]');if(!b)return;block.querySelectorAll('[data-tachy-map-state]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));block.querySelector('.tachy-map-copy').innerHTML=mapCopy(maps[block.dataset.tachyMap].items[Number(b.dataset.tachyMapState)],course);});});
    container.querySelectorAll('[data-tachy-lab]:not([data-tachy-bound])').forEach(block=>{block.dataset.tachyBound='1';block.addEventListener('click',e=>{const b=e.target.closest('[data-tachy-state]');if(!b)return;block.querySelectorAll('[data-tachy-state]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));block.querySelector('.tachy-lab-content').innerHTML=labs[block.dataset.tachyLab].draw(Number(b.dataset.tachyState));});});
    container.querySelectorAll('[data-tachy-score]:not([data-tachy-bound])').forEach(block=>{block.dataset.tachyBound='1';const update=()=>{block.querySelector('[data-tachy-score-result]').innerHTML=scoreCopy(readScore(block));};block.addEventListener('change',()=>{block.querySelectorAll('[data-tachy-preset]').forEach(b=>b.setAttribute('aria-pressed','false'));update();});block.addEventListener('click',e=>{const b=e.target.closest('[data-tachy-preset]');if(!b)return;const i=Number(b.dataset.tachyPreset);block.querySelector('[data-tachy-age]').value=i===2?'2':'0';block.querySelectorAll('[data-tachy-risk]').forEach(input=>input.checked=(i>0&&['htn','dm'].includes(input.dataset.tachyRisk))||(i===2&&input.dataset.tachyRisk==='female'));block.querySelectorAll('[data-tachy-preset]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));update();});});
  };
})();
