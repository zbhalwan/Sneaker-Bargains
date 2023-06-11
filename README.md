# Sneaker Bargains
## Contributors
Developed by Zeeshan Bhalwani (zbhalwan) & Kyle Sohn (ksohn3) & Safae Merigh (smerigh) & Omer Chaudhry (mchaud11)

## Project Description
Sneaker Bargains is a full-stack web application developed by a team of 3 using Java, TypeScript, React, and HTML/CSS. The application provides users with comprehensive information on sneaker prices across major marketplaces, including all associated fees (taxes, shipping, processing, etc.). By offering clear cost comparisons, Sneaker Bargains helps users save money on their sneaker purchases.


## Backend
In the `src` package is `main` and `test`:
* `java` 

  * _SneakerSKUHandler.java_ : handles the request for the SKU and Image URL of a sneaker from its name (not used)
  * _SneakerPriceHandler.java_ : handles the request for the price of a sneaker from its SKU (not used)

  * _SneakerPlatformsHandler.java_ : handles the request for platforms
  * _SneakerPriceStatsHandler.java_ : handles the request for prices
  * _SneakerProductListsHandler.java_ : handles the request for product shoes after search

    * HTTP
      * PlatformsHTTP & PriceStatsHTTP & ProductListHTTP : calling API 
      * PlatformsProxy & PriceStatsProxy & ProductListProxy : Caching

* `test` and its subdirectories contains unit testing, fuzz testing, integration testing, and testing with mocks.


### API Endpoints
* Paid API will use: https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-product-search/
MOCK API:
  * GET /sneaker/sku?name={name} : returns the SKU and Image URL of a sneaker from its name
  * GET /sneaker/price?sku={sku} : returns the price of a sneaker from its SKU

## Frontend
* `frontend` contains code for rendering the website

* `src` directory contains `data`, `components`, `tests` directories and `App.tsx`

  * _App.tsx_ : entry point of the webpage, where all the necessary components are rendered.

  * `mockdata` directory contains mock data 
    * _platforms.ts_ : provides a list of the different sneakers
    * _search.ts_ : provides a list of the different sneakers´ information (platforms, sku, image, color...) when looking up "Adidas"
    * _priceStats.ts_ : provides a list of the different sneakers´ prices on different platforms when looking up "Adidas"

  * `components` directory contains all the components that appear on the webpage: SearchBar, ProductDescription, SearchResults, Filter, Wishlist, & Google SignIn button

    * _SearchBar.tsx_: where the user can type the product he is looking for. 
    * _GoogleSignIn.tsx_ : let's the user sign in via their email address
    * _Filter.tsx_ : let's the user restrain the search to its selected platforms
    * _SearchResults.tsx_ : shows all the vendors selling the selected product 
      * _ProdcutPriceStats.tsx_ : shows the product description. Includes: picture + name + prices (accross all selected platforms + sidebar to visualze price range)
      * _Wishlist.tsx_ : shows the products the user has liked
  
  * `data`: where the functionnality is implemented
    * _dataTypes.ts_ : lists all the interfaces that represent data types used througout the project
    * _getPlatforms.ts_ : retrieves the platforms of a given shoe 
    * _getPriceStats.ts_  : retrieves the prices on all platforms of a given shoe 
    * _getProductList.ts_  : retrieves the products corresponding to a search by the user 
    * _getWishlist.ts_ :  retrieves the products the user has liked
    * _mockingMde.ts_ : whether we are mocking or making calls to the API
    * _reducer.ts_: handles the global state of the different components
    * _typePredicate.ts_ : has type guard functions for checking if given object is a ServerErrorResponse or isServerSuccessResponse

  * `tests` directory contains tests for the forntend 
    * _dom.test.tsx_: contains the DOM testing for the webapp
    * _unit.test.tsx_ : contains the unit testing for the webapp


## Running the Program

* in folder H
* cd into backend --> src --> main --> server and run `Server.java`
  * go to `localhost:3232` and utilize API endpoints and parameters detailed in the API section of README.

* cd into frontend and run first `npm install` and then `npm start`, `npm run dev`, `npm install firebase`, `npm install @mui/material`, `npm install @emotion/styled`

* Run the tests: `npm test` for frontend and `mvn test`
  * run the server before running integration tests
