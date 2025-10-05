import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { Authcontext } from './Authcontext';

const googleAuthProvider = new GoogleAuthProvider();

const Authprovider = ({children}) => {

const [user, setUser]=useState(null)

const [loading, setLoading]=useState(true)

    const createUser=(email, password)=>{

        setLoading(true)
       return createUserWithEmailAndPassword(auth, email, password)
   
    }

    const signIn=(email, password)=>{
        setLoading(true);

        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInwithgoogle=()=>{
        setLoading(true);
        return signInWithPopup(auth, googleAuthProvider)
    }

    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }

   useEffect(()=>{
const unsubscribe=onAuthStateChanged(auth,currentUser=>{
    setUser(currentUser);
    setLoading(false)
})
     return()=>{
        unsubscribe()
     }
    },[])

    const authInfo={
        user,
        loading,
        logOut,
        signInwithgoogle,
        signIn,
        createUser
        


    }
    return (
       <Authcontext value={authInfo}>
        
        {children}

       </Authcontext>
    );
};

export default Authprovider;