/* Bulk reset touches question marks only. Wiki/card progress and notes are separate. */
(() => {
  'use strict';
  const keys = {
    j:'cardiovascular-wrong-answers-v1', favorites:'cardiovascular-jbl-favorites-v1',
    lab:'cardiovascular-prediction-lab-v1', ecg:'cardiovascular-ecg-workbook-progress-v1',
    kmle:'cardiovascular-kmle2025-clinical-progress-v1', sessions:'cardiovascular-random-sessions-v1'
  };
  const categories=['correct','uncertain','wrong','favorite'];
  const attemptFields=['selected','answerShown','explanationShown','attempts','feedbackHidden','choiceEffectsHidden'];
  const statusOf=(r={},bank)=>{
    if(bank==='ecg'||bank==='kmle')return ({o:'correct',triangle:'uncertain',x:'wrong'})[r.status]||'unanswered';
    if(['unanswered',...categories.slice(0,3)].includes(r.status))return r.status;
    if(bank==='j'&&r.pending===true)return 'wrong';
    if(bank==='j'&&r.pending===false&&!r.manual&&r.lastAttemptAt)return 'correct';
    return 'unanswered';
  };
  function read(){
    const raw={},data={};
    for(const [bank,key] of Object.entries(keys)){
      raw[key]=localStorage.getItem(key);
      const value=JSON.parse(raw[key]||(bank==='favorites'?'[]':'{}'));
      if(!value||typeof value!=='object'||Array.isArray(value)!==(bank==='favorites'))throw new Error('invalid-study-storage');
      data[bank]=value;
    }
    return {raw,data};
  }
  function catalog(data){
    const rows=[];
    const aliases=window.JBL_DATA?.questionIdAliases||{};
    const canonical=id=>{
      const suffix=String(id).endsWith('::inferred')?'::inferred':'';
      const base=suffix?String(id).slice(0,-suffix.length):String(id);
      return (aliases[base]||base)+suffix;
    };
    const main=new Set((window.JBL_DATA?.questions||[]).map(q=>q.id));
    for(const id of Object.keys(data.j)){
      const normalized=canonical(id),base=normalized.replace(/::inferred$/,'');
      if(main.has(base))rows.push({bank:'j',id,viewId:normalized,group:'j:'+base,status:statusOf(data.j[id],'j')});
    }
    for(const id of data.favorites){
      const base=canonical(id).replace(/::inferred$/,'');
      if(main.has(base))rows.push({bank:'favorites',id,group:'j:'+base,favorite:true});
    }
    const banks=[
      ['lab',[...(window.PREDICTION_LAB_DATA?.questions||[]),...(window.PREDICTION_LAB_LIPIDS_DATA?.questions||[])]],
      ['ecg',window.CARDIOVASCULAR_PATHOLOGY_DATA?.questions||[]],
      ['kmle',window.CARDIOVASCULAR_KMLE_DATA?.questions||[]]
    ];
    for(const [bank,questions] of banks)for(const q of questions){
      const id=bank==='lab'?q.id:q.key,r=data[bank][id]||{};
      rows.push({bank,id,viewId:q.id,group:bank+':'+q.id,status:statusOf(r,bank),favorite:!!r.favorite});
    }
    return rows;
  }
  function preview(selected=[]){
    const {raw,data}=read(),rows=catalog(data);
    const selection=categories.filter(key=>selected.includes(key));
    const counts=Object.fromEntries(categories.map(key=>[key,new Set(rows.filter(r=>key==='favorite'?r.favorite:r.status===key).map(r=>r.group)).size]));
    const targets=rows.map(r=>({...r,resetStatus:selection.includes(r.status),resetFavorite:selection.includes('favorite')&&r.favorite}))
      .filter(r=>r.resetStatus||r.resetFavorite);
    const total=new Set(targets.map(r=>r.group)).size;
    const statusTotal=new Set(targets.filter(r=>r.resetStatus).map(r=>r.group)).size;
    return {selection,counts,total,statusTotal,favoriteTotal:selection.includes('favorite')?counts.favorite:0,
      // Recheck the entire stored snapshot before committing, including other-tab changes.
      signature:JSON.stringify(raw),targets};
  }
  function clearAttempts(state,ids){
    for(const field of attemptFields)if(state[field])for(const id of ids)delete state[field][id];
  }
  function commit(plan){
    let current,snapshot;
    try{current=preview(plan.selection);snapshot=read();}catch(_){return {ok:false,error:'기록을 읽지 못했어요. 저장소 접근 상태를 확인한 뒤 다시 시도해 주세요.'};}
    if(current.signature!==plan.signature)return {ok:false,changed:true,plan:current};
    if(!current.total)return {ok:false,changed:true,plan:current};
    const {raw,data}=snapshot,changed=new Set(),statusIds={j:[],lab:[],ecg:[],kmle:[]};
    for(const target of current.targets){
      const {bank,id,resetStatus,resetFavorite}=target;
      if(bank==='favorites'){
        data.favorites=data.favorites.filter(value=>value!==id);changed.add('favorites');continue;
      }
      const record=data[bank][id];
      if(resetStatus){
        record.status=(bank==='ecg'||bank==='kmle')?'':'unanswered';
        if(bank==='j'){record.pending=false;record.manual=true;record.statusUpdatedAt=Date.now();}
        if(bank==='ecg'||bank==='kmle'){delete record.selected;delete record.lastAnswer;delete record.gradedAt;}
        statusIds[bank].push(target.viewId);
      }
      if(resetFavorite)record.favorite=false;
      changed.add(bank);
    }
    // Prevent a saved random session from restoring the reset attempt on reload.
    const ids=[...statusIds.j,...statusIds.lab];
    if(ids.length){
      const before=JSON.stringify(data.sessions);
      for(const state of Object.values(data.sessions))if(state&&typeof state==='object')clearAttempts(state,ids);
      if(JSON.stringify(data.sessions)!==before)changed.add('sessions');
    }
    const written=[];
    try{
      for(const bank of changed){const key=keys[bank];localStorage.setItem(key,JSON.stringify(data[bank]));written.push(key);}
    }catch(_){
      let restored=true;
      for(const key of written.reverse())try{if(raw[key]===null)localStorage.removeItem(key);else localStorage.setItem(key,raw[key]);}catch(_){restored=false;}
      return {ok:false,error:restored?'저장하지 못했어요. 기록은 초기화하지 않았습니다. 다시 시도해 주세요.':'일부 기록의 저장 상태를 확인하지 못했어요. 새로고침 후 문항 표시를 확인해 주세요.'};
    }
    window.CardiovascularQuickMode?.cancel();
    window.dispatchEvent(new CustomEvent('study-question-reset',{detail:{statusIds,changed:[...changed]}}));
    return {ok:true,total:current.total,statusTotal:current.statusTotal,favoriteTotal:current.favoriteTotal};
  }
  window.CardiovascularQuestionReset={preview,commit,clearAttempts};
})();
