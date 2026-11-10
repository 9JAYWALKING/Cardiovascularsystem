/* Lecture ECGs retain their source pixels. Rectangles and magnified views are separate learning layers. */
(function(){
  'use strict';
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const buttons=(items,attr,active=0)=>items.map((s,i)=>`<button type="button" ${attr}="${i}" aria-pressed="${i===active}">${esc(typeof s==='string'?s:s.label)}</button>`).join('');
  const svg=(body,label,w=640,h=210)=>`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">${body}</svg>`;
  const line=(d,cls='ecg-trace')=>`<path class="${cls}" d="${d}"/>`;
  const grid=(w=640,h=210)=>`<path class="ecg-grid" d="${Array.from({length:Math.floor(w/20)},(_,i)=>`M${(i+1)*20} 0V${h}`).join(' ')} ${Array.from({length:Math.floor(h/20)},(_,i)=>`M0 ${(i+1)*20}H${w}`).join(' ')}"/>`;
  const note=t=>`<p class="ecg-note">${t}</p>`;
  function markers(c,s,show,zoom=false){
    return `<g class="ecg-markers" ${show?'':'hidden'}>${(s.targets||[]).map(p=>{const x=p.x*c.width/1000,y=p.y*c.height/1000,scale=Math.min(Math.min(c.width,c.height)/900,zoom?c.width*s.box[2]/320000:Infinity);return `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M-26 -34L-5 -7 M-14 -9L-5 -7 -7 -17"/><circle cx="0" cy="0" r="5"/><text x="-28" y="-40" text-anchor="middle">${esc(p.label)}</text></g>`;}).join('')}</g>`;
  }
  function caseBody(key,index=0,show=true){
    const c=window.CARDIO_ECG_LEARNING.cases[key],s=c.steps[index]||c.steps[0];
    const [x,y,w,h]=s.box.map((v,i)=>v*(i%2?c.height:c.width)/1000);
    const padX=c.width*.01,padY=c.height*.015;
    const left=Math.max(0,x-padX),top=Math.max(0,y-padY),right=Math.min(c.width,x+w+padX),bottom=Math.min(c.height,y+h+padY);
    return `<div class="ecg-case-heading"><strong>${esc(c.title)}</strong><span>${esc(c.source)}</span></div><p>${esc(c.summary)}</p>
      <div class="ecg-photo" data-ecg-photo><img src="${esc(c.src)}" width="${c.width}" height="${c.height}" alt="${esc(c.alt || c.title+' · 강의록 원본 심전도')}" loading="lazy" decoding="async"><svg viewBox="0 0 ${c.width} ${c.height}" aria-hidden="true" class="ecg-overlay" ${show?'':'hidden'}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(c.width,c.height)*.008}"/>${markers(c,s,show)}</svg></div>
      <div class="ecg-focus-toolbar"><span>사진에서 짚어보기</span><button type="button" data-ecg-layer aria-pressed="${show}">${show?'학습 표시 숨기기':'학습 표시 켜기'}</button></div>
      <div class="ecg-buttons" role="group" aria-label="확대할 파형과 유도">${buttons(c.steps,'data-ecg-step',index)}</div>
      <div class="ecg-focus" aria-live="polite"><strong>${esc(s.label)} · 확대</strong><svg class="ecg-zoom" viewBox="${left} ${top} ${right-left} ${bottom-top}" role="img" aria-label="${esc(s.label)} 확대 사진"><image href="${esc(c.src)}" width="${c.width}" height="${c.height}"/>${markers(c,s,show,true)}</svg><p>${esc(s.text)}</p></div>`;
  }
  function gallery(id){
    const g=window.CARDIO_ECG_LEARNING?.groups[id];if(!g)return '';
    return `<section class="ecg-learning ecg-gallery" data-ecg-gallery="${id}" data-ecg-case="0" data-ecg-step-index="0" data-ecg-show="true"><div class="ecg-heading"><strong>${esc(g.title)}</strong><span>${esc(g.caption || '강의록 사진 비교')}</span></div>${g.cases.length>1?`<div class="ecg-buttons" role="group" aria-label="${esc(g.title)} 사진 선택">${buttons(g.cases.map(k=>window.CARDIO_ECG_LEARNING.cases[k].label),'data-ecg-case-button')}</div>`:''}<div class="ecg-case-content">${caseBody(g.cases[0])}</div>${note('버튼을 누르면 전체 사진의 표시 위치와 아래 확대 사진이 함께 바뀝니다. 원래 사진에 있던 표시와 글자는 그대로 유지됩니다.')}</section>`;
  }
  const waveParts=[
    ['P파',100,160,'P파 · 심방 탈분극','동방결절에서 시작한 신호가 심방을 통과한다. 먼저 우심방, 이어서 좌심방의 성분이 더해진다.'],
    ['QRS',225,290,'QRS · 심실 탈분극','심실이 빠르게 흥분하는 구간이다. 폭은 심실 전체로 전기가 퍼지는 데 걸리는 시간을 보여준다.'],
    ['T파',390,510,'T파 · 심실 재분극','심실이 다음 박동을 준비하며 전기적으로 회복한다. T파는 반드시 QRS와 구분해서 읽자.'],
    ['PR 간격',100,225,'PR interval · P 시작 → QRS 시작','심방 탈분극과 방실 전도를 포함한다. 정상 0.12–0.20초이며, PR segment는 P가 끝난 뒤부터 QRS 시작까지다.'],
    ['QRS 폭',225,290,'QRS duration · QRS 시작 → 끝','0.12초를 경계로 좁은 QRS와 넓은 QRS를 구분한다. 넓으면 각차단·심실 기원·조기흥분 등을 생각한다.'],
    ['ST 분절',290,390,'ST segment · QRS 끝 → T 시작','J point에서 시작한다. 기준선과 비교해 상승·하강을 읽으며, 심근경색에서는 인접한 유도들의 변화를 묶어 본다.'],
    ['QT 간격',225,510,'QT interval · QRS 시작 → T 끝','심실 탈분극부터 재분극이 끝날 때까지다. 심박수가 바뀌면 QT도 달라지므로 실제 평가는 심박수로 보정한 QTc를 함께 사용한다.'],
    ['J point',287,293,'J point · QRS와 ST의 경계','빠른 QRS가 끝나고 ST로 이어지는 지점이다. ST의 높이를 읽기 전에 이 경계부터 찾자.']
  ];
  const wavePath='M35 140H100 Q115 104 130 118 Q146 131 160 140H225 L235 151 253 35 274 179 290 140H390 Q418 136 441 99 Q463 76 488 117 Q500 138 510 140H610';
  function waveform(i){const p=waveParts[i];return svg(grid()+`<rect class="ecg-band" x="${p[1]}" y="24" width="${Math.max(5,p[2]-p[1])}" height="160"/>`+line(wavePath)+[['P',130,95],['Q',231,177],['R',253,25],['S',277,205],['T',450,75]].map(([t,x,y])=>`<text x="${x}" y="${y}">${t}</text>`).join('')+(i===7?'<circle class="ecg-dot" cx="290" cy="140" r="7"/>':''),p[3])+`<div class="ecg-copy"><strong>${p[3]}</strong><p>${p[4]}</p></div>`;}
  const leadSets=[
    {label:'하벽',keys:['II','III','aVF'],text:'II·III·aVF는 아래쪽에서 심장을 본다. 이 유도들에 ST 상승이 모이면 하벽(inferior wall)을 먼저 떠올리자.'},
    {label:'중격',keys:['V1','V2'],text:'V1·V2는 우측·좌측 흉골 옆에서 중격(septum) 쪽의 변화를 본다. V1–V4의 변화가 이어지면 전중격 영역으로 묶어 읽는다.'},
    {label:'전벽',keys:['V3','V4'],text:'V3·V4는 전벽(anterior wall) 쪽을 본다. V1·V2와 함께 변하는지, V5·V6까지 이어지는지 범위를 확인하자.'},
    {label:'측벽',keys:['I','aVL','V5','V6'],text:'I·aVL·V5·V6는 측벽(lateral wall) 유도다. 좌심실비대와 좌각차단에서도 이 유도의 R파와 ST–T를 함께 본다.'},
    {label:'사지유도',keys:['I','II','III','aVR','aVL','aVF'],text:'사지유도 6개는 전두면(frontal plane)에서 서로 다른 각도로 본다. 전기축은 이 평면에서 판정한다.'},
    {label:'흉부유도',keys:['V1','V2','V3','V4','V5','V6'],text:'흉부유도 6개는 수평면(horizontal plane)에서 본다. V1의 작은 R·깊은 S에서 V5·V6의 큰 R로 이어지는 흐름을 살펴보자.'}
  ];
  function leads(i){const s=leadSets[i];return `<div class="ecg-leads">${['I','aVR','V1','V4','II','aVL','V2','V5','III','aVF','V3','V6'].map(n=>`<div class="${s.keys.includes(n)?'is-active':''}"><strong>${n}</strong><span>${s.keys.includes(n)?s.label:'·'}</span></div>`).join('')}</div><div class="ecg-copy" aria-live="polite"><p>${s.text}</p></div>`;}
  const axes=[['+60°',60],['−15°',-15],['−60°',-60],['+120°',120],['−120°',-120]];
  function axis(i){const a=axes[i][1],rad=a*Math.PI/180,cx=310,cy=150,r=100;const label=a>=-30&&a<=90?'정상축':a< -30&&a>=-90?'좌축편위':a>90?'우축편위':'극단축';
    return svg(`<circle class="ecg-compass" cx="${cx}" cy="${cy}" r="${r}"/>`+[['I',0],['II',60],['aVF',90],['III',120],['aVL',-30],['aVR',-150]].map(([n,d])=>{const t=d*Math.PI/180;return `<path class="ecg-grid" d="M${cx} ${cy}L${cx+Math.cos(t)*r} ${cy+Math.sin(t)*r}"/><text x="${cx+Math.cos(t)*(r+37)}" y="${cy+Math.sin(t)*(r+26)+6}" text-anchor="middle">${n}</text>`;}).join('')+line(`M${cx} ${cy}L${cx+Math.cos(rad)*r} ${cy+Math.sin(rad)*r}`,'ecg-vector')+`<circle class="ecg-dot" cx="${cx+Math.cos(rad)*r}" cy="${cy+Math.sin(rad)*r}" r="7"/><text x="28" y="50">${axes[i][0]}</text><text x="28" y="80">${label}</text>`,`${axes[i][0]} ${label} 전기축`,640,300)+`<div class="ecg-signs">${[['I',0],['aVF',90],['II',60]].map(([n,d])=>{const p=Math.cos((a-d)*Math.PI/180);return `<div><strong>${n}</strong><span>${Math.abs(p)<.05?'등상성':p>0?'＋ 양성':'− 음성'}</span></div>`;}).join('')}</div><p>${a===-15?'I 양성·aVF 음성일 때 II까지 양성이면 −30°~0°의 정상축이다.':a===-60?'I 양성·aVF 음성에 II 음성이 더해지면 −30°보다 왼쪽으로 향한다.':a===60?'전기벡터가 II 방향과 나란하다. I·aVF·II 모두 양성으로 보인다.':a===120?'I는 음성, aVF는 양성이다. 벡터가 환자의 오른쪽 아래를 향한다.':'I와 aVF가 모두 음성이다. 벡터가 오른쪽 위로 향하는 극단축이다.'}</p>`;
  }
  function beat(x,y=95,scale=1){return `M${x-20} ${y}q5 -12 10 0h5l3 5 5 ${-45*scale} 5 ${58*scale} 5 ${-18*scale}h7q9 -18 18 0`;}
  const rates=[['50회/분',50],['60회/분',60],['75회/분',75],['100회/분',100],['150회/분',150],['불규칙',0]];
  function rate(i){const bpm=rates[i][1],times=bpm?Array.from({length:Math.floor(6/(60/bpm))},(_,n)=>.25+n*60/bpm):[.28,.85,1.93,2.32,3.45,4.05,4.42,5.48];
    return svg(grid()+line('M20 95H620','ecg-baseline')+times.map(t=>line(beat(20+t*100))).join('')+`<text x="25" y="170">0</text><text x="570" y="170">6초</text>`,'6초 리듬 모식도',640,190)+`<p>${bpm?`RR 간격 ${Number((60/bpm).toFixed(2))}초 = 큰 칸 ${300/bpm}개 → <strong>300 ÷ ${300/bpm} = ${bpm}회/분</strong>`:'이 모식도에는 6초 동안 QRS가 8개 있다. <strong>8 × 10 = 약 80회/분</strong>. 실제 기록이 10초라면 QRS 개수에 6을 곱한다.'}</p>`;
  }
  const bbb=[['정상','V1: 작은 r·깊은 S / V6: 큰 R·작은 s','양쪽 심실이 빠르게 활성화되어 QRS가 좁다.'],['우각차단','V1: rSR′ / V6: 넓은 S','우심실이 늦게 활성화되며 V1 끝에 R′가 더해진다. 우각차단(RBBB)은 말단 파형을 보자.'],['좌각차단','V1: QS 또는 rS / V6: 넓고 패인 R','좌심실로 우회해 전도되므로 좌측 유도의 R이 넓어진다. 좌각차단(LBBB)에서는 ST–T가 주 QRS와 반대 방향을 보이기 쉽다.']];
  function bundle(i){const paths=[['M20 95H100l7 -25 10 80 9 -55H230','M20 95H100l7 8 10 -75 8 85 8 -18H230'],['M20 95H90l10 -25 13 65 22 -90 18 45 10 5H230','M20 95H90l8 8 10 -65 12 75 28 15 18 -33H230'],['M20 95H90l15 45 32 13 30 -58H230','M20 95H90l20 -65 15 12 14 -12 28 65H230']][i];return svg(grid(640,180)+`<text x="50" y="27">V1</text><text x="365" y="27">V6</text><g transform="translate(28 10)">${line(paths[0])}</g><g transform="translate(342 10)">${line(paths[1])}</g>`,'각차단에 따른 V1·V6 QRS 비교',640,180)+`<div class="ecg-copy"><strong>${bbb[i][1]}</strong><p>${bbb[i][2]}</p></div>`;}
  const rhythmStates=[['동성리듬','동성 P → QRS, 일정한 RR. 먼저 정상의 반복 순서를 눈에 익히자.'],['심방세동','일정한 P파 없이 RR이 불규칙하다. 작은 기저선 진동 하나보다 박동 전체의 관계를 본다.'],['심방조동','심방의 F파가 계속 반복된다. 여기서는 4:1 전도를 그렸으며 실제 전도 비율은 달라질 수 있다.'],['PSVT','빠르고 규칙적인 좁은 QRS. 역행성 P파가 QRS에 겹치거나 바로 뒤에 숨을 수 있다.'],['심실빈맥','넓은 QRS가 빠르게 이어진다. 실제 판독에서는 상심실성 빈맥의 변행전도와 감별한다.']];
  function rhythmRow(i,y){const xs=i===1?[60,127,232,274,370,490,548]:i===3||i===4?[48,108,168,228,288,348,408,468,528,588]:[70,190,310,430,550];let b='';
    if(i===2)b+=line('M20 '+y+Array.from({length:20},()=> 'l23 0 7 -16 0 16').join(''),'ecg-faint-trace');
    else if(i===1)b+=line('M20 '+y+Array.from({length:60},(_,n)=>`l10 ${[3,-5,4,-2][n%4]}`).join(''),'ecg-faint-trace');
    else b+=line(`M20 ${y}H620`,'ecg-baseline');
    xs.forEach(x=>{if(i===0)b+=line(beat(x,y));else if(i===4)b+=line(`M${x-16} ${y}l9 -30 15 -7 11 55 13 -18`);else b+=line(`M${x-5} ${y}l4 5 5 -47 5 59 5 -17`);});return b;
  }
  function rhythms(i){return svg(grid(640,250)+`<text x="20" y="24">동성리듬 · 기준</text>`+rhythmRow(0,85)+`<text x="20" y="151">${rhythmStates[i][0]}</text>`+rhythmRow(i,215),'기준 동성리듬과 선택한 부정맥 비교',640,250)+`<p>${rhythmStates[i][1]}</p>`;}
  const avStates=[['정상','P 하나에 QRS 하나, PR도 일정하다.'],['1도','모든 P가 전도되지만 PR이 0.20초보다 길다.'],['Mobitz I','PR이 점점 길어지다가 QRS가 탈락하고, 다음 주기가 다시 시작한다.'],['Mobitz II','전도된 박동의 PR은 일정한데 QRS가 갑자기 탈락한다.'],['2:1','P 두 개에 QRS 하나가 전도된다. 이 배열만으로 Mobitz I·II를 가르기 어렵다.'],['고도 차단','연속된 P 두 개 이상이 전도되지 않지만, 일부 P 뒤에는 고정된 PR로 QRS가 나온다.'],['완전 차단','P와 QRS가 각자 일정한 속도로 진행한다. 고정된 PR 관계가 없다.']];
  function avblock(i){let b=grid(640,230)+'<text x="15" y="28">P</text><text x="15" y="135">QRS</text>';const ps=[55,125,195,265,335,405,475,545];ps.forEach((x,n)=>{b+=line(`M${x-12} 65Q${x} 30 ${x+12} 65`);let delay=i===1?38:i===2?[13,23,33,0][n%4]:18;let pass=i===2?n%4!==3:i===3?n!==3&&n!==6:i===4?n%2===0:i===5?n%3===0:i!==6;
      if(pass){const q=x+delay;b+=`<path class="ecg-link" d="M${x} 75L${q} 142"/>`+line(`M${q-9} 190l4 5 5 -47 5 62 6 -20`);}else if(i!==6)b+=`<text class="ecg-drop" x="${x-7}" y="199">×</text>`;});
    if(i===6)[65,187,309,431,553].forEach(q=>b+=line(`M${q-9} 190l4 5 5 -47 5 62 6 -20`));
    return svg(b,'P파와 QRS를 분리해 보는 방실전도 모식도',640,230)+`<p>${avStates[i][1]}</p>`;
  }
  const labs={
    waveform:{title:'한 박동을 부분별로 짚어보기',items:waveParts.map(p=>p[0]),draw:waveform},
    leads:{title:'12유도에서 같은 부위 찾기',items:leadSets,draw:leads},
    axis:{title:'축을 바꾸면 QRS 부호도 바뀐다',items:axes.map(a=>a[0]),draw:axis},
    rate:{title:'RR 간격과 심박수',items:rates.map(a=>a[0]),draw:rate},
    bundle:{title:'V1과 V6를 나란히 비교',items:bbb.map(a=>a[0]),draw:bundle},
    rhythms:{title:'같은 길이에서 리듬 비교',items:rhythmStates.map(a=>a[0]),draw:rhythms},
    avblock:{title:'P와 QRS의 관계를 따라가기',items:avStates.map(a=>a[0]),draw:avblock}
  };
  window.renderECGLearningBlock=function(line){
    const brady=window.renderBradyLearningBlock?.(line);if(brady)return brady;
    const recall=window.renderECGRecallBlock?.(line);if(recall)return recall;
    if(line.startsWith('@ecgcases '))return gallery(line.slice(10).trim());
    if(!line.startsWith('@ecg '))return '';
    const id=line.slice(5).trim(),l=labs[id];if(!l)return '';
    return `<section class="ecg-learning ecg-lab" data-ecg-lab="${id}"><div class="ecg-heading"><strong>${l.title}</strong><span>눌러서 비교</span></div><div class="ecg-buttons" role="group" aria-label="${l.title}">${buttons(l.items,'data-ecg-state')}</div><div class="ecg-lab-content" aria-live="polite">${l.draw(0)}</div>${note(id==='avblock'?'전도 관계를 익히는 모식도 · P와 QRS를 위아래로 분리했습니다. 실제 간격은 원본 심전도에서 확인하세요.':'이해를 위한 모식도 · 실제 파형과 수치 측정은 원본 심전도에서 확인하세요.')}</section>`;
  };
  window.bindECGLearning=function(container){
    window.bindBradyLearning?.(container);
    window.bindECGRecall?.(container);
    container.querySelectorAll('[data-ecg-lab]:not([data-ecg-bound])').forEach(block=>{block.dataset.ecgBound='1';block.addEventListener('click',e=>{const b=e.target.closest('[data-ecg-state]');if(!b)return;block.querySelectorAll('[data-ecg-state]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));block.querySelector('.ecg-lab-content').innerHTML=labs[block.dataset.ecgLab].draw(Number(b.dataset.ecgState));});});
    container.querySelectorAll('[data-ecg-gallery]:not([data-ecg-bound])').forEach(block=>{block.dataset.ecgBound='1';block.addEventListener('click',e=>{
      const caseButton=e.target.closest('[data-ecg-case-button]'),stepButton=e.target.closest('[data-ecg-step]'),toggle=e.target.closest('[data-ecg-layer]');
      if(!caseButton&&!stepButton&&!toggle)return;
      if(toggle){const show=block.dataset.ecgShow!=='true';block.dataset.ecgShow=String(show);block.querySelectorAll('.ecg-overlay,.ecg-markers').forEach(el=>el.toggleAttribute('hidden',!show));toggle.setAttribute('aria-pressed',String(show));toggle.textContent=show?'학습 표시 숨기기':'학습 표시 켜기';return;}
      if(caseButton){block.dataset.ecgCase=caseButton.dataset.ecgCaseButton;block.dataset.ecgStepIndex='0';block.querySelectorAll('[data-ecg-case-button]').forEach(b=>b.setAttribute('aria-pressed',String(b===caseButton)));}
      if(stepButton)block.dataset.ecgStepIndex=stepButton.dataset.ecgStep;
      const g=window.CARDIO_ECG_LEARNING.groups[block.dataset.ecgGallery];block.querySelector('.ecg-case-content').innerHTML=caseBody(g.cases[Number(block.dataset.ecgCase)],Number(block.dataset.ecgStepIndex),block.dataset.ecgShow==='true');
      if(stepButton)block.querySelector(`[data-ecg-step="${block.dataset.ecgStepIndex}"]`)?.focus({preventScroll:true});
    });});
  };
})();
