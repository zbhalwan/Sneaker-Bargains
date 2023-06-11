import { useContext } from "react"
import { IPriceStat, mapProductPrice } from "../data/dataTypes"
import { getPriceStats } from "../data/getPriceStats"
import { PageContext } from "../App"
import  fees  from "../../../mockdata/shippingData.json";

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import "../App.css"

/**
 * Displays Product Price Stats.
 * @param sku: The SKU of the product whose Price Stats will be displayed.
 * @returns 
 */
export const ProductPriceStats = ({sku}: any) => {

    // Get the Page State and Reducer's dispatch function from the global PageContext
    const {pageState, dispatch} = useContext(PageContext);

    /**
     * Retrieves the Product's Price Stats from the backend.
     * @param sku Product SKU
     * @returns calls the back end which calls the reduced which add an entry to mapProductPrice
     */
    const getSelectedPriceStats = (sku: string) => {

        // Do nothing if the SKU is not valid.
        if ((sku == null) || (sku == undefined) || (sku.length == 0)) {
            return;

        // Get the price stats
        } else {
            getPriceStats(sku, dispatch);
        }
    }

    /**
     * Filtering function based on platforms
     * @param priceStat the stats associated with a platform
     * @returns True if the platform should be included.  False if it is filtered out
     */
    const filterPlatforms = (priceStat: IPriceStat) => {
        for (let platform of pageState.platforms) {
            if (priceStat.platformName == platform.name) 
                return platform.selected;
            }

        // We'll get here only if the platform returned by the price stats was not part of the recognized platforms.
        // Let us return a true so that the use can see it listed. 
        return false;
    }

    /**
     * Get the min and max of min/avg/last prices provided for this platform entry.
     * @param priceEntry: price entry for a platform
     * @returns [min, max]
     */
    const getEntryRange = (priceEntry: any) => {
        return [priceEntry.minPriceUsd + getPlatformFees(priceEntry), 
            priceEntry.avgPriceUsd + getPlatformFees(priceEntry) > priceEntry.maxPriceUsd + getPlatformFees(priceEntry)? priceEntry.avgPriceUsd + getPlatformFees(priceEntry): priceEntry.maxPriceUsd + getPlatformFees(priceEntry)]
    }


    // Once the backend returns data, the reducer will populate a map between the products and the price stats.
    // If no price stats list is defined yet, we return an empty div (Defensive Programmming)
    if ((mapProductPrice == null) || (mapProductPrice == undefined)){
        return <div/>
    }

    // If the backend sent the Product Price Stats, these will be in a map between the SKU and the Price Stats.
    const priceAllStats = mapProductPrice.get(sku);

    // If no Price Stats are available for this product, give the user a way to request them.
    if ((priceAllStats == null) || (priceAllStats == undefined)){

        //return <div className="get-price-stats" onClick={() => getSelectedPriceStats(sku)}>Get price stats</div>
        return <button aria-label="Press Enter to get price stats" tabIndex={0} 
        className="get-price-stats" role ="updated-button" onClick={() => getSelectedPriceStats(sku)}>Get Price Stats</button>

        return <div className="get-price-stats" role = "price-stats" onClick={() => getSelectedPriceStats(sku)}>Get price stats</div>

    }

    // Filter out the selected platforms.
    const priceStats = priceAllStats.filter(filterPlatforms)

    // Calculate the min and max of all platforms.  This will be used to set a common range for 
    // the slide bars.
    let minRange = 999999;
    let maxRange = 0;

    const getPlatformFees = (priceEntry : IPriceStat) => {
        const platformName = priceEntry.platformName;
        for (var entry of fees.data) {
            if (entry.platformName == platformName) {
                return entry.shippingFee;
            }
        }
        return 0;
    }

    priceStats.forEach( (priceEntry: any) => {
        minRange = (minRange < priceEntry.minPriceUsd) ? minRange : priceEntry.minPriceUsd + getPlatformFees(priceEntry);
        maxRange = (maxRange > priceEntry.maxPriceUsd) ? maxRange : priceEntry.maxPriceUsd + getPlatformFees(priceEntry);
    })
   
    return(
        <div className="price-stats-container" role="price-stats">
            <div className = "price-stats">
                <div className = "price-platform-column">Platform</div>
                <div className = "price-column-header">Range</div>
                <div className = "price-column-header">Min</div>
                <div className = "price-column-header">Avg</div>
                <div className = "price-column-header">Max</div>                
            </div>

             {priceStats.map((priceEntry : any) => (
                <div className = "price-stats" key = {priceEntry.platformName}>
                     <div className = "price-platform-column"> {priceEntry.platformName} </div>
                     <Box  className = "price-column">
                        <Slider 
                            getAriaLabel={() => 'Price Range range'}
                            min = {minRange * 0.95}
                            max = {maxRange * 1.15}
                            value={getEntryRange(priceEntry)}
                            valueLabelDisplay="auto"
                        />
                    </Box>

                     <div className = "price-column"> {priceEntry.minPriceUsd + getPlatformFees(priceEntry)} </div>
                     <div className = "price-column"> {priceEntry.avgPriceUsd + getPlatformFees(priceEntry)} </div>
                     <div className = "price-column"> {priceEntry.maxPriceUsd + getPlatformFees(priceEntry)} </div>
                 </div>
              ))}
         </div>        
        )
}

