import { createElementWithClass } from "../utils";

export default class DOMModel {
  constructor(baseTag, className) {
    this._base = createElementWithClass(baseTag, className);
    this._content = {};
  }

  delete() {
    this._base.remove();
  }

  showLog() {
    console.log(this._base);
    console.log("content");
    for (const [key, value] of Object.entries(this._content)) {
      console.log(`${key}: ${value}`);
    }
  }

  get Element() {
    return this._base;
  }

  get Content() {
    return this._content;
  }
}
