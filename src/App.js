import './App.css';
import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combination';
import GameOver from './components/GameOver';

const PLAYERS={
  X:'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD =[
  [null,null,null],
  [null,null,null],
  [null,null,null],
]


function deriveActivePlayer(gameTurns){
  let currentPlayer='X';
  if(gameTurns.length>0 && gameTurns[0].player==='X'){
    currentPlayer='O';
  }
  return currentPlayer;
}

function derivedgameBoard(gameTurns){
  let gameBoard=[...INITIAL_GAME_BOARD.map(array=>[...array])];

  for(const turn of gameTurns){
      const{square,player}=turn;
      const {row,col}=square;
      gameBoard[row][col]=player;
  }
  return gameBoard
}

function derivedWinner(gameBoard,players){
  let winner;

for(const combination of WINNING_COMBINATIONS){
  const firstsquareSymbol=gameBoard[combination[0].row][combination[0].column];
  const secondsquareSymbol=gameBoard[combination[1].row][combination[1].column];
  const thirdsquareSymbol=gameBoard[combination[2].row][combination[2].column];

  if(firstsquareSymbol && firstsquareSymbol===secondsquareSymbol && firstsquareSymbol===thirdsquareSymbol){
     winner=players[firstsquareSymbol];
  }
}
  return winner;
}

function App() {

  const[players,setplayers]=useState({PLAYERS
  })
const [gameTurns,setGameTurns]=useState([])
// const [activePlayer,setActivePlayer]=useState('X');
const activePlayer=deriveActivePlayer(gameTurns)

const gameBoard=derivedgameBoard(gameTurns)

const winner=derivedWinner(gameBoard,players)

const hasDraw=gameTurns.length===9 && !winner;

function handleSelectSquare(rowIndex,colIndex){
  // setActivePlayer((currActivePlayer)=>currActivePlayer==='X'?'O':'X')
  setGameTurns((prevTurns )=> {
    const currentPlayer=deriveActivePlayer(prevTurns)
    const updatedTurn =[{square :{row:rowIndex,col:colIndex},player:currentPlayer},...prevTurns,];
    return updatedTurn
  })

}

function handleRestart(){
  setGameTurns([]);
}

function handlePlayerNameChange(symbol,newName){
   setplayers(prevPlayers=>{
    return{
      ...prevPlayers,
      [symbol]:newName
    }
   })
}

  return <main>
    <div id="game-container">
      <ol id="players" className='highlight-player'>
        <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerNameChange}/>
        <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer==='O'} onChangeName={handlePlayerNameChange}/>
      </ol>
      {(winner  || hasDraw)&& <GameOver winner={winner} onRestart={handleRestart}/>}
     <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
    </div>
    <Log turns={gameTurns}/>
  </main>
}

export default App;
