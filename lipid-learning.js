/* Lecture 9: retain the original one-page map order; arrows are p.45's ordinal comparison. */
const lipidMapRegions = [
  {
    "label": "8 · 지질단백",
    "heading": "CM·VLDL·LDL·HDL이 맡은 일",
    "text": "다섯 번째 열 위 · CM·VLDL의 TG → LDL의 콜레스테롤 → HDL 역수송",
    "rect": [
      50.11,
      7.28,
      12.05,
      33.44
    ]
  },
  {
    "label": "9 · Statin",
    "heading": "간 콜레스테롤이 줄면 LDL 수용체가 늘어난다",
    "text": "같은 열 아래 · 합성↓ → 간 콜레스테롤↓ → LDL 수용체↑",
    "rect": [
      50.11,
      40.73,
      12.05,
      56.96
    ]
  },
  {
    "label": "10 · Fibrate",
    "heading": "Fibrate · PPARα → LPL → TG 분해",
    "text": "여섯 번째 열 맨 위 · PPARα → LPL↑ → TG 분해↑",
    "rect": [
      62.39,
      7.28,
      12.05,
      14.82
    ]
  },
  {
    "label": "11 · Niacin",
    "heading": "Niacin · 지방세포 FFA를 줄여 VLDL을 낮춘다",
    "text": "Fibrate 아래 · HSL↓ → FFA↓ / HDL↑·Lp(a)↓",
    "rect": [
      62.39,
      22.12,
      12.05,
      15.64
    ]
  },
  {
    "label": "12 · Resin",
    "heading": "Resin · 담즙산을 붙잡아 대변으로",
    "text": "Niacin 아래 · 담즙산 결합 → LDL 수용체↑",
    "rect": [
      62.39,
      37.77,
      12.05,
      13.95
    ]
  },
  {
    "label": "13 · Ezetimibe",
    "heading": "Ezetimibe · NPC1L1에서 콜레스테롤 흡수 차단",
    "text": "Resin 아래 · NPC1L1 → 콜레스테롤 흡수↓",
    "rect": [
      62.39,
      51.73,
      12.05,
      8.04
    ]
  },
  {
    "label": "14 · PCSK9",
    "heading": "PCSK9 억제제 · LDL 수용체를 다시 쓰게 한다",
    "text": "Ezetimibe 아래 · 수용체 분해↓·재순환↑",
    "rect": [
      62.39,
      59.78,
      12.05,
      9.99
    ]
  }
];
const lipidEffectClasses = [
  {name:'Statin',effects:['↓↓↓↓','↑↑','↓↓'],mechanism:'HMG-CoA reductase 억제 → 간 콜레스테롤↓ → LDL 수용체↑',remember:'LDL 중심 · 간독성·근육독성'},
  {name:'Fibrate',effects:['↓','↑↑↑','↓↓↓↓'],mechanism:'PPARα → LPL↑·지방산 산화↑·VLDL 분비↓',remember:'TG 중심 · 담석·Statin 병용 시 근병증. 혼합형에서 LDL↑ 가능'},
  {name:'Niacin',effects:['↓↓','↑↑↑↑','↓↓↓'],mechanism:'지방세포 HSL 억제 → FFA↓ → VLDL↓ / ApoAI 제거↓',remember:'HDL↑·Lp(a)↓ · 홍조·통풍·혈당↑·간독성'},
  {name:'Resin',effects:['↓↓↓','↑','미미'],mechanism:'담즙산 결합 → 대변 배설↑ → 간 콜레스테롤 소모↑',remember:'담즙정체성 가려움 · 변비·흡수 방해. VLDL·TG↑ 가능'},
  {name:'Ezetimibe',effects:['↓','↑','↓'],mechanism:'NPC1L1 차단 → 장 콜레스테롤 흡수↓',remember:'Statin과 합성+흡수 차단 · 가역적 간기능 이상'}
];
let lipidBlockSerial=0;
function lipidEffectPanel(d){
  return `<div class="lipid-effects">${['LDL','HDL','TG'].map((label,i)=>`<div><span>${label}</span><strong>${d.effects[i]}</strong></div>`).join('')}</div><p class="lipid-mechanism">${d.mechanism}</p><p class="lipid-remember">${d.remember}</p>`;
}
function renderLipidLearningBlock(line,course,footnotes){
  const inline=text=>renderWikiInline(text,course,footnotes);
  if(line==='@lipidmap'){
    const id=`lipid-map-${++lipidBlockSerial}`;
    return `<div class="pharm-map lipid-map" data-lipid-map><div class="pharm-map-label">한장정리 가운데 두 열</div><div class="pharm-map-buttons" role="group" aria-label="9강 한장정리 위치">${lipidMapRegions.map((r,i)=>`<button type="button" data-lipid-region="${i}" aria-pressed="${!i}" aria-controls="${id}-${i}">${r.label}</button>`).join('')}</div><div class="pharm-map-preview"><img src="./assets/lecture-08/cardiovascular-map-final-20261106.webp" srcset="./assets/lecture-08/cardiovascular-map-final-20261106-preview.webp 2400w, ./assets/lecture-08/cardiovascular-map-final-20261106.webp 7200w" sizes="(max-width: 900px) 100vw, 880px" alt="심혈관계 지도 · 가운데 두 열이 9강 범위" data-note-image width="7200" height="5095"><span class="pharm-map-focus" aria-hidden="true" style="left:50.11%;top:7.28%;width:12.05%;height:33.44%"></span></div><div aria-live="polite" aria-atomic="true">${lipidMapRegions.map((r,i)=>`<div class="pharm-map-copy" id="${id}-${i}" data-lipid-panel="${i}" ${i?'hidden':''}><p>${r.text}</p>${inline(`[[#${r.heading}|이 부분 읽기 →]]`)}</div>`).join('')}</div><p class="pharm-map-help">번호를 누르면 원래 지도에서 위치가 표시됩니다. 그림을 누르면 원본을 확대할 수 있어요.</p></div>`;
  }
  if(line==='@lipidcompare'){
    const id=`lipid-effects-${++lipidBlockSerial}`;
    return `<div class="pharm-map lipid-compare" data-lipid-compare><div class="pharm-map-label">같은 순서로 지질 효과 비교</div><div class="pharm-map-buttons" role="group" aria-label="지질강하제 계열 선택">${lipidEffectClasses.map((d,i)=>`<button type="button" data-lipid-effect="${i}" aria-pressed="${!i}" aria-controls="${id}">${d.name}</button>`).join('')}</div><div id="${id}" data-lipid-effect-panel aria-live="polite" aria-atomic="true">${lipidEffectPanel(lipidEffectClasses[0])}</div><p class="pharm-map-help">강의 p.45 · 화살표 수는 이 표 안의 상대효과입니다. PCSK9 억제제는 별도 문단에서 비교해요.</p></div>`;
  }
  if(line==='@lipidrecall'){
    const cells=[['9 · HMG-CoA reductase 억제','Lovastatin·Simvastatin·Pravastatin·Fluvastatin·Atorvastatin·Rosuvastatin·Pitavastatin'],['10 · PPARα → LPL↑','Gemfibrozil·Fenofibrate'],['11 · 지방세포 HSL 억제','Niacin · nicotinic acid · vitamin B3'],['12 · 담즙산 결합','Cholestyramine·Colestipol·Colesevelam'],['13 · NPC1L1 차단','Ezetimibe'],['14 · LDL 수용체 분해↓','Evolocumab·Alirocumab']];
    return `<div class="pharm-recall lipid-recall"><div class="pharm-recall-grid">${cells.map(([label,answer])=>`<div class="pharm-recall-cell"><strong>${label}</strong><div class="pharm-recall-slot"><span class="pharm-recall-answer" aria-hidden="true">${answer}</span><span class="pharm-recall-prompt">같은 칸의 약물명은?</span></div><button type="button" data-pharm-reveal aria-expanded="false" aria-label="${label} 약물명 확인">답 확인</button></div>`).join('')}</div></div>`;
  }
  return '';
}
function bindLipidLearning(container){
  container.querySelectorAll('[data-lipid-map]:not([data-lipid-bound])').forEach(block=>{
    block.dataset.lipidBound='1';
    block.querySelectorAll('[data-lipid-region]').forEach(button=>button.addEventListener('click',()=>{
      const index=Number(button.dataset.lipidRegion),r=lipidMapRegions[index];
      block.querySelectorAll('[data-lipid-region]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      block.querySelectorAll('[data-lipid-panel]').forEach(p=>p.hidden=Number(p.dataset.lipidPanel)!==index);
      ['left','top','width','height'].forEach((key,i)=>block.querySelector('.pharm-map-focus').style[key]=`${r.rect[i]}%`);
    }));
  });
  container.querySelectorAll('[data-lipid-compare]:not([data-lipid-bound])').forEach(block=>{
    block.dataset.lipidBound='1';
    block.querySelectorAll('[data-lipid-effect]').forEach(button=>button.addEventListener('click',()=>{
      block.querySelectorAll('[data-lipid-effect]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      block.querySelector('[data-lipid-effect-panel]').innerHTML=lipidEffectPanel(lipidEffectClasses[Number(button.dataset.lipidEffect)]);
    }));
  });
}
