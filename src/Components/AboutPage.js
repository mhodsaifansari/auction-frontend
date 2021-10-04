import React from 'react'

function AboutPage() {
    return (
        <div style={{marginLeft:"1.5rem",marginRight:"0.5rem"}} >
            <h2 >Auctions</h2>
            <p>This is a website that use React at FrontEnd and Django at backend with Django Rest Framework for restful structure and Channels for WebSocket(For realtime update of bid and comments)
            </p>
            <p>You can register yourself and start posting new listing. Other users will bid accordingly. When owner of a bid is satisfied with bid, they can close the listing and user with highest bid will be winner</p>
            <p>You can also commnet on the listing, All listing are categoried accordingly, if listing cateogry doesn't exist then you can leave the category empty</p>
            <p>This site a is developed and maintained by Mohd Saif Ansari</p>
            <p>V2.0 </p>

            <ul>
                <li>Realtime update of Bid and Commnets</li>
                <li>user has balance and cannot bid more then effective balance</li>
                <li>Bug Fixed</li>
            </ul>
            
            
        </div>
    )
}

export default AboutPage
