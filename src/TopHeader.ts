type TopHeaderProps = {
  date: Date;
};

export class TopHeader {
  public readonly element: HTMLElement;
  private readonly headerRight: HTMLDivElement;
  constructor(private props: TopHeaderProps) {
    const element = document.createElement("header");
    this.element = element;

    {
      const headerLeft = document.createElement("div");
      headerLeft.classList.add("header-left");

      {
        const logo = document.createElement("img");
        logo.src = "/public/images/logo.svg";
        headerLeft.appendChild(logo);
      }
      {
        const title = document.createElement("div");
        title.innerText = "뉴스스탠드";
        headerLeft.appendChild(title);
      }

      element.appendChild(headerLeft);
    }

    {
      const headerRight = document.createElement("div");
      this.headerRight = headerRight;
      headerRight.classList.add("header-right");
      headerRight.innerText = this.getTimeString(props.date);

      element.appendChild(headerRight);
    }
  }
  getTimeString(date: Date): string {
    // 2023. 02. 10. 금요일
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = date.getDay();

    const dayOfWeekString = ["일", "월", "화", "수", "목", "금", "토"][
      dayOfWeek
    ];

    return `${year}. ${month}. ${day}. ${dayOfWeekString}요일`;
  }
  render(props: TopHeaderProps) {
    if (this.props.date !== props.date) {
      this.headerRight.innerText = this.getTimeString(props.date);
    }

    this.props = props;
  }
}

function test() {
  const topHeader = new TopHeader({
    date: new Date(1999, 4, 25),
  });

  console.log(
    topHeader.element.outerHTML ===
      `<div class="header-left">
  <img src="/public/images/logo.svg" />
  <div class="">뉴스스탠드</div>
</div>
<div class="header-right">1999. 4. 25. 금요일</div>`
  );

  topHeader.getTimeString(new Date(1999, 4, 25)) === "1999. 4. 25. 금요일";
}
