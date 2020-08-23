import React ,{Component} from "react"

class MovieForm extends Component {

    state = {
        editMoive:this.props.movie
       
    }


    cancelClicked = () =>{
        this.props.cancelForm();
    }

    inputChange=evt =>{
       let movie = this.state.editMoive;
       movie[evt.target.name] =evt.target.value; 
       this.setState({editMoive:movie});
    }
   
    saveClicked = ()=>{
        fetch(`${process.env.REACT_APP_API_URL_PRODUCTION}/api/movies/`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${this.props.token}`,
            },
            body:JSON.stringify(this.state.editMoive)
        }).then(response => response.json())
        .then(response => this.props.newMovie(response))
        .catch(error => console.log(error))

    }
    updateClicked = ()=>{
        fetch(`${process.env.REACT_APP_API_URL_PRODUCTION}/api/movies/${this.props.movie.id}/`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${this.props.token}`,
            },
            body:JSON.stringify(this.state.editMoive)
        }).then(response => response.json())
        .then(response => this.props.editMovie(response))
        .catch(error => console.log(error))
    }
    show = (dis) =>{
        console.log(dis)
    }
    
    render(){

        const isDisabled = this.state.editMoive.title.length === 0 ||
                        this.state.editMoive.description.length === 0 ;

        return (
            <React.Fragment>
               <span>Title</span><br/>
               <input type="text"  name="title"value={this.props.movie.title} onChange={this.inputChange}/><br/>
               <span>Description</span><br/>
               <textarea className="textarea" name="description" value={this.props.movie.description}  onChange={this.inputChange}/><br/>
               {this.props.movie.id ? 
                    <button disabled={isDisabled} onClick={this.updateClicked}>Update</button> :
                    <button  disabled={isDisabled} onClick={this.saveClicked}>Save</button>}
        
               <button onClick={this.cancelClicked}>Cancel</button>

            </React.Fragment>
        )
    }
}

export default MovieForm;