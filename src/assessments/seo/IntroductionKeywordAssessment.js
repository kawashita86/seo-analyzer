import { merge } from "lodash-es";

import Assessment from "../../assesment";
import AssessmentResult from "yoastseo/src/values/AssessmentResult";

class IntroductionKeywordAssessment extends Assessment {
  constructor( config = {} ) {
    super();

    const defaultConfig = {
      scores: {
        good: 10,
        bad: 0,
      }
    };

    this.identifier = "introductionKeyword";
    this._config = merge( defaultConfig, config );
  }

  getResult( paper, researcher, i18n ) {
    const assessmentResult = new AssessmentResult();

    this._matchInFirsts300 = researcher.getResearch( "keywordInFirsts300Chars" );
    const calculatedResult = this.calculateResult( i18n );

    assessmentResult.setScore( calculatedResult.score );
    assessmentResult.setText( calculatedResult.resultText );

    return assessmentResult;
  }

  isApplicable( paper ) {
    return paper.hasKeyword() && paper.hasText();
  }

  calculateResult( i18n ) {
    if ( this._matchInFirsts300 ) {
      return {
        score: this._config.scores.good,
        resultText: "Keyword is present in firsts 300 characters.",
      };
    }

    return {
      score: this._config.scores.bad,
      resultText: "Keyword is NOT present in firsts 300 characters.",
    };
  }
}

export default IntroductionKeywordAssessment;