import DOMManager from "./DOMManager";
import SearchResultItemElModel from "../DOMModel/SearchResultItemElModel";
import {
  ErrorElModel,
  SearchResultErrorElModel,
} from "../DOMModel/ErrorElModel";
import ViewElModel from "../DOMModel/ViewElModel";
import InitElModel from "../DOMModel/InitElModel";
import { createElementWithClass } from "../utils";
import { WordmarkActions } from "../store/wordmarkStore";

export default class MainElManager extends DOMManager {
  static get ELEMENT_TYPE_RESULT() {
    return "search-result";
  }

  static get ELEMENT_TYPE_VIEW() {
    return "view";
  }
  createSearchResultsEl() {
    const contents = this._store.State.data;
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
    const content = this._store.State.data;
    this._appendParentEl(
      MainElManager.ELEMENT_TYPE_RESULT,
      new SearchResultErrorElModel(content).Element,
    );
  }

  createViewEl(wordmarkStore) {
    const content = this._store.State.data;
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
    const content = this._store.State.data;
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
