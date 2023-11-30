import {  useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { tileActions, playerActions } from "../../../Store/Store";
import PropertyInfoCard from "../PropertyInfoCard";
import "./Mortgage.css"


export default function Mortgage({player}){

    const ref = useRef();
    const [mortgageSelected, setMortgageSelected] = useState([]);
    const [unMortgageSelected, setUnMortgageSelected] = useState([]);
    const [amount, setAmount] = useState(0);
    const tiles = useSelector((state) => state.tiles);

    const dispatch = useDispatch();

    const mortgagableTilesId = player.ownedTilesId.filter((id) => { return(!tiles[id].amenity.houses || !tiles[id].amenity.hotel)}).filter((id) => !tiles[id].mortgage);
    const mortgagedId = player.ownedTilesId.filter((id) => tiles[id].mortgage); 

    function mortgageHandle(position){ 
        if(!mortgageSelected.length){

            setMortgageSelected((previous) => previous = [position]);
            setAmount((previous) => previous += tiles[position].price/2);
        }else { 
            if(mortgageSelected.includes(position)){

                setMortgageSelected((previous) => previous.filter((id) => { return (id !== position);}));
                setAmount((previous) => previous -= tiles[position].price/2); 
            }else {

                setMortgageSelected((previous) => previous = [...previous, position]);
                setAmount((previous) => previous += tiles[position].price/2);
            }
        } 
    }
    function unMortgageHandle(position){
        if(!unMortgageSelected.length){

            setUnMortgageSelected((previous) => previous = [position]);
            setAmount((previous) => previous -= Math.round((tiles[position].price/2)*1.1));
        }else { 
            if(unMortgageSelected.includes(position)){

                setUnMortgageSelected((previous) => previous.filter((id) => { return (id !== position);}));
                setAmount((previous) => previous += Math.round((tiles[position].price/2)*1.1)); 
            }else {

                setUnMortgageSelected((previous) => previous = [...previous, position]);
                setAmount((previous) => previous -= Math.round((tiles[position].price/2)*1.1));
            }
        }
    }


    function confirmHandle() {
    
        mortgageSelected.map((position) => dispatch(tileActions.mortgageManager({position})));
        unMortgageSelected.map((position) => dispatch(tileActions.mortgageManager({position})));
        dispatch(playerActions.addAmount({id:player.id, amount:amount})) 
        clearAll();
    }

    function clearAll(){
        setMortgageSelected([]);
        setUnMortgageSelected([]);
        setAmount(0);
    }

    return(
        <>
            <button id="controlButton" onClick={() => {ref.current.showModal()}}>Mortgage</button>
            <dialog ref={ref} id="popUp" onClose={clearAll}>
                <div id="displayContainer">
                    <div id="displayTitles">
                        <h1>Mortgage</h1>
                        <h1 id="amountBox">${player.amount} {amount>0 ? <span className="positiveChange">+${amount}</span>: amount < 0 ? <span className="negitiveChange">-${Math.abs(amount)}</span>:<></>}</h1>
                        <h1>Unmortgage</h1>
                    </div>
                    <div id="sectionContainer">
                        <div id="leftContainer">
                        {mortgagableTilesId.map((id) => <button key={id} id="tileButton" className={`${ mortgageSelected.includes(id) ? "selected" : undefined}`}  onClick={() => mortgageHandle(id)}><PropertyInfoCard id={id}/></button>)}
                        </div>
                        <div id="vetical-line"></div>
                        <div id="rightContainer">
                        {mortgagedId.map((id) => <button key={id} id="tileButton" onClick={() => unMortgageHandle(id)} className={`${ unMortgageSelected.includes(id) ? "selected" : undefined}`}><PropertyInfoCard id={id} /></button>)}
                        </div>
                    </div>
                    <div id="displayOption">
                        <button id="optionButton" onClick={confirmHandle} disabled={(player.amount<0 && amount<0) || (amount<0 && (player.amount < Math.abs(amount)))}> Confirm </button>
                        <button id="optionButton"  onClick={() => {clearAll(); ref.current.close()}} >Go Back!</button> 
                    </div>
                    
                </div>
            </dialog>
        </>
        
    );
}




// const initialStates = {
//     mortgageSelected:[],
//     unMortgageSelected:[],
//     amount:0
// }

// function manager (state,action){
//     console.log(action);
//     if(action.id === "addToMortgage"){
//         const previous = state;
//         if(!state.mortgageSelected.length){
//             previous.mortgageSelected.push(action.value);
//             console.log("start");
//         }
//         else { console.log(state.mortgageSelected.includes(action.value));
//             if(state.mortgageSelected.includes(action.value)){
//                 previous.mortgageSelected.filter((id) => id !== action.value);
//                 console.log("remove");
//             }else {
//                 previous.mortgageSelected.push(action.value);
//                 console.log("add");
//             }
//         }
//         console.log(previous.mortgageSelected);
//         return previous;
//     }
//     // else if(action.id === "removeFromMortgage"){
//     //     const previous = state;
//     //     const index = previous.mortgageSelected.findIndex((id) => id === action.value);
//     //     previous.mortgageSelected.splice(index,index+1);
//     //     console.log(previous.mortgageSelected);
//     //     return previous;
//     // }
//     else if(action.id === "addToUnMortgage"){
//         const previous = state;
//         return previous.unMortgageSelected.push(action.value);
//     }
//     else if(action.id === "removeFromUnMortgage"){
//         const previous = state;
//         const index = previous.unMortgageSelected.indexOf((id) => id === action.value);
//         return previous.unMortgageSelected.splice(index,index+1);
//     }
//     return initialStates;
// }