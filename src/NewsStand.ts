import { NewsRollerContainer } from "./NewsRollerContainer";
import { TopHeader } from "./TopHeader";
import { div } from "./domdom/domdom";
import { Headline } from "./types";

export const NewsStand = ({
  systemDate,
  headlineLeft,
  headlineRight,
}: {
  systemDate: Date;
  headlineLeft: Headline;
  headlineRight: Headline;
}) =>
  div([
    TopHeader({
      date: systemDate,
    }),
    NewsRollerContainer({
      headlineLeft,
      headlineRight,
    }),
  ]);
