import { Board, Square } from "./types";

export function showBoard(board: Board): string {
  const boardArray: Board = board.slice(0, 9);

  // Get the square value as text
  function getSquareText(squareIndex: number): string {
    const squareValue: Square | undefined = boardArray[squareIndex];

    // Show a number instead of null/undefined
    if (squareValue === null || squareValue === undefined) {
      return (squareIndex + 1).toString();
    }

    return squareValue;
  }

  const rowSeparator = "-----------";

  // Store each row text
  const rowDisplays: string[] = [];

  // Loop over the 3 rows
  for (let i = 0; i < 3; i++) {
    const startSquareIndex = i * 3;

    const firstSquareText = getSquareText(startSquareIndex);
    const secondSquareText = getSquareText(startSquareIndex + 1);
    const thirdSquareText = getSquareText(startSquareIndex + 2);

    const rowDisplay = ` ${firstSquareText} | ${secondSquareText} | ${thirdSquareText} `;
    rowDisplays.push(rowDisplay);
  }

  const showFullBoard = rowDisplays.join(`\n${rowSeparator}\n`);
  return showFullBoard;
}
