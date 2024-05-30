import DicFetcher from "./DicFetcher";
import MainElManager from "./DOMManager/MainElManager";
import WordmarkElManager from "./DOMManager/WordmarkElManager";
import Router from "./Router";
import { DicActions, dicStore } from "./store/dicStore";
import { WordmarkActions, wordmarkStore } from "./store/wordmarkStore";
import WordmarkDataManager from "./WordmarkDataManager";
import "/sass/style.scss";

(async () => {
  const searchFormEl = document.querySelector("[data-search-form]");
  searchFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = e.target.input.value;
    e.target.input.value = "";
    window.location.hash = `!/Search/${query}`;
  });

  DicFetcher.init(import.meta.env.VITE_API_KEY);

  dicStore.subscribe(
    DicActions.View.Start,
    async () => await DicFetcher.fetch(DicFetcher.typeView),
  );
  dicStore.subscribe(
    DicActions.Search.Start,
    async () => await DicFetcher.fetch(DicFetcher.typeSearch),
  );

  const mainElManager = new MainElManager("data-main");
  dicStore.subscribe(DicActions.Search.Error, () =>
    mainElManager.createSearchErrorEl(),
  );
  dicStore.subscribe(DicActions.Search.Complete, () =>
    mainElManager.createSearchResultsEl(),
  );
  dicStore.subscribe(DicActions.View.Complete, () =>
    mainElManager.createViewEl(),
  );
  dicStore.subscribe(DicActions.View.Error, () =>
    mainElManager.createViewErrorEl(),
  );

  const router = new Router(mainElManager);
  window.addEventListener("DOMContentLoaded", () => router.route());
  window.addEventListener("hashchange", () => router.route());

  const wordmarkElManager = new WordmarkElManager("data-wordmark");
  wordmarkStore.subscribe(WordmarkActions.Load, () =>
    wordmarkElManager.createWordmarkListEl(),
  );
  wordmarkStore.subscribe(WordmarkActions.Append.Complete, () =>
    wordmarkElManager.createWordmarkItemEl(),
  );
  wordmarkStore.subscribe(WordmarkActions.Append.Start, () =>
    WordmarkDataManager.append(),
  );
  wordmarkStore.subscribe(WordmarkActions.Delete.Start, () =>
    WordmarkDataManager.delete(),
  );
  wordmarkStore.subscribe(WordmarkActions.Delete.Complete, () =>
    wordmarkElManager.deleteWordmarkItemEl(),
  );

  // wordmarkStore.dispatch(WordmarkActions.LoadComplete, new Set());
  //
  WordmarkDataManager.loadData();
  wordmarkStore.dispatch(WordmarkActions.Append.Start, {
    id: 404765,
    word: "나무",
  });
  wordmarkStore.dispatch(WordmarkActions.Delete.Start, 440197);
  // wordmarkStore.dispatch(WordmarkActions.AppendComplete, {
  //   id: 440200,
  //   word: "사장",
  // });
})();
