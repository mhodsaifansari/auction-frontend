import React from 'react'
import {useState} from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import loginHook from '../Hook.js/loginHook';
import baseurl from '../Hook.js/url';
function Register({isLogged,setLogged}) {
    let history=useHistory()
    const [data,setdata]=useState({'username':'','password':'','confirmation':'','email':''});
    const [status,setStatus]=useState('');
    const inputHandler=(e,inputName)=>{
        setdata((prevState)=>{let d={...prevState};
        d[inputName]=e.target.value;
        return d;    
        })
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(data)
        axios.post(baseurl+"/api/register",data)
        .then((response)=>{
            console.log(response.data);
            loginHook(data.username,data.password)
            .then((data)=>{console.log(data);

                data.loggedIn=true;
                console.log(data);
                localStorage.setItem('user',JSON.stringify(data));
                setLogged(true);
                history.push("/");
        
            })
            .catch((err)=>{console.log(err);}) 
        
        })
        .catch((err)=>{
            if(err.response)
            {

            }            
            else if(err.request)
            {
                console.log("Network err");
                setStatus('Network Error please check your internet connection')
            }
        })

    }
    return (
        <div className="login-div-form">
            <div>
                {status}
            </div>
            <form className="login-form"> 
                <div>
                    <label for="username">Username</label>
                    <input type="text" id="username" onChange={(e)=>{inputHandler(e,'username')}} value={data.username}></input>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" id="password" onChange={(e)=>{inputHandler(e,'password')}}  value={data.password}></input>
                </div>
                <div>
                    <label for="confirmation">Re-enter Password</label>
                    <input type="password" id="confirmation" onChange={(e)=>{inputHandler(e,'confirmation')}} value={data.confirmation}></input>
                </div>
                <div>
                    <label for="email">Email</label>
                    <input type="email" id="email" onChange={(e)=>{inputHandler(e,'email')}} value={data.email}></input>
                </div>
                <input type="submit" value="Register" onClick={onSubmit} className="register"></input>
            </form>
        </div>
    )
}

export default Register
