import { DefaultAction, Store } from './store';
import { create } from 'mutative';

export const SearchActions = {
  searchStart: 'SEARCH START',
  searchComplete: "SEARCH COMPLETE",
  searchError: "SEARCH ERROR",
  loadContentStart: "LOAD CONTENT START",
  loadContentComplete: "LOAD CONTENT COMPLETE",
  loadContentError: "LOAD CONTENT ERROR",
};
Object.freeze(SearchActions);

const loadReducer = (action, state, data = null) => {
  switch (action) {
    case SearchActions.searchStart:
    case SearchActions.loadContentStart:
    case SearchActions.searchComplete:
    case SearchActions.loadContentComplete:
    case SearchActions.searchError:
    case SearchActions.loadContentError:
      return create(state, draft => {
        draft.id = state.id + 1;
        draft.action = action;
        draft.data = data;
      });
    default:
      return {
        id: state.id + 1,
        action: DefaultAction.invaildAction,
      };
  }
}

export const dicStore = new Store(SearchActions, loadReducer);
