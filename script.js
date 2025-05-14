// Element refs
const torch          = document.getElementById('torch');
const lightSwitch    = document.getElementById('light-switch');
const blackoutPanel  = document.getElementById('blackout-panel');
const timerEl        = document.getElementById('timer');
const skipBtn        = document.getElementById('skip-quantum');
const powerBackPanel = document.getElementById('powerback-panel');
const imbalancePanel = document.getElementById('imbalance-panel');
const imbalanceTimer = document.getElementById('imbalance-timer');
const gamePanel      = document.getElementById('game-panel');
const symbolSel      = document.getElementById('symbol-selection');
const chooseX        = document.getElementById('choose-x');
const chooseO        = document.getElementById('choose-o');
const boardEl        = document.getElementById('board');
const analysisEl     = document.getElementById('analysis');
const quantumLabel   = document.getElementById('quantum-toggle-label');
const quantumToggle  = document.getElementById('quantum-toggle');
const resultEl       = document.getElementById('game-result');

let countdown1, countdown2;
let timeLeft1 = 60, timeLeft2 = 20;
let board = Array(9).fill(null);
let userSym, compSym, isUserTurn = true, gameOver = false;

// 1) Torch & Switch Visibility
document.addEventListener('mousemove', e => {
  torch.style.left = e.pageX + 'px';
  torch.style.top  = e.pageY + 'px';

  const rect = lightSwitch.getBoundingClientRect();
  const over = (
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top  &&
    e.clientY <= rect.bottom
  );
  lightSwitch.classList.toggle('visible', over);
});

// 2) Switch Click → First Blackout
lightSwitch.addEventListener('click', () => {
  lightSwitch.style.display = 'none';
  blackoutPanel.style.display = 'flex';
  startFirstCountdown();
});

// First 60s countdown
function startFirstCountdown() {
  timerEl.textContent = timeLeft1;
  countdown1 = setInterval(() => {
    timeLeft1--;
    timerEl.textContent = timeLeft1;
    if (timeLeft1 <= 0) clearFirst();
  }, 1000);
}
skipBtn.addEventListener('click', clearFirst);
function clearFirst() {
  clearInterval(countdown1);
  blackoutPanel.style.display = 'none';
  showPowerBack();
}

// 3) Power-back White Screen 20s
function showPowerBack() {
  powerBackPanel.style.display = 'flex';
  setTimeout(() => {
    powerBackPanel.style.display = 'none';
    showImbalance();
  }, 20000);
}

// 4) Imbalance Countdown 20s
function showImbalance() {
  imbalanceTimer.textContent = timeLeft2;
  imbalancePanel.style.display = 'flex';
  countdown2 = setInterval(() => {
    timeLeft2--;
    imbalanceTimer.textContent = timeLeft2;
    if (timeLeft2 <= 0) clearSecond();
  }, 1000);
}

function clearSecond() {
  clearInterval(countdown2);
  imbalancePanel.style.display = 'none';
  startGame();
}

// 5) Initialize and Run Tic-Tac-Toe
chooseX.addEventListener('click', () => initGame('X','O'));
chooseO.addEventListener('click', () => initGame('O','X'));

function initGame(u, c) {
  userSym = u; compSym = c;
  symbolSel.style.display = 'none';
  buildBoard();
}

function buildBoard() {
  board = Array(9).fill(null);
  boardEl.innerHTML = '';
  gamePanel.style.display = 'block';
  resultEl.textContent = '';
  analysisEl.textContent = '';
  quantumLabel.style.display = 'none';
  gameOver = false;
  isUserTurn = true;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.idx = i;
    cell.addEventListener('click', onUserMove);
    boardEl.append(cell);
  }
}

// User Move Handler
function onUserMove(e) {
  const idx = +e.target.dataset.idx;
  if (!isUserTurn || gameOver || board[idx]) return;

  board[idx] = userSym;
  e.target.textContent = userSym;
  if (checkWin(userSym)) return endGame('✅ You win!');

  isUserTurn = false;
  runComputerTurn();
}

// Computer Turn with Script
function runComputerTurn() {
  // Build analysis lines
  const moves = board
    .map((v, i) => v ? null : `If I play at cell ${i} → ...`)
    .filter(Boolean);
  moves.push(`Decision: I will play at cell ${moves[0].match(/\d+/)[0]}.`);

  analysisEl.textContent = '';
  let i = 0;
  const scriptInterval = setInterval(() => {
    analysisEl.textContent += moves[i] + '\n';
    i++;
    if (i >= moves.length) {
      clearInterval(scriptInterval);
      const chosen = +moves[moves.length -1].match(/\d+/)[0];
      makeCompMove(chosen);
    }
  }, 1000);
}

function makeCompMove(idx) {
  board[idx] = compSym;
  boardEl.children[idx].textContent = compSym;
  if (checkWin(compSym)) return endGame('❌ Computer wins!');
  quantumLabel.style.display = 'block';
  quantumToggle.addEventListener('change', onQuantum);
  isUserTurn = true;
}

// Quantum Engagement
function onQuantum() {
  if (!quantumToggle.checked || gameOver) return;
  Array.from(boardEl.children).forEach(c => c.textContent = userSym);
  endGame('✅ You win!');
}

// Win/Draw Check
function checkWin(sym) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(([a,b,c]) =>
    board[a]===sym && board[b]===sym && board[c]===sym
  );
}

// End Game
function endGame(msg) {
  gameOver = true;
  resultEl.textContent = msg;
}

// Start the flow
function startGame() {
  gamePanel.style.display = 'flex';
  symbolSel.style.display = 'block';
}

// — EOF —
