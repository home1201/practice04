import DOMManager from "./DOMManager";
import { createElementWithClass } from "../utils";
import { WordmarkActions, wordmarkStore } from "../store/wordmarkStore";
import WordmarkItemElModel from "../DOMModel/WordmarkItemElModel";

export default class WordmarkElManager extends DOMManager {
  #listEl = null;
  #initEl = null;

  static get ELEMENT_TYPE_WORDMARK() {
    return "wordmark";
  }

  #setElisVisible(element, isVisible) {
    if (isVisible) element.classList.remove("u-hide");
    else element.classList.add("u-hide");
  }

  #setInitEl() {
    if (this.#initEl?.isConnected) return;

    if (this.#listEl) this.#listEl.remove();
    this.#initEl = createElementWithClass(
      "p",
      "init",
      WordmarkElManager.ELEMENT_TYPE_WORDMARK,
    );
    this.#initEl.textContent = "단어장이 비어있습니다. 단어를 추가해주세요.";
    this._parentEl.append(this.#initEl);
  }

  #setListEl() {
    if (this.#listEl?.isConnected) return;

    if (this.#initEl) this.#initEl.remove();
    this.#listEl = createElementWithClass(
      "ul",
      "list",
      WordmarkElManager.ELEMENT_TYPE_WORDMARK,
    );
    this._parentEl.append(this.#listEl);
  }

  #createWordmarkItemElModel(content) {
    const result = new WordmarkItemElModel(content);
    result.addDeleteEventListener(() => {
      wordmarkStore.dispatch(WordmarkActions.Delete.Start, content.id);
    });

    return result;
  }

  constructor(parentElName) {
    super(parentElName);
    this.#setInitEl();

    const wordmarkOpenEl = document.querySelector(
      `[data-${WordmarkElManager.ELEMENT_TYPE_WORDMARK}-open]`,
    );
    wordmarkOpenEl.addEventListener("click", () => {
      this._parentEl.showModal();
      this.#setElisVisible(wordmarkOpenEl, false);
    });
    this._parentEl.addEventListener("close", () => {
      this.#setElisVisible(wordmarkOpenEl, true);
    });
  }

  appendWordmarkItemEl() {
    const content = wordmarkStore.State.data;

    this.#setListEl();
    const newItem = this.#createWordmarkItemElModel(content);
    this.#listEl.append(newItem.Element);
  }

  appendWordmarkListEl() {
    const content = wordmarkStore.State.data;

    this.#setListEl();
    for (const [id, word] of content) {
      const newItem = this.#createWordmarkItemElModel({ id, word });
      this.#listEl.append(newItem.Element);
    }
  }

  deleteWordmarkItemEl() {
    const id = wordmarkStore.State.data;
    this.#listEl
      .querySelector(
        `[data-${WordmarkElManager.ELEMENT_TYPE_WORDMARK}-item='${id}']`,
      )
      .remove();

    if (!this.#listEl.firstChild) this.#setInitEl();
  }
}
