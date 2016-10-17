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
                getShape(form) {
                    var shapeObj;
                    this.shapes.forEach(shape => {
                        if (form == shape.name) {
                            shapeObj = shape;
                        }
                    });
                    return shapeObj;
                }
                getPlayerShape(playerType) {
                    if (playerType == Player_1.PlayerType.Human)
                        return this.humanShape;
                    else
                        return this.computerShape;
                }
                // Initialize the players
                initPlayers(player) {
                    var human = {
                        name: player,
                        points: 0,
                        type: Player_1.PlayerType.Human,
                        winningStreak: 0
                    };
                    var computer = {
                        name: "Computer",
                        points: 0,
                        type: Player_1.PlayerType.Computer,
                        winningStreak: 0
                    };
                    this.players.push(human);
                    this.players.push(computer);
                }
                // Get player
                getPlayer(playerType) {
                    var playerObj;
                    this.players.forEach(player => {
                        if (player.type == playerType)
                            playerObj = player;
                    });
                    return playerObj;
                }
                // Play a new round
                play(form) {
                    // let computer pick a random shape
                    var winner;
                    var humanShape = this.getShape(form);
                    var computerShape = this._generateShape();
                    this.humanShape = humanShape;
                    if (humanShape.beat === computerShape.name) {
                        winner = this.getPlayer(Player_1.PlayerType.Human);
                        winner.winningStreak++;
                        this.loseStreak(this.getPlayer(Player_1.PlayerType.Computer));
                    }
                    else if (computerShape.beat === humanShape.name) {
                        winner = this.getPlayer(Player_1.PlayerType.Computer);
                        winner.winningStreak++;
                        this.loseStreak(this.getPlayer(Player_1.PlayerType.Human));
                    }
                    else {
                        this.loseStreak();
                    }
                    if (winner)
                        winner.points++;
                    return winner;
                }
                loseStreak(player = null) {
                    if (player == null) {
                        this.players.forEach(player => player.winningStreak = 0);
                    }
                    else {
                        player.winningStreak = 0;
                    }
                }
                restart() {
                    this.players.forEach(player => player.points = 0);
                    this.loseStreak();
                }
                _generateShape() {
                    // pick a random shape from shapes and return the Shape
                    var randomShape = this.shapes[Math.floor(Math.random() * this.shapes.length)];
                    this.computerShape = randomShape;
                    return randomShape;
                }
            };
            exports_1("default", GameService);
        }
    }
});
