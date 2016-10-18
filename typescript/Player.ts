export interface Player {
	name: string; 
	points: number;
	type: PlayerType;
	winningStreak: number;
}

export enum PlayerType {
	Human = 1,
	Computer = 2
}