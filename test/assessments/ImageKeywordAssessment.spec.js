import ImageKeywordAssessment from "../../src/assessments/seo/ImageKeywordAssessment";
import Paper from "../../src/values/Paper.js";
import Factory from "../testHelpers/factory";

const i18n = Factory.buildJed();

describe( "an assessment to check if the keyword is in the image", function() {

    it( "returns an assementresult with an exact match of the keyword found", function() {
        const paper = new Paper( "", {
            keyword: "keyword",
            alt: "keyword and the rest of this non-empty alt",
        } );
        const assessment = new ImageKeywordAssessment().getResult(
            paper,
            Factory.buildMockResearcher(1),
            i18n );

        expect( assessment.getScore() ).toBe( 5 );
        expect( assessment.getText() ).toBe(
          "Keyword is present in image."
        );
    } );

    it( "returns an assementresult with keyword not found", function() {
        const paper = new Paper( "", {
            keyword: "keyword",
            alt: "a non-empty alt",
        } );
        const assessment = new ImageKeywordAssessment().getResult(
            paper,
            Factory.buildMockResearcher(0),
            i18n );

        expect( assessment.getScore() ).toBe( 0 );
        expect( assessment.getText() ).toBe(
          "Keyword is NOT present in image."
        );
    } );

    it( "returns an assement result with keyword not found at all", function() {
        const paper = new Paper( "", {
            keyword: "keyword",
            alt: "a non-empty alt",
        } );
        const assessment = new ImageKeywordAssessment().getResult(
            paper,
            Factory.buildMockResearcher(0),
            i18n );

        expect( assessment.getScore() ).toBe( 0 );
        expect( assessment.getText() ).toBe(
            "Keyword is NOT present in image."
        );
    } );

    it( "returns a bad result for an exact match keyphrase when the word order of the keyphrase is different in the alt", function() {
        const paper = new Paper( "", {
            keyword: "\"cats and dogs\"",
            alt: "dogs and cats",
        } );
        const assessment = new ImageKeywordAssessment().getResult(
            paper,
            Factory.buildMockResearcher(0),
            i18n );

        expect( assessment.getScore() ).toBe( 0 );
        expect( assessment.getText() ).toBe(
            "Keyword is NOT present in image."
        );
    } );


    it( "returns false isApplicable for a paper without alt", function() {
        const isApplicableResult = new ImageKeywordAssessment().isApplicable( new Paper( "", { keyword: "some keyword", alt: "" } ) );
        expect( isApplicableResult ).toBe( false );
    } );

    it( "returns false isApplicable for a paper without keyword", function() {
        const isApplicableResult = new ImageKeywordAssessment().isApplicable( new Paper( "", { keyword: "", alt: "some alt" } ) );
        expect( isApplicableResult ).toBe( false );
    } );
} );