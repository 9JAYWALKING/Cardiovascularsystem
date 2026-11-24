/* 52강 원본 영상과 분리된 관찰 표시. */
(function(){
const data={
  "cases": {
    "cases52-stable-ecg": {
      "label": "안정 시 ECG",
      "title": "운동할 때 아픈데 안정 시 ECG는 뚜렷하지 않다",
      "summary": "",
      "src": "./assets/cases-52/stable-ecg.jpg",
      "width": 1354,
      "height": 725,
      "alt": "운동할 때 아픈데 안정 시 ECG는 뚜렷하지 않다",
      "source": "52강 p.4",
      "layout": "photo-first",
      "steps": [
        {
          "label": "리듬",
          "text": "하단 긴 II유도에서 비교적 규칙적인 QRS를 본다. 지속적인 빠른 부정맥으로 증상을 설명하는 사진은 아니다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 250,
              "y": 894,
              "label": "규칙적 QRS"
            }
          ]
        },
        {
          "label": "허혈의 시점",
          "text": "급성 ST상승이 뚜렷하지 않아도 운동 유발 허혈을 배제할 수 없다. 증상이 생기는 부하 상태를 평가한다.",
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
    "cases52-stable-cxr": {
      "label": "흉부 X선",
      "title": "흉부 X선이 관상동맥 협착을 보여 주는 것은 아니다",
      "summary": "",
      "src": "./assets/cases-52/stable-cxr.jpg",
      "width": 742,
      "height": 738,
      "alt": "흉부 X선이 관상동맥 협착을 보여 주는 것은 아니다",
      "source": "52강 p.5",
      "layout": "photo-first",
      "steps": [
        {
          "label": "심장·폐",
          "text": "뚜렷한 심비대나 광범위 폐부종 소견은 보이지 않는다. 그렇다고 관상동맥이 정상이라고 결론내릴 수 없다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 570,
              "y": 645,
              "label": "심장 음영"
            }
          ]
        }
      ]
    },
    "cases52-exercise-before": {
      "label": "부하 전",
      "title": "부하 전 ST 기준선을 먼저 잡는다",
      "summary": "",
      "src": "./assets/cases-52/exercise-before.jpg",
      "width": 801,
      "height": 432,
      "alt": "부하 전 ST 기준선을 먼저 잡는다",
      "source": "52강 p.9",
      "layout": "photo-first",
      "steps": [
        {
          "label": "기준선",
          "text": "V4–V6의 QRS 뒤 ST분절과 분절 전후의 기준선을 비교할 준비를 한다. 다음 사진은 심박수가 빨라진 부하 상태다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 850,
              "y": 395,
              "label": "V5 ST"
            }
          ]
        }
      ]
    },
    "cases52-exercise-after": {
      "label": "운동 부하",
      "title": "심박수가 빨라지며 ST 하강이 나타난다",
      "summary": "",
      "src": "./assets/cases-52/exercise-after.jpg",
      "width": 804,
      "height": 424,
      "alt": "심박수가 빨라지며 ST 하강이 나타난다",
      "source": "52강 p.9",
      "layout": "photo-first",
      "steps": [
        {
          "label": "심박수 증가",
          "text": "R–R 간격이 짧아졌다. 운동하면서 심근의 산소 요구량이 증가한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 450,
              "y": 905,
              "label": "짧아진 RR"
            }
          ]
        },
        {
          "label": "ST 변화",
          "text": "V5·V6에서 QRS 뒤 ST분절의 하강을 부하 전 사진과 비교한다. 기저선 흔들림과 구별하고 증상·운동량·회복기까지 함께 평가한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 857,
              "y": 410,
              "label": "V5 ST"
            },
            {
              "x": 857,
              "y": 676,
              "label": "V6 ST"
            }
          ]
        }
      ]
    },
    "cases52-stable-cag": {
      "label": "관상동맥 조영",
      "title": "증상·허혈 평가 다음에 관상동맥의 해부학을 확인한다",
      "summary": "",
      "src": "./assets/cases-52/stable-cag.jpg",
      "width": 824,
      "height": 828,
      "alt": "증상·허혈 평가 다음에 관상동맥의 해부학을 확인한다",
      "source": "52강 p.10",
      "layout": "photo-first",
      "steps": [
        {
          "label": "혈관의 길",
          "text": "좌관상동맥 조영에서 분지와 아래로 내려가는 혈관을 따라간다. 협착 정도는 조영제가 충분히 찬 여러 투사·시점을 비교해 평가한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        },
        {
          "label": "검사의 역할",
          "text": "침습적 관상동맥조영술은 병변 위치·중증도를 확인하고 필요하면 PCI로 이어진다. 안정된 모든 흉통 환자에게 곧바로 시행하는 검사는 아니다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ],
      "video": "./assets/cases-52/stable-cag.mp4",
      "videoNote": "원본 영상을 재생하여 움직임을 확인하세요. 학습 표시는 위 정지영상에 적용됩니다."
    },
    "cases52-stable-pci": {
      "label": "PCI 과정",
      "title": "가이드와 치료기구가 병변을 통과한다",
      "summary": "",
      "src": "./assets/cases-52/stable-pci.jpg",
      "width": 824,
      "height": 828,
      "alt": "가이드와 치료기구가 병변을 통과한다",
      "source": "52강 p.10",
      "layout": "photo-first",
      "steps": [
        {
          "label": "치료 단계",
          "text": "관상동맥 내 가이드와 치료기구가 보이는 시술 장면이다. PCI는 좁아진 혈류 통로를 넓히는 치료이며 이후 위험인자 관리도 계속한다.",
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
    "cases52-stemi-ecg": {
      "label": "전흉부 ST상승",
      "title": "흉통·심정지와 전흉부 유도의 큰 ST상승",
      "summary": "",
      "src": "./assets/cases-52/stemi-ecg.jpg",
      "width": 1276,
      "height": 672,
      "alt": "흉통·심정지와 전흉부 유도의 큰 ST상승",
      "source": "52강 p.12",
      "layout": "photo-first",
      "steps": [
        {
          "label": "위치",
          "text": "V1–V4, 특히 V2·V3의 QRS 이후 크게 들린 ST–T를 찾는다. 전흉부 유도에 모여 있어 전벽 허혈과 연결한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 566,
              "y": 310,
              "label": "V2 ST"
            },
            {
              "x": 564,
              "y": 563,
              "label": "V3 ST"
            }
          ]
        },
        {
          "label": "다음 행동",
          "text": "휴식 중 흉통·심정지와 이 ECG가 함께라면 응급 재관류를 준비한다. 확실한 STEMI에서 troponin 결과를 기다려 혈관을 여는 일을 늦추지 않는다.",
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
    "cases52-stemi-echo": {
      "label": "심초음파",
      "title": "허혈이 심실 벽의 움직임에 미친 영향",
      "summary": "",
      "src": "./assets/cases-52/stemi-echo.jpg",
      "width": 824,
      "height": 828,
      "alt": "허혈이 심실 벽의 움직임에 미친 영향",
      "source": "52강 p.16",
      "layout": "photo-first",
      "steps": [
        {
          "label": "박동 비교",
          "text": "심첨부와 중격을 포함한 심실 벽이 수축기에 안쪽으로 얼마나 움직이는지 영상을 재생해 본다. 정지사진 한 장에서 박출률 수치를 만들어 내지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 490,
              "y": 405,
              "label": "심첨·중격"
            }
          ]
        },
        {
          "label": "역할",
          "text": "국소 벽운동과 전체 펌프 기능, 기계적 합병증을 확인한다. 명백한 STEMI에서 초음파 때문에 재관류가 지연되어서는 안 된다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ],
      "video": "./assets/cases-52/stemi-echo.mp4",
      "videoNote": "원본 영상을 재생하여 움직임을 확인하세요. 학습 표시는 위 정지영상에 적용됩니다."
    },
    "cases52-stemi-cag": {
      "label": "응급 조영",
      "title": "ST상승과 연결되는 관상동맥 병변",
      "summary": "",
      "src": "./assets/cases-52/stemi-cag.jpg",
      "width": 824,
      "height": 828,
      "alt": "ST상승과 연결되는 관상동맥 병변",
      "source": "52강 p.17",
      "layout": "photo-first",
      "steps": [
        {
          "label": "조영 영상",
          "text": "조영제가 들어오는 구간과 이어지는 혈관을 원본 영상으로 확인한다. 흉통·ECG·효소 상승과 함께 관상동맥 폐색을 평가하는 단계다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        },
        {
          "label": "시간이 중요한 이유",
          "text": "막힌 혈관의 관류 영역은 시간이 지날수록 손상된다. 검사 이름을 나열하는 대신 신속히 원인 병변을 확인하고 재관류한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ],
      "video": "./assets/cases-52/stemi-cag.mp4",
      "videoNote": "원본 영상을 재생하여 움직임을 확인하세요. 학습 표시는 위 정지영상에 적용됩니다."
    },
    "cases52-stemi-pci": {
      "label": "시술 중",
      "title": "응급 PCI · 병변을 통과해 통로를 넓힌다",
      "summary": "",
      "src": "./assets/cases-52/stemi-pci.jpg",
      "width": 824,
      "height": 828,
      "alt": "응급 PCI · 병변을 통과해 통로를 넓힌다",
      "source": "52강 p.17",
      "layout": "photo-first",
      "steps": [
        {
          "label": "치료기구",
          "text": "관상동맥 안에서 펼쳐지는 치료기구를 본다. 시술 중 장면과 최종 혈류 평가를 구별한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 415,
              "y": 310,
              "label": "시술 기구"
            }
          ]
        }
      ],
      "video": "./assets/cases-52/stemi-pci.mp4",
      "videoNote": "원본 영상을 재생하여 움직임을 확인하세요. 학습 표시는 위 정지영상에 적용됩니다."
    },
    "cases52-hf-ecg": {
      "label": "빈맥",
      "title": "심부전의 ECG가 반드시 ST상승을 보이는 것은 아니다",
      "summary": "",
      "src": "./assets/cases-52/hf-ecg.jpg",
      "width": 1031,
      "height": 547,
      "alt": "심부전의 ECG가 반드시 ST상승을 보이는 것은 아니다",
      "source": "52강 p.20",
      "layout": "photo-first",
      "steps": [
        {
          "label": "빠른 심박",
          "text": "QRS가 반복되는 간격과 재분극 변화를 살핀다. 빈맥은 심부전에서 나타날 수 있지만 빈맥 하나로 원인을 확정하지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        },
        {
          "label": "검사 조합",
          "text": "호흡곤란·S3·수포음·흉부 X선·NT-proBNP와 결합한다. 정상에 가까운 ECG만으로 심부전을 배제하지 않는다.",
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
    "cases52-hf-cxr": {
      "label": "울혈",
      "title": "큰 심장 음영과 양측 폐의 흐린 음영",
      "summary": "",
      "src": "./assets/cases-52/hf-cxr.jpg",
      "width": 740,
      "height": 792,
      "alt": "큰 심장 음영과 양측 폐의 흐린 음영",
      "source": "52강 p.21",
      "layout": "photo-first",
      "steps": [
        {
          "label": "심장",
          "text": "심장 음영이 넓게 보인다. 촬영 방향도 고려하되 이 증례에서는 심초음파와 함께 심장 확대를 평가한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 560,
              "y": 700,
              "label": "심장 음영"
            }
          ]
        },
        {
          "label": "폐울혈",
          "text": "양측 폐, 특히 하부의 증가한 음영을 수포음·호흡곤란과 연결한다. 폐정맥압 상승으로 폐에 물이 차는 흐름이다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 280,
              "y": 605,
              "label": "폐 음영"
            },
            {
              "x": 730,
              "y": 545,
              "label": "폐 음영"
            }
          ]
        }
      ]
    },
    "cases52-hf-echo": {
      "label": "심실 확장",
      "title": "큰 심실과 충분히 줄어들지 않는 내강",
      "summary": "",
      "src": "./assets/cases-52/hf-echo.jpg",
      "width": 902,
      "height": 786,
      "alt": "큰 심실과 충분히 줄어들지 않는 내강",
      "source": "52강 p.24",
      "layout": "photo-first",
      "steps": [
        {
          "label": "구조와 운동",
          "text": "심실 내강의 크기와 수축기 감소 폭을 영상을 재생해 비교한다. 확장된 심실과 전반적인 수축기능 저하를 평가하는 장면이다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        },
        {
          "label": "원인으로 이동",
          "text": "이 모양만으로 음주성 심근병증을 확정하지 않는다. 허혈·판막·심근염·독성·유전 등 원인을 추가로 확인한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ],
      "video": "./assets/cases-52/hf-echo.mp4",
      "videoNote": "원본 영상을 재생하여 움직임을 확인하세요. 학습 표시는 위 정지영상에 적용됩니다."
    },
    "cases52-hf-cag": {
      "label": "허혈성 원인",
      "title": "심부전의 원인을 찾는 관상동맥 평가",
      "summary": "",
      "src": "./assets/cases-52/hf-cag.jpg",
      "width": 822,
      "height": 830,
      "alt": "심부전의 원인을 찾는 관상동맥 평가",
      "source": "52강 p.25",
      "layout": "photo-first",
      "steps": [
        {
          "label": "왜 혈관을 볼까",
          "text": "관상동맥질환이 심실 기능 저하의 원인인지 확인한다. 한 정지사진의 인상만으로 미세혈관질환까지 없다고 단정하지 않는다.",
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
    "cases52-hf-mri": {
      "label": "심장 MRI",
      "title": "심실 모양에 조직 정보를 더한다",
      "summary": "",
      "src": "./assets/cases-52/hf-mri.jpg",
      "width": 1555,
      "height": 595,
      "alt": "심실 모양에 조직 정보를 더한다",
      "source": "52강 p.26",
      "layout": "photo-first",
      "steps": [
        {
          "label": "서로 다른 영상",
          "text": "두 영상은 촬영 방식에 따라 혈액·심근의 밝기가 다르다. 심실 확장과 심근의 조직 특성을 살피는 검사다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 280,
              "y": 505,
              "label": "심실 단면"
            },
            {
              "x": 730,
              "y": 520,
              "label": "심실 단면"
            }
          ]
        },
        {
          "label": "해석의 범위",
          "text": "MRI는 반흔·염증 등 원인 감별에 도움을 준다. 이 두 장만으로 조영증강의 정확한 분포나 특정 원인을 확정하지 않는다.",
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
    "cases52-hf-followup": {
      "label": "치료 뒤",
      "title": "폐울혈과 증상·표지자의 호전을 함께 확인",
      "summary": "",
      "src": "./assets/cases-52/hf-followup.jpg",
      "width": 790,
      "height": 804,
      "alt": "폐울혈과 증상·표지자의 호전을 함께 확인",
      "source": "52강 p.27",
      "layout": "photo-first",
      "steps": [
        {
          "label": "추적 평가",
          "text": "치료 후 제시된 흉부 X선에서 폐 음영을 확인한다. NT-proBNP 3491→785→142와 증상 변화를 함께 따라가되, 표지자 감소를 완치와 같게 보지 않는다.",
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
    "cases52-ie-ecg": {
      "label": "ECG",
      "title": "발열·감염 상황의 빠른 맥박",
      "summary": "",
      "src": "./assets/cases-52/ie-ecg.jpg",
      "width": 1021,
      "height": 541,
      "alt": "발열·감염 상황의 빠른 맥박",
      "source": "52강 p.29",
      "layout": "photo-first",
      "steps": [
        {
          "label": "빈맥",
          "text": "빠른 심박을 발열·저산소증·혈역학과 함께 해석한다. 감염성 심내막염을 확정하는 핵심 검사는 혈액배양과 심초음파다.",
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
    "cases52-ie-cxr": {
      "label": "흉부 X선",
      "title": "숨찬 환자에서 폐와 심장을 함께 본다",
      "summary": "",
      "src": "./assets/cases-52/ie-cxr.jpg",
      "width": 863,
      "height": 992,
      "alt": "숨찬 환자에서 폐와 심장을 함께 본다",
      "source": "52강 p.30",
      "layout": "photo-first",
      "steps": [
        {
          "label": "호흡곤란 평가",
          "text": "폐 음영과 흉수 여부를 평가한다. 판막에 붙은 균 덩어리는 흉부 X선이 아니라 심초음파에서 확인한다.",
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
    "cases52-ie-vegetation": {
      "label": "판막의 종괴",
      "title": "판막 부위의 큰 부착물과 측정값",
      "summary": "",
      "src": "./assets/cases-52/ie-vegetation.jpg",
      "width": 646,
      "height": 574,
      "alt": "판막 부위의 큰 부착물과 측정값",
      "source": "52강 p.33",
      "layout": "photo-first",
      "steps": [
        {
          "label": "부착물",
          "text": "판막 부위의 밝은 덩어리와 길이 표시를 찾는다. 발열·S. aureus 혈액배양 양성과 합치면 감염성 증식물을 강하게 지지한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 575,
              "y": 565,
              "label": "증식물"
            },
            {
              "x": 450,
              "y": 682,
              "label": "증식물"
            }
          ]
        },
        {
          "label": "왜 위험할까",
          "text": "큰 증식물은 색전 위험과 연결되고, 판막 파괴·역류는 심부전을 일으킬 수 있다. 크기만으로 수술 여부를 자동 결정하지 않고 감염 조절·혈역학도 본다.",
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
    "cases52-ie-long": {
      "label": "장축 단면",
      "title": "좌심실–승모판–좌심방의 위치를 따라간다",
      "summary": "",
      "src": "./assets/cases-52/ie-long.jpg",
      "width": 636,
      "height": 525,
      "alt": "좌심실–승모판–좌심방의 위치를 따라간다",
      "source": "52강 p.33",
      "layout": "photo-first",
      "steps": [
        {
          "label": "판막 위치",
          "text": "큰 좌심실 내강과 좌심방 사이의 승모판 부위를 찾는다. 이 위치의 부착물과 역류를 판막 구조에 맞추어 읽는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 550,
              "y": 565,
              "label": "승모판 부위"
            }
          ]
        },
        {
          "label": "측정",
          "text": "2.30 cm·0.87 cm는 이 단면에 표시된 길이 측정값이다. 다른 단면의 수치를 합쳐 하나의 새로운 크기로 계산하지 않는다.",
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
    "cases52-ie-motion": {
      "label": "움직임",
      "title": "박동에 따라 흔들리는 판막 부착물",
      "summary": "",
      "src": "./assets/cases-52/ie-motion.jpg",
      "width": 1214,
      "height": 822,
      "alt": "박동에 따라 흔들리는 판막 부착물",
      "source": "52강 p.33",
      "layout": "photo-first",
      "steps": [
        {
          "label": "영상 재생",
          "text": "좌심실–승모판 부근을 여러 단면에서 보며 부착물의 움직임을 확인한다. 석회화와 감염성 증식물의 구별에는 임상 감염 소견이 중요하다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ],
      "video": "./assets/cases-52/ie-motion.mp4",
      "videoNote": "원본 영상을 재생하여 움직임을 확인하세요. 학습 표시는 위 정지영상에 적용됩니다."
    },
    "cases52-ie-doppler": {
      "label": "색도플러",
      "title": "판막 부착물과 역류 평가",
      "summary": "",
      "src": "./assets/cases-52/ie-doppler.jpg",
      "width": 1214,
      "height": 822,
      "alt": "판막 부착물과 역류 평가",
      "source": "52강 p.33",
      "layout": "photo-first",
      "steps": [
        {
          "label": "구조",
          "text": "왼쪽 흑백 영상에서 판막에 붙은 덩어리를 찾는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 305,
              "y": 430,
              "label": "부착물"
            }
          ]
        },
        {
          "label": "혈류",
          "text": "오른쪽은 색도플러로 판막을 지나는 혈류를 평가한다. 색 자체가 감염이나 산소량을 뜻하지 않으며 역류의 위치·시점·정량 지표를 종합한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 772,
              "y": 600,
              "label": "도플러 혈류"
            }
          ]
        }
      ],
      "video": "./assets/cases-52/ie-doppler.mp4",
      "videoNote": "원본 영상을 재생하여 움직임을 확인하세요. 학습 표시는 위 정지영상에 적용됩니다."
    },
    "cases52-arrest-ecg-a": {
      "label": "소생 후 ECG 1",
      "title": "소생 후 전도·재분극 이상을 임상 맥락과 읽기",
      "summary": "",
      "src": "./assets/cases-52/arrest-ecg-a.jpg",
      "width": 1024,
      "height": 541,
      "alt": "소생 후 전도·재분극 이상을 임상 맥락과 읽기",
      "source": "52강 p.37",
      "layout": "photo-first",
      "steps": [
        {
          "label": "넓어진 파형",
          "text": "QRS와 ST–T의 변화가 여러 유도에 보인다. 소생 후 대사·전해질·허혈·체온 변화도 파형에 영향을 줄 수 있다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 600,
              "y": 700,
              "label": "QRS·ST–T"
            }
          ]
        },
        {
          "label": "진단의 한계",
          "text": "이 사진만으로 전형적 type 1 Brugada를 확정하지 않는다. 심실세동·가족력·반복 ECG·유전자 결과를 함께 평가한다.",
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
    "cases52-arrest-ecg-b": {
      "label": "ECG 2",
      "title": "두 ECG의 변화와 반복 기록의 의미",
      "summary": "",
      "src": "./assets/cases-52/arrest-ecg-b.jpg",
      "width": 1029,
      "height": 543,
      "alt": "두 ECG의 변화와 반복 기록의 의미",
      "source": "52강 p.37",
      "layout": "photo-first",
      "steps": [
        {
          "label": "비교",
          "text": "첫 사진과 QRS 폭·ST–T 형태를 비교한다. 두 기록의 정확한 시간 간격과 유발검사 여부는 이 슬라이드만으로 정할 수 없다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        },
        {
          "label": "유전성 전기질환",
          "text": "구조가 정상에 가까워도 치명적인 부정맥은 가능하다. 갑작스러운 가족 사망과 본인의 심실세동이 중요한 단서다.",
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
    "cases52-arrest-cag": {
      "label": "관상동맥 평가",
      "title": "급성 관상동맥 원인을 함께 배제한다",
      "summary": "",
      "src": "./assets/cases-52/arrest-cag.jpg",
      "width": 828,
      "height": 826,
      "alt": "급성 관상동맥 원인을 함께 배제한다",
      "source": "52강 p.40",
      "layout": "photo-first",
      "steps": [
        {
          "label": "감별 순서",
          "text": "젊다는 이유만으로 관상동맥 원인을 생략하지 않는다. 조영술·초음파·전해질·약물·ECG를 종합한 뒤 유전성 전기질환을 평가한다.",
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
    "cases52-arrest-echo": {
      "label": "구조 평가",
      "title": "심장의 모양과 전기적 위험은 다른 축이다",
      "summary": "",
      "src": "./assets/cases-52/arrest-echo.jpg",
      "width": 1078,
      "height": 666,
      "alt": "심장의 모양과 전기적 위험은 다른 축이다",
      "source": "52강 p.41",
      "layout": "photo-first",
      "steps": [
        {
          "label": "벽의 움직임",
          "text": "영상을 재생하여 심실 크기·수축을 확인한다. 구조적 심장질환이 뚜렷하지 않아도 이온통로 이상에 의한 심실세동은 가능하다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ],
      "video": "./assets/cases-52/arrest-echo.mp4",
      "videoNote": "원본 영상을 재생하여 움직임을 확인하세요. 학습 표시는 위 정지영상에 적용됩니다."
    },
    "cases52-gene-report": {
      "label": "유전자 결과",
      "title": "SCN5A 병적 변이와 TTN·DSP VUS를 구별",
      "summary": "",
      "src": "./assets/cases-52/gene-report.jpg",
      "width": 879,
      "height": 864,
      "alt": "SCN5A 병적 변이와 TTN·DSP VUS를 구별",
      "source": "52강 p.42",
      "layout": "photo-first",
      "steps": [
        {
          "label": "추가 분석",
          "text": "결과 요약의 밑줄 문장과 Comments 첫 단락에서 SCN5A 병적 변이 확인을 읽는다. TTN·DSP의 VUS 표만 보고 검사가 음성이라고 읽지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 480,
              "y": 70,
              "label": "SCN5A 추가 결과"
            },
            {
              "x": 500,
              "y": 618,
              "label": "추가 분석"
            }
          ]
        },
        {
          "label": "다른 의미",
          "text": "TTN·DSP의 VUS는 의미 불확실 변이로 확정 병인과 다르다. SCN5A도 여러 표현형과 관련되므로 ECG·임상상과 연결한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 420,
              "y": 285,
              "label": "VUS"
            }
          ]
        }
      ]
    },
    "cases52-icd": {
      "label": "ICD",
      "title": "심실세동 재발에 대비한 삽입형 제세동기",
      "summary": "",
      "src": "./assets/cases-52/icd.jpg",
      "width": 830,
      "height": 824,
      "alt": "심실세동 재발에 대비한 삽입형 제세동기",
      "source": "52강 p.43",
      "layout": "photo-first",
      "steps": [
        {
          "label": "장치",
          "text": "피하의 본체와 심장으로 들어가는 전극을 찾는다. ICD는 위험한 심실성 빈맥·세동을 감지하여 치료한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 775,
              "y": 330,
              "label": "ICD 본체"
            },
            {
              "x": 405,
              "y": 700,
              "label": "제세동 전극"
            }
          ]
        },
        {
          "label": "목표",
          "text": "가역적 원인만으로 설명되지 않는 심실세동 소생자에서 재발 시 돌연사를 예방한다. 느린 맥박을 보충하는 목적의 일반 심박동기와 구별한다.",
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
    "cases52-avblock": {
      "label": "방실차단 ECG",
      "title": "P파는 계속 나오지만 심실은 아주 느리다",
      "summary": "",
      "src": "./assets/cases-52/avblock.jpg",
      "width": 1028,
      "height": 545,
      "alt": "P파는 계속 나오지만 심실은 아주 느리다",
      "source": "52강 p.46",
      "layout": "photo-first",
      "steps": [
        {
          "label": "심실 속도",
          "text": "하단 긴 II유도에 드문 QRS가 거의 일정한 간격으로 나타난다. 10초 기록에 약 5회로 분당 약 30회의 느린 이탈리듬이다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 158,
              "y": 833,
              "label": "QRS"
            },
            {
              "x": 318,
              "y": 833,
              "label": "QRS"
            },
            {
              "x": 478,
              "y": 833,
              "label": "QRS"
            }
          ]
        },
        {
          "label": "P파",
          "text": "QRS 사이의 작은 P파를 일정한 P–P 간격으로 따라간다. 심방은 심실보다 빠르게 뛴다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 68,
              "y": 875,
              "label": "P"
            },
            {
              "x": 126,
              "y": 873,
              "label": "P"
            },
            {
              "x": 244,
              "y": 873,
              "label": "P"
            }
          ]
        },
        {
          "label": "방실 해리",
          "text": "P와 QRS가 일정한 PR로 1:1 연결되지 않는다. P파가 QRS·T파와 겹치기도 하는 완전 방실차단의 흐름이다. 증상성 심실 서맥이 실신의 원인이다.",
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
    "cases52-temporary-pacer": {
      "label": "일시적 조율",
      "title": "당장의 느린 심실을 보조한다",
      "summary": "",
      "src": "./assets/cases-52/temporary-pacer.jpg",
      "width": 833,
      "height": 850,
      "alt": "당장의 느린 심실을 보조한다",
      "source": "52강 p.49",
      "layout": "photo-first",
      "steps": [
        {
          "label": "전극",
          "text": "정맥을 통해 들어온 일시적 조율 전극이 우심실 쪽으로 향한다. 심박출량을 확보하며 원인과 영구 조율 필요성을 판단한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 495,
              "y": 700,
              "label": "조율 전극"
            }
          ]
        }
      ]
    },
    "cases52-permanent-pacer": {
      "label": "영구 심박동기",
      "title": "지속되는 고도 방실차단의 장기 대책",
      "summary": "",
      "src": "./assets/cases-52/permanent-pacer.jpg",
      "width": 815,
      "height": 839,
      "alt": "지속되는 고도 방실차단의 장기 대책",
      "source": "52강 p.49",
      "layout": "photo-first",
      "steps": [
        {
          "label": "본체·전극",
          "text": "피하 본체와 심장 안으로 들어가는 전극들을 찾는다. 느린 맥박을 보충하고 적절한 방실 순서를 유지하는 조율 장치다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 740,
              "y": 190,
              "label": "심박동기"
            },
            {
              "x": 340,
              "y": 668,
              "label": "심실 전극"
            }
          ]
        }
      ]
    },
    "cases52-j25127": {
      "label": "문항 사진",
      "title": "안정 시 ECG·흉부 X선",
      "summary": "",
      "src": "./J/2025/25127-1.jpg",
      "width": 1383,
      "height": 625,
      "source": "25127 제시 영상",
      "alt": "안정 시 ECG·흉부 X선",
      "layout": "photo-first",
      "steps": [
        {
          "label": "ECG",
          "text": "뚜렷한 급성 ST상승이나 지속성 빠른 부정맥은 보이지 않는다. 운동 시 증상은 안정 시 기록만으로 배제되지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 270,
              "y": 420,
              "label": "안정 시 ECG"
            }
          ]
        },
        {
          "label": "흉부 X선",
          "text": "뚜렷한 폐부종·심비대는 보이지 않는다. 이 영상으로 관상동맥 협착 여부를 확인하는 것은 아니다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 760,
              "y": 615,
              "label": "심장·폐"
            }
          ]
        }
      ]
    },
    "cases52-j23149": {
      "label": "문항 사진",
      "title": "휴식 시 흉통과 ST–T 변화",
      "summary": "",
      "src": "./J/2023/23149-1.jpg",
      "width": 1354,
      "height": 673,
      "source": "23149 제시 영상",
      "alt": "휴식 시 흉통과 ST–T 변화",
      "layout": "photo-first",
      "steps": [
        {
          "label": "하강·재분극 변화",
          "text": "하벽·외측 유도의 ST–T 변화를 살핀다. 고전압과 재분극 변화가 섞여 있으므로 사진만으로 특정 관상동맥을 확정하지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 860,
              "y": 430,
              "label": "V5 ST–T"
            }
          ]
        },
        {
          "label": "발문과 연결",
          "text": "점점 심해져 휴식 중에도 생긴 흉통이 핵심이다. troponin이 제시 참고치 안이라는 이유로 안정형 협심증으로 되돌아가지 않는다.",
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
    "cases52-j23150": {
      "label": "문항 사진",
      "title": "규칙적인 좁은 QRS 빈맥",
      "summary": "",
      "src": "./J/2023/23150-1.jpg",
      "width": 1335,
      "height": 691,
      "source": "23150 제시 영상",
      "alt": "규칙적인 좁은 QRS 빈맥",
      "layout": "photo-first",
      "steps": [
        {
          "label": "규칙성",
          "text": "하단 리듬띠의 R–R 간격이 거의 일정하다. 불규칙한 심방세동과 다른 출발점이다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 300,
              "y": 892,
              "label": "규칙적 RR"
            }
          ]
        },
        {
          "label": "폭과 P파",
          "text": "QRS가 좁고 독립된 선행 P파는 뚜렷하지 않다. 갑작스러운 두근거림과 묶어 방실결절 의존성 PSVT를 우선 고려한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 225,
              "y": 118,
              "label": "좁은 QRS"
            }
          ]
        },
        {
          "label": "치료",
          "text": "안정된 정규 좁은 QRS PSVT에서 제시 약물 중 adenosine IV를 우선 선택한다. 불안정해지면 동기화 심율동전환으로 분기한다.",
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
    "cases52-stable": {
      "title": "흉통 1 · 안정 시 검사와 운동 부하",
      "caption": "사진과 관찰 버튼을 바꾸며 단서와 판단을 연결해 보세요.",
      "cases": [
        "cases52-stable-ecg",
        "cases52-stable-cxr",
        "cases52-exercise-before",
        "cases52-exercise-after"
      ]
    },
    "cases52-stable-pci": {
      "title": "흉통 1 · 검사에서 치료로",
      "caption": "사진과 관찰 버튼을 바꾸며 단서와 판단을 연결해 보세요.",
      "cases": [
        "cases52-stable-cag",
        "cases52-stable-pci"
      ]
    },
    "cases52-stemi": {
      "title": "흉통 2 · ST상승에서 응급 재관류까지",
      "caption": "사진과 관찰 버튼을 바꾸며 단서와 판단을 연결해 보세요.",
      "cases": [
        "cases52-stemi-ecg",
        "cases52-stemi-echo",
        "cases52-stemi-cag",
        "cases52-stemi-pci"
      ]
    },
    "cases52-hf": {
      "title": "호흡곤란 1 · 울혈과 심실 기능",
      "caption": "사진과 관찰 버튼을 바꾸며 단서와 판단을 연결해 보세요.",
      "cases": [
        "cases52-hf-cxr",
        "cases52-hf-ecg",
        "cases52-hf-echo"
      ]
    },
    "cases52-hf-cause": {
      "title": "호흡곤란 1 · 원인과 치료 반응",
      "caption": "사진과 관찰 버튼을 바꾸며 단서와 판단을 연결해 보세요.",
      "cases": [
        "cases52-hf-cag",
        "cases52-hf-mri",
        "cases52-hf-followup"
      ]
    },
    "cases52-ie": {
      "title": "호흡곤란 2 · 판막의 감염성 증식물",
      "caption": "사진과 관찰 버튼을 바꾸며 단서와 판단을 연결해 보세요.",
      "cases": [
        "cases52-ie-long",
        "cases52-ie-vegetation",
        "cases52-ie-motion",
        "cases52-ie-doppler"
      ]
    },
    "cases52-ie-basic": {
      "title": "호흡곤란 2 · 기초 검사",
      "caption": "사진과 관찰 버튼을 바꾸며 단서와 판단을 연결해 보세요.",
      "cases": [
        "cases52-ie-ecg",
        "cases52-ie-cxr"
      ]
    },
    "cases52-arrest": {
      "title": "심정지 · ECG와 구조 검사",
      "caption": "사진과 관찰 버튼을 바꾸며 단서와 판단을 연결해 보세요.",
      "cases": [
        "cases52-arrest-ecg-a",
        "cases52-arrest-ecg-b",
        "cases52-arrest-cag",
        "cases52-arrest-echo"
      ]
    },
    "cases52-gene": {
      "title": "심정지 · 유전자 결과와 ICD",
      "caption": "사진과 관찰 버튼을 바꾸며 단서와 판단을 연결해 보세요.",
      "cases": [
        "cases52-gene-report",
        "cases52-icd"
      ]
    },
    "cases52-syncope": {
      "title": "실신 · 방실 해리에서 심박동기까지",
      "caption": "사진과 관찰 버튼을 바꾸며 단서와 판단을 연결해 보세요.",
      "cases": [
        "cases52-avblock",
        "cases52-temporary-pacer",
        "cases52-permanent-pacer"
      ]
    },
    "cases52-chest-card": {
      "title": "흉통 · 안정 시와 급성 ST상승 비교",
      "caption": "사진과 관찰 버튼을 바꾸며 단서와 판단을 연결해 보세요.",
      "cases": [
        "cases52-stable-ecg",
        "cases52-stemi-ecg"
      ]
    },
    "cases52-hf-card": {
      "title": "울혈 · 심장 음영과 심실 운동",
      "caption": "사진과 관찰 버튼을 바꾸며 단서와 판단을 연결해 보세요.",
      "cases": [
        "cases52-hf-cxr",
        "cases52-hf-echo"
      ]
    },
    "cases52-ie-card": {
      "title": "심내막염 · 판막 부착물",
      "caption": "사진과 관찰 버튼을 바꾸며 단서와 판단을 연결해 보세요.",
      "cases": [
        "cases52-ie-vegetation"
      ]
    },
    "cases52-syncope-card": {
      "title": "완전 방실차단 · P와 QRS를 따로 세기",
      "caption": "사진과 관찰 버튼을 바꾸며 단서와 판단을 연결해 보세요.",
      "cases": [
        "cases52-avblock"
      ]
    },
    "cases52-j25127": {
      "title": "사진 해석 · 안정 시 ECG·흉부 X선",
      "caption": "사진과 관찰 버튼을 바꾸며 단서와 판단을 연결해 보세요.",
      "cases": [
        "cases52-j25127"
      ]
    },
    "cases52-j23149": {
      "title": "사진 해석 · 휴식 시 흉통과 ST–T 변화",
      "caption": "사진과 관찰 버튼을 바꾸며 단서와 판단을 연결해 보세요.",
      "cases": [
        "cases52-j23149"
      ]
    },
    "cases52-j23150": {
      "title": "사진 해석 · 규칙적인 좁은 QRS 빈맥",
      "caption": "사진과 관찰 버튼을 바꾸며 단서와 판단을 연결해 보세요.",
      "cases": [
        "cases52-j23150"
      ]
    }
  }
};
window.CARDIO_ECG_LEARNING ||= {cases:{},groups:{}};
Object.assign(window.CARDIO_ECG_LEARNING.cases,data.cases);
Object.assign(window.CARDIO_ECG_LEARNING.groups,data.groups);
})();
