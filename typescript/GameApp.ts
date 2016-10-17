import { Shape } from './Shape';
import {Player, PlayerType} from './Player';
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
			gamePlayEL = el.getElementById('gameplay'),
			gamePlayFormEL = el.getElementsByClassName('select-shape')[0];

		playerNameEl.focus();

		document.addEventListener('keypress', function(event){
			console.log(event.keyCode);
			switch (event.keyCode) {
				case 114:
					document.getElementById('rock').click();
					break;
				case 112:
					document.getElementById('paper').click();
					break;
				case 115:
					document.getElementById('scissor').click();
					break;
				default:
					// code...
					break;
			}
			if(event.keyCode == 114) {
				
			}
		});
		gameStartFormEl.addEventListener('submit', function(evnt) {
			evnt.preventDefault();
			if(playerNameEl.value != '') {
	            _this.newGame(playerNameEl.value)
	            playerNameEl.value = '';
	            gameStartFormEl.className += " destroy";
	            _this.renderGame(gamePlayEL);
	        } else {
	        	alert('Please enter a valid name.');
	        }
            
        });
        gamePlayEL.addEventListener('submit', function(evnt) {  
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
		var human = this.gameService.getPlayer(PlayerType.Human);
		var computer = this.gameService.getPlayer(PlayerType.Computer);
		el.innerHTML = `
			<div class="container">
			<div class="col4 human">
				<h3>Player 1: ${human.name}</h3>
				<form class="select-shape">
					<input id="rock" type="submit" name="rock" value="rock" onclick="this.className = 'clicked'"/>
					<input id="paper" type="submit" name="paper" value="paper"  onclick="this.className = 'clicked'"/>
					<input id="scissor" type="submit" name="scissor" value="scissor"  onclick="this.className = 'clicked'" />
				</form>
				<small>[r]rock, [p]paper, [s]scissor</small>
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
				<h3>Player 2: Computer</h3>
				<div class="shapeFormed"></div>
			</div>
		</div>
		`;
	}

	shapeClick(shape) {
		var winner = this.gameService.play(shape);
		var el = document.getElementById("results");
		var popupEl = document.getElementById("popup");
		var roundEl = document.getElementsByClassName("roundList")[0];
		var _this = this;

		if(winner) {
			el.innerHTML += `<div class="container">
				<span>${this.gameService.getPlayerShape(PlayerType.Human).name}</span>
				${winner.name} wins!
				<span>${this.gameService.getPlayerShape(PlayerType.Computer).name}</span>
			</div>`;
			if(winner.winningStreak == 3) {
				popupEl.className += 'show';
				if(winner.type == PlayerType.Human) {
					popupEl.innerHTML = `
						<div class="message">
							<h2>You have won!</h2>
							<form class="successForm">
								<input type="submit" name="restart" value="restart" />
							</form>
						</div>`;
				} else {
					popupEl.innerHTML = `
						<div class="message">
							<h2>You lost!</h2>
							<form class="successForm">
							<input type="submit" name="restart" value="restart" />
							</form>
						</div>`;
				}
				var restartEl = document.getElementsByClassName('successForm')[0];
				restartEl.addEventListener('submit', function(event) {
					event.preventDefault();
					_this.gameService.restart();
					popupEl.className = '';
					_this.renderGame(document.getElementById('gameplay'));
					el.innerHTML = '';
				});
			}
		}
		else el.innerHTML += `<div class="container">
			<span>${this.gameService.getPlayerShape(PlayerType.Human).name}</span>
			It's a tie!
			<span>${this.gameService.getPlayerShape(PlayerType.Computer).name}</span>
		</div>`;

		
	}
}