/*jslint regexp: true, vars:true*/
/*global define, $, brackets, console*/

/* KISS Syntax Highlighting to increase readability in Brackets
    v1.0 Simon Wall Simon.Wall@CADWall.co.uk
    */

define(function (require, exports, module) {
    'use strict';
    
    // Integrate with Brackets Language Manager
    var LanguageManager = brackets.getModule("language/LanguageManager");
    var CodeMirror = brackets.getModule("thirdparty/CodeMirror2/lib/codemirror");
    
    CodeMirror.defineMode("KISSCODES", function () {
        
        var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
        ExtensionUtils.loadStyleSheet(module, "styles/styles.css");
        
        return {
            token: function (stream, state) {
            
                // Program Start %
                if (stream.match(/([\/].*)/, false)) {
                    stream.skipToEnd();
                    return 'program_start';
                }
        
                // Program Number
                if (stream.match(/([o][0-9]{1,4})/i)) {
                    stream.skipToEnd();
                    return 'program_number';
                }
        
                // Block Number
                if (stream.match(/([n][0-9]+)/i)) {
                    return 'block_number';
                }
                
                // Comment
                // but you can't call it 'comment' or it's overwritten by the defaults
                if (stream.match(/(\(.+\))/)) {
                    stream.skipToEnd();
                    return 'comment_line';
                }
                
                // D-Code
                if (stream.match(/([d][0-9]{1,3})/i)) {
                    return 'dcode';
                }
                
                // A-Code
                if (stream.match(/([a][0-9]{1,3})/i)) {
                    return 'acode';
                }
                                
                // Feed Rate
                if (stream.match(/([KISS][0-9]+\.?[0-9]*)/i)) {
                    return 'KISS';
                }
                
                // Skip everything else
                stream.eat(/./);
                
            },
            startState: function () {
                return {
                    inComment: false
                };
            }
        };
    });
    
    CodeMirror.defineMIME("text/x-KISSCODES", "KISSCODES");
    
    LanguageManager.defineLanguage("KISSCODES", {
        name: "KISSCODES",
        mode: "KISSCODES",
        fileExtensions: ["kss"],
        blockComment: ["(", ")"],
        lineComment: [";"]
    });
});
