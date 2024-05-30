export default class DOMManager {
  _parentEl = null;

  constructor(parentElName) {
    this._parentEl = document.querySelector(`[${parentElName}]`);
  }

  _clear(parentEl = this._parentEl) {
    while (parentEl.firstChild) {
      parentEl.removeChild(parentEl.firstChild);
    }
  }

  _appendParentEl(type, element) {
    this._clear();
    this._parentEl.setAttribute("class", type);
    this._parentEl.append(element);
  }
}
