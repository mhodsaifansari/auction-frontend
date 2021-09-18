import React,{useRef} from 'react';
import logoutHook from '../Hook.js/logoutHook';

function SideNav(nav_list)
{
    if(nav_list.current!==0)
    {
        console.log(nav_list.current);
        nav_list.current.style.width='50%';

    }
}
function Nav({isLogged,setLogged}) {
    const nav_list=useRef(null);

    return (
        <>
        <div>
          <div>
          <h1 className="title">
            <button className="nav-open nav-btn" onClick={()=>{SideNav(nav_list)}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <img src={process.env.PUBLIC_URL+'/icon.png'} width="10%"></img>Auctions</h1></div> 
        <span className="login-register-logout">
          {isLogged===true?<>
                <span> 
                  <a href={"/user/"+JSON.parse(localStorage.getItem('user')).user} className="nav-link">{JSON.parse(localStorage.getItem('user')).user+" "}</a>
                  
                </span> 
                  <button className="login"onClick={()=>{logoutHook(setLogged)}}>Want to logout</button></>
                  :
                  <>
                    <p>
                      <a className="login-link"href="/login">Login</a>/<a href="/register" className="register-link">Register</a>
                    </p>
                  </>
            }
        </span>
        </div>
        
        <nav ref={nav_list}>  
        
        <div><a className="nav-link"href="/" alt="#">Active Lisiting</a><button className="nav-close"onClick={()=>{ nav_list.current.style.width='0';
}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div>
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
