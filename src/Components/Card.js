import React from 'react'

function Card({id,title,img,description,bid}) {
    return (

        <div className="card">
            <img src={img.src} alt={img.alt}></img>
            <div className="card-content">
              <a className="card-link"href={"/active/"+id} alt={title}> {title}</a>
              <p>{description}</p>
              <span>Current Bid: {bid}</span>
            </div>
          </div>
    )
}

export default Card
