/* IndexedDB keeps multiple complete exam snapshots without localStorage limits. */
window.CardioPracticeStore=(()=>{
  let connection;
  function db(){return connection ||= new Promise((resolve,reject)=>{
    const r=indexedDB.open('cardiovascular-practice',1);
    r.onupgradeneeded=()=>r.result.createObjectStore('runs',{keyPath:'id',autoIncrement:true});
    r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);r.onblocked=()=>reject(new Error('database-blocked'));
  });}
  async function request(mode,action){const d=await db();return new Promise((resolve,reject)=>{const tx=d.transaction('runs',mode),r=action(tx.objectStore('runs'));let result;r.onsuccess=()=>result=r.result;tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});}
  async function list(){const d=await db();return new Promise((resolve,reject)=>{
    const rows=[],tx=d.transaction('runs','readonly'),r=tx.objectStore('runs').openCursor();
    r.onsuccess=()=>{const cursor=r.result;if(!cursor)return;const v=cursor.value;rows.push({id:v.id,name:v.name,phase:v.phase,startedAt:v.startedAt,score:v.score});cursor.continue();};
    tx.oncomplete=()=>resolve(rows);tx.onerror=tx.onabort=()=>reject(tx.error);
  });}
  const write=(method,run)=>{const copy=structuredClone(run);return request('readwrite',s=>s[method](copy));};
  return {add:run=>write('add',run),put:run=>write('put',run),get:id=>request('readonly',s=>s.get(Number(id))),remove:id=>request('readwrite',s=>s.delete(Number(id))),list};
})();
