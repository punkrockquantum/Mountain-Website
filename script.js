// Elements
const torch = document.getElementById('torch');
const lightSwitch = document.getElementById('light-switch');
const blackoutPanel = document.getElementById('blackout-panel');
const timerEl = document.getElementById('timer');
const skipBtn = document.getElementById('skip-quantum');
const readyPanel = document.getElementById('ready-panel');
const goGameBtn = document.getElementById('go-game');
const gamePanel = document.getElementById('game-panel');
const symbolSelection = document.getElementById('symbol-selection');
const chooseX = document.getElementById('choose-x');
const chooseO = document.getElementById('choose-o');
const boardEl = document.getElementById('board');
const analysisEl = document.getElementById('analysis');
const quantumLabel = document.getElementById('quantum-toggle-label');
const quantumToggle = document.getElementById('quantum-toggle');
const resultEl = document.getElementById('game-result');

let countdown, timeLeft = 60;
let userSym, compSym, gameStarted = false;

// Torch & switch visibility
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

// Switch click → blackout panel
lightSwitch.addEventListener('click', () => {
  lightSwitch.style.display = 'none';
  blackoutPanel.style.display = 'block';
  startCountdown();
});

// Countdown
function startCountdown() {
  timerEl.textContent = timeLeft;
  countdown = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) clearAndReady();
  }, 1000);
}
skipBtn.addEventListener('click', clearAndReady);
function clearAndReady() {
  clearInterval(countdown);
  blackoutPanel.style.display = 'none';
  readyPanel.style.display = 'block';
}

// Ready → game
goGameBtn.addEventListener('click', () => {
  readyPanel.style.display = 'none';
  gamePanel.style.display = 'block';
});

// Symbol selection
chooseX.addEventListener('click', () => initGame('X','O'));
chooseO.addEventListener('click', () => initGame('O','X'));

function initGame(user, comp) {
  userSym = user; compSym = comp;
  symbolSelection.style.display = 'none';
  buildBoard();
}

// Build board
function buildBoard() {
  boardEl.innerHTML = '';
  for (let i=0; i<9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.idx = i;
    cell.addEventListener('click', userMove);
    boardEl.append(cell);
  }
}

// User move → computer analysis
function userMove(e) {
  if (gameStarted) return;
  gameStarted = true;
  e.target.textContent = userSym;

  // Fake analysis script
  const script = `
Computer analysis of possible moves:
1) If I play at cell 0 → ...
2) If I play at cell 1 → ...
...
8) If I play at cell 8 → ...
Decision: I will play at cell 4.
`;
  analysisEl.textContent = script.trim();

  // Computer plays center
  boardEl.children[4].textContent = compSym;

  // Reveal quantum toggle
  quantumLabel.style.display = 'block';
  quantumToggle.addEventListener('change', onQuantum);
}

// Quantum engagement
function onQuantum() {
  if (!quantumToggle.checked) return;
  // Fill board with user symbol
  Array.from(boardEl.children).forEach(c => c.textContent = userSym);
  resultEl.textContent = '✅ You win!';
  const p = document.createElement('p');
  p.innerHTML = '<em>Quantum Computers solve complex optimisation problems faster than any other. When combined with HPC, Mountain ends the risk of blackouts.</em>';
  resultEl.appendChild(p);
}
