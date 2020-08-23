import React from 'react';
var Fontawesome =require('react-fontawesome');


function MovieList(props){


    const movieClicked = movie => evt =>{
        props.movieClicked(movie);
    }

    const removeClicked = movie =>{
        fetch(`${process.env.REACT_APP_API_URL_PRODUCTION}/api/movies/${movie.id}/`,{
            method:'Delete',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${props.token}`,
            },
        }).then(response => props.movieDeleted(movie))
        .catch(error => console.log(error))
    }

    const editClicked = movie =>{
        props.editClicked(movie);
    }
 const newMovie = () => {
     props.newMovie()
 }
    
    return(
        <div>
            {props.movies.map(movie =>{
                return (
                    <div key={movie.id}  className="moive-item">
                        <h3 onClick={movieClicked(movie)}  >
                                    {movie.title}
                        </h3>
                        <Fontawesome  name="edit" onClick={()=>editClicked(movie)} />
                        <Fontawesome  name="trash" onClick={()=>removeClicked(movie)}/>
                    </div>
                )
            })}
            <button onClick={newMovie}>Add New</button>
        </div>
    )
}

export default MovieList;