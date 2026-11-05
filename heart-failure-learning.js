/* Lecture 12: original map positions, qualitative mechanisms, shared reading roles. */
const heartFailureMapRegions=[
 {label:'0 · 심부전',heading:'CO가 줄면 교감신경과 RAAS가 보상한다',text:'맨 왼쪽 · CO 결정 요소 → 보상기전 → 증상 → 약물 표적',rect:[1.1,7.4,16,71.5]},
 {label:'1 · Digitalis',heading:'직접 표적은 Na⁺/K⁺-ATPase',text:'두 번째 열 위 · 기전 → 세 가지 효과 → 전해질 → 독성·상호작용',rect:[17.7,7.4,15.9,56]},
 {label:'2 · 기타 강심제',heading:'Inamrinone·Milrinone은 PDE3 억제',text:'두 번째 열 아래 · PDE3 억제제 → Dobutamine',rect:[17.7,64.3,15.9,32.8]},
 {label:'3 · 비강심제',heading:'이뇨제는 울혈, Spironolactone은 aldosterone까지',text:'세 번째 열 · 이뇨제 → ACEi·ARB → 혈관확장제 → β 차단제',rect:[34,7.4,15.9,55]}
];
const heartFailureDigoxinStates=[
 {label:'기본 흐름',title:'Na⁺ 기울기로 Ca²⁺를 내보내고, SR에 저장한다',steps:[['Na⁺/K⁺-ATPase','Na⁺를 밖으로 · K⁺를 안으로'],['NCX','Na⁺ 기울기를 이용한 Ca²⁺ 배출'],['SR','Ca²⁺ 저장 후 자극에 맞춰 방출'],['심근','Trigger Ca → Activator Ca → 수축']],memory:'직접 표적인 Na pump와, 그 아래에서 영향을 받는 NCX를 구분해 보세요.'},
 {label:'Digoxin 작용',title:'Na pump 억제에서 시작하는 연쇄 변화',steps:[['Na⁺/K⁺-ATPase 억제','세포 내 Na⁺↑'],['NCX의 Ca²⁺ 배출↓','세포 내 Ca²⁺↑'],['SR 저장 Ca²⁺↑','다음 자극에서 방출할 Ca²⁺↑'],['심근 수축력↑','더 많은 Activator Ca']],memory:'Digoxin → Na pump 억제 → Na⁺↑ → NCX Ca²⁺ 배출↓ → SR Ca²⁺↑ → 수축력↑'},
 {label:'Ca²⁺ 과부하',title:'같은 Ca²⁺ 증가가 지나치면 독성으로 이어진다',steps:[['Na pump 억제','작용이 지나치게 강해짐'],['세포·SR의 Ca²⁺ 과부하','자발적인 Ca²⁺ 방출 가능'],['DAD','Delayed afterdepolarization'],['부정맥 위험↑','전해질·신기능·병용약 확인']],memory:'저K⁺·고Ca²⁺·저Mg²⁺ → Digoxin 독성↑. 농도만으로 안전을 판단하지 않아요.'}
];
const heartFailureTargets=[
 {label:'울혈·부종',title:'이뇨제 → 체액·정맥압·Preload↓',body:'Furosemide 같은 이뇨제는 폐울혈과 부종을 완화한다. Spironolactone에는 aldosterone 차단·K⁺ 보존·예후 개선도 붙인다.',tag:'증상 완화',memory:'체액이 많아 숨차고 붓는다 → 이뇨제'},
 {label:'수축력',title:'Digoxin → Na pump 억제 → Ca²⁺↑',body:'심근 수축력을 높여 증상과 심부전 입원을 줄이는 쪽에 놓는다. 장기 생존을 묻는 선지는 예후 개선 약물 칸으로 이어 간다.',tag:'수축기능 보조',memory:'직접 표적은 Na⁺/K⁺-ATPase'},
 {label:'급성 저박출',title:'Dobutamine · Inamrinone·Milrinone',body:'Dobutamine은 β₁ 자극, Inamrinone·Milrinone은 PDE3 억제다. 강의는 급성 부전의 단기 사용에 배치한다.',tag:'단기 강심',memory:'Dobutamine → β₁ / Milrinone → PDE3'},
 {label:'Preload·Afterload',title:'정맥과 동맥에서 심장 부담을 낮춘다',body:'ISDN은 정맥·preload, Hydralazine은 동맥·afterload. ACEi·ARB는 RAAS를 줄여 두 부하와 remodeling을 함께 낮춘다.',tag:'부하 감소',memory:'정맥 → Preload / 동맥 → Afterload'},
 {label:'장기 생존',title:'ACEi·ARB · MRA · 근거 있는 β 차단제',body:'강의의 중심은 신경호르몬 과자극과 remodeling을 줄이는 약이다. 이전 김일진 교수 족보에서는 ARNI·SGLT2 억제제도 예후 개선 범위로 연결한다.',tag:'예후 개선',memory:'수축력 증가와 생존 개선을 두 칸으로 구분'}
];
let heartFailureBlockSerial=0;
function heartFailureDigoxinPanel(index){
 const s=heartFailureDigoxinStates[index];
 return `<h4>${s.title}</h4><div class="hf-path">${s.steps.map(([label,text],i)=>`<div class="${index&&i===0?'is-target':''}"><span>${i+1} · ${label}</span><strong>${text}</strong>${index===1&&i===0?'<em>약의 직접 표적</em>':''}</div>`).join('')}</div><p class="hf-memory">${s.memory}</p>`;
}
function heartFailureTargetPanel(index){
 const s=heartFailureTargets[index];
 return `<span class="hf-category">${s.tag}</span><h4>${s.title}</h4><p>${s.body}</p><p class="hf-memory">${s.memory}</p>`;
}
function renderHeartFailureLearningBlock(line,course,footnotes){
 const inline=t=>renderWikiInline(t,course,footnotes);
 if(line==='@hfmap'){
  const id=`hf-map-${++heartFailureBlockSerial}`;
  return `<div class="pharm-map hf-map" data-hf-map><div class="pharm-map-label">한장정리 · 12강은 왼쪽 세 열</div><div class="pharm-map-buttons" role="group" aria-label="12강 한장정리 위치">${heartFailureMapRegions.map((r,i)=>`<button type="button" data-hf-region="${i}" aria-pressed="${!i}" aria-controls="${id}-${i}">${r.label}</button>`).join('')}</div><div class="pharm-map-preview"><img src="./assets/lecture-08/failure-arrhythmia-map.webp" width="4200" height="2972" data-note-image alt="심부전·항부정맥제 한장지도 원본 · 0–3 심부전 약물은 왼쪽 세 열"><span class="pharm-map-focus" aria-hidden="true" style="left:1.1%;top:7.4%;width:16%;height:71.5%"></span></div><div aria-live="polite" aria-atomic="true">${heartFailureMapRegions.map((r,i)=>`<div class="pharm-map-copy" data-hf-panel="${i}" id="${id}-${i}" ${i?'hidden':''}><p>${r.text}</p>${inline(`[[#${r.heading}|이 부분 읽기 →]]`)}</div>`).join('')}</div><p class="pharm-map-help">번호를 눌러 원래 위치를 확인하세요. 그림을 누르면 확대할 수 있어요.</p></div>`;
 }
 if(line==='@hfdigoxin'){
  const id=`hf-digoxin-${++heartFailureBlockSerial}`;
  return `<div class="pharm-map hf-widget" data-hf-digoxin><div class="pharm-map-label">Na pump → NCX → SR → 수축</div><div class="pharm-map-buttons" role="group" aria-label="Digoxin 기전 비교">${heartFailureDigoxinStates.map((s,i)=>`<button type="button" data-hf-digoxin-state="${i}" aria-pressed="${!i}" aria-controls="${id}">${s.label}</button>`).join('')}</div><div id="${id}" data-hf-digoxin-panel aria-live="polite" aria-atomic="true">${heartFailureDigoxinPanel(0)}</div><p class="pharm-map-help">강의 슬라이드 15–18 · 38기 p.17–20. 기전의 방향을 비교하는 도식입니다.</p></div>`;
 }
 if(line==='@hftargets'){
  const id=`hf-targets-${++heartFailureBlockSerial}`;
  return `<div class="pharm-map hf-widget" data-hf-targets><div class="pharm-map-label">문제에서 무엇을 물었을까?</div><div class="pharm-map-buttons" role="group" aria-label="심부전 치료 목적 비교">${heartFailureTargets.map((s,i)=>`<button type="button" data-hf-target-state="${i}" aria-pressed="${!i}" aria-controls="${id}">${s.label}</button>`).join('')}</div><div id="${id}" data-hf-target-panel aria-live="polite" aria-atomic="true">${heartFailureTargetPanel(0)}</div><p class="pharm-map-help">강의 슬라이드 12·30의 치료 목표를 족보의 질문에 연결해 보세요.</p></div>`;
 }
 if(line==='@hfrecall'){
  const cells=[['1 · Digitalis','Digoxin → Na⁺/K⁺-ATPase 억제'],['2-1 · Bipyridine','Inamrinone·Milrinone → PDE3 억제'],['2-2 · β₁ 작용제','Dobutamine → β₁ 자극 · 빠른 내성'],['3-1 · 이뇨제','Furosemide / Spironolactone → Aldosterone 차단·K⁺ 보존'],['3-2 · ACEi → ARB','Captopril·Enalapril → Losartan·Candesartan'],['3-3 · 혈관확장제','Hydralazine → Afterload / ISDN → Preload'],['3-4 · β 차단제','Bisoprolol·Carvedilol·Metoprolol → 장기 생존↑']];
  return `<div class="pharm-recall hf-recall"><div class="pharm-recall-grid">${cells.map(([label,answer])=>`<div class="pharm-recall-cell"><strong>${label}</strong><div class="pharm-recall-slot"><span class="pharm-recall-answer" aria-hidden="true">${answer}</span><span class="pharm-recall-prompt">이 칸의 약물과 기전은?</span></div><button type="button" data-pharm-reveal aria-expanded="false" aria-label="${label} 약물과 기전 확인">답 확인</button></div>`).join('')}</div></div>`;
 }
 return '';
}
function bindHeartFailureLearning(container){
 container.querySelectorAll('[data-hf-map]:not([data-hf-bound])').forEach(block=>{
  block.dataset.hfBound='1';block.querySelectorAll('[data-hf-region]').forEach(button=>button.addEventListener('click',()=>{
   const i=Number(button.dataset.hfRegion),r=heartFailureMapRegions[i];
   block.querySelectorAll('[data-hf-region]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
   block.querySelectorAll('[data-hf-panel]').forEach(p=>p.hidden=Number(p.dataset.hfPanel)!==i);
   ['left','top','width','height'].forEach((key,j)=>block.querySelector('.pharm-map-focus').style[key]=`${r.rect[j]}%`);
  }));
 });
 for(const [blockKey,stateKey,panelKey,render] of [['digoxin','digoxin-state','digoxin-panel',heartFailureDigoxinPanel],['targets','target-state','target-panel',heartFailureTargetPanel]]){
  container.querySelectorAll(`[data-hf-${blockKey}]:not([data-hf-bound])`).forEach(block=>{
   block.dataset.hfBound='1';block.querySelectorAll(`[data-hf-${stateKey}]`).forEach(button=>button.addEventListener('click',()=>{
    block.querySelectorAll(`[data-hf-${stateKey}]`).forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    block.querySelector(`[data-hf-${panelKey}]`).innerHTML=render(Number(button.getAttribute(`data-hf-${stateKey}`)));
   }));
  });
 }
}
