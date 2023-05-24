import { NewsRoller } from "./NewsRoller";
import { invoke } from "./main";
import { Headline } from "./types";

type NewsRollerContainerProps = {
  headlineLeft: Headline;
  headlineRight: Headline;
};

export class NewsRollerContainer {
  public readonly element: HTMLElement;
  private readonly left: NewsRoller;
  private readonly right: NewsRoller;
  private readonly rollingTimer: RollingTimer;
  constructor(private props: NewsRollerContainerProps) {
    const element = document.createElement("div");
    this.element = element;

    this.left = new NewsRoller("news-roller-left", {
      headline: props.headlineLeft,
    });
    element.appendChild(this.left.element);

    this.right = new NewsRoller("news-roller-right", {
      headline: props.headlineRight,
    });
    element.appendChild(this.right.element);

    this.rollingTimer = new RollingTimer();
  }
  // TODO: Wire up destructor
  destructor() {
    this.rollingTimer.destructor();
  }
  render(props: NewsRollerContainerProps) {
    this.left.render({
      headline: props.headlineLeft,
    });

    this.right.render({
      headline: props.headlineRight,
    });

    this.props = props;
  }
}

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
