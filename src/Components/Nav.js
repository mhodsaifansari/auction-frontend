import React,{useRef} from 'react';
import logoutHook from '../Hook.js/logoutHook';
function SideNav(nav_list)
{
    if(nav_list.current!==0)
    {
        console.log(nav_list.current);
        nav_list.current.style.width='30%';

    }
}
function Nav({isLogged,setLogged}) {
    const nav_list=useRef(null);

    return (
        <>
        <div>
          <div>
          <h1>Auctions</h1></div> 
        <span>{isLogged===true?<span> {JSON.parse(localStorage.getItem('user')).user+" "} <button className="login"onClick={()=>{logoutHook(setLogged)}}>Want to logout</button></span>:<><p><a className="login-link"href="/login">Login</a>/<a href="/register" className="register-link">Register</a></p></>}</span>
        </div>
        <button className="nav-btn" onClick={()=>{SideNav(nav_list)}}>more</button>
        <nav ref={nav_list}>  
        <button onClick={()=>{ nav_list.current.style.width='0';
}}>close</button>
        <a className="nav-link"href="/" alt="#">Active Lisiting</a>
        <a className="nav-link"href="/cateogry"alt="#">Cateogry</a>
        {isLogged===true?<><a className="nav-link"href="/add-new-lisiting"alt="Add new Lisiting">Add New Lisiting</a>
        <a className="nav-link"href="/watchlist"alt="#">Watchlist</a>
        <a className="nav-link"href="/lisiting-won"alt="#">Lisiting Won</a>
        <a className="nav-link"href="/my-lisiting"alt="#">My Lisiting</a></>:""}
      </nav>
      </>
    )
}

export default Nav
