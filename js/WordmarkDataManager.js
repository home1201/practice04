import { wordmarkStore, WordmarkActions } from "./store/wordmarkStore";

export default class WordmarkDataManager {
  static #wordmarkMap = null;

  static #saveWordmarkMap() {
    if (!WordmarkDataManager.#wordmarkMap) {
      console.log("map === null");
      return;
    }
    localStorage.setItem("wordmark", JSON.stringify([...this.#wordmarkMap]));
  }

  static loadData() {
    let content = null;
    const rawContent = localStorage.getItem("wordmark");
    if (!rawContent) content = [];
    else content = JSON.parse(rawContent);

    WordmarkDataManager.#wordmarkMap = new Map(content);
    wordmarkStore.dispatch(WordmarkActions.Load, content);
  }

  static delete() {
    const id = wordmarkStore.State.data;
    if (!WordmarkDataManager.#wordmarkMap.has(id)) return;

    WordmarkDataManager.#wordmarkMap.delete(id);
    WordmarkDataManager.#saveWordmarkMap();
    wordmarkStore.dispatch(WordmarkActions.Delete.Complete, id);
  }

  static append() {
    const { id, word } = wordmarkStore.State.data;
    if (WordmarkDataManager.#wordmarkMap.has(id)) {
      wordmarkStore.dispatch(
        WordmarkActions.Append.Error,
        `이미 단어장에 있는 단어입니다`,
      );
      return;
    }

    WordmarkDataManager.#wordmarkMap.set(id, word);
    WordmarkDataManager.#saveWordmarkMap();
    wordmarkStore.dispatch(WordmarkActions.Append.Complete, { id, word });
  }
}
