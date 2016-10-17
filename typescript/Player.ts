export interface Player {
	name: string; 
	points: number;
	type: PlayerType;
}

export enum PlayerType {
	Human = 1,
	Computer = 2
}