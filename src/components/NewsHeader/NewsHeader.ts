export class NewsHeader {
  app: HTMLElement | null;
  date: string;
  constructor() {
    this.app = document.querySelector("#app");
    this.date = this.getCurrentDate();
    this.createNewsHeader();
    this.setEvent();
  }

  setEvent() {
    const newsStandLogo = document.querySelector(".header-left");
    newsStandLogo?.addEventListener("click", () => {
      location.reload();
    });
  }

  createNewsHeader() {
    const newsHeader: HTMLElement = document.createElement("header");
    newsHeader.classList.add("header");
    this.app?.appendChild(newsHeader);
    newsHeader.innerHTML = this.template();

    return newsHeader;
  }

  getCurrentDate() {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit", weekday: "long" };
    const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(currentDate);

    return formattedDate;
  }

  template() {
    return `
        <div class="header-left">
          <img src="/public/images/logo.svg" />
          <div class="">뉴스스탠드</div>
        </div>
        <div class="header-right">${this.date}</div>
    `;
  }
}
