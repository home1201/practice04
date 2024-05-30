export const DefaultAction = {
  invaildAction: "INVALID ACTION",
  initialState: "INITIAL STATE",
};
Object.freeze(DefaultAction);

export const freezeAction = (actions) => {
  Object.freeze(actions);
  for (const key of Object.keys(actions)) {
    if (actions[key] instanceof Object) {
      Object.freeze(actions[key]);
    }
  }
};

const getActionArr = (actions) => {
  const result = [];
  for (const key of Object.keys(actions)) {
    if (actions[key] instanceof Object) {
      result.push(...Object.values(actions[key]));
    } else {
      result.push(actions[key]);
    }
  }
  return result;
};

export class Store {
  static get baseState() {
    return { id: 0, action: DefaultAction.initialState };
  }

  #state = null;
  #actionListeners = null;
  #reducer = null;

  constructor(actions, reducer, baseState = Store.baseState) {
    this.#state = { ...baseState };
    this.#reducer = reducer;

    this.#actionListeners = {};
    const actionArr = getActionArr(actions);
    actionArr.forEach((action) => {
      this.#actionListeners[action] = [];
    });
  }

  subscribe(action, listener) {
    if (this.#actionListeners[action] === undefined)
      throw Error("지정되지 않은 액션입니다");
    this.#actionListeners[action].push(listener);
  }

  dispatch(action, data = null) {
    if (action === DefaultAction.invaildAction)
      throw Error("지정되지 않은 액션입니다");

    this.#state = this.#reducer(action, this.State, data);
    this.#actionListeners[action].forEach((listener) => listener());
  }

  get State() {
    return this.#state;
  }
}
