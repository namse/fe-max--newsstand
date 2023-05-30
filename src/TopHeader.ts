import { div, header, img } from "./domdom/domdom";

export const TopHeader = ({ date }: { date: Date }) =>
  header({}, [
    div({ className: "header-left" }, [
      img({ src: "/public/images/logo.svg" }),
      div({}, ["뉴스스탠드"]),
    ]),
    div({ className: "header-right" }, [getTimeString(date)]),
  ]);

function getTimeString(date: Date): string {
  // 2023. 02. 10. 금요일
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = date.getDay();

  const dayOfWeekString = ["일", "월", "화", "수", "목", "금", "토"][dayOfWeek];

  return `${year}. ${month}. ${day}. ${dayOfWeekString}요일`;
}
