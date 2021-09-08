import React from 'react'
import {useState} from 'react';
import {Redirect, Route,useHistory} from 'react-router-dom'
import loginHook from '../Hook.js/loginHook';
import logoutHook from '../Hook.js/logoutHook';

function Login({isLogged,setLogged}) {
    let history=useHistory();
    const [form_data,set_form_data]=useState({'username':'','password':''})
    const [status,setStatus]=useState('');
    const usernameHandler=(e)=>{set_form_data((prevState)=>{return {'username':e.target.value,'password':prevState.password}})};
    const passwordHandler=(e)=>{set_form_data((prevState)=>{return {'username':prevState.username,'password':e.target.value}})};
    const submitHandler=(e)=>
    {   e.preventDefault();
        loginHook(form_data.username,form_data.password)
    .then((data)=>{console.log(data);

        data.loggedIn=true;
        console.log(data);
        localStorage.setItem('user',JSON.stringify(data));
        setLogged(true);
        history.push("/")

    })
    .catch((err)=>{console.log(err);
        
        
        
        
        if(err.response.status==500)
        {
            setStatus('Server has some issue please try again later')
        }
        if(err.response.status==401)
        {
            setStatus("Invalid username/password");
        }
    
    
    })                        
    }
    return (
        <div>
            <div>{status}</div>
            {isLogged===true?<button onClick={()=>{logoutHook(setLogged)}}>want to logout</button>:(<form >
                
                <div>
                    <label for="username">Enter Username: </label>
                    <input type="text" id="username" onChange={usernameHandler}></input>
                </div>
                <div>
                    <label for="password">Enter Password: </label>
                    <input type="password" id="password" onChange={passwordHandler}></input>
                </div>
                <input type="Submit" value="Login" onClick={submitHandler} className="login"></input>
            </form>)}
            
        </div>
    )
}

export default Login
