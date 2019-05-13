import {merge} from "lodash-es";

import Assessment from "../../assesment";
import AssessmentResult from "yoastseo/src/values/AssessmentResult";

/**
 * Assessment for checking the keyword matches in the meta description.
 */
class MetaDescriptionKeywordAssessment extends Assessment {
  /**
   * Sets the identifier and the config.
   *
   * @param {Object} [config] The configuration to use.
   * @param {number} [config.parameters.recommendedMinimum] The recommended minimum of keyword occurrences in the meta description.
   * @param {number} [config.scores.good] The score to return if there are enough keyword occurrences in the meta description.
   * @param {number} [config.scores.bad] The score to return if there aren't enough keyword occurrences in the meta description.
   * @param {string} [config.url] The URL to the relevant article on Yoast.com.
   *
   * @returns {void}
   */
  constructor(config = {}) {
    super();

    const defaultConfig = {
      parameters: {
        recommendedMinimum: 1,
      },
      scores: {
        good: 5,
        bad: 0,
      },
      /*      urlTitle: createAnchorOpeningTag( "https://yoa.st/33k" ),
            urlCallToAction: createAnchorOpeningTag( "https://yoa.st/33l" ),*/
    };

    this.identifier = "metaDescriptionKeyword";
    this._config = merge(defaultConfig, config);
  }

  /**
   * Runs the metaDescriptionKeyword researcher and based on this, returns an assessment result with score.
   *
   * @param {Paper}      paper      The paper to use for the assessment.
   * @param {Researcher} researcher The researcher used for calling research.
   * @param {Jed}        i18n       The object used for translations.
   *
   * @returns {AssessmentResult} The assessment result.
   */
  getResult(paper, researcher, i18n) {
    this._keyphraseCounts = researcher.getResearch("metaDescriptionKeyword");
    const assessmentResult = new AssessmentResult();
    const calculatedResult = this.calculateResult(i18n);

    assessmentResult.setScore(calculatedResult.score);
    assessmentResult.setText(calculatedResult.resultText);

    return assessmentResult;
  }

  /**
   * Returns the result object based on the number of keyword matches in the meta description.
   *
   * @param {Jed} i18n The object used for translations.
   *
   * @returns {Object} Result object with score and text.
   */
  calculateResult(i18n) {
    // GOOD result when the meta description contains a keyphrase or synonym 1 or 2 times.
    if (this._keyphraseCounts > 0) {
      return {
        score: this._config.scores.good,
        resultText: "Meta description contains a keyphrase",
      };
    }

    // BAD if the keyphrases is not contained in the meta description.
    return {
      score: this._config.scores.bad,
      resultText: "Keyphrases is not contained in the meta description."
    };
  }

  /**
   * Checks whether the paper has a keyword and a meta description.
   *
   * @param {Paper} paper The paper to use for the assessment.
   *
   * @returns {boolean} True if the paper has a keyword and a meta description.
   */
  isApplicable(paper) {
    return paper.hasKeyword() && paper.hasDescription();
  }
}

export default MetaDescriptionKeywordAssessment;