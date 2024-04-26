export default class Store {
  static get baseState() { return { id: 0, action: "INITIAL STATE" } }

  #state = null;
  #actionListeners = null;
  #reducer = null;

  constructor(actionArr, reducer, baseState = Store.baseState) {
    this.#state = { ...baseState };
    this.#reducer = reducer;

    this.#actionListeners = {};
    actionArr.forEach(action => {
      this.#actionListeners[action] = [];
    })
  }

  subscribe(action, listener) {
    if (this.#actionListeners[action] === undefined) throw Error("지정되지 않은 액션입니다");
    this.#actionListeners[action].push(listener);
  }

  dispatch(action) {
    this.#state = { ...this.#reducer(action, this.State) };

    if (this.#state.action === "INVALID ACTION") throw Error("지정되지 않은 액션입니다");
    this.#actionListeners[action].forEach(listener => listener());
  };

  get State() {
    return { ...this.#state };
  }
}
