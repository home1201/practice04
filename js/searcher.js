import { fetchJSON } from '/js/utils';

export default class Searcher {
  static get notFoundMessage() { return 'Unexpected end of JSON input'; }
  static get notFoundObject() {
    return {
      "channel": {
        "total": 0,
        "num": 10,
        "title": "표준 국어 대사전 개발 지원(Open API) - 사전  검색",
        "start": 1,
        "description": "표준 국어 대사전 개발 지원(Open API) – 사전 검색 결과",
        "item": [],
      }
    }
  }

  #apiKey = null;

  constructor(apiKey) {
    this.#apiKey = apiKey;
    this.lastResult = null;
  }

  async search(inputValue) {
    if (chrome?.runtime?.lastError) { console.warn(`Warn : ${chrome.runtime.lastError.message}`); return; }

    try {
      this.lastResult = await fetchJSON(`/api/search.do?certkey_no=6410&key=${this.#apiKey}&type_search=search&req_type=json&q=${inputValue}`);
    } catch (err) {
      if (err.message === Searcher.notFoundMessage) this.lastResult = Searcher.notFoundObject;
      else this.lastResult = err;
    }
  }


}
