import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {faPlusCircle, faStar,faMinusCircle } from '@fortawesome/fontawesome-free-solid'


export default function Movie (props) {

    library.add(fab)

    /* -- Working btn --
         <button id={props.imdbID} onClick={(e) => props.addToFavorites(e)}>
    */
    
    return (
        <>
            <div class="movie">
                <img class="movie-poster" src={props.Poster} alt={`Poster for movie ${props.Title}`}/>
                <div class="movie-content">
                    <div>
                        <h3 className="title-movie">{props.Title} <FontAwesomeIcon icon={faStar} className="gold-star" /> <p>{props.imdbRating}</p></h3>   
                    </div>
                    <div class="little-info">
                        <p>{props.Runtime}</p><p>{props.Genre}</p>
                        <button id={props.imdbID} onClick={ 
                            props.isFavorited ? (e) => props.removeFromWatchlist(e) : (e) => props.addToFavorites(e)   }
                        >
                        {!props.isFavorited && <FontAwesomeIcon icon={faPlusCircle} className="circle-plus" />}
                        { props.isFavorited && <FontAwesomeIcon icon={faMinusCircle} className="circle-plus" />}
                             {props.isFavorited ? "Remove" : "Watchlist" } 
                        </button>
                    </div>
                    <p class="plot">
                        {props.Plot}
                    </p>
                </div>
            </div>
        </>
    )
}