import Searcher from './searcher';
import Store from './stores';
import '/sass/style.scss';

(async () => {
  const actionList = ['INITIAL STATE', 'SEARCHING START', "SEARCHING COMPLETE"];
  const reducer = (action, state) => {
    switch (action) {
      case 'INITIAL STATE':
      case 'SEARCHING START':
      case 'SEARCHING COMPLETE':
        return {
          id: state.id + 1,
          action: action,
        }
      default:
        return {
          id: state.id + 1,
          action: "INVALID ACTION",
        };
    }
  }
  const store = new Store(actionList, reducer);

  const searchForm = document.querySelector('[data-search-form]');
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    store.dispatch("SEARCHING START");
  });

  const searcher = new Searcher(import.meta.env.VITE_API_KEY);
  store.subscribe("SEARCHING START", async () => {
    const inputValue = searchForm.input.value;
    await searcher.search(inputValue);
    store.dispatch("SEARCHING COMPLETE");
  });
  store.subscribe("SEARCHING COMPLETE", () => {
    console.log(searcher.lastResult);
  });
})();
