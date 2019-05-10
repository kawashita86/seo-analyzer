import Assessor from "./assessor.js";

/*
	Temporarily disabled:

	var wordComplexity = require( "./assessments/wordComplexityAssessment.js" );
	var sentenceLengthInDescription = require( "./assessments/sentenceLengthInDescriptionAssessment.js" );
 */

import scoreToRating from "yoastseo/src/interpreters/scoreToRating";

/**
 * Creates the Assessor
 *
 * @param {object} i18n The i18n object used for translations.
 * @param {Object} options The options for this assessor.
 * @param {Object} options.marker The marker to pass the list of marks to.
 * @param {string} options.locale The locale.
 *
 * @constructor
 */
export default class ContentAssessor extends Assessor {
  constructor(i18n, options = {}) {
    super(i18n, options);
    this.type = "ContentAssessor";
    this.locale = (options.hasOwnProperty("locale")) ? options.locale : "en_US";

    this._assessments = [
      //new FleschReadingEase( contentConfiguration( locale ).fleschReading ),
      //new SubheadingDistributionTooLong(),
      //paragraphTooLong,
      //new SentenceLengthInText( contentConfiguration( locale ).sentenceLength ),
      //transitionWords,
      //passiveVoice,
      //textPresence,
      //sentenceBeginnings,
      // Temporarily disabled: wordComplexity,
    ];
  }

  static calculatePenaltyPointsFullSupport(rating) {
    switch (rating) {
      case "bad":
        return 3;
      case "ok":
        return 2;
      default:
      case "good":
        return 0;
    }
  }

  static calculatePenaltyPointsPartialSupport(rating) {
    switch (rating) {
      case "bad":
        return 4;
      case "ok":
        return 2;
      default:
      case "good":
        return 0;
    }
  }

  _allAssessmentsSupported() {
    const numberOfAssessments = 8;
    const applicableAssessments = this.getApplicableAssessments();
    return applicableAssessments.length === numberOfAssessments;
  };

  calculatePenaltyPoints() {
    const results = this.getValidResults();

    const penaltyPoints = results.map(result => {
      const rating = scoreToRating(result.getScore());

      if (this._allAssessmentsSupported()) {
        return ContentAssessor.calculatePenaltyPointsFullSupport(rating);
      }

      return ContentAssessor.calculatePenaltyPointsPartialSupport(rating);
    });

    return penaltyPoints.reduce((acc, n) => acc + n);
  }

  _ratePenaltyPoints(totalPenaltyPoints) {
    if (this.getValidResults().length === 1) {
      // If we have only 1 result, we only have a "no content" result
      return 30;
    }

    if (this._allAssessmentsSupported()) {
      // Determine the total score based on the total penalty points.
      if (totalPenaltyPoints > 6) {
        // A red indicator.
        return 30;
      }

      if (totalPenaltyPoints > 4) {
        // An orange indicator.
        return 60;
      }
    } else {
      if (totalPenaltyPoints > 4) {
        // A red indicator.
        return 30;
      }

      if (totalPenaltyPoints > 2) {
        // An orange indicator.
        return 60;
      }
    }
    // A green indicator.
    return 90;
  }

  calculateOverallScore() {
    const results = this.getValidResults();

    // If you have no content, you have a red indicator.
    if (results.length === 0) {
      return 30;
    }

    const totalPenaltyPoints = this.calculatePenaltyPoints();

    return this._ratePenaltyPoints(totalPenaltyPoints);
  }
}
