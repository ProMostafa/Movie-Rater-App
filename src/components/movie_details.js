import React ,{Component} from "react"
var Fontawesome =require('react-fontawesome');

class MovieDetalis extends Component {

    state = {
        highlighted:-1
    }

    highLightRate =high => evt =>{
        this.setState({highlighted:high});
        }

    rateClicked = stars => evt => {
        // Using vrible in url using `...................`  not using '.............'
        fetch(`${process.env.REACT_APP_API_URL_PRODUCTION}/api/movies/${this.props.movie.id}/rate_movie/`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Token ${this.props.token}`,
                },
                body:JSON.stringify({stars:stars+1})
            }).then(response => response.json())
            .then(response => this.getDetails())
            .catch(error => console.log(error))

    }
    getDetails = () =>{
        fetch(`${process.env.REACT_APP_API_URL_PRODUCTION}/api/movies/${this.props.movie.id}/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${this.props.token}`,
            }
        }).then(response => response.json())
        .then(response => this.props.updateMovie(response))
        .catch(error => console.log(error))
    }
    render(){
        return (
            <React.Fragment>
                { this.props.movie ? (
                    <div>
                        <h3>{this.props.movie.title}</h3>
                        <Fontawesome name="star" className={this.props.movie.avg_rating > 0 ? 'orange' : ''}/>
                        <Fontawesome name="star" className={this.props.movie.avg_rating > 1 ? 'orange' : ''} />
                        <Fontawesome name="star" className={this.props.movie.avg_rating > 2 ? 'orange' : ''} />
                        <Fontawesome name="star" className={this.props.movie.avg_rating > 3 ? 'orange' : ''} />
                        <Fontawesome name="star" className={this.props.movie.avg_rating > 4 ? 'orange' : ''} />
                        ({this.props.movie.no_of_rating})
                        <p>{this.props.movie.description}</p>

                        <div className="rate-container">
                            <h2>Rate it !!</h2>
                            {[...Array(5)].map((e,i) =>{
                                return <Fontawesome  key={i}name="star" className={this.state.highlighted > i-1 ? 'purple' : ''}
                                onMouseEnter={this.highLightRate(i)}  onMouseLeave={this.highLightRate(-1)} onClick={this.rateClicked(i)} />
                            }) }

                        </div>
                    </div>
                ) : null}
            </React.Fragment>
        )
    }
}

export default MovieDetalis;