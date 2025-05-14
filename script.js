const torch=document.getElementById('torch'),lightSwitch=document.getElementById('light-switch'),
blackoutPanel=document.getElementById('blackout-panel'),timerEl=document.getElementById('timer'),
skipBtn=document.getElementById('skip-quantum'),powerBack=document.getElementById('powerback-panel'),
imbalancePanel=document.getElementById('imbalance-panel'),imbTimerEl=document.getElementById('imbalance-timer'),
gamePanel=document.getElementById('game-panel'),symbolSel=document.getElementById('symbol-selection'),
chooseX=document.getElementById('choose-x'),chooseO=document.getElementById('choose-o'),
boardEl=document.getElementById('board'),analysisEl=document.getElementById('analysis'),
quantumLabel=document.getElementById('quantum-toggle-label'),quantumToggle=document.getElementById('quantum-toggle'),
resultEl=document.getElementById('game-result');

let t1=60,t2=20,count1,count2,board,user,comp,userTurn=true,gameOver=false;

const isDesktop=window.matchMedia('(hover:hover)').matches;
if(isDesktop){
  document.addEventListener('mousemove',e=>{
    torch.style.left=e.pageX+'px';torch.style.top=e.pageY+'px';
    const r=lightSwitch.getBoundingClientRect(),hover=e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;
    lightSwitch.classList.toggle('visible',hover);
  });
}else{
  window.addEventListener('scroll',()=>{
    const r=lightSwitch.getBoundingClientRect(),center=innerHeight/2;
    lightSwitch.classList.toggle('visible',r.top<center&&r.bottom>center);
  });
}

lightSwitch.onclick=()=>{
  blackoutPanel.style.display='flex';
  count1=setInterval(()=>{timerEl.textContent=--t1;if(t1<=0)firstDone();},1000);
};

skipBtn.onclick=firstDone;
function firstDone(){
  clearInterval(count1);blackoutPanel.style.display='none';
  powerBack.style.display='flex';
  setTimeout(()=>{powerBack.style.display='none';imbalancePanel.style.display='flex';imbalanceCount();},20000);
}

function imbalanceCount(){
  imbTimerEl.textContent=t2;
  count2=setInterval(()=>{imbTimerEl.textContent=--t2;if(t2<=0)secondDone();},1000);
}

function secondDone(){
  clearInterval(count2);imbalancePanel.style.display='none';startGame();
}

function startGame(){
  gamePanel.style.display='block';symbolSel.style.display='block';board=Array(9).fill(null);
}

chooseX.onclick=()=>initGame('X','O');chooseO.onclick=()=>initGame('O','X');

function initGame(u,c){user=u;comp=c;symbolSel.style.display='none';buildBoard();}

function buildBoard(){
  boardEl.innerHTML='';
  board.forEach((_,i)=>{
    let d=document.createElement('div');d.className='cell';d.onclick=()=>userMove(i);boardEl.append(d);
  });
}

function userMove(i){
  if(gameOver||board[i])return;board[i]=user;boardEl.children[i].textContent=user;userTurn=false;
  analysisEl.textContent='Evaluating...';setTimeout(()=>compMove(4),2000);
}

function compMove(i){
  board[i]=comp;boardEl.children[i].textContent=comp;analysisEl.textContent='Computer moved to '+i;
  quantumLabel.style.display='block';quantumToggle.onclick=()=>{board.fill(user);[...boardEl.children].forEach(c=>c.textContent=user);resultEl.textContent='✅ You win!';gameOver=true;}
}
