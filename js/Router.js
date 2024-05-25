import MainElManager from "./DOMManager/MainElManager";
import { DicActions, dicStore } from "./store/dicStore";
import { capitalized } from "./utils";

export default class Router {
  static #parsePath() {
    return window.location.hash.replace("#!/", "").split("/");
  }

  static route() {
    const [rawType, rawQuery] = Router.#parsePath();
    if (rawType === "" || !rawQuery) {
      MainElManager.createInitEl();
      return;
    }
    const type = capitalized(rawType);
    const query = decodeURI(rawQuery);

    dicStore.dispatch(DicActions[type].Start, query);
  }
}
