import { Board, Player, Square } from "./types";

const winIndexCombination: [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function isValidMove(board: Board, squareIndex: number): boolean {
  return squareIndex >= 0 && squareIndex < 9 && board[squareIndex] === null;
}

export function performMove(
  board: Board,
  squareIndex: number,
  player: Player
): Board {
  const newBoard: Square[] = board.slice();
  newBoard[squareIndex] = player;
  return newBoard;
}

export function changePlayer(currentPlayer: Player): Player {
  return currentPlayer === "X" ? "O" : "X";
}

export function checkWin(board: Board, player: Player): boolean {
  for (const line of winIndexCombination) {
    const [a, b, c] = line;

    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }
  return false;
}

export function isDraw(board: Board): boolean {
  for (const square of board) {
    if (square === null) {
      return false;
    }
  }
  return true;
}
