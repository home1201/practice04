import DOMManager from "./DOMManager";
import SearchResultItemElModel from "../DOMModel/SearchResultItemElModel";
import {
  ErrorElModel,
  SearchResultErrorElModel,
} from "../DOMModel/ErrorElModel";
import ViewElModel from "../DOMModel/ViewElModel";
import InitElModel from "../DOMModel/InitElModel";
import { dicStore } from "../store/dicStore";

export default class MainElManager extends DOMManager {
  static get ELEMENT_TYPE_RESULT() {
    return "search-result";
  }

  static get ELEMENT_TYPE_VIEW() {
    return "view";
  }

  static #appendParentEl(type, elements) {
    MainElManager.clear();
    MainElManager._parentEl.setAttribute("class", type);
    MainElManager._parentEl.append(...elements);
  }

  static createSearchResultsEl() {
    const contents = dicStore.State.data;
    return MainElManager.#appendParentEl(
      MainElManager.ELEMENT_TYPE_RESULT,
      contents.map((content) => new SearchResultItemElModel(content).Element),
    );
  }
  static createSearchErrorEl() {
    const content = dicStore.State.data;
    return MainElManager.#appendParentEl(MainElManager.ELEMENT_TYPE_RESULT, [
      new SearchResultErrorElModel(content).Element,
    ]);
  }

  static createViewEl() {
    const content = dicStore.State.data;
    return MainElManager.#appendParentEl(MainElManager.ELEMENT_TYPE_VIEW, [
      new ViewElModel(content).Element,
    ]);
  }
  static createViewErrorEl() {
    const content = dicStore.State.data;
    return MainElManager.#appendParentEl(MainElManager.ELEMENT_TYPE_VIEW, [
      new ErrorElModel(content).Element,
    ]);
  }

  static createInitEl() {
    return MainElManager.#appendParentEl(MainElManager.ELEMENT_TYPE_VIEW, [
      new InitElModel().Element,
    ]);
  }
}

/*
  const resultEl = document.querySelector('[data-result-test]');
  dicStore.subscribe(DicActions.searchComplete, () => {
    const word = dicStore.State.data.channel.item[0].word;
    const definition = dicStore.State.data.channel.item[0].sense.definition;
    resultEl.textContent = `${word} - ${definition}`;
  })
  dicStore.subscribe(DicActions.searchError, () => {
    const word = dicStore.State.data.word;
    const errorMessage = dicStore.State.data.error.message;
    if (errorMessage === DicFetcher.notFoundMessage) resultEl.textContent = `${word} - 없는 단어입니다.`;
  })
  */
