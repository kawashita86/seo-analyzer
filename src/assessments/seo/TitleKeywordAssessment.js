import { escape, merge } from "lodash-es";

import Assessment from "../../assesment";
import AssessmentResult from "yoastseo/src/values/AssessmentResult";

/**
 * Assessment to check whether the keyword is included in (the beginning of) the SEO title.
 */
class TitleKeywordAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {Object} [config] The configuration to use.
     * @param {number} [config.parameters.recommendedPosition] The recommended position of the keyword within the title.
     * @param {number} [config.scores.good] The score to return if the keyword is found at the recommended position.
     * @param {number} [config.scores.okay] The score to return if the keyword is found, but not at the recommended position.
     * @param {number} [config.scores.bad] The score to return if there are fewer keyword occurrences than the recommended minimum.
     * @param {string} [config.url] The URL to the relevant article on Yoast.com.
     *
     * @returns {void}
     */
    constructor( config = {} ) {
        super();

        const defaultConfig = {
            scores: {
                good: 20,
                bad: 0,
            }
        };

        this.identifier = "titleKeyword";
        this._config = merge( defaultConfig, config );
    }

    /**
     * Executes the pagetitle keyword assessment and returns an assessment result.
     *
     * @param {Paper} paper The Paper object to assess.
     * @param {Researcher} researcher The Researcher object containing all available researches.
     * @param {Jed} i18n The object used for translations.
     *
     * @returns {AssessmentResult} The result of the assessment with text and score.
     */
    getResult( paper, researcher, i18n ) {
        this._keywordMatches = researcher.getResearch( "findKeywordInPageTitle" );
        this._keyword = escape( paper.getKeyword() );

        const assessmentResult = new AssessmentResult();

        const calculatedResult = this.calculateResult( i18n, this._keyword );
        assessmentResult.setScore( calculatedResult.score );
        assessmentResult.setText( calculatedResult.resultText );

        return assessmentResult;
    }

    /**
     * Checks whether the assessment is applicable to the paper
     *
     * @param {Paper} paper The Paper object to assess.
     *
     * @returns {boolean} Whether the paper has a keyword and a title.
     */
    isApplicable( paper ) {
        return paper.hasKeyword() && paper.hasTitle();
    }

    /**
     * Calculates the result based on whether and how the keyphrase was matched in the title. Returns GOOD result if
     * an exact match of the keyword is found in the beginning of the title. Returns OK results if all content words
     * from the keyphrase are in the title (in any form). Returns BAD otherwise.
     *
     * @param {Jed} i18n The object used for translations.
     * @param {string} keyword The keyword of the paper (to be returned in the feedback strings).
     *
     * @returns {Object} Object with score and text.
     */
    calculateResult( i18n, keyword ) {
        const exactMatchFound = this._keywordMatches.exactMatchFound;
        const allWordsFound = this._keywordMatches.allWordsFound;
        const exactMatchKeyphrase = this._keywordMatches.exactMatchKeyphrase;

        if ( exactMatchFound === true ) {
            return {
                score: this._config.scores.good,
                resultText:
                        "Keyphrase in title: The exact match of the keyphrase appears in the SEO title."
            };
        }

        if ( allWordsFound || exactMatchKeyphrase) {
            return {
                score: this._config.scores.bad,
                resultText:  "Keyphrase in title: Does not contain the exact match. Try to write the exact match of " +
                        "your keyphrase in the SEO title."
            };
        }

        return {
            score: this._config.scores.bad,
            resultText: i18n.sprintf(
                    "Keyphrase in title: Not all the words from your keyphrase \"%1$s\" appear in the SEO title. " +
                    "Try to use the exact match of your keyphrase in the SEO title.",
                keyword
            ),
        };
    }
}

export default TitleKeywordAssessment;