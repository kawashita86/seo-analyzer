import {escape, merge} from "lodash-es";

import Assessment from "../../assesment";
import AssessmentResult from "yoastseo/src/values/AssessmentResult";

export default class ImageNameKeywordAssessment extends Assessment {
  constructor(config = {}) {
    super();

    const defaultConfig = {
      scores: {
        good: 2.5,
        bad: 0,
      }
    };

    this.identifier = "imageKeyword";
    this._config = merge(defaultConfig, config);
  }

  getResult(paper, researcher, i18n) {
    this._filename = paper.getValue();
    this._keyword = escape(paper.getKeyword());
    this._keywordMatches = (this._filename.match(this._keyword) || []).length;

    const assessmentResult = new AssessmentResult();

    const calculatedResult = this.calculateResult(i18n, this._keyword);
    assessmentResult.setScore(calculatedResult.score);
    assessmentResult.setText(calculatedResult.resultText);

    return assessmentResult;
  }

  isApplicable(paper) {
    return paper.hasKeyword() && paper.hasValue();
  }

  calculateResult(i18n, keyword) {

    if (this._keywordMatches > 0) {
      return {
        score: this._config.scores.good,
        resultText:
          "Keyword is present in image file name."
      };
    }

    return {
      score: this._config.scores.bad,
      resultText:
        "Keyword is NOT present in image file name."
    };
  }
}