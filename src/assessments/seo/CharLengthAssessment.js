import { inRange, merge } from "lodash-es";

import Assessment from "../../assesment";
import AssessmentResult from "yoastseo/src/values/AssessmentResult";

/**
 * Assessment that will test if the text is long enough.
 */
export default class CharLengthAssessment extends Assessment {
    /**
     * Sets the identifier and the config.
     *
     * @param {Object} [config] The configuration to use.
     *
     * @returns {void}
     */
    constructor( config = {} ) {
        super();

        const defaultConfig = {
            recommendedMinimum: 3000,
            slightlyBelowMinimum: 2800,
            belowMinimum: 200,
            veryFarBelowMinimum: 100,

            scores: {
                recommendedMinimum: 12.5,
                slightlyBelowMinimum: 0,
                belowMinimum: 0,
                farBelowMinimum: 0,
                veryFarBelowMinimum: 0,
            },

            cornerstoneContent: false,
        };

        this.identifier = "charLength";
        this._config = merge( defaultConfig, config );
    }

    /**
     * Execute the Assessment and return a result.
     *
     * @param {Paper} paper The Paper object to assess.
     * @param {Researcher} researcher The Researcher object containing all available researches.
     * @param {Jed} i18n The locale object.
     *
     * @returns {AssessmentResult} The result of the assessment, containing both a score and a descriptive text.
     */
    getResult( paper, researcher, i18n ) {
        const charCount = researcher.getResearch( "charCount" );
        const assessmentResult = new AssessmentResult();
        const calculatedResult = this.calculateResult( charCount, i18n );

        assessmentResult.setScore( calculatedResult.score );
        assessmentResult.setText( calculatedResult.resultText );

        return assessmentResult;
    }

    /**
     * Returns the score and the appropriate feedback string based on the current word count.
     *
     * @param {number} wordCount The amount of words to be checked against.
     * @param {Jed} i18n The locale object.
     *
     * @returns {Object} The score and the feedback string.
     */
    calculateResult( charCount, i18n ) {
        if ( charCount >= this._config.recommendedMinimum ) {
            return {
                score: this._config.scores.recommendedMinimum,
                resultText: i18n.sprintf(
                    i18n.dngettext(
                        "js-text-analysis",
                        /* Translators: %1$d expands to the number of words in the text,
                         expands to a link on yoast.com,  expands to the anchor end tag */
                        "Text length: The text contains %1$d chars. Good job!",
                        "Text length: The text contains %1$d chars. Good job!",
                        charCount ),
                    charCount,
                ),
            };
        }

        if ( inRange( charCount, 0, this._config.belowMinimum ) ) {
            let badScore = this._config.scores.farBelowMinimum;

            if ( inRange( charCount, 0, this._config.veryFarBelowMinimum ) ) {
                badScore = this._config.scores.veryFarBelowMinimum;
            }

            return {
                score: badScore,
                resultText: i18n.sprintf(
                    i18n.dngettext(
                        "js-text-analysis",
                        /* Translators: %1$d expands to the number of words in the text,
                         expands to a link on yoast.com,  expands to the anchor end tag. */
                        "Text length: The text contains %1$d char.",
                        "Text length: The text contains %1$d chars.",
                        charCount
                    ) + " " + i18n.dngettext(
                    "js-text-analysis",
                    /* Translators: The preceding sentence is "Text length: The text contains x words.",
                     expands to a link on yoast.com,
                     expands to the anchor end tag,
                    %2$d expands to the recommended minimum of words. */
                    "This is far below the recommended minimum of %2$d char. Add more content.",
                    "This is far below the recommended minimum of %2$d chars. Add more content.",
                    this._config.recommendedMinimum
                    ),
                    charCount,
                    this._config.recommendedMinimum
                ),
            };
        }

        if ( inRange( charCount, this._config.slightlyBelowMinimum, this._config.recommendedMinimum ) ) {
            if ( this._config.cornerstoneContent === false ) {
                return {
                    score: this._config.scores.slightlyBelowMinimum,
                    resultText: i18n.sprintf(
                        i18n.dngettext(
                            "js-text-analysis",
                            /* Translators: %1$d expands to the number of words in the text,
                             expands to a link on yoast.com,  expands to the anchor end tag. */
                            "Text length: The text contains %1$d char.",
                            "Text length: The text contains %1$d chars.",
                            charCount
                        ) + " " + i18n.dngettext(
                        "js-text-analysis",
                        /* Translators: The preceding sentence is "Text length: The text contains x words.",
                         expands to a link on yoast.com,
                         expands to the anchor end tag,
                        %2$d expands to the recommended minimum of words. */
                        "This is slightly below the recommended minimum of %2$d char. Add a bit more copy.",
                        "This is slightly below the recommended minimum of %2$d chars. Add a bit more copy.",
                        this._config.recommendedMinimum
                        ),
                        charCount,
                        this._config.recommendedMinimum
                    ),
                };
            }

            return {
                score: this._config.scores.slightlyBelowMinimum,
                resultText: i18n.sprintf(
                    i18n.dngettext(
                        "js-text-analysis",
                        /* Translators: %1$d expands to the number of words in the text,
                         expands to a link on yoast.com,  expands to the anchor end tag. */
                        "Text length: The text contains %1$d char.",
                        "Text length: The text contains %1$d chars.",
                        charCount
                    ) + " " + i18n.dngettext(
                    "js-text-analysis",
                    /* Translators: The preceding sentence is "Text length: The text contains x words.",
                     expands to a link on yoast.com,
                     expands to the anchor end tag,
                    %2$d expands to the recommended minimum of words. */
                    "This is below the recommended minimum of %3$d char. Add more content.",
                    "This is below the recommended minimum of %3$d chars. Add more content.",
                    this._config.recommendedMinimum
                    ),
                    charCount,
                    this._config.recommendedMinimum
                ),
            };
        }

        return {
            score: this._config.scores.belowMinimum,
            resultText: i18n.sprintf(
                i18n.dngettext(
                    "js-text-analysis",
                    /* Translators: %1$d expands to the number of words in the text,
                     expands to a link on yoast.com,  expands to the anchor end tag. */
                    "Text length: The text contains %1$d char.",
                    "Text length: The text contains %1$d chars.",
                    charCount
                ) + " " + i18n.dngettext(
                "js-text-analysis",
                /* Translators: The preceding sentence is "Text length: The text contains x words.",
                 expands to a link on yoast.com,
                 expands to the anchor end tag,
                %2$d expands to the recommended minimum of words. */
                "This is below the recommended minimum of %2$d char. Add more content.",
                "This is below the recommended minimum of %2$d chars. Add more content.",
                this._config.recommendedMinimum
                ),
                charCount,
                this._config.recommendedMinimum
            ),
        };
    }
}