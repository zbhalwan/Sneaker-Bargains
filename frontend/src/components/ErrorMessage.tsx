import { useContext } from "react";
import { PageContext } from "../App";

export const ErrorMessage  = () => {

    const {pageState} = useContext(PageContext);

    // DEFENSIVE PROG: If no pageState  is defined yet, we return an empty div
    if ((pageState == null) || (pageState == undefined)){
        return <div/>
    } 
    const errorMessage = pageState.errorMessage;

    // DEFENSIVE PROG: If no product list is defined yet, we return an empty div
    if ((errorMessage == null) || (errorMessage == undefined)){
        return <div/>
    } 


    return(
            <div aria-label={errorMessage}  className="error-message" role="error-message">
               <span>{errorMessage}</span>
            </div>
    );

};

