import { AppDispatcher } from "../dispatcher/AppDispatcher";
import db from "../services/db.json";

type Action = {
  type: string;
  direction: string;
};

type State = {
  leftIsRolling: boolean;
  rightIsRolling: boolean;
  leftHeadlineData: string[];
  rightHeadlineData: string[];
  [key: string]: boolean | string[];
};

class Store {
  listeners: Array<() => void>;
  state: State;
  constructor() {
    const state: State = {
      leftIsRolling: true,
      rightIsRolling: false,
      leftHeadlineData: db.headlines.slice(0, 5),
      rightHeadlineData: db.headlines.slice(-5),
    };
    this.state = new Proxy<State>(state, {
      set: (target: State, property: string, value: boolean | string[]) => {
        target[property] = value;
        this.emitChange();
        return true;
      },
    });

    this.listeners = [];

    AppDispatcher.register((action: Action) => {
      this.dispatch(action);
    });
  }

  register(callback: () => void) {
    this.listeners.push(callback);
  }

  unregister(callback: () => void) {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }

  emitChange() {
    this.listeners.forEach((listener) => listener());
  }
  getState(): State {
    return this.state;
  }

  dispatch(action: Action): void {
    const newState = this.reduce(this.state, action);
    for (const key in newState) {
      if (newState.hasOwnProperty(key)) {
        const stateKey = key as keyof State;
        this.state[stateKey] = newState[stateKey];
      }
    }
  }

  reduce(state: State, action: Action): State {
    switch (action.type) {
      case "STOP_ROLLING":
        return { ...state, [action.direction]: false };
      case "RESUME_ROLLING":
        return { ...state, [action.direction]: true };
      default:
        console.error("정의되지 않은 액션타입");
        return state;
    }
  }
}

export const NewsRollerStore = new Store();
