import React from 'react'

function Card({id,title,img,description,bid,date}) {

  return (

        <div className="card">
            <img src={img.src} alt={img.alt}></img>
            <div className="card-content">
              <a className="card-link"href={"/active/"+id} alt={title}> {title}</a>
              <p style={{"word-break":"break-all",textOverflow:"ellipsis", whiteSpace:"nowrap",overflow:"hidden"}}>{description}</p>
              <p>Created On {date}</p>
              <span className="current-bid">Current Bid: {bid}</span>
            </div>
          </div>
    )
}

export default Card
