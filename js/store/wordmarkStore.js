import { DefaultAction, freezeAction, Store } from "./store";
import { create } from "mutative";

export const WordmarkActions = {
  Load: "WORDMARK LOAD COMPLETE",
  Append: {
    Start: "WORDMARK APPEND START",
    Complete: "WORDMARK APPEND COMPLETE",
    Error: "WORDMARK APPEND ERROR",
  },
  Delete: {
    Start: "WORDMARK DELETE START",
    Complete: "WORDMARK DELETE COMPLETE",
  },
};
freezeAction(WordmarkActions);

const wordmarkReducer = (action, state, data = null) => {
  const setNewState = (newData) => {
    return create(state, (draft) => {
      draft.id = state.id + 1;
      draft.action = action;
      draft.data = newData;
    });
  };
  switch (action) {
    case WordmarkActions.Load:
    case WordmarkActions.Delete.Start:
    case WordmarkActions.Delete.Complete:
    case WordmarkActions.Append.Start:
    case WordmarkActions.Append.Complete:
    case WordmarkActions.Append.Error:
      return setNewState(data);
    default:
      return create(state, (draft) => {
        draft.id = state.id + 1;
        draft.action = DefaultAction.invaildAction;
      });
  }
};

export const wordmarkStore = new Store(WordmarkActions, wordmarkReducer);
