/* 병리 분류와 학습 순서는 문서와 독립된 데이터로 관리한다. */
window.CARDIO_PATHOLOGY_LEARNING = {
  courses: [
    {id:14,title:'혈관벽의 변화',subtitle:'좁아지는 내강 · 약해지는 벽',groups:[
      {id:'arteriosclerosis',title:'동맥경화의 분류',heading:'동맥경화증의 세 갈래',children:'죽상경화 · 중막 석회화 · 소동맥경화'},
      {id:'plaque-growth',title:'죽상판의 발생',heading:'죽상판은 어떻게 자라는가',children:'내피 기능장애 → 지질·염증 → 섬유성 덮개'},
      {id:'plaque-outcome',title:'죽상판의 결과',heading:'죽상판의 모양과 취약성',children:'협착 · 파열과 혈전 · 중막 약화'},
      {id:'small-artery',title:'고혈압성 소혈관 병변',heading:'고혈압이 작은 혈관에 남기는 흔적',children:'유리질 · 양파껍질 · 섬유소양괴사'},
      {id:'aortic-wall',title:'동맥류와 박리',heading:'벽이 약해지면 동맥류와 박리',children:'진성 · 가성 동맥류 / 중막을 가르는 혈액'}]},
    {id:15,title:'심장의 적응과 허혈 손상',subtitle:'커지는 근육 · 죽는 근육 · 남는 흉터',groups:[
      {id:'hypertrophy',title:'비대와 심부전',heading:'부하에 적응하는 심장과 심부전',children:'압력·용적 부하 / 좌·우심부전'},
      {id:'ischemia',title:'허혈성 심질환',heading:'허혈성 심질환의 네 가지 결과',children:'협심증 · 경색 · 만성 허혈 · 급성심장사'},
      {id:'infarct-distribution',title:'경색의 분포',heading:'심근경색의 위치와 깊이',children:'관상동맥 영역 / 심내막하·전층'},
      {id:'infarct-time',title:'경색의 시간 경과',heading:'심근경색의 시간 지도',children:'괴사 → 염증 → 제거 → 육아조직 → 흉터'},
      {id:'infarct-complication',title:'재관류와 합병증',heading:'재관류와 경색의 합병증',children:'수축띠 · 파열 · 혈전 · 심실류'},
      {id:'hypertensive-heart',title:'고혈압성 심장질환',heading:'고혈압성 심장질환과 폐심장증',children:'전신 혈압 → 좌심실 / 폐혈관 저항 → 우심실'}]},
    {id:16,title:'판막·심근·심낭 질환',subtitle:'문 · 근육 · 바깥막의 구조 이상',groups:[
      {id:'valve-function',title:'판막 기능의 두 갈래',heading:'판막은 열리지 않거나 닫히지 않는다',children:'협착 → 압력 부하 / 역류 → 용적 부하'},
      {id:'valve-degeneration',title:'퇴행성 판막질환',heading:'퇴행성 판막질환의 모양',children:'석회화 AS · 이첨판 · 판륜 석회화 · MVP'},
      {id:'vegetation',title:'염증과 증식물',heading:'류마티스와 심내막의 증식물',children:'류마티스 · 감염성 심내막염 · NBTE · 루푸스'},
      {id:'cardiomyopathy',title:'심근병증',heading:'심근병증은 방의 크기와 이완으로 나눈다',children:'DCM · HCM · RCM / ARVC'},
      {id:'myocarditis',title:'염증과 침착',heading:'심근염과 아밀로이드',children:'염증세포와 근세포 손상 / 아밀로이드'},
      {id:'pericardium',title:'심낭질환',heading:'심장 바깥에서 충만을 막는 심낭질환',children:'삼출·눌림증 / 심낭염·수축성 심낭염'}]},
    {id:17,title:'혈관염과 종양',subtitle:'침범 혈관 · 세포의 기원 · 종괴의 위치',groups:[
      {id:'vasculitis',title:'혈관염의 전체 분류',heading:'혈관염은 혈관 크기부터 나눈다',children:'대혈관 / 중간 혈관 / 소혈관'},
      {id:'large-vasculitis',title:'대혈관염',heading:'큰 혈관의 육아종성 혈관염',children:'Giant cell arteritis · Takayasu'},
      {id:'medium-vasculitis',title:'중간 혈관염',heading:'중간 혈관의 괴사성 혈관염',children:'PAN · Kawasaki'},
      {id:'small-vasculitis',title:'소혈관염',heading:'작은 혈관의 ANCA 연관 혈관염',children:'MPA · EGPA · GPA'},
      {id:'limb-vein',title:'사지 혈관과 정맥',heading:'사지 혈관과 정맥의 병변',children:'Buerger · Raynaud / 정맥류 · DVT'},
      {id:'heart-tumor',title:'심장종양',heading:'심장종양은 나이와 위치로 읽는다',children:'전이 / Myxoma · Rhabdomyoma · Angiosarcoma'},
      {id:'vascular-tumor',title:'혈관종양',heading:'혈관종양은 기원과 악성도로 나눈다',children:'양성 · 중간 등급 · 악성 / 내피 · 혈관주위 세포'},
      {id:'transplant',title:'이식 심장의 손상',heading:'심장이식 후 손상',children:'거부반응 · 이식혈관병증'}]}
  ],
  timeline:[
    {label:'수초–수십 분',title:'기능이 먼저 떨어진다',gross:'초기에는 육안 변화가 뚜렷하지 않다.',micro:'ATP가 줄고 세포가 부풀기 시작한다. 지속되는 심한 허혈에서는 약 20–40분부터 비가역 손상이 시작된다.',meaning:'수축기능은 1분 안에도 떨어질 수 있다. 기능 상실과 세포 괴사는 시작 시점이 다르다.'},
    {label:'4–24시간',title:'응고괴사가 모습을 드러낸다',gross:'시간이 지나며 창백하거나 얼룩덜룩해진다.',micro:'응고괴사, 물결 모양 근섬유, 부종·출혈이 나타나고 호중구 침윤이 시작된다.',meaning:'근세포가 죽어도 조직의 윤곽은 잠시 남는다. 재관류된 부위에는 수축띠가 보일 수 있다.'},
    {label:'1–3일',title:'괴사 부위에 급성 염증이 모인다',gross:'창백한 부위와 충혈이 보인다.',micro:'근세포의 핵과 가로무늬가 소실되고 호중구가 모인다.',meaning:'괴사한 근육을 치우기 위한 염증 단계다. 2–3일 무렵에는 섬유소성 심낭염이 동반될 수 있다.'},
    {label:'3–7일',title:'치우는 동안 벽이 약해진다',gross:'중심부가 황갈색으로 연해지고 경계는 충혈된다.',micro:'대식세포가 괴사한 근섬유를 제거한다. 충분한 콜라겐 흉터는 아직 형성되지 않았다.',meaning:'자유벽·중격·유두근 파열 위험을 연결한다. “제거는 진행 중, 새 지지대는 부족”한 시기다.'},
    {label:'1–4주',title:'가장자리부터 수복한다',gross:'주변부부터 혈관이 생기고 적갈색으로 변하며 함몰된다.',micro:'신생 모세혈관과 섬유모세포가 있는 육아조직이 자라며 콜라겐이 쌓인다.',meaning:'혈류가 남아 있는 경계에서 중심으로 수복이 진행된다. 대식세포와 수복 조직은 한동안 함께 보일 수 있다.'},
    {label:'6–7주 이후',title:'치밀한 섬유성 흉터가 남는다',gross:'희고 단단한 흉터가 남는다.',micro:'세포와 혈관은 줄고 치밀한 콜라겐이 주를 이룬다.',meaning:'흉터는 수축하는 심근을 대신하지 못한다. 심실류·벽혈전·만성 심부전으로 이어질 수 있다.'}
  ]
};
