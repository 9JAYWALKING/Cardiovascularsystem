/* Native, on-demand playback of the original lecture clips. */
(function(){
  'use strict';
  const clips={
    case1:[[1,'p.16 · RCA'],[2,'p.17 · 좌관상동맥 1'],[3,'p.17 · 좌관상동맥 2'],[4,'p.18 · RCA 1'],[5,'p.18 · RCA 2']],
    case2:[[6,'p.22 · 초기 영상'],[7,'p.23 · 투사 1'],[8,'p.23 · 투사 2'],[9,'p.24 · 중재 영상 1'],[10,'p.24 · 중재 영상 2']],
    case3:[[11,'p.28 · 좌관상동맥 1'],[12,'p.28 · 좌관상동맥 2'],[13,'p.29 · RCA 1'],[14,'p.29 · RCA 2'],[15,'p.30 · RCA 최종'],[16,'p.31 · 좌관상동맥 중재 1'],[17,'p.31 · 좌관상동맥 중재 2'],[18,'p.32 · 좌관상동맥 최종']]
  };
  window.renderClinicalLearningBlock=function(line){
    if(!line.startsWith('@clinicalvideo '))return '';
    const items=clips[line.slice(15).trim()];if(!items)return '';
    return `<div class="clinical-videos">${items.map(([n,label])=>`<details class="learning-detail"><summary>${label}</summary><div class="learning-detail-body"><video controls playsinline preload="none" aria-label="19강 ${label} 원본 영상"><source src="./assets/lecture-18-19/cag-media${n}.mp4" type="video/mp4">브라우저가 영상 재생을 지원하지 않습니다.</video><p class="learning-source">19강 강의록 ${label} · 원본 영상</p></div></details>`).join('')}</div>`;
  };
})();
