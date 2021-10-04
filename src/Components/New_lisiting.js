import axios from 'axios';
import React, { useEffect, useState } from 'react'
import authAxios from '../Hook.js/authenicationHook';
import baseurl from '../Hook.js/url';
function New_lisiting() {
    const[category,setcategory]=useState([]);    
    const[from,setform]=useState({'title':'','description':'','bid':'','image':'','group':'None'});
    const[err,setErr]=useState({'title':'','description':'','bid':''});
    const[success,setsuccess]=useState('');
    useEffect(()=>{
        axios.get(baseurl+'/api/cateogry')
        .then((data)=>{
            console.log(data.data)

            setcategory(data.data.map((d)=>{return <option value={d.id}>{d.text}</option>
        }))})
        .catch((err)=>{console.log(err)});
    },[]);

    const inputHandler=(e,attr)=>{
        setform(prevState=>{ 
                                let d= {...prevState};
                                d[attr]=e.target.value;
                                return d;
                            })
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        
       console.log(from);
       if(from.title!=''&&from.description!=""&&from.bid!='')
       {setsuccess(<div>Loading......</div>)
        authAxios.post(baseurl+"/api/create_list",from)
        .then((response)=>{
            setsuccess(<div className="success-create-listing">Listing has been created successfully</div>)
        })
        .catch((err)=>{
            if(err.request.status===400)
            {
                console.log("Invalid input")
                setsuccess('Error with input try again');
            }
        })
       }
       else
       {
        if(from.title=='')
        {
            setErr(prevState=>({...prevState,title:"Cannot leave Name Field Empty"}));
        }
        if(from.description=='')
        {
            setErr(prevState=>({...prevState,description:"Cannot leave Description Field Empty"}));
        }
        if(from.bid=='')
        {
            setErr(prevState=>({...prevState,bid:"Cannot leave Bid Field Empty"}));
        }
       }
        
    }
    return (
        <div className="new-listing-form">
            <h3>Create a New Lisiting</h3>
            <div className="listing-success nothing-div">{success}</div>
            <form>
                <div>
                    <label for="title">Name :</label>
                    <input id="title" type="text" onChange={(e)=>{inputHandler(e,'title');}} required></input>
                    {err.title!=''?(<div>{err.title}</div>):""}
                </div>
                <div>
                    <label for="description">Description of Label: </label>
                    <textarea id="description" cols="4" rows="5"onChange={(e)=>{inputHandler(e,'description');}} required></textarea>
                    {err.description!=''?(<div>{err.description}</div>):""}
                </div>
                <div>
                    <label for="bid">Inital Bid</label>
                    <input type="number" id="bid" onChange={(e)=>{inputHandler(e,'bid');}} required></input>
                    {err.bid!=''?(<div>{err.bid}</div>):""}
                </div>
                <div>
                <label for="image">Image of Lisiting</label>
                <input type="text" onChange={(e)=>{inputHandler(e,'image');}}></input>
                </div>
                <div>
                    <label for="category">Cateogry</label>
                    <select id="category" placeholder="No Category" onChange={(e)=>{inputHandler(e,'group');}}>
                        <option value="None">No Cateogry</option>
                        {category}
                    </select>
                </div>
               
                <input className="submit-active-lisitng"type="submit" value="Submit" onClick={submitHandler}></input>
            </form>
        </div>
    )
}

export default New_lisiting
