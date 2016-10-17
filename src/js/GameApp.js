System.register(['./Player', './GameService'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Player_1, GameService_1;
    var GameApp;
    return {
        setters:[
            function (Player_1_1) {
                Player_1 = Player_1_1;
            },
            function (GameService_1_1) {
                GameService_1 = GameService_1_1;
            }],
        execute: function() {
            // Main app class
            GameApp = class GameApp {
                // constructor initialize shapes and players
                constructor(el, shapes) {
                    this.gameService = new GameService_1.default(shapes);
                    this.initialize(el);
                    this.winningStreak = 0;
                }
                newGame(user) {
                    this.gameService.initPlayers(user);
                }
                initialize(el) {
                    var _this = this;
                    var gameStartFormEl = el.getElementsByClassName('game-start')[0], playerNameEl = el.getElementsByTagName('input')[0], gamePlayEL = el.getElementById('gameplay'), gamePlayFormEL = el.getElementsByClassName('select-shape')[0];
                    gameStartFormEl.addEventListener('submit', function (evnt) {
                        evnt.preventDefault();
                        _this.newGame(playerNameEl.value);
                        playerNameEl.value = '';
                        gameStartFormEl.className += " destroy";
                        _this.renderGame(gamePlayEL);
                    });
                    gamePlayEL.addEventListener('submit', function (evnt) {
                        evnt.preventDefault();
                        var clickedEl = el.getElementsByClassName('clicked')[0];
                        _this.shapeClick(clickedEl.value);
                        _this._reset(clickedEl);
                        _this.renderGame(gamePlayEL);
                    });
                }
                _reset(el) {
                    el.className = '';
                }
                renderGame(el) {
                    var human = this.gameService.getPlayer(Player_1.PlayerType.Human);
                    var computer = this.gameService.getPlayer(Player_1.PlayerType.Computer);
                    el.innerHTML = `
			<div class="container">
			<div class="col4 human">
				<h3>${human.name}</h3>
				<form class="select-shape">
					<input type="submit" name="rock" value="rock" onclick="this.className = 'clicked'"/>
					<input type="submit" name="paper" value="paper"  onclick="this.className = 'clicked'"/>
					<input type="submit" name="scissor" value="scissor"  onclick="this.className = 'clicked'" />
				</form>
				<div class="shapeFormed"></div>
			</div>
			<div class="col4" id="scoring-system">
				<h3>Scores</h3>
				<div>
					<h4>wins</h4>
					<span class="human-score">${human.points}</span>
				</div>				
				<div>
					<h4>wins</h4>
					<span class="computer-score">${computer.points}</span>
					
				</div>				
			</div>
			<div class="col4 computer">
				<h3>Computer</h3>
				<div class="shapeFormed"></div>
			</div>
		</div>
		`;
                }
                shapeClick(shape) {
                    var winner = this.gameService.play(shape);
                    var el = document.getElementById("results");
                    if (winner)
                        el.innerHTML = `<div class="container">${winner.name} wins! Winning Streaks ${winner.winningStreak}</div>`;
                    else
                        el.innerHTML = `<div class="container">It's a tie!</div>`;
                }
            };
            exports_1("GameApp", GameApp);
        }
    }
});
