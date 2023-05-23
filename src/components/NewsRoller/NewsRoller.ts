import { NewsRollerStore } from "../../stores/NewsRollerStore";

export class NewsRoller {
  app: HTMLElement | null;
  newsRoller: HTMLElement | null;
  containerLeft: HTMLElement | null;
  containerRight: HTMLElement | null;

  constructor() {
    this.app = document.querySelector("#app");
    this.newsRoller = this.createNewsRoller();
    this.containerLeft = document.querySelector(".headline-container-left");
    this.containerRight = document.querySelector(".headline-container-right");
    this.setEvent();

    NewsRollerStore.register(() => this.render());
    NewsRollerStore.register(() => this.leftRolling());
    NewsRollerStore.register(() => this.rightRolling());
  }

  leftRolling() {
    const state = NewsRollerStore.getState();
    if (state.leftIsRolling) {
      console.log("돌림");
    } else {
      console.log("멈춤");
    }
  }

  rightRolling() {
    const state = NewsRollerStore.getState();
    if (state.rightIsRolling) {
      console.log("돌림");
    } else {
      console.log("멈춤");
    }
  }

  setEvent() {
    // this.containerLeft?.addEventListener("transitionend", this.handleTransitionEnd);
    const headlines = document.querySelectorAll<HTMLElement>(".headline");
    headlines.forEach((headline) => {
      headline.addEventListener("mouseenter", (e: MouseEvent) => this.handleHeadlineEnter(e));
      headline.addEventListener("mouseleave", (e: MouseEvent) => this.handleHeadlineLeave(e));
    });
  }

  handleHeadlineEnter(e: MouseEvent) {
    console.log("들어옴");
    const target: HTMLElement | null = e.currentTarget as HTMLElement;
    if (target instanceof HTMLElement) {
      if (target.classList.contains("left")) {
        console.log("왼쪽임");
      } else if (target.classList.contains("right")) {
        console.log("오른쪽임");
      }
    }
  }

  handleHeadlineLeave(e: MouseEvent) {
    console.log("나감");
    console.log(e.target);
  }

  createNewsRoller() {
    const newsRoller: HTMLElement = document.createElement("div");
    newsRoller.classList.add("news-roller");
    this.app?.appendChild(newsRoller);
    newsRoller.innerHTML = this.template();

    return newsRoller;
  }

  render() {
    if (this.newsRoller !== null) {
      this.newsRoller.innerHTML = this.template();
    }
  }

  template() {
    const state = NewsRollerStore.getState();
    const dataForLeft = state.leftHeadlineData;
    const dataForRight = state.rightHeadlineData;

    console.log(dataForLeft);
    console.log(dataForRight);

    return `
      <div class="news-roller-left">
        <div class="press-name">연합뉴스</div>
        <div class="headline">
          <div class="headline-container-left">
            ${dataForLeft
              .map((data: string, index: number) => {
                let count = index + 1;

                return `<div class="headline-item left" data=${count}>${data}</div>`;
              })
              .join("")}
          </div>
        </div>
      </div>
      <div class="news-roller-right">
        <div class="press-name">연합뉴스</div>
        <div class="headline">
          <div class="headline-container-right">
            ${dataForRight
              .map((data: string, index: number) => {
                let count = index + 1;

                return `<div class="headline-item left" data=${count}>${data}</div>`;
              })
              .join("")}
          </div>
        </div>
      </div>

    `;
  }

  // startRolling() { 사용해야할 친구입니다
  //   if (this.containerLeft) {
  //     this.containerLeft.style.transition = "transform 1s";
  //   }
  //   setInterval(() => {
  //     if (this.containerLeft) {
  //       this.containerLeft.style.transform = `translateY(${-37 * this.currentIndex}px)`;
  //       this.currentIndex++;

  //       if (this.currentIndex === 5) {
  //         this.currentIndex = 0;
  //       }
  //     }
  //   }, 1500);
  // }
  // handleTransitionEnd() {
  //   if (this.containerLeft) {
  //     if (this.currentIndex === 5) {
  //       this.containerLeft.style.transition = "transform 0s";
  //     }
  //   }
  // }
}

// [속보] 쿤디, '돼지파스타 맛있어서 돼지된 것 같아...'
//[단독] 쿤디, 청년다방 오징어 튀김 중독됐다 '이 맛 못끊어...'
