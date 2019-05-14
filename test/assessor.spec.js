import Assessor from "../src/assessor.js";
import AssessmentResult from "yoastseo/src/values/AssessmentResult.js";
import MissingArgument from "yoastseo/src/errors/missingArgument";
import factory from "./testHelpers/factory.js";
var i18n = factory.buildJed();

global.window = {};

describe( "an assessor object", function() {
    describe( "create an assessor", function() {
        it( "throws an error when no args are given", function() {
            expect( function() {
                new Assessor();
            } ).toThrowError( MissingArgument );
        } );

        it( "creates an assessor", function() {
            expect( new Assessor( i18n ) ).toBeDefined();
            expect( Object.keys( new Assessor( i18n ).getAvailableAssessments() ) ).toEqual( [] );
        } );
    } );

    var result5 = new AssessmentResult();
    result5.setScore( 5 );
    var result4 = new AssessmentResult();
    result4.setScore( 4 );
    var result8 = new AssessmentResult();
    result8.setScore( 8 );

    var validResult = new AssessmentResult();
    validResult.setScore( 9 );
    validResult.setText( "all good" );
    validResult.setHasMarks( true );

    describe( "returning the overallscore", function() {
        it( "returns the overallscore", function() {
            var assessor = new Assessor( i18n );
            assessor.getValidResults = function() {
                return [ result5, result4, result8 ];
            };
            expect( assessor.calculateOverallScore() ).toBe( 63 );
        } );
    } );

    var mockAssessment = {
        /**
         * A mock assessment which always returns true.
         *
         * @returns {boolean} True.
         */
        callback: function() {
            return true;
        },
    };

    describe( "adding an assessment", function() {
        it( "adds an assessment", function() {
            var assessor = new Assessor( i18n );
            assessor.addAssessment( "testname", mockAssessment );

            var result = assessor.getAssessment( "testname" );

            expect( result ).toEqual( mockAssessment );
        } );
    } );

    describe( "removing an assessment", function() {
        it( "removes an assessment", function() {
            var assessor = new Assessor( i18n );
            assessor.removeAssessment( "testname" );

            var result = assessor.getAssessment( "testname" );

            expect( result ).toEqual( undefined ); // eslint-disable-line no-undefined
        } );
    } );
} );