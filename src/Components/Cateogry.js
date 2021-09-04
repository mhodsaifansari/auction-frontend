import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Cateogry({match}) {
    const[list_c,setList]=useState('');
    useEffect(
        ()=>{
            axios.get("http://mhodsaifansari.pythonanywhere.com/api/cateogry")
            .then((response)=>{console.log(response.data);
                let jsx_list=response.data.map((d)=>{return (<li><a href={match.url+"/"+d.text} className="group-link">{d.text}</a></li>)})
                setList(jsx_list);
            })
            .catch((err)=>{console.log(err);})
        },[])
    return (
        <div>
            <ul>
            {list_c===''?"Loading":list_c}
            </ul>
        </div>
    )
}

export default Cateogry