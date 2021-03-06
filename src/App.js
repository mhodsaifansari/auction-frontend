import'./App.scss';
import './styled_component.scss';
import Nav from './Components/Nav'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,useHistory, Link
} from "react-router-dom";
import Lisiting from './Components/Lisiting';
import New_lisiting from './Components/New_lisiting';
import Login from './Components/Login';
import Lisiting_group from './Components/Lisiting_group';
import getActiveLisiting from './Hook.js/getActiveLisiting';
import { useEffect ,useState} from 'react';
import Card from './Components/Card';
import Cateogry from './Components/Cateogry';
import Nav_Component from './Components/Nav_Component';
import Register from './Components/Register';
import authAxios from './Hook.js/authenicationHook';
import User from './Components/User';
import AboutPage from './Components/AboutPage';

function checklogin()
{
  try{
    let checkLogged=JSON.parse(localStorage.getItem('user'))
    
    if(checkLogged.loggedIn===true)
    {
    
    return true;
    }
    else
    {
    
  
      return false;
    }
  }
  catch(err)
  {
    
    return false;
  }
}

function App() {
  //eslint-disable-next-line
 const [listing_data,set_listing_data]=useState('');
 const [isLogged,setLogged]=useState(checklogin)
 const history = useHistory();
 const lisiting=({location,match})=>{
    const id=location['pathname'].replace(match.url+'/',"");
    return (<Route path={match.url+'/'+id} ><Lisiting isLogged={isLogged} value={id} setLogged={setLogged}></Lisiting></Route>)
  }
  const redirect_jsx=(jsx)=>{
                        
    return isLogged?(jsx):(<Redirect to="/"/>)
}

  useEffect(()=>{
    setLogged(checklogin)
   
  },[])
 
 console.log(isLogged);
  
  return (
    <Router>
    <div className="App">
      <div className="body-head">
       <Nav isLogged={isLogged} setLogged={setLogged}>
       </Nav>
      </div>
           <div>
        
        <Switch>
          
          <Route exact path="/"> 
          
            <Lisiting_group type="Active" list_data={listing_data} setLogged={setLogged}></Lisiting_group>
        </Route>
        <Route exact path="/about">
          <AboutPage></AboutPage>  
        </Route>
        <Route path='/add-new-lisiting'>
           
        {isLogged?<New_lisiting></New_lisiting>:<Redirect to="/"></Redirect>}
        </Route>
        <Route path="/watchlist">
           
          {redirect_jsx(<Lisiting_group type="Watchlist"></Lisiting_group>)}
        </Route>
        <Route path="/lisiting-won">
           
        {redirect_jsx(<Lisiting_group type="Won"></Lisiting_group>)}
        </Route>  
        <Route path="/my-lisiting">
           
        {redirect_jsx(<Lisiting_group type="My List"></Lisiting_group>)}
        </Route>
        <Route path="/login">
            <Login isLogged={isLogged} setLogged={setLogged}></Login>
        </Route>
        <Route path="/register">
          <Register isLogged={isLogged} setLogged={setLogged}></Register>
        </Route>
        <Route path="/cateogry" component={(route)=>{
            console.log(route);
            if(route.location.pathname==="/cateogry")
            {

              return <Cateogry match={route.match}></Cateogry>
            }
            else
            { 
              return (<>
              <Lisiting_group type="cateogry" group_of={route.location.pathname.replace("/cateogry/","")} ></Lisiting_group></>)
            }
        }}></Route>
        <Route path="/active" component={
          
          (route)=>{
            console.log(route)
            if(isLogged==true){
            return lisiting(route);
            }
            else
            {
              return <Redirect to="/login"></Redirect>
            }
        }
        
        
        }></Route>
        <Route path="/user" component={
          (route)=>
          {
          console.log(route.match.url)
          const username=route.location['pathname'].replace(route.match.url+"/","")
          return <Route path={route.match.url+"/"+username}><User username={username}></User></Route>
          }
          }></Route>
        </Switch>
      </div>
    </div>
     </Router>
  );
}

export default App;
