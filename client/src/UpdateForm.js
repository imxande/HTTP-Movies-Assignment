import React, {useState, useEffect} from 'react';
import axios from 'axios';


const initialState = {
    // id: Date.now(),
    title: '',
    director: '',
    metascore: '',
    stars: ''
  }

export const UpdateForm = (props) => {
    const [movieInput, setMovieInput] = useState(initialState)
    
    useEffect(() => {
        
        const movieToEdit = props.movies.find(
          e => `${e.id}` === props.match.params.id
        );
        // console.log(props.movies, movieToEdit);
        if (movieToEdit) {
            setMovieInput(movieToEdit);
        }
      }, [props.movies, props.match.params.id]);



    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movieInput.id}`, movieInput)
            .then(response =>{
               
                props.history.push(`/movie-list/${movieInput.id}`)
            })
            .catch(error => console.log(error))
    }

    const handleChange = e => {
        setMovieInput({
            ...movieInput,
            [e.target.name]: e.target.value
        })
    }

    const handleStars = e => {
        setMovieInput({
            ...movieInput,
            stars: e.target.value.split(',')
        })
    }

    return (
        <form onSubmit = {handleSubmit}>
            <label htmlFor = 'title'> Title: </label>
            <input 
                name = 'title'
                type = 'text'
                value = {movieInput.title}
                onChange = {handleChange}
                
            />

            <label htmlFor = 'director'> Director: </label>
            <input 
                name = 'director'
                type = 'text'
                value = {movieInput.director}
                onChange = {handleChange}
                
            />

            <label htmlFor = 'metascore'> Metascore: </label>
            <input 
                name = 'metascore'
                type = 'text'
                value = {movieInput.metascore}
                onChange = {handleChange}
               
            />

            <label htmlFor = 'stars'> Stars: </label>
            <input 
                name = 'stars'
                type = 'text'
                value = {movieInput.stars}
                onChange = {handleStars}
               
            />
            <button type = 'submit'>UPDATE</button>
        </form>
    )
}