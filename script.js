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
  setTimeout(()=>{powerback.style.display='none';startImbalance();},20000);
}

function startImbalance(){
  imbalance.style.display='flex';
  let t2=20,count2=setInterval(()=>{
    imbTimer.textContent=--t2;
    if(t2<=0){clearInterval(count2);imbalance.style.display='none';startGame();}
  },1000);
}

function startGame(){
  game.style.display='block';
  symbolSel.style.display='block';
  boardEl.innerHTML='';
  analysis.textContent='';
  result.textContent='';
  quantumLabel.style.display='none';
  quantum.checked=false;
  board=Array(9).fill('');
}

chooseX.onclick=()=>initBoard('X','O');
chooseO.onclick=()=>initBoard('O','X');

let userSymbol,compSymbol;
function initBoard(u,c){
  userSymbol=u;compSymbol=c;symbolSel.style.display='none';
  board.forEach((_,i)=>{
    const d=document.createElement('div');d.className='cell';
    d.onclick=()=>userMove(i);boardEl.append(d);
  });
}

function userMove(i){
  if(board[i] || quantum.checked || result.textContent)return;
  board[i]=userSymbol;
  boardEl.children[i].textContent=userSymbol;
  analysis.textContent='Analyzing your move...\n';
  setTimeout(()=>computerThink(),500);
}

function computerThink(){
  let moves=board.map((v,i)=>!v?i:null).filter(v=>v!==null);
  if(moves.length===0)return endGame('Draw!');

  let lines=moves.map(i=>`Evaluating move at position ${i}...`);
  lines.push(`Best move found: position ${moves[0]}`);

  let currentLine=0;
  analysis.textContent='';

  const thinkInterval=setInterval(()=>{
    analysis.textContent+=lines[currentLine++]+'\n';
    analysis.scrollTop=analysis.scrollHeight;
    if(currentLine>=lines.length){
      clearInterval(thinkInterval);
      compMove(moves[0]);
    }
  },800);
}

function compMove(i){
  setTimeout(()=>{
    board[i]=compSymbol;
    boardEl.children[i].textContent=compSymbol;
    analysis.textContent+=`Computer places "${compSymbol}" at position ${i}\n`;
    quantumLabel.style.display='block';
    quantum.onclick=activateQuantum;
    checkWinConditions();
  },500);
}

function activateQuantum(){
  board.forEach((_,i)=>boardEl.children[i].textContent=userSymbol);
  endGame('✅ Quantum activated — You win!');
}

function checkWinConditions(){
  const winningCombos=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  let winner=null;
  winningCombos.forEach(combo=>{
    if(board[combo[0]] && board[combo[0]]===board[combo[1]] && board[combo[1]]===board[combo[2]])
      winner=board[combo[0]];
  });

  if(winner){
    if(winner===userSymbol)endGame('✅ You win!');
    else endGame('❌ Computer wins!');
  } else if(!board.includes('')) {
    endGame('Draw!');
  }
}

function endGame(msg){
  result.textContent=msg;
  quantumLabel.style.display='none';
}