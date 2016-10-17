System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PlayerType;
    return {
        setters:[],
        execute: function() {
            (function (PlayerType) {
                PlayerType[PlayerType["Human"] = 1] = "Human";
                PlayerType[PlayerType["Computer"] = 2] = "Computer";
            })(PlayerType || (PlayerType = {}));
            exports_1("PlayerType", PlayerType);
        }
    }
});
