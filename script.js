// ELEMENTS
const torch         = document.getElementById('torch');
const lightSwitch   = document.getElementById('light-switch');
const blackoutPanel = document.getElementById('blackout-panel');
const timerEl       = document.getElementById('timer');
const skipBtn       = document.getElementById('skip-quantum');
const powerBack     = document.getElementById('powerback-panel');
const imbalancePanel= document.getElementById('imbalance-panel');
const imbTimerEl    = document.getElementById('imbalance-timer');
const gamePanel     = document.getElementById('game-panel');
const symbolSel     = document.getElementById('symbol-selection');
const chooseX       = document.getElementById('choose-x');
const chooseO       = document.getElementById('choose-o');
const boardEl       = document.getElementById('board');
const analysisEl    = document.getElementById('analysis');
const quantumLabel  = document.getElementById('quantum-toggle-label');
const quantumToggle = document.getElementById('quantum-toggle');
const resultEl      = document.getElementById('game-result');

let t1=60, t2=20, countdown1, countdown2;
let board, userSym, compSym, userTurn=true, gameOver=false;

// TORCH + SWITCH VISIBILITY
document.addEventListener('mousemove', e => {
  torch.style.left = e.pageX+'px';
  torch.style.top  = e.pageY+'px';
  const r = lightSwitch.getBoundingClientRect();
  const over = e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;
  lightSwitch.classList.toggle('visible', over);
});

// SWITCH CLICK -> FIRST BLACKOUT
lightSwitch.onclick = () => {
  lightSwitch.style.display='none';
  blackoutPanel.style.display='flex';
  startFirst();
};

// FIRST 60s COUNTDOWN
function startFirst(){
  timerEl.textContent = t1;
  countdown1 = setInterval(()=>{
    t1--; timerEl.textContent = t1;
    if(t1<=0) clearFirst();
  },1000);
}
skipBtn.onclick = clearFirst;
function clearFirst(){
  clearInterval(countdown1);
  blackoutPanel.style.display='none';
  showPowerBack();
}

// POWER BACK (20s WHITE)
function showPowerBack(){
  powerBack.style.display='flex';
  setTimeout(()=>{
    powerBack.style.display='none';
    showImbalance();
  },20000);
}

// IMBALANCE WARNING (20s)
function showImbalance(){
  imbTimerEl.textContent = t2;
  imbalancePanel.style.display='flex';
  countdown2 = setInterval(()=>{
    t2--; imbTimerEl.textContent = t2;
    if(t2<=0) clearSecond();
  },1000);
}
function clearSecond(){
  clearInterval(countdown2);
  imbalancePanel.style.display='none';
  startGame();
}

// START GAME
function startGame(){
  board = Array(9).fill(null);
  gameOver=false; userTurn=true;
  gamePanel.style.display='flex';
  symbolSel.style.display='block';
  analysisEl.textContent=''; resultEl.textContent='';
  quantumLabel.style.display='none';
}

// SYMBOL SELECTION
chooseX.onclick = ()=> initGame('X','O');
chooseO.onclick = ()=> initGame('O','X');
function initGame(u,c){
  userSym=u; compSym=c; symbolSel.style.display='none';
  buildBoard();
}

// BUILD BOARD
function buildBoard(){
  boardEl.innerHTML='';
  board.forEach((_,i)=>{
    const cell=document.createElement('div');
    cell.className='cell'; cell.dataset.idx=i;
    cell.onclick=userMove; boardEl.append(cell);
  });
}

// USER MOVE
function userMove(e){
  const i=+e.target.dataset.idx;
  if(!userTurn||gameOver||board[i])return;
  board[i]=userSym; e.target.textContent=userSym;
  if(checkWin(userSym)) return end('✅ You win!');
  userTurn=false;
  runComputer(i);
}

// COMPUTER TURN & ANALYSIS
function runComputer(lastIdx){
  // generate analysis lines
  const lines = board.map((v,i)=>v?null:`If I play at cell ${i} → evaluating`).filter(Boolean);
  lines.push(`Decision: I will play at cell 4.`);
  analysisEl.textContent='';
  let idx=0;
  const iv = setInterval(()=>{
    analysisEl.textContent+=lines[idx]+'\n';
    idx++;
    if(idx>=lines.length){
      clearInterval(iv);
      placeComp(4);
    }
  }, 800); // ~5-10s total
}

function placeComp(i){
  board[i]=compSym; boardEl.children[i].textContent=compSym;
  if(checkWin(compSym))return end('❌ Computer wins');
  quantumLabel.style.display='block';
  quantumToggle.onchange=activateQuantum;
  userTurn=true;
}

// QUANTUM TOGGLE
function activateQuantum(){
  if(!quantumToggle.checked||gameOver) return;
  board.forEach((_,i)=>boardEl.children[i].textContent=userSym);
  end('✅ You win!'); 
}

// CHECK WINNER
function checkWin(s){
  return [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    .some(([a,b,c])=>board[a]===s&&board[b]===s&&board[c]===s);
}

// END GAME
function end(msg){
  gameOver=true; resultEl.textContent=msg;
}
