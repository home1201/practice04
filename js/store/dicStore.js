import { DefaultAction, Store } from "./store";
import { create } from "mutative";

export const DicActions = {
  Search: {
    Start: "SEARCH START",
    Complete: "SEARCH COMPLETE",
    Error: "SEARCH ERROR",
  },
  View: {
    Start: "VIEW START",
    Complete: "VIEW COMPLETE",
    Error: "VIEW ERROR",
  },
};
Object.freeze(DicActions);
Object.freeze(DicActions.Search);
Object.freeze(DicActions.View);

const getDicActionsArr = () => {
  const result = [];
  for (const type of Object.values(DicActions)) {
    result.push(...Object.values(type));
  }
  return result;
};

const loadReducer = (action, state, data = null) => {
  let result = null;
  switch (action) {
    case DicActions.Search.Start:
    case DicActions.View.Start:
      result = data;
      break;

    case DicActions.Search.Complete:
      result = data.channel.item;
      break;
    case DicActions.Search.Error:
      result = {
        word: state.data,
        error: data,
      };
      break;

    case DicActions.View.Complete:
      result = data.channel.item.word_info;
      break;
    case DicActions.View.Error:
      result = {
        error: data,
      };
      break;
    default:
      result = {
        id: state.id + 1,
        action: DefaultAction.invaildAction,
      };
  }
  return create(state, (draft) => {
    draft.id = state.id + 1;
    draft.action = action;
    draft.data = result;
  });
};

const dicActionsArr = getDicActionsArr();
export const dicStore = new Store(dicActionsArr, loadReducer);
