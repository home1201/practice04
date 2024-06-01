import PopoverElModel from "../DOMModel/PopoverElModel";

export default class DOMManager {
  constructor(parentElName, store) {
    this._parentEl = document.querySelector(`[${parentElName}]`);
    this._store = store;
  }

  _clear(parentEl = this._parentEl) {
    while (parentEl.firstChild) {
      parentEl.removeChild(parentEl.firstChild);
    }
  }

  showPopoverEl(content = this._store.State.data) {
    const popoverEl = new PopoverElModel(content).Element;
    document.body.append(popoverEl);
    popoverEl.showPopover();
  }

  _appendParentEl(type, element) {
    this._clear();
    this._parentEl.setAttribute("class", type);
    this._parentEl.append(element);
  }
}
