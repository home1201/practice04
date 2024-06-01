import DOMModel from "./DOMModel";

export default class PopoverElModel extends DOMModel {
  constructor(content) {
    super("div", `popover`);

    this._content = {
      message: content,
    };

    this._base.textContent = this._content.message;
    this._base.setAttribute("popover", "");
    this._base.addEventListener("animationend", () => {
      this._base.hidePopover();
      this._base.remove();
    });
  }
}
