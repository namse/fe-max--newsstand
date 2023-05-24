import { NewsRollerContainer } from "./NewsRollerContainer";
import { TopHeader } from "./TopHeader";
import { Headline } from "./types";

type NewsStandProps = {
  systemDate: Date;
  headlineLeft: Headline;
  headlineRight: Headline;
};

export class NewsStand {
  public readonly element: HTMLElement = document.createElement("div");
  private readonly topHeader: TopHeader;
  private readonly newsRollerContainer: NewsRollerContainer;

  constructor(private props: NewsStandProps) {
    this.topHeader = new TopHeader({
      date: props.systemDate,
    });
    this.element.appendChild(this.topHeader.element);

    this.newsRollerContainer = new NewsRollerContainer({
      headlineLeft: props.headlineLeft,
      headlineRight: props.headlineRight,
    });
    this.element.appendChild(this.newsRollerContainer.element);
  }

  render(props: NewsStandProps) {
    this.topHeader.render({
      date: props.systemDate,
    });

    this.newsRollerContainer.render({
      headlineLeft: props.headlineLeft,
      headlineRight: props.headlineRight,
    });

    this.props = props;
  }
}
