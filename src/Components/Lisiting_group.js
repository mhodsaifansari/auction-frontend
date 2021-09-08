import React from 'react'
import Card from './Card'
import {useState,useEffect} from 'react'
import getActiveLisiting from '../Hook.js/getActiveLisiting';
import getCaterogry from '../Hook.js/getCateogry';
import getWatchlist from '../Hook.js/getWatchlist';
import getWonList from '../Hook.js/getWonList';
import getMyList from '../Hook.js/getMyList';
import getUserList from '../Hook.js/getUserList';
const mapping_data=(dataActiveList,bid_list,isLogged)=>{
  console.log(dataActiveList);
  let jsxList=dataActiveList.map((l,index)=>{
    
    return (<Card  isLogged={isLogged}id={l.id}title={l.title} img={{src:l.image,alt:l.title}} bid={bid_list[index]} description={l.description}></Card>)})
  return jsxList}

function Lisiting_group(props) {
  const [jsx,set_jsx]=useState({list:'',title:''});
  
  useEffect(
    ()=>{
    switch(props.type)
    {
      case "Active":
                   
                    getActiveLisiting
                    .then((dataActiveList)=>{set_jsx({list:mapping_data(dataActiveList.listing,dataActiveList.bid_list,props.isLogged),title:"Active Listing"})})
                    .catch((err)=>{
                      console.log(err);
                    });
                    
                  break;
      case "Watchlist":
                  getWatchlist()
                  .then((dataWatchList)=>{set_jsx({list:mapping_data(dataWatchList.listing,dataWatchList.bid_list,props.isLogged),title:"My Watchlist"});})
                  .catch((err)=>{
                    console.log(err);
                  })
                  
                  break;
      case "Won":
                  getWonList()
                  .then((dataWonList)=>{set_jsx({list:mapping_data(dataWonList.listing,dataWonList.bid_list,props.isLogged),title:"Listing Won "})})
                  .catch((err)=>{
                    console.log(err);
                  })
                break;
      case "My List":
                getMyList()
                .then((dataMyList)=>{set_jsx({list:mapping_data(dataMyList.listing,dataMyList.bid_list,props.isLogged),title:"My List "})})
                  .catch((err)=>{
                    console.log(err);
                  })
                break;
      case "cateogry":
                  
                  getCaterogry(props.group_of)
                  .then((dataActiveLisiting)=>{set_jsx({list:mapping_data(dataActiveLisiting.listing,dataActiveLisiting.bid_list,props.isLogged),title:"Cateogry: "+ props.group_of})})
                  .catch((err)=>{console.log(err);})
                break;
      case "User":getUserList(props.username)
                  .then((dataActiveLisiting)=>{set_jsx({list:mapping_data(dataActiveLisiting.watchlist,dataActiveLisiting.bid_list,props.isLogged),title:"Username : "+dataActiveLisiting.username})})
                  .catch((err)=>{
                    console.log(err);
                  })
                  break;
      default:;
    }
  
    },[]);
    console.log(jsx.list)
  return (
        <div className="card-container" >
          <h2>{jsx.title}</h2>
         <div className="Card-div">
          {jsx.list!==''?jsx.list.length===0?'NO List is present':jsx.list:"Loading...."}
          {}
          </div>
        </div>
    )
}

export default Lisiting_group
