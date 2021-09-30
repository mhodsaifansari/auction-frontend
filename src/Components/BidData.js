import React,{useEffect,useState} from 'react'
function BidData({id,value,handler,button_click,setData}) {
    const [socket,setSocket]=useState(null);
    const [bid,setBid]=useState(null);
    
    
    useEffect(()=>{
        const websocket=new WebSocket("ws://127.0.0.1:8000/ws/bid/"+id);
        setSocket(websocket);
        
        return ()=>{websocket.close()}
    },[setSocket])
    if(socket!=null){
    socket.onmessage=(data)=>{
        console.log(data);
        const bid_data=JSON.parse(data.data)['bid'];
        setData((prev)=>{return {...prev,bid:bid_data}})
    }}
    return (
        <div>
        
            <span className="bid-input">
                <input type='number' value={value} onChange={handler}></input><button onClick={(e)=>{button_click(e);  }} className="bid">Bid</button>
            </span>
        </div>
    )
}

export default BidData
