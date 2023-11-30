

const tileStyle = {
            width:"45px",
            height:"75px",
            backgroundImage:"linear-gradient(180deg, #414345, #232526)",
            margin:"0.8px",
            borderStyle:"solid",
            borderWidth:"0.5px 0.5px 0.5px 0.5px",
            position:"relative",
            borderRadius:"5px"
        }

export default function Tile({children, color, transform}){
    return(
        <div id="tile" style={{...tileStyle, borderColor:color, boxShadow: `0px 0px 4px ${color}`, transform:transform.scale, zIndex:transform.z}}>
            {children}
        </div>
    );
}

// 1A1A2E 071952