import MissingArgument from "yoastseo/src/errors/missingArgument";
import AssessmentResult from "yoastseo/src/values/AssessmentResult.js";
import {showTrace} from "yoastseo/src/helpers/errors.js";
import Researcher from "./researcher";

const ScoreRating = 9;

export default class Assessor {
  constructor(i18n, options = {}) {
    this.setI18n(i18n);
    this.options = options;
    this.assessments = [];

    if (this.options.hasOwnProperty('researcher')) {
      this.researcher = this.options.researcher;
    }
  }

  setI18n(i18n) {
    if (typeof i18n === "undefined") {
      throw new MissingArgument("The assessor requires an i18n object.");
    }
    this.i18n = i18n;
  }

  getAvailableAssessments() {
    return this.assessments;
  }

  static isApplicable(assessment, paper, researcher) {
    if (assessment.hasOwnProperty("isApplicable") || typeof Assessor.isApplicable === "function") {
      return Assessor.isApplicable(paper, researcher);
    }

    return true;
  }

  getPaper() {
    return this.lastPaper;
  }

  assess(paper) {
    if (typeof this.researcher === "undefined") {
      this.researcher = new Researcher(paper);
    } else {
      this.researcher.setPaper(paper);
    }

    let assessments = this.getAvailableAssessments();
    this.results = [];

    assessments = assessments.filter((assessment) => Assessor.isApplicable(assessment, paper, this.researcher));

    this.results = assessments.map(assessment => this.executeAssessment(paper, this.researcher, assessment));

    this.lastPaper = paper;
  }

  executeAssessment(paper, researcher, assessment) {
    let result;

    try {
      result = assessment.getResult(paper, researcher, this.i18n);
      result.setIdentifier(assessment.identifier);

    } catch (assessmentError) {
      showTrace(assessmentError);

      result = new AssessmentResult();

      result.setScore(-1);
      result.setText(this.i18n.sprintf(
        /* Translators: %1$s expands to the name of the assessment. */
        this.i18n.dgettext("js-text-analysis", "An error occurred in the '%1$s' assessment"),
        assessment.identifier,
        assessmentError
      ));
    }
    return result;
  }

  getValidResults() {
    return this.results ? this.results.filter(result => Assessor.isValidResult(result)) : [];
  }

  static isValidResult(assessmentResult) {
    return assessmentResult.hasScore() && assessmentResult.hasText();
  }

  calculateOverallScore() {
    const results = this.getValidResults();
    let totalScore = 0;

    results.forEach(assessmentResult => totalScore += assessmentResult.getScore());

    return Math.round(totalScore / (results.length * ScoreRating) * 100) || 0;
  }

  addAssessment(name, assessment) {
    if (!assessment.hasOwnProperty("identifier")) {
      assessment.identifier = name;
    }

    this.assessments.push(assessment);
    return true;
  }

  removeAssessment(name) {
    const toDelete = this.assessments.findIndex(assessment =>
      assessment.hasOwnProperty("identifier") && name === assessment.identifier);

    if (-1 !== toDelete) {
      this.assessments.splice(toDelete, 1);
    }
  }

  getAssessment(identifier) {
    return this.assessments.find(assessment =>
      assessment.hasOwnProperty("identifier") && identifier === assessment.identifier
    );
  }

  getApplicableAssessments() {
    const availableAssessments = this.getAvailableAssessments();
    return availableAssessments.filter(availableAssessment =>
      Assessor.isApplicable(availableAssessment, this.getPaper())
    );
  }
}
