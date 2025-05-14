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

let t1=60,t2=20,count1,count2,board,user,comp,userTurn=true;

if(matchMedia('(hover:hover)').matches){
  document.addEventListener('mousemove',e=>{
    torch.style.left=e.pageX+'px';torch.style.top=e.pageY+'px';
    const r=switchBtn.getBoundingClientRect(),hover=e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;
    switchBtn.classList.toggle('visible',hover);
  });
}else{
  window.addEventListener('scroll',()=>{
    const r=switchBtn.getBoundingClientRect(),mid=window.innerHeight/2;
    switchBtn.classList.toggle('visible',r.top<mid&&r.bottom>mid);
  });
}

switchBtn.onclick=()=>{
  blackout.style.display='flex';
  count1=setInterval(()=>{timer.textContent=--t1;if(t1<=0)initPowerback();},1000);
};

skip.onclick=initPowerback;

function initPowerback(){
  clearInterval(count1);blackout.style.display='none';powerback.style.display='flex';
  setTimeout(()=>{powerback.style.display='none';initImbalance();},20000);
}

function initImbalance(){
  imbalance.style.display='flex';
  count2=setInterval(()=>{imbTimer.textContent=--t2;if(t2<=0){clearInterval(count2);imbalance.style.display='none';initGame();}},1000);
}

function initGame(){
  game.style.display='block';symbolSel.style.display='block';board=Array(9).fill('');
}

chooseX.onclick=()=>startGame('X','O');chooseO.onclick=()=>startGame('O','X');

function startGame(u,c){
  user=u;comp=c;symbolSel.style.display='none';
  board.forEach((_,i)=>{
    const d=document.createElement('div');d.className='cell';d.onclick=()=>userMove(i);boardEl.append(d);
  });
}

function userMove(i){
  if(board[i]||!userTurn)return;board[i]=user;boardEl.children[i].textContent=user;userTurn=false;
  analysis.textContent='Calculating...';
  setTimeout(()=>{compMove(4);},2000);
}

function compMove(i){
  board[i]=comp;boardEl.children[i].textContent=comp;analysis.textContent='Computer chose center.';
  quantumLabel.style.display='block';quantum.onclick=activateQuantum;userTurn=true;
}

function activateQuantum(){
  board.fill(user);Array.from(boardEl.children).forEach(c=>c.textContent=user);
  result.textContent='✅ You win!';
}
