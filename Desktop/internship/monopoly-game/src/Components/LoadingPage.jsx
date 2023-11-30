import { forwardRef, useState} from "react";
import { useDispatch } from "react-redux";
import { playerActions } from "../Store/Store";
import { getGameData } from "../Store/FireBaseLink";
import loading from "../Assets/loading.gif"
import "./LoadingPage.css";


export let initialPlayer = [
    {
         id:0,
         name:"player1",
         color:"#CF0000",
         logo:"car",
         amount:1500,
         position:0,
         ownedTilesId:[],
         turn:true,
         jail:{inJail:false, jailTime:0, jailFree:[]},
         amenities:{houses:0, hotels:0},
     },
     {
         id:1,
         name:"player2",
         color:"#04009A",
         logo:"cannon",
         amount:1500,
         position:0,
         ownedTilesId:[],
         turn:false,
         jail:{inJail:false, jailTime:0, jailFree:[]},
         amenities:{houses:0, hotels:0},
     },
     {
         id:2,
         name:"player3",
         color:"#54E346",
         logo:"car",
         amount:1500,
         position:0,
         ownedTilesId:[],
         turn:false,
         jail:{inJail:false, jailTime:0, jailFree:[]},
         amenities:{houses:0, hotels:0},
     },
     {
         id:3,
         name:"player4",
         color:"#00AF91",
         logo:"car",
         amount:1500,
         position:0,
         ownedTilesId:[],
         turn:false,
         jail:{inJail:false, jailTime:0, jailFree:[]},
         amenities:{houses:0, hotels:0},
     }
 ]

const LoadingPage = forwardRef( ({onClick}, ref) => {
    const [newGame, setNewGame] = useState("");
    const [playerCount, setPlayerCounnt] = useState(2);
    const [players, setPlayers] = useState([]);
    const dispatch = useDispatch();

    function playersHandle(event){
        event.preventDefault();
        console.log(players);
        dispatch(playerActions.initializePlayers({players:players}));
    }

    async function loadGameHandle(){
        setNewGame("loading")
        dispatch(getGameData(ref));
        
    }

    return(
        <dialog ref={ref} className="popUp">
            {!newGame && <>
                <h1 id="LoadingTitle">Monopoly</h1>
                <div id="loadButtons">
                    <button onClick={() => {setNewGame("selectNoOfPlayers")}}>New Game</button>
                    <button onClick={loadGameHandle}>Load Game</button>
                </div>   
            </>}
            {newGame === "selectNoOfPlayers" && <div>
                <h1>Select Numbet of Players</h1>
                <form className="selectNoOfPlayers" onSubmit={(event) => {setNewGame("custamizePlayers"); setPlayers(initialPlayer.slice(0,event.target[0].value))}}>
                    <h1>{playerCount}</h1>
                    <input  id="playerSlider" type="range" min={2} max={4} value={playerCount} onChange={(event) => setPlayerCounnt(event.target.value)}/>
                    <button type="submit" >Confirm</button>
                </form>
            </div>}
            {newGame === "custamizePlayers" && <div>
                <h1>Customize Players</h1>
                <form onSubmit={(event) => {playersHandle(event); ref.current.close()}} id="playerForm">
                    {players.map((player, i=0) => { i++; return(
                        <div>
                            <label>Name</label>
                            <input type="text" value={player.name} onChange={(event) => setPlayers((previous) => {let newlist = [...previous]; newlist[i-1].name = event.target.value; return newlist})}/>
                            <label>Color</label>
                            <input type="color" value={player.color} onChange={(event) => setPlayers((previous) => {let newlist = [...previous]; newlist[i-1].color = event.target.value; return newlist})}/>
                        </div>
                    )})}
                    <button type="submit">Confirm</button>
                    <button onClick={() => {setNewGame("selectNoOfPlayers")}}>Go Back</button>
                </form>
            </div>} 

            {newGame === "loading" && <div>
                <img src={loading} alt="loading" />
                </div>}    

        </dialog>
    );
})

export default LoadingPage;