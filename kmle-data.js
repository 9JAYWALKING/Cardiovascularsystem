// Source-preserving clinical selection. K identifiers and source keys are stable.
window.CARDIOVASCULAR_KMLE_DATA = {
  "version": "kmle2025-clinical-20261106",
  "title": "국시 순환기계",
  "description": "족보에서 한 걸음 넓히는 임상 증례 연습",
  "categories": [
    {
      "key": "assessment",
      "title": "혈압·실신·검사",
      "description": "수치와 병력을 읽고 다음 판단으로",
      "lectures": [
        18,
        32
      ]
    },
    {
      "key": "arrhythmia",
      "title": "부정맥",
      "description": "리듬 판독에서 검사와 처치까지",
      "lectures": [
        20,
        21,
        22,
        23,
        35
      ]
    },
    {
      "key": "failure",
      "title": "심부전·심근질환",
      "description": "울혈·관류와 원인에 따른 치료",
      "lectures": [
        28,
        30,
        31
      ]
    },
    {
      "key": "valve",
      "title": "판막질환",
      "description": "증상과 심초음파로 치료 시점 잡기",
      "lectures": [
        27,
        51
      ]
    },
    {
      "key": "pericardium",
      "title": "심장막·심내막염",
      "description": "흉통·발열·순환장애의 단서 연결",
      "lectures": [
        29,
        33,
        39
      ]
    },
    {
      "key": "ischemia",
      "title": "허혈성 심질환",
      "description": "흉통 평가·재관류·합병증",
      "lectures": [
        19,
        42,
        43,
        47,
        52
      ]
    },
    {
      "key": "vascular",
      "title": "대동맥·혈관",
      "description": "놓치면 위험한 혈관 질환",
      "lectures": [
        36,
        38
      ]
    }
  ],
  "questions": [
    {
      "id": "K1",
      "key": "kmle2025-cardio-p15-q04",
      "category": "assessment",
      "title": "진료실과 집의 혈압이 다를 때",
      "tags": [
        32
      ],
      "answers": [
        2
      ],
      "choices": [
        "기립혈압 측정",
        "24시간 활동혈압",
        "목동맥 초음파검사",
        "복부 컴퓨터단층촬영",
        "콩팥혈관 도플러초음파검사"
      ],
      "question": "55세 남자가 집에서 잰 혈압이 높다며 병원에 왔다. 현재 복용하고 있는 약은 없다고 한다. 혈압 126/82mmHg, 맥박 50회/분, 호흡 16회/분, 체온 36.4℃이다. 가슴 청진에서 심음과 호흡음은 정상이다. 적어 온 가정혈압은 다음과 같다. 심전도이다. 검사는?",
      "findings": [
        "가정혈압(mmHg): 아침 152/100, 154/102, 저녁 142/94, 137/98"
      ],
      "reasoning": "진료실 혈압은 정상인데 집에서 높게 나오는 가면고혈압을 의심하는 상황이야. 24시간 활동혈압으로 평소 혈압을 확인하자. 진료실과 집의 측정값이 엇갈릴 때는 어느 쪽이 높은지부터 구분하면 돼.",
      "selectionReason": "J22121과 매우 가까운 증례라 족보에서 배운 판단을 교재 원문으로 확인하기 위해 골랐어. J25043의 백의고혈압과 방향을 바꿔 비교하기에도 좋아.",
      "relatedJ": [
        {
          "number": "22121",
          "label": "가면고혈압 · 다음 검사"
        },
        {
          "number": "25043",
          "label": "백의고혈압과 비교"
        }
      ],
      "priority": "core",
      "selection": "connection",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 15,
        "number": 4,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K1-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K1-figure.jpg",
          "alt": "K1 교재 제시 그림",
          "width": 1138,
          "height": 600
        }
      ]
    },
    {
      "id": "K2",
      "key": "kmle2025-cardio-p23-q06",
      "category": "assessment",
      "title": "일어선 뒤 혈압이 떨어지는 실신",
      "tags": [
        18,
        23
      ],
      "answers": [
        2
      ],
      "choices": [
        "가면고혈압",
        "기립저혈압",
        "일과성뇌허혈",
        "좌심실유출로폐쇄",
        "혈관미주신경실신"
      ],
      "question": "77세 남자가 1시간 전 회식 후 일어서다가 쓰러져 응급실로 왔다. 3년 전부터 혈압강하제를 복용 중이며, 1주 전부터 전립샘비대증으로 투약하기 시작하였다. 혈압 137/85mmHg, 맥박 67회/분, 호흡 17회/분, 체온 36.5℃이다. 가슴 청진에서 심음과 호흡음은 정상이다. 자세에 따른 혈압의 변동은 다음과 같다. 진단은?",
      "findings": [
        "바로 누운 자세: 153/93mmHg",
        "앉은 자세: 137/81mmHg",
        "일어선 후 1분: 105/63mmHg",
        "일어선 후 3분: 101/61mmHg"
      ],
      "reasoning": "일어난 뒤 3분 안에 수축기 혈압이 52mmHg, 이완기 혈압이 32mmHg 떨어졌어. 기립저혈압에 맞는 변화야. 새로 시작한 전립샘비대증 약이 α차단제였을 가능성도 있어 복용약을 함께 확인해야 해.",
      "selectionReason": "족보에서 반복되는 혈관미주신경실신에 더해, 자세별 혈압 수치와 새로 시작한 약으로 원인을 찾는 연습을 넣었어.",
      "relatedJ": [
        {
          "number": "25093",
          "label": "혈관미주신경실신과 비교"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "기립저혈압은 기립 3분 이내 수축기 혈압 20mmHg 이상 또는 이완기 혈압 10mmHg 이상 감소로 판단해. 이 문항은 두 기준을 모두 충족해.",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 23,
        "number": 6,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K2-source.jpg",
      "images": []
    },
    {
      "id": "K3",
      "key": "kmle2025-cardio-p55-q05",
      "category": "arrhythmia",
      "title": "고칼륨혈증에서 심장을 먼저 보호하기",
      "tags": [
        20,
        30
      ],
      "answers": [
        5
      ],
      "choices": [
        "amiodarone",
        "dobutamine",
        "ACE inhibitor",
        "인 결합제제",
        "Ca gluconate"
      ],
      "question": "37세 여자가 근위약감과 오심, 구토를 주소로 내원하였다. BP 180/110, BUN/Cr은 45/7.3, Na/K은 132/7.5, Ca은 7.3, P 9.4, Hb 6.3이었다. 심전도 소견은 다음과 같을 때 가장 중요한 처치는?",
      "findings": [],
      "reasoning": "K 7.5에 뾰족한 T파까지 보여 고칼륨혈증의 심장 독성을 먼저 막아야 해. 칼슘글루콘산으로 심근막을 안정화하는 것이 이 문항의 첫 처치야. 이어서 칼륨을 세포 안으로 이동시키고 몸 밖으로 제거하는 치료를 진행해.",
      "selectionReason": "족보의 전해질성 부정맥에서 한 걸음 넓혀, 검사 수치와 심전도를 묶어 응급 처치 순서를 결정하도록 골랐어. 칼슘 투여와 실제 칼륨 제거의 역할을 구분하는 데 유용해.",
      "relatedJ": [
        {
          "number": "25091",
          "label": "전해질과 부정맥 · 비교"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 55,
        "number": 5,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K3-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K3-figure.jpg",
          "alt": "K3 교재 제시 그림",
          "width": 1134,
          "height": 405
        }
      ]
    },
    {
      "id": "K4",
      "key": "kmle2025-cardio-p85-q04",
      "category": "arrhythmia",
      "title": "서맥을 만드는 복용약부터 확인하기",
      "tags": [
        21
      ],
      "answers": [
        3
      ],
      "choices": [
        "칼슘통로 차단제 추가",
        "Ca gluconate",
        "프로프라놀롤 중단",
        "에날라프릴 중단",
        "영구형 심장박동 조율기(cardiac pacemaker) 삽입"
      ],
      "question": "73세 여자가 1개월 전부터 시작된 전신적인 무력감을 호소하며 병원에 내원하였다. 고혈압으로 프로프라놀롤(propranolol)과 에날라프릴(enalapril)을 복용하고 있었고 혈압은 125/80mmHg이었다. 다음은 내원 당시의 심전도이다. 가장 먼저 시행해야 할 치료는?",
      "findings": [],
      "reasoning": "P파 뒤에 QRS가 규칙적으로 이어지지만 박동 간격이 길어 동성서맥으로 읽을 수 있어. 심박수를 낮추는 프로프라놀롤을 먼저 중단하고 증상과 맥박 변화를 확인하자. 서맥 치료를 고를 때는 복용약처럼 되돌릴 수 있는 원인을 먼저 찾는 게 핵심이야.",
      "selectionReason": "J25129의 무증상 서맥과 비교해, 무력감이 있고 원인 약제가 분명할 때 첫 조치가 어떻게 달라지는지 연습하려고 골랐어.",
      "relatedJ": [
        {
          "number": "25129",
          "label": "무증상 서맥의 관찰"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 85,
        "number": 4,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K4-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K4-figure.jpg",
          "alt": "K4 교재 제시 그림",
          "width": 1138,
          "height": 190
        }
      ]
    },
    {
      "id": "K5",
      "key": "kmle2025-cardio-p99-q08",
      "category": "arrhythmia",
      "title": "아트로핀에 반응하지 않는 불안정 서맥",
      "tags": [
        21
      ],
      "answers": [
        2
      ],
      "choices": [
        "DC cardioversion",
        "임시 인공심박동기",
        "isoproterenol",
        "adenosine",
        "amiodarone"
      ],
      "question": "70세 여자가 3시간 전부터 시작된 어지럼증을 주소로 내원하였다. 혈압은 80/56, 심박수는 36회/분이었으며, 목정맥이 팽창된 소견이 관찰되었다. atropine을 투여하였으나 심박수에 변화가 없었다. ECG 사진은 다음과 같다. 다음 치료는?",
      "findings": [],
      "reasoning": "P파와 QRS가 따로 움직이는 완전방실차단에 저혈압과 어지럼증이 동반됐어. 아트로핀에도 반응하지 않으므로 임시 박동조율로 순환을 유지해야 해. 이 문제는 방실차단의 이름을 찾은 뒤 응급 치료까지 이어가는 유형이야.",
      "selectionReason": "족보의 방실차단 판독에서 저혈압·아트로핀 무반응이라는 조건을 더해 임시 박동조율이 필요한 순간을 연습하도록 골랐어.",
      "relatedJ": [
        {
          "number": "25053",
          "label": "완전방실차단 판독"
        },
        {
          "number": "21013",
          "label": "증상 있는 서맥의 치료"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "",
      "references": [
        [
          "AHA 2025 · 서맥 알고리즘",
          "https://www.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Accessible/Algorithm-ACLS-Bradycardia-LngDscrp-250725-Ed.pdf"
        ]
      ],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 99,
        "number": 8,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K5-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K5-figure.jpg",
          "alt": "K5 교재 제시 그림",
          "width": 1141,
          "height": 505
        }
      ]
    },
    {
      "id": "K6",
      "key": "kmle2025-cardio-p127-q09",
      "category": "arrhythmia",
      "title": "승모판협착에 동반된 빠른 심방세동",
      "tags": [
        22,
        27
      ],
      "answers": [
        4
      ],
      "choices": [
        "로살탄",
        "라미프릴",
        "암로디핀",
        "비소프롤롤",
        "푸로세미드"
      ],
      "question": "58세 여자가 2일 전부터 가슴이 두근거리고 숨이 차서 병원에 왔다. 혈압 126/75mmHg, 맥박 135회/분, 호흡 22회/분, 체온 36.7℃이다. 가슴 청진에서 심박동은 빠르고 불규칙하다. 심장끝에서 제1심음이 크게 들리고 3/6도의 확장기 심잡음이 들린다. 호흡음은 정상이다. 정강뼈앞 오목부종은 없다. 가슴 X선 사진과 심전도이다. 치료는?",
      "findings": [],
      "reasoning": "심첨부 확장기 잡음은 승모판협착, 불규칙한 빠른 박동은 심방세동으로 연결하자. 이 증례는 뚜렷한 울혈보다 빠른 심박수가 문제라 비소프롤롤로 심박수를 조절하는 답을 골라. 심박수 조절과 혈전색전 예방은 각각 따로 판단할 치료 축이야.",
      "selectionReason": "J25100의 승모판협착과 J25088의 심방세동을 연결하되, 이번에는 항응고제 대신 당장 필요한 심박수 조절 약제를 고르는 연습이야.",
      "relatedJ": [
        {
          "number": "25100",
          "label": "승모판협착 증례"
        },
        {
          "number": "25088",
          "label": "심방세동의 치료 판단"
        }
      ],
      "priority": "extra",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 127,
        "number": 9,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K6-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K6-figure.jpg",
          "alt": "K6 교재 제시 그림",
          "width": 1141,
          "height": 1185
        }
      ]
    },
    {
      "id": "K7",
      "key": "kmle2025-cardio-p140-q04",
      "category": "arrhythmia",
      "title": "아데노신을 썼는데 빈맥이 계속될 때",
      "tags": [
        22
      ],
      "answers": [
        3
      ],
      "choices": [
        "질산염",
        "푸로세미드",
        "심장율동전환",
        "노르에피네프린",
        "임시박동조율기"
      ],
      "question": "31세 여자가 30분 전부터 가슴이 두근거린다며 병원에 왔다. 가슴이 답답하고 숨쉬기 힘들다고 한다. 1년 전부터 한 달에 한 번 정도 두근거림이 수 분간 지속하다가 금방 사라졌다고 한다. 혈압 103/67mmHg, 맥박 210회/분, 호흡 19회/분, 체온 36.1℃이다. 가슴 청진에서 심음은 빠르고 규칙적이며 호흡음은 정상이다. 아데노신 투여 후의 심전도이다. 조치는?",
      "findings": [],
      "reasoning": "아데노신을 투여한 뒤에도 규칙적인 좁은 QRS 빈맥이 지속되고 있어. 약물로 멈추지 않는 증상성 빈맥에서 제시된 보기 중 다음 조치는 동기화 심장율동전환이야. 혈압 수치 하나만으로 쇼크라고 단정하기보다, 이미 시행한 치료와 그 반응을 읽는 문제야.",
      "selectionReason": "J25089의 아데노신 선택에서 끝내지 않고, 투여 후에도 빈맥이 지속되는 다음 단계까지 대비하려고 골랐어.",
      "relatedJ": [
        {
          "number": "25089",
          "label": "상심실성 빈맥의 첫 치료"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 140,
        "number": 4,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K7-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K7-figure.jpg",
          "alt": "K7 교재 제시 그림",
          "width": 1138,
          "height": 598
        }
      ]
    },
    {
      "id": "K8",
      "key": "kmle2025-cardio-p141-q06",
      "category": "arrhythmia",
      "title": "증상이 매일 생기는데 진료실 심전도는 정상",
      "tags": [
        22,
        23
      ],
      "answers": [
        1
      ],
      "choices": [
        "24시간홀터검사",
        "기립경사도검사",
        "전기생리학검사",
        "운동부하심전도검사",
        "체내삽입사건기록기"
      ],
      "question": "27세 여자가 2개월 전부터 가슴이 두근거린다며 병원에 왔다. 두근거림은 하루에 2~3회 10분 정도 있었다. 혈압 121/73mmHg, 맥박 65회/분, 호흡 17회/분, 체온 36.6℃이다. 가슴 청진에서 심음과 호흡음은 정상이다. 심전도이다. 검사는?",
      "findings": [],
      "reasoning": "진료실 심전도는 정상이어도 두근거릴 때의 리듬을 확인해야 해. 하루에 여러 번 증상이 생기므로 24시간 홀터검사로 증상과 심전도를 맞춰 보는 것이 적절해. 증상 빈도가 검사 기록 시간을 결정한다는 점을 기억하자.",
      "selectionReason": "J25092의 드문 실신과 삽입형 기록기에서 반대로 조건을 바꾼 문제야. 증상이 매일 있을 때는 짧은 기록 검사부터 선택하는 연습이 필요해.",
      "relatedJ": [
        {
          "number": "25092",
          "label": "드문 실신 · 삽입형 기록기"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 141,
        "number": 6,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K8-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K8-figure.jpg",
          "alt": "K8 교재 제시 그림",
          "width": 1138,
          "height": 560
        }
      ]
    },
    {
      "id": "K9",
      "key": "kmle2025-cardio-p168-q06",
      "category": "arrhythmia",
      "title": "심실세동에서 살아난 뒤의 재발 예방",
      "tags": [
        23,
        35
      ],
      "answers": [
        2
      ],
      "choices": [
        "심장이식",
        "삽입심장충격기",
        "심장재동기화치료",
        "비소프롤롤(bisoprolol)",
        "플레카이나이드(flecainide)"
      ],
      "question": "22세 남자가 길에서 갑자기 쓰러져서 응급 처치 후 병원에 왔다. 목격자가 심폐소생술을 바로 시행하였고, 119 구급대가 심실세동을 확인하고 현장에서 자동세동제거를 시행했다. 과거 병력에 특이 사항은 없다. 2년 전 형이 원인을 알 수 없이 갑자기 사망하였다. 혈압 113/75mmHg, 맥박 65회/분, 호흡 18회/분, 체온 36.5℃이다. 응급실에 이송되어 시행한 심전도이다. 치료는?",
      "findings": [],
      "reasoning": "브루가다형 심전도와 급사 가족력이 있고, 본인도 심실세동에서 소생한 상태야. 다음 목표는 치명적인 심실성 부정맥의 재발에 대비하는 것으로, 삽입심장충격기(ICD)를 선택해. 현장에서 하는 제세동과 회복 후 삽입하는 ICD의 시점을 구분하자.",
      "selectionReason": "J25094에서 반복되는 브루가다 증후군을 실제 소생 후 치료 결정으로 확인하는 연결 문항이야.",
      "relatedJ": [
        {
          "number": "25094",
          "label": "브루가다 증후군"
        },
        {
          "number": "22013",
          "label": "심실성 부정맥 후 ICD"
        }
      ],
      "priority": "core",
      "selection": "connection",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 168,
        "number": 6,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K9-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K9-figure.jpg",
          "alt": "K9 교재 제시 그림",
          "width": 1139,
          "height": 640
        }
      ]
    },
    {
      "id": "K10",
      "key": "kmle2025-cardio-p197-q03",
      "category": "failure",
      "title": "호흡곤란 환자에서 BNP를 고르는 단서",
      "tags": [
        28,
        30
      ],
      "answers": [
        5
      ],
      "choices": [
        "D-이량체",
        "트로포닌-T",
        "C-반응단백질",
        "크레아틴키나아제",
        "뇌나트륨이뇨펩티드"
      ],
      "question": "74세 여자가 한 달 전부터 걸으면 숨이 차서 병원에 왔다. 누우면 숨이 차고, 새벽에도 숨이 차서 잠에서 깬다. 7년 전부터 혈압강하제와 혈당강하제를 복용하고 있다. 혈압 122/71mmHg, 맥박 87회/분, 호흡 21회/분, 체온 36.4℃이다. 가슴 청진할 때 제3심음이 들리고, 양쪽 등쪽 아랫부분에서 거품소리가 들린다. 가슴 X선 사진과 심전도이다. 혈액 검사는?",
      "findings": [],
      "reasoning": "기좌호흡, 야간 호흡곤란, 제3심음과 폐울혈 소견을 묶으면 심부전을 의심할 수 있어. 보기 중에서는 BNP 측정이 심부전 평가를 돕는 검사야. BNP는 임상 소견과 함께 읽고, 심초음파로 심장 구조와 기능을 확인하는 흐름으로 이어가자.",
      "selectionReason": "J25098의 BNP 수치에 영향을 주는 요인에서, 실제 호흡곤란 환자에게 어느 혈액검사를 고를지로 확장했어.",
      "relatedJ": [
        {
          "number": "25098",
          "label": "BNP 해석"
        }
      ],
      "priority": "extra",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 197,
        "number": 3,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K10-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K10-figure.jpg",
          "alt": "K10 교재 제시 그림",
          "width": 1138,
          "height": 1065
        }
      ]
    },
    {
      "id": "K11",
      "key": "kmle2025-cardio-p222-q03",
      "category": "failure",
      "title": "차가운 피부와 저혈압에서도 울혈 여부 확인",
      "tags": [
        30
      ],
      "answers": [
        4
      ],
      "choices": [
        "베타차단제",
        "앤지오텐신전환효소 억제제",
        "아미노필린",
        "0.9% 식염수",
        "디곡신"
      ],
      "question": "77세 여자가 3일 전부터 어지러워서 왔다. 1주 전부터 설사를 했다고 한다. 20년 전부터 혈압강하제와 혈당강하제를 복용하고 있었다. 혈압 68/42mmHg, 맥박 100회/분, 호흡 24회/분, 체온 35.8도였다. 피부는 차갑고 건조하였다. 호흡음은 깨끗하였다. 정강뼈앞 오목부종은 없었다.",
      "findings": [],
      "reasoning": "설사 후 저혈압이 생겼고, 피부는 건조하며 폐울혈이나 말초부종이 없어. 체액 손실에 따른 저혈량을 먼저 생각하고 0.9% 식염수로 순환혈액량을 보충하는 상황이야. 저혈압을 봤을 때 울혈이 있는지 함께 살피면 수액과 이뇨제의 방향이 갈려.",
      "selectionReason": "J25131의 울혈성 급성심부전과 대비하기 위해 골랐어. 저혈압이라는 한 단서에 끌리지 않고 설사·건조한 피부·깨끗한 호흡음을 함께 읽는 연습이야.",
      "relatedJ": [
        {
          "number": "25131",
          "label": "울혈이 있는 환자의 치료"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 222,
        "number": 3,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K11-source.jpg",
      "images": []
    },
    {
      "id": "K12",
      "key": "kmle2025-cardio-p223-q05",
      "category": "failure",
      "title": "폐울혈이 있는 급성심부전의 증상 완화",
      "tags": [
        30
      ],
      "answers": [
        3
      ],
      "choices": [
        "베라파밀(verapamil)",
        "디곡신(digoxin)",
        "푸로세미드(furosemide)",
        "도파민(dopamine)",
        "노르에피네프린(norepinephrine)"
      ],
      "question": "60세 남자가 3일 전부터 숨이 차서 응급실로 왔다. 혈압 140/80mmHg, 맥박 72회/분, 호흡 24회/분, 체온 36.3도였다. 가슴 청진에서 심박동은 규칙적이었고 심음은 작게 들렸으며 양쪽 등쪽 아랫부분에서 거품소리가 들렸다. 양쪽 정강뼈앞오목부종이 있었다. 혈액검사 소견은 다음과 같았다. 가슴 X선 사진이다. 치료는?",
      "findings": [
        "혈액요소질소/크레아티닌 18/1.0mg/dL",
        "트로포닌 T 3ng/L(참고치, 0~14)",
        "혈장뇌나트륨이뇨펩티드 730ng/L(참고치, <100)"
      ],
      "reasoning": "폐의 거품소리, 다리 오목부종, 높은 BNP와 흉부 사진이 울혈을 가리켜. 혈압도 유지되므로 푸로세미드로 체액 과다를 줄여 호흡곤란을 완화하자. 이 문항은 장기 예후 약제보다 지금의 울혈을 해결하는 약을 묻고 있어.",
      "selectionReason": "J25131·J23129에서 반복되는 고리이뇨제 선택을 수치와 흉부 사진이 갖춰진 증례로 확인하도록 남겼어.",
      "relatedJ": [
        {
          "number": "25131",
          "label": "급성 울혈의 첫 치료"
        },
        {
          "number": "23129",
          "label": "고리이뇨제 반복 문항"
        }
      ],
      "priority": "core",
      "selection": "connection",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 223,
        "number": 5,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K12-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K12-figure.jpg",
          "alt": "K12 교재 제시 그림",
          "width": 1142,
          "height": 580
        }
      ]
    },
    {
      "id": "K13",
      "key": "kmle2025-cardio-p227-q01",
      "category": "arrhythmia",
      "title": "심방세동 약 복용 중 구토와 서맥",
      "tags": [
        21,
        22,
        28
      ],
      "answers": [
        3
      ],
      "choices": [
        "홀터검사",
        "심장초음파검사",
        "혈청 디곡신",
        "운동부하심전도검사",
        "혈청 뇌나트륨이뇨펩티드"
      ],
      "question": "68세 여자가 하루 전부터 시작된 욕지기와 구토로 응급실에 왔다. 환자는 심방세동으로 약을 복용하고 있었다. 혈압 120/70mmHg, 맥박 37회/분, 호흡 25회/분, 체온 36.5도였다. 심전도이다. 검사는?",
      "findings": [],
      "reasoning": "심방세동 치료 중 구역·구토와 심한 서맥이 함께 생겼으니 디곡신 중독을 의심하자. 혈청 디곡신 농도를 확인하고 신기능과 전해질도 함께 살펴야 해. 심전도 모양만 따로 보기보다 복용약과 위장관 증상을 묶는 것이 핵심이야.",
      "selectionReason": "족보에서 익숙한 심방세동·심부전 치료를 약물 부작용으로 넓힌 문항이야. 진단명 암기에서 벗어나 약을 먹던 환자의 새로운 증상을 해석하는 연습을 넣었어.",
      "relatedJ": [
        {
          "number": "25088",
          "label": "심방세동 치료의 배경"
        },
        {
          "number": "25097",
          "label": "심부전 약제의 역할"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 227,
        "number": 1,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K13-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K13-figure.jpg",
          "alt": "K13 교재 제시 그림",
          "width": 1139,
          "height": 380
        }
      ]
    },
    {
      "id": "K14",
      "key": "kmle2025-cardio-p258-q03",
      "category": "valve",
      "title": "증상이 없어도 중증 MR 수술 시점을 잡기",
      "tags": [
        27
      ],
      "answers": [
        1
      ],
      "choices": [
        "승모판막복구술",
        "왼심실보조장치",
        "오른심장카테터검사",
        "6개월 후 심초음파검사",
        "피부경유승모판연결부절개술"
      ],
      "question": "62세 여자가 건강검진에서 심잡음이 들린다고 하여 병원에 왔다. 10년 전부터 혈당강하제를 복용 중이다. 혈압 125/75mmHg, 맥박 67회/분, 호흡 17회/분, 체온 36.6℃이다. 가슴 청진에서 심장끝에서 3/6도의 수축기 심잡음이 들린다. 가슴 X선 사진이다. 심초음파검사 결과는 다음과 같다. 조치는?",
      "findings": [
        "승모판폐쇄부전: 중증",
        "왼심실수축기말 지름: 46mm(참고치, <40)",
        "왼심실박출률: 52%(참고치, ≥55)"
      ],
      "reasoning": "중증 MR에 LVESD 46mm, LVEF 52%로 좌심실 변화가 이미 나타났어. 교재의 답은 승모판막복구술이야. 중증 일차성 MR은 증상이 없어도 LVEF 60% 이하 또는 LVESD 40mm 이상이면 수술을 고려하는 기준에 들어가므로, 증상 유무와 심초음파 수치를 함께 읽자.",
      "selectionReason": "J25099와 매우 가까운 수술 시점 판단이어서 연결 문항으로 골랐어. 무증상이라는 말보다 MR에서의 좌심실 기준이 중요하다는 점을 확인할 수 있어.",
      "relatedJ": [
        {
          "number": "25099",
          "label": "중증 MR의 수술 시점"
        }
      ],
      "priority": "core",
      "selection": "connection",
      "supplement": "",
      "references": [
        [
          "ACC/AHA · 판막질환 지침",
          "https://www.ahajournals.org/doi/10.1161/CIR.0000000000000923"
        ]
      ],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 258,
        "number": 3,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K14-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K14-figure.jpg",
          "alt": "K14 교재 제시 그림",
          "width": 1132,
          "height": 615
        }
      ]
    },
    {
      "id": "K15",
      "key": "kmle2025-cardio-p275-q08",
      "category": "valve",
      "title": "고령의 증상성 AS와 TAVI",
      "tags": [
        27,
        51
      ],
      "answers": [
        3
      ],
      "choices": [
        "승모판클립 삽입",
        "왼심방귀 가리개(occluder) 삽입",
        "카테터경유대동맥판막 삽입",
        "동맥관열림증 가리개 삽입",
        "심방사이막결손 가리개 삽입"
      ],
      "question": "80세 남자가 2달 전부터 가슴이 아프고 숨이 차서 병원에 왔다. 30년 전부터 혈압강하제를 복용하였다. 혈압은 114/68mmHg, 맥박 82회/분이었다. 신체검진 상 복장뼈 오른쪽 옆 두 번째 갈비사이공간에서 Ⅲ/Ⅵ도의 박출성 수축기 잡음이 들렸고, 잡음은 목동맥까지 방사되었다. 심장 끝에서 전수축기 잡음이 들렸다. 심전도와 가슴 X선 촬영에서 좌심실 비대 소견을 보였다. 환자와 가족은 개흉 수술을 피하고자 하였다. 이 경우 적절한 치료는?",
      "findings": [],
      "reasoning": "목동맥으로 퍼지는 박출성 수축기 잡음에 흉통과 호흡곤란이 동반돼 대동맥판협착을 생각할 수 있어. 보기 중 개흉 없이 대동맥판을 치료하는 방법은 TAVI야. 실제 치료 선택에서는 중증도, 판막·혈관 해부학, 수술 위험과 기대여명을 함께 평가해.",
      "selectionReason": "J25085의 시술 사진·진단 연결에서, 환자 조건을 보고 어느 판막 중재술을 고를지로 확장했어.",
      "relatedJ": [
        {
          "number": "25085",
          "label": "TAVI와 대동맥판협착"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 275,
        "number": 8,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K15-source.jpg",
      "images": []
    },
    {
      "id": "K16",
      "key": "kmle2025-cardio-p289-q06",
      "category": "valve",
      "title": "증상이 생긴 대동맥판 역류의 치료",
      "tags": [
        27
      ],
      "answers": [
        4
      ],
      "choices": [
        "승모판 대치술(replacement)",
        "승모판 성형술",
        "대동맥내풍선펌프(IABP)",
        "대동맥판 대치술",
        "직류 심율동전환(DC cardioversion)"
      ],
      "question": "54세 남자가 2달 전부터 조금만 걸어도 숨이 차서 병원에 왔다. 혈압 150/60mmHg, 맥박 100회/분이었다. 복장뼈 왼쪽 가장자리 제3갈비사이에서 확장기 심잡음이 들렸고, 상체를 앞으로 기울여 숨을 내쉬게 한 후 심잡음이 더 커졌다. 심초음파 결과는 다음과 같았다. 치료는?",
      "findings": [
        "왼심실이완기말 지름 6.1cm(참고치, 4.0~5.5)",
        "왼심실박출률 46%(참고치, ≥55)"
      ],
      "reasoning": "넓은 맥압과 Erb 부위의 확장기 잡음은 대동맥판 역류로 연결하자. 호흡곤란에 좌심실 확장과 박출률 저하까지 동반됐으므로 교재는 대동맥판 대치술을 답으로 제시해. 어느 판막의 병변인지 먼저 정한 뒤 증상과 좌심실 기능으로 치료 방향을 잡는 문제야.",
      "selectionReason": "J25084의 AR 진단에서 수술 결정까지 이어지는 변형에 대비하도록 골랐어. MR과 AR의 수술 대상을 혼동하지 않게 정리할 수 있어.",
      "relatedJ": [
        {
          "number": "25084",
          "label": "대동맥판 역류의 단서"
        },
        {
          "number": "25101",
          "label": "판막질환 치료 비교"
        }
      ],
      "priority": "extra",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 289,
        "number": 6,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K16-source.jpg",
      "images": []
    },
    {
      "id": "K17",
      "key": "kmle2025-cardio-p303-q03",
      "category": "failure",
      "title": "큰 스트레스 뒤 생긴 국소 심실 운동 이상",
      "tags": [
        31
      ],
      "answers": [
        3
      ],
      "choices": [
        "제한심근병증",
        "협착성심장막염",
        "스트레스유발심근병증",
        "심장눌림증",
        "비대심근병증"
      ],
      "question": "83세 여자가 1주 전부터 숨이 차서 응급실로 왔다. 2주 전 배우자가 급사하였다고 한다. 혈압 80/50mmHg, 맥박 120회/분, 호흡 24회/분, 체온 36.2도였다. 가슴 청진에서 심박동은 빠르고 불규칙하였으며 양쪽 등쪽 아랫부분에서 거품소리가 들렸다. 양쪽 정강뼈앞 오목부종이 있었다. 가슴 X선 사진과 심전도이다. 심초음파검사 결과는 다음과 같았다. 심장동맥조영술은 정상이었다. 진단은?",
      "findings": [
        "왼심실확장기말 지름: 58mm(참고치, 39~53)",
        "왼심실박출률: 24%(참고치, ≥55)",
        "왼심실 중간부에서 심장끝까지의 확장 및 심실벽 무운동(akinesia)"
      ],
      "reasoning": "큰 정서적 스트레스 뒤 발생했고, 관상동맥조영술은 정상인데 좌심실 중간부부터 심첨부까지 무운동을 보여. 스트레스유발심근병증, 즉 Takotsubo 심근병증에 맞는 조합이야. 관상동맥 상태와 심초음파의 벽운동 분포를 같이 읽자.",
      "selectionReason": "족보에서 익숙한 HCM·심근염 외의 심근병증을 대비하는 문항이야. 스트레스라는 병력뿐 아니라 정상 관상동맥과 특징적인 벽운동을 함께 확인하게 해.",
      "relatedJ": [
        {
          "number": "25134",
          "label": "심근염에 의한 심부전과 비교"
        }
      ],
      "priority": "extra",
      "selection": "extension",
      "supplement": "현재 저혈압과 폐울혈이 있어 급성 심부전·쇼크에 대한 평가와 치료가 필요해. 원인이 스트레스였다는 점과 현재 순환 상태의 치료는 함께 살펴야 해.",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 303,
        "number": 3,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K17-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K17-figure.jpg",
          "alt": "K17 교재 제시 그림",
          "width": 1140,
          "height": 1020
        }
      ]
    },
    {
      "id": "K18",
      "key": "kmle2025-cardio-p321-q09",
      "category": "failure",
      "title": "운동 중 실신과 발살바 때 커지는 잡음",
      "tags": [
        31,
        23
      ],
      "answers": [
        3
      ],
      "choices": [
        "QT연장증후군",
        "브루가다증후군",
        "비대심장근육병",
        "확장심장근육병",
        "오른심실형성이상"
      ],
      "question": "42세 남자가 1시간 전에 테니스 경기를 하다가 쓰러져서 응급실로 왔다. 그의 아버지는 43세에 갑자기 사망하였다. 혈압 112/71mmHg, 맥박 74회/분, 호흡 17회/분, 체온 36.6℃이다. 가슴 청진에서 복장뼈 왼쪽 옆 두 번째 갈비 사이에서 3/6도의 수축기 잡음이 들리고, 발살바조작 때 잡음이 커진다. 심장끝에서 3/6도의 수축기 잡음이 들린다. 심전도이다. 진단은?",
      "findings": [],
      "reasoning": "운동 중 실신, 급사 가족력, 발살바 때 커지는 수축기 잡음을 묶으면 HCM이야. 발살바로 좌심실 충만이 줄면 동적인 유출로 폐쇄가 심해져 잡음이 커질 수 있어. 가족력만으로 유전성 부정맥을 고르기보다 잡음의 변화까지 활용하자.",
      "selectionReason": "J25137과 거의 같은 출제 구조라 대표 연결 문항으로 남겼어. 급사 가족력이 있는 여러 질환 중 신체진찰로 HCM을 골라내는 연습이야.",
      "relatedJ": [
        {
          "number": "25137",
          "label": "HCM 실신 증례"
        },
        {
          "number": "25135",
          "label": "HCM 치료"
        }
      ],
      "priority": "core",
      "selection": "connection",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 321,
        "number": 9,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K18-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K18-figure.jpg",
          "alt": "K18 교재 제시 그림",
          "width": 1139,
          "height": 570
        }
      ]
    },
    {
      "id": "K19",
      "key": "kmle2025-cardio-p327-q04",
      "category": "failure",
      "title": "약물로 버티지 못하는 전격성 심근염",
      "tags": [
        30,
        31
      ],
      "answers": [
        4
      ],
      "choices": [
        "질산염",
        "인도메타신",
        "심장동맥중재술",
        "체외막산소공급",
        "심실재동기화치료"
      ],
      "question": "33세 남자가 2일 전부터 숨이 차고 식은땀이 나서 응급실에 왔다. 1주 전부터 오한과 가슴 통증이 있었다고 한다. 혈압 81/62mmHg, 맥박 103회/분, 호흡 23회/분, 체온 36.1℃이다. 피부는 차갑고 축축하다. 혈액검사 결과는 다음과 같다. 심전도이다. 0.9% 식염수 1리터를 급속 정주하고 노르에피네프린을 투여해도 혈압은 82/59mmHg이다. 치료는?",
      "findings": [
        "뇌나트륨이뇨펩티드 2,200ng/L(참고치, <100)",
        "트로포닌 T 1,300ng/L(참고치, <14)",
        "크레아틴키나아제 MB 150ng/mL(참고치, <5.5)"
      ],
      "reasoning": "감염 전구증상 뒤 심근 손상과 급격한 심부전·쇼크가 발생한 흐름으로, 교재는 전격성 심근염을 의심해. 수액과 노르에피네프린에도 저혈압이 지속되므로 ECMO 같은 기계순환보조가 필요한 단계야. 핵심은 이미 시행한 치료에도 순환이 회복되지 않았다는 점이야.",
      "selectionReason": "J25132의 심한 급성 심부전·순환보조 판단과 이어지는 문항이야. 심근염을 진단하는 데서 치료에 반응하지 않는 쇼크의 다음 단계까지 연결해.",
      "relatedJ": [
        {
          "number": "25132",
          "label": "급성 심부전과 순환보조"
        },
        {
          "number": "25134",
          "label": "감염 후 심근염"
        }
      ],
      "priority": "core",
      "selection": "connection",
      "supplement": "",
      "references": [
        [
          "ESC 2025 · 심근염·심막염 지침",
          "https://doi.org/10.1093/eurheartj/ehaf192"
        ]
      ],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 327,
        "number": 4,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K19-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K19-figure.jpg",
          "alt": "K19 교재 제시 그림",
          "width": 1139,
          "height": 585
        }
      ]
    },
    {
      "id": "K20",
      "key": "kmle2025-cardio-p335-q04",
      "category": "pericardium",
      "title": "소량 삼출을 동반한 급성 심장막염",
      "tags": [
        33
      ],
      "answers": [
        2
      ],
      "choices": [
        "베타차단제",
        "비스테로이드소염제",
        "모르핀",
        "고리작용이뇨제",
        "질산염"
      ],
      "question": "23세 여자가 하루 전부터 가슴이 아파서 왔다. 7일 전 감기 증상이 있었다고 하였다. 통증은 몸을 앞으로 숙이면 덜해졌고 운동과 관련이 없다고 하였다. 혈압 120/80mmHg, 맥박 94회/분, 호흡 18회/분, 체온 36.6도였다. 가슴 X선 사진과 심전도이다. 심초음파검사에서 소량의 심장막삼출 외에는 정상 소견이었다. 혈액검사 결과는 다음과 같았다. 치료는?",
      "findings": [
        "트로포닌 T 6ng/L(참고치, 0~14)"
      ],
      "reasoning": "자세에 따라 달라지는 흉통과 넓은 범위의 ST 상승을 보이는 급성 심장막염이야. 혈압이 안정되고 삼출도 소량이므로 보기에서는 비스테로이드소염제를 선택해. 현재 치료에서는 재발을 줄이기 위한 콜히친 병용도 함께 고려해.",
      "selectionReason": "족보의 심장막염 진단에서 항염증 치료까지 넓힌 문제야. 삼출이 보였다는 이유만으로 천자를 고르지 않고 혈역학 상태와 삼출 정도를 함께 읽게 해.",
      "relatedJ": [
        {
          "number": "22종139",
          "label": "급성 심장막염의 진단"
        },
        {
          "number": "25138",
          "label": "심장눌림증과 비교"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "",
      "references": [
        [
          "ESC 2025 · 심근염·심막염 지침",
          "https://doi.org/10.1093/eurheartj/ehaf192"
        ]
      ],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 335,
        "number": 4,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K20-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K20-figure.jpg",
          "alt": "K20 교재 제시 그림",
          "width": 1139,
          "height": 995
        }
      ]
    },
    {
      "id": "K21",
      "key": "kmle2025-cardio-p336-q06",
      "category": "pericardium",
      "title": "심근경색 후 다시 생긴 흉통의 양상",
      "tags": [
        33,
        43
      ],
      "answers": [
        4
      ],
      "choices": [
        "대상포진",
        "갈비연골염",
        "이형협심증",
        "급성심장막염",
        "불안정협심증"
      ],
      "question": "75세 여자가 사흘 전부터 가슴이 아파서 병원에 왔다. 2주일 전에 급성 심근경색증으로 치료받았다. 가슴 가운데에 송곳으로 찌르는 듯한 날카로운 통증이 지속적으로 있었는데, 왼쪽 어깨로 뻗쳤다. 통증은 들숨 때와 누울 때 악화되었으며 앉아서 앞으로 수그리면 완화되었다. 혈압 110/70mmHg, 맥박 90회/분, 호흡 16회/분, 체온 36.8도였다. 가슴에 압통은 없었다. 가슴 통증은 니트로글리세린을 혀 밑에 투여하여도 호전되지 않았다. 진단은?",
      "findings": [],
      "reasoning": "들숨과 누운 자세에서 심해지고 앞으로 숙이면 좋아지는 통증은 심장막염의 전형적인 단서야. 심근경색 2주 뒤라는 시점까지 합치면 심근경색 후 심장막염을 생각할 수 있어. 이전 심근경색 병력과 이번 흉통의 성격을 함께 읽자.",
      "selectionReason": "익숙한 감기 후 심장막염 대신 심근경색 후 흉통으로 배경을 바꾼 문항이야. 재경색·협심증과 심장막염을 통증 양상으로 구분하는 연습을 위해 넣었어.",
      "relatedJ": [
        {
          "number": "22종139",
          "label": "심장막염의 통증 양상"
        },
        {
          "number": "25007",
          "label": "심근경색 후 다른 합병증"
        }
      ],
      "priority": "extra",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 336,
        "number": 6,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K21-source.jpg",
      "images": []
    },
    {
      "id": "K22",
      "key": "kmle2025-cardio-p348-q08",
      "category": "pericardium",
      "title": "저혈압과 기이맥이 보이면 심장눌림증",
      "tags": [
        33
      ],
      "answers": [
        1
      ],
      "choices": [
        "심장막천자",
        "왼심실보조기구",
        "체외막산소공급",
        "심실재동기화치료",
        "대동맥내풍선맞박동"
      ],
      "question": "55세 남자가 하루 전부터 숨이 차서 병원에 왔다. 혈압 84/56mmHg, 맥박 110회/분, 호흡 25회/분, 체온 36.0℃이다. 숨을 들이쉬게 하고 혈압을 재니 수축기 혈압이 68mmHg이다. 가슴 청진에서 심음이 작게 들린다. 가슴 X선 사진이다. 혈액검사 결과는 다음과 같다. 치료는?",
      "findings": [
        "혈액요소질소/크레아티닌 14/0.8mg/dL",
        "뇌나트륨이뇨펩티드 120ng/L(참고치, <100)",
        "트로포닌 T 6ng/L(참고치, 0~14)"
      ],
      "reasoning": "들숨 때 수축기 혈압이 16mmHg 떨어지는 기이맥에 저혈압과 작은 심음이 동반됐어. 교재는 심장눌림증으로 판단해 심장막천자를 답으로 제시해. 심장 바깥의 압박을 풀어 심장이 다시 채워지게 하는 처치야.",
      "selectionReason": "J25138과 거의 같은 응급 판단을 확인하는 대표 연결 문항이야. 삼출 자체보다 순환장애를 일으키는 심장눌림증이라는 점에 집중하자.",
      "relatedJ": [
        {
          "number": "25138",
          "label": "기이맥과 심장막천자"
        },
        {
          "number": "25150",
          "label": "외상 후 심장눌림증"
        }
      ],
      "priority": "core",
      "selection": "connection",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 348,
        "number": 8,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K22-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K22-figure.jpg",
          "alt": "K22 교재 제시 그림",
          "width": 1136,
          "height": 650
        }
      ]
    },
    {
      "id": "K23",
      "key": "kmle2025-cardio-p359-q03",
      "category": "pericardium",
      "title": "복수·부종과 석회화된 심장막",
      "tags": [
        33
      ],
      "answers": [
        3
      ],
      "choices": [
        "dilated cardiomyopathy",
        "restrictive cardiomyopathy",
        "constrictive pericarditis",
        "old MI",
        "Budd-Chiari syndrome"
      ],
      "question": "45세 남자가 호흡곤란을 주소로 내원하였다. 과거력에서 환자는 15년 전 폐결핵을 앓은 적이 있다고 한다. 신체 검진에서 복수와 함께 하지의 부종이 관찰되었고 간은 3횡지 촉지되었다. 흉부 X선 소견이 다음과 같을 때 가장 가능성이 높은 진단은?",
      "findings": [],
      "reasoning": "결핵 과거력에 복수·하지부종·간비대가 있고, 흉부 사진에서 심장막 석회화가 보여. 딱딱해진 심장막이 이완기 충만을 제한하는 수축성 심장막염으로 연결하자. 심근 자체가 뻣뻣한 제한심근병증과는 병변의 위치를 구분하는 게 핵심이야.",
      "selectionReason": "J19073의 심도자·혈역학적 판단을 흉부 사진과 우심부전 양상으로 넓힌 문항이야. 심장눌림증에 편중되지 않도록 만성 심장막 질환도 한 문제 포함했어.",
      "relatedJ": [
        {
          "number": "19073",
          "label": "심장막 질환의 혈역학"
        }
      ],
      "priority": "extra",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 359,
        "number": 3,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K23-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K23-figure.jpg",
          "alt": "K23 교재 제시 그림",
          "width": 1138,
          "height": 550
        }
      ]
    },
    {
      "id": "K24",
      "key": "kmle2025-cardio-p369-q01",
      "category": "pericardium",
      "title": "심내막염이 의심되는데 TTE가 음성일 때",
      "tags": [
        29,
        39
      ],
      "answers": [
        3
      ],
      "choices": [
        "피부조직검사",
        "하지동맥조영",
        "식도경유심초음파",
        "심장 컴퓨터단층촬영",
        "하지정맥 도플러초음파"
      ],
      "question": "31세 여자가 3주 전부터 열이 나서 병원에 왔다. 열과 몸살이 지속되다가 3일 전부터는 계단을 올라갈 때 숨이 찬다고 한다. 혈압 100/60mmHg, 맥박 110회/분, 호흡 20회/분, 체온 38.1℃이다. 심첨부에서 수축기 잡음이 들린다. 발바닥에 사진과 같은 피부 병터가 보이고 압통은 관찰되지 않는다. 검사 결과는 다음과 같다. 검사는?",
      "findings": [
        "혈액: 혈색소 10.2g/dL, 백혈구 6,400/mm³, 혈소판 170,000/mm³, 아스파트산아미노기전달효소 60U/L, 알라닌아미노기전달효소 50U/L",
        "혈액배양(3쌍): 그람양성알균",
        "흉강경유심초음파: 중등도 승모판역류 관찰됨, 증식(vegetation) 관찰되지 않음"
      ],
      "reasoning": "발열·심잡음·혈액배양 양성에 압통 없는 발바닥 병변까지 있어 감염심내막염의 가능성이 높아. TTE에서 증식이 보이지 않아도 의심이 높으므로 TEE로 더 자세히 확인하자. 검사 한 번의 음성과 임상적으로 높은 의심을 함께 판단하는 문제야.",
      "selectionReason": "J25045의 진단 기준 암기에서 실제 검사 순서로 확장했어. 이미 시행한 검사 결과를 보고 다음 검사를 선택하는 임상 연습에 적합해.",
      "relatedJ": [
        {
          "number": "25045",
          "label": "감염심내막염 진단 기준"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 369,
        "number": 1,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K24-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K24-figure.jpg",
          "alt": "K24 교재 제시 그림",
          "width": 1139,
          "height": 705
        }
      ]
    },
    {
      "id": "K25",
      "key": "kmle2025-cardio-p375-q01",
      "category": "pericardium",
      "title": "심내막염 병력이 있는 환자의 치과 시술",
      "tags": [
        39
      ],
      "answers": [
        2
      ],
      "choices": [
        "세프트리악손(Ceftriaxone)",
        "아목시실린(Amoxicillin)",
        "나프실린(Nafcillin)",
        "메트로니다졸(Metronidazole)",
        "필요 없음"
      ],
      "question": "35세 여자가 치과에서 임플란트 시술을 받을 예정이다. 1년 전 감염성 심내막염을 앓은 적이 있었다. 예방적 조치는?",
      "findings": [],
      "reasoning": "과거 감염심내막염은 치과 시술 전 예방이 필요한 고위험 병력이야. 이 환자의 임플란트 시술에는 보기 중 아목시실린을 선택해. 예방이 필요한 심장 상태와 예방 대상 시술을 한 쌍으로 확인하자.",
      "selectionReason": "J25046에서 반복되는 예방 대상 선별을 짧은 증례로 확인하는 연결 문항이야. 여러 예방 문제를 중복 수록하지 않고 대표 하나를 남겼어.",
      "relatedJ": [
        {
          "number": "25046",
          "label": "치과 시술 전 예방 대상"
        }
      ],
      "priority": "core",
      "selection": "connection",
      "supplement": "",
      "references": [
        [
          "AHA · 감염심내막염 예방 안내",
          "https://www.heart.org/en/health-topics/infective-endocarditis"
        ]
      ],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 375,
        "number": 1,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K25-source.jpg",
      "images": []
    },
    {
      "id": "K26",
      "key": "kmle2025-cardio-p390-q06",
      "category": "ischemia",
      "title": "운동검사를 하기 어려운 안정 흉통 환자",
      "tags": [
        19,
        42
      ],
      "answers": [
        5
      ],
      "choices": [
        "심초음파검사",
        "목동맥 초음파검사",
        "운동부하 심전도검사",
        "운동부하 심근관류스캔",
        "컴퓨터단층촬영 관상동맥조영술"
      ],
      "question": "69세 여자가 5개월 전부터 가슴이 아팠다며 병원에 왔다. 통증은 한 달에 한두 번 계단을 오를 때에 생겼는데, 2~3분 안에 좋아졌다. 골관절염으로 무릎이 아파서 지팡이를 사용 한다. 혈압 126/72mmHg, 맥박 69회/분, 호흡 15회/분, 체온 36.6℃이다. 가슴 청진에서 심음과 호흡음은 정상이다. 정강뼈 앞 오목부종은 없다. 가슴 X선 사진과 심전도이다. 검사는?",
      "findings": [],
      "reasoning": "운동할 때 생기고 쉬면 수 분 내 좋아지는 안정 흉통이지만, 무릎 때문에 충분한 운동부하를 주기 어려워. 제시된 보기 중에서는 관상동맥 CT로 해부학적 협착을 평가하는 것이 적절해. 검사 이름보다 환자가 그 검사를 수행할 수 있는지를 먼저 살피자.",
      "selectionReason": "J25121의 안정협심증 검사에서 운동 능력이라는 조건을 바꾼 문항이야. 익숙한 운동부하검사를 무조건 고르는 습관을 점검하려고 넣었어.",
      "relatedJ": [
        {
          "number": "25121",
          "label": "안정협심증의 검사"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "운동이 어려운 환자에게 약물부하 영상검사도 선택지가 될 수 있어. 이 문항의 4번은 운동부하 검사로 제시되어 있다는 점을 확인하자.",
      "references": [
        [
          "ACC/AHA 2021 · 흉통 평가 지침",
          "https://www.jacc.org/doi/10.1016/j.jacc.2021.07.053"
        ]
      ],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 390,
        "number": 6,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K26-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K26-figure.jpg",
          "alt": "K26 교재 제시 그림",
          "width": 1137,
          "height": 1045
        }
      ]
    },
    {
      "id": "K27",
      "key": "kmle2025-cardio-p407-q02",
      "category": "ischemia",
      "title": "새벽의 반복 흉통과 관상동맥 연축",
      "tags": [
        42,
        52
      ],
      "answers": [
        5
      ],
      "choices": [
        "경과관찰",
        "나프록센 경구 투여",
        "아스피린 경구 투여",
        "비소프롤롤 경구 투여",
        "나이트로글리세린 혀밑 투여"
      ],
      "question": "43세 남자가 1개월 전부터 가슴 통증이 잦아진다며 병원에 왔다. 1년 전부터 1개월에 한 번 정도 조이는 듯한 복장밑 가슴 통증이 새벽에 생겨서 5~10분 정도 지속되었고 낮이나 운동 중에는 생기지 않았다. 1개월 전부터는 1주일에 한 번 정도로 잦아졌으나 지속 시간은 비슷하다고 한다. 20갑·년의 흡연자로, 3년 전에 끊었던 담배를 1개월 전부터 다시 피우기 시작했다고 한다. 혈압 140/84mmHg, 맥박 70회/분, 호흡 18회/분, 체온 36.0℃이다. 가슴진찰에서 가슴에 압통은 없고, 심음과 호흡음은 정상으로 들린다. 가슴 X선 사진과 심전도이다. 조치는?",
      "findings": [],
      "reasoning": "새벽에 반복되고 낮의 운동과 관계가 적은 흉통, 최근 재개한 흡연을 묶어 교재는 변이협심증을 판단해. 보기에서는 혀밑 나이트로글리세린으로 연축성 흉통을 완화하는 선택이야. 재발 예방에서는 금연과 칼슘통로차단제도 함께 떠올리자.",
      "selectionReason": "J25148·22종131의 변이협심증 판단에서 치료 선택으로 넓혔어. 활동과 시간대, 흡연이라는 병력의 조합을 읽는 연습이야.",
      "relatedJ": [
        {
          "number": "25148",
          "label": "질산염 반응과 흉통"
        },
        {
          "number": "22종131",
          "label": "새벽에 발생하는 흉통"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 407,
        "number": 2,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K27-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K27-figure.jpg",
          "alt": "K27 교재 제시 그림",
          "width": 1137,
          "height": 970
        }
      ]
    },
    {
      "id": "K28",
      "key": "kmle2025-cardio-p417-q04",
      "category": "ischemia",
      "title": "허혈성 흉통에 트로포닌이 상승했을 때",
      "tags": [
        43,
        52
      ],
      "answers": [
        1
      ],
      "choices": [
        "심장동맥조영술",
        "⁹⁹ᵐTc-심근관류스캔",
        "오른심장카테터검사",
        "운동부하심전도검사",
        "가슴 컴퓨터단층촬영"
      ],
      "question": "67세 남자가 2시간 전부터 가슴이 아프다며 응급실에 왔다. 2주 전부터 계단을 오를 때 가슴과 왼쪽 어깨가 아팠다. 5년 전부터 혈당강하제를 복용하고 있다. 혈압 112/72mmHg, 맥박 86회/분, 호흡 19회/분, 체온 36.9℃이다. 혈액검사 결과는 다음과 같다. 심전도이다. 검사는?",
      "findings": [
        "혈청 트로포닌 T 160ng/L(참고치, <14)"
      ],
      "reasoning": "지속되는 허혈성 흉통, 심전도의 ST 하강과 트로포닌 상승을 묶으면 NSTEMI를 생각할 수 있어. 현재는 심장동맥조영술로 병변을 평가하고 재관류 전략을 세우는 단계야. 안정 흉통의 검사 선택과 급성 관상동맥증후군의 검사 선택을 구분하자.",
      "selectionReason": "J25147과 같은 핵심 판단을 심전도가 있는 교재 증례로 확인하는 연결 문항이야. 안정협심증 검사 문항과 나란히 비교할 가치가 있어.",
      "relatedJ": [
        {
          "number": "25147",
          "label": "트로포닌 상승 후 검사"
        },
        {
          "number": "25121",
          "label": "안정 흉통 검사와 비교"
        }
      ],
      "priority": "core",
      "selection": "connection",
      "supplement": "",
      "references": [
        [
          "ACC/AHA 2025 · 급성 관상동맥증후군 지침",
          "https://www.jacc.org/doi/10.1016/j.jacc.2024.11.009"
        ]
      ],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 417,
        "number": 4,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K28-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K28-figure.jpg",
          "alt": "K28 교재 제시 그림",
          "width": 1139,
          "height": 490
        }
      ]
    },
    {
      "id": "K29",
      "key": "kmle2025-cardio-p435-q12",
      "category": "ischemia",
      "title": "하벽 경색과 저혈압에서 우심실 확인",
      "tags": [
        20,
        43
      ],
      "answers": [
        2
      ],
      "choices": [
        "심도자술",
        "우흉부유도 심전도",
        "흉부 CT",
        "심장 초음파 검사",
        "관상동맥조영술"
      ],
      "question": "63세 남자가 3시간 전 시작된 심한 흉통과 어지러움으로 응급실에 실려 왔다. 혈압은 70/50mmHg이었고 목정맥은 확장되어 있었다. 심전도 소견이 다음과 같을 때 가장 먼저 시행할 검사는?",
      "findings": [],
      "reasoning": "Ⅱ·Ⅲ·aVF의 ST 상승은 하벽 심근경색 소견이야. 여기에 저혈압과 목정맥 확장이 있어 우심실 경색 동반 여부를 우흉부유도, 특히 V4R로 확인하자. 12유도 심전도에서 읽은 위치를 추가 유도 선택까지 연결하는 문제야.",
      "selectionReason": "J25125의 하벽 경색 판독에서 다음 검사로 한 단계 확장했어. 우심실 경색에서 수액·질산염 판단이 달라지는 이유를 이해하는 바탕이 돼.",
      "relatedJ": [
        {
          "number": "25125",
          "label": "하벽 심근경색 판독"
        }
      ],
      "priority": "extra",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 435,
        "number": 12,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K29-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K29-figure.jpg",
          "alt": "K29 교재 제시 그림",
          "width": 1138,
          "height": 615
        }
      ]
    },
    {
      "id": "K30",
      "key": "kmle2025-cardio-p445-q02",
      "category": "ischemia",
      "title": "우심실 경색이 의심되는 저혈압의 첫 처치",
      "tags": [
        43
      ],
      "answers": [
        5
      ],
      "choices": [
        "도파민 주사",
        "도부타민 주사",
        "임시박동조율기",
        "나이트로글리세린 주사",
        "0.9% 식염수 급속주사"
      ],
      "question": "48세 남자가 3시간 전부터 지속되는 가슴통증으로 병원에 왔다. 25갑·년 흡연자이고, 2년 전부터 혈압강하제와 혈당 강하제를 복용하고 있다. 혈압 70/40mmHg, 맥박 48회/분, 호흡 22회/분, 체온 36.4℃이다. 목정맥은 확장되어 있고, 가슴 청진에서 심박동은 느리고 심음과 호흡음은 정상으로 들리며 복부 진찰에서 오른쪽 갈비뼈아래에서 2cm 너비로 간이 만져진다. 심전도이다. 치료는?",
      "findings": [],
      "reasoning": "하벽 경색 소견에 저혈압·목정맥 확장이 있지만 폐의 호흡음은 깨끗해 우심실 경색을 의심해. 교재는 전부하를 보충하는 0.9% 식염수를 첫 답으로 제시해. 실제로는 반응과 울혈을 반복 평가하며 투여하고, 신속한 재관류 치료를 함께 준비해야 해.",
      "selectionReason": "J25126의 저혈압을 동반한 급성 심근경색과 연결했어. 같은 저혈압이라도 폐울혈 유무와 경색 위치에 따라 초기 처치가 달라지는 핵심 판단이야.",
      "relatedJ": [
        {
          "number": "25126",
          "label": "심근경색과 저혈압"
        }
      ],
      "priority": "core",
      "selection": "connection",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 445,
        "number": 2,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K30-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K30-figure.jpg",
          "alt": "K30 교재 제시 그림",
          "width": 1139,
          "height": 625
        }
      ]
    },
    {
      "id": "K31",
      "key": "kmle2025-cardio-p448-q09",
      "category": "ischemia",
      "title": "최근 출혈 병력이 있는 STEMI의 재관류",
      "tags": [
        19,
        43
      ],
      "answers": [
        5
      ],
      "choices": [
        "경과관찰",
        "H.pylori 제균치료",
        "리도케인",
        "혈전용해제",
        "관상동맥중재술"
      ],
      "question": "48세 남자가 2시간 전부터 명치부위가 조이듯 아파서 병원에 왔다. 2주 전에 전에 혈변이 있어서 식도위내시경검사에서 십이지장궤양으로 진단받고 약물치료를 받고 있는 중이다. 혈압 116/74mmHg, 맥박 100회/분이었다. 심전도이다. 치료는?",
      "findings": [],
      "reasoning": "Ⅱ·Ⅲ·aVF의 ST 상승이 있는 급성 심근경색으로 재관류가 필요해. 최근 십이지장궤양 출혈 병력까지 있으므로 보기 중에서는 관상동맥중재술을 선택해. 흉통의 시작 시간에 더해 출혈 위험을 함께 읽는 것이 핵심이야.",
      "selectionReason": "족보에서 익숙한 STEMI에 최근 위장관 출혈이라는 치료 선택 조건을 추가했어. 진단 후 혈전용해와 PCI 중 어느 방향으로 갈지 판단하는 연습이야.",
      "relatedJ": [
        {
          "number": "25125",
          "label": "심근경색의 심전도"
        },
        {
          "number": "25006",
          "label": "관상동맥 재관류 치료"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "",
      "references": [
        [
          "ACC/AHA 2025 · 급성 관상동맥증후군 지침",
          "https://www.jacc.org/doi/10.1016/j.jacc.2024.11.009"
        ]
      ],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 448,
        "number": 9,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K31-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K31-figure.jpg",
          "alt": "K31 교재 제시 그림",
          "width": 1139,
          "height": 425
        }
      ]
    },
    {
      "id": "K32",
      "key": "kmle2025-cardio-p458-q04",
      "category": "ischemia",
      "title": "심근경색 며칠 뒤 새로 생긴 수축기 잡음",
      "tags": [
        43,
        47
      ],
      "answers": [
        5
      ],
      "choices": [
        "심장눌림증",
        "급성 심막염",
        "폐동맥 색전증",
        "급성 폐부종",
        "심실중격 천공"
      ],
      "question": "앞벽 심근경색으로 입원한 63세 남자가 입원 3일째에 갑작스럽게 호흡곤란을 호소하다가 의식을 잃었다. BP 90/60mmHg, 맥박수 124회/분, 수축기에 복장뼈 왼쪽에서 심잡음이 들렸다. 산소포화도는 85%이었다. 환자의 상태를 설명할 수 있는 가장 가능성이 높은 진단은?",
      "findings": [],
      "reasoning": "앞벽 심근경색 며칠 뒤 갑작스러운 쇼크와 새 수축기 잡음이 생겼어. 복장뼈 왼쪽의 잡음까지 합치면 심실중격 파열에 의한 좌우단락을 생각하자. 심근경색 후 급격히 악화될 때 기계적 합병증을 떠올리는 문제야.",
      "selectionReason": "J25007과 같은 중요한 합병증이라 연결 문항으로 남겼어. 심초음파 결과가 먼저 주어지지 않아도 시점·쇼크·잡음으로 원인을 추론할 수 있게 해.",
      "relatedJ": [
        {
          "number": "25007",
          "label": "심근경색 후 심실중격 파열"
        }
      ],
      "priority": "core",
      "selection": "connection",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 458,
        "number": 4,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K32-source.jpg",
      "images": []
    },
    {
      "id": "K33",
      "key": "kmle2025-cardio-p465-q03",
      "category": "failure",
      "title": "혈압을 회복시킨 뒤에도 원인 치료는 필요",
      "tags": [
        30,
        43
      ],
      "answers": [
        2
      ],
      "choices": [
        "심장이식",
        "심장동맥중재술",
        "삽입심장충격기",
        "좌심실보조장치",
        "체외막산소공급"
      ],
      "question": "57세 남자가 1일 전부터 숨이 차고 가슴이 답답해서 병원에 왔다. 10년 전부터 경구 혈당강하제와 혈압강하제를 복용 중이다. 혈압 76/58mmHg, 맥박 102회/분, 호흡 26회/분, 체온 35.8℃이다. 얼굴이 창백하고 상하지의 피부는 차고 축축하다. 가슴청진에서 심음은 규칙적이고, 양쪽 등쪽 아랫부분에서 거품소리가 들린다. 가슴 X선 사진과 심전도이다. 검사 결과는 다음과 같다. 응급실에서 결정질용액과 노르에피네프린 정맥 주사 후 혈압은 130/75mmHg이다. 치료는?",
      "findings": [
        "혈액: 혈액요소질소/크레아티닌 24/1.3mg/dL, 크레아틴인산화효소 MB동종효소 200.6ng/mL(참고치, 0.6~6.3), 트로포닌 T 1,090.6ng/L(참고치, <14), 뇌나트륨배설펩타이드 1,529pg/mL(참고치, <100), 젖산 6.4mmol/L(참고치, 0.5~2.2)",
        "심초음파: 좌심실 수축말기 직경 38mm(참고치, <40), 좌심실 확장말기 직경 54mm(참고치, <60), 좌심실 박출률 38%(참고치, ≥55), 좌심실 앞벽 및 중격에 국소벽 운동감소증 있음"
      ],
      "reasoning": "심근경색에 의한 심장성 쇼크에서 혈압은 일단 회복됐지만, 앞벽·중격의 허혈 원인은 남아 있어. 심장동맥중재술로 막힌 혈관을 재관류하는 것이 다음 치료야. 순환을 버티게 하는 처치와 원인을 해결하는 처치를 순서대로 연결하자.",
      "selectionReason": "초기 쇼크 처치에 익숙해진 뒤 다음 단계를 묻는 문제로 골랐어. 같은 순환보조 보기라도 약물에 대한 반응과 심근경색 여부를 읽어야 답을 정할 수 있어.",
      "relatedJ": [
        {
          "number": "25126",
          "label": "심근경색의 초기 처치"
        },
        {
          "number": "25132",
          "label": "순환보조가 필요한 상황과 비교"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "",
      "references": [
        [
          "ACC/AHA 2025 · 급성 관상동맥증후군 지침",
          "https://www.jacc.org/doi/10.1016/j.jacc.2024.11.009"
        ]
      ],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 465,
        "number": 3,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K33-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K33-figure.jpg",
          "alt": "K33 교재 제시 그림",
          "width": 1140,
          "height": 1125
        }
      ]
    },
    {
      "id": "K34",
      "key": "kmle2025-cardio-p481-q02",
      "category": "assessment",
      "title": "젊은 고혈압 환자에서 들리는 복부 잡음",
      "tags": [
        32
      ],
      "answers": [
        3
      ],
      "choices": [
        "정맥깔대기조영술",
        "복부 CT",
        "콩팥 자기공명혈관조영술",
        "24시간 소변 미세알부민",
        "콩팥 생검"
      ],
      "question": "30세 여자가 건강검진에서 우연히 발견된 고혈압으로 내원하였다. 고혈압의 가족력은 없었다. 혈압은 170/110mmHg이었고, 오른쪽 윗배에서 잡음이 들렸다. 진단에 도움이 되는 검사는?",
      "findings": [
        "혈액: BUN/Cr 16/0.7",
        "소변: 단백(-), 잠혈(-), 적혈구 1~3/HPF, 백혈구 0~1/HPF"
      ],
      "reasoning": "젊은 나이에 심한 고혈압이 있고 복부 혈관 잡음이 들리므로 신혈관성 고혈압을 의심하자. 보기 중 콩팥 자기공명혈관조영술로 콩팥동맥을 평가하는 것이 적절해. 일반적인 혈압 조절 문제에서 이차성 원인을 찾는 문제로 넘어가는 단서가 복부 잡음이야.",
      "selectionReason": "현재 임상 족보의 고혈압 문항에 비해 이차성 고혈압의 다음 검사를 직접 고르는 연습이 적어 보완용으로 넣었어. 기초 약리 암기보다 환자 단서에서 원인을 찾는 임상 판단에 초점을 맞췄어.",
      "relatedJ": [],
      "priority": "extra",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 481,
        "number": 2,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K34-source.jpg",
      "images": []
    },
    {
      "id": "K35",
      "key": "kmle2025-cardio-p489-q02",
      "category": "assessment",
      "title": "두 약제로 조절되지 않을 때 검사값까지 보고 추가",
      "tags": [
        32
      ],
      "answers": [
        5
      ],
      "choices": [
        "로살탄 증량",
        "암로디핀 증량",
        "비소프롤롤 추가",
        "스피로놀락톤 추가",
        "하이드로클로로싸이아자이드 추가"
      ],
      "question": "57세 남자가 혈압이 높아서 병원에 왔다. 3년 전부터 고혈압으로 혈압강하제를 복용 중이다. 약제 복용을 빠뜨리지 않았고 규칙적으로 운동을 하고있다. 혈압 154/102mmHg, 맥박 52회/분, 호흡 16회/분, 체온 36.7℃이다. 가슴청진에서 심음과 호흡음은 정상으로 들린다. 가정혈압과 복용 중인 약제, 검사 결과는 다음과 같다. 치료는?",
      "findings": [
        "가정혈압(오른쪽/왼쪽): 아침 148/94mmHg, 143/98mmHg / 저녁 138/90mmHg, 145/95mmHg",
        "복용 약제: 로살탄 100mg 하루 1회, 암로디핀 10mg 하루 1회",
        "혈액: Na⁺/K⁺/Cl⁻ 142/5.4/102meq/L, 혈액요소질소/크레아티닌 14/1.2mg/dL, 요산 4.9mg/dL(참고치, 3.1~7.0), 중성지방 128mg/dL, HDL 콜레스테롤 47mg/dL, LDL 콜레스테롤 102mg/dL"
      ],
      "reasoning": "로살탄과 암로디핀을 충분한 용량으로 쓰고 있는데 혈압이 높아 이뇨제를 추가하는 흐름이야. K 5.4와 맥박 52회/분이라는 조건까지 읽으면 보기에서는 티아지드계 약제가 적절해. 현재 두 약제만 쓰고 있으므로 저항성 고혈압의 정의와도 구분해서 정리하자.",
      "selectionReason": "J25044의 저항성 고혈압 정의를 실제 병용요법 선택으로 넓혔어. 혈압뿐 아니라 현재 용량·칼륨·맥박이 답을 결정하게 만든 임상형 문항이야.",
      "relatedJ": [
        {
          "number": "25044",
          "label": "저항성 고혈압의 정의"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 489,
        "number": 2,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K35-source.jpg",
      "images": []
    },
    {
      "id": "K36",
      "key": "kmle2025-cardio-p492-q07",
      "category": "assessment",
      "title": "혈압약을 시작한 뒤 입술이 부을 때",
      "tags": [
        32
      ],
      "answers": [
        3
      ],
      "choices": [
        "약제를 이용한 첩포검사",
        "혈청 트립신분해효소 측정",
        "약제 중단 후 부종 소실 확인",
        "혈청 앤지오텐신전환효소 측정",
        "약제를 이용한 알레르기 피부따끔검사"
      ],
      "question": "50세 여자가 2주 전부터 반복적으로 눈 주위와 입술이 붓는다며 병원에 왔다. 간혹 배가 아프다고 한다. 별다른 가족력은 없다. 1개월 전부터 고혈압으로 앤지오텐신전환효소억제제를 복용 중이다. 혈압 130/70mmHg, 맥박 75회/분, 호흡 20회/분, 체온 36.5℃이다. 몸에 두드러기는 없다. 진단을 위한 조치는?",
      "findings": [],
      "reasoning": "ACE억제제 복용 후 두드러기 없이 입술·눈 주위가 붓는 흐름은 약물 관련 혈관부종을 의심하게 해. 원인 약을 중단하고 경과를 확인하는 답을 고르자. 약 시작 시점과 증상 발생 시점을 연결하는 것이 핵심이야.",
      "selectionReason": "임상 고혈압 족보의 목표 혈압·약제 선택에서, 복용 후 새 증상을 다루는 상황으로 넓혔어. 직접 대응하는 임상 J가 확인되지 않아 보완 문항으로 분류했어.",
      "relatedJ": [],
      "priority": "extra",
      "selection": "extension",
      "supplement": "혀·목 부종, 목소리 변화나 호흡곤란이 동반되면 기도 위험을 먼저 평가해야 해.",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 492,
        "number": 7,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K36-source.jpg",
      "images": []
    },
    {
      "id": "K37",
      "key": "kmle2025-cardio-p497-q18",
      "category": "assessment",
      "title": "ARB 뒤 크레아티닌이 조금 오른 경우",
      "tags": [
        32
      ],
      "answers": [
        1
      ],
      "choices": [
        "현재 치료 유지",
        "칼륨교환수지 추가",
        "칼슘통로차단제 중단",
        "앤지오텐신수용체차단제 감량",
        "앤지오텐신수용체차단제 중단"
      ],
      "question": "65세 남자가 혈압이 높다고 병원에 왔다. 1년 전에 고혈압으로 진단받고 칼슘통로차단제를 복용 중이다. 혈압 156/96mmHg, 맥박 72회/분, 호흡 18회/분, 체온 36.7℃이다. 앤지오텐신수용체 차단제를 추가로 복용하고 2주일 후에는 혈압 126/76mmHg, 맥박 68회/분, 호흡 18회/분, 체온 36.6℃이다. 앤지오텐신수용체 차단제 투여 전과 2주 후의 혈액검사 결과는 다음과 같다. 처치는?",
      "findings": [
        "투여 전: 혈액요소질소/크레아티닌 19/1.1mg/dL, 사구체여과율 70mL/min/1.73m², Na⁺/K⁺/Cl⁻ 140/4.3/108meq/L",
        "투여 2주 후: 혈액요소질소/크레아티닌 23/1.3mg/dL, 사구체여과율 57mL/min/1.73m², Na⁺/K⁺/Cl⁻ 139/4.8/106meq/L"
      ],
      "reasoning": "크레아티닌은 1.1에서 1.3으로 약 18% 상승했고, 혈압은 좋아졌으며 심한 고칼륨혈증도 없어. 현재 치료를 유지하면서 신기능과 칼륨을 추적하는 선택이 적절해. ACE억제제·ARB 시작 후 수치를 볼 때는 상승 여부뿐 아니라 기저치 대비 변화 폭을 계산하자.",
      "selectionReason": "J21122의 신장질환 동반 고혈압에서 약을 고른 뒤, 추적 검사 때문에 약을 유지할지 중단할지 판단하는 상황까지 확장했어.",
      "relatedJ": [
        {
          "number": "21122",
          "label": "단백뇨 동반 고혈압의 약제"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "KDIGO 2024는 시작·증량 후 2~4주에 신기능과 칼륨을 확인하고, 4주 이내 크레아티닌이 30%를 넘게 상승하면 원인 평가와 치료 재검토를 하도록 안내해.",
      "references": [
        [
          "KDIGO 2024 · CKD 지침",
          "https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf"
        ]
      ],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 497,
        "number": 18,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K37-source.jpg",
      "images": []
    },
    {
      "id": "K38",
      "key": "kmle2025-cardio-p508-q05",
      "category": "vascular",
      "title": "등과 배로 뻗치는 갑작스러운 흉통",
      "tags": [
        36
      ],
      "answers": [
        5
      ],
      "choices": [
        "D-이량체",
        "관상동맥조영술",
        "운동부하 심전도 검사",
        "약물부하 심근관류스캔",
        "가슴 및 복부 컴퓨터단층촬영"
      ],
      "question": "63세 남자가 2시간 전부터 가슴이 아프다며 응급실에 왔다. 통증은 가슴 가운데에서 찢어지는 듯하게 생겨 등과 배쪽으로 뻗쳤다. 12년 전부터 혈압강하제를 불규칙하게 복용하고 있다. 혈압 186/103mmHg, 맥박 84회/분, 호흡 18회/분, 체온 36.6℃이다. 목정맥은 늘어나 있지 않고 가슴 청진에서 심음과 호흡음은 정상이다. 혈액검사 결과는 다음과 같다. 가슴 X선 사진과 심전도이다. 검사는?",
      "findings": [
        "트로포닌-T 8ng/L(참고치, 0~14)"
      ],
      "reasoning": "갑자기 시작해 등과 배로 뻗치는 찢어지는 통증, 조절되지 않은 고혈압과 종격동 확장은 대동맥박리를 의심하게 해. 가슴·복부 CT로 박리의 위치와 범위를 확인하는 답이야. 관상동맥 질환의 검사 흐름과 구별해서 대동맥 전체를 평가하자.",
      "selectionReason": "J25082의 CT 진단에서 한 단계 앞인 검사 선택으로 확장했어. 응급 흉통에서 어떤 혈관을 먼저 살펴야 하는지 연습하는 문항이야.",
      "relatedJ": [
        {
          "number": "25082",
          "label": "대동맥 질환의 CT 판독"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 508,
        "number": 5,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K38-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K38-figure.jpg",
          "alt": "K38 교재 제시 그림",
          "width": 1137,
          "height": 1145
        }
      ]
    },
    {
      "id": "K39",
      "key": "kmle2025-cardio-p509-q06",
      "category": "vascular",
      "title": "대동맥박리의 초기 혈압·박동 조절",
      "tags": [
        36
      ],
      "answers": [
        3
      ],
      "choices": [
        "질산염(nitrate)",
        "아스피린(aspirin)",
        "라베탈롤(labetalol)",
        "니페디핀(nifedipine)",
        "히드랄라진(hydralazine)"
      ],
      "question": "57세 여자가 3시간 전부터 가슴이 아파서 왔다. 3년 전부터 혈압이 높다는 말을 들었으나 혈압강하제는 복용하지 않았다. 통증은 목에서 등까지 뻗친다고 했다. 혈압은 오른쪽 팔이 182/104mmHg, 왼쪽 팔이 174/96mmHg, 맥박 62회/분, 호흡 17회/분, 체온 36.0도였다. 가슴 CT 사진과 심전도이다. 치료는?",
      "findings": [],
      "reasoning": "CT에서 대동맥박리를 확인하고 혈관벽에 가해지는 압력과 박동의 힘을 줄이는 초기 치료를 고르는 문제야. 보기 중 라베탈롤을 선택해. 이후 상행대동맥 침범 여부와 합병증을 평가해 수술·중재가 필요한지도 판단해야 해.",
      "selectionReason": "대동맥박리를 알아보는 J25082에서 초기 약물 처치까지 확장했어. 일반적인 고혈압 치료와 급성 대동맥박리의 목표가 어떻게 연결되는지 확인할 수 있어.",
      "relatedJ": [
        {
          "number": "25082",
          "label": "대동맥박리 판독"
        }
      ],
      "priority": "core",
      "selection": "extension",
      "supplement": "",
      "references": [
        [
          "ACC/AHA 2022 · 대동맥질환 지침",
          "https://www.jacc.org/doi/10.1016/j.jacc.2022.08.004"
        ]
      ],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 509,
        "number": 6,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K39-source.jpg",
      "images": [
        {
          "src": "assets/kmle-2025/K39-figure.jpg",
          "alt": "K39 교재 제시 그림",
          "width": 1136,
          "height": 1325
        }
      ]
    },
    {
      "id": "K40",
      "key": "kmle2025-cardio-p515-q05",
      "category": "vascular",
      "title": "젊은 여성의 양팔 혈압 차이와 팔 통증",
      "tags": [
        36,
        38
      ],
      "answers": [
        5
      ],
      "choices": [
        "버거씨병",
        "레이노병",
        "Arteriovenous fistula",
        "죽상경화증",
        "Takayasu’s disease"
      ],
      "question": "30세 여자가 혈압이 낮다고 병원에 왔다. 오른쪽 팔에서 측정한 혈압은 120/80mmHg, 왼쪽 팔에서 측정한 혈압은 70/40mmHg이었다. 왼쪽 손은 7년 전부터 설거지나 청소를 하면 통증이 발생했다. 혈액검사 결과는 다음과 같다. 진단은?",
      "findings": [
        "백혈구 4700, Hb 10, ESR 60(<20), CRP 7(<3)"
      ],
      "reasoning": "젊은 여성에서 양팔 혈압이 크게 다르고 팔을 쓰면 아프며 염증수치가 높아. 큰 혈관을 침범하는 다카야수동맥염을 생각하자. 한쪽 팔의 낮은 혈압을 전신 저혈압으로 읽기 전에 양쪽 혈관 상태를 비교하는 것이 핵심이야.",
      "selectionReason": "족보의 대동맥박리·죽상경화성 말초동맥질환 외에 큰 혈관 염증도 대비하도록 포함했어. 현재 임상 J에서 이 진단을 직접 묻는 문항은 확인하지 못해 선택 보완 문항으로 두었어.",
      "relatedJ": [],
      "priority": "extra",
      "selection": "extension",
      "supplement": "",
      "references": [],
      "source": {
        "book": "2025 KMLE 교과서 · 순환기계",
        "page": 515,
        "number": 5,
        "answerBasis": "교재 해당 문항 해설"
      },
      "sourceImage": "assets/kmle-2025/K40-source.jpg",
      "images": []
    }
  ],
  "selectionPolicy": {
    "total": 40,
    "core": 30,
    "extra": 10,
    "basis": "2025 KMLE 순환기계 교재의 증례와 현재 임상 족보를 대조",
    "rules": [
      "반복되는 핵심 판단은 대표 문항만 남겼어.",
      "검사 선택·응급 처치·치료 결정으로 넓어지는 증례를 우선했어.",
      "임상 확장은 같은 질환의 다른 판단도 포함해. 미출제라고 단정하는 표시는 아니야.",
      "기초의학 복습용 문제와 같은 판단이 반복되는 문항은 제외했어.",
      "교재 범위에 맞춰 성인 순환기를 선별했어. 소아·선천성 심질환 전 범위를 다룬 구성은 아니야."
    ]
  }
};
