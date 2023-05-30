import { NewsStand } from "./NewsStand";
import "./css/index.css";
import { setUp, onAction } from "./domdom/domdom";
import { Headline } from "./types";

type Action = {
  type: "newsRollerTick";
};

const root = document.getElementById("app");
if (!root) {
  throw new Error("root element not found");
}

setUp<
  {
    systemDate: Date;
    headlines: Headline[];
    leftHeadlineIndex: number;
    rightHeadlineIndex: number;
    newsRollerTick: number;
  },
  Action
>(
  root,
  {
    systemDate: new Date(),
    headlines: [
      {
        pressName: "연합뉴스",
        headlineText:
          "김성태와 공모해 대북송금, 안부수 아태협 회장 징역 3년6월",
      },
      {
        pressName: "연합뉴스",
        headlineText:
          "국가자격시험서 어이없는 사고…채점 안한 609명 답안지 파쇄",
      },
      {
        pressName: "연합뉴스",
        headlineText: "누리호, 하늘 향해 섰다…발사 하루전 준비 순조로워",
      },
      {
        pressName: "연합뉴스",
        headlineText:
          "'역사는 더디지만 진보'…노 전 대통령 서거 14주기 추도식 엄수",
      },
      {
        pressName: "연합뉴스",
        headlineText:
          "로또 1등 당첨금까지 은닉…국세청, 고액체납자 557명 집중추적",
      },
      {
        pressName: "연합뉴스",
        headlineText: '조태용 "北, 가까운 장래에 정찰위성 발사 가능성"',
      },
      {
        pressName: "연합뉴스",
        headlineText:
          "외교부, '중국서 네이버 접속 차단' 보도에 \"유관기관과 확인중\"",
      },
      {
        pressName: "연합뉴스",
        headlineText: "'다이어트약 오픈런' 의원들 점검했더니 '마약류 과다처방'",
      },
      {
        pressName: "연합뉴스",
        headlineText: '검 "KH 배상윤, 동남아 카지노서 수백억 쓰며 황제도피"',
      },
      {
        pressName: "연합뉴스",
        headlineText:
          "부동산 중개수수료 할인 막았나…공정위, 중개사협회 조사 착수",
      },
    ],
    leftHeadlineIndex: 0,
    rightHeadlineIndex: 1,
    newsRollerTick: 0,
  },
  (state) =>
    NewsStand({
      systemDate: state.systemDate,
      headlineLeft: state.headlines[state.leftHeadlineIndex]!,
      headlineRight: state.headlines[state.rightHeadlineIndex]!,
    }),
  (state, action: Action) => {
    switch (action.type) {
      case "newsRollerTick":
        {
          state.newsRollerTick += 1;

          if (state.newsRollerTick % 5 === 0) {
            state.leftHeadlineIndex += 2;
            state.leftHeadlineIndex %= state.headlines.length;
          } else if (state.newsRollerTick % 5 === 1) {
            state.rightHeadlineIndex += 2;
            state.rightHeadlineIndex %= state.headlines.length;
          }
        }
        break;
    }
  }
);

export function invoke(action: Action) {
  onAction(action);
}
