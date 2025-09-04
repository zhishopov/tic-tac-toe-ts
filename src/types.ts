export type Player = "X" | "O";

export type Square = Player | null;

export type Board = Square[];

export type State = {
    board: Board;
    currentPlayer: Player;
    movesCount: number;
}