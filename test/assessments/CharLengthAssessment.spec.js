import CharLengthAssessment from "../../src/assessments/seo/CharLengthAssessment.js";
import Paper from "yoastseo/src/values/Paper.js";
import Factory from "../testHelpers/factory.js";
var i18n = Factory.buildJed();

const charCountAssessment = new CharLengthAssessment();

describe( "A char count assessment", function() {
    it( "assesses a single char", function() {
        var mockPaper = new Paper( "sample" );
        var assessment = charCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( 1 ), i18n );

        expect( assessment.getScore() ).toEqual( -20 );
        expect( assessment.getText() ).toEqual( "Text length: The text contains 1 char. This is far below the recommended minimum of 3000 chars. Add more content." );
    } );

    it( "assesses a low char count", function() {
        var mockPaper = new Paper( "These are just five chars" );
        var assessment = charCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( 5 ), i18n );

        expect( assessment.getScore() ).toEqual( -20 );
        expect( assessment.getText() ).toEqual( "Text length: The text contains 5 chars. This is far below the recommended minimum of 3000 chars. Add more content." );
    } );

    it( "assesses a medium char count", function() {
        var mockPaper = new Paper( Factory.buildMockString( "Sample ", 150 ) );
        var assessment = charCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( 150 ), i18n );

        expect( assessment.getScore() ).toEqual( -10 );
        expect( assessment.getText() ).toEqual( "Text length: The text contains 150 chars. This is far below the recommended minimum of 3000 chars. Add more content." );
    } );

    it( "assesses a slightly higher than medium char count", function() {
        var mockPaper = new Paper( Factory.buildMockString( "Sample ", 2250 ) );
        var assessment = charCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( 2250 ), i18n );

        expect( assessment.getScore() ).toEqual( 3 );
        expect( assessment.getText() ).toEqual( "Text length: The text contains 2250 chars. This is below the recommended minimum of 3000 chars. Add more content." );
    } );

    it( "assesses an almost at the recommended amount, char count", function() {
        var mockPaper = new Paper( Factory.buildMockString( "Sample ", 2800 ) );
        var assessment = charCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( 2800 ), i18n );

        expect( assessment.getScore() ).toEqual( 6 );
        expect( assessment.getText() ).toEqual( "Text length: The text contains 2800 chars. This is slightly below the recommended minimum of 3000 chars. Add a bit more copy." );
    } );


    it( "assesses high char count", function() {
        var mockPaper = new Paper( Factory.buildMockString( "Sample ", 3000 ) );
        var assessment = charCountAssessment.getResult( mockPaper, Factory.buildMockResearcher( 3000 ), i18n );

        expect( assessment.getScore() ).toEqual( 9 );
        expect( assessment.getText() ).toEqual( "Text length: The text contains 3000 chars. Good job!" );
    } );

} );