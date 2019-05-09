//import SnippetPreview from "./snippetPreview";
import App from "./app";

import { forEach } from "lodash-es";
import { escape } from "lodash-es";

/**
 * Set the locale.
 *
 * @returns {void}
 */

/**
 * Binds the renewData function on the change of input elements.
 *
 * @param {YoastSEO.App} app The YoastSEO.js app.
 *
 * @returns {void}
 */
var bindEvents = function( app ) {
    var elems = [ "synonyms", "content", "focusKeyword" ];
    for ( var i = 0; i < elems.length; i++ ) {
        document.getElementById( elems[ i ] ).addEventListener( "input", app.refresh.bind( app ) );
    }

  //  document.getElementById( "locale" ).addEventListener( "input", setLocale.bind( app ) );
};

window.onload = function() {

   /* var snippetPreview = new SnippetPreview( {
        targetElement: document.getElementById( "snippet" ),
    } );*/

    var app = new App( {
        hasSnippetPreview: false,
        locale: "it_IT",
        targets: {
            output: "output",
            contentOutput: "contentOutput",
        },
        callbacks: {
            getData: function() {
                return {
                    keyword: document.getElementById( "focusKeyword" ).value,
                    text: document.getElementById( "content" ).value,
                    synonyms: document.getElementById( "synonyms" ).value,
                };
            },
        },
        marker: function( paper, marks ) {
            var text = paper.getText();

            forEach( marks, function( mark ) {
                text = mark.applyWithReplace( text );
            } );

            document.getElementsByClassName( "marked-text" )[ 0 ].innerHTML = text;

            document.getElementsByClassName( "marked-text-raw" )[ 0 ].innerHTML = escape( text );
        },
    } );

    bindEvents( app );
    app.initializeAssessors( app.config );
    app.initAssessorPresenters();
    app.refresh();
   // app.refresh();



    var refreshAnalysis = document.getElementById( "refresh-analysis" );

    refreshAnalysis.addEventListener( "click", function() {
        app.getData();
        app.runAnalyzer();
    } );
};