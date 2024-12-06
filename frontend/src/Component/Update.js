import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useParams} from 'react-router-dom'
const Update = () => {
    let navigate = useNavigate();
    const [state,updateState] = useState({
        name:"",
        price:"",
        category:"",
        company:""
    });
    const params=  useParams().id;
    useEffect(()=>{
        console.warn(params);
      getItem();  
    },[])
    const updateEvent = (event)=>{
        let name = event.target.name;
        let value = event.target.value;
        updateState((prev)=>{
            return {...prev , [name]:value};
        })

    }
    const getItem = async()=>{
        let result = await fetch(`https://full-stack-project-seven-ashy.vercel.app/update/${params}`,{
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
        })
        result = await result.json();
        console.warn(result);
        // result = JSON.parse(result);
        updateState({
        name :result.name,
        price : result.price,
        category : result.category,
        company : result.company
        })
    }
    const Submit = async()=>{
    let result = await fetch(`https://full-stack-project-seven-ashy.vercel.app/update-product/${params}`,{
        method:'put',
        body: JSON.stringify(state),
        headers:{
            'Content-Type':'application/json',
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    })
    result  = await result.json();
    if(result){
        navigate('/')

    }
    }
  return (
    <div className='products'>
    <h1>Update Products</h1>
    <input type="text" className='fields' name="name" value={state.name} onChange={updateEvent}  placeholder='Update name'/>
    <input type="text" className='fields' name="price" value={state.price} onChange={updateEvent} placeholder='Update price' />
    <input type="text" className='fields' name="category" value={state.category} onChange={updateEvent} placeholder='Update category' />
    <input type="text" className='fields' name="company" value={state.company} onChange={updateEvent}  placeholder='Update company'/>
    <button className='btn' onClick={Submit} >Update Product</button>
      
    </div>
  )
}

export default Update;
