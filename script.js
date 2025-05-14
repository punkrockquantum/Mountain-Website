const torch=document.getElementById('torch'),
switchBtn=document.getElementById('light-switch'),
blackout=document.getElementById('blackout-panel'),
powerback=document.getElementById('powerback-panel'),
imbalance=document.getElementById('imbalance-panel'),
game=document.getElementById('game-panel'),
timer=document.getElementById('timer'),
skip=document.getElementById('skip-quantum'),
imbTimer=document.getElementById('imbalance-timer'),
boardEl=document.getElementById('board'),
symbolSel=document.getElementById('symbol-selection'),
analysis=document.getElementById('analysis'),
quantumLabel=document.getElementById('quantum-toggle-label'),
quantum=document.getElementById('quantum-toggle'),
result=document.getElementById('game-result'),
chooseX=document.getElementById('choose-x'),chooseO=document.getElementById('choose-o');

document.addEventListener('mousemove',e=>{
  torch.style.left=e.pageX+'px';torch.style.top=e.pageY+'px';
});

switchBtn.onclick=()=>{
  blackout.style.display='flex';
  let t1=60,count1=setInterval(()=>{
    timer.textContent=--t1;
    if(t1<=0){clearInterval(count1);startPowerback();}
  },1000);
};

skip.onclick=startPowerback;

function startPowerback(){
  blackout.style.display='none';powerback.style.display='flex';
  setTimeout(()=>{powerback.style.display='none';startImbalance();},2000)
}

function startImbalance(){
  imbalance.style.display='flex';
  let t2=20,count2=setInterval(()=>{
    imbTimer.textContent=--t2;
    if(t2<=0){clearInterval(count2);imbalance.style.display='none';startGame();}
  },1000);
}

function startGame(){
  game.style.display='block';symbolSel.style.display='block';board=Array(9).fill('');
}

chooseX.onclick=()=>initBoard('X','O');chooseO.onclick=()=>initBoard('O','X');

function initBoard(u,c){
  symbolSel.style.display='none';
  board.forEach((_,i)=>{
    const d=document.createElement('div');d.className='cell';d.onclick=()=>userMove(i,u,c);boardEl.append(d);
  });
}

function userMove(i,u,c){
  if(board[i])return;board[i]=u;boardEl.children[i].textContent=u;
  analysis.textContent='Calculating moves...';
  setTimeout(()=>{compMove(4,c,u);},1500);
}

function compMove(i,c,u){
  board[i]=c;boardEl.children[i].textContent=c;analysis.textContent='Computer chose center.';
  quantumLabel.style.display='block';quantum.onclick=()=>activateQuantum(u);
}

function activateQuantum(u){
  board.fill(u);Array.from(boardEl.children).forEach(c=>c.textContent=u);
  result.textContent='✅ You win!';
}
