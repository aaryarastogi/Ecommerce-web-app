import { createContext, useState, useEffect } from "react";

export const DataContext=createContext(null);

const DataProvider=({children})=>{
    const[account,setAccount]=useState(() => {
        // Load from localStorage if available
        const savedAccount = localStorage.getItem('account');
        return savedAccount ? JSON.parse(savedAccount) : '';
    });
    
    const[user,setUser]=useState(() => {
        // Load from localStorage if available
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Save to localStorage whenever account or user changes
    useEffect(() => {
        if (account) {
            localStorage.setItem('account', JSON.stringify(account));
        } else {
            localStorage.removeItem('account');
        }
    }, [account]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return(
        <DataContext.Provider value={{
            account,
            setAccount,
            user,
            setUser
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider