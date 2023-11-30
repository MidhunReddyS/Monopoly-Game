import PlayerLogo from '../../Assets/PlayerLogo';
const cornerStyle = {
    width:"75px",
    height:"75px",
    border:"solid black",
    borderWidth:"1.5px 3px 3px 1.5px",
    position:"relative",
    borderRadius:"5px",
    backgroundImage:"linear-gradient(135deg, #414345, #232526)", 
}

var titleStyle = {
    padding:"0px",
    margin:'0px',
    fontSize:"10px",
    }

const inJailStyle= {
    border: "solid black", 
    borderWidth:"0px 1px 1px 0px", 
    height:"57px", 
    width:"57px",
    backgroundColor:"orange"
}

export default function CornerTile({title, logo, logo2, onTile=""}){
    const list = title.split(" ");

    return(
        <div style={cornerStyle}>
            {onTile[0] && <PlayerLogo id={onTile[0].logo} style={{width:'65%', position:'absolute', top:'25%', right:'25%', zIndex:"1"}} color={onTile[0].color}/>}
            {onTile[1] && <PlayerLogo id={onTile[1].logo} style={{width:'65%', position:'absolute', top:'0%', right:'10%',zIndex:"1"}} color={onTile[1].color}/>}

            <div style={list[0] === "In" ?  inJailStyle : {}}>
                <div style={{rotate:`-45deg`}}>
                    <p style={titleStyle}>{list[0]}</p>

                    {logo && <img src={logo} alt="logo" width={logo2 || list[0] === "In" ? "45%" : "60%"} />}

                    {list[1] && <p style={titleStyle}>{list[1]}</p>}
                </div>
                
                {logo2 && <img src={logo2} alt="logo" width={"40%"} />}
            </div>
            {list[0] === "In" && <p style={titleStyle}>Just visiting</p> }
        </div>
    );
}