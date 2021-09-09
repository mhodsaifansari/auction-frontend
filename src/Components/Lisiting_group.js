import React from 'react'
import Card from './Card'
import {useState,useEffect} from 'react'
import getActiveLisiting from '../Hook.js/getActiveLisiting';
import getCaterogry from '../Hook.js/getCateogry';
import getWatchlist from '../Hook.js/getWatchlist';
import getWonList from '../Hook.js/getWonList';
import getMyList from '../Hook.js/getMyList';
import getUserList from '../Hook.js/getUserList';
import { useHistory } from 'react-router';
const mapping_data=(dataActiveList,bid_list,isLogged)=>{
  console.log(dataActiveList);

  let jsxList=dataActiveList.map((l,index)=>{
    
    return (<Card  isLogged={isLogged}id={l.id}title={l.title} img={{src:l.image,alt:l.title}} bid={bid_list[index]} description={l.description}></Card>)})
  return jsxList}

function Lisiting_group(props) {
  const [jsx,set_jsx]=useState({list:'',title:'',max_page:1});
  const [page,setpage]=useState(1)
  const history=useHistory()
  useEffect(
    ()=>{
    switch(props.type)
    {
      case "Active":
                   
                    getActiveLisiting(page)
                    .then((dataActiveList)=>{set_jsx({list:mapping_data(dataActiveList.listing,dataActiveList.bid_list,props.isLogged),title:"Active Listing",max_page:dataActiveList.max_page})})
                    .catch((err)=>{
                      console.log(err);
                    });
                    
                  break;
      case "Watchlist":
                  getWatchlist(page)
                  .then((dataWatchList)=>{set_jsx({list:mapping_data(dataWatchList.listing,dataWatchList.bid_list,props.isLogged),title:"My Watchlist",max_page:dataWatchList.max_page});})
                  .catch((err)=>{
                    console.log(err);
                  })
                  
                  break;
      case "Won":
                  getWonList(page)
                  .then((dataWonList)=>{set_jsx({list:mapping_data(dataWonList.listing,dataWonList.bid_list,props.isLogged),title:"Listing Won ",max_page:dataWonList.max_page})})
                  .catch((err)=>{
                    console.log(err);
                  })
                break;
      case "My List":
                getMyList(page)
                .then((dataMyList)=>{set_jsx({list:mapping_data(dataMyList.listing,dataMyList.bid_list,props.isLogged),title:"My List ",max_page:dataMyList.max_page})})
                  .catch((err)=>{
                    console.log(err);
                  })
                break;
      case "cateogry":
                  
                  getCaterogry(props.group_of,page)
                  .then((dataActiveLisiting)=>{set_jsx({list:mapping_data(dataActiveLisiting.listing,dataActiveLisiting.bid_list,props.isLogged),title:"Cateogry: "+ props.group_of,max_page:dataActiveLisiting.max_page})})
                  .catch((err)=>{console.log(err);})
                break;
      case "User":getUserList(props.username,page)
                  .then((dataActiveLisiting)=>{set_jsx({list:mapping_data(dataActiveLisiting.watchlist,dataActiveLisiting.bid_list,props.isLogged),title:"Username : "+dataActiveLisiting.username,max_page:dataActiveLisiting.max_page})})
                  .catch((err)=>{
                    console.log(err);
                  })
                  break;
      default:;
    }
  
    },[page]);
    const nextpage=()=>{
     if(jsx.max_page>=page+1){
     
      history.push({search:"?page="+(page+1)})
      setpage((prevpage)=>prevpage+1);
     }
    }
    const prevpage=()=>{
    
      history.push({search:"?page="+(page-1)})
      setpage((prevpage)=>prevpage-1);
      
      
    }
  return (
        <div className="card-container" >
          <div className="title-div"><h2>{jsx.title}</h2><div className="page-div">{page==1?"":<button className="prev-page"onClick={prevpage}>prev</button>}
          <span>{page}/{jsx.max_page}</span>
          {page==jsx.max_page?"":<button onClick={nextpage} className="next-page">next</button>}</div></div>
          <div>
          
          
          </div>
         <div className="Card-div">
          {jsx.list!==''?jsx.list.length===0?'NO List is present':jsx.list:"Loading...."}
          {}
          </div>
        </div>
    )
}

export default Lisiting_group
