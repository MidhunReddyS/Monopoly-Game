
import CornerTile from "./CornerTile";
import PropertyTile from "./PropertyTile";


export default function BoardSide({angle, side, ...props}){
    return(
        <div style={{
            display:"flex",
            flexDirection:"row-reverse",
            rotate:`${angle}deg`
        }} {...props}>
            {side.map((obj, i=0) => {
                i+=1;
                return(
                    <div key={obj.title}>
                    {i === 1 ? <CornerTile {...obj}/>:<PropertyTile {...obj}/>}
                    </div>
                );
            })}
            
        </div>
    );
}