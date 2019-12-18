import React, {useState} from 'react';
import axios from 'axios';


const initialState = {
    id: Date.now(),
    title: '',
    director: '',
    metascore: '',
    stars: ''
  }

export const UpdateForm = (props) => {
    const [movieInput, setMovieInput] = useState(initialState)
    
    // useEffect(() => {
    //     const movieToEdit = props.movies.find(
    //       e => `${e.id}` === props.match.params.id
    //     );
    //     console.log(props.movies, movieToEdit);
    //     if (movieToEdit) {
    //         setMovieInput(movieToEdit);
    //     }
    //   }, [props.movies, props.match.params.id]);



    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movieInput.id}`, movieInput)
            .then(response =>{
                props.updateMovie(response.data)
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


    return (
        <form onSubmit = {handleSubmit}>
            <label htmlFor = 'title'> Title: </label>
            <input 
                name = 'title'
                type = 'text'
                value = {movieInput.title}
                onChange = {handleChange}
                placeholder = 'Add movie title'
            />

            <label htmlFor = 'director'> Director: </label>
            <input 
                name = 'director'
                type = 'text'
                value = {movieInput.director}
                onChange = {handleChange}
                placeholder = 'Add movie director'
            />

            <label htmlFor = 'metascore'> Metascore: </label>
            <input 
                name = 'metascore'
                type = 'text'
                value = {movieInput.metascore}
                onChange = {handleChange}
                placeholder = 'Add metascore'
            />

            <label htmlFor = 'stars'> Stars: </label>
            <input 
                name = 'stars'
                type = 'text'
                value = {movieInput.stars}
                onChange = {handleChange}
                placeholder = 'Add stars'
            />
            <button type = 'submit'>Add</button>
        </form>
    )
}