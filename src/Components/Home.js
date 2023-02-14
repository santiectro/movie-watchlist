import React from "react";
import "./Home.css"
import { Link } from "react-router-dom";
import Movie from "./Movie";
import { Context } from "../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home () {
    
    const {movies, getMovies, addToFavorites, removeFromWatchlist, Lightmode, toggleMode} = React.useContext(Context)


    const allMovies = movies.map( movie  => {
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
                        <h1>Find your film</h1>
                        <p>{Lightmode ? "Dark" : "Light"} Mode </p>
                        <input type="checkbox" onClick={toggleMode} checked={Lightmode ? false : true} />
                    </div>
                    <Link to="/Watchlist">
                        Watchlist
                    </Link>
                </div>
            </header>
            <form className="search-form" >
                <input type="text" placeholder="Search for a movie" id="movie-search"></input>
                <button onClick={(e) => getMovies(e)}>Search</button>
            </form>
            <div className="render-movies">
                {movies.length > 0 && allMovies}
                {movies.length === 0 && 
                <>
                    <FontAwesomeIcon icon="fa-solid fa-film" size="10x"/>
                    <h2 className="empty" >Let's look for some movies</h2>
                </>} 
            </div>
            
        </div>
    )
}