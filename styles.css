// Elements
const torch = document.getElementById('torch');
const lightSwitch = document.getElementById('light-switch');
const blackoutPanel = document.getElementById('blackout-panel');
const readyPanel = document.getElementById('ready-panel');
const gamePanel = document.getElementById('game-panel');
const timerEl = document.getElementById('timer');
const skipBtn = document.getElementById('skip-quantum');
const goGameBtn = document.getElementById('go-game');
const boardEl = document.getElementById('board');
const analysisEl = document.getElementById('analysis');
const quantumLabel = document.getElementById('quantum-toggle-label');
const toggleEl = document.getElementById('quantum-toggle');
const resultEl = document.getElementById('game-result');

let countdown, timeLeft = 60;
let userSymbol = 'X', compSymbol = 'O', gameStarted = false;

// Torch movement
document.addEventListener('mousemove', e => {
  torch.style.left = e.pageX + 'px';
  torch.style.top  = e.pageY + 'px';
});

// Step 1: Switch on → show blackout panel
lightSwitch.onclick = () => {
  lightSwitch.style.display = 'none';
  blackoutPanel.style.display = 'block';
  startCountdown();
};

// Countdown logic
function startCountdown() {
  timerEl.textContent = timeLeft;
  countdown = setInterval(() => {
    if (timeLeft <= 0) return showReady();
    timerEl.textContent = --timeLeft;
  }, 1000);
}
skipBtn.onclick = () => { clearInterval(countdown); showReady(); };

// Show “Mountain is about…”
function showReady() {
  blackoutPanel.style.display = 'none';
  readyPanel.style.display = 'block';
}

// Step 2: Ready → go to game
goGameBtn.onclick = () => {
  readyPanel.style.display = 'none';
  initGame();
};

// Initialize Tic-Tac-Toe
function initGame() {
  gamePanel.style.display = 'block';
  // build 3×3 grid
  boardEl.innerHTML = '';
  for (let i=0; i<9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.idx = i;
    cell.onclick = onUserMove;
    boardEl.append(cell);
  }
}

// User places X
function onUserMove(e) {
  if (gameStarted) return;
  gameStarted = true;
  e.target.textContent = userSymbol;
  // simulate computer analysis script
  const script = `
Computer analysis of possible moves:
1) If I play at cell 0 → ...
2) If I play at cell 1 → ...
3) ...
(complete enumeration of 8 remaining cells)
Decision: I will play at cell 4.
`;
  analysisEl.textContent = script.trim();
  // fake computer move
  boardEl.children[4].textContent = compSymbol;
  // now allow quantum toggle
  quantumLabel.style.display = 'block';
  // listen for toggle
  toggleEl.onchange = onQuantumToggle;
}

// Quantum toggle handler
function onQuantumToggle() {
  if (toggleEl.checked) {
    // fill board with userSymbol
    Array.from(boardEl.children).forEach(c => c.textContent = userSymbol);
    resultEl.textContent = '✅ You win!';
    const msg = document.createElement('p');
    msg.innerHTML = '<em>Quantum Computers solve complex optimisation problems faster than any other. When combined with HPC, Mountain ends the risk of blackouts.</em>';
    resultEl.appendChild(msg);
  }
}
