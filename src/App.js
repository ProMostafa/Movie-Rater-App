import React ,{Component} from 'react';
import './App.css';
import MovieList from './components/movie_list'
import MovieDetalis from './components/movie_details';
import MovieForm from './components/movie_form';
import { withCookies } from 'react-cookie'
var Fontawesome =require('react-fontawesome');


class App extends Component {


   state = {
     movies:[],
     selectedMovie:null,
     editMovie:null,
     token: this.props.cookies.get('user-token')
   }


  
   componentDidMount(){
     if(this.state.token){
      fetch(`${process.env.REACT_APP_API_URL_PRODUCTION}/api/movies/`,{
        method:'GET',
        headers:{
          'Authorization':`Token ${this.state.token} `,
        }
      }).then(response => response.json())
      .then(response => this.setState({movies:response}))
      .catch(error => console.log(error))
 
     }else{
       window.location.href="/";

     }
     
   }

   loadMovie = movie =>{
     this.setState({selectedMovie : movie , editMovie:null});
  }
  movieDeleted= selectedMovie =>{
    const movies = this.state.movies.filter(movie => movie.id !== selectedMovie.id);
    this.setState({movies:movies,selectedMovie:null });
  }

  editClicked= selectedMovie =>{
    this.setState({editMovie:selectedMovie})
  }
  newMovie = () =>{
    this.setState({editMovie:{title:"",description:""}})
  }

  cancelForm = () =>{
    this.setState({editMovie:null})
  }
  addMovie= movie =>{
    this.setState({movies:[...this.state.movies,movie]}) // Add new movie to movies
  }

  render()
  {
    return (
      <div className="App">
          <h1>
          <Fontawesome name="film"/>
            <span>Movie Rater</span>
          </h1>
          <div className="layout">
            <MovieList movies={this.state.movies}  movieClicked={this.loadMovie}
              movieDeleted={this.movieDeleted} editClicked={this.editClicked} newMovie={this.newMovie} token={this.state.token}/>
            <div>
              { ! this.state.editMovie ? 
                  <MovieDetalis  movie={this.state.selectedMovie} updateMovie={this.loadMovie} token={this.state.token} /> 
                  :  <MovieForm  movie={this.state.editMovie} cancelForm={this.cancelForm} newMovie={this.addMovie}
                       editMovie={this.loadMovie} token={this.state.token} />}
            </div>
          </div>
          
      </div>
    );
  }
  
}

export default withCookies(App);
