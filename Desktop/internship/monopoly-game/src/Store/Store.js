import { configureStore, createSlice } from '@reduxjs/toolkit';
import initialTileInfo, {initialPlayer, initialChanceDeck, initialCommunityChestDeck} from './InitialData';

const tileSlice = createSlice({
    name:"tile",
    initialState: initialTileInfo,
    reducers:{
        initializeTiles(state,action){
            for(let i=0; i< action.payload.tiles.length; i++){
                state[i] = action.payload.tiles[i];
            }
        },
        movePlayerTile(state, action){
            if(state[action.payload.player.position].onTile[0]){
                if(state[action.payload.player.position].onTile[0].id === action.payload.player.id){
                state[action.payload.player.position].onTile.splice(0,1);
                }
                else if(state[action.payload.player.position].onTile[1].id === action.payload.player.id){
                    state[action.payload.player.position].onTile.splice(1,2);
                    }
                else if(state[action.payload.player.position].onTile[2].id === action.payload.player.id){
                    state[action.payload.player.position].onTile.splice(2,3);
                    }
            }
            console.log(action.payload.newPosition);
            // state[action.payload.player.position].onTile.shift();
            state[action.payload.newPosition].onTile.push(action.payload.player);   
        },
        setOwner(state, action){
            state[action.payload.position].ownerId = {id:action.payload.id, name:action.payload.name};
            state[action.payload.position].rentAmount = state[action.payload.position].rent.site;
            let set = state.filter((tile) => tile.color === state[action.payload.position].color);
            if(state[action.payload.position].color === "rail"){
                // let setOwned = 0;
                // for(let tile of set){
                //     if(tile.ownerId){ if(tile.ownerId.id === action.payload.id){ setOwned += 1; } }
                // }
                // for(let tile of set){
                //     console.log(tile);
                //     if(tile.ownerId){ if(tile.ownerId.id === action.payload.id){ tile.rentAmount = 25*(2**(setOwned-1))} }
                // }
                let dividedSet = [set.filter((tile) => (tile.ownerId.id === 0)), set.filter((tile) =>(tile.ownerId.id === 1)), set.filter((tile) => (tile.ownerId.id === 2)), set.filter((tile) => (tile.ownerId.id === 3))];
                for( let setItems of dividedSet){
                    if(setItems.length){
                        for(let tile of setItems){ console.log(); tile.rentAmount = 25*(2**(setItems.length-1))}
                    }
                }
            }
            else if(state[action.payload.position].color === "utility"){
                // let setOwned = 0;
                // for(let tile of set){
                //     if(tile.ownerId){ if(tile.ownerId.id === action.payload.id){ setOwned += 1; } }
                // }
                // for(let tile of set){
                //     if(tile.ownerId){ 
                //         if(setOwned === 1){ tile.rentAmount = 4} 
                //         else if(setOwned ===2){ tile.rentAmount= 10} 
                //     }
                // }
                if(set[0].ownerId && set[1].ownerId){ 
                    if(set[0].ownerId.id === set[1].ownerId.id){set[0].rentAmount = 10; set[1].rentAmount = 10}
                    else {set[0].rentAmount = 4; set[1].rentAmount = 4}
                }else {set[0].rentAmount = 4; set[1].rentAmount = 4}
            }
            else{
                let isSet = false;
                for (let tile of set){
                    if(tile.ownerId){
                        if(tile.ownerId.id === action.payload.id){ isSet = true;  }
                        else{ isSet = false; break }
                    }else{ isSet = false; break }
                }
                if(isSet){ set.map((tile) => tile.amenity.set = true) }
                else{set.map((tile) => tile.amenity.set = false)}
            }
        },
        mortgageManager(state, action){
            state[action.payload.position].mortgage = !state[action.payload.position].mortgage;
        },
        tileAmenityManager(state,action){
            state[action.payload.position].amenity.houses = action.payload.houses;
            state[action.payload.position].amenity.hotel = action.payload.hotel;
        }
    }
})

const playerSlice = createSlice({
    name:"player",
    initialState: initialPlayer,
    reducers:{
        initializePlayers(state, action){
            for(let i = 0; i< action.payload.players.length; i++ ){
                state[i] = action.payload.players[i];
            }
        },
        removePlayer(state,action){
            
        },
        changePosition(state,action){
            state[action.payload.id].position = action.payload.newPosition; 
        },
        nexTurn(state, action){
            state[action.payload.id].turn = false;
            if(state.length -1 > action.payload.id){ state[action.payload.id + 1].turn = true; }
            else{ state[0].turn = true; }
        },
        buyTile(state, action){
            state[action.payload.id].ownedTilesId.push(action.payload.position);
            state[action.payload.id].ownedTilesId.sort((a,b) => a-b);
            state[action.payload.id].amount-= action.payload.price;
        },
        payRent(state, action){
            state[action.payload.id].amount -= action.payload.rentAmount;
            state[action.payload.ownerId].amount += action.payload.rentAmount;
        },
        addAmount(state, action){
            state[action.payload.id].amount += action.payload.amount;
        },
        removeAmount(state, action){
            state[action.payload.id].amount -= action.payload.amount;
        },
        sendToJail(state, action){
            state[action.payload.id].jail = {...state[action.payload.id].jail, inJail:true, jailTime:3};
        },
        outOfJail(state, action){
            state[action.payload.id].jail = {...state[action.payload.id].jail, inJail:false, jailTime:0};
        },
        jailTimeReduce(state, action){
            state[action.payload.id].jail.jailTime -= 1;
        },
        jailFreeCard(state,action){
            if(action.payload.card){
                state[action.payload.id].jail.jailFree.push(action.payload.card);
            }
            else{ state[action.payload.id].jail.jailFree.shift(action.payload.card); }
        },
        tradeTile(state, action){
            state[action.payload.player1.id].ownedTilesId = state[action.payload.player1.id].ownedTilesId.filter((id) => id !== action.payload.position);
            state[action.payload.player2.id].ownedTilesId.push(action.payload.position);
            state[action.payload.player2.id].ownedTilesId.sort((a,b) => a-b);
        },
        playerAmenityManager(state,action){
            state[action.payload.id].amenities.houses += action.payload.housesDiff;
            state[action.payload.id].amenities.hotels += action.payload.hotelDiff;
        }
            
    }
})

const chanceSlice = createSlice({
    name:"chance",
    initialState:initialChanceDeck.sort(() => 0.5 - Math.random()),
    reducers:{
        getCard(state, action){
            state.shift();
        },
        replaceCard(state, action){
            state.push(action.payload.card);
        }
    }
})
const communityChestSlice = createSlice({
    name:"communityChest",
    initialState:initialCommunityChestDeck.sort(() => 0.5 - Math.random()),
    reducers:{
        getCard(state, action){
            state.shift();
        },
        replaceCard(state, action){
            state.push(action.payload.card);
        }
    }
})

const chanceAndCommunityDisplaySlice = createSlice({
    name:"chanceAndCommunityDisplay",
    initialState:{chance:"", communityChest:""},
    reducers:{
        setCard(state,action){
            
            if(action.payload.id === "chance"){
                state.chance = action.payload.card.text;
            }else{
                state.communityChest = action.payload.card.text;
            }   
        },
        clear(state){
            state.chance = "";
            state.communityChest="";
        }
    }
})

export const tileActions =  tileSlice.actions;
export const playerActions = playerSlice.actions;
export const chanceActions = chanceSlice.actions;
export const communityChestActions = communityChestSlice.actions;
export const chanceAndCommunityDisplayActions = chanceAndCommunityDisplaySlice.actions;

export const store = configureStore({
    reducer:{ tiles: tileSlice.reducer, players: playerSlice.reducer, chance:chanceSlice.reducer, communityChest:communityChestSlice.reducer, chanceAndCommunityDisplay:chanceAndCommunityDisplaySlice.reducer }
})