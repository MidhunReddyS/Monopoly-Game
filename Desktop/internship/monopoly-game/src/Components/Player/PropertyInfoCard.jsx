import "./PropertyInfoCard.css"
import { useSelector } from 'react-redux'

export default function PropertyInfoCard({className, className2, id, folder}){
    // console.log(id);
    const tiles = useSelector((state) => state.tiles);
    const card = tiles[id];
    const rent = tiles[id].rent;
    const houses = tiles[id].amenity.houses;
    return(
        <div id="PropertyInfoCard" className={`${className} ${folder ? "hoverPlayerCard" : undefined}`} >
            {card.color === "rail" ? 
            <div id="card-wrapper" className={`${className2} ${folder ? "folder" : "display"} `}>
                <img src={card.logo} alt="logo" width={"65%"}/>
                <h3>{card.title}</h3>
                <ul id="rent-list">
                    <li><p>rent</p><span>$25</span></li>
                    <li><p>If 2 Stations are owned</p><span>$50</span></li>
                    <li><p>If 3 Stations are owned</p><span>$100</span></li>
                    <li><p>If 4 Stations are owned</p><span>$200</span></li>
                </ul>

            </div> : card.color === "utility" ? 
            <div id="card-wrapper" className={`${className2} ${folder ? "folder" : "display"} `}>
                <img src={card.logo} alt="logo" width={"65%"}/>
                <h3>{card.title}</h3>
                <div id="utility">
                    <p>'If one Utility is owned, rent is 4 time amount shown on dice.'</p>
                    <p>If both Utilites is owned, rent is 10 time amount shown on dice.</p>
                </div>
            </div> 
            
            :<div id="card-wrapper" className={`${className2} ${folder ? "folder" : "display"} `}>
                <div id="title" style={{backgroundColor:card.color}}>
                    <h3>{card.title}</h3>
                </div>
                <h5 >RENT ${rent.site}</h5>
                <ul id="rent-list">
                    <li className={houses === 1 ? "houseHighlight" : ""}><p>With 1 House</p><span>${rent.house1}</span></li>
                    <li className={houses === 2 ? "houseHighlight" : ""}><p>With 2 House</p><span>${rent.house2}</span></li>
                    <li className={houses === 3 ? "houseHighlight" : ""}><p>With 3 House</p><span>${rent.house3}</span></li>
                    <li className={houses === 4 ? "houseHighlight" : ""}><p>With 4 House</p><span>${rent.house4}</span></li>
                    <li className={houses === 5 ? "houseHighlight" : ""}><p>With HOTEL</p><span>${rent.hotel}</span></li>
                </ul>
                <p>Mortgage Value <span style={{fontSize:"100%"}}>${card.price*0.5}</span></p>

                <div id="conditions">
                    <p>House Cost <span style={{fontSize:"100%"}}>${card.buildingCost}</span> each</p>
                    <p>Hotels, <span style={{fontSize:"100%"}}>${card.buildingCost}</span> each</p>
                    <p>plus 4 houses</p>
                </div>
                <div id="description">
                    <p >if a player owns all sites of any colour group, the rent is doubled on unimproved sites in that group</p>
                </div>
            </div>
            
            }
            
            
        </div>
    );
}