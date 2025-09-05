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
  const input = prompt(
    `\nPlayer ${currentPlayer}, choose a square, or press 'q' to quit.`
  );
  return input.toLocaleLowerCase();
}

function handlePlayerTurn(state: State): State | "quit" {
  console.log("Welcome to Tic-Tac-Toe Game!");
  console.log(showBoard(state.board));
  console.log(`\nCurrent player: ${state.currentPlayer}`);

  const userInput = getPlayerInput(state.currentPlayer);

  if (userInput === "q") {
    console.log("\nGoodbye!");
    return "quit";
  }

  const chosenPositionNumber = Number(userInput);

  if (isNaN(chosenPositionNumber)) {
    console.log("\nInvalid input. Please enter a number between 1 and 9.");
    prompt("\nPress Enter to try again...");
    return state;
  }

  if (chosenPositionNumber < 1 || chosenPositionNumber > 9) {
    console.log("\nOut of range. Please enter a number between 1 and 9.");
    prompt("\nPress Enter to try again...");
    return state;
  }

  const chosenIndex = chosenPositionNumber - 1;

  if (!isValidMove(state.board, chosenIndex)) {
    console.log("\nThat square is taken. Choose an empty one.");
    prompt("\nPress Enter to try again...");
    return state;
  }

  const boardAfterMove = performMove(
    state.board,
    chosenIndex,
    state.currentPlayer
  );
  const movesAfterMove = state.movesCount + 1;

  if (checkWin(boardAfterMove, state.currentPlayer)) {
    console.log(showBoard(boardAfterMove));
    console.log(
      `\nPlayer ${state.currentPlayer} wins in ${movesAfterMove} moves!`
    );
    return {
      board: boardAfterMove,
      currentPlayer: state.currentPlayer,
      movesCount: movesAfterMove,
    };
  }

  if (isDraw(boardAfterMove)) {
    console.log(showBoard(boardAfterMove));
    console.log("\nIt is a draw!");
    return {
      board: boardAfterMove,
      currentPlayer: state.currentPlayer,
      movesCount: movesAfterMove,
    };
  }

  const nextState: State = {
    board: boardAfterMove,
    currentPlayer: changePlayer(state.currentPlayer),
    movesCount: movesAfterMove,
  };

  return nextState;
}

function askPlayAgain(): boolean | "quit" {
  const answer = prompt(
    "\nPlay again? (y/n) Or press 'q' to quit: "
  ).toLowerCase();
  if (answer === "q") return "quit";
  if (answer === "y") return true;
  if (answer === "n") return false;
  console.log("Please answer y or n (or q to quit).");
  return askPlayAgain();
}

function gameLoop(): void {
  let currentState: State = createInitialState();

  while (true) {
    const result = handlePlayerTurn(currentState);
    if (result === "quit") {
      return;
    }

    const lastPlayer = currentState.currentPlayer;
    const gameEnded =
      checkWin(result.board, lastPlayer) || isDraw(result.board);

    currentState = result;

    if (gameEnded) {
      const playAgain = askPlayAgain();
      if (playAgain === "quit" || playAgain === false) {
        console.log("\nThanks for playing!");
        return;
      }
      currentState = createInitialState();
    }
  }
}

function main(): void {
  console.log("Welcome to Tic-Tac-Toe Game!!!");
  gameLoop();
}

main();
