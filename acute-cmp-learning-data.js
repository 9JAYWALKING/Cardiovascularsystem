/* Lecture-verified acute HF / cardiomyopathy photo interpretations. */
(function(){
const data={
  "cases": {
    "ahf-cannula": {
      "label": "흉부 X선",
      "title": "순환보조 삽관 · 사진의 한계까지 읽기",
      "summary": "",
      "src": "./J/2025/25132-1.jpg",
      "width": 531,
      "height": 649,
      "source": "30강 p.55–56 · 25132 원복원 사진",
      "alt": "순환보조 삽관 · 사진의 한계까지 읽기",
      "layout": "photo-first",
      "steps": [
        {
          "label": "삽관 위치",
          "text": "원래 주황 화살표 주변의 굵은 삽관을 먼저 찾는다. 이 흉부 X선 하나만으로 동맥 반송과 정맥 반송을 모두 추적할 수는 없다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 450,
              "y": 590,
              "label": "삽관"
            }
          ]
        },
        {
          "label": "증례와 결합",
          "text": "LVEF 15%·혈압 62/57이라는 펌프부전 조건을 더하면 순환 보조가 필요한 상황이다. VA/VV의 최종 구분은 산화기 모양이 아니라 반송 혈관이다.",
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
    "ahf-oxygenator": {
      "label": "장치 외형",
      "title": "체외 산화기 · VA와 VV가 공유하는 부분",
      "summary": "",
      "src": "./J/2025/25132-2.jpg",
      "width": 522,
      "height": 652,
      "source": "30강 p.55–56 · 25132 장치 사진 공유",
      "alt": "체외 산화기 · VA와 VV가 공유하는 부분",
      "layout": "photo-first",
      "steps": [
        {
          "label": "산화기·회로",
          "text": "혈액이 몸 밖 회로를 지나 산화기에서 가스교환을 하는 ECMO 장치다. 산화기가 없는 IABP·Impella와 구분한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 715,
              "y": 300,
              "label": "산화기"
            }
          ]
        },
        {
          "label": "반송 경로가 핵심",
          "text": "VA는 동맥으로 돌려 순환과 가스교환을, VV는 정맥으로 돌려 주로 가스교환을 돕는다. 이 외형만으로 VA인지 VV인지 확정하지 않는다.",
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
    "ahf-2023-cxr": {
      "label": "흉부 X선",
      "title": "폐울혈 · 심장 그림자와 양측 폐음영",
      "summary": "",
      "src": "./J/2023/comprehensive-2023-57-1.jpeg",
      "width": 350,
      "height": 332,
      "source": "30강 p.14–25 · 2023 종합평가 57번",
      "alt": "폐울혈 · 심장 그림자와 양측 폐음영",
      "layout": "photo-first",
      "steps": [
        {
          "label": "폐와 심장",
          "text": "양측 폐의 흐린 음영과 커 보이는 심장 그림자를 본다. 수포음·부종·BNP 상승을 함께 읽어 울혈로 연결한다. 촬영 조건의 영향도 있어 사진만으로 심장 크기를 정밀 확정하지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 300,
              "y": 580,
              "label": "폐음영"
            },
            {
              "x": 620,
              "y": 680,
              "label": "심장 그림자"
            }
          ]
        }
      ]
    },
    "ahf-2023-ecg": {
      "label": "심전도",
      "title": "불규칙한 R–R · 리듬과 울혈을 구별하기",
      "summary": "",
      "src": "./J/2023/comprehensive-2023-57-2.jpeg",
      "width": 642,
      "height": 342,
      "source": "2023 종합평가 57번 · 30강 급성 악화 요인",
      "alt": "불규칙한 R–R · 리듬과 울혈을 구별하기",
      "layout": "photo-first",
      "steps": [
        {
          "label": "긴 II 유도",
          "text": "아래 긴 II 유도에서 QRS 사이 간격이 일정하지 않다. 매 박동 앞에서 같은 모양으로 반복되는 P파도 뚜렷하지 않아 심방세동을 시사한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 330,
              "y": 870,
              "label": "불규칙 R–R"
            }
          ]
        },
        {
          "label": "치료 질문",
          "text": "리듬을 읽은 뒤 질문의 표적을 다시 본다. 높은 혈압·양측 수포음·부종이 있는 이 증례에서는 울혈을 빼는 이뇨제가 제시답이다. 부정맥 때문에 불안정한 상황은 별도로 판단한다.",
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
    "ahf-2022-cxr": {
      "label": "흉부 X선",
      "title": "폐울혈 · 이뇨 치료로 연결하기",
      "summary": "",
      "src": "./J/2022/22113-1.jpg",
      "width": 892,
      "height": 904,
      "source": "30강 p.14–25, 35–43 · 22113 사진",
      "alt": "폐울혈 · 이뇨 치료로 연결하기",
      "layout": "photo-first",
      "steps": [
        {
          "label": "울혈 소견",
          "text": "커 보이는 심장 그림자와 폐혈관·간질 음영 증가를 관찰한다. BNP 상승·함요부종을 더하면 울혈을 줄이는 정주 고리이뇨제와 연결된다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 350,
              "y": 400,
              "label": "폐혈관·간질 음영"
            },
            {
              "x": 620,
              "y": 680,
              "label": "심장 그림자"
            }
          ]
        }
      ]
    },
    "cmp-hcm-ecg": {
      "label": "HCM 심전도",
      "title": "높은 전압과 재분극 변화",
      "summary": "",
      "src": "./J/2021/21119-1.jpg",
      "width": 892,
      "height": 536,
      "source": "31강 p.40–42 · 21119/22116·반복 증례 대조",
      "alt": "높은 전압과 재분극 변화",
      "layout": "photo-first",
      "steps": [
        {
          "label": "흉부 유도 전압",
          "text": "오른쪽 흉부 유도에서 큰 QRS 전압을 확인한다. 좌심실 비대의 단서로 읽되 ECG만으로 HCM을 확진하지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 680,
              "y": 450,
              "label": "큰 QRS"
            }
          ]
        },
        {
          "label": "T파 변화",
          "text": "V4–V6 쪽의 깊은 음성 T파를 관찰한다. 비후한 심근의 재분극 변화와 연결하고, 증례의 실신·가족력·잡음을 더한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 700,
              "y": 610,
              "label": "음성 T파"
            }
          ]
        }
      ]
    },
    "cmp-hcm-echo": {
      "label": "비후 중격",
      "title": "비대칭 중격 비후 · Echo로 구조 확인",
      "summary": "",
      "src": "./J/2021/21119-2.jpg",
      "width": 792,
      "height": 541,
      "source": "31강 p.31의 비대칭 중격 비후 사진과 대조 · p.42 검사",
      "alt": "비대칭 중격 비후 · Echo로 구조 확인",
      "layout": "photo-first",
      "steps": [
        {
          "label": "심실중격",
          "text": "화면 위쪽에서 좌심실 내강 앞의 두꺼운 심실중격을 찾는다. 반대쪽 벽과 두께를 비교해 비대칭 비후를 읽는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 435,
              "y": 360,
              "label": "비후 중격"
            }
          ]
        },
        {
          "label": "증례와 결합",
          "text": "정지 영상만으로 유출로 압력차나 SAM의 움직임을 확정할 수는 없다. Valsalva 때 증가하는 수축기 잡음을 붙여 동적 폐쇄를 의심하고 실제 Echo에서는 움직임과 Doppler를 평가한다.",
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
    "cmp-sam": {
      "label": "SAM · M-mode",
      "title": "비후한 중격 쪽으로 움직이는 승모판",
      "summary": "",
      "src": "./J/2020/20오38-1.jpg",
      "width": 1484,
      "height": 729,
      "source": "31강 p.30, 38–39 · 2020 오답30 p.38",
      "alt": "비후한 중격 쪽으로 움직이는 승모판",
      "layout": "photo-first",
      "steps": [
        {
          "label": "중격과 승모판",
          "text": "IVS는 심실중격이다. 원래 노란 화살표가 가리키는 수축기 승모판의 전방운동을 중격과의 관계로 본다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 440,
              "y": 585,
              "label": "SAM"
            },
            {
              "x": 550,
              "y": 465,
              "label": "심실중격"
            }
          ]
        },
        {
          "label": "부하를 바꾸면",
          "text": "정맥환류가 줄면 작은 좌심실이 더 작아져 폐쇄·잡음이 커진다. 누워 다리를 올리면 반대로 전부하가 늘어 잡음이 감소한다.",
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
    "cmp-myocarditis-cxr": {
      "label": "폐울혈",
      "title": "양쪽 폐음영 · 심근 손상 뒤 울혈",
      "summary": "",
      "src": "./J/2021/21120-1.jpg",
      "width": 642,
      "height": 588,
      "source": "31강 p.79–82 · 21120·25134 반복 사진",
      "alt": "양쪽 폐음영 · 심근 손상 뒤 울혈",
      "layout": "photo-first",
      "steps": [
        {
          "label": "양측 폐음영",
          "text": "양측 폐야에 퍼진 음영 증가를 확인한다. 이 소견만으로 원인을 단정하지 않고 S3·수포음·BNP 상승과 함께 급성 심부전의 울혈로 읽는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 260,
              "y": 630,
              "label": "폐음영"
            },
            {
              "x": 740,
              "y": 630,
              "label": "폐음영"
            }
          ]
        }
      ]
    },
    "cmp-myocarditis-ecg21": {
      "label": "심전도",
      "title": "심근 손상 · 여러 유도의 ST 변화",
      "summary": "",
      "src": "./J/2021/21120-2.jpg",
      "width": 1047,
      "height": 584,
      "source": "31강 p.79–82 · 2021 오답30 p.28–29",
      "alt": "심근 손상 · 여러 유도의 ST 변화",
      "layout": "photo-first",
      "steps": [
        {
          "label": "여러 유도의 ST 변화",
          "text": "II 및 흉부 유도 등 여러 곳의 ST 변화를 확인한다. 이 사진은 선행 감염·심근 손상·급성 울혈과 함께 심근염을 판단하는 증례다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 580,
              "y": 240,
              "label": "ST 변화"
            },
            {
              "x": 810,
              "y": 220,
              "label": "ST 변화"
            }
          ]
        },
        {
          "label": "시간 순서와 결합",
          "text": "ST 상승만으로 심근염과 심근경색을 나누지는 않는다. 감염 증상이 먼저였고 젊은 환자에게 새 심부전이 생겼다는 맥락을 붙이며 필요한 관상동맥 평가·CMR를 함께 고려한다.",
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
    "cmp-myocarditis-ecg25": {
      "label": "심전도",
      "title": "심근 손상 · 감염 뒤 급성 심장 증상",
      "summary": "",
      "src": "./J/2025/25134-2.jpg",
      "width": 1069,
      "height": 601,
      "source": "31강 p.79–82 · 25134 심전도",
      "alt": "심근 손상 · 감염 뒤 급성 심장 증상",
      "layout": "photo-first",
      "steps": [
        {
          "label": "여러 유도의 ST 변화",
          "text": "II 및 흉부 유도 등 여러 곳의 ST 변화를 확인한다. 이 사진은 선행 감염·심근 손상·급성 울혈과 함께 심근염을 판단하는 증례다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 580,
              "y": 240,
              "label": "ST 변화"
            },
            {
              "x": 810,
              "y": 220,
              "label": "ST 변화"
            }
          ]
        },
        {
          "label": "시간 순서와 결합",
          "text": "ST 상승만으로 심근염과 심근경색을 나누지는 않는다. 감염 증상이 먼저였고 젊은 환자에게 새 심부전이 생겼다는 맥락을 붙이며 필요한 관상동맥 평가·CMR를 함께 고려한다.",
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
    "cmp-myocarditis-cxr22": {
      "label": "흉부 X선",
      "title": "심부전 단서 · 사진과 청진을 합치기",
      "summary": "",
      "src": "./J/2022/comprehensive-136-1.jpg",
      "width": 261,
      "height": 269,
      "source": "31강 p.79–82 · 2022 종합평가 136번",
      "alt": "심부전 단서 · 사진과 청진을 합치기",
      "layout": "photo-first",
      "steps": [
        {
          "label": "폐음영·심장 그림자",
          "text": "작은 원본에서 폐혈관·간질 음영과 심장 그림자를 확인한다. 세부 소견을 과도하게 확정하지 않고 양측 수포음·S3·BNP 상승을 합쳐 울혈을 판단한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 300,
              "y": 540,
              "label": "폐음영"
            }
          ]
        }
      ]
    },
    "cmp-myocarditis-ecg22": {
      "label": "심전도",
      "title": "ST–T 변화 · 혈압 저하까지 함께 읽기",
      "summary": "",
      "src": "./J/2022/comprehensive-136-2.jpg",
      "width": 442,
      "height": 269,
      "source": "31강 p.79–82 · 2022 종합평가 136번",
      "alt": "ST–T 변화 · 혈압 저하까지 함께 읽기",
      "layout": "photo-first",
      "steps": [
        {
          "label": "ST–T 변화",
          "text": "흉부 유도의 ST–T 변화와 긴 리듬 기록을 본다. 사진 하나보다 선행 감염·troponin 상승·급성 심부전의 시간 순서가 진단에 중요하다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 630,
              "y": 330,
              "label": "ST–T 변화"
            }
          ]
        },
        {
          "label": "위험도",
          "text": "혈압 80/60이라는 저혈압이 더해졌다. 심근염이라는 이름을 고른 뒤에도 저관류·쇼크·부정맥 위험을 평가해야 한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ]
    }
  },
  "groups": {
    "hf30-25132": {
      "title": "사진 해설",
      "caption": "버튼으로 관찰 소견과 풀이 연결을 확인한다.",
      "cases": [
        "ahf-cannula",
        "ahf-oxygenator"
      ]
    },
    "hf30-device": {
      "title": "사진 해설",
      "caption": "버튼으로 관찰 소견과 풀이 연결을 확인한다.",
      "cases": [
        "ahf-oxygenator"
      ]
    },
    "hf30-23129": {
      "title": "사진 해설",
      "caption": "버튼으로 관찰 소견과 풀이 연결을 확인한다.",
      "cases": [
        "ahf-2023-cxr",
        "ahf-2023-ecg"
      ]
    },
    "hf30-22113": {
      "title": "사진 해설",
      "caption": "버튼으로 관찰 소견과 풀이 연결을 확인한다.",
      "cases": [
        "ahf-2022-cxr"
      ]
    },
    "cmp31-hcm": {
      "title": "사진 해설",
      "caption": "버튼으로 관찰 소견과 풀이 연결을 확인한다.",
      "cases": [
        "cmp-hcm-ecg",
        "cmp-hcm-echo"
      ]
    },
    "cmp31-hcm-ecg": {
      "title": "사진 해설",
      "caption": "버튼으로 관찰 소견과 풀이 연결을 확인한다.",
      "cases": [
        "cmp-hcm-ecg"
      ]
    },
    "cmp31-sam": {
      "title": "사진 해설",
      "caption": "버튼으로 관찰 소견과 풀이 연결을 확인한다.",
      "cases": [
        "cmp-sam"
      ]
    },
    "cmp31-25134": {
      "title": "사진 해설",
      "caption": "버튼으로 관찰 소견과 풀이 연결을 확인한다.",
      "cases": [
        "cmp-myocarditis-cxr",
        "cmp-myocarditis-ecg25"
      ]
    },
    "cmp31-21120": {
      "title": "사진 해설",
      "caption": "버튼으로 관찰 소견과 풀이 연결을 확인한다.",
      "cases": [
        "cmp-myocarditis-cxr",
        "cmp-myocarditis-ecg21"
      ]
    },
    "cmp31-22115": {
      "title": "사진 해설",
      "caption": "버튼으로 관찰 소견과 풀이 연결을 확인한다.",
      "cases": [
        "cmp-myocarditis-cxr22",
        "cmp-myocarditis-ecg22"
      ]
    }
  }
};
Object.assign(window.CARDIO_ECG_LEARNING.cases,data.cases);
Object.assign(window.CARDIO_ECG_LEARNING.groups,data.groups);
})();
