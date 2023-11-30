import {Fragment} from 'react';
import { useSelector } from 'react-redux';
import Tile from "./Tile";
import PlayerLogo from '../../Assets/PlayerLogo';
import house from "../../Assets/house.png";
import hotel from "../../Assets/hotel.png";
import mortgageLogo from "../../Assets/mortgage.png";

const streetStyle = {
    height:"25%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    alignContent:"space-equally",
    borderRadius:"5px"
};

const titleStyle = {
                height:"35%",
                fontSize:"5.5px"     
            };

export default function PropertyTile({title, color, price,amenity,mortgage, ownerId, logo ="", onTile=""}){
    const property = title.split(" ");

    const players = useSelector((state) => state.players);

    return(
        <Tile color={players[ownerId.id] ? players[ownerId.id].color : "black" } transform={onTile[0] && players[onTile[0].id].turn ? {scale:"scale(1.1)", z:"2"} : {scale:"", z:"0"}}>

            {onTile[0] && <PlayerLogo id={onTile[0].logo} style={{width:'100%', position:'absolute', top:'23%', right:'10%'}} color={onTile[0].color}/>}
            {onTile[1] && <PlayerLogo id={onTile[1].logo} style={{width:'100%', position:'absolute', top:'-10%', right:'10%'}} color={onTile[1].color}/>}


            {color && color !== "rail" && color !== "utility" && <div style={{...streetStyle, backgroundColor:`${color}`}} >
                {amenity.houses>0 && amenity.houses <5 && <> <img src={house} alt="House" width={"30%"}/> <p style={{fontSize:"50%", color:"black", paddingLeft:"2px"}}>  X {amenity.houses}</p> </>}
                {amenity.hotel && <img src={hotel} alt="hotel" width={"30%"}/>}
                </div>}
            {mortgage && <img src={mortgageLogo} alt="mortgage" width={"40%"} style={{position:"absolute", right:"2%",top:"25%"}}/>}
            <h4 style={!logo ? titleStyle : {...titleStyle, height:"18%"}} >{property.map((value) => <Fragment key={value}>{value.toUpperCase()}<br/></Fragment>)}</h4>

            {logo && <img src={logo} alt="logo" width={!price ? "65%": "45%"}/>}

            {price && <p style={{fontSize:"6px", fontWeight:"bold"}}>{price>0 ? `$${price}` : `PAY $${Math.abs(price)}`}</p>}
        </Tile>
    );
}