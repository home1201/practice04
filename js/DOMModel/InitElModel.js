import DOMModel from "./DOMModel";
import { createElementWithClass } from "../utils";

export default class InitElModel extends DOMModel {
  constructor() {
    super("template", "");

    this._content = {
      text: "우리말사전으로 찾고 싶은 단어의 뜻을 알아보세요.",
    };

    const initTextEl = createElementWithClass("p", "init");
    initTextEl.textContent = this._content.text;

    this._base.content.append(initTextEl);
  }

  get Element() {
    return this._base.content;
  }
}
