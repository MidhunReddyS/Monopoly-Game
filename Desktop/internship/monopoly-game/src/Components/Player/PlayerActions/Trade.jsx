import {  useRef, useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { tileActions, playerActions } from "../../../Store/Store";
import PropertyInfoCard from "../PropertyInfoCard";
import "./Mortgage.css"

export default function Trade({player}){

    const tiles = useSelector((state) => state.tiles);
    const players = useSelector((state) => state.players);

    const ref = useRef();
    const [player1Side, setPlayer1Side] = useState({selecteCards: [], amount:0});
    const [player2Side, setPlayer2Side] = useState({selecteCards: [], amount:0});
    const [player2, setplayer2] = useState();

    const dispatch = useDispatch();

    const player1AvaliableCards = player.ownedTilesId.filter((id) => { return(!tiles[id].amenity.houses || !tiles[id].amenity.hotel)}).filter((id) => !tiles[id].mortgage);
    let player2AvaliableCards = ""
    if(player2){
        player2AvaliableCards = player2.ownedTilesId.filter((id) => { return(!tiles[id].amenity.houses || !tiles[id].amenity.hotel)}).filter((id) => !tiles[id].mortgage); 
    }
    

    function sideHandle(position,side,setside){ 
        if(!side.selecteCards.length){

            setside((previous) => {return {...previous, selecteCards:[position]}});  
        }else {
            if(side.selecteCards.includes(position)){

                setside((previous) => {return {...previous, selecteCards:previous.selecteCards.filter((id) => { return (id !== position);})}})   
            }else {

                setside((previous) => {return {...previous, selecteCards:[...previous.selecteCards, position]}});               
            }
        } 
    }

    function playerChoiceHandler(event){
        event.preventDefault();
        // console.log(event.target[1].value);
        setplayer2(players[event.target[1].value]);
    }

    function changeHandler(event,setSide){
        setSide((previous) => {return {...previous, amount:event.target.value}});
    }

    function confirmHandle() {
        dispatch(playerActions.removeAmount({id:player.id, amount:player1Side.amount}));
        dispatch(playerActions.removeAmount({id:player2.id, amount:player2Side.amount}));
        dispatch(playerActions.addAmount({id:player.id, amount:+player2Side.amount}));
        dispatch(playerActions.addAmount({id:player2.id, amount:+player1Side.amount}));
        player1Side.selecteCards.forEach((position) => {
            dispatch(tileActions.setOwner({position,id:player2.id, name:player2.name}));
            dispatch(playerActions.tradeTile({player1:player,player2:player2,position}));
            return;
        });
        player2Side.selecteCards.forEach((position) => {
            dispatch(tileActions.setOwner({position,id:player.id, name:player.name}));
            dispatch(playerActions.tradeTile({player1:player2,player2:player,position})); 
            return;
        });
        clearAll(); 
    }

    function clearAll(){
        setPlayer1Side({selecteCards: [], amount:0});
        setPlayer2Side({selecteCards: [], amount:0});
    }
    
    useEffect(() => {
        if(player2){
        setplayer2(players[player2.id])
    }
    }, [setplayer2, player2, players]);
    return(
        <>
            <form style={{display:"flex" ,justifyContent:"space-between", alignItems:"center"}} onSubmit={playerChoiceHandler}>
                <button id="controlButton" style={{width:"50%"}} onClick={() => {ref.current.showModal()}} type="submit">Trade</button>
                <select id="tradeSelect">
                    {players.filter((person) => person.id !== player.id).map((person) => <option value={person.id} key={person.id}>{person.name}</option>)}
                </select>
            </form>
            
            <dialog ref={ref} id="popUp" onClose={clearAll}>
                <div id="displayContainer">
                    <div id="displayTitles" style={{justifyContent:"space-around"}}>
                        <div style={{display:"flex", width:"500px", justifyContent:"space-between", alignItems:"center"}}>
                            <h1>{player.name}</h1>
                            <h1 id="amountBox">${player.amount}</h1>
                            <label style={{fontSize:"20px"}}>Transfer</label>
                            <input type="number"  style={{height:"20px", width:"70px", fontSize:"20px"}} max={2000} value={player1Side.amount} onChange={(event) => changeHandler(event,setPlayer1Side)}/>
                        </div>
                        <div style={{display:"flex", width:"500px", justifyContent:"space-between", alignItems:"center"}}>
                            <h1>{player2 && player2.name}</h1>
                            <h1 id="amountBox">${player2 && player2.amount}</h1>
                            <label style={{fontSize:"20px"}}>Transfer</label>
                            <input type="number"  style={{height:"20px", width:"70px", fontSize:"20px"}} value={player2Side.amount} onChange={(event) => changeHandler(event,setPlayer2Side)}/>
                        </div>
                    </div>
                    <div id="sectionContainer">
                        <div id="leftContainer">
                        {player1AvaliableCards.map((id) => <button key={id} id="tileButton" className={`${ player1Side.selecteCards.includes(id) ? "selected" : undefined}`}  onClick={() => sideHandle(id,player1Side,setPlayer1Side)}><PropertyInfoCard id={id}/></button>)}
                        </div>
                        <div id="vetical-line"></div>
                        <div id="rightContainer">
                        {player2AvaliableCards && player2AvaliableCards.map((id) => <button key={id} id="tileButton" onClick={() => sideHandle(id,player2Side,setPlayer2Side)} className={`${ player2Side.selecteCards.includes(id) ? "selected" : undefined}`}><PropertyInfoCard id={id} /></button>)}
                        </div>
                    </div>
                    <div id="displayOption">
                        {player2 && <button id="optionButton" disabled={((!player1Side.selecteCards.length && !player2Side.selecteCards.length) && (player1Side.amount ||  player2Side.amount)) || (player1Side.selecteCards.length && !player2Side.selecteCards.length && player2Side.amount<1) || (player2Side.selecteCards.length && !player1Side.selecteCards.length && player1Side.amount<1) || (player.amount < player1Side.amount || player2.amount < player2Side.amount)}  onClick={confirmHandle} >
                             Confirm </button>}
                        <button id="optionButton"  onClick={() => {clearAll(); ref.current.close()}} >Go Back!</button> 
                    </div>
                    
                </div>
            </dialog>
        </>
        
    );
}