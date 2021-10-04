import React,{useEffect,useState} from 'react'
function BidData({id,value,handler,button_click,setData,effective_balance,socket}) {
    // const [socket,setSocket]=useState(null);
    const [bid,setBid]=useState(null);
    
    
    useEffect(()=>{
        // const websocket=new WebSocket("ws://127.0.0.1:8000/ws/bid/"+id);
        // setSocket(websocket);
        
        // return ()=>{websocket.close()}
    },[])
    // if(socket!=null){
    // socket.onmessage=(data)=>{
    //     console.log(data);
    //     const bid_data=JSON.parse(data.data)['bid'];
    //     setData((prev)=>{return {...prev,bid:bid_data}})
    // }}
    return (
        <div>
        
            <span className="bid-input">
                <div>Bid : <input type='number' value={value} onChange={handler} min="0"></input><button onClick={(e)=>{
                    e.target.innerText="Loading..."
                    if(/^\d+$/.test(value)===true)
                    {
                        if(value>0)
                        {   
                            button_click(e); 

                        }
                        else{
                            e.target.innerText="Bid cannot be negative"
                        }
                    }
                    else{
                        e.target.innerText="Invalid Input"
                    }
                    }} className="bid">place it</button></div>
                <p>Maximum you can bid : ${effective_balance}</p>
            </span>
        </div>
    )
}

export default BidData
