/* Hanyang IDs: YY한양N. J IDs are strings: YYNNN (exam number) YY오NN (wrong-30 page order), or YY종NNN (comprehensive exam number). */
window.QuestionId = (() => {
  const normalize = value => {
    let text=String(value ?? '').normalize('NFKC');
    try{text=decodeURIComponent(text);}catch(_){}
    return text.trim().replace(/^J\s*/i,'').replace(/\s*번(?:\s*문항)?$/,'').replace(/\s+/g,'');
  };
  const valid = value => /^(?:\d{5}|\d{2}[오종미]\d{2,}|\d{2}한양[1-9]\d*)(?:-\d+)?$/.test(normalize(value));
  function create(year,number,kind='exam') {
    const y=Number(year), n=Number(number);
    if(!Number.isInteger(y)||!(y>=2000&&y<=2099||y>=0&&y<=99)||!Number.isInteger(n)||n<1)throw Error('연도와 문항 번호를 확인하세요.');
    const yy=String(y%100).padStart(2,'0');
    if(kind==='hanyang')return yy+'한양'+String(n);
    if(kind==='comprehensive')return yy+'종'+String(n).padStart(3,'0');
    if(kind==='wrong30')return yy+'오'+String(n).padStart(2,'0');
    if(kind!=='exam'||n>999)throw Error('일반 문항 번호는 1~999입니다.');
    return yy+String(n).padStart(3,'0');
  }
  const collator=new Intl.Collator('ko',{numeric:true});
  function compare(a,b){
    const left=normalize(a),right=normalize(b);
    const parse=s=>{const m=s.match(/^(\d{2})(오|종|미|한양)?(\d+)(?:-(\d+))?$/);return m?[Number(m[1]),m[2]==='오'?1:m[2]==='종'?2:m[2]==='미'?3:m[2]==='한양'?4:0,Number(m[3]),Number(m[4]||1)]:null;};
    const x=parse(left),y=parse(right);
    // 최신 연도부터, 같은 연도에서는 일반 문항 번호순 → 오답30 페이지순 → 종합평가 문항순.
    return x&&y ? y[0]-x[0]||x[1]-y[1]||x[2]-y[2]||x[3]-y[3] : collator.compare(left,right);
  }
  return {normalize,valid,create,compare};
})();
