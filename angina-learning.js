/* Lecture 10 follows the original map's rightmost two columns. Directional comparisons only. */
const anginaMapRegions = [
  {
    "label": "15 · 협심증",
    "heading": "산소 수요와 공급을 나누어 놓기",
    "text": "일곱 번째 열 위 · HR·수축력·부하 / 이완기 관류",
    "rect": [
      74.67,
      7.28,
      12,
      22.18
    ]
  },
  {
    "label": "16 · 질산염",
    "heading": "NO → GC → cGMP를 순서대로",
    "text": "같은 열 가운데 · NO → GC → cGMP → 정맥·preload↓",
    "rect": [
      74.67,
      29.47,
      12,
      43.07
    ]
  },
  {
    "label": "17 · β 차단제",
    "heading": "β 차단제는 수요↓와 이완기 시간↑",
    "text": "질산염 아래 · HR·수축력↓ + 이완기 관류시간↑",
    "rect": [
      74.67,
      72.55,
      12,
      25.15
    ]
  },
  {
    "label": "18 · 신약",
    "heading": "Ranolazine은 late Na⁺, 비교표에서는 혈역학 유지",
    "text": "맨 오른쪽 위 · Ranolazine → Ivabradine → Nicorandil",
    "rect": [
      86.91,
      7.28,
      12.05,
      20.3
    ]
  },
  {
    "label": "비교·치료 전략",
    "heading": "같은 순서로 HR·부하를 비교",
    "text": "신약 아래 · β → Nitrate → DHP → Non-DHP → 신약",
    "rect": [
      86.91,
      27.58,
      12.05,
      31.94
    ]
  }
];
const anginaCGMPStates=[
 {name:'기본',make:'GC가 cGMP 생성',breakdown:'PDE5가 cGMP 분해',result:'생성과 분해의 두 자리를 먼저 구분',text:'NO는 GC를 활성화하고, PDE5는 cGMP를 GMP로 분해한다.'},
 {name:'Nitrate',make:'NO → GC 활성화 · 생성↑',breakdown:'분해 경로 유지',result:'cGMP↑ → 평활근 이완',text:'Nitroglycerin·Isosorbide는 NO를 통해 cGMP를 더 만드는 쪽이다.'},
 {name:'PDE5 억제제',make:'생성 경로 유지',breakdown:'PDE5 억제 · 분해↓',result:'cGMP가 덜 분해되어 신호가 커진다',text:'Sildenafil·Tadalafil·Vardenafil은 cGMP 분해를 막는 쪽이다.'},
 {name:'두 작용이 겹치면',make:'Nitrate · cGMP 생성↑',breakdown:'PDE5 억제제 · cGMP 분해↓',result:'과도한 혈관 이완·심한 저혈압 → 병용 금기',text:'기출의 ‘Nitroglycerin 작용 증가’는 생성↑와 분해↓가 겹치는 상호작용이다. 두 약은 심한 저혈압 위험 때문에 병용 금기다.'}
];
const anginaDrugEffects=[
 {name:'β 차단제',values:['↓','↓','—','↓ · 약함'],target:'β₁ 차단 → 심장의 속도·힘↓ + 이완기 관류 시간↑',adverse:'서맥·AV block·피로 / 비선택적 약물은 기관지수축',names:'Atenolol·Metoprolol / 비선택적 Propranolol'},
 {name:'Nitrate',values:['↑ · 반사','직접 작용 —','↓↓','↓'],target:'NO → GC → cGMP↑ → 큰 정맥 이완·preload↓',adverse:'두통·기립성 저혈압·실신·내성 / 압반사로 HR·수축력↑ 가능',names:'Nitroglycerin·Isosorbide dinitrate·Isosorbide mononitrate'},
 {name:'DHP',values:['↑ · 반사','—','—','↓↓'],target:'L-type Ca²⁺ 차단 → 세동맥 이완·afterload↓',adverse:'부종·두통·홍조·반사성 빈맥 / IR Nifedipine 주의',names:'Nifedipine·Amlodipine·Felodipine·Nimodipine'},
 {name:'Non-DHP',values:['↓','↓','—','↓'],target:'심장 L-type Ca²⁺ 차단 → 박동·AV 전도·수축 억제',adverse:'서맥·AV block·심부전 악화 / Verapamil 변비',names:'Verapamil·Diltiazem'},
 {name:'Ranolazine',values:['대체로 유지','대체로 유지','대체로 유지','대체로 유지'],target:'Late Na⁺ current 억제 → Ca²⁺ 과부하↓ → 심근 부담↓',adverse:'QT 연장·변비 / CYP3A4·QT 연장 약물 상호작용',names:'기전은 late Na⁺, 강의 비교표에서는 혈역학 유지'},
 {name:'Ivabradine',values:['↓↓','대체로 유지','대체로 유지','대체로 유지'],target:'I_f 억제 → SA node pacing↓ → HR↓',adverse:'광시증(phosphenes)·서맥',names:'한장정리의 HR만↓ 칸'},
 {name:'Nicorandil',values:['↑ 가능','—','↓','↓'],target:'K⁺ 통로 개방 + nitrate-like NO donor',adverse:'두통·GI ulcer',names:'Preload·afterload를 함께 낮춘다'}
];
let anginaBlockSerial=0;
function anginaCGMPPanel(i){const s=anginaCGMPStates[i];return `<div class="angina-cgmp-routes"><div><span>생성 · NO → GC</span><strong>${s.make}</strong></div><div><span>분해 · cGMP → GMP</span><strong>${s.breakdown}</strong></div></div><p class="angina-result ${i===3?'is-contraindicated':''}">${s.result}</p><p>${s.text}</p>`;}
function anginaEffectPanel(i){const d=anginaDrugEffects[i];return `<p class="angina-drug-names">${d.names}</p><div class="angina-effects">${['HR','수축력','Preload','Afterload'].map((label,j)=>`<div><span>${label}</span><strong>${d.values[j]}</strong></div>`).join('')}</div><p class="angina-target">${d.target}</p><p>${d.adverse}</p>`;}
function renderAnginaLearningBlock(line,course,footnotes){
 const inline=text=>renderWikiInline(text,course,footnotes);
 if(line==='@anginamap'){
  const id=`angina-map-${++anginaBlockSerial}`;
  return `<div class="pharm-map angina-map" data-angina-map><div class="pharm-map-label">한장정리 오른쪽 두 열</div><div class="pharm-map-buttons" role="group" aria-label="10강 한장정리 위치">${anginaMapRegions.map((r,i)=>`<button type="button" data-angina-region="${i}" aria-pressed="${!i}" aria-controls="${id}-${i}">${r.label}</button>`).join('')}</div><div class="pharm-map-preview"><img src="./assets/lecture-08/cardiovascular-map-final-20261106.webp" srcset="./assets/lecture-08/cardiovascular-map-final-20261106-preview.webp 2400w, ./assets/lecture-08/cardiovascular-map-final-20261106.webp 7200w" sizes="(max-width: 900px) 100vw, 880px" data-note-image width="7200" height="5095" alt="심혈관계 지도 · 오른쪽 두 열이 협심증 약물 범위"><span class="pharm-map-focus" aria-hidden="true" style="left:74.67%;top:7.28%;width:12%;height:22.18%"></span></div><div aria-live="polite" aria-atomic="true">${anginaMapRegions.map((r,i)=>`<div class="pharm-map-copy" id="${id}-${i}" data-angina-panel="${i}" ${i?'hidden':''}><p>${r.text}</p>${inline(`[[#${r.heading}|이 부분 읽기 →]]`)}</div>`).join('')}</div><p class="pharm-map-help">번호를 누르면 지도에서 위치가 표시됩니다. 그림을 누르면 원본을 확대할 수 있어요.</p></div>`;
 }
 if(line==='@anginacgmp'){
  const id=`angina-cgmp-${++anginaBlockSerial}`;
  return `<div class="pharm-map angina-cgmp" data-angina-cgmp><div class="pharm-map-label">cGMP를 더 만들까, 덜 분해할까?</div><div class="pharm-map-buttons" role="group" aria-label="cGMP 작용 경로 비교">${anginaCGMPStates.map((s,i)=>`<button type="button" data-angina-cgmp-state="${i}" aria-pressed="${!i}" aria-controls="${id}">${s.name}</button>`).join('')}</div><div id="${id}" data-angina-cgmp-panel aria-live="polite" aria-atomic="true">${anginaCGMPPanel(0)}</div><p class="pharm-map-help">강의 p.15·33 · 생성 경로와 분해 경로를 눌러 비교해 보세요.</p></div>`;
 }
 if(line==='@anginacompare'){
  const id=`angina-effects-${++anginaBlockSerial}`;
  return `<div class="pharm-map angina-compare" data-angina-compare><div class="pharm-map-label">같은 자리에서 심장·혈관 효과 비교</div><div class="pharm-map-buttons" role="group" aria-label="협심증 약물군 선택">${anginaDrugEffects.map((d,i)=>`<button type="button" data-angina-drug="${i}" aria-pressed="${!i}" aria-controls="${id}">${d.name}</button>`).join('')}</div><div id="${id}" data-angina-effect-panel aria-live="polite" aria-atomic="true">${anginaEffectPanel(0)}</div><p class="pharm-map-help">강의 p.34·한장정리의 상대적 방향. —는 주된 변화로 표시하지 않은 항목입니다.</p></div>`;
 }
 if(line==='@anginarecall'){
  const cells=[["16 · NO → GC → cGMP", "Nitroglycerin·Isosorbide dinitrate·Isosorbide mononitrate"], ["17 · β 차단", "Atenolol·Metoprolol / 비선택적 Propranolol"], ["7 · DHP · 혈관 Ca²⁺", "Nifedipine·Amlodipine·Felodipine·Nimodipine"], ["7 · Non-DHP · 심장 Ca²⁺", "Verapamil·Diltiazem"], ["18 · Late Na⁺ current", "Ranolazine"], ["18 · I_f · SA node", "Ivabradine"], ["18 · K⁺ 통로 + NO", "Nicorandil"]];
  return `<div class="pharm-recall angina-recall"><div class="pharm-recall-grid">${cells.map(([label,answer])=>`<div class="pharm-recall-cell"><strong>${label}</strong><div class="pharm-recall-slot"><span class="pharm-recall-answer" aria-hidden="true">${answer}</span><span class="pharm-recall-prompt">이 자리의 약물명은?</span></div><button type="button" data-pharm-reveal aria-expanded="false" aria-label="${label} 약물명 확인">답 확인</button></div>`).join('')}</div></div>`;
 }
 return '';
}
function bindAnginaLearning(container){
 container.querySelectorAll('[data-angina-map]:not([data-angina-bound])').forEach(block=>{
  block.dataset.anginaBound='1';block.querySelectorAll('[data-angina-region]').forEach(button=>button.addEventListener('click',()=>{
   const index=Number(button.dataset.anginaRegion),r=anginaMapRegions[index];
   block.querySelectorAll('[data-angina-region]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
   block.querySelectorAll('[data-angina-panel]').forEach(p=>p.hidden=Number(p.dataset.anginaPanel)!==index);
   ['left','top','width','height'].forEach((key,i)=>block.querySelector('.pharm-map-focus').style[key]=`${r.rect[i]}%`);
  }));
 });
 for(const [selector,buttonAttr,panel,render] of [['data-angina-cgmp','data-angina-cgmp-state','data-angina-cgmp-panel',anginaCGMPPanel],['data-angina-compare','data-angina-drug','data-angina-effect-panel',anginaEffectPanel]]){
  container.querySelectorAll(`[${selector}]:not([data-angina-bound])`).forEach(block=>{
   block.dataset.anginaBound='1';block.querySelectorAll(`[${buttonAttr}]`).forEach(button=>button.addEventListener('click',()=>{
    block.querySelectorAll(`[${buttonAttr}]`).forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    block.querySelector(`[${panel}]`).innerHTML=render(Number(button.getAttribute(buttonAttr)));
   }));
  });
 }
}
