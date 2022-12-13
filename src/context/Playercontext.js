import { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = (props) =>{
 const [list, setList] = useState([]);

 
//console.log(list);

 return (
    <PlayerContext.Provider value={{list, setList}}>
        {props.children}
    </PlayerContext.Provider>
 )
}