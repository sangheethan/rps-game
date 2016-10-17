System.register(['./GameService'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GameService_1;
    var GameApp;
    return {
        setters:[
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
                }
                newGame(user) {
                    this.gameService.initPlayers(user);
                }
                initialize(el) {
                    var _this = this;
                    var gameStartFormEl = el.getElementsByClassName('game-start')[0], playerNameEl = el.getElementsByTagName('input')[0], gamePlayEL = el.getElementById('gameplay');
                    console.log(gamePlayEL);
                    gameStartFormEl.addEventListener('submit', function (evnt) {
                        _this.newGame(playerNameEl.value);
                        playerNameEl.value = '';
                        gameStartFormEl.className += " destroy";
                        _this.renderGame(gamePlayEL);
                        evnt.preventDefault();
                    });
                }
                renderGame(el) {
                    el.innerHTML = `
			<div class="container">
			<div class="col4">
				<h3>Human</h3>
				<form class="select-shape">
					<input type="button" name="shape" value="Rock" />
					<input type="button" name="shape" value="Paper" />
					<input type="button" name="shape" value="Scissors"  />
				</form>
			</div>
			<div class="col4" id="scoring-system">
				<h3>Scores</h3>
				<div>
					<h4>wins</h4>
					<span class="human-score">0</span>
				</div>
				<div>
					<h4>ties</h4>
					<span class="tie-score">0</span>
				</div>
				<div>
					<h4>wins</h4>
					<span class="computer-score">0</span>
				</div>				
			</div>
			<div class="col4">
				<h3>Computer</h3>
			</div>
		</div>
		`;
                }
            };
            exports_1("GameApp", GameApp);
        }
    }
});
