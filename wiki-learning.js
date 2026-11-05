/* 위키 본문 안에서 사용하는 학습 블록. 글과 각주·문항 링크는 기존 편집 문법을 공유한다. */
function renderWikiLearningBlock(line, course, footnotes) {
  const inline = value => renderWikiInline(value, course, footnotes);
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

function bindWikiLearning(container,course){
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
    button.textContent=`${occurrences.size}회 출제 ⌄`;
    const panel=document.createElement('div');panel.className='learning-exam-history';panel.hidden=true;
    const years=[...new Set([...occurrences.values()].map(q=>q.year))].sort((a,b)=>b-a);
    panel.innerHTML=years.map(year=>`<div><strong>${year}</strong><span>${[...occurrences.values()].filter(q=>q.year===year).sort((a,b)=>compareJblNumbers(a.globalNumber,b.globalNumber)).map(q=>`<a class="jbl-question-link" href="#jbl-q-${escapeHtml(q.globalNumber)}" data-jbl-question-link="${escapeHtml(q.globalNumber)}">${escapeHtml(q.globalNumber)}</a>`).join(' ')}</span></div>`).join('');
    heading.append(button);heading.after(panel);
    button.addEventListener('click',()=>{panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));button.textContent=`${occurrences.size}회 출제 ${panel.hidden?'⌄':'⌃'}`;});
  });
}
