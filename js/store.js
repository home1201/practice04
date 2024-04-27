export const DefaultAction = {
  invaildAction: "INVALID ACTION",
  initialState: "INITIAL STATE",
}
Object.freeze(DefaultAction);

export class Store {
  static get baseState() { return { id: 0, action: DefaultAction.initialState } }

  #state = null;
  #actionListeners = null;
  #reducer = null;

  constructor(actions, reducer, baseState = Store.baseState) {
    this.#state = { ...baseState };
    this.#reducer = reducer;

    this.#actionListeners = {};
    Object.values(actions).forEach(action => {
      this.#actionListeners[action] = [];
    })
  }

  subscribe(action, listener) {
    if (this.#actionListeners[action] === undefined) throw Error("지정되지 않은 액션입니다");
    this.#actionListeners[action].push(listener);
  }

  dispatch(action, data = null) {
    if (action === DefaultAction.invaildAction) throw Error("지정되지 않은 액션입니다");

    this.#state = this.#reducer(action, this.State, data);
    this.#actionListeners[action].forEach(listener => listener());
  };

  get State() {
    return this.#state;
  }
}
