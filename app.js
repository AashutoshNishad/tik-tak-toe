// Initialize the game
const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const restartBtn = document.querySelector('.restart');
const message = document.querySelector('.message');
const player = 'X';
const computer = 'O';

// Start the game
function startGame() {
  board.style.pointerEvents = 'auto';
  message.innerHTML = 'Your turn';
  cells.forEach((cell) => {
    cell.innerHTML = '';
    cell.addEventListener('click', playerTurn);
  });
  restartBtn.addEventListener('click', restartGame);
}

// Player's turn
function playerTurn() {
  this.innerHTML = player;
  this.removeEventListener('click', playerTurn);
  if (checkWin(player)) {
    board.style.pointerEvents = 'none';
    message.innerHTML = 'You win!';
    return;
  } else if (checkTie()) {
    board.style.pointerEvents = 'none';
    message.innerHTML = 'Tie game!';
    return;
  }
  message.innerHTML = 'Computer turn';
  computerTurn();
}

// Computer's turn
function computerTurn() {
  setTimeout(() => {
    const cell = getBestMove();
    cell.innerHTML = computer;
    if (checkWin(computer)) {
      board.style.pointerEvents = 'none';
      message.innerHTML = 'Computer wins!';
      return;
    } else if (checkTie()) {
      board.style.pointerEvents = 'none';
      message.innerHTML = 'Tie game!';
      return;
    }
    message.innerHTML = 'Your turn';
    cell.removeEventListener('click', playerTurn);
  }, 1000);
}

// Restart the game
function restartGame() {
  startGame();
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
    cells[8].innerHTML === player
  ) {
    return true;
  }
  return false;
}

// Check if the game is a tie
function checkTie() {
  return cells.every((cell) => cell.innerHTML !== '');
}

// Get the best move for the computer using the Minimax algorithm
function getBestMove() {
  let bestScore =
