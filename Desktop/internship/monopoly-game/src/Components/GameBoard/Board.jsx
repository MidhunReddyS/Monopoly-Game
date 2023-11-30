import BoardSide from "./BoardSide";
import "./Board.css"
import { useSelector } from 'react-redux'
import Dice from "./Dice";
import ChanceAndCommunity from "./ChanceAndCommunity";

export default function Board({className}){

    const tiles = useSelector((state) => state.tiles)
    const tilesList = [tiles.slice(0,10), tiles.slice(10,20), tiles.slice(20,30), tiles.slice(30,40)]

    return(
        <div className={`board ${className}`}>

            {tilesList.map((list, i=0) => {
                let angle = 90*i;
                i+=1;
                return(<BoardSide key={Math.round(Math.random()*1000000)} angle={angle} side={list} className={`side${i}`}  />);
                })
            }

            <div className="middle">
                <div style={{ width:"98%", height:"40%"}}>
                    <Dice/>
                </div>
                <div style={{ width:"98%", height:"25%"}}>
                    
                </div>
                <div style={{width:"100%", height:"30%"}}>
                    <ChanceAndCommunity />
                </div>
            </div>
            
            
        </div>
    );
}
