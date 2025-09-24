import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";

const AuthContext = createContext(false);

const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(undefined);
    const auth = getAuth();

    onAuthStateChanged(auth,(user) => {
        if (user) {
            setUser(user)
        } else {
            setUser(undefined);
        }
    });

    return (
        <AuthContext.Provider value={{ user }}>
            { children }
        </AuthContext.Provider>
    )
} 

export { AuthContext, AuthProvider };
