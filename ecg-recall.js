/* Compact, schematic ECG comparisons for authored JBL memory cards. */
(function(){
  'use strict';
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const path=(d,cls='erc-trace')=>`<path class="${cls}" d="${d}"/>`;
  const grid=(w,h)=>path(Array.from({length:Math.floor(w/20)},(_,i)=>`M${(i+1)*20} 0V${h}`).join(' ')+Array.from({length:Math.floor(h/20)},(_,i)=>`M0 ${(i+1)*20}H${w}`).join(' '),'erc-grid');
  const svg=(body,label,w=240,h=140)=>`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">${grid(w,h)}${body}</svg>`;
  const panel=(label,d,ref='',extra='')=>`<div class="erc-panel"><strong>${label}</strong>${svg(path('M8 75H232','erc-baseline')+(ref?path(ref,'erc-reference'):'')+path(d)+extra,label)}</div>`;
  const normal1='M8 75H75l8 -15 10 50 9 -35H160q15 -24 30 0H232';
  const normal6='M8 75H75l6 6 10 -50 9 54 7 -10H160q15 -24 30 0H232';
  const pairs={
    lvh:['V1 · 깊은 S','M8 75H75l8 -10 10 62 9 -52H160q15 -20 30 0H232','V6 · 큰 R','M8 75H75l6 6 10 -69 9 73 7 -10H160q15 25 30 0H232'],
    rvh:['V1 · 큰 R','M8 75H75l7 5 10 -64 9 72 8 -13H160q15 24 30 0H232','V6 · 깊은 S','M8 75H75l8 -15 10 60 9 -45H160q15 -20 30 0H232'],
    lbbb:['V1 · QS/rS','M8 75H65l10 28 21 13 17 -2 24 -39H160q15 -45 30 0H232','V6 · 넓고 패인 R','M8 75H65l17 -54 15 12 14 -12 26 54H160q15 24 30 0H232'],
    rbbb:['V1 · rSR′','M8 75H65l9 -16 13 45 26 -78 18 43 9 6H160q15 24 30 0H232','V6 · 넓은 S','M8 75H65l7 7 9 -50 12 57 28 18 19 -32H160q15 -24 30 0H232']
  };
  function paired(key){const p=pairs[key];return `<div class="erc-pair">${panel(p[0],p[1],normal1)}${panel(p[2],p[3],normal6)}</div>`;}
  function chambers(i){
    if(i<2)return paired(i===0?'lvh':'rvh');
    const normalP='M8 75H65q20 -36 40 0H232',normalPv1='M8 75H65q12 -24 24 0q12 20 24 0H232';
    return i===2?`<div class="erc-pair">${panel('II · 넓고 갈라진 P','M8 75H55q14 -38 28 -12q14 -26 28 12H232',normalP)}${panel('V1 · 말단 음성 P','M8 75H65q12 -24 24 0q22 55 44 0H232',normalPv1)}</div>`:`<div class="erc-pair">${panel('II · 높고 뾰족한 P','M8 75H65Q85 0 105 75H232',normalP)}${panel('V1 · 초기 양성 P','M8 75H65q15 -65 30 0q12 20 24 0H232',normalPv1)}</div>`;
  }
  function bundle(i){return i<2?paired(i===0?'lbbb':'rbbb'):`<div class="erc-pair">${panel('V1 · 정상 비교',normal1)}${panel('V6 · 정상 비교',normal6)}</div>`;}
  const axisAngles=[-60,60,-15,120,-120];
  function axis(i){const a=axisAngles[i],t=a*Math.PI/180,cx=135,cy=95,r=67,x=cx+Math.cos(t)*r,y=cy+Math.sin(t)*r;
    const tip=`M${x} ${y}l${-14*Math.cos(t-.45)} ${-14*Math.sin(t-.45)}M${x} ${y}l${-14*Math.cos(t+.45)} ${-14*Math.sin(t+.45)}`;
    return `<div class="erc-axis">${svg(`<circle class="erc-circle" cx="${cx}" cy="${cy}" r="${r}"/>`+path(`M40 ${cy}H230M${cx} 10V180`,'erc-baseline')+path(`M${cx} ${cy}L${x} ${y} ${tip}`)+`<text x="239" y="101">I＋</text><text x="139" y="194">aVF＋</text><text x="8" y="24">${a>0?'+':''}${a}°</text>`,`${a}도 전기축`,290,210)}<div class="erc-axis-signs">${[['I',0],['aVF',90],['II',60]].map(([n,d])=>{const p=Math.cos((a-d)*Math.PI/180);return `<div><strong>${n}</strong><b>${p>0?'＋':'−'}</b></div>`;}).join('')}</div></div>`;
  }
  const leadRows=['I','aVR','V1','V4','II','aVL','V2','V5','III','aVF','V3','V6'];
  const territories=[['V1','V2','V3','V4'],['II','III','aVF'],['I','aVL','V5','V6']];
  const normalST='M8 75H60l7 5 9 -42 9 52 7 -15H160q16 -30 32 0H232';
  const raisedST='M8 75H60l7 5 9 -42 9 52 7 -35Q120 52 148 55q24 -40 44 20H232';
  function infarct(i){const active=territories[i];return `<div class="erc-territory"><div class="erc-lead-grid">${leadRows.map(n=>`<span class="${active.includes(n)?'is-active':i===1&&['I','aVL'].includes(n)?'is-reciprocal':''}">${n}${i===1&&['I','aVL'].includes(n)?'<small aria-label="ST 하강">↓</small>':''}</span>`).join('')}</div>${panel('선택 영역 · ST 상승',raisedST,normalST)}</div>`;}
  function qrs(x,y,wide=false){return wide?`M${x-18} ${y}l10 -29 15 -5 13 47 10 -13`:`M${x-5} ${y}l4 3 5 -29 5 39 5 -13`;}
  function pWave(x,y,inverted=false){return `M${x-13} ${y}q8 ${inverted?13:-14} 16 0`;}
  function rhythmLine(kind,y,ref=false){let xs=[50,130,210,290,370,450],b='';const cls=ref?'erc-reference':'erc-trace';
    if(kind==='af')xs=[35,103,212,254,337,455];
    if(['at','psvt','st','vt'].includes(kind))xs=[35,95,155,215,275,335,395,455];
    if(kind==='afl')xs=[54,142,230,318,406];
    if(kind==='sa')xs=[35,108,168,222,284,365,455];
    if(kind==='apc')xs=[50,130,178,258,338,418];
    if(kind==='vf')return path('M8 '+y+Array.from({length:47},(_,n)=>`L${18+n*10} ${y+[11,-25,17,-12,27,-21,6][n%7]}`).join(''),cls);
    if(kind==='af')b+=path(`M8 ${y}`+Array.from({length:58},(_,n)=>`L${16+n*8} ${y+[1,-3,2,-1][n%4]}`).join(''),cls);
    else if(kind==='afl')b+=path(`M8 ${y}`+Array.from({length:21},()=> 'l17 0 5 -13 0 13').join(''),cls);
    else b+=path(`M8 ${y}H475`,'erc-baseline');
    xs.forEach((x,n)=>{if(['normal','st','sa','at','apc'].includes(kind))b+=path(pWave(x-13,y,kind==='at'||kind==='apc'&&n===2),cls);b+=path(qrs(x,y,kind==='vt'),cls);if(kind!=='vt'&&x+31<475)b+=path(`M${x+17} ${y}q7 -10 14 0`,cls);});return b;
  }
  function rhythm(kind){return `<div class="erc-rhythm-labels"><span>정상 · 기준</span><strong>선택 리듬</strong></div>${svg(rhythmLine('normal',35,true)+rhythmLine(kind,103),`정상 동성리듬과 ${kind} 비교`,480,132)}`;}
  function preexcitation(i){const normal='M8 75H25q10 -22 20 0H85l5 5 8 -42 8 52 8 -15H170q15 -27 30 0H232';
    const d=i===0?'M8 75H25q10 -22 20 0H61L83 61l15 -31 8 60 8 -15H170q15 23 30 0H232':i===1?'M8 75H25q10 -22 20 0H85l16 -50 13 10 13 -10 25 50H170q15 23 30 0H232':'M8 75H25q10 -22 20 0H85l5 5 8 -68 8 78 8 -15H170q15 23 30 0H232';
    return `<div class="erc-pair">${panel('정상 · PR과 시작',normal)}${panel(['WPW · 시작의 delta','각차단 · QRS 폭','고전압 · R 높이'][i],d,normal,i===0?'<rect class="erc-band" x="59" y="53" width="26" height="29" rx="3"/>':'')}</div>`;
  }
  function avblock(i){const xs=[35,95,155,215,275,335,395,455];let b='';xs.forEach((x,n)=>{b+=path(pWave(x+5,28));let delay=i===1?[11,18,25,0][n%4]:11,pass=i===0?[0,1,5,6].includes(n):i===1?n%4!==3:i===2?![3,6].includes(n):i===3?n%3===0:i===5?n%2===0:false;
    if(pass){b+=path(`M${x} 38L${x+delay} 72`,'erc-connection')+path(qrs(x+delay,105));}else if(i!==4)b+=`<text class="erc-drop" x="${x-5}" y="110">×</text>`;});
    if(i===4)[62,192,322,452].forEach(x=>b+=path(qrs(x,105)));
    return `<div class="erc-rhythm-labels"><span>P · 심방</span><strong>QRS · 심실</strong></div>${svg(b,'P와 QRS의 전도 관계. 위는 P, 아래는 QRS.',490,140)}`;
  }
  function bradyRhythm(i){
    const y=103,regular=[50,130,210,290,370,450];
    let ps=regular,qs=regular,body=path(`M8 ${y}H475`,'erc-baseline');
    if(i===0){ps=[50,130,345,425];qs=ps;}
    if(i===1){ps=[50,130,370,450];qs=ps;}
    if(i===2){qs=[50,130,370,450];}
    if(i===3){ps=[50,210,370];qs=ps;}
    if(i===4){ps=[410];qs=[30,77,139,178,410];body+=path(`M8 ${y}l8 -2 8 4 8 -3 8 1 8 -2 8 4 8 -3 8 1 8 -2 8 4 8 -3 8 1 8 -2 8 4 8 -3 8 1 8 -2 8 4 8 -3 8 1 8 -2 8 4`);}
    if(i<3)body+=`<rect class="erc-band" x="168" y="69" width="140" height="59" rx="5"/>`;
    if(i===4)body+=`<rect class="erc-band" x="218" y="69" width="150" height="59" rx="5"/>`;
    ps.forEach(x=>body+=path(pWave(x-13,y)));
    qs.forEach(x=>body+=path(qrs(x,y))+path(`M${x+17} ${y}q7 -10 14 0`));
    return `<div class="erc-rhythm-labels"><span>정상 · 기준</span><strong>선택 리듬</strong></div>${svg(rhythmLine('normal',35,true)+body,['P와 QRS가 함께 없는 동정지 예시','긴 PP가 기본 PP의 3배인 II형 동방차단 예시','QRS 공백에도 P가 이어지는 방실차단','느린 P와 QRS가 일대일로 이어지는 동성서맥','빠른 불규칙 리듬이 끝난 뒤 pause와 동성 박동 재개'][i],480,140)}`;
  }
  function premature(i){
    let body=path('M8 103H475','erc-baseline');
    [50,130,210,290,370,450].forEach(x=>{
      if(i===0&&x===210){body+=path(qrs(185,103,true))+path('M219 103q9 22 18 0');}
      else body+=path(pWave(x-13,103))+path(qrs(x,103))+path(`M${x+17} 103q7 -10 14 0`);
    });
    if(i===0)body+=`<rect class="erc-band" x="162" y="64" width="78" height="66" rx="5"/>`;
    return `<div class="erc-rhythm-labels"><span>정상 · 기준</span><strong>${i===0?'심실조기수축':'정상 비교'}</strong></div>${svg(rhythmLine('normal',35,true)+body,i===0?'기본 주기보다 이르게 나온 넓은 QRS와 뒤의 공백':'규칙적인 동성 P와 좁은 QRS',480,140)}`;
  }
  const groups={
    chambers:{items:['좌심실비대','우심실비대','좌심방 확대','우심방 확대'],draw:chambers,cues:['V1의 깊은 S와 V6의 큰 R을 한 쌍으로 기억한다.','V1 큰 R + V6 깊은 S, 전기축도 오른쪽으로.','II의 넓은 P, V1의 말단 음성 P가 커진다.','II의 높은 P, V1의 초기 양성 P가 커진다.']},
    axis:{items:['좌축','정상','정상 경계','우축','극단축'],draw:axis,cues:['I＋ · aVF− · II− → 좌축편위.','I＋ · aVF＋ → 정상축.','I＋ · aVF−여도 II＋이면 정상 범위.','I− · aVF＋ → 우축편위.','I− · aVF− → 극단축.']},
    infarct:{items:['전중격·전벽','하벽','측벽'],draw:infarct,cues:['V1–V4의 연속된 ST·QRS 변화를 묶는다.','II·III·aVF 상승 ↔ I·aVL 상호성 하강.','I·aVL·V5·V6는 같은 측벽을 본다.']},
    bundle:{items:['좌각차단','우각차단','정상'],draw:bundle,cues:['V1의 넓은 음성 QRS 뒤 큰 양성파는 T. QRS와 나누어 읽자.','V1의 말단 R′ ↔ V6의 넓은 말단 S.','좁은 QRS의 정상 모양을 기준으로 폭·말단을 비교한다.']},
    atrial:{items:['AF','AFL','AT','PSVT','VT'],draw:i=>rhythm(['af','afl','at','psvt','vt'][i]),cues:['일정한 P 없이 RR이 제멋대로 불규칙.','톱니 F파가 계속된다. 도식은 4:1 전도.','이소성 P가 빠르고 규칙적으로 반복된다.','빠르고 규칙적인 좁은 QRS, P가 QRS에 겹칠 수 있다.','넓은 QRS가 빠르게 반복된다. 방실관계까지 확인한다.']},
    tachy:{items:['PSVT','동성빈맥','동성부정맥','AT','APC','VF'],draw:i=>rhythm(['psvt','st','sa','at','apc','vf'][i]),cues:['동성 P가 분리되어 보이지 않는 규칙적인 좁은 QRS 빈맥.','같은 동성 P가 매 QRS 앞에 나온다.','동성 P 유지 + 간격이 주기적으로 길고 짧아짐.','동성 P와 모양이 다른 이소성 P가 반복된다.','먼저 나온 이소성 P와 그 뒤 QRS를 찾는다.','정돈된 QRS가 사라진 혼란스러운 심실 파형.']},
    preexcitation:{items:['WPW','각차단','고전압'],draw:preexcitation,cues:['PR이 짧고 QRS 처음이 완만하다. 표시된 구간이 delta.','PR 단축·delta보다 QRS의 폭과 말단 모양을 읽는다.','높은 전압과 짧은 PR·delta는 서로 다른 판독 단서다.']},
    avblock:{items:['고도 차단','Mobitz I','Mobitz II','3:1','완전 차단','2:1'],draw:avblock,cues:['여러 P가 연속 차단되지만 일부 P는 전도된다.','PR이 길어지다가 QRS가 탈락한다.','전도된 PR은 일정한데 QRS가 탈락한다.','P 3개에 QRS 1개. 고도 차단의 한 전도비다.','P와 QRS가 서로 독립적으로 진행한다.','P 2개에 QRS 1개. 이 배열만으로 Mobitz I·II를 가르기 어렵다.']}
  };
  groups['brady-sinus']={items:['Sinus pause','SA block II형','AV block','동성서맥','빈맥–서맥'],draw:bradyRhythm,cues:['표시한 공백에 P와 QRS가 함께 없다. 긴 PP가 꼭 기본 PP의 정수배일 필요는 없다.','P–QRS–T가 함께 빠진다. 이 예시는 긴 PP가 기본 PP의 3배다.','공백 속 P는 제때 나온다. 심방 신호 일부가 심실로 내려가지 못한다.','속도는 느려도 P 하나에 QRS 하나가 이어진다.','빠른 불규칙 리듬이 끝난 뒤 긴 pause, 이후 동성 박동이 다시 나타난다.']};
  groups['brady-premature']={items:['PVC','정상'],draw:premature,cues:['예상보다 먼저 나온 넓고 다른 QRS를 찾는다. 뒤의 공백보다 조기박동부터 읽자.','같은 주기로 P–QRS가 이어진다. 위의 회색 기준 리듬과 같은 타이밍이다.']};
  const draw=(g,i)=>`<div class="erc-graphic">${g.draw(i)}</div><p class="erc-cue">${esc(g.cues[i])}</p>`;
  window.renderECGRecallBlock=function(line){if(!line.startsWith('@ecgrecall '))return '';const [id,start]=line.slice(11).trim().split(/\s+/),g=groups[id];if(!g)return '';
    const requested=Number(start),initial=Number.isInteger(requested)&&requested>=0&&requested<g.items.length?requested:0;
    return `<section class="ecg-learning ecg-recall" data-ecg-recall="${id}"><div class="erc-legend"><span><i></i>선택 패턴</span><span><i class="erc-reference-key"></i>비교 기준</span><small>형태·관계 모식도</small></div><div class="ecg-buttons" role="group" aria-label="심전도 패턴 비교">${g.items.map((s,i)=>`<button type="button" data-ecg-recall-state="${i}" aria-pressed="${i===initial}">${esc(s)}</button>`).join('')}</div><div data-ecg-recall-body aria-live="polite">${draw(g,initial)}</div></section>`;
  };
  window.bindECGRecall=function(container){container.querySelectorAll('[data-ecg-recall]:not([data-erc-bound])').forEach(el=>{el.dataset.ercBound='1';el.addEventListener('click',e=>{const b=e.target.closest('[data-ecg-recall-state]');if(!b||!el.contains(b))return;el.querySelectorAll('[data-ecg-recall-state]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));el.querySelector('[data-ecg-recall-body]').innerHTML=draw(groups[el.dataset.ecgRecall],Number(b.dataset.ecgRecallState));});});};
})();
