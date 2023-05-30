import { div } from "./domdom/domdom";
import { Headline } from "./types";

export const NewsRoller = ({
  className,
  headline,
}: {
  className: string;
  headline: Headline;
}) =>
  div({ className }, [
    div({ className: "press-name" }, [headline.pressName]),
    div({ className: "headline" }, [
      div({ className: "headline-container-left" }, [
        div({ className: "headline-item" }, [headline.headlineText]),
      ]),
    ]),
  ]);
