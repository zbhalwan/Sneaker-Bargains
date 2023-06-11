import mockSearch from "../../../mockdata/productList.json";
import { mockingMode } from "./mockingMode";
import {backendURL} from "./backend.config";
import { isServerSuccessResponse, isServerErrorResponse } from "./typePredicate";

export async function getProductList (searchText : string, dispatch : any)  {
    
    if (mockingMode) {

        const action = {
            type : "searchSuccess",
            payload : mockSearch.data,
        }
        dispatch(action) ;

    } else {

        const url = backendURL + "/sneakers?name=" + searchText;

        await fetch(url)
            .then(res => res.json())
            .then((result_raw: any) => {
                if (isServerSuccessResponse(result_raw)) {

                    const result : any = result_raw.data;

                    const action = {
                        type : "searchSuccess",
                        payload : result.data
                    };

                    console.log("Payload = " + action.payload)
                    dispatch(action) ;
                

                } else if (isServerErrorResponse(result_raw)) {
                    const action = {
                        type : "searchFailure",
                        payload : result_raw.message
                    }; 
                    dispatch(action) ;
                

                } else {
                    const action = {
                        type : "searchFailure",
                        payload : "Error while trying to contact server"
                    };
                    dispatch(action) ;
                  
                }
            },
            (error) => {
             
                const action = {
                    type : "searchFailure",
                    payload : error
                };

                dispatch(action) ;
            }
    )

    }
}