document.addEventListener('click', event => {
  const trigger=event.target.closest('[data-resp-exams], [data-resp-mocks]');
  if(!trigger)return;
  const mock=trigger.hasAttribute('data-resp-mocks');
  const list=window.SITE_CONFIG?.[mock?'mocks':'exams'] || [];
  const dialog=document.createElement('dialog');
  dialog.style.cssText='border:1px solid #d9bec4;border-radius:18px;padding:24px;max-width:calc(100vw - 32px);width:440px;color:inherit;background:var(--paper,#fff)';
  const form=document.createElement('form');form.method='dialog';
  const close=document.createElement('button');close.textContent='×';close.setAttribute('aria-label','닫기');close.style.cssText='float:right;border:0;background:none;color:inherit;font-size:24px;cursor:pointer';form.append(close);dialog.append(form);
  const title=document.createElement('h2');title.textContent=mock?'실전 모의고사':'실전처럼 풀기';title.style.marginTop='0';dialog.append(title);
  const notice=document.createElement('p');notice.textContent=list.length?'클릭하면 시험이 바로 시작됩니다.':'등록된 시험이 없습니다.';dialog.append(notice);
  for(const item of list){const link=document.createElement('a');link.textContent=item.label;link.href=item.href;link.style.cssText='display:inline-block;padding:16px;border:1px solid #d9bec4;border-radius:10px;color:inherit;margin:6px;text-decoration:none';dialog.append(link);}
  dialog.addEventListener('close',()=>dialog.remove());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  document.body.append(dialog);dialog.showModal();
});
