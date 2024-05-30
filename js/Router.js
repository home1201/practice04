import MainElManager from "./DOMManager/MainElManager";
import { DicActions, dicStore } from "./store/dicStore";
import { capitalized } from "./utils";

export default class Router {
  static #parsePath() {
    return window.location.hash.replace("#!/", "").split("/");
  }

  #mainElManager = null;
  constructor(mainElManager) {
    this.#mainElManager = mainElManager;
  }

  route() {
    const [rawType, rawQuery] = Router.#parsePath();
    if (rawType === "" || !rawQuery) {
      this.#mainElManager.createInitEl();
      return;
    }
    const type = capitalized(rawType);
    const query = decodeURI(rawQuery);

    dicStore.dispatch(DicActions[type].Start, query);
  }
}
