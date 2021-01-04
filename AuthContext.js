import React from 'react';

export const AuthContext = React.createContext({
    isSignedIn: false,
    setStatus: ()=>{},
    signInAcc: "",
    setAcc: ()=>{},
    chEnroll: false,
    setChEnroll: ()=>{},
})

//isSignedIn & setStatus will be replaced in App.js