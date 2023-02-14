import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";
import Movie from "./Movie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/fontawesome-free-solid'

export default function Watchlist () {

    const {favMovies, addToFavorites, removeFromWatchlist, Lightmode, toggleMode} = React.useContext(Context)

    const watchlistMovies = favMovies.map( movie  => {

        return (
            <Movie
            addToFavorites={addToFavorites}
            removeFromWatchlist = {removeFromWatchlist}
            {...movie}
            />
        )
    })

    return (
        <div className={ Lightmode ? "light" : "dark"}>
            <header>
                <div class="header-div">
                    <div>
                    <Link to="/" className="normal">
                        <h1>Find your film</h1>
                    </Link>
                        <p>{Lightmode ? "Dark" : "Light"} Mode </p>
                        <input type="checkbox" onClick={toggleMode} checked={Lightmode ? false : true} />
                    </div>
                    <h1>Watchlist</h1>
                </div>
            </header>
            <div className="render-movies">
                 {favMovies.length > 0 && 
                 <>
                    <h2 className="watchlist-title" >Your Watchlist</h2>
                    {watchlistMovies} 
                 </>
                 }
                 {favMovies.length === 0 &&  
                 <div className="no-movies">
                    <h2 className="watchlist-title" >Your watchlist seems empty </h2>
                    <Link to="/">
                        <button><FontAwesomeIcon icon={faPlusCircle} className="circle-plus" />Let's add some movies</button>
                    </Link>
                </div> }   
            </div>
        </div>
    )
}