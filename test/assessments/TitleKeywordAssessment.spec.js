import TitleKeywordAssessment from "../../src/assessments/seo/TitleKeywordAssessment";
import Paper from "yoastseo/src/values/Paper";
import Factory from "../testHelpers/factory";

const i18n = Factory.buildJed();

describe( "an assessment to check if the keyword is in the pageTitle", function() {

    it( "returns an assementresult with an exact match of the keyword found", function() {
        const paper = new Paper( "", {
            keyword: "keyword",
            title: "keyword and the rest of this non-empty title",
        } );
        const assessment = new TitleKeywordAssessment().getResult(
            paper,
            Factory.buildMockResearcher( { exactMatchFound: true, allWordsFound: true, position: 0, exactMatchKeyphrase: false } ),
            i18n );

        expect( assessment.getScore() ).toBe( 30 );
        expect( assessment.getText() ).toBe(
            "Keyphrase in title: The exact match of the keyphrase appears in the SEO title."
        );
    } );

    it( "returns an assementresult with keyword not found", function() {
        const paper = new Paper( "", {
            keyword: "keyword",
            title: "a non-empty title",
        } );
        const assessment = new TitleKeywordAssessment().getResult(
            paper,
            Factory.buildMockResearcher( { exactMatchFound: false, allWordsFound: false, position: -1, exactMatchKeyphrase: false } ),
            i18n );

        expect( assessment.getScore() ).toBe( 0 );
        expect( assessment.getText() ).toBe(
            "Keyphrase in title: Not all the words from your " +
            "keyphrase \"keyword\" appear in the SEO title. Try to " +
            "use the exact match of your keyphrase in the SEO title."
        );
    } );

    it( "returns an assement result with keyword not found at all", function() {
        const paper = new Paper( "", {
            keyword: "keyword",
            title: "a non-empty title",
        } );
        const assessment = new TitleKeywordAssessment().getResult(
            paper,
            Factory.buildMockResearcher( { exactMatchFound: false, allWordsFound: true, position: -1, exactMatchKeyphrase: false  } ),
            i18n );

        expect( assessment.getScore() ).toBe( 0 );
        expect( assessment.getText() ).toBe(
            "Keyphrase in title: Does not contain the exact match. " +
            "Try to write the exact match of your keyphrase in the SEO title."
        );
    } );

    it( "returns a bad result for an exact match keyphrase when the word order of the keyphrase is different in the title", function() {
        const paper = new Paper( "", {
            keyword: "\"cats and dogs\"",
            title: "dogs and cats",
        } );
        const assessment = new TitleKeywordAssessment().getResult(
            paper,
            Factory.buildMockResearcher( { exactMatchFound: false, allWordsFound: false, position: 0, exactMatchKeyphrase: true } ),
            i18n );

        expect( assessment.getScore() ).toBe( 0 );
        expect( assessment.getText() ).toBe(
            "Keyphrase in title: Does not contain the exact match. " +
            "Try to write the exact match of your keyphrase in the SEO title."
        );
    } );


    it( "returns false isApplicable for a paper without title", function() {
        const isApplicableResult = new TitleKeywordAssessment().isApplicable( new Paper( "", { keyword: "some keyword", title: "" } ) );
        expect( isApplicableResult ).toBe( false );
    } );

    it( "returns false isApplicable for a paper without keyword", function() {
        const isApplicableResult = new TitleKeywordAssessment().isApplicable( new Paper( "", { keyword: "", title: "some title" } ) );
        expect( isApplicableResult ).toBe( false );
    } );
} );