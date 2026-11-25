/* Shared order and grading rules for the J practice skin. */
(function(root){
  'use strict';
  function assignedCourse(question,courses,selected=[]){
    const ids=question.lectureIds?.length?question.lectureIds:[question.lectureId];
    const valid=ids.map(Number).filter(id=>courses.some(c=>Number(c.id)===id));
    const subset=valid.filter(id=>selected.map(Number).includes(id));
    const candidates=subset.length?subset:valid;
    const primary=Number(question.lectureId);
    const id=candidates.includes(primary)?primary:Math.min(...candidates);
    return courses.find(c=>Number(c.id)===id)||null;
  }
  function byProfessor(questions,courses,selected=[],compare=()=>0){
    const info=q=>{const c=assignedCourse(q,courses,selected);return {name:(c?.professor||'').trim(),id:c?.id??Infinity};};
    return questions.slice().sort((a,b)=>{
      const x=info(a),y=info(b);
      return Number(!x.name)-Number(!y.name)||x.name.localeCompare(y.name,'ko')||x.id-y.id||compare(a,b);
    });
  }
  function grade(question,value){
    const answers=[...new Set((question.answerIndices?.length?question.answerIndices:question.answerIndex?[question.answerIndex]:[]).map(Number))];
    const selected=[...new Set((Array.isArray(value)?value:value?[value]:[]).map(Number))];
    if(!question.choices?.length||!answers.length||answers.some(n=>!Number.isInteger(n)||n<1||n>question.choices.length))return 'ungraded';
    if(!selected.length)return 'blank';
    if(selected.some(n=>!Number.isInteger(n)||n<1||n>question.choices.length))return 'wrong';
    return (question.answerGradingMode==='any'?selected.length===1&&answers.includes(selected[0]):selected.length===answers.length&&answers.every(n=>selected.includes(n)))?'correct':'wrong';
  }
  function score(questions,selected={}){
    const counts={correct:0,wrong:0,blank:0,ungraded:0};
    for(const q of questions)counts[grade(q,selected[q.id])]++;
    const denominator=questions.length-counts.ungraded;
    return {...counts,total:questions.length,denominator,percent:denominator?Math.round(counts.correct/denominator*100):null};
  }
  function status(result,checked){return result==='wrong'?'wrong':checked?'uncertain':result==='correct'?'correct':'unanswered';}
  function snapshot(question){const copy=structuredClone(question);delete copy.inferredVersion;delete copy.originalVersion;return copy;}
  const api={assignedCourse,byProfessor,grade,score,status,snapshot};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.CardioPracticeRules=api;
})(typeof window!=='undefined'?window:globalThis);
