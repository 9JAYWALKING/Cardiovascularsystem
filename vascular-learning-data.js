/* 36–37강 원본 사진과 독립 학습 표시. */
(function(){
const data={
  "cases": {
    "v36-coa": {
      "label": "축착 조영술",
      "title": "좁아진 협부 → 상·하지 혈압 차이",
      "summary": "",
      "src": "./J/2025/25081-1.jpg",
      "width": 1151,
      "height": 1125,
      "source": "36강 p.5와 동일 도해 · 25081 사진",
      "alt": "좁아진 협부 → 상·하지 혈압 차이",
      "layout": "photo-first",
      "steps": [
        {
          "label": "협착 위치",
          "text": "검은 화살표 끝의 대동맥 협부가 국소적으로 좁다. 팔로 가는 혈관보다 아래쪽의 협착이므로 팔 혈압은 높고 다리 혈압·맥박은 낮아질 수 있다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 603,
              "y": 456,
              "label": "축착"
            }
          ]
        },
        {
          "label": "동반 질환",
          "text": "영상의 축착을 진단한 뒤, 흔한 동반 병변인 이엽성 대동맥판(BAV)을 고른다. 이 사진 자체에서 대동맥판 첨판 수를 세어 확정하는 것은 아니다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ]
    },
    "v36-aneurysm": {
      "label": "상행대동맥",
      "title": "상행·근부 확장 → 대동맥판역류",
      "summary": "",
      "src": "./assets/vascular-36-37/l36-p09-i2.jpg",
      "width": 510,
      "height": 522,
      "source": "36강 p.9 원본 · 23068/25084와 같은 영상",
      "alt": "상행·근부 확장 → 대동맥판역류",
      "layout": "photo-first",
      "steps": [
        {
          "label": "확장 부위",
          "text": "49.5 mm 측정선이 놓인 상행대동맥이 넓어져 있다. 판막 첨판 자체의 협착을 보여 주는 사진과 구별한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 430,
              "y": 436,
              "label": "상행 확장"
            }
          ]
        },
        {
          "label": "잡음·혈압 연결",
          "text": "근부가 늘어나 판막이 제대로 맞닿지 않으면 이완기에 역류한다. 이완기 잡음·넓은 맥압·호흡곤란을 합쳐 AR로 해석한다. 역류 정도는 심초음파로 확인한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 525,
              "y": 616,
              "label": "근부 쪽"
            }
          ]
        }
      ]
    },
    "v36-dissection-desc": {
      "label": "박리 · 하행",
      "title": "내강 안의 선 → intimal flap",
      "summary": "",
      "src": "./J/2025/25082-1.jpg",
      "width": 1024,
      "height": 697,
      "source": "25082 원본 · 강의 p.15, 20과 대조",
      "alt": "내강 안의 선 → intimal flap",
      "layout": "photo-first",
      "steps": [
        {
          "label": "내막판",
          "text": "척추 옆 하행대동맥 안을 가르는 선이 보인다. 혈관벽 전체가 두꺼워지는 소견보다 두 내강을 나누는 내막판이 대동맥박리의 핵심이다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 652,
              "y": 743,
              "label": "내막판"
            }
          ]
        },
        {
          "label": "한 단면의 한계",
          "text": "이 단면은 박리 진단을 지지한다. 상행 침범 여부와 전체 범위·분지 관류는 CT 전체를 확인해야 하므로 이 사진 한 장만으로 B형을 확정하지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ]
    },
    "v36-dissection-asc": {
      "label": "박리 · 상행",
      "title": "상행대동맥 안을 가르는 막",
      "summary": "",
      "src": "./J/2023/23066-1.jpg",
      "width": 644,
      "height": 530,
      "source": "23066 원본 · 강의 p.15와 같은 소견",
      "alt": "상행대동맥 안을 가르는 막",
      "layout": "photo-first",
      "steps": [
        {
          "label": "상행 내막판",
          "text": "앞쪽 상행대동맥의 붉은 원 안에서 내강을 가르는 막을 찾는다. 이중 내강을 만드는 박리는 벽내혈종과 구별된다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 443,
              "y": 250,
              "label": "상행 flap"
            }
          ]
        },
        {
          "label": "범위 연결",
          "text": "같은 문항의 다음 단면에서는 하행대동맥에도 박리가 보인다. 상행 침범이 있다는 사실은 Stanford A 판단에 중요하다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ]
    },
    "v36-dissection-asc2": {
      "label": "박리 · 두 번째 단면",
      "title": "하행대동맥에도 이어진 박리",
      "summary": "",
      "src": "./J/2023/23066-2.jpg",
      "width": 548,
      "height": 517,
      "source": "23066 두 번째 원본 사진",
      "alt": "하행대동맥에도 이어진 박리",
      "layout": "photo-first",
      "steps": [
        {
          "label": "하행 내막판",
          "text": "뒤쪽 척추 옆 하행대동맥의 원 안에 막으로 나뉜 내강이 보인다. 첫 사진의 상행 병변과 함께 범위를 읽는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 588,
              "y": 562,
              "label": "하행 flap"
            }
          ]
        }
      ]
    },
    "v36-imh": {
      "label": "벽내혈종",
      "title": "내강 밖 벽의 초승달 → IMH",
      "summary": "",
      "src": "./J/2020/20080-1.jpg",
      "width": 1272,
      "height": 524,
      "source": "20080 공식 출제 사진 · 강의 p.16 대조",
      "alt": "내강 밖 벽의 초승달 → IMH",
      "layout": "photo-first",
      "steps": [
        {
          "label": "비조영·조영 비교",
          "text": "왼쪽 비조영 영상의 고음영 벽과 가운데 조영 영상의 두꺼운 벽을 비교한다. 밝게 조영되는 원형 내강 바깥에 초승달형 병변이 있으며 뚜렷한 두 번째 조영 내강은 보이지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 531,
              "y": 404,
              "label": "벽내혈종"
            }
          ]
        },
        {
          "label": "왜 박리와 다른가",
          "text": "전형적 박리는 내막판이 진강과 가강을 가른다. 이 사진의 중심은 막으로 갈라진 두 내강보다 벽 안에 모인 혈액이다. 급성 흉통에서 ECG가 정상이어도 배제되지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ]
    },
    "v36-pau": {
      "label": "관통성 궤양",
      "title": "국소적으로 벽을 파고든 조영제",
      "summary": "",
      "src": "./assets/vascular-36-37/l36-p17-i1.jpg",
      "width": 1181,
      "height": 998,
      "source": "36강 p.17 원본",
      "alt": "국소적으로 벽을 파고든 조영제",
      "layout": "photo-first",
      "steps": [
        {
          "label": "국소 돌출",
          "text": "오른쪽 종단 영상의 하행대동맥에서 내강 윤곽 밖으로 국소적으로 돌출한 조영제 주머니를 본다. 죽상경화판이 중막으로 파고든 PAU의 맥락이다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 835,
              "y": 661,
              "label": "국소 궤양"
            }
          ]
        },
        {
          "label": "감별의 축",
          "text": "광범위한 내막판이면 박리, 벽 안의 혈종이면 IMH, 국소적인 분화구·조영제 돌출이면 PAU를 먼저 생각한다. 서로 동반되거나 진행할 수 있다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ]
    },
    "v36-classification": {
      "label": "상행 + 하행",
      "title": "상행을 포함하면 Stanford A",
      "summary": "",
      "src": "./J/2019/19099-1.jpg",
      "width": 1457,
      "height": 903,
      "source": "19099·19100 제시 사진 · 36강 p.18–21 대조",
      "alt": "상행을 포함하면 Stanford A",
      "layout": "photo-first",
      "steps": [
        {
          "label": "상행 침범",
          "text": "흉곽 앞쪽 상행대동맥 안에 내막판이 보인다. 상행을 포함하므로 Stanford A로 분류한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 513,
              "y": 306,
              "label": "상행 flap"
            }
          ]
        },
        {
          "label": "하행까지",
          "text": "척추 옆 하행대동맥에도 막으로 나뉜 내강이 있다. 제시된 연속 범위를 상행에서 하행까지의 박리로 읽으면 DeBakey I이다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 538,
              "y": 543,
              "label": "하행 flap"
            }
          ]
        },
        {
          "label": "치료 연결",
          "text": "상행 침범은 파열·심장눌림증·대동맥판역류·관상동맥 허혈 위험과 연결된다. 진통·혈압 조절과 동시에 응급 수술을 준비한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ]
    },
    "v36-embolus-leg": {
      "label": "하지 CTA",
      "title": "갑작스러운 한쪽 다리 허혈",
      "summary": "",
      "src": "./J/2020/20083-1.jpg",
      "width": 289,
      "height": 577,
      "source": "20083 공식 출제 사진",
      "alt": "갑작스러운 한쪽 다리 허혈",
      "layout": "photo-first",
      "steps": [
        {
          "label": "오른쪽 혈류",
          "text": "영상 왼쪽은 환자 오른쪽이다. 반대편과 비교해 오른쪽 하지 동맥의 연속성이 끊기는 부위를 찾는다. 발문의 갑작스러운 통증과 합쳐 급성 동맥 폐색을 생각한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 281,
              "y": 315,
              "label": "혈류 단절 부위"
            }
          ]
        },
        {
          "label": "질문의 목적",
          "text": "질문은 하지 관류 정도가 아니라 원인 질환 감별 검사다. 다음 TEE의 좌심방 혈전 단서와 함께 심장 기원 색전의 원인을 찾는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ]
    },
    "v36-embolus-tee": {
      "label": "경식도 심초음파",
      "title": "좌심방 혈전 단서 → AF 원인 검사",
      "summary": "",
      "src": "./J/2020/20083-2.jpg",
      "width": 783,
      "height": 577,
      "source": "20083 공식 출제 사진 · 36강 p.25 기전 연결",
      "alt": "좌심방 혈전 단서 → AF 원인 검사",
      "layout": "photo-first",
      "steps": [
        {
          "label": "좌심방 쪽 병변",
          "text": "LA로 표시된 좌심방 쪽의 원래 흰 화살표가 가리키는 병변을 확인한다. 공식 문항의 급성 하지 색전 맥락에서 좌심방 혈전 단서로 해석한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 698,
              "y": 524,
              "label": "좌심방 혈전 단서"
            }
          ]
        },
        {
          "label": "Holter로 연결",
          "text": "심방세동은 좌심방 혈액 정체와 혈전을 만들 수 있다. 발작성 AF를 찾는 Holter 기록이 원인 감별에 맞고, ABI는 하지 관류 평가다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ]
    },
    "v37-pe-coronal": {
      "label": "폐동맥 CT",
      "title": "조영된 폐동맥 안의 충만결손",
      "summary": "",
      "src": "./assets/vascular-36-37/l37-p09-i2.jpg",
      "width": 510,
      "height": 465,
      "source": "37강 p.9 원본 · 25083과 같은 사진",
      "alt": "조영된 폐동맥 안의 충만결손",
      "layout": "photo-first",
      "steps": [
        {
          "label": "양측 폐동맥",
          "text": "기존 흰 화살표 끝의 양측 폐동맥에 조영제가 덜 차는 부위를 찾는다. 혈관 안의 충만결손이 폐색전증을 지지한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 288,
              "y": 301,
              "label": "충만결손"
            },
            {
              "x": 648,
              "y": 379,
              "label": "충만결손"
            }
          ]
        },
        {
          "label": "치료는 혈압까지",
          "text": "같은 PE 사진이라도 혈압이 유지되는지, 쇼크·저관류가 있는지에 따라 치료가 달라진다. 25083의 80/50 mmHg는 급성 재관류를 고를 핵심 조건이다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ]
    },
    "v37-dvt-us": {
      "label": "정맥 압박 초음파",
      "title": "눌러도 남는 심부정맥",
      "summary": "",
      "src": "./assets/vascular-36-37/l37-p09-i1.jpg",
      "width": 520,
      "height": 376,
      "source": "37강 p.9 원본",
      "alt": "눌러도 남는 심부정맥",
      "layout": "photo-first",
      "steps": [
        {
          "label": "압박 전·후",
          "text": "왼쪽은 압박 전, 오른쪽은 압박 후다. CFV로 표시된 정맥이 압박해도 납작하게 소실되지 않아 혈전성 비압박성을 시사한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 757,
              "y": 537,
              "label": "압박 뒤 CFV"
            }
          ]
        },
        {
          "label": "혈관 이름",
          "text": "CFV는 common femoral vein, 총대퇴정맥이다. CFA는 총대퇴동맥, GSV는 큰두렁정맥이다. DVT 평가에서는 동맥이 아니라 정맥의 압박성을 본다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ]
    },
    "v37-pe-axial": {
      "label": "폐동맥 CT",
      "title": "폐동맥 안의 어두운 충만결손",
      "summary": "",
      "src": "./J/2020/20081-1.jpg",
      "width": 576,
      "height": 453,
      "source": "20081 공식 출제 사진 · 23067 보강용 공유",
      "alt": "폐동맥 안의 어두운 충만결손",
      "layout": "photo-first",
      "steps": [
        {
          "label": "혈관 내 혈전",
          "text": "기존 붉은 화살표 끝에서 밝은 폐동맥 조영제 안의 결손을 확인한다. 대동맥벽의 박리판과 구별한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 369,
              "y": 413,
              "label": "충만결손"
            },
            {
              "x": 602,
              "y": 422,
              "label": "충만결손"
            }
          ]
        },
        {
          "label": "우심실 확대만으로 용해하지 않기",
          "text": "20081은 혈압 130/80이고 우심실 기능이 정상이다. 23067 보강본도 안정·항응고 가능 조건이므로 보기 중 heparin을 고른다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ]
    },
    "v37-pe-ecg": {
      "label": "PE의 ECG",
      "title": "우심실 부담을 짚되, ECG로 확진하지 않는다",
      "summary": "",
      "src": "./assets/vascular-36-37/l37-p08-i2.jpg",
      "width": 1024,
      "height": 524,
      "source": "37강 p.8 원본 ECG",
      "alt": "우심실 부담을 짚되, ECG로 확진하지 않는다",
      "layout": "photo-first",
      "steps": [
        {
          "label": "I · S파",
          "text": "I유도 QRS 뒤의 아래쪽 S파를 확인한다. S₁Q₃T₃에서 S₁에 해당하는 위치다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 69,
              "y": 163,
              "label": "I · S"
            }
          ]
        },
        {
          "label": "III · Q",
          "text": "III유도에서 QRS 시작의 작은 음성 성분을 찾는다. Q₃는 III유도의 Q파라는 뜻이다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 64,
              "y": 650,
              "label": "III · Q"
            }
          ]
        },
        {
          "label": "III · T",
          "text": "III유도 QRS 뒤의 음성 T파를 확인한다. Q₃·T₃를 함께 읽되, 이것만으로 PE를 확진하지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 94,
              "y": 667,
              "label": "III · T 역전"
            }
          ]
        },
        {
          "label": "V1–V3 · strain",
          "text": "오른쪽 흉부유도에서 T파 역전 등 우심실 부담 소견을 살핀다. 급성 PE의 보조 단서이며, 없어도 PE를 배제하지 못한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 567,
              "y": 145,
              "label": "V1 · T 역전"
            },
            {
              "x": 567,
              "y": 425,
              "label": "V2 · T 역전"
            }
          ]
        }
      ]
    },
    "v37-ph-ecg": {
      "label": "ECG",
      "title": "V1의 R파와 V2–3의 strain",
      "summary": "",
      "src": "./assets/vascular-36-37/l37-p21-ecg.png",
      "width": 578,
      "height": 264,
      "source": "37강 p.21 원본 A 패널",
      "alt": "V1의 R파와 V2–3의 strain",
      "layout": "photo-first",
      "steps": [
        {
          "label": "V1 · R파",
          "text": "V1에서 우세한 R파를 찾는다. 우심실의 전기적 힘이 커진 우심실비대의 맥락이다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 628,
              "y": 154,
              "label": "V1 · R"
            }
          ]
        },
        {
          "label": "V2–3 · ST–T",
          "text": "V2–3의 ST 하강·T파 변화를 확인한다. 만성 우심실 압력 부담의 단서이며 ECG만으로 PH를 확진하지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 653,
              "y": 602,
              "label": "V3 · ST–T"
            }
          ]
        }
      ]
    },
    "v37-ph-echo": {
      "label": "심초음파",
      "title": "우심방·우심실 확대와 중격 편평화",
      "summary": "",
      "src": "./assets/vascular-36-37/l37-p21-echo.png",
      "width": 445,
      "height": 574,
      "source": "37강 p.21 원본 D·E 패널",
      "alt": "우심방·우심실 확대와 중격 편평화",
      "layout": "photo-first",
      "steps": [
        {
          "label": "우심방·우심실",
          "text": "위의 심첨 영상에서 RA·RV가 커져 있다. RA는 우심방, RV는 우심실이다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 280,
              "y": 210,
              "label": "RV"
            },
            {
              "x": 338,
              "y": 370,
              "label": "RA"
            }
          ]
        },
        {
          "label": "중격 편평화",
          "text": "아래 단축 영상에서 RV가 커지고 좌심실과 맞닿는 중격이 편평해져 좌심실이 D자처럼 보인다. 우심실 압력·용적 부담의 단서다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 425,
              "y": 737,
              "label": "중격"
            }
          ]
        }
      ]
    },
    "v37-ph-xray": {
      "label": "흉부 X선",
      "title": "중심 폐동맥과 흉골 뒤 공간",
      "summary": "",
      "src": "./assets/vascular-36-37/l37-p21-xray.png",
      "width": 578,
      "height": 341,
      "source": "37강 p.21 원본 B·C 패널",
      "alt": "중심 폐동맥과 흉골 뒤 공간",
      "layout": "photo-first",
      "steps": [
        {
          "label": "정면 · 중심 폐동맥",
          "text": "정면 영상의 중심 폐동맥이 커져 보이는 부위를 살핀다. 혈관 확대와 심장 윤곽은 우심 부담의 단서다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 324,
              "y": 355,
              "label": "중심 폐동맥"
            }
          ]
        },
        {
          "label": "측면 · 흉골 뒤",
          "text": "측면에서 흉골 뒤 투과성 공간이 줄어든 것을 본다. 우심실 확장·비대의 맥락이며, 확진은 우심도자 혈역학으로 한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 684,
              "y": 637,
              "label": "흉골 뒤"
            }
          ]
        }
      ]
    },
    "v37-cteph": {
      "label": "만성 혈전",
      "title": "만성 폐동맥 폐색과 제거된 병변",
      "summary": "",
      "src": "./assets/vascular-36-37/l37-p27-i1.jpg",
      "width": 1022,
      "height": 369,
      "source": "37강 p.27 원본",
      "alt": "만성 폐동맥 폐색과 제거된 병변",
      "layout": "photo-first",
      "steps": [
        {
          "label": "CT · 만성 혈전성 병변",
          "text": "왼쪽 CT의 기존 노란 화살표 부위에서 폐동맥 내부의 만성 조직화 병변과 좁아진 통로를 본다. 급성 혈전처럼 단순히 새로 떠온 덩어리만을 뜻하지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 128,
              "y": 363,
              "label": "폐동맥 병변"
            }
          ]
        },
        {
          "label": "수술 표본",
          "text": "오른쪽 C는 폐동맥 내막절제술로 제거한 가지 모양 병변이다. 폐동맥 분지를 따라 조직화된 혈전성 폐색이 지속될 수 있음을 보여 준다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 827,
              "y": 450,
              "label": "조직화 병변"
            }
          ]
        }
      ]
    }
  },
  "groups": {
    "vascular36-coa": {
      "title": "반복 사진 · 대동맥축착",
      "caption": "표시를 눌러 관찰 소견과 판단을 연결한다.",
      "cases": [
        "v36-coa"
      ]
    },
    "vascular36-aneurysm": {
      "title": "반복 사진 · 상행대동맥과 AR",
      "caption": "표시를 눌러 관찰 소견과 판단을 연결한다.",
      "cases": [
        "v36-aneurysm"
      ]
    },
    "vascular36-aas": {
      "title": "벽 손상 세 가지 · 버튼으로 비교",
      "caption": "표시를 눌러 관찰 소견과 판단을 연결한다.",
      "cases": [
        "v36-dissection-asc",
        "v36-imh",
        "v36-pau"
      ]
    },
    "vascular36-j25082": {
      "title": "사진 해설",
      "caption": "표시를 눌러 관찰 소견과 판단을 연결한다.",
      "cases": [
        "v36-dissection-desc"
      ]
    },
    "vascular36-j23066": {
      "title": "사진 해설",
      "caption": "표시를 눌러 관찰 소견과 판단을 연결한다.",
      "cases": [
        "v36-dissection-asc",
        "v36-dissection-asc2"
      ]
    },
    "vascular36-j20080": {
      "title": "사진 해설",
      "caption": "표시를 눌러 관찰 소견과 판단을 연결한다.",
      "cases": [
        "v36-imh"
      ]
    },
    "vascular36-classification": {
      "title": "분류와 치료 · 같은 사진에서 두 질문",
      "caption": "표시를 눌러 관찰 소견과 판단을 연결한다.",
      "cases": [
        "v36-classification"
      ]
    },
    "vascular36-embolus": {
      "title": "두 사진을 연결하기 · 막힌 곳과 출발점",
      "caption": "표시를 눌러 관찰 소견과 판단을 연결한다.",
      "cases": [
        "v36-embolus-leg",
        "v36-embolus-tee"
      ]
    },
    "vascular37-pe-imaging": {
      "title": "혈전 확인 · 폐동맥과 다리 정맥",
      "caption": "표시를 눌러 관찰 소견과 판단을 연결한다.",
      "cases": [
        "v37-pe-coronal",
        "v37-dvt-us"
      ]
    },
    "vascular37-j25083": {
      "title": "사진 해설",
      "caption": "표시를 눌러 관찰 소견과 판단을 연결한다.",
      "cases": [
        "v37-pe-coronal"
      ]
    },
    "vascular37-j20081": {
      "title": "사진 해설",
      "caption": "표시를 눌러 관찰 소견과 판단을 연결한다.",
      "cases": [
        "v37-pe-axial"
      ]
    },
    "vascular37-pe-ecg": {
      "title": "강의 ECG · 유도별로 짚어보기",
      "caption": "표시를 눌러 관찰 소견과 판단을 연결한다.",
      "cases": [
        "v37-pe-ecg"
      ]
    },
    "vascular37-ph-imaging": {
      "title": "PH 사진 · 원인 분류 전 우심실 부담 확인",
      "caption": "표시를 눌러 관찰 소견과 판단을 연결한다.",
      "cases": [
        "v37-ph-ecg",
        "v37-ph-echo",
        "v37-ph-xray"
      ]
    },
    "vascular37-cteph": {
      "title": "CTEPH · 만성 혈전이 남긴 길",
      "caption": "표시를 눌러 관찰 소견과 판단을 연결한다.",
      "cases": [
        "v37-cteph"
      ]
    }
  }
};
Object.assign(window.CARDIO_ECG_LEARNING.cases,data.cases);
Object.assign(window.CARDIO_ECG_LEARNING.groups,data.groups);
})();
