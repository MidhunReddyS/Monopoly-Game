import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react';
import './App.css';
import Board from './Components/GameBoard/Board';
import PlayerCard from './Components/Player/playerCard';
import LoadingPage from './Components/LoadingPage';

let loading = true;

function App() {

  const players = useSelector((state) => state.players);

  const loadingPage = useRef();

  useEffect(() => {
    loadingPage.current.showModal();
    loading = false;
  },[])


  return (
    <>
      {loading && <LoadingPage ref={loadingPage}/>}
      <div className="App">
        <div id="leftPlayerContainer">
          <PlayerCard player={players[0]}/>
          {players[3] && <PlayerCard player={players[3]}/>}
        </div>
        <div style={{minWidth:"300px"}}>
          <Board className="gameBoard"></Board>
        </div>
        <div id="rightPlayerContainer">
          <PlayerCard player={players[1]}/>
          {players[2] && <PlayerCard player={players[2]}/>}
        </div>
      </div>
    </>
  );
}

export default App;
