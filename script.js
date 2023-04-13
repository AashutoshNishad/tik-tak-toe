const board = document.getElementById("board");
const cells = document.getElementsByClassName("cell");
let player;
let computer;
let isGameOver;

// Start the game
function startGame() {
  // Initialize game state
  player = "X";
  computer = "O";
  isGameOver = false;
  // Add event listeners to cells
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", () => {
      if (!isGameOver && cells[i].innerHTML === "") {
        // Player's move
        cells[i].innerHTML = player;
        if (checkWin(player)) {
          alert("You win!");
          isGameOver = true;
          return;
        }
        if (checkTie()) {
          alert("It's a tie!");
          isGameOver = true;
          return;
        }
        // Computer's move
        let bestMove = getBestMove();
        bestMove.innerHTML = computer;
        if (checkWin(computer)) {
          alert("You lose!");
          isGameOver = true;
          return;
        }
        if (checkTie()) {
          alert("It's a tie!");
          isGameOver = true;
          return;
        }
      }
    });
  }
}

// Check if a player has won
function checkWin(player) {
  if (
    cells[0].innerHTML === player &&
    cells[1].innerHTML === player &&
    cells[2].innerHTML === player
  ) {
    return true;
  }
  if (
    cells[3].innerHTML === player &&
    cells[4].innerHTML === player &&
    cells[5].innerHTML === player
  ) {
    return true;
  }
  if (
    cells[6].innerHTML === player &&
    cells[7].innerHTML === player &&
    cells[8].innerHTML === player
  ) {
    return true;
  }
  if (
    cells[0].innerHTML === player &&
    cells[3].innerHTML === player &&
    cells[6].innerHTML === player
  ) {
    return true;
  }
  if (
    cells[1].innerHTML === player &&
    cells[4].innerHTML === player &&
    cells[7].innerHTML === player
  ) {
    return true;
  }
  if (
    cells[2].innerHTML === player &&
    cells[5].innerHTML === player &&
    cells[8].innerHTML === player
  ) {
    return true;
  }
  if (
    cells[0].innerHTML === player &&
    cells[4].innerHTML === player &&
    cells[8].innerHTML === player
  ) {
    return true;
  }
  if (
    cells[2].innerHTML === player &&
    cells[4].innerHTML === player &&
    cells[6].innerHTML === player
  ) {
    return true;
  }
  return false;
}

// Check if it's a tie
function checkTie() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML === "") {
      return false;
    }
  }
  return true;
}

// Get the best move for the computer using the Minimax algorithm
function getBestMove() {
  let bestScore = -Infinity;
  let bestMove;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML === "") {
      cells[i].innerHTML = computer;
      let score = minimax(cells, 0, false);
      cells[i].innerHTML = "";
      if (score > bestScore) {
        bestScore = score;
       
        bestMove = cells[i];
    }
  }
}
return bestMove;
}

// Minimax algorithm
function minimax(cells, depth, isMaximizing) {
if (checkWin(computer)) {
return 10 - depth;
}
if (checkWin(player)) {
return depth - 10;
}
if (checkTie()) {
return 0;
}
if (isMaximizing) {
let bestScore = -Infinity;
for (let i = 0; i < cells.length; i++) {
if (cells[i].innerHTML === "") {
cells[i].innerHTML = computer;
let score = minimax(cells, depth + 1, false);
cells[i].innerHTML = "";
bestScore = Math.max(score, bestScore);
}
}
return bestScore;
} else {
let bestScore = Infinity;
for (let i = 0; i < cells.length; i++) {
if (cells[i].innerHTML === "") {
cells[i].innerHTML = player;
let score = minimax(cells, depth + 1, true);
cells[i].innerHTML = "";
bestScore = Math.min(score, bestScore);
}
}
return bestScore;
}
}

startGame();

