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
import logoutHook from '../Hook.js/logoutHook';
const mapping_data=(dataActiveList,bid_list,isLogged)=>{
  console.log(dataActiveList);

  let jsxList=dataActiveList.map((l,index)=>{
    
    return (<Card  isLogged={isLogged}id={l.id}title={l.title} img={{src:l.image,alt:l.title}} bid={bid_list[index]} description={l.description} date={new Date(l.created_on).toLocaleDateString()}></Card>)})
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
                      if(err.response){

                        if(err.response.status==401)
                        {
                         logoutHook(props.setLogged);
                         
                        }
              
                      }
                      else if(err.request){
                        set_jsx({list:<div className="nothing-div">Network issue please check your network and try again</div>,title:"Active Listing",max_page:1})
                      }
                    });
                    
                  break;
      case "Watchlist":
                  getWatchlist(page)
                  .then((dataWatchList)=>{set_jsx({list:mapping_data(dataWatchList.listing,dataWatchList.bid_list,props.isLogged),title:"My Watchlist",max_page:dataWatchList.max_page});})
                  .catch((err)=>{
                    if(err.response){
                      set_jsx({list:err.response.data,title:"My Watchlist",max_page:1})
                    }
                    else if(err.request){
                      set_jsx({list:<div className="nothing-div">Network issue please check your network and try again</div>,title:"My Watchlist",max_page:1})
                    }
                    
                  })
                  
                  break;
      case "Won":
                  getWonList(page)
                  .then((dataWonList)=>{set_jsx({list:mapping_data(dataWonList.listing,dataWonList.bid_list,props.isLogged),title:"Listing Won ",max_page:dataWonList.max_page})})
                  .catch((err)=>{
                    if(err.response){
                      set_jsx({list:err.response.data,title:"Listing Won",max_page:1})
                    }
                    else if(err.request){
                      set_jsx({list:<div className="nothing-div">Network issue please check your network and try again</div>,title:"Listing Won",max_page:1})
                    }
                  })
                break;
      case "My List":
                getMyList(page)
                .then((dataMyList)=>{set_jsx({list:mapping_data(dataMyList.listing,dataMyList.bid_list,props.isLogged),title:"My List ",max_page:dataMyList.max_page})})
                  .catch((err)=>{
                    if(err.response){
                      set_jsx({list:err.response.data,title:"My List",max_page:1})
                    }
                    else if(err.request){
                      set_jsx({list:<div className="nothing-div">Network issue please check your network and try again</div>,title:"My List",max_page:1})
                    }
                  })
                break;
      case "cateogry":
                  
                  getCaterogry(props.group_of,page)
                  .then((dataActiveLisiting)=>{set_jsx({list:mapping_data(dataActiveLisiting.listing,dataActiveLisiting.bid_list,props.isLogged),title:"Cateogry: "+ props.group_of,max_page:dataActiveLisiting.max_page})})
                  .catch((err)=>{
                    if(err.response){
                      if(err.response.status===404){
                        set_jsx({list:<div className="nothing-div">No such Cateogry Exist</div>,title:"Cateogry: "+ props.group_of,max_page:1})
                    }
                      
                    }
                    else if(err.request){
                      set_jsx({list:<div className="nothing-div">Network issue please check your network and try again</div>,title:"Cateogry: "+ props.group_of,max_page:1})
                    }
                  })
                break;
      case "User":getUserList(props.username,page)
                  .then((dataActiveLisiting)=>{
                    console.log(dataActiveLisiting)
                    set_jsx({list:mapping_data(dataActiveLisiting.watchlist,dataActiveLisiting.bid_list,props.isLogged),title:"Username : "+dataActiveLisiting.username,max_page:dataActiveLisiting.max_page,'balance':dataActiveLisiting.balance,'effective_balance':dataActiveLisiting.effective_balance,
                    'user_details':dataActiveLisiting.user_details
                  })})
                  .catch((err)=>{
                    if(err.response){
                      console.log(err.response.status)
                      if(err.response.status===404){
                        set_jsx({list:<div className="nothing-div">No such User</div>,title:"Username : "+ props.username,max_page:1})
                    }
                    if(err.response.status===400){
                      set_jsx({list:<div className="nothing-div">Please Login</div>,title:"",max_page:1})
                    }
                      
                    }
                    else if(err.request){
                      set_jsx({list:<div className="nothing-div">Network issue please check your network and try again</div>,title:"Username : "+ props.username+ props.username,max_page:1})
                    }
                  })
                  break;
      default:;
    }
  
    },[page]);
    const nextpage=()=>{
     if(jsx.max_page>=page+1){
     
      history.push({search:"?page="+(page+1)})
      setpage((prevpage)=>prevpage+1);
      set_jsx(prev=>{return {...prev,list:'Loading...'}})
    }
    }
    const prevpage=()=>{
    
      history.push({search:"?page="+(page-1)})
      setpage((prevpage)=>prevpage-1);
      
      set_jsx(prev=>{return {...prev,list:'Loading...'}})
    }
  return (
        <div className="card-container" >
          <div className="title-div"><h2>{jsx.title}</h2>
            <div>
            {props.type=="User"?
              <>
            
            <span style={{display:'flex',flexDirection:"column"}} className="balance"><span>Balance:${jsx.balance}</span><span> Effective Balance :${jsx.effective_balance}</span></span>
            </>:""
            }
            {jsx.max_page===1?"":<div className="page-div">{page==1?"":<button className="prev-page"onClick={prevpage}>prev</button>}
            <span>{page}/{jsx.max_page}</span>
            {page==jsx.max_page?"":<button onClick={nextpage} className="next-page">next</button>}</div>}
            </div>
          </div>
          <div>
          
          
          </div>
          {props.type=="User"&&jsx.user_details!=undefined?<div style={{marginLeft:"1.5rem"}}>
            <p>Total Lisitng: {jsx.user_details.Total_listing}</p>
            <p>Active Listing {jsx.user_details.active_listing}</p>
            <p>Lisiting Won: {jsx.user_details.won}</p>
            <p>Bidded Listing: {jsx.user_details.bidded}</p>
      
          </div>:""}
         <div className="Card-div">
          {jsx.list!==''?jsx.list.length===0?
                        (<div className="nothing-div">No List is present</div>):jsx.list:<div className="nothing-div">Loading....</div>}
          
          </div>
        </div>
    )
}

export default Lisiting_group
