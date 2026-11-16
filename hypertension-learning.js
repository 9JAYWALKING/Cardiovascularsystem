/* Lecture 11: original map order, fixed locations, qualitative mechanisms. */
const hypertensionMapRegions = [
  {
    "label": "0 · 혈압",
    "heading": "BP = CO × PVR에서 약의 자리를 찾기",
    "text": "맨 왼쪽 위 · BP = CO × PVR, 네 계열의 작용 자리",
    "rect": [
      1.03,
      7.28,
      12.05,
      44.89
    ]
  },
  {
    "label": "1 · 이뇨제",
    "heading": "Thiazide → Loop → K-sparing",
    "text": "두 번째 열 위 · Thiazide → Loop → K-sparing",
    "rect": [
      13.31,
      7.28,
      12.05,
      35.51
    ]
  },
  {
    "label": "2 · RAAS",
    "heading": "-pril은 생성, -sartan은 수용체",
    "text": "두 번째 열 아래 · ACEi → ARB → Aliskiren",
    "rect": [
      13.31,
      42.81,
      12.05,
      54.89
    ]
  },
  {
    "label": "3 · 중추·신경",
    "heading": "중추 → 신경말단 → β → α 순서",
    "text": "세 번째 열 위 · 중추 α₂ → 신경말단 NE 고갈",
    "rect": [
      25.59,
      7.28,
      12,
      28.47
    ]
  },
  {
    "label": "4 · β 차단제",
    "heading": "β 차단제 이름은 다섯 묶음으로",
    "text": "세 번째 열 가운데 · 비선택 → β₁ 선택 → ISA → α+β → β₁+NO",
    "rect": [
      25.59,
      35.76,
      12,
      33.63
    ]
  },
  {
    "label": "5 · α 차단제",
    "heading": "α₁ 차단은 Prazosin·Terazosin·Doxazosin",
    "text": "세 번째 열 아래 · -azosin·BPH·first-dose 기립성 저혈압",
    "rect": [
      25.59,
      69.41,
      12,
      28.29
    ]
  },
  {
    "label": "6 · 혈관확장",
    "heading": "Hydralazine·Minoxidil과 두 보상반응",
    "text": "네 번째 열 위 · 경구·장기 / 비경구·단기 → 보상반응",
    "rect": [
      37.83,
      7.28,
      12.05,
      18.85
    ]
  },
  {
    "label": "7 · CCB",
    "heading": "-dipine은 혈관, Verapamil·Diltiazem은 심장",
    "text": "네 번째 열 가운데 · DHP → Non-DHP",
    "rect": [
      37.83,
      26.14,
      12.05,
      35.58
    ]
  }
];
const hypertensionRAASStates=[
 {label:'기본 경로',active:[],title:'혈관수축 + Na⁺·물 보유',text:'Ang II는 AT₁을 통해 혈관을 수축시키고 aldosterone 분비를 늘린다. Aldosterone은 Na⁺ 재흡수·K⁺ 배설을 늘린다.',kinin:'ACE는 bradykinin을 분해한다.',memory:'생성 효소와 수용체를 먼저 구분해 보세요.'},
 {label:'ACEi',active:[1],title:'Captopril·Enalapril·Lisinopril',text:'ACE 억제 → Ang II·aldosterone↓ → 혈관수축·Na⁺ 보유↓. Ang II의 음성 되먹임이 줄어 renin은 증가한다.',kinin:'Bradykinin 분해↓·축적↑ → 혈관 이완 + 마른기침',memory:'-pril → Ang II↓ / bradykinin↑ · 고K⁺·임신 금기'},
 {label:'ARB',active:[2],title:'Losartan·Valsartan·Candesartan',text:'AT₁ 차단 → Ang II가 일으키는 혈관수축·aldosterone 분비 작용↓. 만들어진 Ang II가 작용할 수용체를 막는다.',kinin:'Bradykinin 분해에 영향 없음',memory:'-sartan → AT₁ 차단 · 고K⁺·임신 금기'},
 {label:'Aliskiren',active:[0],title:'Direct renin inhibitor',text:'Renin을 직접 억제해 angiotensinogen에서 Ang I으로 가는 첫 단계를 막는다.',kinin:'Bradykinin 분해를 직접 막는 자리는 ACEi',memory:'Aliskiren → renin 단계'},
 {label:'MRA',active:[3],title:'Spironolactone·Eplerenone',text:'Aldosterone 수용체 차단 → Na⁺ 재흡수·K⁺ 배설↓. 이뇨제의 K-sparing 칸과 RAAS의 마지막 칸이 여기서 연결된다.',kinin:'Bradykinin 분해를 직접 막는 자리는 ACEi',memory:'MRA → aldosterone 작용↓ · K⁺ 보존'}
];
let hypertensionBlockSerial=0;
function hypertensionRAASPanel(index){
 const s=hypertensionRAASStates[index],steps=[['Renin','Angiotensinogen → Ang I'],['ACE','Ang I → Ang II'],['AT₁','Ang II의 수용체'],['Aldosterone 수용체','Na⁺ 보유 · K⁺ 배설']];
 return `<div class="htn-path">${steps.map(([name,text],i)=>`<div class="${s.active.includes(i)?'is-blocked':''}"><span>${i+1} · ${name}</span><strong>${text}</strong>${s.active.includes(i)?'<em>차단 위치</em>':''}</div>`).join('')}</div><h4>${s.title}</h4><p>${s.text}</p><div class="htn-kinin"><span>옆 경로 · Bradykinin</span><strong>${s.kinin}</strong></div><p class="htn-memory">${s.memory}</p>`;
}
function hypertensionCompensationPanel(beta,diuretic){
 return `<p class="htn-start">Hydralazine·Minoxidil → 세동맥 이완 → PVR·혈압↓</p><div class="htn-branches"><div class="${beta?'is-treated':''}"><span>교감신경 쪽 보상</span><strong>${beta?'β 차단 → 반사성 빈맥·수축력 증가 억제':'반사성 빈맥 · 수축력↑'}</strong><p>${beta?'신장 β₁ 차단은 renin 분비도 낮춘다.':'교감신경이 심장 β₁을 자극해 혈압을 다시 올리려 한다.'}</p></div><div class="${diuretic?'is-treated':''}"><span>신장·체액 쪽 보상</span><strong>${diuretic?'이뇨제 → Na⁺·물 저류 조절':'Na⁺·물 저류 · 혈량↑'}</strong><p>${diuretic?'Na⁺와 물의 배출을 늘려 체액 보상을 줄인다.':'신장·RAAS가 체액량을 늘려 혈압을 다시 올리려 한다.'}</p></div></div><p class="htn-memory">${beta&&diuretic?'혈관확장제 + β 차단제 + 이뇨제 → 빈맥과 체액 저류를 각각 조절':beta?'β 차단제로 빈맥을 조절했다. 체액 저류 쪽도 확인하자.':diuretic?'이뇨제로 체액 보상을 조절했다. 반사성 빈맥 쪽도 확인하자.':'두 보상반응에 맞는 병용약을 하나씩 눌러 보세요.'}</p>`;
}
function renderHypertensionLearningBlock(line,course,footnotes){
 const clinical = renderHypertensionClinicalBlock(line);
 if (clinical) return clinical;
 const inline=t=>renderWikiInline(t,course,footnotes);
 if(line==='@htnmap'){
  const id=`htn-map-${++hypertensionBlockSerial}`;
  return `<div class="pharm-map htn-map" data-htn-map><div class="pharm-map-label">한장정리 왼쪽 네 열</div><div class="pharm-map-buttons" role="group" aria-label="11강 한장정리 위치">${hypertensionMapRegions.map((r,i)=>`<button type="button" data-htn-region="${i}" aria-pressed="${!i}" aria-controls="${id}-${i}">${r.label}</button>`).join('')}</div><div class="pharm-map-preview"><img src="./assets/lecture-08/cardiovascular-map-final-20261106.webp" srcset="./assets/lecture-08/cardiovascular-map-final-20261106-preview.webp 2400w, ./assets/lecture-08/cardiovascular-map-final-20261106.webp 7200w" sizes="(max-width: 900px) 100vw, 880px" width="7200" height="5095" data-note-image alt="심혈관계 지도 · 왼쪽 네 열의 고혈압 약물"><span class="pharm-map-focus" aria-hidden="true" style="left:1.03%;top:7.28%;width:12.05%;height:44.89%"></span></div><div aria-live="polite" aria-atomic="true">${hypertensionMapRegions.map((r,i)=>`<div class="pharm-map-copy" data-htn-panel="${i}" id="${id}-${i}" ${i?'hidden':''}><p>${r.text}</p>${inline(`[[#${r.heading}|이 부분 읽기 →]]`)}</div>`).join('')}</div><p class="pharm-map-help">번호를 누르면 원래 지도에서 위치가 표시됩니다. 그림을 누르면 확대해서 볼 수 있어요.</p></div>`;
 }
 if(line==='@htnraas'){
  const id=`htn-raas-${++hypertensionBlockSerial}`;
  return `<div class="pharm-map htn-widget" data-htn-raas><div class="pharm-map-label">같은 경로, 다른 차단 위치</div><div class="pharm-map-buttons" role="group" aria-label="RAAS 약물 작용 위치">${hypertensionRAASStates.map((s,i)=>`<button type="button" data-htn-raas-state="${i}" aria-pressed="${!i}" aria-controls="${id}">${s.label}</button>`).join('')}</div><div id="${id}" data-htn-raas-panel aria-live="polite" aria-atomic="true">${hypertensionRAASPanel(0)}</div><p class="pharm-map-help">합본 p.20–26 · ACE 옆에 bradykinin 경로를 함께 놓고 비교해 보세요.</p></div>`;
 }
 if(line==='@htncompensation'){
  const id=`htn-comp-${++hypertensionBlockSerial}`;
  return `<div class="pharm-map htn-widget" data-htn-compensation><div class="pharm-map-label">왜 β 차단제와 이뇨제를 더할까?</div><div class="pharm-map-buttons" role="group" aria-label="보상반응 조절 약물"><button type="button" data-htn-add="beta" aria-pressed="false" aria-controls="${id}">β 차단제 더하기</button><button type="button" data-htn-add="diuretic" aria-pressed="false" aria-controls="${id}">이뇨제 더하기</button></div><div id="${id}" data-htn-compensation-panel aria-live="polite" aria-atomic="true">${hypertensionCompensationPanel(false,false)}</div><p class="pharm-map-help">합본 p.41·47의 보상반응. 버튼을 다시 누르면 해당 약물을 빼고 비교할 수 있어요.</p></div>`;
 }
 if(line==='@htnrecall'){
  const cells=[['1 · Thiazide → Loop → K-sparing','HCTZ·Chlorthalidone → Furosemide → Spironolactone·Eplerenone / Amiloride·Triamterene'],['2 · ACEi → ARB → Renin','Captopril·Enalapril·Lisinopril → Losartan·Valsartan → Aliskiren'],['3 · 중추','Methyldopa·Clonidine'],['3 · 신경말단','Guanethidine·Reserpine'],['4 · β 차단','Propranolol / Atenolol·Metoprolol / Labetalol·Carvedilol / Nebivolol'],['5 · α₁ 차단','Prazosin·Terazosin·Doxazosin'],['6 · 직접 혈관확장','Hydralazine·Minoxidil / Nitroprusside·Diazoxide·Fenoldopam'],['7 · DHP → Non-DHP','Nifedipine·Amlodipine → Verapamil·Diltiazem']];
  return `<div class="pharm-recall htn-recall"><div class="pharm-recall-grid">${cells.map(([label,answer])=>`<div class="pharm-recall-cell"><strong>${label}</strong><div class="pharm-recall-slot"><span class="pharm-recall-answer" aria-hidden="true">${answer}</span><span class="pharm-recall-prompt">같은 칸의 약물명은?</span></div><button type="button" data-pharm-reveal aria-expanded="false" aria-label="${label} 약물명 확인">답 확인</button></div>`).join('')}</div></div>`;
 }
 return '';
}
function bindHypertensionLearning(container){
 bindHypertensionClinical(container);
 container.querySelectorAll('[data-htn-map]:not([data-htn-bound])').forEach(block=>{
  block.dataset.htnBound='1';block.querySelectorAll('[data-htn-region]').forEach(button=>button.addEventListener('click',()=>{
   const i=Number(button.dataset.htnRegion),r=hypertensionMapRegions[i];
   block.querySelectorAll('[data-htn-region]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
   block.querySelectorAll('[data-htn-panel]').forEach(p=>p.hidden=Number(p.dataset.htnPanel)!==i);
   ['left','top','width','height'].forEach((key,j)=>block.querySelector('.pharm-map-focus').style[key]=`${r.rect[j]}%`);
  }));
 });
 container.querySelectorAll('[data-htn-raas]:not([data-htn-bound])').forEach(block=>{
  block.dataset.htnBound='1';block.querySelectorAll('[data-htn-raas-state]').forEach(button=>button.addEventListener('click',()=>{
   block.querySelectorAll('[data-htn-raas-state]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
   block.querySelector('[data-htn-raas-panel]').innerHTML=hypertensionRAASPanel(Number(button.dataset.htnRaasState));
  }));
 });
 container.querySelectorAll('[data-htn-compensation]:not([data-htn-bound])').forEach(block=>{
  block.dataset.htnBound='1';block.querySelectorAll('[data-htn-add]').forEach(button=>button.addEventListener('click',()=>{
   button.setAttribute('aria-pressed',String(button.getAttribute('aria-pressed')!=='true'));
   const enabled=k=>block.querySelector(`[data-htn-add="${k}"]`).getAttribute('aria-pressed')==='true';
   block.querySelector('[data-htn-compensation-panel]').innerHTML=hypertensionCompensationPanel(enabled('beta'),enabled('diuretic'));
  }));
 });
}

/* Lecture 32: source-star markers and compact clinical comparisons. */
const bp32Phenotypes = [
  { label:'양쪽 기준 미만', clinic:'125/75', home:'120/75', title:'두 장소 모두 고혈압 진단 기준 미만', text:'진료실 140/90, 가정 135/85 미만이다. 여기의 분류는 고혈압 진단 기준을 비교한 것으로, 진료실의 정상·주의·전단계 분류와 구분한다.' },
  { label:'백의고혈압', clinic:'150/95', home:'120/75', title:'병원에서 높고, 집에서는 기준 미만', text:'진료실에서만 높은 양상이다. 일상 혈압과 위험도를 확인하고 생활요법·추적관찰을 이어간다. 진료실 숫자만으로 모든 환자에게 약물을 시작하지 않는다.' },
  { label:'가면고혈압', clinic:'130/85', home:'145/90', title:'★ 가면고혈압 · 예후 비교의 핵심', text:'병원에서는 기준 미만이어도 일상 혈압은 높다. 수업에서 네 혈압 양상 중 예후가 가장 나쁜 것으로 강조했다. p.10의 비교 그래프에서도 심혈관 사건 발생률이 가장 높다. 가정혈압·활동혈압으로 숨은 상승을 확인한다.' },
  { label:'지속성 고혈압', clinic:'150/95', home:'145/90', title:'병원과 집에서 모두 높음', text:'반복 측정으로 높은 상태를 확인한 뒤 장기손상·위험도에 맞춰 목표와 치료를 정한다. 치료 목표와 진단 기준은 서로 다른 숫자일 수 있다.' }
];
const bp32Resistance = [
  { label:'먼저 백의효과', title:'★ 약을 늘리기 전, 일상 혈압도 높은가?', text:'가정혈압·활동혈압으로 백의효과부터 확인한다. 병원에서만 높다면 진짜 저항성으로 단정하지 않는다. 측정 오류·실제 복약·생활습관·수면·다른 약·이차성 원인도 함께 점검한다.', regimen:['백의효과 확인','복약','생활·수면','이차성 원인'], focus:0 },
  { label:'빠진 D 찾기', title:'Valsartan + amlodipine + metoprolol', text:'A + C + B 조합이다. 이뇨제 D가 빠져 있다. 23038에서는 thiazide 계열을 추가해 기본 조합을 갖추는 판단이 먼저다.', regimen:['A · ARB','C · CCB','B · β차단','D · 빠짐'], focus:3 },
  { label:'A+C+D 최적화', title:'Valsartan + amlodipine + chlorthalidone', text:'강의 예시 용량은 320 mg + 10 mg + 25 mg이다. 각 약의 최대 내약 용량·신기능에 맞는 이뇨제와 실제 복약을 확인한다.', regimen:['A · ARB','C · CCB','D · 이뇨제'], focus:2 },
  { label:'MRA · Spironolactone', title:'★ A+C+D 다음은 MRA, 특히 Spironolactone', text:'기본 세 약을 충분히 사용해도 높다면 Spironolactone 추가를 먼저 떠올린다. Aldosterone 작용을 차단하는 MRA이며, K⁺·신기능을 확인한다. 여성형유방 등 부작용이 있으면 Eplerenone을 고려한다.', regimen:['A','C','D','MRA · Spironolactone'], focus:3 },
  { label:'MRA 이후', title:'β차단제 → Hydralazine → Minoxidil', text:'계속 조절되지 않으면 심박수·금기를 보고 β차단제, 이어 Hydralazine을 고려한다. 필요 시 Hydralazine을 Minoxidil로 바꾼다. 이후 단계는 환자 상태에 맞춰 조정하며, 조절 실패가 지속되면 전문의에게 의뢰한다.', regimen:['β차단제','Hydralazine','Minoxidil로 변경'] }
];
function renderHypertensionClinicalBlock(line) {
  const star = line.match(/^@htnstar (3|7|11|19|20|27|36|46|54)$/);
  if (star) return `<div class="bp32-star"><strong><span aria-hidden="true">★</span> PPT 별표 · 교수님 강조</strong><span>슬라이드 ${star[1]}</span></div>`;
  const type = line === '@htnphenotypes' ? 'phenotype' : line === '@htnresistant' ? 'resistant' : '';
  if (!type) return '';
  const items = type === 'phenotype' ? bp32Phenotypes : bp32Resistance;
  const id = `bp32-${++hypertensionBlockSerial}`;
  return `<div class="bp32-widget htn-widget" data-bp32-widget><p class="bp32-caption">${type==='phenotype'?'병원·집의 조합을 눌러 비교하기 · 치료 전 예시':'현재 약물 조합에서 다음 판단 찾기'}</p><div class="bp32-buttons" role="group" aria-label="${type==='phenotype'?'혈압 양상 비교':'저항성 고혈압 치료 단계'}">${items.map((s,i)=>`<button type="button" data-bp32-choice="${i}" aria-pressed="${i===0}" aria-controls="${id}-${i}">${s.label}</button>`).join('')}</div><div class="bp32-panels" aria-live="polite">${items.map((s,i)=>`<section class="bp32-panel" id="${id}-${i}" data-bp32-panel="${i}" ${i?'hidden':''}>${type==='phenotype'?`<div class="bp32-measures"><div><span>진료실 · 기준 140/90</span><strong>${s.clinic}</strong></div><div><span>가정 · 기준 135/85</span><strong>${s.home}</strong></div></div>`:`<div class="bp32-regimen">${s.regimen.map((r,j)=>`<span class="${s.focus===j?'is-focus':''}">${r}</span>`).join('')}</div>`}<h4>${s.title}</h4><p>${s.text}</p></section>`).join('')}</div></div>`;
}
function bindHypertensionClinical(container) {
  container.querySelectorAll('[data-bp32-widget]:not([data-bp32-bound])').forEach(block=>{
    block.dataset.bp32Bound='1';
    block.querySelectorAll('[data-bp32-choice]').forEach(button=>button.addEventListener('click',()=>{
      block.querySelectorAll('[data-bp32-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      block.querySelectorAll('[data-bp32-panel]').forEach(p=>p.hidden=p.dataset.bp32Panel!==button.dataset.bp32Choice);
    }));
  });
}
