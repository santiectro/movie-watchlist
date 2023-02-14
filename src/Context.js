import { type } from "@testing-library/user-event/dist/type";
import React from "react";

const Context = React.createContext();

function ContextProvider({children}) {
    
    const [movies, setMovies] = React.useState([])
    const [favMovies, setFavMovies] = React.useState([])
    const [Lightmode, setLightMode] = React.useState(true)

    async function toggleMode() {
        await setLightMode(prev => {
            if (!Lightmode) {
                document.body.style.backgroundColor = "white"
            }else {
                document.body.style.backgroundColor = "#001524"  
            }
            return !prev
        })
        
        document.getElementById("header-btn").checked = Lightmode
    }


    function addToFavorites (e) {

        var movieToAdd = movies.filter( movie  => {
            if (e.target.id === "") {
                if(e.target.parentElement.id === "") {
                    return movie.imdbID === e.target.parentElement.parentElement.id
                } 
                return movie.imdbID === e.target.parentElement.id
            }else{
                return movie.imdbID === e.target.id
            }
        })

        setFavMovies( prevState => {
            const newArr = [...prevState]
            let alreadyFavorited = favMovies.find( favMovie => {
                return favMovie.imdbID === movieToAdd[0].imdbID
            } )
            if (alreadyFavorited === undefined) {
                newArr.push({...movieToAdd[0], isFavorited: true})
                return newArr
            }else {
                return prevState
            }
            
        })
        setMovies( prevStates => {

            return prevStates.map(alreadyMovie => {
                if (movieToAdd[0].imdbID === alreadyMovie.imdbID) {
                    return {...alreadyMovie, isFavorited: true}
                }else {
                    return alreadyMovie
                }
            })
        })
    }

    function getMovies (e) {
        let arr = []
        let movieValue = document.getElementById("movie-search").value
        e.preventDefault()
        fetch(`https://www.omdbapi.com/?apikey=1e7eb3d&s=${movieValue}`)
            .then(res => res.json())
            .then(async data => {
                if (data.Response === "False") {
                    console.log("Me chupa un huevo")
                }else{
                    for(let movie of data.Search) {
                        const responseMovie =  await fetch(`https://www.omdbapi.com/?apikey=1e7eb3d&i=${movie.imdbID}`)
                        const dataMovie = await responseMovie.json()
                        arr.push({...dataMovie, isFavorited: false })

                    }
                    setMovies(arr)
                }
            })
    }

    function removeFromWatchlist (e) {
        setFavMovies( prevState => {
            let newArr = [...prevState]
            const movieToAdd = favMovies.filter( movie  => {
                if (e.target.id === "") {
                    if(e.target.parentElement.id === "") {
                        return movie.imdbID !== e.target.parentElement.parentElement.id
                    } 
                    return movie.imdbID !== e.target.parentElement.id
                }else{
                    return movie.imdbID !== e.target.id
                }
            })

            newArr = movieToAdd
            return newArr
        })

        setMovies( prevStates => {
            var movieToRemove = movies.filter( movie  => {
                if (e.target.id === "") {
                    if(e.target.parentElement.id === "") {
                        return movie.imdbID === e.target.parentElement.parentElement.id
                    } 
                    return movie.imdbID === e.target.parentElement.id
                }else{
                    return movie.imdbID === e.target.id
                }
            })
            return prevStates.map(alreadyMovie => {
                if (movieToRemove[0].imdbID === alreadyMovie.imdbID) {
                    return {...alreadyMovie, isFavorited: false}
                }else {
                    return alreadyMovie
                }
            })
        })
    }

    return (
        <Context.Provider value={{
            movies : movies,
            favMovies : favMovies,
            Lightmode,
            getMovies,
            addToFavorites,
            removeFromWatchlist,
            toggleMode
        }}>
            {children}
        </Context.Provider>
    )

}

export {ContextProvider, Context}