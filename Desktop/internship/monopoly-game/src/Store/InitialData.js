import comunityChest from "../Assets/chest.png"
import chance from "../Assets/question-mark.gif"
import bulb from "../Assets/bulb.png"
import water from"../Assets/tap.png"
import train from "../Assets/train.png"
import ring from "../Assets/ring.png"
import tax from "../Assets/tax.png"
import start from "../Assets/start.png"
import arrow from "../Assets/arrow-left.png"
import jail from "../Assets/jail.png"
import carimg from "../Assets/car.png"
import police from "../Assets/police.png"



export const initialPlayer = [
   {
        id:0,
        name:"player1",
        color:"red",
        logo:"car",
        amount:1500,
        position:0,
        ownedTilesId:[],
        turn:true,
        jail:{inJail:false, jailTime:0, jailFree:[]},
        amenities:{houses:0, hotels:0},
    },
    {
        id:1,
        name:"player2",
        color:"blue",
        logo:"cannon",
        amount:1500,
        position:0,
        ownedTilesId:[],
        turn:false,
        jail:{inJail:false, jailTime:0, jailFree:[]},
        amenities:{houses:0, hotels:0},
    },
    // {
    //     id:2,
    //     name:"player3",
    //     color:"green",
    //     logo:"car",
    //     amount:1500,
    //     position:0,
    //     ownedTilesId:[],
    //     turn:false,
    //     jail:{inJail:false, jailTime:0, jailFree:[]},
    //     amenities:{houses:0, hotels:0},
    // },
    // {
    //     id:3,
    //     name:"player4",
    //     color:"yellow",
    //     logo:"car",
    //     amount:1500,
    //     position:0,
    //     ownedTilesId:[],
    //     turn:false,
    //     jail:{inJail:false, jailTime:0, jailFree:[]},
    //     amenities:{houses:0, hotels:0},
    // }
]


const initialTileInfo = [
        {title:"Start", logo:start, logo2:arrow, onTile:[initialPlayer[0], initialPlayer[1]], ownerId:"Bank"},
        {title:"Mediter-ranean Avenue", color:"SaddleBrown", price:60, rent:{site:2, set:4, house1:10, house2:30, house3:90, house4:160, hotel:250}, buildingCost:50, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"Community Chest", color:"", logo:comunityChest, onTile:[], ownerId:"Bank"},
        {title:"Baltic Avenue", color:"SaddleBrown", price:60, rent:{site:4, set:8, house1:20, house2:60, house3:180, house4:320, hotel:450}, buildingCost:50, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"Income Tax", color:"", price:-200, logo:tax, onTile:[], ownerId:"Bank"},
        {title:"Reading Railroad", color:"rail", price:200, logo:train, rent:25, onTile:[], ownerId:"", rentAmount:"", amenity:{set:0}, mortgage:false},
        {title:"Oriental Avenue", color:"#A6F6FF", price:100, rent:{site:6, set:12, house1:30, house2:90, house3:270, house4:400, hotel:550}, buildingCost:50, onTile:[], ownerId:"", amenity:{set:true, houses:0, hotel:false}, mortgage:false},
        {title:"Chance", color:"", logo:chance, onTile:[], ownerId:"Bank"},
        {title:"Vermont Avenue", color:"#A6F6FF", price:100, rent:{site:6, set:12, house1:30, house2:90, house3:270, house4:400, hotel:550}, buildingCost:50, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"Connecticut Avenue", color:"#A6F6FF", price:120, rent:{site:8, set:16, house1:40, house2:100, house3:300, house4:450, hotel:600}, buildingCost:50, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"In Jail", logo:jail, onTile:[], ownerId:"Bank" },
        {title:"St.Charles Place", color:"#E900FF", price:140, rent:{site:10, set:20, house1:50, house2:150, house3:450, house4:625, hotel:750}, buildingCost:100, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"Electric Company", color:"utility", price:150, logo:bulb, rent:4, onTile:[], ownerId:"", rentAmount:"", amenity:{set:0}, mortgage:false},
        {title:"States Avenue", color:"#E900FF", price:140, rent:{site:10, set:20, house1:50, house2:150, house3:450, house4:625, hotel:750}, buildingCost:100, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"Virginia Avenue", color:"#E900FF", price:160, rent:{site:12, set:24, house1:60, house2:180, house3:500, house4:700, hotel:900}, buildingCost:100, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"Pennsylvania Railroad", color:"rail", price:200, logo:train, rent:25, onTile:[], ownerId:"", rentAmount:"", amenity:{set:0}, mortgage:false},
        {title:"St.James Place", color:"#FF5200", price:180, rent:{site:14, set:28, house1:70, house2:200, house3:550, house4:750, hotel:950}, buildingCost:100, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"Community Chest", color:"", logo:comunityChest, onTile:[], ownerId:"Bank"},
        {title:"Tennessee Avenue", color:"#FF5200", price:180, rent:{site:14, set:28, house1:70, house2:200, house3:550, house4:750, hotel:950}, buildingCost:100, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"New-York Avenue", color:"#FF5200", price:200, rent:{site:16, set:32, house1:80, house2:220, house3:600, house4:800, hotel:1000}, buildingCost:100, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"Free Parking", logo:carimg, onTile:[], ownerId:"Bank" },
        {title:"Kentucky Avenue", color:"#F30067", price:220, rent:{site:18, set:36, house1:90, house2:250, house3:700, house4:875, hotel:1050}, buildingCost:150, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"Chance", color:"", logo:chance, onTile:[], ownerId:"Bank"},
        {title:"Indiana Avenue", color:"#F30067", price:220, rent:{site:18, set:36, house1:90, house2:250, house3:700, house4:875, hotel:1050}, buildingCost:150, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"Illinois Avenue", color:"#F30067", price:240, rent:{site:20, set:40, house1:100, house2:300, house3:750, house4:925, hotel:1100}, buildingCost:150, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"B&O Railroad", color:"rail", price:200, logo:train, rent:25, onTile:[], ownerId:"", rentAmount:"", amenity:{set:0}, mortgage:false},
        {title:"Atlantic Avenue", color:"#FFD615", price:260, rent:{site:22, set:44, house1:110, house2:330, house3:800, house4:975, hotel:1150}, buildingCost:150, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"Ventnor Avenue", color:"#FFD615", price:260, rent:{site:22, set:44, house1:110, house2:330, house3:800, house4:975, hotel:1150}, buildingCost:150, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"Water Works", color:"utility", price:150, logo:water, rent:4, onTile:[], ownerId:"", rentAmount:"", amenity:{set:0}, mortgage:false},
        {title:"Marvin Gardens", color:"#FFD615", price:280, rent:{site:24, set:48, house1:120, house2:360, house3:850, house4:1025, hotel:1200}, buildingCost:150, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"Go-To Jail", logo:police, onTile:[], ownerId:"jail" },
        {title:"Pacific Avenue", color:"#A6CB12", price:300, rent:{site:26, set:52, house1:130, house2:390, house3:900, house4:1100, hotel:1275}, buildingCost:200, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"North-Carolina Avenue", color:"#A6CB12", price:300, rent:{site:26, set:52, house1:130, house2:390, house3:900, house4:1100, hotel:1275}, buildingCost:200, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"Community Chest", color:"", logo:comunityChest, onTile:[], ownerId:"Bank"},
        {title:"Pennsylvania Avenue", color:"#A6CB12", price:320, rent:{site:28, set:56, house1:150, house2:450, house3:1000, house4:1200, hotel:1400}, buildingCost:200, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"Short Line", color:"rail", price:200, logo:train, rent:25, onTile:[], ownerId:"", rentAmount:"", amenity:{set:0}, mortgage:false},
        {title:"Chance", color:"", logo:chance, onTile:[], ownerId:"Bank"},
        {title:"Park Place", color:"#0079FF", price:350, rent:{site:35, set:70, house1:175, house2:500, house3:1100, house4:1300, hotel:1500}, buildingCost:200, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false},
        {title:"Luxury Tax", color:"", price:-100, logo:ring, onTile:[], ownerId:"Bank"},
        {title:"Boardwalk", color:"#0079FF", price:400, rent:{site:50, set:100, house1:200, house2:600, house3:1400, house4:1700, hotel:2000}, buildingCost:200, onTile:[], ownerId:"", amenity:{set:false, houses:0, hotel:false}, mortgage:false}
    
]

export default initialTileInfo;


export const initialChanceDeck = [
    { id:1, text:"Advance to BoardWalk", method:"movePlayer", position:39},
    { id:2, text:"Advance to Go (Collect $200)", method:"movePlayer", position:40},
    { id:3, text:"Advance to Illinois Avenue. If you pass Go, collect $200", method:"moveAfterCheck", position:24},
    { id:4, text:"Advance to St. Charles Place. If you pass Go, collect $200", method:"moveAfterCheck", position:11},
    { id:5, text:"Advance to the nearest Railroad. If unowned, you may buy it from the Bank. If owned, pay wonder twice the rental to which they are otherwise entitled", method:"moveAfterCheckArray", position:[5,15,25,35]},
    { id:6, text:"Advance to the nearest Railroad. If unowned, you may buy it from the Bank. If owned, pay wonder twice the rental to which they are otherwise entitled", method:"moveAfterCheckArray", position:[5,15,25,35]},
    { id:7, text:"Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times amount thrown.", method:"moveAfterCheckArray", position:[12,28]},
    { id:8, text:"Bank pays you dividend of $50", method:"getMoney", amount:50},
    { id:9, text:"Get Out of Jail Free", method:"jailFree"},
    { id:10, text:"Go Back 3 Spaces", method:"goBack3"},
    { id:11, text:"Go to Jail. Go directly to Jail, do not pass Go, do not collect $200", method:"movePlayer", position:30},
    { id:12, text:"Make general repairs on all your property. For each house pay $25. For each hotel pay $100", method:"repairs", amount:[25, 100]},
    { id:13, text:"Speeding fine $15", method:"payMoney", amount:15},
    { id:14, text:"Take a trip to Reading Railroad. If you pass Go, collect $200", method:"moveAfterCheck", position:5},
    { id:15, text:"You have been elected Chairman of the Board. Pay each player $50", method:"moneyAll", amount:-50},
    { id:16, text:"Your building loan matures. Collect $150", method:"getMoney", amount:150}
]

export const initialCommunityChestDeck = [
    { id:1, text:"Advance to Go (Collect $200)", method:"movePlayer", position:40},
    { id:2, text:"Bank error in your favor. Collect $200", method:"getMoney", amount:200},
    { id:3, text:"Doctor’s fee. Pay $50", method:"payMoney", amount:50},
    { id:4, text:"From sale of stock you get $50", method:"getMoney", amount:50},
    { id:5, text:"Get Out of Jail Free", method:"jailFree"},
    { id:6, text:"Go to Jail. Go directly to Jail, do not pass Go, do not collect $200", method:"movePlayer", position:30},
    { id:7, text:"Holiday fund matures. Receive $100", method:"getMoney", amount:100},
    { id:8, text:"Income tax refund. Collect $20", method:"getMoney", amount:20},
    { id:9, text:"It is your birthday. Collect $10 from every player", method:"moneyAll", amount:10},
    { id:10, text:"Life insurance matures. Collect $100", method:"getMoney", amount:100},
    { id:11, text:"Pay hospital fees of $100", method:"payMoney", amount:100},
    { id:12, text:"Pay school fees of $50", method:"payMoney", amount:50},
    { id:13, text:"Receive $25 consultancy fee", method:"getMoney", amount:25},
    { id:14, text:"You are assessed for street repair. $40 per house. $115 per hotel", method:"repairs", amount:[40, 115]},
    { id:15, text:"You have won second prize in a beauty contest. Collect $10", method:"getMoney", amount:10},
    { id:16, text:"You inherit $100", method:"getMoney", amount:100},
    
]

