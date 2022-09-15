import React, {useState, useContext} from "react";

const UserContext = React.createContext();
// let userId;
const UpdatedUserContext = React.createContext();




export function UserInfo(){
    return useContext(UserContext)    
}

export function UpdateUserInfo(){
    return useContext(UpdatedUserContext)    
}

export function UserProvider({children}){
    const [userId, setUserId] = useState("This is a test to see if its working")

    function SetUserInfo(info){
        setUserId(info)
        console.log("this is Info", info)
    }
    return(
        <UserContext.Provider value={userId}>
            <UpdatedUserContext.Provider value={SetUserInfo}>
            {children}
            </UpdatedUserContext.Provider>
        </UserContext.Provider>
    )
}

// function Test(){
//     let [nom, setter] = useContext(UserContext);
//     console.log("wat is nom", nom)
//     setter(userId)
// }

