import  mockPriceStats  from "../../../mockdata/priceStats.json";
import { mockingMode } from "./mockingMode";
import { isServerSuccessResponse, isServerErrorResponse } from "./typePredicate";
import {backendURL} from "./backend.config";


export async function getPriceStats (sku : string, dispatch : any)  {
    
    if (mockingMode) {

        const action = {
            type : "priceStatsSuccess",
            payload : mockPriceStats.data,
            sku: sku
        }
        dispatch(action) ;

    } else {

        const url = backendURL + "/price_stats?sku=" + sku;

        await fetch(url)
            .then(res => res.json())
            .then((resultJson: any) => {
                if (isServerSuccessResponse(resultJson)) {

                    const result : any = resultJson.data;

                    const action = {
                        type : "priceStatsSuccess",
                        payload : result.data,
                        sku: sku
                    };
                    dispatch(action) ;
                

                } else if (isServerErrorResponse(resultJson)) {
                    const action = {
                        type : "priceStatsFailure",
                        payload : resultJson.message
                    }; 
                    dispatch(action) ;
                

                } else {
                    const action = {
                        type : "priceStatsFailure",
                        payload : "Error while trying to contact server for prices stats"
                    };
                    dispatch(action) ;
                  
                }
            },
            (error) => {
             
                const action = {
                    type : "priceStatsFailure",
                    payload : error
                };

                dispatch(action) ;
            }
    )

    }
}


