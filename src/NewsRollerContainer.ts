import { NewsRoller } from "./NewsRoller";
import { div, use } from "./domdom/domdom";
import { invoke } from "./main";
import { Headline } from "./types";

export const NewsRollerContainer = ({
  headlineLeft,
  headlineRight,
}: {
  headlineLeft: Headline;
  headlineRight: Headline;
}) =>
  use(() => {
    const rollingTimer = new RollingTimer();

    return () => {
      rollingTimer.destructor();
    };
  }, []).render(
    div([
      NewsRoller({ className: "news-roller-left", headline: headlineLeft }),
      NewsRoller({ className: "news-roller-right", headline: headlineRight }),
    ])
  );

class RollingTimer {
  private readonly intervalId: number;

  constructor() {
    this.intervalId = window.setInterval(() => {
      invoke({
        type: "newsRollerTick",
      });
    }, 1000);
  }

  destructor() {
    window.clearInterval(this.intervalId);
  }
}
