import React ,{Component} from 'react';
import { withCookies } from 'react-cookie'

class Login extends Component{

    state ={
        credentials:{
            username:'',
            password:'',
        },
        isLoginView:true
    }


    inputChange=evt =>{
        let cred = this.state.credentials;
        cred[evt.target.name] =evt.target.value; 
        this.setState({credentials:cred});
         }
        
    login = evt =>{
       if(this.state.isLoginView){
            fetch(`${process.env.REACT_APP_API_URL_PRODUCTION}/auth/`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(this.state.credentials)
            }).then(response => response.json())
            .then(response =>{
                                console.log(response.token);
                                this.props.cookies.set("user-token",response.token);
                                window.location.href="/movies";  
                            })
            .catch(error => console.log(error))
       } else{
            fetch(`${process.env.REACT_APP_API_URL_PRODUCTION}/api/users/`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(this.state.credentials)
            }).then(response => response.json())
            .then(response =>{this.setState({isLoginView: true})                            })
            .catch(error => console.log(error))
       }
        
    }

    toggleView= () =>
    {
        this.setState({isLoginView: !this.state.isLoginView})
    }

    render(){
        return (
            <div className="login-container"> 
                <h1>
                    { this.state.isLoginView ? 'Login' : 'Register'}
                </h1>
                <span>Username</span><br/>
               <input type="text"  name="username" value={this.state.credentials.username} 
                    onChange={this.inputChange}/><br/>
               <span>Password</span><br/>
               <input type="password"  name="password"value={this.state.credentials.password} 
                    onChange={this.inputChange}/><br/>
                <button onClick={this.login}>
                { this.state.isLoginView ? 'Login' : 'Register'}
                </button>
                <p onClick={this.toggleView}>
                    { this.state.isLoginView ? 'Create Account' : 'Back to login'}
                </p>
            </div>
        )
    }
}

export default withCookies(Login);