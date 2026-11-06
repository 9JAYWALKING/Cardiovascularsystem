/* Pharmacology uses the original map's location and vocabulary as memory cues. */
const pharmacologyMapRegions = [
  {name:'혈압',map:'cardiovascular-map-final-20261106',range:'0–7 · 왼쪽 네 열',heading:'혈압을 낮추는 네 갈래',text:'혈압과 약물 지도 → 이뇨제 → RAAS 억제제 → 중추·신경 차단 → β → α → 혈관확장제·CCB',rect:[0,5,50,93]},
  {name:'고지혈증',map:'cardiovascular-map-final-20261106',range:'8–14 · 가운데 두 열',heading:'고지혈증 약물은 LDL을 낮추는 길부터',text:'지질단백·이상지질혈증 → Statin → Fibrate → Niacin → Resin → Ezetimibe → PCSK9',rect:[50,5,25,93]},
  {name:'협심증',map:'cardiovascular-map-final-20261106',range:'15–18 · 오른쪽 두 열',heading:'협심증 약물은 산소 수요와 공급으로',text:'협심증이란 → 질산염 → β 차단제 → 신약 → 비교·치료 전략',rect:[75,5,25,93]},
  {name:'심부전',map:'failure-arrhythmia-map',range:'0–3 · 심부전 지도 왼쪽',heading:'심부전 약물은 증상과 생존을 함께',text:'심부전이란 → Digitalis → 기타 강심제 → 비강심제',rect:[0,5,50,93]},
  {name:'항부정맥',map:'failure-arrhythmia-map',range:'4–9 · 항부정맥 지도 오른쪽',heading:'항부정맥 약물은 이온통로에 자리 잡기',text:'부정맥 기초 → Class I·II·III·IV → 기타 약물',rect:[50,5,50,93]}
];
let pharmacologyMapSerial=0;
function renderPharmacologyBlock(line,course,footnotes){
  const inline=text=>renderWikiInline(text,course,footnotes);
  if(line==='@pharmrecall'){
    return `<div class="pharm-recall" data-pharm-recall><div class="pharm-map-label">같은 자리에서 네 이름 떠올리기</div><p>기전 이름을 보고 한장정리의 두 약물씩 떠올려 보세요.</p><div class="pharm-recall-grid">${[['1 · MRA','Spironolactone · Eplerenone'],['2 · ENaC 차단','Amiloride · Triamterene']].map(([label,answer])=>`<div class="pharm-recall-cell"><strong>${label}</strong><div class="pharm-recall-slot"><span class="pharm-recall-answer" aria-hidden="true">${answer}</span><span class="pharm-recall-prompt">약물 두 이름은?</span></div><button type="button" data-pharm-reveal aria-expanded="false" aria-label="${label} 약물명 확인">답 확인</button></div>`).join('')}</div><p class="pharm-map-help">두 묶음 모두 K⁺ 보존. 이름을 다시 가려도 같은 자리에 남습니다.</p></div>`;
  }
  if(line==='@pharmmap'){
    const id=`pharm-map-${++pharmacologyMapSerial}`,first=pharmacologyMapRegions[0];
    return `<div class="pharm-map" data-pharm-map><div class="pharm-map-label">한장정리에서 위치 잡기</div><div class="pharm-map-buttons" role="group" aria-label="약물군 위치 선택">${pharmacologyMapRegions.map((r,i)=>`<button type="button" data-pharm-region="${i}" aria-pressed="${i===0}" aria-controls="${id}-${i}">${r.name}</button>`).join('')}</div><div class="pharm-map-preview"><img src="./assets/lecture-08/${first.map}.webp" srcset="./assets/lecture-08/cardiovascular-map-final-20261106-preview.webp 2400w, ./assets/lecture-08/cardiovascular-map-final-20261106.webp 7200w" sizes="(max-width: 900px) 100vw, 880px" alt="심혈관계 약물 한장정리 최종본 · 혈압 약물은 왼쪽 네 열" data-note-image width="7200" height="5095"><span class="pharm-map-focus" data-pharm-focus aria-hidden="true" style="left:0%;top:5%;width:50%;height:93%"></span></div><div aria-live="polite" aria-atomic="true">${pharmacologyMapRegions.map((r,i)=>`<div class="pharm-map-copy" data-pharm-panel="${i}" id="${id}-${i}" ${i?'hidden':''}><span class="pharm-map-range">${r.range}</span><p>${r.text}</p>${inline(`[[#${r.heading}|이 부분 읽기 →]]`)}</div>`).join('')}</div><p class="pharm-map-help">약물군을 누르면 원본 지도에서 위치가 표시됩니다. 지도 그림을 누르면 확대해서 볼 수 있어요.</p></div>`;
  }
  if(line.startsWith('@pharmcard ')){
    const [tone,label,...body]=line.slice(11).split('|').map(s=>s.trim());
    const valid=['diuretic','raas','sympathetic','vasodilator','ccb','lipid','nitrate','digoxin','failure','arrhythmia'];
    const kind=valid.includes(tone)?tone:'failure';
    const mapNumber=label.match(/^최종지도\s+(\d+)(?:[ ·.]|$)/)?.[1];
    const hfMapNumber=label.match(/^심부전·부정맥지도\s+(\d+)(?:[ ·.]|$)/)?.[1];
    const mapClass=mapNumber && Number(mapNumber)<=18 ? ` pharm-final-map-${mapNumber}`
      : hfMapNumber && Number(hfMapNumber)<=9 ? ` pharm-hf-map-${hfMapNumber}` : '';
    return `<div class="pharm-memory pharm-${kind}${mapClass}"><div class="pharm-memory-label">${inline(label||'기억할 문장')}</div><div class="pharm-memory-text">${mapClass ? inline(body.join('|')).replace(/·/g,'·<wbr>') : inline(body.join('|'))}</div></div>`;
  }
  return '';
}
function bindPharmacologyLearning(container){
  container.querySelectorAll('[data-pharm-reveal]:not([data-pharm-bound])').forEach(button=>{
    button.dataset.pharmBound='1';button.addEventListener('click',()=>{
      const show=button.getAttribute('aria-expanded')!=='true',cell=button.closest('.pharm-recall-cell');
      button.setAttribute('aria-expanded',String(show));button.textContent=show?'다시 가리기':'답 확인';
      button.setAttribute('aria-label',`${cell.querySelector('strong').textContent} 약물명 ${show?'가리기':'확인'}`);
      cell.classList.toggle('is-revealed',show);cell.querySelector('.pharm-recall-answer').setAttribute('aria-hidden',String(!show));
      cell.querySelector('.pharm-recall-prompt').setAttribute('aria-hidden',String(show));
    });
  });
  container.querySelectorAll('[data-pharm-map]:not([data-pharm-bound])').forEach(block=>{
    block.dataset.pharmBound='1';
    block.querySelectorAll('[data-pharm-region]').forEach(button=>button.addEventListener('click',()=>{
      const index=Number(button.dataset.pharmRegion),region=pharmacologyMapRegions[index];
      block.querySelectorAll('[data-pharm-region]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      block.querySelectorAll('[data-pharm-panel]').forEach(p=>p.hidden=Number(p.dataset.pharmPanel)!==index);
      const img=block.querySelector('img');
      img.srcset=region.map==='cardiovascular-map-final-20261106' ? './assets/lecture-08/cardiovascular-map-final-20261106-preview.webp 2400w, ./assets/lecture-08/cardiovascular-map-final-20261106.webp 7200w' : '';
      img.width=region.map==='cardiovascular-map-final-20261106'?7200:4200;
      img.height=region.map==='cardiovascular-map-final-20261106'?5095:2972;
      img.src=`./assets/lecture-08/${region.map}.webp`;
      img.alt=`${region.map==='cardiovascular-map-final-20261106'?'심혈관계 약물':'심부전·항부정맥제'} 한장정리 원본 · ${region.range}`;
      const focus=block.querySelector('[data-pharm-focus]');
      ['left','top','width','height'].forEach((key,i)=>focus.style[key]=`${region.rect[i]}%`);
    }));
  });
}
