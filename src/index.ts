import { State, Square, Player } from "./types";
import { showBoard } from "./board";
import {
  isValidMove,
  performMove,
  changePlayer,
  checkWin,
  isDraw,
} from "./rules";
import promptSync from "prompt-sync";

const prompt = promptSync();

function createInitialState(): State {
  const emptyBoard: Square[] = Array<Square>(9).fill(null);
  return {
    board: emptyBoard,
    currentPlayer: "X",
    movesCount: 0,
  };
}

function getPlayerInput(currentPlayer: Player): string {
  const input = prompt(`\nPlayer ${currentPlayer}, choose a square.`);
  return input.toLocaleLowerCase();
}

// function main(): void {
//   console.log("Welcome to Tic-Tac-Toe Game!!!\n");

//   // Each square is either X, O or null
//   const emptyBoard: Square[] = Array<Square>(9).fill(null);

//   const initialState: State = {
//     board: emptyBoard,
//     currentPlayer: "X",
//     movesCount: 0, // keep track of moves
//   };

//   const boardAsText: string = showBoard(initialState.board);
//   console.log(boardAsText);

//   console.log("\nCurrent player:", initialState.currentPlayer);
// }

// main();
