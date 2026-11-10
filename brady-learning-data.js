/* Lecture 21 source photographs with separate study overlays. */
(function(){
const data={
  "cases": {
    "brady-02": {
      "label": "A–H–V",
      "title": "심장 안에서 재는 전도시간",
      "summary": "표면 ECG와 심장 내 신호를 함께 기록한다. A·H·V의 순서와 원본에 적힌 PA·AH·HV를 연결해 보자.",
      "src": "assets/ecg/lecture21/brady-02.webp",
      "width": 848,
      "height": 1023,
      "source": "21강 강의록 p.2",
      "alt": "심장 안에서 재는 전도시간 · 강의록 원본 사진",
      "steps": [
        {
          "label": "A → H → V",
          "box": [
            520,
            630,
            450,
            365
          ],
          "text": "아래쪽 His 기록에서 심방 A, His속 H, 심실 V가 차례로 나온다. PA 30 ms, AH 96 ms, HV 50 ms가 표시되어 있다.",
          "targets": []
        },
        {
          "label": "동성 주기",
          "box": [
            0,
            70,
            980,
            300
          ],
          "text": "연속된 동성 박동 사이의 SCL은 691 ms로 표시되어 있다. 주기 길이와 그 안의 전도시간을 나누어 읽는다.",
          "targets": []
        }
      ]
    },
    "brady-04": {
      "label": "PR 연장",
      "title": "Wenckebach · 길어지다가 한 번 빠진다",
      "summary": "원본의 빨간 화살표는 각 PR 간격을 가리킨다. 같은 기록의 V1·II·V5를 비교한다.",
      "src": "assets/ecg/lecture21/brady-04.webp",
      "width": 1728,
      "height": 860,
      "source": "21강 강의록 p.4",
      "alt": "Wenckebach · 길어지다가 한 번 빠진다 · 강의록 원본 사진",
      "steps": [
        {
          "label": "600 → 636 → 672",
          "box": [
            0,
            0,
            370,
            270
          ],
          "text": "V1의 PR이 600 → 636 → 672 ms로 늘어난다. 위쪽 P 시작부터 해당 QRS 시작까지의 길이를 비교하자.",
          "targets": []
        },
        {
          "label": "QRS가 빠진 공백",
          "box": [
            265,
            360,
            230,
            180
          ],
          "text": "II에서 긴 RR 공백을 확인한다. 동성 신호는 계속되며, 한 P가 QRS로 전도되지 않은 뒤 다음 주기가 시작한다.",
          "targets": []
        },
        {
          "label": "다시 시작",
          "box": [
            405,
            0,
            220,
            260
          ],
          "text": "탈락 후 PR이 다시 600 ms에서 시작한다. 길어짐 → 탈락 → 재시작을 한 주기로 읽는다.",
          "targets": []
        }
      ]
    },
    "brady-05": {
      "label": "다음 날 2:1",
      "title": "같은 AH block 환자의 2:1 전도",
      "summary": "연속된 아래 II 리듬띠에서 P를 먼저 찾고, P 두 개마다 QRS 하나가 내려오는지 확인한다.",
      "src": "assets/ecg/lecture21/brady-05.webp",
      "width": 1728,
      "height": 936,
      "source": "21강 강의록 p.5",
      "alt": "같은 AH block 환자의 2:1 전도 · 강의록 원본 사진",
      "steps": [
        {
          "label": "P 둘에 QRS 하나",
          "box": [
            170,
            790,
            310,
            160
          ],
          "text": "전도되는 P와 중간에 전도되지 않는 P를 짝지어 센다. T파는 앞 QRS의 재분극이므로 P와 구분한다.",
          "targets": [
            {
              "x": 197,
              "y": 871,
              "label": "P"
            },
            {
              "x": 298,
              "y": 879,
              "label": "P"
            },
            {
              "x": 399,
              "y": 864,
              "label": "P"
            }
          ]
        },
        {
          "label": "유도 II 비교",
          "box": [
            55,
            280,
            220,
            150
          ],
          "text": "위쪽 II에서도 중간 P와 다음 전도된 박동을 확인할 수 있다. 여러 유도에서 같은 시점의 파형을 대조하자.",
          "targets": []
        }
      ]
    },
    "brady-06": {
      "label": "No His",
      "title": "AH block · A 다음 H가 사라진다",
      "summary": "위는 Wenckebach, 아래는 2:1의 심장 내 기록이다. 원본의 A·H·V 표시를 따라가자.",
      "src": "assets/ecg/lecture21/brady-06.webp",
      "width": 1632,
      "height": 1090,
      "source": "21강 강의록 p.6",
      "alt": "AH block · A 다음 H가 사라진다 · 강의록 원본 사진",
      "steps": [
        {
          "label": "AH가 길어진다",
          "box": [
            115,
            175,
            385,
            190
          ],
          "text": "위쪽 His 기록의 AH가 300 → 533 ms로 늘어난다. A 다음 H, 이어 V까지 내려가는 순서를 보자.",
          "targets": []
        },
        {
          "label": "A 뒤 No His",
          "box": [
            490,
            215,
            250,
            150
          ],
          "text": "다음 A는 있지만 H와 V가 이어지지 않는다. 이 경우 차단은 A–H 구간에 있다.",
          "targets": [
            {
              "x": 521,
              "y": 310,
              "label": "A"
            }
          ]
        },
        {
          "label": "2:1에서도 No His",
          "box": [
            280,
            650,
            410,
            160
          ],
          "text": "아래쪽에는 A–H–V로 전도되는 박동과 A 뒤 H가 나오지 않는 박동이 번갈아 보인다.",
          "targets": []
        }
      ]
    },
    "brady-07": {
      "label": "DDD 후",
      "title": "AH block 사례 · 조율 후 ECG",
      "summary": "심실 자극과 뒤따르는 QRS를 확인한다. 삽입 전의 탈락 패턴과 삽입 후 심실 박동을 연결해 보자.",
      "src": "assets/ecg/lecture21/brady-07.webp",
      "width": 1728,
      "height": 1042,
      "source": "21강 강의록 p.7",
      "alt": "AH block 사례 · 조율 후 ECG · 강의록 원본 사진",
      "steps": [
        {
          "label": "아래 II 리듬띠",
          "box": [
            35,
            780,
            600,
            200
          ],
          "text": "규칙적으로 이어지는 심실 박동과 자극 흔적을 본다. 심실 조율에 따른 QRS 형태 변화도 함께 확인한다.",
          "targets": []
        }
      ]
    },
    "brady-08": {
      "label": "2:1 ECG",
      "title": "HV block 사례 · P 둘에 QRS 하나",
      "summary": "표면 ECG에서는 2:1 배열을 먼저 읽는다. 차단 위치는 다음 심장 내 기록과 연결한다.",
      "src": "assets/ecg/lecture21/brady-08.webp",
      "width": 1728,
      "height": 994,
      "source": "21강 강의록 p.8",
      "alt": "HV block 사례 · P 둘에 QRS 하나 · 강의록 원본 사진",
      "steps": [
        {
          "label": "연속 II에서 P 세기",
          "box": [
            120,
            790,
            370,
            165
          ],
          "text": "QRS 바로 앞 P와 그 사이의 작은 P를 찾는다. T파 뒤 기저선의 작은 융기가 다음 심방 신호다.",
          "targets": [
            {
              "x": 148,
              "y": 886,
              "label": "P"
            },
            {
              "x": 236,
              "y": 889,
              "label": "P"
            },
            {
              "x": 321,
              "y": 886,
              "label": "P"
            }
          ]
        }
      ]
    },
    "brady-09": {
      "label": "모니터 3:1",
      "title": "HV block 사례 · 전도 비율이 더 떨어진다",
      "summary": "이 모니터 기록에서는 P가 이어지는 동안 QRS가 더 드물게 나온다.",
      "src": "assets/ecg/lecture21/brady-09.webp",
      "width": 1693,
      "height": 281,
      "source": "21강 강의록 p.9",
      "alt": "HV block 사례 · 전도 비율이 더 떨어진다 · 강의록 원본 사진",
      "steps": [
        {
          "label": "긴 RR 속 P",
          "box": [
            120,
            150,
            300,
            650
          ],
          "text": "한 QRS에서 다음 QRS까지 P를 일정한 간격으로 짚는다. 이 기록은 3:1 전도이며, P가 T와 겹치는 부분도 있다.",
          "targets": []
        },
        {
          "label": "다음 주기 비교",
          "box": [
            340,
            150,
            300,
            650
          ],
          "text": "같은 P–QRS 배열이 다음 주기에서도 반복되는지 확인한다. QRS 개수만 보고 동성서맥으로 분류하지 않는다.",
          "targets": []
        }
      ]
    },
    "brady-10": {
      "label": "No V",
      "title": "HV block · H까지 왔지만 V가 없다",
      "summary": "His 기록에서 A와 H가 남아 있는지가 AH block과의 차이다.",
      "src": "assets/ecg/lecture21/brady-10.webp",
      "width": 1599,
      "height": 418,
      "source": "21강 강의록 p.10",
      "alt": "HV block · H까지 왔지만 V가 없다 · 강의록 원본 사진",
      "steps": [
        {
          "label": "전도된 A–H–V",
          "box": [
            140,
            270,
            200,
            660
          ],
          "text": "첫 박동은 A → H → V가 이어지고 RV 기록에도 심실 신호가 나타난다.",
          "targets": []
        },
        {
          "label": "H 뒤 No V",
          "box": [
            470,
            270,
            270,
            660
          ],
          "text": "중간 박동에는 A와 H가 있지만 V가 없다. 아래 RV에도 대응하는 심실 신호가 빠져 있다.",
          "targets": []
        },
        {
          "label": "다시 A–H–V",
          "box": [
            770,
            270,
            195,
            660
          ],
          "text": "다음 박동은 다시 심실까지 전도된다. 일부 전도가 남는 2:1 차단의 심장 내 모습이다.",
          "targets": []
        }
      ]
    },
    "brady-11": {
      "label": "DDD 후",
      "title": "HV block 사례 · 조율 후 ECG",
      "summary": "차단되던 심실 활성화를 박동기가 받쳐 준다.",
      "src": "assets/ecg/lecture21/brady-11.webp",
      "width": 1728,
      "height": 951,
      "source": "21강 강의록 p.11",
      "alt": "HV block 사례 · 조율 후 ECG · 강의록 원본 사진",
      "steps": [
        {
          "label": "심실 조율",
          "box": [
            10,
            760,
            590,
            220
          ],
          "text": "아래 II에서 반복되는 자극과 QRS를 본다. 원래의 간헐적 전도 탈락과 비교하자.",
          "targets": []
        }
      ]
    },
    "brady-12": {
      "label": "완전 차단",
      "title": "P와 QRS가 각자의 속도로 간다",
      "summary": "한 줄로 이어지는 아래 II 리듬띠에서 P와 QRS를 따로 따라가자.",
      "src": "assets/ecg/lecture21/brady-12.webp",
      "width": 1597,
      "height": 742,
      "source": "21강 강의록 p.12",
      "alt": "P와 QRS가 각자의 속도로 간다 · 강의록 원본 사진",
      "steps": [
        {
          "label": "P는 계속된다",
          "box": [
            0,
            750,
            540,
            240
          ],
          "text": "작은 P를 일정한 간격으로 따라가면 QRS와 T에 겹친 위치까지 예상할 수 있다. QRS가 없는 부분에서도 P가 계속된다.",
          "targets": [
            {
              "x": 150,
              "y": 901,
              "label": "P"
            },
            {
              "x": 284,
              "y": 900,
              "label": "P"
            }
          ]
        },
        {
          "label": "PR 관계가 바뀐다",
          "box": [
            485,
            750,
            500,
            240
          ],
          "text": "느린 QRS와 앞 P 사이 거리가 박동마다 달라진다. 심방과 심실의 독립적인 진행이 핵심이다.",
          "targets": []
        }
      ]
    },
    "brady-13": {
      "label": "서맥 → TdP",
      "title": "느린 리듬 뒤 발생한 다형성 심실빈맥",
      "summary": "각 패널의 위쪽 ECG를 따라간다. 위 패널에서 아래 패널로 기록이 이어진다.",
      "src": "assets/ecg/lecture21/brady-13.webp",
      "width": 1728,
      "height": 699,
      "source": "21강 강의록 p.13",
      "alt": "느린 리듬 뒤 발생한 다형성 심실빈맥 · 강의록 원본 사진",
      "steps": [
        {
          "label": "발생 직전",
          "box": [
            0,
            0,
            430,
            205
          ],
          "text": "위 패널 왼쪽의 느린 박동과 긴 재분극 구간을 본다. 이후 빠른 다형성 파형으로 바뀐다.",
          "targets": []
        },
        {
          "label": "다형성 빈맥",
          "box": [
            420,
            0,
            570,
            215
          ],
          "text": "QRS의 크기와 방향이 계속 변하는 빠른 심실성 파형이 이어진다.",
          "targets": []
        },
        {
          "label": "빈맥 종료",
          "box": [
            0,
            600,
            990,
            210
          ],
          "text": "아래 패널의 ECG에서 발작이 종료되는 장면을 찾는다. 자연 종료 후에도 서맥과 QT 연장에 따른 재발 위험을 평가한다.",
          "targets": []
        }
      ]
    },
    "brady-14": {
      "label": "동성서맥",
      "title": "동기능부전 사례 · 느린 동성리듬",
      "summary": "무기력·어지럼이 있던 환자의 기록이다. 동성 P와 QRS의 순서는 유지되지만 박동 간격이 길다.",
      "src": "assets/ecg/lecture21/brady-14.webp",
      "width": 1728,
      "height": 965,
      "source": "21강 강의록 p.14",
      "alt": "동기능부전 사례 · 느린 동성리듬 · 강의록 원본 사진",
      "steps": [
        {
          "label": "느린 II 리듬띠",
          "box": [
            30,
            790,
            620,
            190
          ],
          "text": "긴 RR 간격과 동성 박동의 순서를 본다. 한 장의 느린 ECG와 다음 모니터의 긴 pause를 함께 연결한다.",
          "targets": []
        }
      ]
    },
    "brady-15": {
      "label": "Sinus pause",
      "title": "긴 공백에 P와 QRS가 함께 사라진다",
      "summary": "위 II와 아래 V2는 같은 시간대의 기록이다. 두 유도에서 공백이 함께 나타난다.",
      "src": "assets/ecg/lecture21/brady-15.webp",
      "width": 1657,
      "height": 476,
      "source": "21강 강의록 p.15",
      "alt": "긴 공백에 P와 QRS가 함께 사라진다 · 강의록 원본 사진",
      "steps": [
        {
          "label": "공백 전 박동",
          "box": [
            15,
            50,
            250,
            860
          ],
          "text": "초반 박동들이 나온 뒤 긴 공백이 시작된다. 마지막 QRS와 다음 박동 사이를 확인하자.",
          "targets": []
        },
        {
          "label": "P도 없는 공백",
          "box": [
            250,
            180,
            470,
            710
          ],
          "text": "공백 안에 규칙적으로 진행하는 P가 보이지 않는다. P가 계속되는 AV block의 공백과 비교하자.",
          "targets": []
        },
        {
          "label": "박동 재개",
          "box": [
            730,
            50,
            260,
            860
          ],
          "text": "공백 뒤 박동이 다시 나타난다. 증상이 이 공백과 같은 시점에 있었는지 확인하는 것이 치료 판단에 중요하다.",
          "targets": []
        }
      ]
    },
    "brady-16": {
      "label": "빈맥–서맥",
      "title": "AF가 끝난 직후 생기는 pause",
      "summary": "아래쪽 긴 II 리듬띠가 시간의 흐름을 보여준다. 위 12유도의 가로 배치를 하나의 연속 유도로 이어 읽지 않는다.",
      "src": "assets/ecg/lecture21/brady-16.webp",
      "width": 1460,
      "height": 977,
      "source": "21강 강의록 p.16",
      "alt": "AF가 끝난 직후 생기는 pause · 강의록 원본 사진",
      "steps": [
        {
          "label": "빠른 리듬",
          "box": [
            10,
            755,
            450,
            205
          ],
          "text": "아래 II 앞부분에 빠른 불규칙 QRS가 이어진다. 뚜렷한 동성 P의 반복이 보이지 않는 AF 구간이다.",
          "targets": []
        },
        {
          "label": "종료 → pause",
          "box": [
            420,
            755,
            565,
            205
          ],
          "text": "빠른 리듬이 끝나고 긴 공백이 나타난다. 동방결절 회복이 늦어지는 빈맥–서맥증후군의 핵심 장면이다.",
          "targets": []
        }
      ]
    },
    "brady-18": {
      "label": "본체와 lead",
      "title": "발생기와 전극선",
      "summary": "본체 안에는 배터리와 전자회로가 있고, lead가 심장까지 연결된다.",
      "src": "assets/ecg/lecture21/brady-18.webp",
      "width": 776,
      "height": 839,
      "source": "21강 강의록 p.18",
      "alt": "발생기와 전극선 · 강의록 원본 사진",
      "steps": [
        {
          "label": "Pulse generator",
          "box": [
            80,
            100,
            720,
            460
          ],
          "text": "금속 본체는 자극 발생기다. 배터리와 회로를 보호하는 용기 역할도 한다.",
          "targets": []
        },
        {
          "label": "Lead",
          "box": [
            180,
            420,
            800,
            450
          ],
          "text": "절연된 전극선이 본체와 심장을 연결하여 감지와 자극을 담당한다.",
          "targets": []
        }
      ]
    },
    "brady-21": {
      "label": "활동과 심박수",
      "title": "R · 활동 요구에 맞춰 조율 속도를 올린다",
      "summary": "원본 그래프의 정상 심박수, rate-responsive pacing, fixed-rate pacing을 비교한다.",
      "src": "assets/ecg/lecture21/brady-21.webp",
      "width": 1278,
      "height": 514,
      "source": "21강 강의록 p.21",
      "alt": "R · 활동 요구에 맞춰 조율 속도를 올린다 · 강의록 원본 사진",
      "steps": [
        {
          "label": "걷기 → 달리기",
          "box": [
            380,
            40,
            410,
            770
          ],
          "text": "활동이 커지면 정상 심박수와 반응형 조율 속도가 올라간다. 수평인 고정 속도와 차이가 커진다.",
          "targets": []
        },
        {
          "label": "휴식으로 복귀",
          "box": [
            735,
            320,
            250,
            560
          ],
          "text": "활동이 줄면 필요한 심박수도 낮아진다. R은 활동 요구에 따른 속도 조절 기능이다.",
          "targets": []
        }
      ]
    },
    "brady-34": {
      "label": "DDD X선",
      "title": "심방과 심실에 각각 lead",
      "summary": "왼쪽 정면과 오른쪽 측면에서 두 전극선의 끝을 따라가자.",
      "src": "assets/ecg/lecture21/brady-34.webp",
      "width": 1728,
      "height": 901,
      "source": "21강 강의록 p.34",
      "alt": "심방과 심실에 각각 lead · 강의록 원본 사진",
      "steps": [
        {
          "label": "정면",
          "box": [
            110,
            240,
            330,
            740
          ],
          "text": "한 lead는 우심방 쪽에서 휘고, 다른 lead는 우심실 쪽으로 길게 내려간다.",
          "targets": []
        },
        {
          "label": "측면",
          "box": [
            510,
            330,
            390,
            650
          ],
          "text": "측면에서는 앞쪽으로 향하는 심실 lead와 심방 lead의 방향을 함께 확인한다.",
          "targets": []
        }
      ]
    },
    "brady-35": {
      "label": "DDD 12유도",
      "title": "DDD 조율 후의 전체 ECG",
      "summary": "아래 리듬띠에서 반복되는 조율 흔적을 먼저 찾고 각 유도의 QRS 형태를 본다.",
      "src": "assets/ecg/lecture21/brady-35.webp",
      "width": 1728,
      "height": 995,
      "source": "21강 강의록 p.35",
      "alt": "DDD 조율 후의 전체 ECG · 강의록 원본 사진",
      "steps": [
        {
          "label": "아래 II",
          "box": [
            10,
            750,
            650,
            245
          ],
          "text": "박동기 자극과 이어지는 P·QRS의 타이밍을 살핀다. 네 가지 감지·조율 조합은 다음 비교 사진에서 확인한다.",
          "targets": []
        }
      ]
    },
    "brady-36": {
      "label": "DDD 네 조합",
      "title": "AsVs · ApVs · AsVp · ApVp",
      "summary": "s는 감지한 고유 박동, p는 박동기가 만든 조율이다. 위에서 아래로 네 조합을 비교한다.",
      "src": "assets/ecg/lecture21/brady-36.webp",
      "width": 1728,
      "height": 1124,
      "source": "21강 강의록 p.36",
      "alt": "AsVs · ApVs · AsVp · ApVp · 강의록 원본 사진",
      "steps": [
        {
          "label": "AsVs",
          "box": [
            0,
            0,
            590,
            180
          ],
          "text": "심방과 심실 모두 고유 박동이다. P–QRS가 스스로 나오므로 이 박동에는 조율 spike가 필요하지 않다.",
          "targets": []
        },
        {
          "label": "ApVs",
          "box": [
            0,
            260,
            590,
            170
          ],
          "text": "심방 spike 뒤 P가 나오고, 보존된 AV 전도를 거쳐 고유 QRS가 이어진다.",
          "targets": []
        },
        {
          "label": "AsVp",
          "box": [
            0,
            520,
            590,
            175
          ],
          "text": "고유 P를 감지한 뒤 심실을 조율한다. 심실 spike 뒤 조율된 QRS가 나온다.",
          "targets": []
        },
        {
          "label": "ApVp",
          "box": [
            0,
            795,
            590,
            190
          ],
          "text": "심방과 심실을 모두 조율한다. 심방 자극 → P → AV 간격 → 심실 자극 → QRS 순서다.",
          "targets": []
        }
      ]
    },
    "brady-38": {
      "label": "VDD X선",
      "title": "심방을 감지하고 심실을 조율하는 lead",
      "summary": "한 전극선의 심방 감지 부분과 심실 끝을 함께 보자.",
      "src": "assets/ecg/lecture21/brady-38.webp",
      "width": 1728,
      "height": 843,
      "source": "21강 강의록 p.38",
      "alt": "심방을 감지하고 심실을 조율하는 lead · 강의록 원본 사진",
      "steps": [
        {
          "label": "정면 lead",
          "box": [
            100,
            180,
            340,
            790
          ],
          "text": "전극선이 심방을 지나 심실로 내려간다. 이 예시의 모드는 VDD다.",
          "targets": []
        },
        {
          "label": "측면 lead",
          "box": [
            550,
            280,
            370,
            690
          ],
          "text": "심실 쪽 전극 끝의 위치를 측면에서 확인한다. 모드는 lead 수뿐 아니라 기능 정보와 함께 판독한다.",
          "targets": []
        }
      ]
    },
    "brady-39": {
      "label": "VDD ECG",
      "title": "P를 감지하여 심실 조율로 연결",
      "summary": "VDD는 심방을 자극하지 않고, 고유 P를 감지하여 심실을 조율한다.",
      "src": "assets/ecg/lecture21/brady-39.webp",
      "width": 1728,
      "height": 985,
      "source": "21강 강의록 p.39",
      "alt": "P를 감지하여 심실 조율로 연결 · 강의록 원본 사진",
      "steps": [
        {
          "label": "P → 심실 자극",
          "box": [
            0,
            760,
            610,
            235
          ],
          "text": "아래 II에서 작은 고유 P, 뒤따르는 심실 자극과 QRS를 순서대로 찾는다.",
          "targets": []
        },
        {
          "label": "다른 유도에서 확인",
          "box": [
            0,
            250,
            500,
            230
          ],
          "text": "자극 흔적은 유도에 따라 선명도가 다르다. II·aVL의 QRS 앞 타이밍도 함께 보자.",
          "targets": []
        }
      ]
    },
    "brady-40": {
      "label": "VVI 전 pause",
      "title": "심실 박동의 긴 공백",
      "summary": "아래 패널에 원본의 Pause: 5.62 sec 표시가 있다.",
      "src": "assets/ecg/lecture21/brady-40.webp",
      "width": 1151,
      "height": 1184,
      "source": "21강 강의록 p.40",
      "alt": "심실 박동의 긴 공백 · 강의록 원본 사진",
      "steps": [
        {
          "label": "5.62초 공백",
          "box": [
            70,
            540,
            900,
            435
          ],
          "text": "위와 아래 패널에서 심실 박동이 얼마나 자주 나오는지 비교한다. 공백의 길이와 환자의 증상을 함께 평가한다.",
          "targets": []
        }
      ]
    },
    "brady-41": {
      "label": "VVI X선",
      "title": "우심실로 향하는 하나의 lead",
      "summary": "이 사례는 심실을 감지하고 조율하는 VVI다.",
      "src": "assets/ecg/lecture21/brady-41.webp",
      "width": 1728,
      "height": 977,
      "source": "21강 강의록 p.41",
      "alt": "우심실로 향하는 하나의 lead · 강의록 원본 사진",
      "steps": [
        {
          "label": "정면",
          "box": [
            140,
            130,
            350,
            855
          ],
          "text": "하나의 lead가 우심실 쪽으로 내려간다.",
          "targets": []
        },
        {
          "label": "측면",
          "box": [
            540,
            240,
            370,
            740
          ],
          "text": "측면에서 앞쪽·아래쪽으로 향하는 심실 lead 끝을 본다.",
          "targets": []
        }
      ]
    },
    "brady-42": {
      "label": "VVI ECG",
      "title": "고유 심실 박동이면 기다린다",
      "summary": "원본의 Vs·Vs·Vp 표기를 따라가자.",
      "src": "assets/ecg/lecture21/brady-42.webp",
      "width": 1704,
      "height": 344,
      "source": "21강 강의록 p.42",
      "alt": "고유 심실 박동이면 기다린다 · 강의록 원본 사진",
      "steps": [
        {
          "label": "Vs · Vs",
          "box": [
            15,
            0,
            210,
            750
          ],
          "text": "앞의 두 박동은 감지된 고유 심실 박동이다. VVI는 이런 박동을 감지하면 예정된 자극을 억제한다.",
          "targets": []
        },
        {
          "label": "Vp",
          "box": [
            220,
            0,
            150,
            750
          ],
          "text": "다음에는 심실 자극과 조율된 QRS가 보인다. P를 추적하는 기능 없이 심실 박동을 기준으로 작동한다.",
          "targets": []
        }
      ]
    },
    "brady-43": {
      "label": "AAI 전 pause",
      "title": "동기능부전 사례의 삽입 전 기록",
      "summary": "위 패널에는 긴 박동 공백, 아래 패널에는 더 빠른 박동이 기록되어 있다.",
      "src": "assets/ecg/lecture21/brady-43.webp",
      "width": 1225,
      "height": 1260,
      "source": "21강 강의록 p.43",
      "alt": "동기능부전 사례의 삽입 전 기록 · 강의록 원본 사진",
      "steps": [
        {
          "label": "위 패널의 공백",
          "box": [
            10,
            5,
            970,
            460
          ],
          "text": "초반 박동 뒤 긴 공백을 확인한다. 아래의 다른 시간대 기록과 함께 동방결절의 기능 변화를 본다.",
          "targets": []
        }
      ]
    },
    "brady-44": {
      "label": "AAI X선",
      "title": "우심방 쪽에서 끝나는 lead",
      "summary": "심방만 조율하고 고유 방실전도를 이용하는 AAI의 예시다.",
      "src": "assets/ecg/lecture21/brady-44.webp",
      "width": 1728,
      "height": 937,
      "source": "21강 강의록 p.44",
      "alt": "우심방 쪽에서 끝나는 lead · 강의록 원본 사진",
      "steps": [
        {
          "label": "정면의 J자",
          "box": [
            120,
            300,
            290,
            650
          ],
          "text": "전극선 끝이 우심방 쪽에서 J자 형태로 휜다.",
          "targets": []
        },
        {
          "label": "측면",
          "box": [
            530,
            300,
            390,
            650
          ],
          "text": "심방 lead 끝의 방향을 측면에서도 확인한다.",
          "targets": []
        }
      ]
    },
    "brady-45": {
      "label": "AAI ECG",
      "title": "심방 spike → P → 고유 QRS",
      "summary": "심방을 조율한 뒤, 보존된 방실전도로 심실 박동이 이어진다.",
      "src": "assets/ecg/lecture21/brady-45.webp",
      "width": 1239,
      "height": 1237,
      "source": "21강 강의록 p.45",
      "alt": "심방 spike → P → 고유 QRS · 강의록 원본 사진",
      "steps": [
        {
          "label": "위 패널",
          "box": [
            25,
            20,
            950,
            400
          ],
          "text": "작은 심방 자극 뒤 P가 나타나고 QRS가 뒤따른다. 심실을 직접 자극하는 VVI와 spike의 위치를 비교한다.",
          "targets": []
        },
        {
          "label": "아래 패널",
          "box": [
            35,
            550,
            940,
            425
          ],
          "text": "동일한 조율 방식의 다른 기록이다. 자극 뒤 P와 QRS가 각각 이어지는지 확인한다.",
          "targets": []
        }
      ]
    },
    "brady-47": {
      "label": "주머니 감염",
      "title": "Pocket infection",
      "summary": "삽입 부위 피부의 손상과 배액구가 보이는 강의 사진이다.",
      "src": "assets/ecg/lecture21/brady-47.webp",
      "width": 767,
      "height": 879,
      "source": "21강 강의록 p.47",
      "alt": "Pocket infection · 강의록 원본 사진",
      "steps": [
        {
          "label": "피부 병변",
          "box": [
            460,
            450,
            390,
            380
          ],
          "text": "본체 위 피부의 손상과 주변 변화를 본다. 국소 소견과 함께 기기 감염 여부를 평가한다.",
          "targets": []
        }
      ]
    },
    "brady-48": {
      "label": "Lead 파절",
      "title": "전극선의 연속성을 살피자",
      "summary": "왼쪽 전체 X선과 오른쪽 쇄골 주변 확대 사진을 비교한다.",
      "src": "assets/ecg/lecture21/brady-48.webp",
      "width": 1470,
      "height": 899,
      "source": "21강 강의록 p.48",
      "alt": "전극선의 연속성을 살피자 · 강의록 원본 사진",
      "steps": [
        {
          "label": "전체 경로",
          "box": [
            240,
            20,
            330,
            850
          ],
          "text": "본체에서 나온 전극선이 쇄골 아래를 지나 심장으로 들어가는 경로를 따라간다.",
          "targets": []
        },
        {
          "label": "쇄골 아래 확대",
          "box": [
            570,
            520,
            420,
            460
          ],
          "text": "오른쪽 아래 확대에서 lead의 불연속과 꺾임을 살핀다. X선 소견은 기기 감지·조율 이상과 함께 평가한다.",
          "targets": []
        }
      ]
    }
  },
  "groups": {
    "brady-conduction": {
      "title": "A–H–V 원본 기록",
      "cases": [
        "brady-02"
      ]
    },
    "brady-ah": {
      "title": "AH block · 같은 환자의 전후 기록",
      "cases": [
        "brady-04",
        "brady-05",
        "brady-06",
        "brady-07"
      ]
    },
    "brady-hv": {
      "title": "HV block · 2:1, 3:1과 No V",
      "cases": [
        "brady-08",
        "brady-09",
        "brady-10",
        "brady-11"
      ]
    },
    "brady-complete": {
      "title": "완전 방실차단 짚어보기",
      "cases": [
        "brady-12"
      ]
    },
    "brady-sinus": {
      "title": "동성서맥과 긴 pause 비교",
      "cases": [
        "brady-14",
        "brady-15"
      ]
    },
    "brady-tachy": {
      "title": "빈맥 종료 뒤를 따라가기",
      "cases": [
        "brady-16"
      ]
    },
    "brady-tdp": {
      "title": "서맥에서 위험한 빈맥으로",
      "cases": [
        "brady-13"
      ]
    },
    "brady-device": {
      "title": "박동기의 두 구성요소",
      "cases": [
        "brady-18"
      ]
    },
    "brady-rate": {
      "title": "Rate-responsive pacing",
      "cases": [
        "brady-21"
      ]
    },
    "brady-ddd": {
      "title": "DDD ECG 비교",
      "cases": [
        "brady-36",
        "brady-35"
      ]
    },
    "brady-other-pacing": {
      "title": "VDD · VVI · AAI 비교",
      "cases": [
        "brady-39",
        "brady-42",
        "brady-45"
      ]
    },
    "brady-before-pacing": {
      "title": "삽입 전 pause 기록",
      "cases": [
        "brady-40",
        "brady-43"
      ]
    },
    "brady-xray": {
      "title": "박동기별 X선 비교",
      "cases": [
        "brady-34",
        "brady-38",
        "brady-41",
        "brady-44"
      ]
    },
    "brady-complications": {
      "title": "삽입 후 합병증 사진",
      "cases": [
        "brady-47",
        "brady-48"
      ]
    }
  }
};
Object.assign(window.CARDIO_ECG_LEARNING.cases,data.cases);
Object.assign(window.CARDIO_ECG_LEARNING.groups,data.groups);
})();
