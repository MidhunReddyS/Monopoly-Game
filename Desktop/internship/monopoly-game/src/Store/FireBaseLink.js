import { playerActions, tileActions} from "./Store";

export function sendGameData(players, tiles) 
    {return async (dispatch) => {
        console.log(tiles);
        async function  putData (){
            await fetch("https://monopoly-game-2f35e-default-rtdb.firebaseio.com/monopoly.json",{
                method: "put",
                body: JSON.stringify({players:players, tiles:tiles})
            });

        }

        await putData();
        
    };};


export function  getGameData(ref){
    return async (dispatch) => {

        async function getData (){
            const request = await fetch("https://monopoly-game-2f35e-default-rtdb.firebaseio.com/monopoly.json")

            return await request.json();
        }
        
        const data = await getData();

        for (let i in data.tiles){
            if(data.tiles[i].onTile){
            }else {
                data.tiles[i] = {...data.tiles[i], onTile:[]}
            }
        }
        // console.log(data.tiles);
        

        dispatch(playerActions.initializePlayers({players:data.players}));
        dispatch(tileActions.initializeTiles({tiles:data.tiles}));
        ref.current.close();
    };
}
