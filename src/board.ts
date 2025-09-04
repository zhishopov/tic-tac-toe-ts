import { Board, Square } from "./types";

export function showBoard(board: Board): string {
    const boardArray: Board = board.slice(0, 9);

    function getSquareText(squareIndex: number): string {
        const squareValue: Square | undefined = boardArray[squareIndex];

        if(squareValue === null || squareValue === undefined) {
            return (squareIndex + 1).toString();
        }

        return squareValue;
    }

    const rowSeparator = "-----------";
    const rowDisplays: string[] = [];

    for(let i = 0; i < 3; i++) {
        const startSquareIndex = i * 3;

        const firstCellText = getSquareText(startSquareIndex);
        const secondCellText = getSquareText(startSquareIndex + 1);
        const thirdCellText = getSquareText(startSquareIndex + 2);

        const rowDisplay = ` ${firstCellText} | ${secondCellText} | ${thirdCellText} `;
        rowDisplays.push(rowDisplay);
    }

    const showFullBoard = rowDisplays.join(`\n${rowSeparator}\n`);
    return showFullBoard;
}