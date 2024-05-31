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

  //사전 API 읽기
  DicFetcher.init(import.meta.env.VITE_API_KEY);
  dicStore.subscribe(
    DicActions.View.Start,
    async () => await DicFetcher.fetch(DicFetcher.typeView),
  );
  dicStore.subscribe(
    DicActions.Search.Start,
    async () => await DicFetcher.fetch(DicFetcher.typeSearch),
  );

  //사전 데이터 DOM으로 변환
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

  //라우터
  const router = new Router(mainElManager);
  window.addEventListener("load", () => router.route());
  window.addEventListener("hashchange", () => router.route());

  //단어장 데이터 읽기
  window.addEventListener("load", () => WordmarkDataManager.loadData());
  wordmarkStore.subscribe(WordmarkActions.Append.Start, () =>
    WordmarkDataManager.append(),
  );
  wordmarkStore.subscribe(WordmarkActions.Delete.Start, () =>
    WordmarkDataManager.delete(),
  );

  //단어장 데이터 DOM으로 변환
  const wordmarkElManager = new WordmarkElManager("data-wordmark");
  wordmarkStore.subscribe(WordmarkActions.Load, () =>
    wordmarkElManager.appendWordmarkListEl(),
  );
  wordmarkStore.subscribe(WordmarkActions.Append.Complete, () =>
    wordmarkElManager.appendWordmarkItemEl(),
  );
  wordmarkStore.subscribe(WordmarkActions.Delete.Complete, () =>
    wordmarkElManager.deleteWordmarkItemEl(),
  );
})();
