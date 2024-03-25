import '/sass/style.scss';
import { fetchJSON } from '/js/utils';

(async () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const notFoundMessage = 'Unexpected end of JSON input';
  const searchForm = document.querySelector('[data-search-form]');
  let inputValue = null;
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    inputValue = searchForm.input.value;
    try {
      const data = await fetchJSON(`/api/search.do?certkey_no=6410&key=${apiKey}&type_search=search&req_type=json&q=${inputValue}`);
      console.log(data);
    } catch (err) {
      if (err.message === notFoundMessage) console.log('검색 결과 없음');
    }
  })
})();
