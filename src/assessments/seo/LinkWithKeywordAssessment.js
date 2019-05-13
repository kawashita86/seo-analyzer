import {merge} from "lodash-es";

import Assessment from "../../assesment";
import AssessmentResult from "yoastseo/src/values/AssessmentResult";

export default class LinkWithKeywordAssessment extends Assessment {

  constructor(config = {}) {
    super();

    const defaultConfig = {
      parameters: {
        minCount: 1,
      },
      scores: {
        noMatches: 0,
        matches: 5,
      },
    };

    this.identifier = "linkWithKeywords";
    this._config = merge(defaultConfig, config);
  }

  getResult(paper, researcher, i18n) {
    this._linksWithKeywords = researcher.getResearch("linksWithKeywordsCount");

    const assessmentResult = new AssessmentResult();

    const calculatedResult = this.calculateResult(i18n);

    assessmentResult.setScore(calculatedResult.score);
    assessmentResult.setText(calculatedResult.resultText);

    return assessmentResult;
  }

  isApplicable(paper) {
    return paper.hasText() && paper.hasKeyword();
  }

  calculateResult(i18n) {
    if (this._linksWithKeywords >= this._config.parameters.minCount) {
      return {
        score: this._config.scores.matches,
        resultText: "Right number of links with keywords",
      };
    }

    return {
      score: this._config.scores.noMatches,
      resultText: "Not enough links with keywords",
    };
  }
}