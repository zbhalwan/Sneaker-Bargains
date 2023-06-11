import { Reducer } from 'react'
import {IPageState, IPageStateAction, mapProductPrice } from "./dataTypes";

export const reducer: Reducer<IPageState, IPageStateAction> = (state : IPageState, action : IPageStateAction) => {
    const {type, sku, payload} =  action;
    const username = localStorage.getItem('name');

    switch (type) {
        case "searchSuccess" :

            return {
                ...state, 
                productList : payload,
                errorMessage : "",
                userName: username
            }

        case "searchFailure" :

            return {
                ...state, 
                productList : [],
                errorMessage : payload,
                userName: username
            }

        case "priceStatsSuccess" :

            mapProductPrice.set(sku, payload);

            return {
                ...state, 
                errorMessage : "",
            }
        
        case "priceStatsFailure" :

            return {
                ...state, 
                errorMessage : payload,
                userName: username
            }

        case "getPlatformsSuccess":
            return {
                ...state, 
                platforms : payload,
            }
        
        case "getPlatformsFailure":
            return {
                ...state, 
                errorMessage : payload,
            }

        case "filterPlatforms":
            return {
                ...state,  
                errorMessage : state.errorMessage + " ", //hack to trigger state change from React
            }

        default :
            throw new Error("unhandled reducer action")
        }
}