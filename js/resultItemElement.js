import DOMElement from "./DOMElement";
/*
 <a href="#" class="result__item" data-result-item>
        <strong class="result__title"><span data-result-title>한글</span><sup class="result__super"
            data-result-number>1</sup></strong>
        <p class="result__description">
          <span class="result__pos" data-result-pos>명사</span><span data-result-desc>우리나라 고유의 글자. 음소 문자인데 그보다 더 발전된 자질
            문자로 분류되기도 한다. 세종 대왕이 우리말을 표기하기 위하여 창제한
            훈민정음을 20세기 이후 달리 이르는 명칭이다. 1446년 반포될 당시에는 28</span>
        </p>
      </a>

*/
export default class ResultItemElement extends DOMElement {
  constructor() {
    super('data-result');
  }
}
