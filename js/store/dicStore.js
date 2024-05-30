import { DefaultAction, Store, freezeAction } from "./store";
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
freezeAction(DicActions);

const dicReducer = (action, state, data = null) => {
  const setState = (result) => {
    return create(state, (draft) => {
      draft.id = state.id + 1;
      draft.action = action;
      draft.data = result;
    });
  };

  switch (action) {
    case DicActions.Search.Start:
    case DicActions.View.Start:
      return setState(data);
    case DicActions.Search.Complete:
      return setState(data.channel.item);
    case DicActions.Search.Error:
      return setState({
        word: state.data,
        error: data,
      });
    case DicActions.View.Complete:
      return setState(data.channel.item.word_info);
    case DicActions.View.Error:
      return setState({
        error: data,
      });
    default:
      return create(state, (draft) => {
        draft.id = state.id + 1;
        draft.action = DefaultAction.invaildAction;
      });
  }
};

export const dicStore = new Store(DicActions, dicReducer);
