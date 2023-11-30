import { useSelector, useDispatch } from "react-redux";
import { chanceActions, communityChestActions} from "../../Store/Store";

export default function SpecialAction({tile, player, onClick}){
    const chanceCard = useSelector((state) => state.chance[0]);
    const communityChestCard = useSelector((state) => state.communityChest[0]);
    const dispatch = useDispatch();
    return(
        <div>

            {tile.title.includes("Tax") && <button onClick={() => onClick({id:"payTax", amount:tile.price})}>Pay Tax</button>}

            { tile.title.includes("Chance") && <button onClick={() => { dispatch(chanceActions.getCard()); onClick({id:"chance", card:chanceCard});}}>chance</button>}

            {tile.title.includes("Community Chest") && <button onClick={() => { dispatch(communityChestActions.getCard()); onClick({id:"communityChest", card:communityChestCard})}}>community Chest</button>}
        </div>
    );
}