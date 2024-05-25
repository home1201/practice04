import { fetchJSON } from "./utils";
import { DicActions, dicStore } from "./store/dicStore";

export default class DicFetcher {
  static #apiKey = null;
  static init(apiKey) {
    DicFetcher.#apiKey = apiKey;
  }

  static get typeSearch() {
    return "Search";
  }
  static get typeView() {
    return "View";
  }

  static get notFoundMessage() {
    return "Unexpected end of JSON input";
  }

  static get notFoundObject() {
    return {
      channel: {
        total: 0,
        num: 10,
        title: "표준 국어 대사전 개발 지원(Open API) - 사전  검색",
        start: 1,
        description: "표준 국어 대사전 개발 지원(Open API) – 사전 검색 결과",
        item: [],
      },
    };
  }

  static getUrl(type, query) {
    switch (type) {
      case DicFetcher.typeSearch:
        return `/api/search.do?certkey_no=6410&key=${DicFetcher.#apiKey}&type_search=search&req_type=json&q=${query}`;
      case DicFetcher.typeView:
        return `/api/view.do?certkey_no=6410&key=${DicFetcher.#apiKey}&type_search=view&req_type=json&method=TARGET_CODE&q=${query}`;
    }
  }

  static async fetch(type) {
    if (chrome?.runtime?.lastError) {
      console.warn(`Warn : ${chrome.runtime.lastError.message}`);
      return;
    }

    const query = dicStore.State.data;
    const url = DicFetcher.getUrl(type, query);

    try {
      const result = await fetchJSON(url);
      if (result.channel.total === 0) throw Error(DicFetcher.notFoundMessage);
      dicStore.dispatch(DicActions[type].Complete, result);
    } catch (error) {
      dicStore.dispatch(DicActions[type].Error, error);
    }
  }
}
