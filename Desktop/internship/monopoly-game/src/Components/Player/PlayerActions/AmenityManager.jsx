import {  useRef, useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { tileActions, playerActions } from "../../../Store/Store";
import PropertyInfoCard from "../PropertyInfoCard";
import "./Mortgage.css"
import "./AmenityManager.css"

export default function AmenityManager({player}){

    const tiles = useSelector((state) => state.tiles);

    
    const ref = useRef();
    const [amenities, setAmenities] = useState([]);
    const [amount, setAmount] = useState(0); 

    const dispatch = useDispatch();
    useEffect(() => {
        const avaliableCards = player.ownedTilesId.filter((id) => {return(tiles[id].amenity.set)});
        const initialAmenities = avaliableCards.map((id) => {return {position:id, houses:tiles[id].amenity.houses, hotel:tiles[id].amenity.hotel, color:tiles[id].color}});
        setAmenities(initialAmenities);
        setAmount(0);
    },[player,tiles]);
    
    function addHandle(i){
        let newList = [...amenities];
        if(amenities[i].houses < 4){ newList[i].houses +=1; }
        else { newList[i].hotel = true; newList[i].houses +=1; }
        setAmenities(newList);
        if(tiles[amenities[i].position].amenity.houses >= amenities[i].houses){
                setAmount((previous) => previous -= tiles[amenities[i].position].buildingCost/2);
            }else {
                setAmount((previous) => previous -= tiles[amenities[i].position].buildingCost);
            }
    }
    function removeHandle(i){
        let newList = [...amenities];
        if(amenities[i].hotel){ newList[i].hotel = false; newList[i].houses -=1; }
        else { newList[i].houses -=1; }
        setAmenities(newList); 
        if(tiles[amenities[i].position].amenity.houses > amenities[i].houses){
            setAmount((previous) => previous += tiles[amenities[i].position].buildingCost/2);
        }else {
            setAmount((previous) => previous += tiles[amenities[i].position].buildingCost);
        }  
    }

    function disableHandler(index,action){
        let group = amenities.filter((amenity) => amenity.color === amenities[index].color).filter((amenity) => amenity.position !== amenities[index].position);
        let disable = true;
        if(action === "add"){
            for( let item of group){ disable*=!(item.houses - amenities[index].houses<0);}
            if(tiles[amenities[index].position].mortgage){disable = false}
        }else{
            for( let item of group){ disable*=!(item.houses - amenities[index].houses>0);}
        }
        
        // console.log(group);
        return !disable;
    }

    function confirmHandle() {
        amenities.forEach((amenity) => {
            dispatch(tileActions.tileAmenityManager({position:amenity.position, houses:amenity.houses, hotel:amenity.hotel}));
            let housesDiff = amenity.houses - tiles[amenity.position].amenity.houses;
            let hotelDiff = 0;
            if(tiles[amenity.position].amenity.hotel && !amenity.hotel){
                housesDiff += 1;
                hotelDiff -= 1;
            } else if (!tiles[amenity.position].amenity.hotel && amenity.hotel){
                housesDiff -= 1;
                hotelDiff += 1;
            }
            dispatch(playerActions.playerAmenityManager({id:player.id, housesDiff, hotelDiff}));
        })
        dispatch(playerActions.addAmount({id:player.id, amount:amount}));
        clearAll(); 
    }

    function clearAll(){
        setAmount(0);
        const avaliableCards = player.ownedTilesId.filter((id) => {return(tiles[id].amenity.set)});
        const initialAmenities = avaliableCards.map((id) => {return {position:id, houses:tiles[id].amenity.houses, hotel:tiles[id].amenity.hotel, color:tiles[id].color}});
        setAmenities(initialAmenities);
    }
    
    return(
        <>
            <button id="controlButton" onClick={() => {ref.current.showModal()}} type="submit">Amenities</button>
            <dialog ref={ref} id="popUp" onClose={clearAll}>
                <div id="displayContainer">
                    <div id="displayTitles" style={{justifyContent:"space-around"}}>
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <h1>house:{player.amenities.houses} hotels:{player.amenities.hotels}</h1>
                            <h1 id="amountBox">${player.amount} {amount>0 ? <span className="positiveChange">+${amount}</span>: amount < 0 ? <span className="negitiveChange">-${Math.abs(amount)}</span>:<></>}</h1>
                        </div>
                    </div>
                    <div id="sectionContainer">
                        <div id="leftContainer" style={{width:"auto"}}>
                        {amenities.map((amenity, index) => { index++; return (
                        <div id="cardWrapper" key={amenity.position} >
                            <PropertyInfoCard id={amenity.position} className2={"amenityCard"}/>
                            {amenities.length  &&
                            <div id="cardButtons" >
                                {/* {<p>houses * {amenities[index-1].houses<=4 ? amenities[index-1].houses : 4}</p>} */}
                                {/* {amenities[index-1].hotel && <p>Hotel</p>} */}
                                { <button id="topButton" disabled={amenities[index-1].hotel || disableHandler(index-1,"add")} onClick={() => {addHandle(index-1)}}>
                                    <p id="buttonText">+ {amenities[index-1].houses - tiles[amenities[index-1].position].amenity.houses > 0 && amenities[index-1].houses - tiles[amenities[index-1].position].amenity.houses}</p></button>}
                                <button id="bottomButton" disabled={ disableHandler(index-1,"remove") || (amenities[index-1].houses <= 0)} onClick={() => {removeHandle(index-1)}}>
                                    <p id="buttonText">- {amenities[index-1].houses - tiles[amenities[index-1].position].amenity.houses < 0 && tiles[amenities[index-1].position].amenity.houses - amenities[index-1].houses}</p></button>
                            </div>
                        }
                        </div>);})}

                        </div>
                    </div>
                    <div id="displayOption">
                        <button id="optionButton" disabled={ player.amount < -amount }  onClick={confirmHandle} >
                             Confirm </button>
                        <button id="optionButton"  onClick={() => {clearAll(); ref.current.close()}} >Go Back!</button> 
                    </div>
                    
                </div>
            </dialog>
        </>
        
    );
}


