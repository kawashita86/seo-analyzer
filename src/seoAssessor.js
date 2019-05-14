import IntroductionKeywordAssessment from "./assessments/seo/IntroductionKeywordAssessment";
//import KeyphraseLengthAssessment from "yoastseo/src/assessments/seo/KeyphraseLengthAssessment";
import KeywordDensityAssessment from "./assessments/seo/KeywordDensityAssessment";
import MetaDescriptionKeywordAssessment from "./assessments/seo/MetaDescriptionKeywordAssessment";
//import TextCompetingLinksAssessment from "yoastseo/src/assessments/seo/TextCompetingLinksAssessment";
//import InternalLinksAssessment from "yoastseo/src/assessments/seo/InternalLinksAssessment";
import TitleKeywordAssessment from "./assessments/seo/TitleKeywordAssessment";
//import UrlKeywordAssessment from "yoastseo/src/assessments/seo/UrlKeywordAssessment";
import Assessor from "./assessor";
//import MetaDescriptionLength from "yoastseo/src/assessments/seo/MetaDescriptionLengthAssessment";
import SubheadingsKeyword from "yoastseo/src/assessments/seo/SubHeadingsKeywordAssessment";
//import TextImages from "yoastseo/src/assessments/seo/TextImagesAssessment";
//import TextLength from "yoastseo/src/assessments/seo/TextLengthAssessment";
//import OutboundLinks from "yoastseo/src/assessments/seo/OutboundLinksAssessment";
import TitleWidth from "yoastseo/src/assessments/seo/PageTitleWidthAssessment";
//import FunctionWordsInKeyphrase from "yoastseo/src/assessments/seo/FunctionWordsInKeyphraseAssessment";
//import SingleH1Assessment from "yoastseo/src/assessments/seo/SingleH1Assessment";
import CharLengthAssessment from "./assessments/seo/CharLengthAssessment";
import TitleKeywordPositionAssessment from "./assessments/seo/TitleKeywordPositionAssessment";
import H2KeywordAssessment from "./assessments/seo/H2KeywordAssessment";
import LinkWithKeywordAssessment from "./assessments/seo/LinkWithKeywordAssessment";

/**
 * Creates the Assessor
 *
 * @param {object} i18n The i18n object used for translations.
 * @param {Object} options The options for this assessor.
 * @param {Object} options.marker The marker to pass the list of marks to.
 *
 * @constructor
 */

export default class SEOAssessor extends Assessor {
  constructor(i18n, options) {
    super(i18n, options);

    this.type = "SEOAssessor";
    this._assessments = [
      new IntroductionKeywordAssessment(),
      //new KeyphraseLengthAssessment(),
      new KeywordDensityAssessment(),
      new MetaDescriptionKeywordAssessment(),
      //new MetaDescriptionLength(),
      new SubheadingsKeyword(),
      // new TextCompetingLinksAssessment(),
      //new TextImages(),
      //new TextLength(),
      //new OutboundLinks(),
      new TitleKeywordAssessment(),
      new TitleKeywordPositionAssessment(),
      // new InternalLinksAssessment(),
      new TitleWidth(),
      //new UrlKeywordAssessment(),
      //new FunctionWordsInKeyphrase(),
      //new SingleH1Assessment(),
      new CharLengthAssessment(),
      new H2KeywordAssessment(),
      new LinkWithKeywordAssessment(),
    ];
  }
}
