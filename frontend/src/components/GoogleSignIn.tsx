import { signInWithGoogle, signOutWithGoogle} from "../firebase"
import { Button } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import "../App.css"
import { useState } from "react"

export const GoogleSignIn  = () => {


    // TSX to display when the user is signed out.
    const showSignIn = () => {

        return( 
            <Button aria-label="Press Enter to Sign In With Google" onClick={signInWithGoogle} className="google-btn">
                <span className="google-text">Sign in!</span>
                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" />
            </Button>
        )
    } 

    // TSX to display when the user is signed in.
    const showSignOut = () => {

        return( 
            <Button aria-label="Press Enter to Sign Out" onClick={signOutWithGoogle} className="google-btn">
                <span className="signout-text">Sign Out!</span>
                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" />
            </Button>
        )
    } 

    const username = localStorage.getItem('name');
    const signedIn = (username != undefined) && (username.length) > 0;

    

    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 'i') {
            signInWithGoogle();
        } else if (event.ctrlKey && event.key === 'o') {
            signOutWithGoogle();
        }
    });
  
    return(
            <div className="signin-container" role="signin-container">
                <p className="welcome-message">  {localStorage.getItem('name') ? "Hey " + localStorage.getItem('name') + "!" : "Why aren't you logged in yet 🤨?"}</p>
                {signedIn?showSignOut():showSignIn()}
            </div>
    );
    } 

