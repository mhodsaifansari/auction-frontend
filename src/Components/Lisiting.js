import React from 'react'
import {useState,useEffect} from 'react'
import authAxios from '../Hook.js/authenicationHook';
import getLisitingData from '../Hook.js/getLisitingData';
function Lisiting({isLogged,value}) {
    console.log(value);
    const [data,setData]=useState({id:'',title:'',image:{src:'',alt:''},bid:'',description:'',owner:'',status:false,belongs_to:null,comment:[],watchlist:false,close_permit:undefined});
    //const[state_of_data,set_state_of_data]=useState(false);
    
    useEffect(() => {
        
    
        getLisitingData(value)
        .then((data)=>{
            
            
            console.log(data);
            setData({id:value,title:data.listing.title,
                    image:{src:data.listing.image,alt:data.listing.title},
                    bid:data.bid_data,
                    description:data.listing.description,
                    owner:data.listing.owner.username,
                    comment:data.comments,
                    status:data.listing.status,
                    belongs_to:data.listing.belongs_to,
                    watchlist:data.is_in_watchlist,
                    close_permit:data.close_permit
                });
            
        
        })
        .catch((err)=>{console.log(err);})
    },[])
    const [Comment,setComment]=useState('');
    const [Bid,setBid]=useState();
    const bidHandler=(e)=>{
        setBid(e.target.value);
    }
    const commentButton=(e)=>{
        authAxios.post("https://mhodsaifansari.pythonanywhere.com/api/comment/"+value,{'comment_text':Comment})
        .then((data)=>{console.log(data)
            getLisitingData(value)
            .then((data)=>{
                console.log(data);
                setData({id:value,title:data.listing.title,
                        image:{src:data.listing.image,alt:data.listing.title},
                        bid:data.bid_data,
                        description:data.listing.description,
                        owner:data.listing.owner.username,
                        status:data.listing.status,
                        comment:data.comments,
                        belongs_to:data.listing.belongs_to,
                        watchlist:data.is_in_watchlist,
                        close_permit:data.close_permit
                        });
            
            })
            .catch((err)=>{console.log(err);})
        
        })
        .catch((err)=>{console.log(err);})    

    }
    const bidButton=(e)=>{
        authAxios.post("https://mhodsaifansari.pythonanywhere.com/api/bid/"+value,{'bid':Bid})
        .then((data)=>{console.log(data)
            getLisitingData(value)
            .then((data)=>{
                console.log(data);
                setData({id:value,title:data.listing.title,
                        image:{src:data.listing.image,alt:data.listing.title},
                        bid:data.bid_data,
                        description:data.listing.description,
                        owner:data.listing.owner.username,
                        status:data.listing.status,
                        comment:data.comments,
                        belongs_to:data.listing.belongs_to,
                        watchlist:data.is_in_watchlist,
                        close_permit:data.close_permit
                        });
            
            })
            .catch((err)=>{
                console.log(err)
            })
        
        })
        .catch((err)=>{console.log(err.request.status);
            if(err.request.status=='403')
            {
                console.log("Bid is closed")
            }})    
    }
    const commentHandler=(e)=>{
        setComment(e.target.value);
    }
    const addWatchlist=(e)=>{
        
        authAxios.post("https://mhodsaifansari.pythonanywhere.com/api/set_watchlist/"+value)
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
        authAxios.post("https://mhodsaifansari.pythonanywhere.com/api/close/"+value)
        .then((Response)=>{
            setData(prevState=>({...prevState,close_permit:false,status:false}))
        })
        .catch((err)=>{
           console.log(err);
        })

    }
    const {title,image,bid,description,owner,comment,belongs_to,watchlist,close_permit,status}=data;
    
    const comment_jsx=comment.map((c)=>{return(<>
        <div className="comment-div">
            <h5>{c.comment_by}</h5>
            <pre>{c.text}</pre>
            
            
        </div></>)})
        console.log(watchlist)
    return (
        <div className="listing-parent">
            <div className="listing">
                <div className="title-div">
                    <h2>{title}</h2>
                    <p className="belong_to">by {owner}</p>
                </div>
            <div className="content-div">    
            <img src={image.src} alt={image.alt} ></img>
            <div>
            
            <span className="current-bid">Current Bid : ${bid}</span>
            {isLogged===true?
                    watchlist!==undefined?
                        watchlist===false?
                        <button className="watchlist-btn watchlist-add"onClick={addWatchlist}>Add To Watchlist</button>:
                        <button className="watchlist-remove" onClick={addWatchlist}>Remove from watchlist</button>
                    :""
            :""}
            <p className="group">{belongs_to==null?"No Cateogry":belongs_to}</p>
            <pre className="detail">{description}</pre>
            {isLogged===true?
                    close_permit!==undefined?
                        close_permit===true?
                        status===true?
                        <button onClick={closeBid} className="close-btn close-bid">Close the bid</button>:(<p>Bid is Closed</p>):
                        ""
                    :""
            :""}
            
        
            {isLogged===true?status==true?
            <span className="bid-input">
                <input type='number' value={Bid} onChange={bidHandler}></input><button onClick={bidButton} className="bid">Bid</button>
            </span>:"":""}
            </div>
            </div>
            
            
            </div>
            <div className="comment-section">
            <h4>Comments</h4>
                <hr></hr>
                {isLogged===true?<div>
                <h5 className="comment-h5">Comment</h5>
                <textarea className="comment-textarea"value={Comment} onChange={commentHandler}></textarea>
                <button onClick={commentButton} className="comment-btn post-comment">post</button>
            </div>:""}
                {comment_jsx===[]?<h3>No comments</h3>:comment_jsx}
            </div>
        </div>
    )
}

export default Lisiting
