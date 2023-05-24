import { Headline } from "./types";

type NewsRollerProps = {
  headline: Headline;
};

export class NewsRoller {
  public readonly element: HTMLElement;
  private readonly pressName: HTMLDivElement;
  private readonly headlineItem: HTMLDivElement;

  constructor(className: string, private props: NewsRollerProps) {
    const element = document.createElement("div");
    this.element = element;
    element.classList.add(className);

    {
      /// HTML(or jsx) Version:
      // <div class="press-name">{props.headline.pressName}</div>
      const pressName = document.createElement("div");
      this.pressName = pressName;
      pressName.classList.add("press-name");
      pressName.innerText = props.headline.pressName;

      element.appendChild(pressName);
    }
    {
      const headline = document.createElement("div");
      headline.classList.add("headline");
      {
        const headlineContainerLeft = document.createElement("div");
        headlineContainerLeft.classList.add("headline-container-left");

        {
          const headlineItem = document.createElement("div");
          this.headlineItem = headlineItem;
          headlineItem.classList.add("headline-item");
          headlineItem.textContent = props.headline.headlineText;

          headlineContainerLeft.appendChild(headlineItem);
        }

        headline.appendChild(headlineContainerLeft);
      }

      element.appendChild(headline);
    }
  }
  render(props: NewsRollerProps) {
    /// 기계적인 props 비교
    if (props.headline.pressName !== this.props.headline.pressName) {
      this.pressName.innerText = props.headline.pressName; // 기계적인 props 삽입
    }

    if (props.headline.headlineText !== this.props.headline.headlineText) {
      this.headlineItem.textContent = props.headline.headlineText;
    }

    this.props = props;
  }
}
