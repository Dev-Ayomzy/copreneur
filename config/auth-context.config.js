import { getAuth } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
const AuthContext = createContext(false);

const AuthProvider = ({ children}) => {
    const [user,setUser]= useState(undefined);
    const auth = getAuth();

    // get user's authenticated state
    useEffect(()=>{
        setUser(auth.currentUser);
    },[auth]);

    return (
        <AuthContext.Provider value={{user}}>
            { children }
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };

