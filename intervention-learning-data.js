/* 51강 원본 영상과 별도 학습 표시. */
(function(){
const data={
  "cases": {
    "intervention51-asd-echo": {
      "label": "심방중격",
      "title": "좌심방·우심방 → 중격 결손",
      "summary": "",
      "src": "./J/2019/odap30/19103-question-1.png",
      "width": 917,
      "height": 352,
      "source": "51강 p.9와 대조 · 2019 오답30 103번",
      "alt": "좌심방·우심방 → 중격 결손",
      "layout": "photo-first",
      "steps": [
        {
          "label": "두 심방",
          "text": "이 영상의 A는 탐촉자 가까운 좌심방(LA), B는 우심방(RA)이다. 좌심실·우심실을 가르는 사진이 아니다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 260,
              "y": 280,
              "label": "LA"
            },
            {
              "x": 190,
              "y": 580,
              "label": "RA"
            }
          ]
        },
        {
          "label": "결손과 혈류",
          "text": "왼쪽에서 두 심방 사이 중격의 결손, 오른쪽에서 그 위치를 통과하는 색도플러 신호를 함께 찾는다. 색은 혈액의 산소량이 아니라 탐촉자에 대한 흐름을 나타낸다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 235,
              "y": 425,
              "label": "중격"
            },
            {
              "x": 750,
              "y": 500,
              "label": "단락"
            }
          ]
        }
      ]
    },
    "intervention51-asd-occluder": {
      "label": "폐쇄기구",
      "title": "두 원반이 중격 양쪽에서 통로를 막는다",
      "summary": "",
      "src": "./assets/intervention-51/asd-occluder.jpg",
      "width": 1110,
      "height": 540,
      "source": "51강 p.8",
      "alt": "두 원반이 중격 양쪽에서 통로를 막는다",
      "layout": "photo-first",
      "steps": [
        {
          "label": "기구의 원리",
          "text": "자가팽창 니티놀 원반 두 개와 가운데 허리 부분이 결손을 사이에 두고 자리 잡는다. 주변 rim은 기구가 지지되는 테두리다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        },
        {
          "label": "모양과 적응증",
          "text": "ASD 기구 폐쇄는 결손 크기뿐 아니라 형태·rim·폐혈관 상태까지 맞아야 한다. 기구 크기 규격을 모든 결손에 적용하는 기준으로 읽지 않는다.",
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
    "intervention51-asd-device-photo": {
      "label": "시술 사진",
      "title": "폐쇄 원반과 초음파 탐촉자를 구별한다",
      "summary": "",
      "src": "./J/2019/odap30/19104-question-1.png",
      "width": 860,
      "height": 859,
      "source": "51강 p.10과 대조 · 2019 오답30 104번",
      "alt": "폐쇄 원반과 초음파 탐촉자를 구별한다",
      "layout": "photo-first",
      "steps": [
        {
          "label": "중격 폐쇄기구",
          "text": "가느다란 전달관 끝의 원반 모양 기구가 결손을 막는다. 이차공형 ASD의 기구 폐쇄 장면이다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 435,
              "y": 475,
              "label": "폐쇄기구"
            }
          ]
        },
        {
          "label": "TEE 탐촉자",
          "text": "위에서 내려온 굵고 검은 기구는 위치와 잔여 단락을 확인하는 경식도 초음파 탐촉자다. 이것을 심장에 남겨 두는 폐쇄기구로 혼동하지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 590,
              "y": 370,
              "label": "TEE"
            }
          ]
        }
      ],
      "video": "./assets/intervention-51/asd-device-photo.mp4",
      "videoNote": "재생·일시정지로 강의의 움직임을 확인하세요. 학습 표시는 위 정지 사진에만 적용되며, 같은 슬라이드의 다른 단면·시점이 포함될 수 있습니다."
    },
    "intervention51-asd-pah-baseline": {
      "label": "치료 전",
      "title": "결손·단락량·폐동맥압을 함께 평가",
      "summary": "",
      "src": "./assets/intervention-51/asd-pah-baseline.jpg",
      "width": 1390,
      "height": 650,
      "source": "51강 p.12",
      "alt": "결손·단락량·폐동맥압을 함께 평가",
      "layout": "photo-first",
      "steps": [
        {
          "label": "결손 크기",
          "text": "좌측 3차원 영상에서 중격의 결손을 찾는다. 2.4×2.2 cm의 큰 결손과 Qp/Qs 2.6이 함께 제시된다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 260,
              "y": 420,
              "label": "ASD"
            }
          ]
        },
        {
          "label": "폐고혈압",
          "text": "폐동맥수축기압 101 mmHg가 제시된다. 압력이 높다는 사실만으로 폐혈관저항의 가역성이나 폐쇄 가능 여부를 확정할 수 없다.",
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
    "intervention51-asd-pah-followup": {
      "label": "6개월 뒤",
      "title": "폐동맥압 감소와 남은 저항을 구분",
      "summary": "",
      "src": "./assets/intervention-51/asd-pah-followup.jpg",
      "width": 1270,
      "height": 560,
      "source": "51강 p.13",
      "alt": "폐동맥압 감소와 남은 저항을 구분",
      "layout": "photo-first",
      "steps": [
        {
          "label": "재평가",
          "text": "폐동맥수축기압은 101→84 mmHg, 폐혈관저항은 8.8→7.8 WU로 제시된다. 압력이 줄어도 높은 저항이 남으므로 표준적인 즉시 완전 폐쇄 기준으로 일반화하지 않는다.",
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
    "intervention51-asd-pah-closure": {
      "label": "폐쇄 사례",
      "title": "개별 환자의 폐쇄 후 영상",
      "summary": "",
      "src": "./assets/intervention-51/asd-pah-closure.jpg",
      "width": 1344,
      "height": 880,
      "source": "51강 p.14",
      "alt": "개별 환자의 폐쇄 후 영상",
      "layout": "photo-first",
      "steps": [
        {
          "label": "시술 뒤 평가",
          "text": "상단은 폐쇄기구 위치와 색도플러, 하단은 심실 단면을 보여 준다. 잔여 단락과 우심실 부담을 평가하는 맥락이다. 이 한 장으로 압력·저항이 정상화됐다고 단정하지 않는다.",
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
    "intervention51-pfo-tunnel": {
      "label": "터널 구조",
      "title": "중격 조직의 결손이 아닌 판막형 틈",
      "summary": "",
      "src": "./assets/intervention-51/pfo-tunnel.jpg",
      "width": 368,
      "height": 452,
      "source": "51강 p.16",
      "alt": "중격 조직의 결손이 아닌 판막형 틈",
      "layout": "photo-first",
      "steps": [
        {
          "label": "덜 붙은 중격판",
          "text": "위의 우심방(RA)과 아래의 좌심방(LA) 사이 두 중격판이 겹쳐 터널을 이룬다. 우심방압이 순간적으로 높아지면 우→좌 통과가 가능하다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 605,
              "y": 425,
              "label": "터널"
            }
          ]
        },
        {
          "label": "역설색전",
          "text": "정맥 혈전이 이 길을 지나 좌심방→좌심실→대동맥으로 들어가면 뇌동맥 색전을 일으킬 수 있다. PFO가 혈전을 만들어 내는 병이라는 뜻은 아니다.",
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
    "intervention51-pfo-mri": {
      "label": "뇌 MRI",
      "title": "보행장애의 원인부터 찾기",
      "summary": "",
      "src": "./J/2020/20086-1.jpg",
      "width": 442,
      "height": 454,
      "source": "51강 p.20과 동일 영상 · 20086",
      "alt": "보행장애의 원인부터 찾기",
      "layout": "photo-first",
      "steps": [
        {
          "label": "확산강조 신호",
          "text": "소뇌 부위의 밝은 신호가 보행장애를 뇌경색과 연결하게 한다. 실제 급성 허혈 판단에는 ADC 등 다른 영상도 함께 본다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 630,
              "y": 870,
              "label": "고신호"
            }
          ]
        },
        {
          "label": "다음 질문",
          "text": "뇌경색을 확인한 뒤 색전의 발생원과 통과 경로를 찾는다. 이 MRI만으로 PFO를 진단하거나 모든 뇌경색을 역설색전으로 부르지 않는다.",
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
    "intervention51-pfo-echo": {
      "label": "심방중격",
      "title": "좌우 심방 사이의 판막형 통로",
      "summary": "",
      "src": "./J/2020/20086-2.jpg",
      "width": 555,
      "height": 441,
      "source": "51강 p.21과 동일 영상 · 20086",
      "alt": "좌우 심방 사이의 판막형 통로",
      "layout": "photo-first",
      "steps": [
        {
          "label": "화살표 위치",
          "text": "좌심방과 우심방 사이, 기존 화살표 끝의 중격판 사이 통로를 본다. 강의의 PFO 증례와 같은 영상이다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 342,
              "y": 425,
              "label": "PFO"
            }
          ]
        },
        {
          "label": "평상시 흐름과 색전",
          "text": "색도플러 한 순간의 좌→우 흐름과, 우심방압 상승 때 색전이 넘어가는 우→좌 흐름을 구분한다. 우좌단락은 기포조영·유발 동작 등으로 평가한다.",
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
    "intervention51-pfo-device": {
      "label": "재발 방지 시술",
      "title": "중격 양쪽의 원반으로 통로 폐쇄",
      "summary": "",
      "src": "./J/2020/20086-3.jpg",
      "width": 428,
      "height": 435,
      "source": "51강 p.22와 동일 영상 · 20086",
      "alt": "중격 양쪽의 원반으로 통로 폐쇄",
      "layout": "photo-first",
      "steps": [
        {
          "label": "두 원반",
          "text": "중앙의 길쭉한 원반 두 장이 겹쳐 보이는 기구를 찾는다. PFO를 통한 색전 통과 경로를 막는 시술이다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 510,
              "y": 450,
              "label": "폐쇄기구"
            }
          ]
        },
        {
          "label": "ASD와 구별",
          "text": "유사한 원반은 ASD에서도 쓴다. 기구만으로 진단하지 않고 뇌경색 증례·중격 형태·관련 강의 영상을 함께 연결한다.",
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
    "intervention51-vsd-sites": {
      "label": "결손 위치",
      "title": "심실 사이의 벽에서 VSD를 찾는다",
      "summary": "",
      "src": "./assets/intervention-51/vsd-sites.jpg",
      "width": 500,
      "height": 377,
      "source": "51강 p.24",
      "alt": "심실 사이의 벽에서 VSD를 찾는다",
      "layout": "photo-first",
      "steps": [
        {
          "label": "근성 결손",
          "text": "심실중격의 근육 부분에 난 결손이다. 경피적 기구 폐쇄를 대표적으로 연결할 위치다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 607,
              "y": 770,
              "label": "근성 VSD"
            }
          ]
        },
        {
          "label": "막주위·유출로",
          "text": "위쪽의 막주위형과 유출로형은 전도계·대동맥판 등 주변 구조와의 관계를 함께 평가한다. 모든 위치의 VSD를 같은 조건으로 기구 폐쇄하지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 483,
              "y": 455,
              "label": "막주위"
            },
            {
              "x": 595,
              "y": 350,
              "label": "유출로"
            }
          ]
        }
      ]
    },
    "intervention51-tavr-ct-calcium": {
      "label": "판막 석회화",
      "title": "시술 전 CT · 첨판과 석회화",
      "summary": "",
      "src": "./assets/intervention-51/tavr-ct-calcium.jpg",
      "width": 381,
      "height": 348,
      "source": "51강 p.38",
      "alt": "시술 전 CT · 첨판과 석회화",
      "layout": "photo-first",
      "steps": [
        {
          "label": "석회화 분포",
          "text": "대동맥판 단면의 매우 밝은 석회화와 좁은 개구를 본다. 강의는 우관상첨판–좌관상첨판 융합형 이엽성 판막으로 제시한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 510,
              "y": 520,
              "label": "판막"
            }
          ]
        },
        {
          "label": "왜 확인할까",
          "text": "비대칭 석회화는 기구의 팽창·밀착에 영향을 준다. CT에서는 판막뿐 아니라 판륜·관상동맥 입구·접근 혈관까지 확인한다.",
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
    "intervention51-tavr-ct-raphe": {
      "label": "융합 부위",
      "title": "이엽성 대동맥판의 석회화된 raphe",
      "summary": "",
      "src": "./assets/intervention-51/tavr-ct-raphe.jpg",
      "width": 362,
      "height": 369,
      "source": "51강 p.38",
      "alt": "이엽성 대동맥판의 석회화된 raphe",
      "layout": "photo-first",
      "steps": [
        {
          "label": "융합 부위",
          "text": "강의가 제시한 R–L fusion과 석회화된 능선(raphe)을 읽는다. 딱딱한 융합 부위는 새 판막이 대칭으로 펼쳐지는지에 영향을 준다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 550,
              "y": 500,
              "label": "석회화 능선"
            }
          ]
        }
      ]
    },
    "intervention51-tavr-ct-annulus": {
      "label": "판륜 크기",
      "title": "타원형 판륜 · 직경·면적·둘레",
      "summary": "",
      "src": "./assets/intervention-51/tavr-ct-annulus.jpg",
      "width": 488,
      "height": 365,
      "source": "51강 p.39",
      "alt": "타원형 판륜 · 직경·면적·둘레",
      "layout": "photo-first",
      "steps": [
        {
          "label": "최소·최대 직경",
          "text": "직경은 최소 23.1 mm, 최대 29.8 mm로 다르다. 원이 아닌 판륜을 한 직경으로만 대표하지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 490,
              "y": 590,
              "label": "판륜"
            }
          ]
        },
        {
          "label": "기구 크기 계획",
          "text": "면적 536.2 mm²와 둘레 83.3 mm, 각각으로 환산한 직경도 표시되어 있다. 이 값들과 판막 형태를 합쳐 기구 종류·크기를 고른다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ],
      "video": "./assets/intervention-51/tavr-ct-annulus.mp4",
      "videoNote": "재생·일시정지로 강의의 움직임을 확인하세요. 학습 표시는 위 정지 사진에만 적용되며, 같은 슬라이드의 다른 단면·시점이 포함될 수 있습니다."
    },
    "intervention51-tavr-wire": {
      "label": "통과",
      "title": "가이드와 전달 경로",
      "summary": "",
      "src": "./assets/intervention-51/tavr-wire.jpg",
      "width": 1270,
      "height": 626,
      "source": "51강 p.40",
      "alt": "가이드와 전달 경로",
      "layout": "photo-first",
      "steps": [
        {
          "label": "판막을 지난 선",
          "text": "대동맥을 통해 들어간 가이드가 판막을 지나 좌심실 쪽에서 굽어 있다. 뒤에 넣을 판막이 따라갈 경로다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 795,
              "y": 620,
              "label": "가이드"
            }
          ]
        }
      ],
      "video": "./assets/intervention-51/tavr-wire.mp4",
      "videoNote": "재생·일시정지로 강의의 움직임을 확인하세요. 학습 표시는 위 정지 사진에만 적용되며, 같은 슬라이드의 다른 단면·시점이 포함될 수 있습니다."
    },
    "intervention51-tavr-balloon": {
      "label": "풍선 전확장",
      "title": "BAV · 판막을 먼저 넓히는 단계",
      "summary": "",
      "src": "./assets/intervention-51/tavr-balloon.jpg",
      "width": 512,
      "height": 512,
      "source": "51강 p.41",
      "alt": "BAV · 판막을 먼저 넓히는 단계",
      "layout": "photo-first",
      "steps": [
        {
          "label": "일시적 풍선",
          "text": "대동맥판 위치의 풍선 전확장 단계다. BAV는 이 시술 문맥에서 balloon aortic valvuloplasty를 뜻한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 400,
              "y": 430,
              "label": "풍선 단계"
            }
          ]
        },
        {
          "label": "최종 판막과 구별",
          "text": "풍선은 최종적으로 남는 판막이 아니다. 다음 단계의 원통형 금속 프레임에 조직판막이 들어 있다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ],
      "video": "./assets/intervention-51/tavr-balloon.mp4",
      "videoNote": "재생·일시정지로 강의의 움직임을 확인하세요. 학습 표시는 위 정지 사진에만 적용되며, 같은 슬라이드의 다른 단면·시점이 포함될 수 있습니다."
    },
    "intervention51-tavr-deploy": {
      "label": "펼치기",
      "title": "자가팽창 판막의 전개",
      "summary": "",
      "src": "./assets/intervention-51/tavr-deploy.jpg",
      "width": 1302,
      "height": 636,
      "source": "51강 p.42",
      "alt": "자가팽창 판막의 전개",
      "layout": "photo-first",
      "steps": [
        {
          "label": "기구 팽창",
          "text": "왼쪽의 전달기구에서 오른쪽의 넓어진 격자형 프레임으로 이어진다. 위치를 맞추며 자가팽창 판막을 펼친다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 750,
              "y": 475,
              "label": "프레임"
            }
          ]
        }
      ],
      "video": "./assets/intervention-51/tavr-deploy.mp4",
      "videoNote": "재생·일시정지로 강의의 움직임을 확인하세요. 학습 표시는 위 정지 사진에만 적용되며, 같은 슬라이드의 다른 단면·시점이 포함될 수 있습니다."
    },
    "intervention51-tavr-final": {
      "label": "삽입 뒤",
      "title": "대동맥판에 남은 원통형 프레임",
      "summary": "",
      "src": "./assets/intervention-51/tavr-final.jpg",
      "width": 1242,
      "height": 612,
      "source": "51강 p.45",
      "alt": "대동맥판에 남은 원통형 프레임",
      "layout": "photo-first",
      "steps": [
        {
          "label": "최종 삽입물",
          "text": "두 투사 방향에서 새 판막의 격자형 프레임을 본다. 중격을 막는 두 원반이나 승모판의 작은 클립과 모양이 다르다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 260,
              "y": 390,
              "label": "TAVI"
            },
            {
              "x": 755,
              "y": 440,
              "label": "TAVI"
            }
          ]
        },
        {
          "label": "기능 확인",
          "text": "투시는 위치와 프레임 형태를 보여 준다. 판막 기능·잔여 압력차·판막 주위 역류는 초음파와 혈역학 평가가 더 필요하다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ],
      "video": "./assets/intervention-51/tavr-final.mp4",
      "videoNote": "재생·일시정지로 강의의 움직임을 확인하세요. 학습 표시는 위 정지 사진에만 적용되며, 같은 슬라이드의 다른 단면·시점이 포함될 수 있습니다."
    },
    "intervention51-tavr-post-long": {
      "label": "시술 후 장축",
      "title": "위치와 도플러를 나누어 본다",
      "summary": "",
      "src": "./assets/intervention-51/tavr-post-long.jpg",
      "width": 1440,
      "height": 468,
      "source": "51강 p.47",
      "alt": "위치와 도플러를 나누어 본다",
      "layout": "photo-first",
      "steps": [
        {
          "label": "초음파 평가",
          "text": "왼쪽은 구조, 오른쪽은 색도플러다. 새 판막 위치와 통과 혈류·판막 주위 역류를 살핀다. 정지영상 하나로 정상 기능을 확정하지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ],
      "video": "./assets/intervention-51/tavr-post-long.mp4",
      "videoNote": "재생·일시정지로 강의의 움직임을 확인하세요. 학습 표시는 위 정지 사진에만 적용되며, 같은 슬라이드의 다른 단면·시점이 포함될 수 있습니다."
    },
    "intervention51-tavr-post-short": {
      "label": "시술 후 단축",
      "title": "대동맥판 단면과 주변 혈류",
      "summary": "",
      "src": "./assets/intervention-51/tavr-post-short.jpg",
      "width": 1406,
      "height": 502,
      "source": "51강 p.48",
      "alt": "대동맥판 단면과 주변 혈류",
      "layout": "photo-first",
      "steps": [
        {
          "label": "판막 단면",
          "text": "대동맥판의 단축 단면에서 구조와 색도플러를 비교한다. 잔여 협착·역류 판단에는 속도·압력차 등도 필요하다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 255,
              "y": 520,
              "label": "판막"
            }
          ]
        }
      ],
      "video": "./assets/intervention-51/tavr-post-short.mp4",
      "videoNote": "재생·일시정지로 강의의 움직임을 확인하세요. 학습 표시는 위 정지 사진에만 적용되며, 같은 슬라이드의 다른 단면·시점이 포함될 수 있습니다."
    },
    "intervention51-tavr-other-bav": {
      "label": "다른 시술 사례",
      "title": "풍선 시술 사례의 구조·도플러",
      "summary": "",
      "src": "./assets/intervention-51/tavr-other-bav.jpg",
      "width": 1008,
      "height": 704,
      "source": "51강 p.49",
      "alt": "풍선 시술 사례의 구조·도플러",
      "layout": "photo-first",
      "steps": [
        {
          "label": "별도 사례",
          "text": "다른 날짜의 TAVI 사례 영상이다. 동일 환자의 연속 추적으로 합치지 않고, 대동맥판 단면과 색도플러의 역할을 비교한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ],
      "video": "./assets/intervention-51/tavr-other-bav.mp4",
      "videoNote": "재생·일시정지로 강의의 움직임을 확인하세요. 학습 표시는 위 정지 사진에만 적용되며, 같은 슬라이드의 다른 단면·시점이 포함될 수 있습니다."
    },
    "intervention51-ms-anatomy": {
      "label": "좁은 승모판",
      "title": "교련이 붙어 입구가 좁아진다",
      "summary": "",
      "src": "./assets/intervention-51/ms-anatomy.jpg",
      "width": 904,
      "height": 600,
      "source": "51강 p.50",
      "alt": "교련이 붙어 입구가 좁아진다",
      "layout": "photo-first",
      "steps": [
        {
          "label": "좁아진 입구",
          "text": "오른쪽 판막의 입구가 작다. 적합한 류마티스성 승모판협착에서 붙은 교련을 풍선으로 벌리는 원리를 연결한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 705,
              "y": 610,
              "label": "좁은 입구"
            }
          ]
        }
      ]
    },
    "intervention51-ms-balloon": {
      "label": "풍선 시술",
      "title": "승모판을 가로지른 풍선",
      "summary": "",
      "src": "./assets/intervention-51/ms-balloon.jpg",
      "width": 792,
      "height": 694,
      "source": "51강 p.51",
      "alt": "승모판을 가로지른 풍선",
      "layout": "photo-first",
      "steps": [
        {
          "label": "교련 벌리기",
          "text": "큰 풍선이 승모판 입구를 벌린다. 좁은 판막을 새것으로 교체하는 TAVI와 달리 기존 판막의 붙은 교련을 분리한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 610,
              "y": 465,
              "label": "풍선"
            }
          ]
        },
        {
          "label": "시술 전 확인",
          "text": "좌심방 혈전·중등도 이상 역류·심한 석회화 등은 시술을 제한한다. 혈전은 색전, 기존 역류는 시술 후 악화 위험과 연결한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ],
      "video": "./assets/intervention-51/ms-balloon.mp4",
      "videoNote": "재생·일시정지로 강의의 움직임을 확인하세요. 학습 표시는 위 정지 사진에만 적용되며, 같은 슬라이드의 다른 단면·시점이 포함될 수 있습니다."
    },
    "intervention51-ms-echo": {
      "label": "시술 전후",
      "title": "승모판 단축 영상 비교",
      "summary": "",
      "src": "./assets/intervention-51/ms-echo.jpg",
      "width": 1430,
      "height": 704,
      "source": "51강 p.52",
      "alt": "승모판 단축 영상 비교",
      "layout": "photo-first",
      "steps": [
        {
          "label": "열리는 입구",
          "text": "화살표 방향으로 시술 전후를 비교한다. 첨판과 입구 모양을 살피고, 실제 효과는 판막 면적·평균 압력차·새 역류까지 함께 평가한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 245,
              "y": 500,
              "label": "시술 전"
            },
            {
              "x": 765,
              "y": 500,
              "label": "시술 후"
            }
          ]
        }
      ],
      "video": "./assets/intervention-51/ms-echo.mp4",
      "videoNote": "재생·일시정지로 강의의 움직임을 확인하세요. 학습 표시는 위 정지 사진에만 적용되며, 같은 슬라이드의 다른 단면·시점이 포함될 수 있습니다."
    },
    "intervention51-mr-clip-diagram": {
      "label": "접합 원리",
      "title": "두 첨판을 붙여 역류 구멍을 줄인다",
      "summary": "",
      "src": "./assets/intervention-51/mr-clip-diagram.jpg",
      "width": 1242,
      "height": 672,
      "source": "51강 p.54",
      "alt": "두 첨판을 붙여 역류 구멍을 줄인다",
      "layout": "photo-first",
      "steps": [
        {
          "label": "새는 판막",
          "text": "왼쪽은 승모판이 닫힐 때 좌심실에서 좌심방으로 새는 역류를 나타낸다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 155,
              "y": 550,
              "label": "역류"
            }
          ]
        },
        {
          "label": "클립의 목표",
          "text": "오른쪽에서 클립이 두 첨판 가장자리를 잡아 붙인다. TEER는 새 판막 삽입이 아닌 판막 수복이다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 810,
              "y": 550,
              "label": "접합"
            }
          ]
        }
      ],
      "video": "./assets/intervention-51/mr-clip-diagram.mp4",
      "videoNote": "정맥 접근 → 심방중격 통과 → 첨판 위치 조정 → 두 가장자리 접합을 따라가 보세요. 학습 표시는 위 정지 그림에만 적용됩니다."
    },
    "intervention51-mr-clip-position": {
      "label": "위치 맞추기",
      "title": "초음파를 보며 첨판을 잡는다",
      "summary": "",
      "src": "./assets/intervention-51/mr-clip-position.jpg",
      "width": 1418,
      "height": 726,
      "source": "51강 p.56",
      "alt": "초음파를 보며 첨판을 잡는다",
      "layout": "photo-first",
      "steps": [
        {
          "label": "전달기구",
          "text": "심방중격을 거쳐 좌심방에 도달한 전달기구를 조정한다. 굵은 경식도 초음파 탐촉자는 시술 위치를 감시하는 장치다.",
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
    "intervention51-mr-clip-release": {
      "label": "클립 남기기",
      "title": "작은 클립과 전달기구를 구별",
      "summary": "",
      "src": "./assets/intervention-51/mr-clip-release.jpg",
      "width": 1440,
      "height": 740,
      "source": "51강 p.57",
      "alt": "작은 클립과 전달기구를 구별",
      "layout": "photo-first",
      "steps": [
        {
          "label": "클립",
          "text": "오른쪽의 작은 클립들이 보인다. TAVI의 큰 원통형 프레임이나 중격 폐쇄 원반과 다른 모양이다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 835,
              "y": 460,
              "label": "클립"
            }
          ]
        },
        {
          "label": "너무 좁아지지 않게",
          "text": "역류 감소와 함께 승모판 통과 압력차를 확인한다. 역류를 줄였어도 과도한 협착이 생기면 안 된다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ],
      "video": "./assets/intervention-51/mr-clip-release.mp4",
      "videoNote": "재생·일시정지로 강의의 움직임을 확인하세요. 학습 표시는 위 정지 사진에만 적용되며, 같은 슬라이드의 다른 단면·시점이 포함될 수 있습니다."
    },
    "intervention51-mr-clip-echo": {
      "label": "색도플러",
      "title": "잔여 역류와 판막 통과를 평가",
      "summary": "",
      "src": "./assets/intervention-51/mr-clip-echo.jpg",
      "width": 1440,
      "height": 1080,
      "source": "51강 p.58",
      "alt": "잔여 역류와 판막 통과를 평가",
      "layout": "photo-first",
      "steps": [
        {
          "label": "여러 단면",
          "text": "여러 초음파 단면에서 판막·기구 위치와 혈류를 살핀다. 색 면적만으로 역류 등급이나 전후 개선량을 확정하지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ],
      "video": "./assets/intervention-51/mr-clip-echo.mp4",
      "videoNote": "재생·일시정지로 강의의 움직임을 확인하세요. 학습 표시는 위 정지 사진에만 적용되며, 같은 슬라이드의 다른 단면·시점이 포함될 수 있습니다."
    },
    "intervention51-j25085-0": {
      "label": "CT",
      "title": "대동맥판 석회화",
      "summary": "",
      "src": "./J/2025/25085-1.jpg",
      "width": 701,
      "height": 685,
      "source": "25085 제시 영상 · 51강 p.35–49 대조",
      "alt": "대동맥판 석회화",
      "layout": "photo-first",
      "steps": [
        {
          "label": "석회화",
          "text": "대동맥판 위치의 밝은 석회화가 협착의 구조적 근거다. 수축기 잡음·증상과 함께 읽는다. CT 정지사진만으로 협착 압력차를 재지는 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 540,
              "y": 390,
              "label": "판막 석회화"
            }
          ]
        }
      ]
    },
    "intervention51-j25085-1": {
      "label": "시술",
      "title": "대동맥판의 금속 프레임",
      "summary": "",
      "src": "./J/2025/25085-2.jpg",
      "width": 750,
      "height": 685,
      "source": "25085 제시 영상 · 51강 p.35–49 대조",
      "alt": "대동맥판의 금속 프레임",
      "layout": "photo-first",
      "steps": [
        {
          "label": "TAVI 프레임",
          "text": "대동맥판 위치에 격자형 원통 프레임이 남아 있다. 조직판막을 지지하는 프레임이며, 심방중격을 막는 두 원반과 구별한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 355,
              "y": 390,
              "label": "TAVI"
            }
          ]
        }
      ]
    },
    "intervention51-j23069-0": {
      "label": "초음파",
      "title": "LV–대동맥 사이의 좁은 판막",
      "summary": "",
      "src": "./J/2023/comprehensive-2023-46-1.jpeg",
      "width": 357,
      "height": 305,
      "source": "23069 제시 영상 · 51강 p.35–49 대조",
      "alt": "LV–대동맥 사이의 좁은 판막",
      "layout": "photo-first",
      "steps": [
        {
          "label": "판막 위치",
          "text": "좌심실과 대동맥 사이의 두껍고 밝은 판막을 본다. 증상과 우측 제2늑간 수축기 잡음, 이후 시술을 합치면 AS다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 443,
              "y": 456,
              "label": "대동맥판"
            }
          ]
        }
      ]
    },
    "intervention51-j23069-1": {
      "label": "시술",
      "title": "대동맥판의 금속 프레임",
      "summary": "",
      "src": "./J/2023/comprehensive-2023-46-2.jpeg",
      "width": 302,
      "height": 302,
      "source": "23069 제시 영상 · 51강 p.35–49 대조",
      "alt": "대동맥판의 금속 프레임",
      "layout": "photo-first",
      "steps": [
        {
          "label": "TAVI 프레임",
          "text": "대동맥판 위치에 격자형 원통 프레임이 남아 있다. 조직판막을 지지하는 프레임이며, 심방중격을 막는 두 원반과 구별한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 443,
              "y": 420,
              "label": "TAVI"
            }
          ]
        }
      ]
    },
    "intervention51-j22041-0": {
      "label": "초음파",
      "title": "LV–대동맥 사이의 좁은 판막",
      "summary": "",
      "src": "./J/2022/22041-1.jpg",
      "width": 797,
      "height": 772,
      "source": "22041 제시 영상 · 51강 p.35–49 대조",
      "alt": "LV–대동맥 사이의 좁은 판막",
      "layout": "photo-first",
      "steps": [
        {
          "label": "판막 위치",
          "text": "좌심실과 대동맥 사이의 두껍고 밝은 판막을 본다. 증상과 우측 제2늑간 수축기 잡음, 이후 시술을 합치면 AS다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 607,
              "y": 548,
              "label": "대동맥판"
            }
          ]
        }
      ]
    },
    "intervention51-j22041-1": {
      "label": "시술",
      "title": "대동맥판의 금속 프레임",
      "summary": "",
      "src": "./J/2022/22041-2.jpg",
      "width": 807,
      "height": 752,
      "source": "22041 제시 영상 · 51강 p.35–49 대조",
      "alt": "대동맥판의 금속 프레임",
      "layout": "photo-first",
      "steps": [
        {
          "label": "TAVI 프레임",
          "text": "대동맥판 위치에 격자형 원통 프레임이 남아 있다. 조직판막을 지지하는 프레임이며, 심방중격을 막는 두 원반과 구별한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 360,
              "y": 390,
              "label": "TAVI"
            }
          ]
        }
      ]
    },
    "intervention51-j21033-0": {
      "label": "초음파",
      "title": "LV–대동맥 사이의 좁은 판막",
      "summary": "",
      "src": "./J/2021/21033-1.jpg",
      "width": 517,
      "height": 517,
      "source": "21033 복원 참고 영상 · 51강 p.35–37 대조",
      "alt": "LV–대동맥 사이의 좁은 판막",
      "layout": "photo-first",
      "steps": [
        {
          "label": "판막 위치",
          "text": "좌심실과 대동맥 사이의 두껍고 밝은 판막을 본다. 증상과 우측 제2늑간 수축기 잡음, 이후 시술을 합치면 AS다. 현재 A는 복원 시 제시된 참고 영상이므로 실제 시험 사진과 동일하다고 단정하지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 607,
              "y": 548,
              "label": "대동맥판"
            }
          ]
        }
      ]
    },
    "intervention51-j21033-1": {
      "label": "시술",
      "title": "대동맥판의 금속 프레임",
      "summary": "",
      "src": "./J/2022/22041-2.jpg",
      "width": 807,
      "height": 752,
      "source": "21033 복원 참고 영상 · 51강 p.35–37 대조",
      "alt": "대동맥판의 금속 프레임",
      "layout": "photo-first",
      "steps": [
        {
          "label": "TAVI 프레임",
          "text": "대동맥판 위치에 격자형 원통 프레임이 남아 있다. 조직판막을 지지하는 프레임이며, 심방중격을 막는 두 원반과 구별한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 360,
              "y": 390,
              "label": "TAVI"
            }
          ]
        }
      ]
    },
    "intervention51-j20085-0": {
      "label": "영상 연결",
      "title": "초음파·흉부 X선·시술을 한 흐름으로",
      "summary": "",
      "src": "./J/2020/20085-1.jpg",
      "width": 1601,
      "height": 637,
      "source": "20085 제시 영상 · 51강 p.35–49 대조",
      "alt": "초음파·흉부 X선·시술을 한 흐름으로",
      "layout": "photo-first",
      "steps": [
        {
          "label": "판막과 시술",
          "text": "왼쪽에서 두껍고 밝은 대동맥판, 오른쪽에서 카테터 판막 시술을 연결한다. 흉부 X선 단독으로 판막 종류를 결정하지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 140,
              "y": 470,
              "label": "대동맥판"
            },
            {
              "x": 840,
              "y": 440,
              "label": "시술"
            }
          ]
        }
      ]
    },
    "intervention51-j25086-0": {
      "label": "뇌 MRI",
      "title": "뇌경색과 보행장애",
      "summary": "",
      "src": "./J/2025/25086-1.jpg",
      "width": 885,
      "height": 895,
      "source": "25086 제시 영상 · 51강 p.20–22 대조",
      "alt": "뇌경색과 보행장애",
      "layout": "photo-first",
      "steps": [
        {
          "label": "신경학적 증상",
          "text": "소뇌 부위의 확산강조 고신호를 보행장애·뇌경색과 연결한다. 뇌경색을 일으킨 색전이 어디서 어떻게 왔는지 이어서 평가한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 620,
              "y": 865,
              "label": "고신호"
            }
          ]
        }
      ]
    },
    "intervention51-j25086-1": {
      "label": "폐쇄 시술",
      "title": "색전 통과 경로 폐쇄",
      "summary": "",
      "src": "./J/2025/25086-2.jpg",
      "width": 846,
      "height": 876,
      "source": "25086 제시 영상 · 51강 p.20–22 대조",
      "alt": "색전 통과 경로 폐쇄",
      "layout": "photo-first",
      "steps": [
        {
          "label": "통로 폐쇄",
          "text": "중앙의 두 원반 모양 기구가 심방중격의 통로를 막는다. 뇌경색 후 재발 예방이라는 증례와 연결해야 PFO 진단에 도달한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 510,
              "y": 455,
              "label": "폐쇄기구"
            }
          ]
        }
      ]
    },
    "intervention51-j22042-0": {
      "label": "세 영상",
      "title": "뇌경색 → 심방중격 통로 → 기구 폐쇄",
      "summary": "",
      "src": "./J/2022/22042-1.jpg",
      "width": 1601,
      "height": 554,
      "source": "22042 제시 영상 · 51강 p.20–22 대조",
      "alt": "뇌경색 → 심방중격 통로 → 기구 폐쇄",
      "layout": "photo-first",
      "steps": [
        {
          "label": "뇌경색",
          "text": "왼쪽 MRI의 소뇌 고신호를 보행장애와 연결한다. 이것만으로 PFO를 확정하지는 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 173,
              "y": 750,
              "label": "고신호"
            }
          ]
        },
        {
          "label": "심방 통로",
          "text": "가운데 초음파의 기존 화살표 끝이 심방중격의 판막형 통로다. 강의의 PFO 증례와 대조한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 454,
              "y": 415,
              "label": "PFO"
            }
          ]
        },
        {
          "label": "재발 예방",
          "text": "오른쪽 중격 폐쇄기구는 색전이 우심방에서 좌심방으로 넘어갈 길을 막는다. 기구 모양만으로 ASD와 구별하지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 858,
              "y": 450,
              "label": "폐쇄기구"
            }
          ]
        }
      ]
    },
    "intervention51-j21036-0": {
      "label": "세 영상",
      "title": "뇌경색 → 심방중격 통로 → 기구 폐쇄",
      "summary": "",
      "src": "./J/2021/21036-1.jpg",
      "width": 1601,
      "height": 522,
      "source": "21036 제시 영상 · 51강 p.20–22 대조",
      "alt": "뇌경색 → 심방중격 통로 → 기구 폐쇄",
      "layout": "photo-first",
      "steps": [
        {
          "label": "뇌경색",
          "text": "왼쪽 MRI의 소뇌 고신호를 보행장애와 연결한다. 이것만으로 PFO를 확정하지는 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 173,
              "y": 750,
              "label": "고신호"
            }
          ]
        },
        {
          "label": "심방 통로",
          "text": "가운데 초음파의 기존 화살표 끝이 심방중격의 판막형 통로다. 강의의 PFO 증례와 대조한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 454,
              "y": 415,
              "label": "PFO"
            }
          ]
        },
        {
          "label": "재발 예방",
          "text": "오른쪽 중격 폐쇄기구는 색전이 우심방에서 좌심방으로 넘어갈 길을 막는다. 기구 모양만으로 ASD와 구별하지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 858,
              "y": 450,
              "label": "폐쇄기구"
            }
          ]
        }
      ]
    },
    "intervention51-j20086-0": {
      "label": "뇌 MRI",
      "title": "뇌경색과 보행장애",
      "summary": "",
      "src": "./J/2020/20086-1.jpg",
      "width": 442,
      "height": 454,
      "source": "20086 제시 영상 · 51강 p.20–22 대조",
      "alt": "뇌경색과 보행장애",
      "layout": "photo-first",
      "steps": [
        {
          "label": "신경학적 증상",
          "text": "소뇌 부위의 확산강조 고신호를 보행장애·뇌경색과 연결한다. 뇌경색을 일으킨 색전이 어디서 어떻게 왔는지 이어서 평가한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 620,
              "y": 865,
              "label": "고신호"
            }
          ]
        }
      ]
    },
    "intervention51-j20086-1": {
      "label": "심방중격",
      "title": "심방중격의 PFO",
      "summary": "",
      "src": "./J/2020/20086-2.jpg",
      "width": 555,
      "height": 441,
      "source": "20086 제시 영상 · 51강 p.20–22 대조",
      "alt": "심방중격의 PFO",
      "layout": "photo-first",
      "steps": [
        {
          "label": "판막형 틈",
          "text": "좌심방과 우심방 사이 기존 화살표 끝의 통로가 PFO다. 색도플러의 순간적 흐름과 우심방압 상승 때의 우→좌 색전 통과를 구분한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 342,
              "y": 425,
              "label": "PFO"
            }
          ]
        }
      ]
    },
    "intervention51-j20086-2": {
      "label": "폐쇄 시술",
      "title": "색전 통과 경로 폐쇄",
      "summary": "",
      "src": "./J/2020/20086-3.jpg",
      "width": 428,
      "height": 435,
      "source": "20086 제시 영상 · 51강 p.20–22 대조",
      "alt": "색전 통과 경로 폐쇄",
      "layout": "photo-first",
      "steps": [
        {
          "label": "통로 폐쇄",
          "text": "중앙의 두 원반 모양 기구가 심방중격의 통로를 막는다. 뇌경색 후 재발 예방이라는 증례와 연결해야 PFO 진단에 도달한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 510,
              "y": 455,
              "label": "폐쇄기구"
            }
          ]
        }
      ]
    },
    "intervention51-j23종45-0": {
      "label": "뇌 MRI",
      "title": "뇌경색과 보행장애",
      "summary": "",
      "src": "./J/2020/20086-1.jpg",
      "width": 442,
      "height": 454,
      "source": "23종45 제시 영상 · 51강 p.20–22 대조",
      "alt": "뇌경색과 보행장애",
      "layout": "photo-first",
      "steps": [
        {
          "label": "신경학적 증상",
          "text": "소뇌 부위의 확산강조 고신호를 보행장애·뇌경색과 연결한다. 뇌경색을 일으킨 색전이 어디서 어떻게 왔는지 이어서 평가한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 620,
              "y": 865,
              "label": "고신호"
            }
          ]
        }
      ]
    },
    "intervention51-j23종45-1": {
      "label": "심방중격",
      "title": "심방중격의 PFO",
      "summary": "",
      "src": "./J/2023/comprehensive-2023-45-2.jpeg",
      "width": 380,
      "height": 302,
      "source": "23종45 제시 영상 · 51강 p.20–22 대조",
      "alt": "심방중격의 PFO",
      "layout": "photo-first",
      "steps": [
        {
          "label": "판막형 틈",
          "text": "좌심방과 우심방 사이 기존 화살표 끝의 통로가 PFO다. 색도플러의 순간적 흐름과 우심방압 상승 때의 우→좌 색전 통과를 구분한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 342,
              "y": 425,
              "label": "PFO"
            }
          ]
        }
      ]
    },
    "intervention51-j23종45-2": {
      "label": "폐쇄 시술",
      "title": "색전 통과 경로 폐쇄",
      "summary": "",
      "src": "./J/2020/20086-3.jpg",
      "width": 428,
      "height": 435,
      "source": "23종45 제시 영상 · 51강 p.20–22 대조",
      "alt": "색전 통과 경로 폐쇄",
      "layout": "photo-first",
      "steps": [
        {
          "label": "통로 폐쇄",
          "text": "중앙의 두 원반 모양 기구가 심방중격의 통로를 막는다. 뇌경색 후 재발 예방이라는 증례와 연결해야 PFO 진단에 도달한다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 510,
              "y": 455,
              "label": "폐쇄기구"
            }
          ]
        }
      ]
    },
    "intervention51-as-official": {
      "label": "공통 초음파",
      "title": "직접 표시된 AVA 0.92 cm²",
      "summary": "",
      "src": "./J/2019/odap30/19106-question-1.png",
      "width": 1070,
      "height": 537,
      "source": "2019 오답30 p.17 · 105–106 공통 영상",
      "alt": "직접 표시된 AVA 0.92 cm²",
      "layout": "photo-first",
      "steps": [
        {
          "label": "측정값 읽기",
          "text": "좌측 상단에 AVA Planimetry 0.92 cm²가 직접 표시되어 있다. 판막 면적은 협착의 중증도를 판단하는 수치다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 190,
              "y": 115,
              "label": "AVA 0.92"
            }
          ]
        },
        {
          "label": "다른 정보와 연결",
          "text": "공통 제시문의 평균 압력차 50 mmHg와 함께 중증 AS를 지지한다. 실신·LVEF 40%는 치료 개입 필요성을 평가하는 별도의 축이다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 515,
              "y": 610,
              "label": "대동맥판"
            }
          ]
        }
      ]
    },
    "intervention51-video-asd-flow": {
      "label": "단락 영상",
      "title": "다른 초음파 단면에서 중격을 통과하는 흐름",
      "summary": "",
      "src": "./assets/intervention-51/video-asd-flow.jpg",
      "width": 800,
      "height": 592,
      "source": "51강 p.9 · 색도플러 원본 영상",
      "alt": "다른 초음파 단면에서 중격을 통과하는 흐름",
      "layout": "photo-first",
      "steps": [
        {
          "label": "구조와 흐름",
          "text": "다른 단면에서도 심방중격 부근을 지나는 색도플러 혈류를 찾는다. 영상의 단면이 바뀌면 방의 화면상 위치도 달라진다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": [
            {
              "x": 460,
              "y": 340,
              "label": "단락 혈류"
            }
          ]
        },
        {
          "label": "움직임으로 확인",
          "text": "아래 원본 영상을 재생하여 박동에 따른 구조와 혈류 변화를 본다. 빨강·파랑은 탐촉자 기준 방향이며 산소량이나 단락의 중증도를 색 하나로 결정하지 않는다.",
          "box": [
            0,
            0,
            1000,
            1000
          ],
          "targets": []
        }
      ],
      "video": "./assets/intervention-51/video-asd-flow.mp4",
      "videoNote": "재생·일시정지로 강의의 움직임을 확인하세요. 학습 표시는 위 정지 사진에만 적용되며, 같은 슬라이드의 다른 단면·시점이 포함될 수 있습니다."
    }
  },
  "groups": {
    "intervention51-asd-echo": {
      "title": "ASD · 위치를 먼저 읽기",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-asd-echo",
        "intervention51-video-asd-flow"
      ]
    },
    "intervention51-asd-device": {
      "title": "ASD · 기구와 실제 시술",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-asd-occluder",
        "intervention51-asd-device-photo"
      ]
    },
    "intervention51-asd-pah": {
      "title": "폐고혈압 동반 ASD · 치료와 재평가",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-asd-pah-baseline",
        "intervention51-asd-pah-followup",
        "intervention51-asd-pah-closure"
      ]
    },
    "intervention51-pfo-anatomy": {
      "title": "PFO · 판막형 터널",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-pfo-tunnel"
      ]
    },
    "intervention51-pfo-case": {
      "title": "PFO · 뇌경색에서 폐쇄까지",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-pfo-mri",
        "intervention51-pfo-echo",
        "intervention51-pfo-device"
      ]
    },
    "intervention51-vsd": {
      "title": "VSD · 결손 위치",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-vsd-sites"
      ]
    },
    "intervention51-tavr-ct": {
      "title": "TAVI 전 CT · 모양과 크기",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-tavr-ct-calcium",
        "intervention51-tavr-ct-raphe",
        "intervention51-tavr-ct-annulus"
      ]
    },
    "intervention51-tavr-procedure": {
      "title": "TAVI · 통과 → 전확장 → 판막 전개",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-tavr-wire",
        "intervention51-tavr-balloon",
        "intervention51-tavr-deploy",
        "intervention51-tavr-final"
      ]
    },
    "intervention51-tavr-followup": {
      "title": "TAVI · 시술 후 영상",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-tavr-post-long",
        "intervention51-tavr-post-short",
        "intervention51-tavr-other-bav"
      ]
    },
    "intervention51-ms": {
      "title": "MS · 좁은 입구를 벌리기",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-ms-anatomy",
        "intervention51-ms-balloon",
        "intervention51-ms-echo"
      ]
    },
    "intervention51-mr": {
      "title": "MR · 새는 첨판을 붙이기",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-mr-clip-diagram"
      ]
    },
    "intervention51-mr-procedure": {
      "title": "MitraClip · 위치와 기능",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-mr-clip-position",
        "intervention51-mr-clip-release",
        "intervention51-mr-clip-echo"
      ]
    },
    "intervention51-j25085": {
      "title": "사진 해석 · AS와 TAVI",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-j25085-0",
        "intervention51-j25085-1"
      ]
    },
    "intervention51-j23069": {
      "title": "사진 해석 · AS와 TAVI",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-j23069-0",
        "intervention51-j23069-1"
      ]
    },
    "intervention51-j22041": {
      "title": "사진 해석 · AS와 TAVI",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-j22041-0",
        "intervention51-j22041-1"
      ]
    },
    "intervention51-j21033": {
      "title": "사진 해석 · AS와 TAVI",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-j21033-0",
        "intervention51-j21033-1"
      ]
    },
    "intervention51-j20085": {
      "title": "사진 해석 · AS와 TAVI",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-j20085-0"
      ]
    },
    "intervention51-as-diagnosis": {
      "title": "AS · 초음파·석회화·TAVI 연결",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-j23069-0",
        "intervention51-j25085-0",
        "intervention51-j25085-1"
      ]
    },
    "intervention51-j25086": {
      "title": "사진 해석 · PFO와 역설색전",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-j25086-0",
        "intervention51-j25086-1"
      ]
    },
    "intervention51-j22042": {
      "title": "사진 해석 · PFO와 역설색전",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-j22042-0"
      ]
    },
    "intervention51-j21036": {
      "title": "사진 해석 · PFO와 역설색전",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-j21036-0"
      ]
    },
    "intervention51-j20086": {
      "title": "사진 해석 · PFO와 역설색전",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-j20086-0",
        "intervention51-j20086-1",
        "intervention51-j20086-2"
      ]
    },
    "intervention51-j23종45": {
      "title": "사진 해석 · PFO와 역설색전",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-j23종45-0",
        "intervention51-j23종45-1",
        "intervention51-j23종45-2"
      ]
    },
    "intervention51-as-official": {
      "title": "사진 해석 · 면적과 증상·기능",
      "caption": "버튼으로 관찰할 구조와 판단을 연결해 보세요.",
      "cases": [
        "intervention51-as-official"
      ]
    },
    "intervention51-j19105-original": {
      "title": "공통 제시문의 실제 초음파",
      "caption": "복원 참고 사진과 구별하여 오답30의 공통 영상을 확인합니다.",
      "cases": [
        "intervention51-as-official"
      ]
    }
  }
};
window.CARDIO_ECG_LEARNING ||= {cases:{},groups:{}};
Object.assign(window.CARDIO_ECG_LEARNING.cases,data.cases);
Object.assign(window.CARDIO_ECG_LEARNING.groups,data.groups);
})();
