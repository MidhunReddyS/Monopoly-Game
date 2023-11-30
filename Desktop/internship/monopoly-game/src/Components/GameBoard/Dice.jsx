import { useSelector, useDispatch } from 'react-redux'
import { tileActions, playerActions, chanceActions, communityChestActions, chanceAndCommunityDisplayActions } from "../../Store/Store";
import { useState, useEffect, useRef } from 'react';
import SpecialAction from './SpecialAction';
import ReactDice from 'react-dice-complete';
import { sendGameData } from '../../Store/FireBaseLink';

function rollDice(){
    const die1 = Math.round(Math.random()*5 + 1);
    const die2 = Math.round(Math.random()*5 + 1);
    return [die1, die2]
}


export default function Dice( player, id ){

    const players = useSelector((state) => state.players);
    const tiles = useSelector((state) => state.tiles);
    const dispatch = useDispatch();

    const [position, setPosition] = useState("");
    const [dieRoll, setDieRoll] = useState(""); 
    const [currentButton, setCurrentButton] = useState("roll");
    const [doubles, setDoubles] = useState(0);
    const [diceInialization, setDiceInialization] = useState(true);
    const [rollEnable, setRollEnable] = useState(true);
    const reactDice = useRef();
    
    let currentPlayer = players.find((player) => player.turn === true);

    useEffect(() => {
        if(currentPlayer.jail.inJail){
            if(currentPlayer.jail.jailTime > 0){
                setCurrentButton("in jail");
            }
            else { setCurrentButton("pay jail") }
    }}, [currentPlayer]);

    function movePlayer(newPosition){
        if(newPosition > 39) {dispatch(playerActions.addAmount({id:currentPlayer.id, amount:200}));};
        newPosition = newPosition > 39 ? newPosition - 40 : newPosition; 
        if(newPosition === 30){ 
            newPosition = 10;
            dispatch(playerActions.sendToJail({id:currentPlayer.id}));  
            dispatch(playerActions.nexTurn({id:currentPlayer.id}));
            setRollEnable(true);
            setCurrentButton("roll");
        }
        else{
            if(!tiles[newPosition].ownerId){ setCurrentButton("Buy")}
            else if(tiles[newPosition].ownerId.name === currentPlayer.name || tiles[newPosition].mortgage){ if(tiles[newPosition].mortgage){console.log("motgage")} checkDoubles();}
            else if(tiles[newPosition].ownerId === "Bank"){ 
                if((tiles[newPosition].title.includes("In Jail") || tiles[newPosition].title.includes("Free Parking") || tiles[newPosition].title.includes("Start"))){ checkDoubles(); }
                else {setCurrentButton("special") }}
            else if(tiles[newPosition].ownerId.name !== currentPlayer.name && !tiles[newPosition].mortgage){ setCurrentButton("pay") }
        }
        console.log(newPosition);
        setPosition(newPosition);
        dispatch(tileActions.movePlayerTile({ newPosition, player:currentPlayer}));
        dispatch(playerActions.changePosition({newPosition, id:currentPlayer.id}));
        setRollEnable(true);
    }

    function rollHandle(values){
        dispatch(chanceAndCommunityDisplayActions.clear());
        let roll = values; 
        // console.log(roll);
        setDieRoll(roll[0] + roll[1]);
        // roll[0] = roll[1];
        let newPosition = currentPlayer.position + roll[0] + roll[1];
        if( roll[0] === roll[1]){
            setDoubles((previousValue) => previousValue+=1);
            if(doubles === 2){ newPosition = 30; setDoubles(0);}
        }else {setDoubles(0);}
        movePlayer(newPosition);
    }

    function buyHandle(){
        // console.log(position);
        dispatch(tileActions.setOwner({position,id:currentPlayer.id, name:currentPlayer.name}));
        dispatch(playerActions.buyTile({position,id:currentPlayer.id, price:tiles[position].price}));
        // setPosition("");
        checkDoubles();
    }

    function payHandle(){
        let rentAmount = 0;
        if(tiles[position].color === "rail"){
            rentAmount = tiles[position].rentAmount;
        }
        else if(tiles[position].color === "utility"){
            rentAmount = tiles[position].rentAmount * dieRoll;
        }
        else{
            rentAmount = tiles[position].rent.site;
            if(tiles[position].amenity.set){ rentAmount = tiles[position].rent.set; };
            if(tiles[position].amenity.houses === 1){ rentAmount = tiles[position].rent.house1;};
            if(tiles[position].amenity.houses === 2){ rentAmount = tiles[position].rent.house2;};
            if(tiles[position].amenity.houses === 3){ rentAmount = tiles[position].rent.house3;};
            if(tiles[position].amenity.houses === 4){ rentAmount = tiles[position].rent.house4;};
            if(tiles[position].amenity.hotel){ rentAmount = tiles[position].rent.hotel;};
            
        }
        // console.log(rentAmount);
        dispatch(playerActions.payRent({rentAmount, ownerId:+tiles[position].ownerId.id, id:currentPlayer.id})); 
        checkDoubles(); 
    }

    function handleSpecialAction(action){
        if(action.id === "payTax"){
            // console.log(action.amount);
            dispatch(playerActions.removeAmount({id:currentPlayer.id, amount:-action.amount}));
            checkDoubles();
        }
        if(action.card){
            console.log(action.card);
            dispatch(chanceAndCommunityDisplayActions.setCard({id:action.id, card:action.card}));
            // console.log(action.id);
            if(action.card.method === "movePlayer"){
                movePlayer(action.card.position);
                if(action.id ==="chance") {dispatch(chanceActions.replaceCard({card:action.card}));}
                else{dispatch(communityChestActions.replaceCard({card:action.card}));}
            }
            else if(action.card.method === "moveAfterCheck"){
                if(action.card.position > currentPlayer.position){ movePlayer(action.card.position)}
                else { movePlayer( 40 + action.card.position) }
                dispatch(chanceActions.replaceCard({card:action.card}));
            }
            else if(action.card.method === "getMoney"){ 
                dispatch(playerActions.addAmount({id:currentPlayer.id, amount:action.card.amount}));
                checkDoubles(); 
                if(action.id ==="chance") {dispatch(chanceActions.replaceCard({card:action.card}));}
                else{dispatch(communityChestActions.replaceCard({card:action.card}));}
            }
            else if(action.card.method === "payMoney"){ 
                dispatch(playerActions.removeAmount({id:currentPlayer.id, amount:action.card.amount}));
                checkDoubles();
                if(action.id ==="chance") {dispatch(chanceActions.replaceCard({card:action.card}));}
                else{dispatch(communityChestActions.replaceCard({card:action.card}));}
            }
            else if(action.card.method === "jailFree"){ 
                dispatch(playerActions.jailFreeCard({id:currentPlayer.id, card:action.card}));
                checkDoubles();
            }
            else if(action.card.method === "goBack3"){
                movePlayer(currentPlayer.position-3);
                dispatch(chanceActions.replaceCard({card:action.card}));
            }
            else if(action.card.method === "moneyAll"){
                dispatch(playerActions.addAmount({id:currentPlayer.id, amount:action.card.amount*players.length}));
                players.map((player) => dispatch(playerActions.addAmount({id:player.id, amount:-action.card.amount})));
                if(action.id ==="chance") {dispatch(chanceActions.replaceCard({card:action.card}));}
                else{dispatch(communityChestActions.replaceCard({card:action.card}));}
                checkDoubles();
            }
            else if(action.card.method === "moveAfterCheckArray"){
                let moveTo = action.card.position.map((a) => a-currentPlayer.position).sort((a,b) => Math.abs(a)-Math.abs(b));
                movePlayer(moveTo[0]+currentPlayer.position);
                if(tiles[moveTo[0]+currentPlayer.position].ownerId){
                    if(tiles[moveTo[0]+currentPlayer.position].ownerId.id !== currentPlayer.ownerId){
                        setCurrentButton("pay special");
                    }
                }
                dispatch(chanceActions.replaceCard({card:action.card}));
            }
            else if(action.card.method === "repairs"){
                let amount = action.card.amount[0]*currentPlayer.amenities.houses + action.card.amount[1]*currentPlayer.amenities.hotels;
                dispatch(playerActions.removeAmount({id:currentPlayer.id, amount}));
                if(action.id ==="chance") {dispatch(chanceActions.replaceCard({card:action.card}));}
                else{dispatch(communityChestActions.replaceCard({card:action.card}));}
                checkDoubles();
            }
            return
        }
       
    }

    function jailHandle(action){
        if(action.id === "pay") {
            dispatch(playerActions.removeAmount({id:currentPlayer.id, amount:50}));
            dispatch(playerActions.outOfJail({id:currentPlayer.id}));
            setCurrentButton("roll");
        }
        if(action.id === "jailFree"){
            if(currentPlayer.jail.jailFree[0].id === 9){dispatch(chanceActions.replaceCard({card:currentPlayer.jail.jailFree[0]}));}
            else {dispatch(communityChestActions.replaceCard({card:currentPlayer.jail.jailFree[0]}));}
            dispatch(playerActions.jailFreeCard({id:currentPlayer.id, amount:null}));
            dispatch(playerActions.outOfJail({id:currentPlayer.id}));
            setCurrentButton("roll");
        }
        if(action.id === "roll") {
            const roll = rollDice();
            setDiceInialization(true);
            reactDice.current.rollAll(roll);
            // roll[0] = roll[1];
            if(roll[0] === roll[1]){
                console.log("out");
                dispatch(playerActions.outOfJail({id:currentPlayer.id}));
                movePlayer(currentPlayer.position + roll[0] + roll[1]);
            }
            else{
                dispatch(playerActions.jailTimeReduce({id:currentPlayer.id}));
                console.log(`${currentPlayer.name} time reduced`);
                turnHandler();
            }
        }
    }

    function checkDoubles(){
        // console.log(doubles);
        if(doubles>0 && doubles<3){
            setCurrentButton("roll");
            return;
        }else{
            setCurrentButton("resting");
            return;
        }
    }

    function turnHandler(){
        dispatch(playerActions.nexTurn({id:currentPlayer.id}));
        dispatch(chanceAndCommunityDisplayActions.clear());
        setCurrentButton("roll");
        dispatch(sendGameData(players,tiles));
    }

    function specialPayHandle(){
        let rentAmount = 0;
        if(position === 12 || position === 28){
            let roll = rollDice();
            setDiceInialization(true);
            reactDice.current.rollAll(roll);
            rentAmount = (roll[0] + roll[1])*10;
            console.log(roll);
        }else{
            rentAmount = tiles[position].rentAmount*2;
        }
        dispatch(playerActions.payRent({rentAmount, ownerId:+tiles[position].ownerId.id, id:currentPlayer.id}));
        checkDoubles();
    }
    
    return (
        <div>

            <ReactDice ref={reactDice} disableIndividual={true} dieSize={85} rollTime={0.3} numDice={2} defaultRoll={6} faceColor='#FFFBF5' dotColor='#BE3144' rollDone={(totalValue, value) => {if(!diceInialization){rollHandle(value)}}}/>

            {currentButton === "roll" && <button disabled={!rollEnable} onClick={() => {setDiceInialization(false); setRollEnable(false); reactDice.current.rollAll()}}>Roll</button> }

            {currentButton === "Buy" && <button disabled={currentPlayer.amount< tiles[currentPlayer.position].price} onClick={buyHandle}>Buy</button>}

            {currentButton === "pay" && <button onClick={payHandle}>Pay Rent</button>}

            {currentButton === "resting" && <button disabled={currentPlayer.amount<0} onClick={turnHandler}>End Turn</button>}

            {currentButton === "special" && <SpecialAction tile={tiles[position]} player={currentPlayer} onClick={handleSpecialAction}/>}

            {currentButton === "in jail" && <>
                <button onClick={() => jailHandle({id:"roll"})}>Roll</button>
                <button onClick={() => jailHandle({id:"pay"})}>Pay $50</button>
                {currentPlayer.jail.jailFree.length >=1 && <button onClick={() => jailHandle({id:"jailFree"})}>Use Jail Free Card</button>}
            </>}

            {currentButton === "pay jail" && <button onClick={() => jailHandle({id:"pay"})}>Pay $50</button>}

            { currentButton === "pay special" && <button onClick={specialPayHandle}>Pay Rent</button> }
        </div>
    );
}