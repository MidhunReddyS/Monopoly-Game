import { useSelector } from "react-redux";
import comunityChest from "../../Assets/chest.png"
import chance from "../../Assets/question-mark.gif"


export default function ChanceAndCommunity(){

    const display  = useSelector((state) => state.chanceAndCommunityDisplay)

    return (
        <div style={{display:"flex", fontSize:"11px", justifyContent:"space-around", color:"black"}}>
            <div style={{backgroundColor:"white", margin:"10px"}}>
                { display.chance ?
                    <div style={{border:"solid #FFD700 1.5px", width:"180px", height:"100px", margin:"5px" ,display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <p>{display.chance}</p>
                    </div>  : 
                    <div style={{backgroundColor:"#FF9209", width:"180px", height:"100px", margin:"5px",display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <img src={chance} alt="Chance"/>
                    </div>
                }
                       
            </div>
            <div style={{backgroundColor:"white", margin:"10px"}} >
                { display.communityChest ? 
                    <div style={{border:"solid #FFD700 2px", width:"180px", height:"100px", margin:"5px",display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <p>{display.communityChest}</p>
                    </div>:
                    <div style={{backgroundColor:"#87C4FF", width:"180px", height:"100px", margin:"5px",display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <img src={comunityChest} alt="Community Chest"/>
                    </div>
                }
            </div>
        </div>
    );
}