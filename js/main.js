import { SearchActions, dicStore } from './dicStore';
import DicFetcher from './dicFetcher';
import '/sass/style.scss';

(async () => {
  const searchForm = document.querySelector('[data-search-form]');
  searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const inputValue = e.target.input.value;
    dicStore.dispatch(SearchActions.searchStart, inputValue);
  })

  dicStore.subscribe(SearchActions.searchStart, async () => {
    const inputValue = dicStore.State.data;
    const dicFetcher = new DicFetcher(import.meta.env.VITE_API_KEY);

    let result = null;
    try {
      result = await dicFetcher.search(inputValue);
      dicStore.dispatch(SearchActions.searchComplete, result);
    } catch (error) {
      result = {
        word: inputValue,
        error,
      };
      dicStore.dispatch(SearchActions.searchError, result);
    }
  })

  const resultEl = document.querySelector('[data-result-test]');
  dicStore.subscribe(SearchActions.searchComplete, () => {
    const word = dicStore.State.data.channel.item[0].word;
    const definition = dicStore.State.data.channel.item[0].sense.definition;
    resultEl.textContent = `${word} - ${definition}`;
  })
  dicStore.subscribe(SearchActions.searchError, () => {
    const word = dicStore.State.data.word;
    const errorMessage = dicStore.State.data.error.message;
    if (errorMessage === DicFetcher.notFoundMessage) resultEl.textContent = `${word} - 없는 단어입니다.`;
  })
})();
