/* 위키 본문 안에서 사용하는 학습 블록. 글과 각주·문항 링크는 기존 편집 문법을 공유한다. */
function renderWikiLearningBlock(line, course, footnotes) {
  const inline = value => renderWikiInline(value, course, footnotes);
  const pharmacology = renderPharmacologyBlock(line, course, footnotes);
  if (pharmacology) return pharmacology;
  const lipid = renderLipidLearningBlock(line, course, footnotes);
  if (lipid) return lipid;
  const angina = renderAnginaLearningBlock(line, course, footnotes);
  if (angina) return angina;
  const hypertension = renderHypertensionLearningBlock(line, course, footnotes);
  if (hypertension) return hypertension;
  const heartFailure = renderHeartFailureLearningBlock(line, course, footnotes);
  if (heartFailure) return heartFailure;
  const arrhythmia = renderArrhythmiaLearningBlock(line, course, footnotes);
  if (arrhythmia) return arrhythmia;
  if (line.startsWith('@flow ')) {
    const links=[];
    const protectedText=line.slice(6).replace(/\[\[[^\]]+\]\]/g,link=>`\u0001${links.push(link)-1}\u0002`);
    const steps=protectedText.split('|').map(part=>part.replace(/\u0001(\d+)\u0002/g,(_,i)=>links[Number(i)]));
    return `<ol class="learning-flow">${steps.map((part,i)=>`<li><span class="learning-step">${i+1}</span><div>${inline(part.trim())}</div></li>`).join('')}</ol>`;
  }
  if (line.startsWith('@recall ')) {
    const items = line.slice(8).split(';;').map(part=>part.split('=>')).filter(pair=>pair.length>=2);
    return `<details class="learning-recall"><summary><span>백지복습</span><small>${items.length}가지 질문 · 펼쳐서 떠올려 보기</small></summary><ol>${items.map(([q,...answer])=>`<li><p>${inline(q.trim())}</p><details class="learning-answer"><summary>답 확인</summary><div>${inline(answer.join('=>').trim())}</div></details></li>`).join('')}</ol></details>`;
  }
  if (line.startsWith('@detail ')) return `<details class="learning-detail"><summary>${inline(line.slice(8))}</summary><div class="learning-detail-body">`;
  if (line==='@enddetail') return '</div></details>';
  if (line.startsWith('@source ')) return `<p class="learning-source">${inline(line.slice(8))}</p>`;
  if (line.startsWith('@questions ')) return `<div class="learning-questions"><span>연결 문항</span><div>${inline(line.slice(11))}</div></div>`;
  if (line==='@ap') return learningAPMarkup();
  if (line==='@rate') return learningRateMarkup();
  if (line==='@pvloop') return learningPVLoopMarkup();
  if (line==='@pvload') return learningPVLoadMarkup();
  if (line==='@flowlab') return learningFlowLabMarkup();
  if (line==='@starling') return learningStarlingMarkup();
  if (line==='@bplab') return learningBPLabMarkup();
  if (line==='@cardiacoutput') return learningCOMarkup();
  if (line==='@integration') return learningIntegrationMarkup();
  return '';
}

const learningAPPhases = [
  ['0','Upstroke','빠른 Na⁺ 유입','Voltage-gated Na⁺ channel이 열리면 Na⁺가 급격히 들어온다. 탈분극이 더 많은 Na⁺ channel을 열어 가파른 상승부를 만든다.','M115 230 L115 42',115,125],
  ['1','Notch','Iₜₒ → 잠깐 K⁺ 유출','Na⁺ channel은 빠르게 불활성화되고, transient outward K⁺ current가 짧은 재분극을 만든다. Iₜₒ가 곧 불활성화되어 하강이 오래 이어지지 않는다.','M115 42 Q126 90 145 84',137,68],
  ['2','Plateau','Ca²⁺ 유입 ↔ K⁺ 유출','L-type Ca²⁺ channel의 느린 불활성화로 내향 전류가 오래 유지된다. Ca²⁺ 유입과 K⁺ 유출이 균형을 이루며, 들어온 Ca²⁺는 수축의 시작 신호가 된다.','M145 84 C180 60 241 70 273 103',210,76],
  ['3','Repolarization','Ca²⁺ 유입 ↓ · K⁺ 유출 ↑','ICa,L이 줄고 IKr·IKs를 통한 K⁺ 유출이 우세해진다. 후반에는 IK1도 재분극을 돕는다.','M273 103 C310 140 301 220 370 230',325,170],
  ['4','Resting potential','IK1 → Eₖ 가까이 유지','휴지기에 K⁺ conductance가 높아 막전위가 Eₖ에 가깝게 유지된다. 이때는 K⁺의 driving force가 작으므로 실제 순전류도 작다.','M370 230 L465 230',418,230]
];
function learningAPMarkup() {
  return `<div class="learning-interactive" data-learning-ap><div class="learning-eyebrow">VENTRICULAR ACTION POTENTIAL</div><div class="learning-graph-layout"><svg class="learning-ap-svg" viewBox="0 0 510 285" role="img" aria-label="심실 활동전위의 phase 0부터 4까지"><path class="learning-axis" d="M55 24 V250 H487"/><path class="learning-gridline" d="M55 80 H485 M55 230 H485"/><text x="18" y="36">mV</text><text x="30" y="85">0</text><text x="15" y="234">−90</text><text x="450" y="276">시간</text><path class="learning-ap-base" d="M65 230 H115 L115 42 Q126 90 145 84 C180 60 241 70 273 103 C310 140 301 220 370 230 H465"/>${learningAPPhases.map((a,i)=>`<path data-ap-path="${i}" class="learning-ap-segment ${i===0?'is-active':''}" d="${a[4]}"/><text class="learning-phase-label" x="${a[5]}" y="${a[6]-17}">${a[0]}</text>`).join('')}</svg><div><div class="learning-phase-buttons" role="group" aria-label="활동전위 단계 선택">${learningAPPhases.map((a,i)=>`<button type="button" data-ap-phase="${i}" aria-pressed="${i===0}">${a[0]}</button>`).join('')}</div><div class="learning-ap-copy" aria-live="polite">${learningAPCopy(0)}</div></div></div><small class="learning-graph-note">개념도 · 단계 번호를 누르면 해당 구간과 이온 이동이 함께 표시됩니다.</small></div>`;
}
function learningAPCopy(i){const a=learningAPPhases[i];return `<h6>Phase ${a[0]} · ${a[1]}</h6><strong>${a[2]}</strong><p>${a[3]}</p>`;}
const learningRateStates = [
  {name:'기본',mdp:-65,tp:-40,slope:.16,text:'출발점(MDP)에서 역치(TP)까지 올라가면 다음 phase 0이 시작된다.'},
  {name:'기울기 ↓',mdp:-65,tp:-40,slope:.10,text:'출발점과 역치는 같아도 천천히 올라가면 도착이 늦어진다. Phase 4 기울기 ↓ → 박동 빈도 ↓.'},
  {name:'MDP 더 음성',mdp:-75,tp:-40,slope:.16,text:'같은 기울기로 더 아래에서 출발하므로 역치까지 갈 거리가 길어진다. MDP가 더 음성 → 박동 빈도 ↓.'},
  {name:'역치 ↑',mdp:-65,tp:-30,slope:.16,text:'출발점과 기울기는 그대로인데 도착해야 할 역치가 높아진다. 역치가 덜 음성 → 박동 빈도 ↓.'}
];
function learningRatePlot(state=0){
  const s=learningRateStates[state], y=v=>240-(v+80)*2, start=85;
  const baseEnd=start+25/.16, end=start+(s.tp-s.mdp)/s.slope;
  return `<svg viewBox="0 0 510 290" role="img" aria-label="${s.name}: 역치 도달 시간 비교"><path class="learning-axis" d="M55 24 V250 H480"/><text x="16" y="35">mV</text><text x="448" y="277">시간</text><path class="learning-rate-base" d="M85 ${y(-65)} L${baseEnd} ${y(-40)} L${baseEnd+8} ${y(15)}"/><path class="learning-gridline" d="M55 ${y(s.tp)} H475"/><text x="399" y="${y(s.tp)-7}">TP ${s.tp}</text><path class="learning-rate-active" d="M${start} ${y(s.mdp)} L${end} ${y(s.tp)} Q${end+8} ${y(10)} ${end+19} ${y(15)} Q${end+46} ${y(15)} ${end+66} ${y(s.mdp)}"/><circle cx="85" cy="${y(s.mdp)}" r="5" class="learning-dot"/><text x="62" y="${y(s.mdp)+22}">MDP ${s.mdp}</text><path class="learning-rate-time" d="M${end} ${y(s.tp)} V250"/><text x="${end-38}" y="275">다음 박동</text></svg>`;
}
function learningRateMarkup(){return `<div class="learning-interactive" data-learning-rate><div class="learning-eyebrow">SA NODE · 역치까지 얼마나 걸릴까?</div><div class="learning-rate-buttons" role="group" aria-label="SA node 변화 선택">${learningRateStates.map((s,i)=>`<button type="button" data-rate-state="${i}" aria-pressed="${i===0}">${s.name}</button>`).join('')}</div><div class="learning-rate-plot">${learningRatePlot()}</div><p class="learning-rate-copy" aria-live="polite">${learningRateStates[0].text}</p><small class="learning-graph-note">원리 비교를 위한 개념도 · 회색 점선은 기본 상태이며, 선택한 변수 하나만 바꿉니다.</small></div>`;}

let learningExamHistorySerial=0;
function bindWikiLearning(container,course){
  bindPharmacologyLearning(container);
  bindLipidLearning(container);
  bindAnginaLearning(container);
  bindHypertensionLearning(container);
  bindHeartFailureLearning(container);
  bindArrhythmiaLearning(container);
  bindLearningPV(container);
  bindLearningFlowLab(container);
  bindLearningStarling(container);
  bindLearningBPLab(container);
  bindLearningCO(container);
  bindLearningIntegration(container);
  const note=container.querySelector('.wiki-note');
  if(note && /@(flow|recall|ap|rate)\b/.test(lectureNoteSources[course.id]||'')) note.classList.add('wiki-learning');
  container.querySelectorAll('[data-learning-ap]:not([data-learning-bound])').forEach(block=>{
    block.dataset.learningBound='1';
    block.querySelectorAll('[data-ap-phase]').forEach(button=>button.addEventListener('click',()=>{
      const i=Number(button.dataset.apPhase);
      block.querySelectorAll('[data-ap-phase]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      block.querySelectorAll('[data-ap-path]').forEach(p=>p.classList.toggle('is-active',Number(p.dataset.apPath)===i));
      block.querySelector('.learning-ap-copy').innerHTML=learningAPCopy(i);
    }));
  });
  container.querySelectorAll('[data-learning-rate]:not([data-learning-bound])').forEach(block=>{
    block.dataset.learningBound='1';
    block.querySelectorAll('[data-rate-state]').forEach(button=>button.addEventListener('click',()=>{
      const i=Number(button.dataset.rateState);
      block.querySelectorAll('[data-rate-state]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      block.querySelector('.learning-rate-plot').innerHTML=learningRatePlot(i);
      block.querySelector('.learning-rate-copy').textContent=learningRateStates[i].text;
    }));
  });
  if(!note?.classList.contains('wiki-learning'))return;
  const sections=wikiEditableSections(lectureNoteSources[course.id]||'');
  note.querySelectorAll('h5[data-wiki-section]').forEach(heading=>{
    if(heading.querySelector('.learning-exam-toggle'))return;
    const source=sections.find(s=>s.slug===heading.dataset.wikiSection)?.source||'';
    const ids=[...new Set([...source.matchAll(/\{\{([^}]+)\}\}/g)].map(m=>canonicalJblNumber(m[1])))];
    const qs=ids.map(id=>jblQuestions.find(q=>canonicalJblNumber(q.globalNumber)===id)).filter(Boolean);
    const occurrences=new Map();
    qs.forEach(q=>occurrences.set(`${q.year}:${q.originalNumber||q.globalNumber}`,q));
    if(!occurrences.size)return;
    const button=document.createElement('button');button.type='button';button.className='learning-exam-toggle';button.setAttribute('aria-expanded','false');
    button.innerHTML=`<span><strong>${occurrences.size}</strong>회 출제</span><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>`;
    button.setAttribute('aria-label',`${occurrences.size}회 출제 · 연결 문항 펼치기`);
    const panel=document.createElement('div');panel.className='learning-exam-history';panel.hidden=true;
    panel.id=`learning-exam-history-${++learningExamHistorySerial}`;
    button.setAttribute('aria-controls',panel.id);
    const years=[...new Set([...occurrences.values()].map(q=>q.year))].sort((a,b)=>b-a);
    panel.innerHTML=years.map(year=>`<div><strong>${year}</strong><span>${[...occurrences.values()].filter(q=>q.year===year).sort((a,b)=>compareJblNumbers(a.globalNumber,b.globalNumber)).map(q=>`<a class="jbl-question-link" href="#jbl-q-${escapeHtml(q.globalNumber)}" data-jbl-question-link="${escapeHtml(q.globalNumber)}">${escapeHtml(q.globalNumber)}</a>`).join(' ')}</span></div>`).join('');
    heading.append(button);heading.after(panel);
    button.addEventListener('click',()=>{panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));button.setAttribute('aria-label',`${occurrences.size}회 출제 · 연결 문항 ${panel.hidden?'펼치기':'접기'}`);});
  });
}

// Two separate textbook comparisons: a local section at fixed flow, or a whole
// uniform tube at fixed pressure difference. Values are ratios to r = 1.
function learningFlowLabValues(mode,r){
  const area=r*r;
  return {area,resistance:1/(area*area),flow:mode===0?1:area*area,velocity:mode===0?1/area:area};
}
function learningFlowRatio(value){
  if(value===1)return '1배';
  if(value<1 && Number.isInteger(1/value))return `1/${1/value}`;
  return `${Number(value.toFixed(3))}배`;
}
function learningFlowLabPlot(mode,r){
  const center=122,base=38,h=base*r;
  const contour=mode===0
    ? `M40 ${center-base} H150 C180 ${center-base} 190 ${center-h} 220 ${center-h} H300 C330 ${center-h} 340 ${center-base} 370 ${center-base} H480 V${center+base} H370 C340 ${center+base} 330 ${center+h} 300 ${center+h} H220 C190 ${center+h} 180 ${center+base} 150 ${center+base} H40 Z`
    : `M40 ${center-h} H480 V${center+h} H40 Z`;
  return `<svg viewBox="0 0 520 230" role="img" aria-label="${mode===0?'같은 관의 두 구간, 유량 고정':'관 전체의 반지름 변화, 압력 차이 고정'}: 반지름 ${learningFlowRatio(r)}"><path class="learning-flowlab-reference" d="M40 ${center-base} H480 M40 ${center+base} H480"/><path class="learning-flowlab-tube" d="${contour}"/><path class="learning-flowlab-arrow" d="M65 122 H120 M111 115 L120 122 L111 129 M235 122 H285 M276 115 L285 122 L276 129 M395 122 H450 M441 115 L450 122 L441 129"/><text x="260" y="27" text-anchor="middle">${mode===0?'앞뒤에 같은 Q가 흐른다':'같은 ΔP · 길이와 점도 고정'}</text><text x="260" y="218" text-anchor="middle">${mode===0?'가운데 구간':'관 전체'}의 r = 기준의 ${learningFlowRatio(r)}</text></svg>`;
}
function learningFlowLabCopy(mode,r){
  const x=learningFlowLabValues(mode,r),ratio=learningFlowRatio;
  const facts=mode===0?[['유량 Q',ratio(x.flow)],['비교 구간 A',ratio(x.area)],['비교 구간 v',ratio(x.velocity)]]:[['관 전체 R',ratio(x.resistance)],['관 전체 Q',ratio(x.flow)],['관 안의 v',ratio(x.velocity)]];
  const explanation=mode===0
    ? `앞뒤로 같은 양이 통과한다. 반지름이 기준의 ${ratio(r)}일 때 단면적은 ${ratio(x.area)}, 그 구간의 속도는 ${ratio(x.velocity)}로 바뀐다. Q를 같게 두고 v = Q/A로 비교한 결과다.`
    : `두 관의 길이·점도·압력 차이를 같게 둔다. 반지름이 기준의 ${ratio(r)}일 때 저항은 ${ratio(x.resistance)}, 유량은 ${ratio(x.flow)}로 바뀐다. 속도는 Q/A에 따라 ${ratio(x.velocity)}로 계산된다.`;
  return `<div class="learning-flowlab-facts">${facts.map(([label,value])=>`<div><span>${label}</span><strong>${value}</strong></div>`).join('')}</div><p>${explanation}</p>`;
}
function learningFlowLabMarkup(){
  return `<div class="learning-interactive learning-flowlab" data-learning-flowlab><div class="learning-eyebrow">같게 둔 조건부터 선택하기</div><div class="learning-rate-buttons" role="group" aria-label="혈류 비교 조건"><button type="button" data-flowlab-mode="0" aria-pressed="true">한 관의 두 구간 · Q 고정</button><button type="button" data-flowlab-mode="1" aria-pressed="false">관 전체 변화 · ΔP 고정</button></div><div class="learning-flowlab-radius"><span>반지름</span><div class="learning-phase-buttons" role="group" aria-label="반지름 비율">${[.5,1,2].map(r=>`<button type="button" data-flowlab-radius="${r}" aria-pressed="${r===.5}">${r===.5?'1/2':r}배</button>`).join('')}</div></div><div data-flowlab-plot>${learningFlowLabPlot(0,.5)}</div><div data-flowlab-copy aria-live="polite">${learningFlowLabCopy(0,.5)}</div><small class="learning-graph-note">두 비교를 위한 원리 모형 · 기준 r = 1. 실제 협착에서는 통로의 저항 변화에 따라 전체 Q도 달라질 수 있습니다.</small></div>`;
}
function bindLearningFlowLab(container){
  container.querySelectorAll('[data-learning-flowlab]:not([data-learning-bound])').forEach(block=>{
    block.dataset.learningBound='1';let mode=0,r=.5;
    const update=()=>{
      block.querySelectorAll('[data-flowlab-mode]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.flowlabMode)===mode)));
      block.querySelectorAll('[data-flowlab-radius]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.flowlabRadius)===r)));
      block.querySelector('[data-flowlab-plot]').innerHTML=learningFlowLabPlot(mode,r);
      block.querySelector('[data-flowlab-copy]').innerHTML=learningFlowLabCopy(mode,r);
    };
    block.querySelectorAll('[data-flowlab-mode]').forEach(b=>b.addEventListener('click',()=>{mode=Number(b.dataset.flowlabMode);update();}));
    block.querySelectorAll('[data-flowlab-radius]').forEach(b=>b.addEventListener('click',()=>{r=Number(b.dataset.flowlabRadius);update();}));
  });
}

// Classical four-pressure teaching model: k is fixed and the output is pressure.
const learningStarlingPresets = [
  {label:'기본 예시',values:[30,5,0,25]},
  {label:'Pc 감소',values:[15,5,0,25]},
  {label:'Pc 증가',values:[40,5,0,25]},
  {label:'혈장 단백질 감소',values:[30,5,0,15]},
  {label:'간질 단백질 증가',values:[30,15,0,25]}
];
const learningStarlingFields = [
  {key:'pc',symbol:'Pc',label:'모세혈관 정수압',direction:'밖으로 민다',min:0,max:60},
  {key:'piProtein',symbol:'πi',label:'간질 교질삼투압',direction:'밖으로 당긴다',min:0,max:30},
  {key:'pi',symbol:'Pi',label:'간질 정수압',direction:'안으로 민다',min:-10,max:20},
  {key:'pp',symbol:'πp',label:'혈장 교질삼투압',direction:'안으로 당긴다',min:0,max:40}
];
function learningStarlingValues(values){
  const [pc,piProtein,pi,pp]=values;
  const outward=pc+piProtein,inward=pi+pp;
  return {outward,inward,net:outward-inward};
}
function learningStarlingResult(values){
  const {outward,inward,net}=learningStarlingValues(values);
  const direction=net>0?'혈관 → 간질 · 여과':net<0?'간질 → 혈관 · 재흡수':'두 힘이 균형 · 순이동 0';
  return `<svg viewBox="0 0 500 255" role="img" aria-label="밖으로 ${outward}, 안으로 ${inward} mmHg. 순여과압 ${net} mmHg. ${direction}"><rect class="learning-starling-blood" x="12" y="10" width="476" height="115" rx="18"/><text x="250" y="42" text-anchor="middle">혈관 안</text><path class="learning-starling-out" d="M140 72 V179 M127 164 L140 179 L153 164"/><path class="learning-starling-in" d="M360 179 V72 M347 87 L360 72 L373 87"/><text x="140" y="212" text-anchor="middle">밖으로 ${outward}</text><text x="360" y="212" text-anchor="middle">안으로 ${inward}</text><text x="250" y="247" text-anchor="middle">간질 · 혈관 밖</text></svg><div class="learning-starling-result"><span>순여과압 · (${values[0]} + ${values[1]}) − (${values[2]} + ${values[3]})</span><strong>${net>0?'+':''}${net} <small>mmHg</small></strong><b>${direction}</b></div>`;
}
function learningStarlingMarkup(){
  const values=learningStarlingPresets[0].values;
  return `<div class="learning-interactive learning-starling" data-learning-starling><div class="learning-eyebrow">네 압력을 바꾸어 물의 방향 따라가기</div><div class="learning-rate-buttons" role="group" aria-label="Starling 압력 예시">${learningStarlingPresets.map((p,i)=>`<button type="button" data-starling-preset="${i}" aria-pressed="${i===0}">${p.label}</button>`).join('')}</div><div class="learning-starling-layout"><div data-starling-result aria-live="polite">${learningStarlingResult(values)}</div><div class="learning-starling-controls">${learningStarlingFields.map((f,i)=>`<label><span><b>${f.symbol}</b> ${f.label}<output data-starling-output="${i}">${values[i]}</output></span><input type="range" min="${f.min}" max="${f.max}" step="1" value="${values[i]}" data-starling-pressure="${i}" aria-label="${f.symbol} ${f.label}, mmHg"><small>${f.direction}</small></label>`).join('')}</div></div><small class="learning-graph-note">강의의 고전적 Starling 모형 · 모든 압력은 mmHg. k는 일정하며, 계산값은 유량이 아닌 순여과압입니다. Pi가 음수이면 간질 쪽의 흡인 효과가 여과를 돕습니다.</small></div>`;
}
function bindLearningStarling(container){
  container.querySelectorAll('[data-learning-starling]:not([data-learning-bound])').forEach(block=>{
    block.dataset.learningBound='1';
    let values=[...learningStarlingPresets[0].values];
    const update=()=>{
      block.querySelectorAll('[data-starling-pressure]').forEach(input=>input.value=values[Number(input.dataset.starlingPressure)]);
      block.querySelectorAll('[data-starling-output]').forEach(out=>out.textContent=values[Number(out.dataset.starlingOutput)]);
      block.querySelectorAll('[data-starling-preset]').forEach(b=>b.setAttribute('aria-pressed',String(learningStarlingPresets[Number(b.dataset.starlingPreset)].values.every((v,i)=>v===values[i]))));
      block.querySelector('[data-starling-result]').innerHTML=learningStarlingResult(values);
    };
    block.querySelectorAll('[data-starling-pressure]').forEach(input=>input.addEventListener('input',()=>{
      values[Number(input.dataset.starlingPressure)]=Number(input.value);update();
    }));
    block.querySelectorAll('[data-starling-preset]').forEach(b=>b.addEventListener('click',()=>{
      values=[...learningStarlingPresets[Number(b.dataset.starlingPreset)].values];update();
    }));
  });
}

// Cardiac pump: a qualitative diagram paired with the original lecture figures.
const learningPVPhases = [
  {label:'A–B',name:'급속 충만',path:'M155 258 Q177 270 215 267',valves:['열림','닫힘'],volume:'ESV에서 빠르게 증가',pressure:'지속적인 이완으로 잠시 감소',text:'승모판이 열린 A에서 혈액이 들어온다. 심실이 계속 이완하므로 용적이 늘어도 압력은 잠깐 내려갈 수 있다.'},
  {label:'B–C',name:'충만 후반',path:'M215 267 Q310 268 385 250',valves:['열림','닫힘'],volume:'증가하여 EDV에 도달',pressure:'조금씩 증가',text:'느린 충만에 이어 심방 수축이 마지막 혈액을 보탠다. 수축 직전 C의 용적이 EDV다.'},
  {label:'C–D',name:'등용적 수축',path:'M385 250 L385 132',valves:['닫힘','닫힘'],volume:'EDV로 일정',pressure:'빠르게 증가 · dP/dtmax',text:'C에서 승모판이 닫히며 S1이 발생한다. 대동맥판이 열리는 D까지 혈액이 나가지 않아 용적은 일정하다.'},
  {label:'D–E',name:'급속 박출',path:'M385 132 Q335 48 245 50',valves:['닫힘','열림'],volume:'빠르게 감소',pressure:'계속 증가하여 정점 도달',text:'D에서 좌심실압이 대동맥압을 넘어 대동맥판이 열린다. 혈액이 빠르게 나가며 용적이 줄고, 압력은 E까지 더 올라간다.'},
  {label:'E–F',name:'감속 박출',path:'M245 50 Q180 48 155 95',valves:['닫힘','열림'],volume:'더 천천히 감소',pressure:'감소',text:'수축이 약해지며 박출 속도가 느려진다. F에서 대동맥판이 닫히고 S2가 발생하며, ESV가 남는다.'},
  {label:'F–A',name:'등용적 이완',path:'M155 95 L155 258',valves:['닫힘','닫힘'],volume:'ESV로 일정',pressure:'빠르게 감소',text:'두 판막이 닫힌 동안 심근이 이완하여 압력이 내려간다. 좌심실압이 좌심방압보다 낮아지면 A에서 승모판이 열린다.'}
];
function learningPVLoopPlot(index=0){
  const points=[['A',155,258,-20,0],['B',215,267,-4,22],['C',385,250,12,5],['D',385,132,12,0],['E',245,50,0,-14],['F',155,95,-20,-2]];
  return `<svg viewBox="0 0 490 330" role="img" aria-label="P–V loop ${learningPVPhases[index].label} ${learningPVPhases[index].name}"><path class="learning-axis" d="M65 30 V290 H450"/><text x="13" y="24">압력</text><text x="430" y="318">용적</text><path class="learning-gridline" d="M155 278 V290 M385 260 V290"/><text x="138" y="312">ESV</text><text x="368" y="312">EDV</text><path class="learning-pv-fill" d="M155 258 Q177 270 215 267 Q310 268 385 250 L385 132 Q335 48 245 50 Q180 48 155 95 Z"/>${learningPVPhases.map((s,i)=>`<path class="learning-pv-segment ${i===index?'is-active':''}" d="${s.path}"/>`).join('')}<text x="264" y="189" text-anchor="middle">↶ 반시계방향</text><text x="264" y="216" text-anchor="middle">폭 = SV</text>${points.map(([letter,x,y,dx,dy])=>`<circle class="learning-pv-point" cx="${x}" cy="${y}" r="3"/><text class="learning-phase-label" x="${x+dx}" y="${y+dy}">${letter}</text>`).join('')}</svg>`;
}
function learningPVLoopCopy(index){
  const s=learningPVPhases[index];
  return `<h6>${s.label} · ${s.name}</h6><div class="learning-valves"><span>승모판 <b>${s.valves[0]}</b></span><span>대동맥판 <b>${s.valves[1]}</b></span></div><dl class="learning-pv-facts"><div><dt>용적</dt><dd>${s.volume}</dd></div><div><dt>압력</dt><dd>${s.pressure}</dd></div></dl><p>${s.text}</p>`;
}
function learningPVLoopMarkup(){
  return `<div class="learning-interactive" data-learning-pvloop><div class="learning-eyebrow">한 박동 · 구간을 눌러 따라가기</div><div class="learning-phase-buttons" role="group" aria-label="P–V loop 구간 선택">${learningPVPhases.map((s,i)=>`<button type="button" data-pv-phase="${i}" aria-pressed="${i===0}">${s.label}</button>`).join('')}</div><div class="learning-graph-layout"><div data-pv-plot>${learningPVLoopPlot()}</div><div class="learning-pv-copy" aria-live="polite">${learningPVLoopCopy(0)}</div></div><small class="learning-graph-note">강의록의 A–F 순서를 따라 그린 개념도 · 각 구간 내부의 판막 상태를 표시합니다.</small></div>`;
}
const learningPVLoads=[
  {label:'기본',edv:120,esv:50,e:2.5,opening:80,peak:120,changes:['EDV: 기본','ESV: 기본','SV = EDV − ESV'],text:'오른쪽 경계는 EDV, 왼쪽 경계는 ESV다. 회색 점선은 항상 이 기본 상태를 나타낸다.'},
  {label:'Preload ↑',edv:145,esv:50,e:2.5,opening:80,peak:130,changes:['EDV ↑','ESV 유지','SV ↑'],text:'더 많은 혈액을 받아 오른쪽 경계가 이동한다. 수축력과 후부하가 같은 비교에서는 ESV가 대체로 유지되어, loop의 폭이 넓어진다.'},
  {label:'Afterload ↑',edv:120,esv:65,e:2.5,opening:110,peak:150,changes:['EDV 유지','ESV ↑','SV·EF ↓'],text:'출구 쪽 압력이 높아져 더 높은 압력으로 박출해야 한다. 첫 박동에서 더 많은 혈액이 남아 ESV가 커지고, loop는 높고 좁아진다.'},
  {label:'Contractility ↑',edv:120,esv:37,e:3.7,opening:80,peak:135,changes:['EDV 유지','ESV ↓','SV·EF ↑'],text:'같은 EDV에서 더 잘 비워 왼쪽 경계가 이동한다. ESPVR의 기울기가 가팔라지고 loop의 폭이 넓어진다.'}
];
function learningPVLoadPath(s){
  const x=v=>65+v*2.45,y=p=>290-p*1.42,edp=s.edv>120?15:10,endp=s.e*(s.esv-10);
  return `M${x(s.esv)} ${y(5)} Q${x((s.edv+s.esv)/2)} ${y(2)} ${x(s.edv)} ${y(edp)} L${x(s.edv)} ${y(s.opening)} C${x(s.edv-12)} ${y(s.peak)} ${x(s.esv+25)} ${y(s.peak+6)} ${x(s.esv)} ${y(endp)} Z`;
}
function learningPVLoadPlot(index=0){
  const s=learningPVLoads[index],x=v=>65+v*2.45,y=p=>290-p*1.42;
  return `<svg viewBox="0 0 490 340" role="img" aria-label="${s.label}에서 P–V loop 변화"><path class="learning-axis" d="M65 34 V300 H455"/><text x="16" y="29">압력</text><text x="430" y="329">용적</text><path class="learning-rate-base" d="${learningPVLoadPath(learningPVLoads[0])}"/><path class="learning-pv-load-area" d="${learningPVLoadPath(s)}"/><path class="learning-pv-espvr" d="M${x(10)} ${y(0)} L${x(10+170/s.e)} ${y(170)}"/><text x="${x(10+170/s.e)+5}" y="${y(170)}">ESPVR</text><path class="learning-gridline" d="M${x(s.esv)} ${y(5)} V300 M${x(s.edv)} ${y(s.edv>120?15:10)} V300"/><text x="${x(s.esv)-13}" y="324">ESV</text><text x="${x(s.edv)-13}" y="324">EDV</text></svg>`;
}
function learningPVLoadCopy(index){const s=learningPVLoads[index];return `<div class="learning-pv-results">${s.changes.map(x=>`<strong>${x}</strong>`).join('')}</div><p>${s.text}</p>`;}
function learningPVLoadMarkup(){
  return `<div class="learning-interactive" data-learning-pvload><div class="learning-eyebrow">같은 심장에서 조건 하나만 바꾸면?</div><div class="learning-rate-buttons" role="group" aria-label="P–V loop 조건 선택">${learningPVLoads.map((s,i)=>`<button type="button" data-pv-load="${i}" aria-pressed="${i===0}">${s.label}</button>`).join('')}</div><div class="learning-graph-layout"><div data-pv-load-plot>${learningPVLoadPlot()}</div><div class="learning-pv-load-copy" aria-live="polite">${learningPVLoadCopy(0)}</div></div><small class="learning-graph-note">방향을 비교하는 개념도 · 수치 예측 모형이 아닙니다. 한 변수만 바꾼 초기 반응을 비교하며, 회색 점선은 기본 loop입니다.</small></div>`;
}
function bindLearningPV(container){
  container.querySelectorAll('[data-learning-pvloop]:not([data-learning-bound])').forEach(block=>{
    block.dataset.learningBound='1';
    block.querySelectorAll('[data-pv-phase]').forEach(button=>button.addEventListener('click',()=>{
      const i=Number(button.dataset.pvPhase);
      block.querySelectorAll('[data-pv-phase]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      block.querySelector('[data-pv-plot]').innerHTML=learningPVLoopPlot(i);
      block.querySelector('.learning-pv-copy').innerHTML=learningPVLoopCopy(i);
    }));
  });
  container.querySelectorAll('[data-learning-pvload]:not([data-learning-bound])').forEach(block=>{
    block.dataset.learningBound='1';
    block.querySelectorAll('[data-pv-load]').forEach(button=>button.addEventListener('click',()=>{
      const i=Number(button.dataset.pvLoad);
      block.querySelectorAll('[data-pv-load]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      block.querySelector('[data-pv-load-plot]').innerHTML=learningPVLoadPlot(i);
      block.querySelector('.learning-pv-load-copy').innerHTML=learningPVLoadCopy(i);
    }));
  });
}


// Linear arterial reservoir: HR 75/min, RAP 0, reference C = 5/3 mL/mmHg.
// The curve is the mean-pressure step response, not the beat-to-beat waveform.
function learningBPLabValues(co,resistance,complianceRatio){
  const compliance=5/3*complianceRatio,sv=co*1000/75;
  return {map:co*resistance,pp:sv/compliance,sv,compliance,tau:resistance*compliance*60/1000};
}
function learningBPLabPlot(co,resistance,complianceRatio){
  const active=learningBPLabValues(co,resistance,complianceRatio),reference=learningBPLabValues(co,resistance,1);
  const x=t=>58+t/16*482,y=p=>234-(p-40)/120*204;
  const curve=tau=>Array.from({length:161},(_,i)=>{
    const t=i/10,p=active.map+(100-active.map)*Math.exp(-t/tau);
    return `${i?'L':'M'}${x(t).toFixed(2)} ${y(p).toFixed(2)}`;
  }).join(' ');
  return `<svg viewBox="0 0 600 288" role="img" aria-label="평균압 100에서 새 평형 ${active.map} mmHg로 접근. 선택한 순응도 ${complianceRatio}배와 기준 1배를 비교한다."><path class="learning-axis" d="M58 25 V234 H550"/>${[60,100,140].map(p=>`<path class="learning-gridline" d="M58 ${y(p)} H540"/><text x="47" y="${y(p)+6}" text-anchor="end">${p}</text>`).join('')}<text x="58" y="18">MAP · mmHg</text>${[0,4,8,12,16].map(t=>`<text x="${x(t)}" y="259" text-anchor="middle">${t}</text>`).join('')}<text x="550" y="284" text-anchor="end">변화 뒤 시간 · 초</text><path class="learning-bplab-target" d="M58 ${y(active.map)} H540"/><path class="learning-rate-base" d="${curve(reference.tau)}"/><path class="learning-rate-active" d="${curve(active.tau)}"/><circle class="learning-dot" cx="58" cy="${y(100)}" r="4"/></svg>`;
}
function learningBPLabCopy(co,resistance,complianceRatio){
  const a=learningBPLabValues(co,resistance,complianceRatio),n=x=>Number(x.toFixed(1));
  return `<div class="learning-flowlab-facts"><div><span>새 평형 MAP</span><strong>${n(a.map)} <small>mmHg</small></strong></div><div><span>맥압 PP ≈ SV/Cₐ</span><strong>${n(a.pp)} <small>mmHg</small></strong></div><div><span>접근 시간척도 τ</span><strong>${n(a.tau)} <small>초</small></strong></div></div><p><b>MAP = ${co} × ${resistance} = ${n(a.map)}.</b> HR이 같으므로 SV는 ${n(a.sv)} mL다. Cₐ를 바꾸면 PP와 접근 속도가 달라지고, 새 평형 MAP는 같은 자리에 남는다.</p><p class="learning-bplab-hint">${a.map===100?'현재 MAP가 출발점과 같아 선이 수평이다. CO를 6으로 바꾼 뒤 Cₐ를 비교해 보자.':'Cₐ를 0.5배로 누르면 새 평형에 더 빨리, 2배로 누르면 더 천천히 접근한다.'} τ가 작을수록 빠르게 접근한다.</p>`;
}
function learningBPLabMarkup(){
  const fields=[['co','CO','L/min',[4,5,6],6],['resistance','TPR','mmHg·min/L',[16,20,24],20],['compliance','Cₐ','기준의 배수',[.5,1,2],1]];
  return `<div class="learning-interactive learning-bplab" data-learning-bplab><div class="learning-eyebrow">평균압과 맥압 · 하나씩 바꾸어 보기</div><div class="learning-bplab-controls">${fields.map(([key,label,unit,values,initial])=>`<div><b>${label}</b><small>${unit}</small><div class="learning-phase-buttons" role="group" aria-label="${label} ${unit}">${values.map(v=>`<button type="button" data-bplab-${key}="${v}" aria-pressed="${v===initial}">${v}${key==='compliance'?'배':''}</button>`).join('')}</div></div>`).join('')}</div><div data-bplab-copy aria-live="polite">${learningBPLabCopy(6,20,1)}</div><div class="learning-bplab-legend"><span>실선 · 선택한 Cₐ</span><span>점선 · 기준 Cₐ 1배</span></div><div data-bplab-plot>${learningBPLabPlot(6,20,1)}</div><small class="learning-graph-note">선형 Windkessel 원리 모형 · 출발 MAP 100 mmHg, HR 75/min, RAP 0, 기준 Cₐ 약 1.67 mL/mmHg. 위 그래프는 매박동 파형 대신 평균압이 새 평형에 접근하는 모습을 보여 준다. 보상 반사와 반사파는 생략하며, PP는 SV/Cₐ로 근사한다.</small></div>`;
}
function bindLearningBPLab(container){
  container.querySelectorAll('[data-learning-bplab]:not([data-learning-bound])').forEach(block=>{
    block.dataset.learningBound='1';const state={co:6,resistance:20,compliance:1};
    const update=()=>{
      Object.entries(state).forEach(([key,value])=>block.querySelectorAll(`[data-bplab-${key}]`).forEach(b=>b.setAttribute('aria-pressed',String(Number(b.getAttribute(`data-bplab-${key}`))===value))));
      block.querySelector('[data-bplab-copy]').innerHTML=learningBPLabCopy(state.co,state.resistance,state.compliance);
      block.querySelector('[data-bplab-plot]').innerHTML=learningBPLabPlot(state.co,state.resistance,state.compliance);
    };
    Object.keys(state).forEach(key=>block.querySelectorAll(`[data-bplab-${key}]`).forEach(b=>b.addEventListener('click',()=>{state[key]=Number(b.getAttribute(`data-bplab-${key}`));update();})));
  });
}

// Teaching model: a saturating cardiac curve and a linear venous-return curve
// with a collapsible-vein plateau. Values illustrate directions, not patients.
const learningCOStates = [
  {name:'기본',pump:1,pmc:7,r:1,text:'심장이 보내는 양과 혈관이 돌려보내는 양이 만나는 지점이다. 기준 교점은 CO 5 L/min, Pᵥ 2 mmHg다.'},
  {name:'수축력 ↑',pump:1.35,pmc:7,r:1,text:'같은 충만압에서 더 많이 보내는 심장으로 바뀐다. 심장곡선이 올라가고, 새 교점은 CO ↑·Pᵥ ↓. 혈관곡선과 Pmc는 유지된다.'},
  {name:'수혈',pump:1,pmc:10,r:1,text:'혈액량이 늘어 Pmc와 혈관곡선이 오른쪽으로 이동한다. 같은 심장곡선을 따라 CO·Pᵥ가 함께 오른다.'},
  {name:'출혈',pump:1,pmc:5,r:1,text:'혈액량이 줄어 Pmc와 혈관곡선이 왼쪽으로 이동한다. 심장 성능을 고정하면 CO·Pᵥ가 함께 낮아진다.'},
  {name:'급성 심부전',pump:.65,pmc:7,r:1,text:'심장 수축 성능이 낮아진 초기 상태. 혈액량과 혈관곡선은 그대로이며, CO는 줄고 Pᵥ는 오른다.'},
  {name:'심부전 + 체액 저류',pump:.65,pmc:10,r:1,text:'낮아진 심장 성능에 체액 저류가 더해졌다. 급성 심부전 때보다 CO를 회복하지만 더 높은 Pᵥ를 사용한다. 높은 충만압이 울혈과 연결된다.'},
  {name:'TPR ↑',pump:2/3,pmc:7,r:1.5,text:'환류 저항과 심장 afterload를 함께 높였다. Pmc는 유지되고 CO가 줄어든다. 이 예시는 Pᵥ가 같은 경우이며, 실제 방향은 두 곡선의 상대적 변화에 달려 있다. 심장곡선 하강은 부하 증가를 표현한다.'}
];
function learningCOHeart(p,s){return 5/(1-Math.exp(-.8))*s.pump*Math.max(0,1-Math.exp(-(p+2)/5));}
function learningCOVenous(p,s){return Math.max(0,(s.pmc-Math.max(0,p))/s.r);}
function learningCOValues(index=0){
  const s=learningCOStates[index];let low=-2,high=s.pmc;
  for(let i=0;i<60;i++){const mid=(low+high)/2;if(learningCOHeart(mid,s)>learningCOVenous(mid,s))high=mid;else low=mid;}
  const pv=(low+high)/2;return {pv,co:learningCOHeart(pv,s),pmc:s.pmc};
}
function learningCOCopy(index){
  const a=learningCOValues(index),n=x=>Number(x.toFixed(1));
  return `<div class="learning-flowlab-facts"><div><span>교점의 CO = VR</span><strong>${n(a.co)} <small>L/min</small></strong></div><div><span>교점의 Pᵥ</span><strong>${n(a.pv)} <small>mmHg</small></strong></div><div><span>무혈류 절편 Pmc</span><strong>${n(a.pmc)} <small>mmHg</small></strong></div></div><p>${learningCOStates[index].text}</p>`;
}
function learningCOPlot(index=0,flipped=false){
  const s=learningCOStates[index],base=learningCOStates[0],a=learningCOValues(index);
  const x=(p,q)=>58+(flipped?q/12:(p+2)/14)*492;
  const y=(p,q)=>310-(flipped?(p+2)/14:q/12)*265;
  const point=(p,q)=>`${x(p,q).toFixed(2)} ${y(p,q).toFixed(2)}`;
  const curve=(fn,state)=>Array.from({length:281},(_,i)=>{const end=fn===learningCOVenous?state.pmc:12,p=-2+(end+2)*i/280;return `${i?'L':'M'}${point(p,fn(p,state))}`;}).join(' ');
  const yTicks=flipped?[-2,0,4,8,12]:[0,4,8,12],xTicks=flipped?[0,4,8,12]:[-2,0,4,8,12];
  const horizontal=yTicks.map(v=>{const py=flipped?y(v,0):y(0,v);return `<path class="learning-gridline" d="M58 ${py} H550"/><text x="47" y="${py+6}" text-anchor="end">${v}</text>`;}).join('');
  const vertical=xTicks.map(v=>`<text x="${flipped?x(0,v):x(v,0)}" y="337" text-anchor="middle">${v}</text>`).join('');
  return `<svg viewBox="0 0 600 380" role="img" aria-label="${learningCOStates[index].name} · ${flipped?'가로 CO, 세로 정맥압':'가로 정맥압, 세로 CO'} · 교점 CO ${a.co.toFixed(1)} L/min, 정맥압 ${a.pv.toFixed(1)} mmHg, Pmc ${a.pmc} mmHg"><path class="learning-axis" d="M58 45 V310 H550"/>${horizontal}${vertical}<text x="58" y="23">${flipped?'Pᵥ · mmHg':'CO · VR · L/min'}</text><text x="550" y="371" text-anchor="end">${flipped?'CO · VR · L/min':'Pᵥ · RAP · mmHg'}</text><path class="learning-co-reference" d="${curve(learningCOHeart,base)}"/><path class="learning-co-reference" d="${curve(learningCOVenous,base)}"/><path class="learning-co-heart" d="${curve(learningCOHeart,s)}"/><path class="learning-co-venous" d="${curve(learningCOVenous,s)}"/><path class="learning-co-guide" d="M58 ${y(a.pv,a.co)} H${x(a.pv,a.co)} V310"/><circle class="learning-co-pmc" cx="${x(a.pmc,0)}" cy="${y(a.pmc,0)}" r="5"/><text class="learning-co-pmc-label" x="${x(a.pmc,0)+9}" y="${y(a.pmc,0)-10}">Pmc</text><circle class="learning-co-equilibrium" cx="${x(a.pv,a.co)}" cy="${y(a.pv,a.co)}" r="7"/></svg>`;
}
function learningCOMarkup(){
  return `<div class="learning-interactive learning-co" data-learning-co><div class="learning-eyebrow">심장과 혈관 · 교점 움직여 보기</div><div class="learning-rate-buttons learning-co-presets" role="group" aria-label="순환 조건 선택">${learningCOStates.map((s,i)=>`<button type="button" data-co-state="${i}" aria-pressed="${i===0}">${s.name}</button>`).join('')}</div><div data-co-copy aria-live="polite">${learningCOCopy(0)}</div><div class="learning-co-toolbar"><div class="learning-co-legend"><span>심장</span><span>혈관</span><span>기준</span></div><button type="button" data-co-axis aria-pressed="false">↔ 축 바꾸기</button></div><div data-co-plot>${learningCOPlot()}</div><p class="learning-co-axes" data-co-axes>가로 Pᵥ · 세로 CO → Pmc는 가로축 절편.</p><small class="learning-graph-note">방향 비교용 모형 · 수치는 예시이며 환자 상태를 예측하는 계산이 아닙니다. 정맥 collapse는 plateau로 표현합니다. 각 조건의 보상 반사는 생략하고, ‘심부전 + 체액 저류’에는 혈액량 증가만 추가합니다.</small></div>`;
}
function bindLearningCO(container){
  container.querySelectorAll('[data-learning-co]:not([data-learning-bound])').forEach(block=>{
    block.dataset.learningBound='1';let index=0,flipped=false;
    const update=()=>{
      block.querySelectorAll('[data-co-state]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.coState)===index)));
      block.querySelector('[data-co-axis]').setAttribute('aria-pressed',String(flipped));
      block.querySelector('[data-co-copy]').innerHTML=learningCOCopy(index);
      block.querySelector('[data-co-plot]').innerHTML=learningCOPlot(index,flipped);
      block.querySelector('[data-co-axes]').textContent=flipped?'가로 CO · 세로 Pᵥ → Pmc는 세로축 절편. 같은 관계를 축만 바꾸어 보았다.':'가로 Pᵥ · 세로 CO → Pmc는 가로축 절편.';
    };
    block.querySelectorAll('[data-co-state]').forEach(b=>b.addEventListener('click',()=>{index=Number(b.dataset.coState);update();}));
    block.querySelector('[data-co-axis]').addEventListener('click',()=>{flipped=!flipped;update();});
  });
}


// Lecture 7: distinguish the initiating disturbance, compensation and net state.
// Qualitative course scenarios; arrows are tied to the comparison stated below.
const learningIntegrationCases = [
 {name:'기립',steps:[
  {name:'첫 변화',basis:'Supine position에서 일어선 직후를 비교한다.',title:'혈액이 다리에 고여 심장으로 덜 돌아온다',chain:['하체 정맥 pooling','흉곽 혈액량·VR ↓','Preload·SV ↓','CO·동맥압 일시 ↓'],facts:[['전체 혈액량','유지'],['중앙 혈액량','↓'],['발목 정맥압','↑']],text:'정맥의 순응도가 커서 혈액이 아래쪽에 모인다. 발목 정맥압은 높아져도 중심정맥압은 낮아질 수 있다.'},
  {name:'보상',basis:'기립 직후 낮아진 동맥압을 회복시키는 방향이다.',title:'심장은 가속하고 세동맥과 정맥은 수축한다',chain:['Baroreceptor firing ↓','교감 ↑·미주 ↓','HR·수축력·TPR ↑','정맥 동원·압력 회복'],facts:[['HR·수축력','↑'],['TPR','↑'],['정맥 저장 공간','↓']],text:'수축력 증가는 보상이고, preload 감소는 그 보상을 일으킨 첫 변화다.'},
  {name:'남는 상태',basis:'보상 뒤 standing 상태를 supine 상태와 비교한다.',title:'혈압은 회복되어도 충만량은 낮게 남을 수 있다',chain:['HR·TPR로 압력 지지','MAP 정상 가까이','CVP·SV는 낮을 수 있음','걷기 → 근육 펌프 도움'],facts:[['동맥압','회복'],['SV','낮을 수 있음'],['다리 정맥압','걷기 때 ↓']],text:'혈압이 회복되었다는 말이 모든 값이 원래대로 돌아왔다는 뜻은 아니다.'}
 ]},
 {name:'동적 운동',steps:[
  {name:'첫 변화',basis:'안정 상태에서 운동을 시작한다.',title:'더 많은 산소가 필요한 근육에 순환을 맞춘다',chain:['Central command','미주 억제 효과 ↓','교감신경 ↑','근육 수축·대사 ↑'],facts:[['산소 요구','↑'],['심장 자극','↑'],['국소 대사 신호','↑']],text:'대뇌의 준비 신호와 수축 근육의 감각 신호가 함께 작동한다.'},
  {name:'조절',basis:'안정 때보다 혈류를 늘리는 여러 경로가 동시에 작동한다.',title:'심장은 더 내보내고 활동 근육의 혈관은 열린다',chain:['HR·수축력 ↑','정맥·근육·호흡 펌프','활동 근육 혈관확장','비활동 조직은 수축'],facts:[['활동 근육 혈류','↑'],['신장·내장 혈류','↓'],['TPR','↓']],text:'교감신경의 혈관수축과 활동 근육의 대사성 혈관확장은 함께 일어난다. 넓은 근육 혈관 영역이 열리며 전신 TPR이 낮아진다.'},
  {name:'합쳐진 결과',basis:'운동 중의 상태를 안정 상태와 비교한다.',title:'CO는 크게, 평균압은 조금 증가한다',chain:['HR ↑↑·SV ↑','CO ↑↑','TPR ↓','MAP 소폭 ↑'],facts:[['CO','↑↑'],['MAP','소폭 ↑'],['동정맥 O₂ 차이','↑']],text:'많이 보내는 것에 더해, 근육은 한 번 지나가는 혈액에서 산소를 더 많이 추출한다.'}
 ]},
 {name:'출혈',steps:[
  {name:'첫 변화',basis:'출혈 전과 출혈 직후를 비교한다.',title:'혈액량이 줄어 받아들일 양부터 부족해진다',chain:['혈액량 ↓','VR·preload ↓','SV·CO ↓','동맥압·맥압 ↓'],facts:[['혈액량','↓'],['Preload·SV','↓'],['CO','↓']],text:'일차 변화는 혈액량 감소다. 심장이 빨라지는 것은 이 변화에 뒤따르는 보상이다.'},
  {name:'보상',basis:'출혈 직후 낮아진 상태에서 회복시키는 방향이다.',title:'압력을 지키고 Na⁺·물을 보존한다',chain:['교감신경·RAAS·ADH ↑','심장 자극·혈관수축','조직액 유입·신장 보존','CO·혈액량 회복 방향'],facts:[['HR·수축력·TPR','↑'],['신장 재흡수','↑'],['모세혈관압 Pc','↓']],text:'표의 CO ↑는 출혈 직후에 비해 올라간다는 뜻이다. 출혈 전보다 높은 CO를 의미하지는 않는다.'},
  {name:'남는 상태',basis:'보상이 지속되는지에 따라 이후 경과가 갈린다.',title:'회복하거나, 저관류가 악순환을 만든다',chain:['보상 지속 → 압력 회복','보상 실패 → 저관류','심장·중추·혈관 손상','CO·VR 추가 감소'],facts:[['회복 경로','음성 되먹임'],['쇼크 경로','양성 되먹임'],['비교 기준','시점 확인']],text:'HR·수축력이 올라가도 SV가 충분히 회복되지 않을 수 있다. 심한 쇼크에서는 수축력과 중추 기능 자체도 낮아진다.'}
 ]},
 {name:'수축기 심부전',steps:[
  {name:'첫 변화',basis:'혈액량이 같아도 펌프 기능이 먼저 떨어진 상황이다.',title:'같은 충만압에서 내보내는 양이 줄어든다',chain:['수축 기능 ↓','심장곡선 하강','CO ↓','정맥 쪽 혈액·압력 ↑'],facts:[['심장곡선','↓'],['CO','↓'],['정맥압','↑']],text:'출혈에서는 충만량이 먼저 줄지만, 이 경우에는 펌프가 약해져 혈액이 정맥 쪽에 남는다.'},
  {name:'만성 보상',basis:'급성 펌프 저하 뒤 체액저류가 더해지는 단계다.',title:'Na⁺·물을 붙잡아 충만압을 올린다',chain:['신장 Na⁺·물 보존','혈액량·Pmc ↑','환류곡선 오른쪽','CO 일부 회복'],facts:[['혈액량','↑'],['Pmc','↑'],['충만압','↑']],text:'높아진 preload로 약해진 펌프의 박출을 보완한다. 심장곡선이 회복되었는지와 체액량이 늘었는지는 따로 읽는다.'},
  {name:'남는 상태',basis:'체액저류로 만들어진 새 평형을 본다.',title:'회복된 유량과 높은 정맥압이 함께 남을 수 있다',chain:['낮은 펌프 성능','높은 충만압으로 보완','CO 일부 회복','정맥 울혈 부담'],facts:[['CO','회복 정도 다양'],['정맥압','높음'],['울혈','가능']],text:'유량의 회복만으로 전체 상태를 판단하기보다, 그 유량을 만들기 위해 필요한 충만압도 함께 본다.'}
 ]}
];
function learningIntegrationCopy(caseIndex,stepIndex){
 const s=learningIntegrationCases[caseIndex].steps[stepIndex];
 return `<p class="learning-integration-basis">${escapeHtml(s.basis)}</p><h6>${escapeHtml(s.title)}</h6><ol class="learning-integration-chain">${s.chain.map((v,i)=>`<li><span>${i+1}</span>${escapeHtml(v)}</li>`).join('')}</ol><div class="learning-integration-facts">${s.facts.map(([a,b])=>`<div><span>${escapeHtml(a)}</span><strong>${escapeHtml(b)}</strong></div>`).join('')}</div><p class="learning-integration-text">${escapeHtml(s.text)}</p>`;
}
function learningIntegrationMarkup(){
 return `<div class="learning-interactive learning-integration" data-learning-integration><div class="learning-eyebrow">첫 변화 → 반응 → 결과</div><div class="learning-integration-cases" role="group" aria-label="비교할 순환 상황">${learningIntegrationCases.map((s,i)=>`<button type="button" data-integration-case="${i}" aria-pressed="${i===0}">${s.name}</button>`).join('')}</div><div class="learning-integration-steps" role="group" aria-label="변화의 단계"></div><div data-integration-copy aria-live="polite">${learningIntegrationCopy(0,0)}</div><small class="learning-graph-note">상황과 단계를 눌러 비교해 보세요. 화살표의 비교 기준을 함께 읽으면 처음 변화와 보상이 구분됩니다.</small></div>`;
}
function bindLearningIntegration(container){
 container.querySelectorAll('[data-learning-integration]:not([data-learning-bound])').forEach(block=>{
  block.dataset.learningBound='1';let c=0,s=0;
  const draw=()=>{
   block.querySelectorAll('[data-integration-case]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.integrationCase)===c)));
   block.querySelector('.learning-integration-steps').innerHTML=learningIntegrationCases[c].steps.map((v,i)=>`<button type="button" data-integration-step="${i}" aria-pressed="${i===s}"><span>${i+1}</span>${escapeHtml(v.name)}</button>`).join('');
   block.querySelector('[data-integration-copy]').innerHTML=learningIntegrationCopy(c,s);
   block.dataset.caseIndex=String(c);block.dataset.stepIndex=String(s);
  };
  block.addEventListener('click',event=>{
   const b=event.target.closest('[data-integration-case],[data-integration-step]');if(!b||!block.contains(b))return;
   const caseButton=b.hasAttribute('data-integration-case');
   if(caseButton){c=Number(b.dataset.integrationCase);s=0;}else{s=Number(b.dataset.integrationStep);}
   draw();if(!caseButton)block.querySelector(`[data-integration-step="${s}"]`).focus({preventScroll:true});
  });draw();
 });
}
