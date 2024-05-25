import DOMModel from "./DOMModel";
import { createElementWithClass } from "../utils";

export default class ViewElModel extends DOMModel {
  constructor(content) {
    super("template", "");
    this._parentClassName = "view";

    this._content = {
      title: content.word,
      pos: content.pos_info[0].pos,
      senses: content.pos_info[0].comm_pattern_info[0].sense_info,
      pronunciation: content.pronunciation_info[0].pronunciation,
    };

    const title = createElementWithClass("h2", "title", this._parentClassName);
    title.textContent = this._content.title;

    const pronunciation = createElementWithClass(
      "div",
      "pronunciation",
      this._parentClassName,
    );
    const pronunciationKey = document.createTextNode("발음");
    const pronunciationValue = createElementWithClass(
      "span",
      "pronunciation-value",
      this._parentClassName,
    );
    pronunciationValue.textContent = this._content.pronunciation;
    pronunciation.append(pronunciationKey, pronunciationValue);

    const type = createElementWithClass("div", "type", this._parentClassName);
    type.textContent = this._content.pos;

    const senseList = createElementWithClass(
      "ol",
      "sense-list",
      this._parentClassName,
    );
    const senseItemArr = this._content.senses.map((sense) => {
      const senseItem = createElementWithClass(
        "li",
        "sense-item",
        this._parentClassName,
      );

      const definition = createElementWithClass(
        "div",
        "definition",
        this._parentClassName,
      );
      definition.textContent = sense.definition;

      if (!sense.example_info) {
        senseItem.append(definition);
        return senseItem;
      }

      const exampleKey = createElementWithClass(
        "span",
        "example-key",
        this._parentClassName,
      );
      exampleKey.textContent = "예문";

      const exampleList = createElementWithClass(
        "ul",
        "example-list",
        this._parentClassName,
      );
      const exampleItemArr = sense.example_info.map((exampleObj) => {
        const exampleItem = createElementWithClass(
          "li",
          "example-item",
          this._parentClassName,
        );
        exampleItem.textContent = exampleObj.example;
        return exampleItem;
      });
      exampleList.append(...exampleItemArr);
      senseItem.append(definition, exampleKey, exampleList);
      return senseItem;
    });
    senseList.append(...senseItemArr);

    this._base.content.append(title, pronunciation, type, senseList);
  }

  get Element() {
    return this._base.content;
  }
}
// {
//   "channel": {
//     "total": 1,
//     "title": "표준 국어 대사전 개발 지원(Open API) - 사전  검색",
//     "description": "표준 국어 대사전 개발 지원(Open API) – 사전 검색 결과",
//     "item": {
//       "target_code": "481636",
//       "word_info": {
//         "pronunciation_info": [
//           {
//             "pronunciation": "지상"
//           }
//         ],
//         "word_unit": "단어",
//         "word": "지상",
//         "original_language_info": [
//           {
//             "original_language": "至上",
//             "language_type": "한자"
//           }
//         ],
//         "word_type": "한자어",
//         "pos_info": [
//           {
//             "pos_code": "481636001",
//             "comm_pattern_info": [
//               {
//                 "comm_pattern_code": "481636001001",
//                 "sense_info": [
//                   {
//                     "definition": "가장 높은 위.",
//                     "type": "일반어",
//                     "example_info": [
//                       {
//                         "example": "지상 명령."
//                       },
//                       {
//                         "example": "지상 목표."
//                       },
//                       {
//                         "example": "지상 과제."
//                       },
//                       {
//                         "example": "현자들은 근검한 생활 태도를 지상의 미덕으로 삼았다."
//                       },
//                       {
//                         "source": "이문열, 영웅시대",
//                         "example": "그분은 이 세상에서 가장 나를 사랑하는 분이시며, 나를 지상으로 당신의 외로운 삶을 거신 분이오."
//                       }
//                     ],
//                     "definition_original": "가장 높은 위.",
//                     "sense_code": 280317,
//                     "lexical_info": [
//                       {
//                       }
//                     ]
//                   }
//                 ],
//                 "grammar_info": [
//                   {
//                     "grammar": "흔히 ‘지상’, ‘지상의’, ‘지상으로’ 꼴로 쓰여"
//                   }
//                 ]
//               }
//             ],
//             "pos": "명사"
//           }
//         ]
//       }
//     },
//     "link": "https://stdict.korean.go.kr",
//     "lastbuilddate": "20240517000619"
//   }
// }
// <h2 class="info__title">나무</h2>
// <div class="info__pronunciation">
//   <span class="info__pronunciation-key">발음</span>
//   <span class="info__pronunciation-value">나무</span>
// </div>
// <div class="info__type">명사</div>
// <ol class="info__sense-list">
//   <li class="info__sense-item">
//     <div class="info__definition">줄기나 가지가 목질로 된 여러해살이 식물.</div>
//     <span class="info__example-key">예문</span>
//     <ul class="info__example-list">
//       <li class="info__example-item">나무 세 그루</li>
//       <li class="info__example-item">나무 세 그루</li>
//       <li class="info__example-item">나무 세 그루</li>
//     </ul>
//   </li>
//   <li class="info__sense-item">
//     <div class="info__definition">줄기나 가지가 목질로 된 여러해살이 식물.</div>
//     <span class="info__example-key">예문</span>
//     <ul class="info__example-list">
//       <li class="info__example-item">나무 세 그루</li>
//       <li class="info__example-item">나무 세 그루</li>
//       <li class="info__example-item">나무 세 그루</li>
//     </ul>
//   </li>
//   <li class="info__sense-item">
//     <div class="info__definition">줄기나 가지가 목질로 된 여러해살이 식물.</div>
//     <span class="info__example-key">예문</span>
//     <ul class="info__example-list">
//       <li class="info__example-item">나무 세 그루</li>
//       <li class="info__example-item">나무 세 그루</li>
//       <li class="info__example-item">나무 세 그루무로 만든 공이의 등을 맞춘 것처럼 서로 잘 맞지 아니하고 대립되는 경우를 비유적으로 이르는 말.</li>
//     </ul>
//   </li>
// </ol>
