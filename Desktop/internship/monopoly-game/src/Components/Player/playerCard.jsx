import PlayerLogo from '../../Assets/PlayerLogo';
import PropertyInfoCard from "./PropertyInfoCard"
import Mortgage from './PlayerActions/Mortgage';
import Trade from './PlayerActions/Trade';
import AmenityManager from './PlayerActions/AmenityManager';
import './PlayerCard.css';

export default function PlayerCard({player}){

    // breaking the ownedid array into slices that has 4 id's each
    const ownedTilesIdlist = []; 
    for(let i = 0; i<= Math.ceil(player.ownedTilesId.length/4); i++){
        player.ownedTilesId.length > i*4 && ownedTilesIdlist.push(player.ownedTilesId.slice(i*4,(i+1)*4));
    }
    
    return(
        <div id="playerCard" className={player.turn ? "playerTurn" : undefined}>
            <div id="head">
                <h2>{player.name}</h2>  
                <div id="playerLogo">
                    <PlayerLogo id={player.logo} style={{width:'100%'}} color={player.color}/>
                </div>    
            </div>
            <h3 style={{margin:"5px", fontSize:"23px"}}>${player.amount}</h3>
            <div id="playerActions">
                <Mortgage player={player}/>
                <AmenityManager player={player}/>
                <Trade player={player}/>
            </div>
                
            <div id="group-holder">
                {ownedTilesIdlist && ownedTilesIdlist.map((group, i=0) => {
                    i++;
                    return(
                    <div id={`card-grouper${i}`} key={i}>
                        {group.map((id, j=0) => { j++;
                            return(<PropertyInfoCard className={`propertyCard${j}`} id={id} key={j} folder={true}/>);
                        })}
                    </div>)
                })}
            </div>
        </div>
    );
}