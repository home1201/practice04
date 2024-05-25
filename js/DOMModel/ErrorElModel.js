import DOMModel from "./DOMModel";
import DicFetcher from "../DicFetcher";

export class ErrorElModel extends DOMModel {
  constructor(content) {
    super("p", `not-found`);

    this._content = {
      errorMessage: content.error.message,
    };

    this._errorTextEl = document.createTextNode("");
    if (this._content.errorMessage === DicFetcher.notFoundMessage) {
      this._errorTextEl.textContent =
        "단어를 찾을 수 없습니다. 다시 검색해주세요.";
    } else {
      this._errorTextEl.textContent = `단어 검색 중 오류가 발생했습니다 : ${this._content.errorMessage} 에러`;
    }

    this._base.append(this._errorTextEl);
  }
}

export class SearchResultErrorElModel extends ErrorElModel {
  constructor(content) {
    super(content);
    this._content.word = content.word;
    if (this._content.errorMessage === DicFetcher.notFoundMessage)
      this._errorTextEl.textContent = `${this._content.word} ${this._errorTextEl.textContent}`;
  }
}
