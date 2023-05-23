type Action = {
  type: string;
  direction: string;
};

class Dispatcher {
  isDispatching: boolean;
  callbacks: ((payload: any) => void)[];
  constructor() {
    this.isDispatching = false;
    this.callbacks = [];
  }

  register(callback: (action: Action) => void) {
    this.callbacks.push(callback);
  }

  dispatch(payload: () => void) {
    if (this.isDispatching) {
      console.error("디스패치 도중 디스패치할 수 없습니다");
    }

    this.isDispatching = true;
    for (const callback of this.callbacks) {
      callback(payload);
    }
    this.isDispatching = false;
  }
}

export const AppDispatcher = new Dispatcher();
