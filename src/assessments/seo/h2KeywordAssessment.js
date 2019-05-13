import {merge} from "lodash-es";

import Assessment from "../../assesment";
import AssessmentResult from "yoastseo/src/values/AssessmentResult";

/**
 * Represents the assessment that checks if the keyword is present in one of the subheadings.
 */
export default class H2KeywordAssessment extends Assessment {
  /**
   * Sets the identifier and the config.
   *
   * @param {object} config The configuration to use.
   *
   * @returns {void}
   */
  constructor(config = {}) {
    super();

    const defaultConfig = {
      parameters: {
        minCount: 3,
        minKeywords: 1,
      },
      scores: {
        noMatches: 0,
        matches: 10,
      },
    };

    this.identifier = "h2Keywords";
    this._config = merge(defaultConfig, config);
  }

  /**
   * Runs the matchKeywordInSubheadings research and based on this returns an assessment result.
   *
   * @param {Paper} paper             The paper to use for the assessment.
   * @param {Researcher} researcher   The researcher used for calling research.
   * @param {Object} i18n             The object used for translations.
   *
   * @returns {AssessmentResult} The assessment result.
   */
  getResult(paper, researcher, i18n) {
    this._subHeadingsCount = researcher.getResearch("subheadingsH2Count");
    this._subHeadingsKeywordsCount = researcher.getResearch("subheadingsH2WithKeywordCount");

    const assessmentResult = new AssessmentResult();

    const calculatedResult = this.calculateResult(i18n);

    assessmentResult.setScore(calculatedResult.score);
    assessmentResult.setText(calculatedResult.resultText);

    return assessmentResult;
  }

  /**
   * Checks whether the paper has a text and a keyword.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @returns {boolean} True when there is text and a keyword.
   */
  isApplicable(paper) {
    return paper.hasText() && paper.hasKeyword();
  }

  /**
   * Determines the score and the Result text for the subheadings.
   *
   * @param {Object} i18n The object used for translations.
   *
   * @returns {Object} The object with the calculated score and the result text.
   */
  calculateResult(i18n) {
    if (
      this._subHeadingsCount >= this._config.parameters.minCount
      && this._subHeadingsKeywordsCount >= this._config.parameters.minKeywords
    ) {
      return {
        score: this._config.scores.matches,
        resultText: "Right number of H2 and keywords",
      };
    }


    return {
      score: this._config.scores.noMatches,
      resultText: "Not enough matches",
    };
  }
}