export class TotalMedia {
  app: HTMLElement | null;
  tabBar: HTMLElement | null;
  grid: HTMLElement | null;
  constructor() {
    this.app = document.querySelector("#app");
    this.tabBar = this.createTabBar();
    this.grid = this.createGrid();

    this.createTotalMedia();
  }

  createTotalMedia() {
    const totalMedia = document.createElement("div");
    totalMedia.classList.add("total-media");
    if (this.tabBar !== null && this.grid !== null) {
      totalMedia.appendChild(this.tabBar);
      totalMedia.appendChild(this.grid);
    }

    this.app?.appendChild(totalMedia);
  }

  createTabBar() {
    const tabBar = document.createElement("div");
    tabBar.classList.add("total-media__tab-bar");
    tabBar.innerHTML = `
      <div class="press-tab">
        <div class="press-tab__total">전체 언론사</div>
        <div class="press-tab__my-subs">내가 구독한 언론사</div>
      </div>
      <div class="view-tab">
        <svg class="view-tab__list" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 2V16H2V2H16ZM17.1 0H0.9C0.4 0 0 0.4 0 0.9V17.1C0 17.5 0.4 18 0.9 18H17.1C17.5 18 18 17.5 18 17.1V0.9C18 0.4 17.5 0 17.1 0ZM8 4H14V6H8V4ZM8 8H14V10H8V8ZM8 12H14V14H8V12ZM4 4H6V6H4V4ZM4 8H6V10H4V8ZM4 12H6V14H4V12Z"
            fill="currentColor"
          />
        </svg>
        <svg class="view-tab__grid" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 8V0H8V8H0ZM0 18V10H8V18H0ZM10 8V0H18V8H10ZM10 18V10H18V18H10ZM2 6H6V2H2V6ZM12 6H16V2H12V6ZM12 16H16V12H12V16ZM2 16H6V12H2V16Z" fill="currentColor" />
        </svg>
      </div>`;

    return tabBar;
  }
  createGrid() {
    const grid = document.createElement("div");
    grid.classList.add("grid");
    grid.innerHTML = this.gridTemplate();

    return grid;
  }

  gridTemplate() {
    return `
    <div class="grid-view">
      <div class="grid-item">언론사이미지</div>
    </div>
    <img class="right-button" src="/public/images/right-button.svg"></img>
    `;
  }

  // render(state) {
  //   this.grid.innerHTML = ``;
  // }
}
