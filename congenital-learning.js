/* Congenital heart disease: the same map and blood-flow vocabulary across 24–26. */
(function(){
  'use strict';
  const groups=[
    {label:'비청색증 · 폐혈류 ↑',title:'좌→우 단락',names:'VSD · ASD · PDA · AVSD',text:'산소가 많은 혈액이 폐순환으로 다시 들어간다. 어느 방에서 건너가는지에 따라 용적 부담을 받는 심방·심실과 유입성 잡음이 달라진다.',course:26},
    {label:'비청색증 · 폐혈류 대체로 정상',title:'유출로 폐쇄 · 압력 부담',names:'폐동맥협착 · 대동맥협착 · 대동맥축착',text:'좁은 통로 앞쪽 심실이 더 큰 압력을 만든다. 폐동맥협착은 우심실, 대동맥협착·축착은 좌심실 압력 부담을 만든다. 축착은 상·하지 혈압 차이도 연결한다.',course:26},
    {label:'청색증 · 폐혈류 ↓',title:'폐로 나가는 길이 좁다',names:'팔로사징(TOF) · 삼첨판폐쇄(TA)',text:'폐로 가는 혈류가 제한되고 산소가 적은 혈액이 전신으로 나간다. 팔로사징에서는 우심실 유출로 협착과 VSD를 통한 우→좌 단락을 연결한다.',course:44},
    {label:'청색증 · 폐혈류 ↑',title:'연결 이상 · 혈액 혼합',names:'TGA · TAPVR · 단심실 · 총동맥간',text:'청색증이 있어도 폐혈류는 많을 수 있다. 대혈관전위와 총폐정맥환류이상 등의 기본 분류다. 동반 협착·폐정맥 폐쇄가 있으면 혈류 양상이 달라질 수 있다.',course:44}
  ];
  const flow={
    asd:{label:'ASD · 심방',route:['좌심방','ASD → 우심방','삼첨판 → 우심실','폐동맥 → 폐'],load:'우심방·우심실 용적 부담',systole:'폐동맥판 통과 혈류 ↑ → 좌상흉골연 수축기 박출성 잡음',diastole:'삼첨판 통과 혈류 ↑ → 좌하흉골연 확장기 중기 잡음',extra:'제2심음이 호흡에 관계없이 넓게 분리된다. 결손 자체보다 늘어난 판막 통과 혈류의 소리를 듣는다.'},
    vsd:{label:'VSD · 심실',route:['좌심실','VSD → 우심실','폐동맥 → 폐','폐정맥 → 좌심방'],load:'되돌아온 혈액 → 좌심방·좌심실 용적 부담',systole:'VSD를 지나는 단락 → 좌하흉골연 범수축기 잡음',diastole:'승모판 통과 혈류 ↑ → 심첨부 확장기 중기 잡음',extra:'큰 단락의 Qp/Qs > 2:1과 심첨부 유입성 잡음을 연결한다. 큰 비제한성 결손에서는 폐고혈압과 양심실 부담도 동반한다.'},
    pda:{label:'PDA · 대혈관',route:['대동맥','PDA → 폐동맥','폐','폐정맥 → 좌심방'],load:'되돌아온 혈액 → 좌심방·좌심실 용적 부담',systole:'수축기에도 대동맥 → 폐동맥',diastole:'확장기에도 대동맥 → 폐동맥: 연속성 기계양 잡음',extra:'확장기에 대동맥 혈액이 폐동맥으로 빠져나가 맥압이 커진다. 큰 단락에서는 승모판 유입성 잡음도 들릴 수 있다.'}
  };
  function mapCopy(i){const g=groups[i];return `<div class="chd-map-copy" aria-live="polite"><span class="chd-position">${g.label}</span><strong>${g.title}</strong><p>${g.text}</p><a href="#lecture-${g.course}">${g.course}강 · ${g.course===26?'단순선천성심장병':'복잡선천성심장병'} →</a></div>`;}
  function map(course){const i=0;return `<section class="chd-learning chd-map" data-chd-map><div class="chd-head"><strong>선천성 심장병 지도</strong><span>${course?.id?`${course.id}강 · `:''}칸을 눌러 위치 확인</span></div><div class="chd-map-grid" role="group" aria-label="청색증과 폐혈류에 따른 분류">${groups.map((g,n)=>`<button type="button" data-chd-group="${n}" aria-pressed="${n===i}"><span>${g.label}</span><strong>${g.names}</strong></button>`).join('')}</div><div data-chd-map-content>${mapCopy(i)}</div></section>`;}
  function flowCopy(key){const f=flow[key];return `<div class="chd-flow-copy" aria-live="polite"><ol class="chd-route">${f.route.map((x,i)=>`<li><small>${i+1}</small><strong>${x}</strong></li>`).join('')}</ol><p class="chd-load">${f.load}</p><dl class="chd-sounds"><div><dt>수축기</dt><dd>${f.systole}</dd></div><div><dt>확장기</dt><dd>${f.diastole}</dd></div></dl><p>${f.extra}</p></div>`;}
  function flowMarkup(key){return `<section class="chd-learning" data-chd-flow><div class="chd-head"><strong>단락 위치 → 혈류 → 들리는 소리</strong><span>혈류 연결을 위한 모식도</span></div><div class="chd-tabs" role="group" aria-label="단락 비교">${Object.entries(flow).map(([k,f])=>`<button type="button" data-chd-shunt="${k}" aria-pressed="${k===key}">${f.label}</button>`).join('')}</div><div data-chd-flow-content>${flowCopy(key)}</div></section>`;}
  window.renderCongenitalLearningBlock=function(line,course){if(line==='@chdmap')return map(course);if(line.startsWith('@chdflow ')){const key=line.slice(9).trim();return flow[key]?flowMarkup(key):'';}return '';};
  window.bindCongenitalLearning=function(container){
    container.querySelectorAll('[data-chd-map]:not([data-chd-bound]),[data-chd-flow]:not([data-chd-bound])').forEach(block=>{
      block.dataset.chdBound='1';
      block.addEventListener('click',event=>{
        const mapButton=event.target.closest('[data-chd-group]'),flowButton=event.target.closest('[data-chd-shunt]');
        if(mapButton){block.querySelectorAll('[data-chd-group]').forEach(b=>b.setAttribute('aria-pressed',String(b===mapButton)));block.querySelector('[data-chd-map-content]').innerHTML=mapCopy(Number(mapButton.dataset.chdGroup));}
        if(flowButton){block.querySelectorAll('[data-chd-shunt]').forEach(b=>b.setAttribute('aria-pressed',String(b===flowButton)));block.querySelector('[data-chd-flow-content]').innerHTML=flowCopy(flowButton.dataset.chdShunt);}
      });
    });
  };
})();
