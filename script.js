const torch = document.getElementById('torch');
const lightSwitch = document.getElementById('light-switch');
const blackoutPanel = document.getElementById('blackout-panel');
const timerEl = document.getElementById('timer');
const skipBtn = document.getElementById('skip-quantum');
const powerBack = document.getElementById('powerback-panel');
const imbalancePanel = document.getElementById('imbalance-panel');
const imbalanceTimerEl = document.getElementById('imbalance-timer');
const gamePanel = document.getElementById('game-panel');
const chooseX = document.getElementById('choose-x');
const chooseO = document.getElementById('choose-o');
const symbolSel = document.getElementById('symbol-selection');
const boardEl = document.getElementById('board');
const analysisEl = document.getElementById('analysis');
const quantumLabel = document.getElementById('quantum-toggle-label');
const quantumToggle = document.getElementById('quantum-toggle');
const resultEl = document.getElementById('game-result');

let timer1=60,timer2=20,int1,int2,user,comp,board,userTurn=true;

document.addEventListener('mousemove', e => {
  torch.style.left = e.pageX + 'px';
  torch.style.top = e.pageY + 'px';
  const rect = lightSwitch.getBoundingClientRect();
  lightSwitch.classList.toggle('visible', e.clientX>=rect.left&&e.clientX<=rect.right&&e.clientY>=rect.top&&e.clientY<=rect.bottom);
});

window.addEventListener('scroll',()=>{
  if('ontouchstart' in window){
    const rect = lightSwitch.getBoundingClientRect();
    const center=window.innerHeight/2;
    lightSwitch.classList.toggle('visible',rect.top<center&&rect.bottom>center);
  }
});

lightSwitch.onclick=()=>{
  blackoutPanel.style.display='flex';
  int1=setInterval(()=>{
    timerEl.textContent=--timer1;
    if(timer1<=0)nextStep();
  },1000);
};

skipBtn.onclick=nextStep;

function nextStep(){
  clearInterval(int1);
  blackoutPanel.style.display='none';
  powerBack.style.display='flex';
  setTimeout(()=>{
    powerBack.style.display='none';
    imbalancePanel.style.display='flex';
    int2=setInterval(()=>{
      imbalanceTimerEl.textContent=--timer2;
      if(timer2<=0){clearInterval(int2);imbalancePanel.style.display='none';gameStart();}
    },1000);
  },20000);
}

function gameStart(){
  gamePanel.style.display='block';symbolSel.style.display='block';board=Array(9).fill('');
}

chooseX.onclick=()=>setSymbols('X','O');chooseO.onclick=()=>setSymbols('O','X');

function setSymbols(u,c){
  user=u;comp=c;symbolSel.style.display='none';
  boardEl.innerHTML='';board.forEach((_,i)=>{
    const d=document.createElement('div');d.className='cell';d.onclick=()=>userMove(i);boardEl.append(d);
  });
}

function userMove(i){
  if(board[i]||!userTurn)return;board[i]=user;boardEl.children[i].textContent=user;userTurn=false;
  analysisEl.textContent='Analyzing...';
  setTimeout(()=>{
    board[4]=comp;boardEl.children[4].textContent=comp;
    analysisEl.textContent='Computer plays center.';quantumLabel.style.display='block';userTurn=true;
  },2000);
}

quantumToggle.onclick=()=>{
  board.fill(user);Array.from(boardEl.children).forEach(c=>c.textContent=user);resultEl.textContent='✅ You win!';
};
