import DicFetcher from "./DicFetcher";
import MainElManager from "./DOMManager/MainElManager";
import Router from "./Router";
import { DicActions, dicStore } from "./store/dicStore";
import "/sass/style.scss";

(async () => {
  const searchForm = document.querySelector("[data-search-form]");
  searchForm.addEventListener("submit", (e) => {
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

  MainElManager.init("[data-main]");
  dicStore.subscribe(
    DicActions.Search.Error,
    MainElManager.createSearchErrorEl,
  );
  dicStore.subscribe(
    DicActions.Search.Complete,
    MainElManager.createSearchResultsEl,
  );
  dicStore.subscribe(DicActions.View.Complete, MainElManager.createViewEl);
  dicStore.subscribe(DicActions.View.Error, MainElManager.createViewErrorEl);

  window.addEventListener("DOMContentLoaded", Router.route);
  window.addEventListener("hashchange", Router.route);
})();
