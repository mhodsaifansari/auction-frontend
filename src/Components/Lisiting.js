import React from 'react'
import {useState,useEffect} from 'react'
import authAxios from '../Hook.js/authenicationHook';
import getLisitingData from '../Hook.js/getLisitingData';
import baseurl from '../Hook.js/url';
import BidData from './BidData';
import wss_url from '../Hook.js/web_socket_url';
function Lisiting({isLogged,value,setLogged}) {
    console.log(value);
    const [data,setData]=useState({id:'',title:'loading...',image:{src:process.env.PUBLIC_URL+'/placeholder.gif',alt:''},bid:'loading...',description:'loading...',owner:'loading...',status:false,belongs_to:null,comment:'',watchlist:false,close_permit:undefined,date:'loading...'});
    const [socket,setSocket]=useState(null);
   
    useEffect(() => {
        
        getLisitingData(value)
        .then((data)=>{
            
            
            console.log(data);
            setData((prev)=>{
                
                if(isLogged!=true){
                return{id:value,title:data.listing.title,
                    image:{src:data.listing.image,alt:data.listing.title},
                    bid:data.bid_data,
                    description:data.listing.description,
                    owner:data.listing.owner.username,
                    comment:data.comments,
                    status:data.listing.status,
                    belongs_to:data.listing.belongs_to,
                    watchlist:data.is_in_watchlist,
                    close_permit:data.close_permit,
                    date:new Date(data.listing.created_on).toLocaleDateString()
                }}
                else
                {
                    return{id:value,title:data.listing.title,
                        image:{src:data.listing.image,alt:data.listing.title},
                        bid:data.bid_data,
                        description:data.listing.description,
                        owner:data.listing.owner.username,
                        comment:data.comments,
                        status:data.listing.status,
                        belongs_to:data.listing.belongs_to,
                        watchlist:data.is_in_watchlist,
                        close_permit:data.close_permit,
                        date:new Date(data.listing.created_on).toLocaleDateString(),
                        balance:data.balance,
                        effective_balance:data.effective_balance
                    }
                }
            }
                
                );
            
        
        })
        .catch((err)=>{console.log(err);
        if(err.request.status===401){
            localStorage.removeItem('user');
            setLogged(false)
        }
        
        
        });
        const newSocket= new WebSocket(wss_url+"/ws/bid/"+value);
        setSocket(newSocket);
        return ()=>{newSocket.close()}
    },[setSocket])
    if(socket!=null)
    {
        socket.onmessage=(data)=>{
            console.log(data.data);
            const data_socket=JSON.parse(data.data);
            if("bid" in data_socket){
                setData((prev)=>{return {...prev,bid:data_socket.bid}})
            
            }
            if("comment" in data_socket){

                setData((prev)=>{return {...prev,comment:[data_socket.comment,...prev.comment]}})
                
            }
        }
    }
    const [Comment,setComment]=useState('');
    const [Bid,setBid]=useState();
    const bidHandler=(e)=>{
        setBid(e.target.value);
    }
    const commentButton=(e)=>{
        e.target.innerText="Loading..."
        authAxios.post(baseurl+"/api/comment/"+value,{'comment_text':Comment})
        .then((data)=>{console.log(data)
            e.target.innerText="post"
           
        
        })
        .catch((err)=>{console.log(err);})    

    }
    const bidButton=(e)=>{
        e.target.innerText="Loading.."
        authAxios.post(baseurl+"/api/bid/"+value,{'bid':Bid})
        .then((data)=>{console.log(data)
            e.target.innerText="Bid";
            getLisitingData(value)
            .then((data)=>{
                console.log(data);
                
            
            })
            .catch((err)=>{
                console.log(err)
            })
        
        })
        .catch((err)=>{console.log(err.request.status);
            if(err.request.status=='403')
            {
                console.log("Bid is closed")
            }
            if(err.request.status=='406')
            {
                if(err.response.data==="Bid need to be greater then intial bid")
                {
                e.target.innerText="Bid is small"
                }
                else{
                e.target.innerText='Not Enough Balance'
                }
            }
        
        })    
    }
    const commentHandler=(e)=>{
        setComment(e.target.value);
    }
    const addWatchlist=(e)=>{
        e.target.innerText="Loading..."
        authAxios.post(baseurl+"/api/set_watchlist/"+value)
        .then((Response)=>{if(data.watchlist===false){
            setData(prevState=>({...prevState , watchlist:true}))
                    
        }
                    else
                    {
                        setData(prevState=>({...prevState , watchlist:false}))
                    }
        })
        .catch((err)=>{console.log(err);})
    }
    const closeBid=(e)=>{
        e.target.innerText="Loading..."
        authAxios.post(baseurl+"/api/close/"+value)
        .then((Response)=>{
            setData(prevState=>({...prevState,close_permit:false,status:false}))
        })
        .catch((err)=>{
           console.log(err);
        })

    }
    console.log(data);
    const {title,image,bid,description,owner,comment,belongs_to,watchlist,close_permit,status}=data;

       
    return (
        <div className="listing-parent">
            <div className="listing">
                
            <div className="content-div">    
            <img src={image.src} alt={image.alt} ></img>
            <div className="content-details">
            <div >
                    <div className="content-title"><h2>Title : {title}</h2> {isLogged===true?
                    watchlist!==undefined?
                        watchlist===false?
                        <button className="watchlist-btn watchlist-add"onClick={addWatchlist}>Add To Watchlist</button>:
                        <button className="watchlist-remove" onClick={addWatchlist}>Remove from watchlist</button>
                    :""
            :""}</div>
                    <div>
                    <p className="belong_to">owner: <a href={"../user/"+owner} className="group-link">{owner}</a></p></div>
            </div>
            {/* {isLogged==true?<div><span>Balance {data.balance}</span> <span>Effective Balance {data.effective_balance}</span></div>:""} */}
           
            
            <p className="group">Cateogry : {belongs_to==null?"No Cateogry":<a href={'../cateogry/'+belongs_to.text} className="group-link">{belongs_to.text}</a>}</p>
            <p>Created On: {data.date}</p>
            <div className="detail">Description : <pre>{description}</pre></div>
            <span className="current-bid">Current Bid : ${bid}</span> 
            
            
            {isLogged===true?status==true?
            
            <BidData id={data.id} value={Bid} handler={bidHandler} button_click={bidButton} setData={setData} effective_balance={data.effective_balance} socket={socket}></BidData>
            :"":""}
            {isLogged===true?
                    close_permit!==undefined?
                        close_permit===true?
                        status===true?
                        <button onClick={closeBid} className="close-btn close-bid">Close the bid</button>:(<p>Bid is Closed</p>):
                        ""
                    :""
            :""}
        
            </div>
            </div>
            
            
            </div>
            <div className="comment-section">
            
                <hr></hr>
                {isLogged===true?<div>
                <h4 className="comment-h5">{comment.length} Comment</h4>
                <div className="comment-input-div"><textarea className="comment-textarea"value={Comment} onChange={commentHandler} rows="1"></textarea>
                <button onClick={commentButton} className="comment-btn post-comment">post</button></div>
            </div>:""}
                {comment===''?<h4>Loading...</h4>:comment.length===0?<h4>No comment</h4>:
                
                comment.map((c)=>{
            return(<>
            <div className="comment-div">
                <h5>{c.comment_by.username}</h5>
                <pre>{c.text}</pre>            
            </div></>)})}
            </div>
        </div>
    )
}

export default Lisiting
