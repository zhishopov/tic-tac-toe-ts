import { State, Square } from './types';
import { showBoard } from './board';

function main(): void {
  console.log('Welcome to Tic-Tac-Toe Game!!!\n');

  const emptyBoard: Square[] = Array<Square>(9).fill(null);

  const initialState: State = {
    board: emptyBoard,
    currentPlayer: 'X',
    movesCount: 0
  };

  const boardAsText: string = showBoard(initialState.board);
  console.log(boardAsText);

  console.log('\nCurrent player:', initialState.currentPlayer);
}

main();