
import sentences from "yoastseo/src/researches/sentences";

import { merge } from "lodash-es";
import InvalidTypeError from "yoastseo/src/errors/invalidType";
import MissingArgument from "yoastseo/src/errors/missingArgument";
import { isUndefined } from "lodash-es";
import { isEmpty } from "lodash-es";

// Researches
import wordCountInText from "yoastseo/src/researches/wordCountInText.js";

//import getLinkStatistics from "yoastseo/src/researches/getLinkStatistics.js";
import linkCount from "yoastseo/src/researches/countLinks.js";
import getLinks from "yoastseo/src/researches/getLinks.js";
import urlLength from "yoastseo/src/researches/urlIsTooLong.js";
import findKeywordInPageTitle from "yoastseo/src/researches/findKeywordInPageTitle.js";
import matchKeywordInSubheadings from "yoastseo/src/researches/matchKeywordInSubheadings.js";
import getKeywordDensity from "yoastseo/src/researches/getKeywordDensity.js";
import keywordCount from "yoastseo/src/researches/keywordCount";
//import stopWordsInKeyword from "yoastseo/src/researches/stopWordsInKeyword";
//import stopWordsInUrl from "yoastseo/src/researches/stopWordsInUrl";
//import calculateFleschReading from "yoastseo/src/researches/calculateFleschReading.js";
import metaDescriptionLength from "yoastseo/src/researches/metaDescriptionLength.js";
import imageCount from "yoastseo/src/researches/imageCountInText.js";
import altTagCount from "yoastseo/src/researches/imageAltTags.js";
import keyphraseLength from "yoastseo/src/researches/keyphraseLength";
import metaDescriptionKeyword from "yoastseo/src/researches/metaDescriptionKeyword.js";
import keywordCountInUrl from "yoastseo/src/researches/keywordCountInUrl";
import findKeywordInFirstParagraph from "yoastseo/src/researches/findKeywordInFirstParagraph.js";
import pageTitleWidth from "yoastseo/src/researches/pageTitleWidth.js";
//import wordComplexity from "yoastseo/src/researches/getWordComplexity.js";
//import getParagraphLength from "yoastseo/src/researches/getParagraphLength.js";
//import countSentencesFromText from "yoastseo/src/researches/countSentencesFromText.js";
//import countSentencesFromDescription from "yoastseo/src/researches/countSentencesFromDescription.js";
import getSubheadingTextLengths from "yoastseo/src/researches/getSubheadingTextLengths.js";
//import findTransitionWords from "yoastseo/src/researches/findTransitionWords.js";
//import passiveVoice from "yoastseo/src/researches/getPassiveVoice.js";
//import getSentenceBeginnings from "yoastseo/src/researches/getSentenceBeginnings.js";
//import relevantWords from "yoastseo/src/researches/relevantWords";
//import readingTime from "yoastseo/src/researches/readingTime";
//import getTopicDensity from "yoastseo/src/researches/getTopicDensity";
//import topicCount from "yoastseo/src/researches/topicCount";
import { keyphraseDistributionResearcher } from "yoastseo/src/researches/keyphraseDistribution";
const keyphraseDistribution = keyphraseDistributionResearcher;
import { research as morphology } from "yoastseo/src/researches/buildKeywordForms";
import functionWordsInKeyphrase from "yoastseo/src/researches/functionWordsInKeyphrase";
import h1s from "yoastseo/src/researches/h1s";
import charCountIntText from "./researches/charCountIntText";

/**
 * This contains all possible, default researches.
 * @param {Paper} paper The Paper object that is needed within the researches.
 * @constructor
 * @throws {InvalidTypeError} Parameter needs to be an instance of the Paper object.
 */
var Researcher = function( paper ) {
  this.setPaper( paper );

  this.defaultResearches = {
    urlLength: urlLength,
    wordCountInText: wordCountInText,
    findKeywordInPageTitle: findKeywordInPageTitle,
    //calculateFleschReading: calculateFleschReading,
    //getLinkStatistics: getLinkStatistics,
    getLinks: getLinks,
    linkCount: linkCount,
    imageCount: imageCount,
    altTagCount: altTagCount,
    matchKeywordInSubheadings: matchKeywordInSubheadings,
    keywordCount: keywordCount,
    getKeywordDensity: getKeywordDensity,
    //stopWordsInKeyword: stopWordsInKeyword,
    //stopWordsInUrl: stopWordsInUrl,
    metaDescriptionLength: metaDescriptionLength,
    keyphraseLength: keyphraseLength,
    keywordCountInUrl: keywordCountInUrl,
    firstParagraph: findKeywordInFirstParagraph,
    metaDescriptionKeyword: metaDescriptionKeyword,
    pageTitleWidth: pageTitleWidth,
    //wordComplexity: wordComplexity,
    //getParagraphLength: getParagraphLength,
    //countSentencesFromText: countSentencesFromText,
    //countSentencesFromDescription: countSentencesFromDescription,
    getSubheadingTextLengths: getSubheadingTextLengths,
    //findTransitionWords: findTransitionWords,
    //passiveVoice: passiveVoice,
    //getSentenceBeginnings: getSentenceBeginnings,
    //relevantWords: relevantWords,
    //readingTime: readingTime,
    //getTopicDensity: getTopicDensity,
    //topicCount: topicCount,
    sentences,
    keyphraseDistribution: keyphraseDistribution,
    morphology: morphology,
    functionWordsInKeyphrase: functionWordsInKeyphrase,
    h1s: h1s,
    charCountIntText: charCountIntText
  };

  this._data = {};

  this.customResearches = {};
};

/**
 * Set the Paper associated with the Researcher.
 * @param {Paper} paper The Paper to use within the Researcher
 * @throws {InvalidTypeError} Parameter needs to be an instance of the Paper object.
 * @returns {void}
 */
Researcher.prototype.setPaper = function( paper ) {
  this.paper = paper;
};

/**
 * Add a custom research that will be available within the Researcher.
 * @param {string} name A name to reference the research by.
 * @param {function} research The function to be added to the Researcher.
 * @throws {MissingArgument} Research name cannot be empty.
 * @throws {InvalidTypeError} The research requires a valid Function callback.
 * @returns {void}
 */
Researcher.prototype.addResearch = function( name, research ) {
  if ( isUndefined( name ) || isEmpty( name ) ) {
    throw new MissingArgument( "Research name cannot be empty" );
  }

  if ( ! ( research instanceof Function ) ) {
    throw new InvalidTypeError( "The research requires a Function callback." );
  }

  this.customResearches[ name ] = research;
};

/**
 * Check whether or not the research is known by the Researcher.
 * @param {string} name The name to reference the research by.
 * @returns {boolean} Whether or not the research is known by the Researcher
 */
Researcher.prototype.hasResearch = function( name ) {
  return Object.keys( this.getAvailableResearches() ).filter(
      function( research ) {
        return research === name;
      } ).length > 0;
};

/**
 * Return all available researches.
 * @returns {Object} An object containing all available researches.
 */
Researcher.prototype.getAvailableResearches = function() {
  return merge( this.defaultResearches, this.customResearches );
};

/**
 * Return the Research by name.
 * @param {string} name The name to reference the research by.
 *
 * @returns {*} Returns the result of the research or false if research does not exist.
 * @throws {MissingArgument} Research name cannot be empty.
 */
Researcher.prototype.getResearch = function( name ) {
  if ( isUndefined( name ) || isEmpty( name ) ) {
    throw new MissingArgument( "Research name cannot be empty" );
  }

  if ( ! this.hasResearch( name ) ) {
    return false;
  }

  return this.getAvailableResearches()[ name ]( this.paper, this );
};

/**
 * Add research data to the researcher by the research name.
 *
 * @param {string} research The identifier of the research.
 * @param {Object} data     The data object.
 *
 * @returns {void}.
 */
Researcher.prototype.addResearchData = function( research, data ) {
  this._data[ research ] = data;
};

/**
 * Return the research data from a research data provider by research name.
 *
 * @param {string} research The identifier of the research.
 *
 * @returns {*} The data provided by the provider, false if the data do not exist
 */
Researcher.prototype.getData = function( research ) {
  if ( this._data.hasOwnProperty( research ) ) {
    return this._data[ research ];
  }

  return false;
};

export default Researcher;