import { wordmarkStore, WordmarkActions } from "./store/wordmarkStore";

export default class WordmarkDataManager {
  static #wordmarkMap = null;

  static loadData() {
    //데이터 로드 작업
    const content = [];
    WordmarkDataManager.#wordmarkMap = new Map(content);
    wordmarkStore.dispatch(WordmarkActions.Load, content);
  }

  static delete() {
    const id = wordmarkStore.State.data;
    if (!WordmarkDataManager.#wordmarkMap.has(id)) return;

    WordmarkDataManager.#wordmarkMap.delete(id);
    wordmarkStore.dispatch(WordmarkActions.Delete.Complete, id);
  }

  static append() {
    const { id, word } = wordmarkStore.State.data;
    if (WordmarkDataManager.#wordmarkMap.has(id)) {
      wordmarkStore.dispatch(WordmarkActions.Append.Error, word);
      return;
    }

    WordmarkDataManager.#wordmarkMap.set(id, word);
    wordmarkStore.dispatch(WordmarkActions.Append.Complete, { id, word });
  }
}
