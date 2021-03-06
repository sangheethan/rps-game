import {Shape} from './Shape';
import {Player, PlayerType} from './Player';

export interface IGameService {
	add(shape: Shape): Shape;
	initPlayers(player: String): void;
    getPlayer(playerType: number): void;
    getPlayerShape(playerType): Shape;
    play(form: String): Player;
    restart(): void;
}

export default class GameService implements IGameService {
	
	private shapes: Shape[] = [];
	private players : Player[] = [];
    private humanShape: Shape;
    private computerShape: Shape;

	constructor(shapes: string[]) {		
		if(shapes) {
            shapes.forEach(shape => this.add(shape));
        }
	}

	add(shape): Shape {

        var form: Shape = {
            name: shape.name,
            beat: shape['beat']
        };
        this.shapes.push(form);

        return form;
    };
    getShape(form): Shape {
        var shapeObj;
        this.shapes.forEach(shape=> {
            if(form == shape.name) {
                shapeObj = shape;
            }
        });
        return shapeObj;
    }

    getPlayerShape(playerType): Shape {
        if(playerType == PlayerType.Human) return this.humanShape;
        else return this.computerShape;
    }

    // Initialize the players
    initPlayers(player): void {
    	var human: Player = {
    		name: player,
    		points: 0,
    		type: PlayerType.Human,
            winningStreak: 0
    	}    	
    	var computer: Player = {
    		name: "Computer",
    		points: 0,
    		type: PlayerType.Computer,
            winningStreak: 0
    	}
    	this.players.push(human);
    	this.players.push(computer);
    }
    // Get player
    getPlayer(playerType: number): Player {
        var playerObj; 
        this.players.forEach(player => {
           if(player.type == playerType) playerObj = player;              
        });
        return playerObj;
    }
    // Play a new round
    play(form: String): Player {
        // let computer pick a random shape
        var winner;
        var humanShape = this.getShape(form);
        var computerShape = this._generateShape();
        this.humanShape = humanShape;
        if(humanShape.beat === computerShape.name) {
            winner = this.getPlayer(PlayerType.Human); 
            winner.winningStreak++;
            this.loseStreak(this.getPlayer(PlayerType.Computer));
        } else if(computerShape.beat === humanShape.name) {
            winner = this.getPlayer(PlayerType.Computer);
            winner.winningStreak++;
            this.loseStreak(this.getPlayer(PlayerType.Human));
        } else {
            this.loseStreak();
        }
        if(winner) winner.points++;
        return winner;       
    }
    loseStreak(player = null) {
        if(player == null) {
            this.players.forEach(player => player.winningStreak = 0);
        } else {
            player.winningStreak = 0;
        }
    }
    restart():void {
        this.players.forEach(player => player.points = 0);
        this.loseStreak();
    }
    private _generateShape(): Shape {
        // pick a random shape from shapes and return the Shape
        var randomShape =  this.shapes[Math.floor(Math.random()*this.shapes.length)];
        this.computerShape = randomShape;      
        return randomShape;
    }
}