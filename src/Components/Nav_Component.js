import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
  import Cateogry from './Cateogry';
  import Lisiting_group from './Lisiting_group';
  import Lisiting from './Lisiting';
  import New_lisiting from './New_lisiting';
  import Login from './Login';
 
  //import getActiveLisiting from './Hook.js/getActiveLisiting';
  import { useEffect ,useState} from 'react';
  //import Card from './Components/Card';
  
function Nav_Component({isLogged,setLogged}) {
    const [listing_data,set_listing_data]=useState('');
    const lisiting=({location,match})=>{
        const id=location['pathname'].replace(match.url+'/',"");
        return (<Route path={match.url+'/'+id} ><Lisiting isLogged={isLogged} value={id}></Lisiting></Route>)
      }
      const redirect_jsx=(jsx)=>{
                        
            return isLogged?(jsx):(<Redirect to="/"/>)
        }
    return (
        <Router>
        <Switch>
          
          <Route exact path="/"> 
          {/* eslint-disable-next-line */}
            <Lisiting_group type="Active" list_data={listing_data}></Lisiting_group>
        </Route>
        <Route path="/add-new-lisiting">
           {/* eslint-disable-next-line */}
          {isLogged?<New_lisiting></New_lisiting>:<Redirect to="/"></Redirect>}
        </Route>
        <Route path="/watchlist">
           {/* eslint-disable-next-line */}
          {redirect_jsx(<Lisiting_group type="Watchlist"></Lisiting_group>)}
        </Route>
        <Route path="/lisiting-won">
           {/* eslint-disable-next-line */}
            {redirect_jsx(<Lisiting_group type="Won"></Lisiting_group>)}
        </Route>  
        <Route path="/my-lisiting">
           {/* eslint-disable-next-line */}
        {redirect_jsx(<Lisiting_group type="My List"></Lisiting_group>)}
        </Route>
        <Route path="/login">
            <Login isLogged={isLogged} setLogged={setLogged}></Login>
        </Route>
        <Route path="/cateogry" component={(route)=>{
            console.log(route);
            if(route.location.pathname==="/cateogry")
            {

              return <Cateogry match={route.match}></Cateogry>
            }
            else
            { 
              return (<>{/* eslint-disable-next-line */}
              <Lisiting_group type="cateogry" group_of={route.location.pathname.replace("/cateogry/","")} ></Lisiting_group></>)
            }
        }}></Route>
        <Route path="/active" component={
          
          (route)=>{
            console.log(route)
            return lisiting(route)}
        
        
        }></Route>
        </Switch>
        </Router>
    )
}

export default Nav_Component
