System.register(['./Player'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Player_1;
    var GameService;
    return {
        setters:[
            function (Player_1_1) {
                Player_1 = Player_1_1;
            }],
        execute: function() {
            GameService = class GameService {
                constructor(shapes) {
                    this.shapes = [];
                    this.players = [];
                    if (shapes) {
                        shapes.forEach(shape => this.add(shape));
                    }
                }
                add(shape) {
                    var form = {
                        name: shape.name,
                        beat: shape['beat']
                    };
                    this.shapes.push(form);
                    return form;
                }
                ;
                // Initialize the players
                initPlayers(player) {
                    var human = {
                        name: player,
                        points: 0,
                        type: Player_1.PlayerType.Human
                    };
                    var computer = {
                        name: "Computer",
                        points: 0,
                        type: Player_1.PlayerType.Computer
                    };
                    this.players.push(human);
                    this.players.push(computer);
                }
            };
            exports_1("default", GameService);
        }
    }
});
