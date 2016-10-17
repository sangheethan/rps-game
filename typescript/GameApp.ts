import { Shape } from './Shape';
import GameService, { IGameService } from './GameService';

// Main app class
export class GameApp {
	private gameService: IGameService;
	
	// constructor initialize shapes and players
	constructor(el, shapes) {
		this.gameService = new GameService(shapes);
		this.initialize(el);
	}

	newGame(user: string) {
		this.gameService.initPlayers(user);
	}

	initialize(el) {
		var _this = this;
		var gameStartFormEl = el.getElementsByClassName('game-start')[0],
			playerNameEl = el.getElementsByTagName('input')[0],
			gamePlayEL = el.getElementById('gameplay');

			console.log(gamePlayEL);
		gameStartFormEl.addEventListener('submit', function(evnt) {
            _this.newGame(playerNameEl.value)
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
}