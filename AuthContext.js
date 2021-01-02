import React from 'react';

export const AuthContext = React.createContext({
    isSignedIn: false,
    setStatus: ()=>{},
    signInAcc: "",
    setAcc: ()=>{},
    IsEnroll: false,
    setIsEnroll: ()=>{},
})

//isSignedIn & setStatus will be replaced in App.js