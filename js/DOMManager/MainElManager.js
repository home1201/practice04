import DOMManager from "./DOMManager";
import SearchResultItemElModel from "../DOMModel/SearchResultItemElModel";
import {
  ErrorElModel,
  SearchResultErrorElModel,
} from "../DOMModel/ErrorElModel";
import ViewElModel from "../DOMModel/ViewElModel";
import InitElModel from "../DOMModel/InitElModel";
import { dicStore } from "../store/dicStore";
import { createElementWithClass } from "../utils";
import { WordmarkActions, wordmarkStore } from "../store/wordmarkStore";

export default class MainElManager extends DOMManager {
  static get ELEMENT_TYPE_RESULT() {
    return "search-result";
  }

  static get ELEMENT_TYPE_VIEW() {
    return "view";
  }
  createSearchResultsEl() {
    const contents = dicStore.State.data;
    const list = createElementWithClass(
      "ul",
      "list",
      MainElManager.ELEMENT_TYPE_RESULT,
    );
    list.append(
      ...contents.map(
        (content) => new SearchResultItemElModel(content).Element,
      ),
    );
    this._appendParentEl(MainElManager.ELEMENT_TYPE_RESULT, list);
  }
  createSearchErrorEl() {
    const content = dicStore.State.data;
    this._appendParentEl(
      MainElManager.ELEMENT_TYPE_RESULT,
      new SearchResultErrorElModel(content).Element,
    );
  }

  createViewEl() {
    const content = dicStore.State.data;
    const viewElModel = new ViewElModel(content);
    viewElModel.addWordmarkAppendEventListener(() => {
      wordmarkStore.dispatch(WordmarkActions.Append.Start, {
        id: viewElModel.Content.id,
        word: viewElModel.Content.title,
      });
    });
    this._appendParentEl(MainElManager.ELEMENT_TYPE_VIEW, viewElModel.Element);
  }
  createViewErrorEl() {
    const content = dicStore.State.data;
    this._appendParentEl(
      MainElManager.ELEMENT_TYPE_VIEW,
      new ErrorElModel(content).Element,
    );
  }

  createInitEl() {
    this._appendParentEl(
      MainElManager.ELEMENT_TYPE_VIEW,
      new InitElModel().Element,
    );
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
