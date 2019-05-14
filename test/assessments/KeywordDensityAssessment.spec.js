/* global describe it expect */
import KeywordDensityAssessment from "../../src/assessments/seo/KeywordDensityAssessment";
import Researcher from "../../src/researcher";
import Paper from "yoastseo/src/values/Paper.js";
import Mark from "yoastseo/src/values/Mark.js";
import factory from "../testHelpers/factory.js";

const i18n = factory.buildJed();

const nonkeyword = "nonkeyword, ";
const keyword = "keyword, ";

describe( "Tests for the keywordDensity assessment for languages without morphology", function() {
    it( "runs the keywordDensity on the paper without keyword", function() {
        const paper = new Paper( nonkeyword.repeat( 1000 ), { keyword: "keyword" } );
        const researcher = new Researcher( paper );
        const result = new KeywordDensityAssessment().getResult( paper, researcher, i18n );
        expect( result.getScore() ).toBe( 0 );
        expect( result.getText() ).toBe( "Keyphrase density: " +
            "The focus keyphrase was found 0 time. That's less than the recommended minimum of 10 times for a text of this length." +
            " Focus on your keyphrase!" );
    } );

    it( "runs the keywordDensity on the paper with a low keyphrase density (0.1%)", function() {
        const paper = new Paper( nonkeyword.repeat( 999 ) + keyword, { keyword: "keyword" } );
        const researcher = new Researcher( paper );
        const result = new KeywordDensityAssessment().getResult( paper, researcher, i18n );
        expect( result.getScore() ).toBe( 0 );
        expect( result.getText() ).toBe( "Keyphrase density: " +
            "The focus keyphrase was found 1 time. That's less than the recommended minimum of 10 times for a text of this length." +
            " Focus on your keyphrase!" );
    } );

    it( "runs the keywordDensity on the paper with a good keyphrase density (1%)", function() {
        const paper = new Paper( nonkeyword.repeat( 995 ) + keyword.repeat( 10 ), { keyword: "keyword" } );
        const researcher = new Researcher( paper );
        const result = new KeywordDensityAssessment().getResult( paper, researcher, i18n );
        expect( result.getScore() ).toBe( 10 );
        expect( result.getText() ).toBe( "Keyphrase density: " +
            "The focus keyphrase was found 10 time. This is great!" );
    } );

    it( "runs the keywordDensity on the paper with a good keyphrase density (2%)", function() {
        const paper = new Paper( nonkeyword.repeat( 980 ) + keyword.repeat( 20 ), { keyword: "keyword" } );
        const researcher = new Researcher( paper );
        const result = new KeywordDensityAssessment().getResult( paper, researcher, i18n );
        expect( result.getScore() ).toBe( 10 );
        expect( result.getText() ).toBe( "Keyphrase density: " +
            "The focus keyphrase was found 20 time. This is great!" );
    } );

    it( "runs the keywordDensity on the paper with a very high keyphrase density (10%)", function() {
        const paper = new Paper( nonkeyword.repeat( 900 ) + keyword.repeat( 100 ), { keyword: "keyword" } );
        const researcher = new Researcher( paper );
        const result = new KeywordDensityAssessment().getResult( paper, researcher, i18n );
        expect( result.getScore() ).toBe( 0 );
        expect( result.getText() ).toBe( "Keyphrase density: " +
            "The focus keyphrase was found 100 time. That's more than the recommended maximum of 38 times " +
            "for a text of this length. Don't overoptimize!" );
    } );


    it( "adjusts the keyphrase density based on the length of the keyword with the actual density remaining at 2% - short keyphrase", function() {
        const paper = new Paper( nonkeyword.repeat( 960 ) + "b c, ".repeat( 20 ), { keyword: "b c" } );
        const researcher = new Researcher( paper );
        const result = new KeywordDensityAssessment().getResult( paper, researcher, i18n );
        expect( result.getScore() ).toBe( 10 );
        expect( result.getText() ).toBe( "Keyphrase density: " +
            "The focus keyphrase was found 20 time. This is great!" );
    } );

    it( "adjusts the keyphrase density based on the length of the keyword with the actual density remaining at 2% - long keyphrase", function() {
        const paper = new Paper( nonkeyword.repeat( 900 ) + "b c d e f, ".repeat( 20 ), { keyword: "b c d e f" } );
        const researcher = new Researcher( paper );
        const result = new KeywordDensityAssessment().getResult( paper, researcher, i18n );
        expect( result.getScore() ).toBe( 0 );
        expect( result.getText() ).toBe( "Keyphrase density: " +
            "The focus keyphrase was found 20 time. That's more than the recommended maximum of 16 times " +
            "for a text of this length. Don't overoptimize!" );
    } );

    it( "returns a bad result if the keyword is only used once, regardless of the density", function() {
        const paper = new Paper( nonkeyword.repeat( 100 ) + keyword, { keyword: "keyword" } );
        const researcher = new Researcher( paper );
        const result = new KeywordDensityAssessment().getResult( paper, researcher, i18n );
        expect( result.getScore() ).toBe( 0 );
        expect( result.getText() ).toBe( "Keyphrase density: " +
            "The focus keyphrase was found 1 time. That's less than the recommended minimum of 2 times " +
            "for a text of this length. Focus on your keyphrase!" );
    } );


    it( "returns a good result if the keyword is used twice and " +
        "the recommended count is smaller than or equal to 2, regardless of the density", function() {
        const paper = new Paper( nonkeyword.repeat( 100 ) + "a b c, a b c", { keyword: "a b c", locale: "xx_XX" } );
        const researcher = new Researcher( paper );
        const result = new KeywordDensityAssessment().getResult( paper, researcher, i18n );
        expect( result.getScore() ).toBe( 10 );
        expect( result.getText() ).toBe( "Keyphrase density: " +
            "The focus keyphrase was found 2 time. This is great!" );
    } );
} );