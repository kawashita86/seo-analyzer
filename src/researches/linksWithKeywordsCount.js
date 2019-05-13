import getAnchors from "yoastseo/src/stringProcessing/getAnchorsFromText.js";
import findKeywordInUrl from "yoastseo/src/stringProcessing/findKeywordInUrl.js";
import urlHelper from "yoastseo/src/stringProcessing/url.js";
import parseSynonyms from "yoastseo/src/stringProcessing/parseSynonyms";
import {buildForms} from "yoastseo/src/researches/buildKeywordForms";
import getLanguage from "yoastseo/src/helpers/getLanguage";

import {flatten} from "lodash-es";
import {findWordFormsInString} from "yoastseo/src/researches/findKeywordFormsInString";

const linkToSelf = function (anchor, permalink) {
  const anchorLink = urlHelper.getFromAnchorTag(anchor);

  return urlHelper.areEqual(anchorLink, permalink);
};

const filterAnchorsLinkingToSelf = function (anchors, permalink) {
  const anchorsLinkingToSelf = anchors.map(function (anchor) {
    return linkToSelf(anchor, permalink);
  });

  anchors = anchors.filter(function (anchor, index) {
    return anchorsLinkingToSelf[index] === false;
  });

  return anchors;
};

const filterAnchorsContainingTopic = function (anchors, topicForms, locale) {
  const anchorsContainingKeyphraseOrSynonyms = anchors.map(function (anchor) {
    return findKeywordInUrl(anchor, topicForms, locale);
  });
  anchors = anchors.filter(function (anchor, index) {
    return anchorsContainingKeyphraseOrSynonyms[index] === true;
  });

  return anchors;
};

const filterAnchorsContainedInTopic = function (anchors, keyphraseAndSynonyms, locale, morphologyData) {
  const anchorsContainedInTopic = [];

  anchors.forEach(function (currentAnchor) {
    // Generate the forms of the content words from within the anchor.
    const linkTextForms = buildForms(currentAnchor, getLanguage(locale), morphologyData);

    for (let j = 0; j < keyphraseAndSynonyms.length; j++) {
      const topic = keyphraseAndSynonyms[j];
      if (findWordFormsInString(linkTextForms, topic, locale).percentWordMatches === 100) {
        anchorsContainedInTopic.push(true);
        break;
      }
    }
  });

  anchors = anchors.filter(function (anchor, index) {
    return anchorsContainedInTopic[index] === true;
  });

  return anchors;
};

const keywordInAnchor = function (paper, researcher, anchors, permalink) {
  const result = [];

  const keyword = paper.getKeyword();

  // If no keyword is set, return empty result.
  if (keyword === "") {
    return result;
  }

  // Filter out anchors that point at the paper itself.
  anchors = filterAnchorsLinkingToSelf(anchors, permalink);
  if (anchors.length === 0) {
    return result;
  }

  const locale = paper.getLocale();
  const topicForms = researcher.getResearch("morphology");

  // Check if any anchors contain keyphrase or synonyms in them.
  anchors = filterAnchorsContainingTopic(anchors, topicForms, locale);
  if (anchors.length === 0) {
    return result;
  }

  // Check if content words from the anchors are all within the keyphrase or the synonyms.
  const synonyms = paper.getSynonyms();
  const keyphraseAndSynonyms = flatten([].concat(keyword, parseSynonyms(synonyms)));
  const morphologyData = researcher.getData("morphology")[getLanguage(locale)] || false;

  return filterAnchorsContainedInTopic(anchors, keyphraseAndSynonyms, locale, morphologyData);
};

export default (paper, researcher) => {
  const anchors = getAnchors(paper.getText());
  const permalink = paper.getPermalink();

  return (keywordInAnchor(paper, researcher, anchors, permalink)).length;
};