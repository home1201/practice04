

export default class DOMElement {
  constructor(baseElName) {
    this._domObject = {
      baseEl: document.querySelector(`[${baseElName}]`),
    };
  }

  generateContent(domName, text) {
    return true;
  }

  showLog() {
    console.log(this._domObject.baseEl);
  }
}
