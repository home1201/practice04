export default class DOMManager {
  static _parentEl = null;
  static init(parentElName) {
    DOMManager._parentEl = document.querySelector(parentElName);
  }

  static clear() {
    while (this._parentEl.firstChild) {
      this._parentEl.removeChild(this._parentEl.firstChild);
    }
  }
}
