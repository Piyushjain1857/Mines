const grid = document.getElementById('grid');
const startBtn = document.getElementById('startBtn');
const cashoutBtn = document.getElementById('cashoutBtn');
const multiplierDisplay = document.getElementById('multiplier');
const winningsDisplay = document.getElementById('winnings');

let cells = [];
let mines = [];
let safeClicks = 0;
let stake = 0;
let numMines = 5;
let gameActive = false;

startBtn.addEventListener('click', startGame);
cashoutBtn.addEventListener('click', cashOut);

function startGame() {
  grid.innerHTML = '';
  cells = [];
  mines = [];
  safeClicks = 0;
  stake = parseFloat(document.getElementById('stakeAmount').value);
  numMines = parseInt(document.getElementById('minesCount').value);
  gameActive = true;

  multiplierDisplay.textContent = "1.00x";
  winningsDisplay.textContent = "0.00";

  while (mines.length < numMines) {
    const rand = Math.floor(Math.random() * 25);
    if (!mines.includes(rand)) mines.push(rand);
  }

  for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleClick(cell, i));
    grid.appendChild(cell);
    cells.push(cell);
  }

  cashoutBtn.disabled = false;
}

function handleClick(cell, index) {
  if (!gameActive || cell.classList.contains('safe') || cell.classList.contains('mine')) return;

  if (mines.includes(index)) {
    cell.classList.add('mine');
    cell.textContent = '💣';
    gameOver();
  } else {
    cell.classList.add('safe');
    cell.textContent = '💎';
    safeClicks++;
    updateMultiplier();
  }
}

function updateMultiplier() {
  const multiplier = (1 + safeClicks * 0.15).toFixed(2);
  multiplierDisplay.textContent = multiplier + 'x';
  winningsDisplay.textContent = (stake * multiplier).toFixed(2);
}

function cashOut() {
  alert(`You cashed out $${winningsDisplay.textContent} successfully!`);
  gameActive = false;
  cashoutBtn.disabled = true;
  revealAllMines();
}

function gameOver() {
  gameActive = false;
  cashoutBtn.disabled = true;
  alert('Boom! You clicked a mine. Game over.');
  revealAllMines();
}

function revealAllMines() {
  mines.forEach(i => {
    if (!cells[i].classList.contains('safe')) {
      cells[i].classList.add('mine');
      cells[i].textContent = '💣';
    }
  });
}