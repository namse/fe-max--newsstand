export class NewsRoller {
  app: HTMLElement | null;
  constructor() {
    this.app = document.querySelector("#app");

    this.createNewsRoller();
  }

  createNewsRoller() {
    const newsRoller: HTMLElement = document.createElement("div");
    newsRoller.classList.add("news-roller");
    this.app?.appendChild(newsRoller);
    newsRoller.innerHTML = this.template();

    return newsRoller;
  }

  template() {
    return `
        
      <div class="news-roller-left">
        <div class="press-name">연합뉴스</div>
        <div class="headline">[속보] 쿤디, '돼지파스타 맛있어서 돼지된 것 같아...'</div>
      </div>
      <div class="news-roller-right">
        <div class="press-name">연합뉴스</div>
        <div class="headline">[단독] 쿤디, 청년다방 오징어 튀김 중독됐다 '이 맛 못끊어...'</div>
      </div>
    
    `;
  }
}
