/* Lecture 21: conceptual diagrams, never replacements for source ECGs. */
(function(){
  'use strict';
  const path=(d,cls='ecg-trace')=>`<path class="${cls}" d="${d}"/>`;
  const svg=(s,label,h=240)=>`<svg viewBox="0 0 560 ${h}" role="img" aria-label="${label}">${s}</svg>`;
  const baseline=y=>path(`M20 ${y}H540`,'ecg-baseline');
  const p=(x,y)=>path(`M${x-12} ${y}Q${x} ${y-26} ${x+12} ${y}`);
  const q=(x,y,wide=false)=>path(wide?`M${x-12} ${y}l8 -35 16 3 16 48 12 -16`:`M${x-9} ${y}l4 5 5 -45 5 58 6 -18`);
  const spike=(x,y)=>path(`M${x} ${y}V${y-52}`,'brady-spike');
  const band=(x,w)=>`<rect class="ecg-band" x="${x}" y="32" width="${w}" height="172" rx="6"/>`;
  const pauseItems=['정상','Sinus pause','AV block'];
  const pauseText=[
    'P마다 QRS가 뒤따른다. 신호 생성과 방실전도가 모두 이어진다.',
    '표시한 공백에서 P도 빠진다. 동방결절의 신호 생성·출구 문제를 먼저 생각한다.',
    '표시한 공백에도 P는 계속된다. 심방 신호 중 일부가 심실로 내려가지 못한다.'
  ];
  function pause(i){
    let s=baseline(78)+baseline(178)+`<text x="20" y="26">P · 심방</text><text x="20" y="134">QRS · 심실</text>`;
    if(i)s+=band(210,185);
    [55,135,215,295,375,455].forEach((x,n)=>{const missing=n>=2&&n<=4;if(i!==1||!missing)s+=p(x,78);if(!i||!missing)s+=q(x+24,178);});
    return svg(s,`${pauseItems[i]}에서 P와 QRS의 관계`)+`<p>${pauseText[i]}</p>`;
  }
  const tachyItems=['① AF','② 종료 후 pause','③ 박동 재개'];
  const tachyText=[
    'AF에서는 일정한 동성 P 없이 빠른 불규칙 QRS가 이어진다.',
    '빠른 리듬이 끝난 뒤 동방결절의 회복이 늦어지면 긴 pause가 생긴다. 증상이 나타나는 시점과 연결해 보자.',
    '동방결절이 회복하거나 아래쪽 이탈박동이 나와 박동을 이어 간다. 이 그림은 회복을 보여주는 개념도이며, 원본 사진은 바로 아래에서 비교한다.'
  ];
  function tachy(i){
    const zones=[[18,198],[219,178],[400,143]];let s=band(...zones[i])+baseline(117);
    s+=path('M20 117'+Array.from({length:35},(_,n)=>`l5 ${[3,-4,2,-1][n%4]}`).join(''),'ecg-faint-trace');
    [35,77,102,157,189].forEach(x=>s+=q(x,117));[443,514].forEach(x=>s+=p(x-24,117)+q(x,117));
    s+='<text x="83" y="185">AF</text><text x="271" y="185">pause</text><text x="429" y="185">회복</text>';
    return svg(s,'AF 종료 뒤 pause와 박동 재개의 개념도',215)+`<p>${tachyText[i]}</p>`;
  }
  const modes=[
    {name:'DDD',pace:[1,1],sense:[1,1],desc:'심방과 심실을 모두 감지·조율한다. 고유 박동이 나오면 기다리고, 필요한 방에만 자극하여 심방 → 심실의 순서를 맞춘다.',use:'동기능부전 · AV block',link:'심방 신호를 감지하거나 조율한 뒤 → 심실 신호를 기다리고, 필요하면 심실 조율'},
    {name:'VDD',pace:[0,1],sense:[1,1],desc:'심방의 고유 P를 감지하여 심실 조율로 연결한다. 심방 자극 기능이 없으므로 동방결절 기능이 보존되어야 한다.',use:'동방결절 기능이 보존된 AV block',link:'고유 P 감지 → 심실 신호를 기다리고, 필요하면 심실 조율'},
    {name:'VVI',pace:[0,1],sense:[0,1],desc:'심실의 고유 박동을 감지하면 예정된 심실 자극을 억제한다. 심방 박동을 추적하지 않는다.',use:'지속적 AF + 느린 심실 반응',link:'고유 QRS 감지 → 대기 / 정해진 시간 동안 QRS가 없으면 → 심실 조율'},
    {name:'AAI',pace:[1,0],sense:[1,0],desc:'심방의 고유 P를 감지하면 예정된 심방 자극을 억제한다. 심실에는 보존된 AV 전도를 통해 내려간다.',use:'AV 전도가 보존된 동기능부전',link:'필요할 때 심방 조율 → 고유 AV 전도 → 심실 박동'}
  ];
  function modesDraw(i){const m=modes[i];return `<div class="brady-chambers">${['A · 심방','V · 심실'].map((name,n)=>`<div class="brady-chamber ${m.pace[n]?'is-paced':''}"><strong>${name}</strong><span class="brady-capability ${m.sense[n]?'is-active':''}">${m.sense[n]?'● 감지함':'감지 없음'}</span><span class="brady-capability ${m.pace[n]?'is-active':''}">${m.pace[n]?'↯ 필요 시 자극':'자극 없음'}</span></div>`).join('')}</div><p class="brady-route">${m.link}</p><p>${m.desc}</p><div class="ecg-copy"><strong>${m.use}</strong></div>`;}
  const stateItems=['AsVs','ApVs','AsVp','ApVp'];
  const stateText=[
    '심방 감지 + 심실 감지. 두 방 모두 고유 박동이 나와 이 박동에는 자극이 필요하지 않다.',
    '심방 조율 + 심실 감지. 심방 spike 뒤 P가 나오고, 고유 AV 전도로 심실이 활성화된다.',
    '심방 감지 + 심실 조율. 고유 P 뒤 정해진 AV 간격 동안 기다린 뒤 심실을 조율한다.',
    '심방 조율 + 심실 조율. 심방 spike 뒤 P, 심실 spike 뒤 QRS가 나온다.'
  ];
  function states(i){const ap=i===1||i===3,vp=i===2||i===3;
    const cycle=x=>(ap?spike(x-17,115):'')+p(x,115)+(vp?spike(x+63,115):'')+q(x+78,115,vp)+path(`M${x+125} 115q17 -28 34 0`);
    const labels=`<text x="35" y="34">${ap?'Ap':'As'} · P</text><text x="138" y="34">${vp?'Vp':'Vs'} · QRS</text>`;
    const label=`${stateItems[i]}의 자극과 ECG 파형`;
    const desktop=svg(baseline(115)+cycle(65)+cycle(320)+labels,label,170).replace('<svg ','<svg class="brady-desktop-plot" ');
    const mobile=`<svg class="brady-mobile-plot" viewBox="0 0 280 170" role="img" aria-label="${label}">${path('M20 115H260','ecg-baseline')+cycle(65)+labels}</svg>`;
    return desktop+mobile+`<div class="brady-key"><span>${ap?'심방 자극':'고유 심방 신호'}</span><span>${vp?'심실 자극':'고유 심실 신호'}</span></div><p>${stateText[i]}</p>`;
  }
  const labs={pause:{title:'같은 공백, 다른 원인',items:pauseItems,draw:pause,note:'P와 QRS를 위아래로 나눈 전도 관계 모식도입니다. 실제 파형과 간격은 아래 원본 ECG에서 확인하세요.'},tachy:{title:'빈맥 종료 직후를 따라가기',items:tachyItems,draw:tachy},modes:{title:'모드를 누르면 감지·자극 부위가 바뀝니다',items:modes.map(m=>m.name),draw:modesDraw,note:'모드별 기능을 비교한 개념도입니다. 실제 조율 여부는 그 순간의 고유 박동과 기기 설정에 따라 달라집니다.'},states:{title:'DDD · 그 순간 필요한 자극만',items:stateItems,draw:states}};
  window.renderBradyLearningBlock=function(line){
    if(!line.startsWith('@brady '))return '';const id=line.slice(7).trim(),l=labs[id];if(!l)return '';
    return `<section class="ecg-learning brady-learning" data-brady-lab="${id}"><div class="ecg-heading"><strong>${l.title}</strong><span>눌러서 비교</span></div><div class="ecg-buttons" role="group" aria-label="${l.title}">${l.items.map((t,i)=>`<button type="button" data-brady-state="${i}" aria-pressed="${i===0}">${t}</button>`).join('')}</div><div class="brady-content" aria-live="polite">${l.draw(0)}</div><p class="ecg-note">${l.note||'이해를 위한 모식도 · 실제 파형과 수치 측정은 강의록 원본 ECG에서 확인하세요.'}</p></section>`;
  };
  window.bindBradyLearning=function(container){container.querySelectorAll('[data-brady-lab]:not([data-brady-bound])').forEach(block=>{block.dataset.bradyBound='1';block.addEventListener('click',e=>{const b=e.target.closest('[data-brady-state]');if(!b||!block.contains(b))return;block.querySelectorAll('[data-brady-state]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));block.querySelector('.brady-content').innerHTML=labs[block.dataset.bradyLab].draw(Number(b.dataset.bradyState));});});};
})();
