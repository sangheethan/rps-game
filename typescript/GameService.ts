import {Shape} from './Shape';
import {Player, PlayerType} from './Player';

export interface IGameService {
	add(shape: Shape): Shape;
	initPlayers(player: String): void;
}

export default class GameService implements IGameService {
	
	private shapes: Shape[] = [];
	private players : Player[] = [];

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
    // Initialize the players
    initPlayers(player): void {
    	var human: Player = {
    		name: player,
    		points: 0,
    		type: PlayerType.Human
    	}    	
    	var computer: Player = {
    		name: "Computer",
    		points: 0,
    		type: PlayerType.Computer
    	}
    	this.players.push(human);
    	this.players.push(computer);
    }
}