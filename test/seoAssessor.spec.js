import Assessor from "../src/seoAssessor.js";
import CustomPaper from "../src/values/Paper.js";
import factory from "./testHelpers/factory.js";
import getResults from "./testHelpers/getAssessorResults";
const i18n = factory.buildJed();

describe( "running assessments in the assessor", function() {
    let assessor;

    beforeEach( () => {
        assessor = new Assessor( i18n );
    } );

    it( "runs assessments without any specific requirements", function() {
        assessor.assess( new CustomPaper( "" ) );
        const AssessmentResults = assessor.getValidResults();
        const assessments = getResults( AssessmentResults );
        const overallScore = assessor.calculateOverallScore();

        expect( assessments ).toEqual( [
            "charLength",
        ] );
        expect(overallScore).toEqual(0);

    } );

    it( "additionally runs assessments that only require a text", function() {
        assessor.assess( new CustomPaper( "text" ) );
        const AssessmentResults = assessor.getValidResults();
        const assessments = getResults( AssessmentResults );

        expect( assessments ).toEqual( [
            "charLength"
        ] );
    } );

    it( "additionally runs singleH1assessment if the text contains two H1s", function() {
        assessor.assess( new CustomPaper( "<h2>First title</h2><h2>Second title</h2>" ) );
        const AssessmentResults = assessor.getValidResults();
        const assessments = getResults( AssessmentResults );

        expect( assessments ).toEqual( [
            "charLength"
        ] );
    } );

    it( "additionally runs assessments that only require a text and a keyword", function() {
        assessor.assess( new CustomPaper( "text", { keyword: "keyword" } ) );
        const AssessmentResults = assessor.getValidResults();
        const assessments = getResults( AssessmentResults );

        expect( assessments ).toEqual( [
            "introductionKeyword",
            "charLength",
            "h2Keywords",
            "linkWithKeywords"
        ] );
    } );

    it( "additionally runs assessments that only require a keyword that contains function words only", function() {
        assessor.assess( new CustomPaper( "", { keyword: "a" } ) );
        const AssessmentResults = assessor.getValidResults();
        const assessments = getResults( AssessmentResults );

        expect( assessments ).toEqual( [
            "charLength"
        ] );
    } );

    it( "additionally runs assessments that require text and a keyword", function() {
        assessor.assess( new CustomPaper( "text", { keyword: "keyword" } ) );
        const AssessmentResults = assessor.getValidResults();
        const assessments = getResults( AssessmentResults );

        expect( assessments ).toEqual( [
            "introductionKeyword",
            "charLength",
            "h2Keywords",
            "linkWithKeywords"
        ] );
    } );

    it( "additionally runs assessments that require a long enough text and a keyword and a synonym", function() {
        const text = "a ".repeat( 200 );
        assessor.assess( new CustomPaper( text, { keyword: "keyword", synonyms: "synonym", title: "Keyword Title", description: "Keyword meta description to be checked" } ) );
        const AssessmentResults = assessor.getValidResults();
        const assessments = getResults( AssessmentResults );

        expect( assessments ).toEqual( [
            "introductionKeyword",
            "keywordDensity",
            "metaDescriptionKeyword",
            "titleKeyword",
            "titleKeywordPosition",
            "charLength",
            "h2Keywords",
            "linkWithKeywords"
        ] );
    } );


    // These specifications will additionally trigger the largest keyword distance assessment.
    it( "additionally runs assessments that require a long enough text and two keyword occurrences", function() {
        assessor.assess( new CustomPaper( "This is a keyword and a keyword. Lorem ipsum dolor sit amet, vim illum aeque" +
            " constituam at. Id latine tritani alterum pro. Ei quod stet affert sed. Usu putent fabellas suavitate id." +
            " Quo ut stet recusabo torquatos. Eum ridens possim expetenda te. Ex per putant comprehensam. At vel utinam" +
            " cotidieque, at erat brute eum, velit percipit ius et. Has vidit accusata deterruisset ea, quod facete te" +
            " vis. Vix ei duis dolor, id eum sonet fabulas. Id vix imperdiet efficiantur. Percipit probatus pertinax te" +
            " sit. Putant intellegebat eu sit. Vix reque tation prompta id, ea quo labore viderer definiebas." +
            " Oratio vocibus offendit an mei, est esse pericula liberavisse. Lorem ipsum dolor sit amet, vim illum aeque" +
            " constituam at. Id latine tritani alterum pro. Ei quod stet affert sed. Usu putent fabellas suavitate id." +
            " Quo ut stet recusabo torquatos. Eum ridens possim expetenda te. Ex per putant comprehensam. At vel utinam" +
            " cotidieque, at erat brute eum, velit percipit ius et. Has vidit accusata deterruisset ea, quod facete te" +
            " vis. Vix ei duis dolor, id eum sonet fabulas. Id vix imperdiet efficiantur. Percipit probatus pertinax te" +
            " sit. Putant intellegebat eu sit. Vix reque tation prompta id, ea quo labore viderer definiebas." +
            " Oratio vocibus offendit an mei, est esse pericula liberavisse.", { keyword: "keyword", title: "Keyword Title", description: "Keyword meta description to be checked" } ) );
        const AssessmentResults = assessor.getValidResults();
        const assessments = getResults( AssessmentResults );
        const overallScore = assessor.calculateOverallScore();

        expect( assessments ).toEqual( [
            "introductionKeyword",
            "keywordDensity",
            "metaDescriptionKeyword",
            "titleKeyword",
            "titleKeywordPosition",
            "charLength",
            "h2Keywords",
            "linkWithKeywords"
        ] );

        expect(overallScore).toEqual(55);

    } );

    it( "additionally runs assessments that require a long enough text and one keyword occurrence and one synonym occurrence", function() {
        assessor.assess( new CustomPaper( "<h2>keyword title</h2> This is a keyword. Lorem ipsum dolor sit amet, vim illum aeque" +
            " constituam at. Id latine tritani alterum pro. Ei quod stet affert sed. Usu putent fabellas suavitate id." +
            " Quo ut stet recusabo torquatos. Eum ridens possim expetenda te. Ex per putant comprehensam. At vel utinam" +
            " cotidieque, at erat brute eum, velit percipit ius et. Has vidit accusata deterruisset ea, quod facete te" +
            " vis. Vix ei duis dolor, id eum sonet fabulas. Id vix imperdiet efficiantur. Percipit probatus pertinax te" +
            " sit. Putant intellegebat eu sit. Vix reque tation prompta id, ea quo labore viderer definiebas." +
            " Oratio vocibus offendit an mei, est esse pericula liberavisse.<h2>title</h2> Lorem ipsum dolor sit amet, vim illum aeque" +
            " constituam at. Id latine tritani alterum pro. Ei quod stet affert sed. Usu putent fabellas suavitate id." +
            " Quo ut stet recusabo torquatos. keyword Eum ridens possim expetenda te.<h2>Synonym</h2> Ex per putant comprehensam. At vel utinam" +
            " cotidieque, at erat brute eum, velit percipit ius et. Has vidit accusata deterruisset ea, quod facete te" +
            " vis. Vix ei duis dolor, id eum sonet fabulas. Id vix imperdiet efficiantur. Percipit probatus pertinax te" +
            " sit. Putant intellegebat eu sit. Vix reque tation prompta id, ea quo labore viderer definiebas synonym." +
            " Oratio vocibus offendit an mei, est esse pericula liberavisse.<h2>keyword title</h2> This is a keyword. Lorem ipsum dolor sit amet, vim illum aeque" +
            " constituam at. Id latine tritani alterum pro. Ei quod stet affert sed. Usu putent fabellas suavitate id." +
            " Quo ut stet recusabo torquatos. Eum ridens possim expetenda te. Ex per putant comprehensam. At vel utinam" +
            " cotidieque, at erat brute eum, velit percipit ius et. Has vidit accusata deterruisset ea, quod facete te" +
            " vis. <a href=\"interan_link.html\">My keyword link</a> Vix ei duis dolor, id eum sonet fabulas. Id vix imperdiet efficiantur. Percipit probatus pertinax te" +
            " sit. Putant intellegebat eu sit. Vix reque tation prompta id, ea quo labore viderer definiebas." +
            " Oratio vocibus offendit an mei, est esse pericula liberavisse.<h2>title</h2> Lorem ipsum dolor sit amet, vim illum aeque" +
            " constituam at. Id latine tritani alterum pro. Ei quod stet affert sed. Usu putent fabellas suavitate id." +
            " Quo ut stet recusabo torquatos. Eum ridens possim expetenda te.<h2>Synonym</h2> Ex per putant comprehensam. At vel utinam" +
            " cotidieque, at erat brute eum, velit keyword percipit ius et. Has vidit accusata deterruisset ea, quod facete te" +
            " vis. keyword Vix ei duis dolor, id eum sonet fabulas. Id vix imperdiet efficiantur. Percipit probatus pertinax te" +
            " sit. Putant intellegebat eu sit. Vix reque tation prompta id, ea quo labore viderer definiebas synonym." +
            " Oratio vocibus offendit an mei, est esse pericula liberavisse.<h2>keyword title</h2> This is a keyword. Lorem ipsum dolor sit amet, vim illum aeque" +
            " constituam at. keyword Id latine tritani alterum pro. Ei quod stet affert sed. Usu putent fabellas suavitate id." +
            " Quo ut stet recusabo torquatos. Eum ridens possim expetenda te. Ex per putant comprehensam. At vel utinam" +
            " cotidieque, at erat brute eum, velit percipit ius et. Has vidit accusata deterruisset ea, quod facete te" +
            " vis. Vix ei duis dolor, id eum sonet fabulas. Id vix imperdiet efficiantur. Percipit probatus pertinax te" +
            " sit. Putant intellegebat eu sit. Vix keyword reque tation prompta id, ea quo labore viderer definiebas." +
            " Oratio vocibus offendit an mei, est esse pericula liberavisse.<h2>title</h2> Lorem ipsum dolor sit amet, vim illum aeque" +
            " constituam at. Id latine tritani alterum pro. Ei quod stet affert sed. Usu putent fabellas suavitate id." +
            " Quo ut stet recusabo torquatos. Eum ridens possim expetenda te.<h2>Synonym</h2> Ex per putant comprehensam. At vel utinam" +
            " cotidieque, at erat brute eum, velit percipit ius et. Has vidit accusata deterruisset ea, quod facete te" +
            " vis. Vix ei duis dolor, id eum sonet fabulas. Id vix imperdiet efficiantur. Percipit probatus pertinax te" +
            " sit. Putant intellegebat eu sit. Vix reque tation prompta id, ea quo labore viderer definiebas synonym." +
            " Oratio vocibus offendit an mei, est esse pericula liberavisse", { keyword: "keyword", synonyms: "synonym", title: "Keyword Title", description: "Keyword meta description to be checked", alt: "Image with keyword in alt"  } ) );
        const AssessmentResults = assessor.getValidResults();
        const assessments = getResults( AssessmentResults );
        const overallScore = assessor.calculateOverallScore();

        expect( assessments ).toEqual( [
            "introductionKeyword",
            "keywordDensity",
            "metaDescriptionKeyword",
            "titleKeyword",
            "titleKeywordPosition",
            "charLength",
            "h2Keywords",
            "linkWithKeywords",
            "imageKeyword"
        ] );

        expect(overallScore).toEqual(95);
    } );
} );