import {useContext, useEffect, useState} from "react"
import React, { Component } from "react";
import "../App.css"
import ReactSearchBox from "react-search-box";
import {siteName} from "../config"
import {getProductList} from "../data/getProductList"
import { PageContext } from "../App";

export const NewSearchBar  = () => {

    const [textSearch, setTextSearch] = useState("");
    const {dispatch} = useContext(PageContext);

    const searchForSneakers = () => {
        const cleanTextSearch= textSearch.trim();
        if (cleanTextSearch.length == 0) {
            return;
        } else {
            getProductList(cleanTextSearch, dispatch);
        }
    }

    const handleKeyPress = (event: { key: string; }) => {
        if (event.key === "Enter") {
            searchForSneakers();
        }
    }

    return(
    <div className="new-search-bar">
        <input
            aria-label="Press Enter or the button to Search" 
            className = "input-search-box"
            role = "input-search-box"
            type="text"
            id="header-search"
            placeholder="Lots of delicious deals to discover 🤤 Search your favorite Sneakers!"
            onChange = {(event) => {setTextSearch(event.target.value)}}
            onKeyDown = {handleKeyPress}
        />
        <button
        aria-label="Press Enter or the button to Search" 
        className = "button-search-box"
        role = "search-button"
        onClick = {searchForSneakers}
        type="submit">
            Search
        </button>
    </div>
    )
};


