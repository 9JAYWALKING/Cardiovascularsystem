/* Lecture 13: preserve one-page-map positions; diagrams are qualitative. */
const arrhythmiaMapRegions=[
 {label:'4 · 부정맥 기초',heading:'PR·QRS·QT를 먼저 세 칸에 놓기',text:'네 번째 열 위 · 전류·channel 상태 → 후탈분극·회귀 → 약의 선택성',rect:[50.5,7.4,15.7,54]},
 {label:'5 · Class I',heading:'IA는 길게, IB는 짧게, IC는 전도를 강하게',text:'다섯 번째 열 위 · IA → IB → IC · Na channel 차단',rect:[66.8,7.4,15.7,72.3]},
 {label:'6 · Class II',heading:'Propranolol은 MI 뒤 재발 예방, Esmolol은 짧게',text:'다섯 번째 열 아래 · β 차단 · Propranolol·Esmolol',rect:[66.8,80.7,15.7,16.2]},
 {label:'7 · Class III',heading:'Phase 3·APD·ERP·QT를 한 줄로',text:'맨 오른쪽 위 · K 차단 → Amiodarone → Sotalol → Dofetilide·Ibutilide',rect:[83,7.4,16,46.3]},
 {label:'8 · Class IV',heading:'Verapamil·Diltiazem은 심장 쪽 NDHP',text:'맨 오른쪽 가운데 · Ca 차단 · Verapamil·Diltiazem',rect:[83,54.7,16,19]},
 {label:'9 · 기타',heading:'Adenosine은 아주 짧게 AV node를 멈춘다',text:'맨 오른쪽 아래 · Adenosine → Mg²⁺·K⁺',rect:[83,74.7,16,22.2]}
];
const arrhythmiaClasses=[
 {name:'IA',drugs:'Quinidine · Procainamide · Disopyramide',path:'M12 140 L48 140 L66 35 Q80 66 96 52 Q155 40 202 73 Q220 90 231 140 L278 140',facts:[['Na 차단·전도','중간 정도 · Phase 0 기울기↓'],['APD·ERP','연장 ↑'],['심전도','QRS↑ · QT↑'],['독성 한 칸','QT·TdP / 약마다 특징적 독성']],memory:'IA → Na 차단 + 재분극 지연 → APD·ERP·QT↑'},
 {name:'IB',drugs:'Lidocaine · Mexiletine',path:'M12 140 L48 140 L57 24 Q67 65 81 55 Q110 54 129 94 Q141 120 149 140 L278 140',facts:[['Na 차단·전도','빠른 결합·해리 · 정상 전도 영향 작음'],['APD·ERP','강의 비교표에서 단축 ↓'],['심전도','QT 연장 약으로 분류하지 않음'],['선택성','허혈성 심실 · Inactivated Na channel']],memory:'IB → Lidocaine IV · Mexiletine 경구 → 허혈성 심실'},
 {name:'IC',drugs:'Flecainide · Propafenone · Moricizine',path:'M12 140 L48 140 L84 35 Q95 65 112 53 Q153 42 178 77 Q193 99 201 140 L278 140',facts:[['Na 차단·전도','강한 억제 · 느린 회복'],['APD','변화 작음 ≈'],['심전도','QRS↑ · QT 연장은 주된 특징이 아님'],['기억할 조건','구조적 심질환·MI에서 주의/회피']],memory:'IC → 전도 억제를 강하게 · APD 변화는 작게'}
];
let arrhythmiaBlockSerial=0;
function arrhythmiaClassPanel(i){
 const s=arrhythmiaClasses[i];
 return `<h4>Class ${s.name} · ${s.drugs}</h4><div class="arr-compare"><div class="arr-wave"><svg viewBox="0 0 290 160" role="img" aria-label="Class ${s.name}의 활동전위 개념 비교. ${s.facts[0][1]}. ${s.facts[1][1]}"><path class="arr-axis" d="M12 10V145H280"/><path class="arr-baseline" d="M12 140 L48 140 L57 24 Q67 65 81 55 Q142 40 174 74 Q190 95 201 140 L278 140"/><path class="arr-selected" d="${s.path}"/></svg><p class="pharm-map-help">회색 점선: 기본 파형 · 와인색: 선택한 Class<br>시간·전압의 실측값을 나타내지 않는 개념도</p></div><dl>${s.facts.map(([k,v])=>`<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></div><p class="arr-memory">${s.memory}</p>`;
}
function renderArrhythmiaLearningBlock(line,course,footnotes){
 const inline=t=>renderWikiInline(t,course,footnotes);
 if(line==='@arrmap'){
  const id=`arr-map-${++arrhythmiaBlockSerial}`;
  return `<div class="pharm-map arr-map" data-arr-map><div class="pharm-map-label">한장정리 · 13강은 오른쪽 세 열</div><div class="pharm-map-buttons" role="group" aria-label="13강 한장정리 위치">${arrhythmiaMapRegions.map((r,i)=>`<button type="button" data-arr-region="${i}" aria-pressed="${!i}" aria-controls="${id}-${i}">${r.label}</button>`).join('')}</div><div class="pharm-map-preview"><img src="./assets/lecture-08/failure-arrhythmia-map.webp" width="4200" height="2972" data-note-image alt="심부전·항부정맥제 한장지도 원본 · 4–9는 오른쪽 세 열"><span class="pharm-map-focus" aria-hidden="true" style="left:50.5%;top:7.4%;width:15.7%;height:54%"></span></div><div aria-live="polite" aria-atomic="true">${arrhythmiaMapRegions.map((r,i)=>`<div class="pharm-map-copy" data-arr-panel="${i}" id="${id}-${i}" ${i?'hidden':''}><p>${r.text}</p>${inline(`[[#${r.heading}|이 부분 읽기 →]]`)}</div>`).join('')}</div><p class="pharm-map-help">번호를 눌러 원래 위치를 확인하세요. 그림을 누르면 확대할 수 있어요.</p></div>`;
 }
 if(line==='@arrclass'){
  const id=`arr-class-${++arrhythmiaBlockSerial}`;
  return `<div class="pharm-map arr-widget" data-arr-class><div class="pharm-map-label">같은 Na 차단, 다른 세 자리</div><div class="pharm-map-buttons" role="group" aria-label="Class I 활동전위 비교">${arrhythmiaClasses.map((s,i)=>`<button type="button" data-arr-class-state="${i}" aria-pressed="${!i}" aria-controls="${id}">Class ${s.name}</button>`).join('')}</div><div id="${id}" data-arr-class-panel aria-live="polite" aria-atomic="true">${arrhythmiaClassPanel(0)}</div><p class="pharm-map-help">강의 슬라이드 15 · 약의 공통 작용 방향을 비교해 보세요.</p></div>`;
 }
 if(line==='@arrrecall'){
  const cells=[['5-1 · IA','Quinidine·Procainamide·Disopyramide → APD·ERP·QT↑'],['5-2 · IB','Lidocaine·Mexiletine → 허혈성 심실·APD↓'],['5-3 · IC','Flecainide·Propafenone·Moricizine → 강한 전도 억제'],['6 · II','Propranolol·Atenolol·Esmolol → β 차단'],['7 · III','Amiodarone·Sotalol·Dofetilide·Ibutilide → K 차단·QT↑'],['8 · IV','Verapamil·Diltiazem → Ca 차단·AV 전도↓'],['9 · 기타','Adenosine → SVT / Mg²⁺ → TdP / K⁺ → 저K 교정']];
  return `<div class="pharm-recall arr-recall"><div class="pharm-recall-grid">${cells.map(([label,answer])=>`<div class="pharm-recall-cell"><strong>${label}</strong><div class="pharm-recall-slot"><span class="pharm-recall-answer" aria-hidden="true">${answer}</span><span class="pharm-recall-prompt">이 칸의 약물과 기전은?</span></div><button type="button" data-pharm-reveal aria-expanded="false" aria-label="${label} 약물과 기전 확인">답 확인</button></div>`).join('')}</div></div>`;
 }
 return '';
}
function bindArrhythmiaLearning(container){
 container.querySelectorAll('[data-arr-map]:not([data-arr-bound])').forEach(block=>{
  block.dataset.arrBound='1';block.querySelectorAll('[data-arr-region]').forEach(button=>button.addEventListener('click',()=>{
   const i=Number(button.dataset.arrRegion),r=arrhythmiaMapRegions[i];
   block.querySelectorAll('[data-arr-region]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
   block.querySelectorAll('[data-arr-panel]').forEach(p=>p.hidden=Number(p.dataset.arrPanel)!==i);
   ['left','top','width','height'].forEach((key,j)=>block.querySelector('.pharm-map-focus').style[key]=`${r.rect[j]}%`);
  }));
 });
 container.querySelectorAll('[data-arr-class]:not([data-arr-bound])').forEach(block=>{
  block.dataset.arrBound='1';block.querySelectorAll('[data-arr-class-state]').forEach(button=>button.addEventListener('click',()=>{
   block.querySelectorAll('[data-arr-class-state]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
   block.querySelector('[data-arr-class-panel]').innerHTML=arrhythmiaClassPanel(Number(button.dataset.arrClassState));
  }));
 });
}
