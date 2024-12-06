// import { Category } from '@material-ui/icons';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
    const navigate = useNavigate();
    const[state,newState] = useState({
        name:"",
        price:"",
        category:"",
        company:""
    });
    const[error,newError] = useState(false);
    const inputEvent = (event)=>{
        let name = event.target.name;
        let value = event.target.value;
        newState((prevVal)=>{
            return {...prevVal,[name]:value};
        })
    }
    const Submit = async()=>{
        // console.log(state);

        if(!state.name && !state.price && !state.category && !state.company)
        {
            newError(true);
            return false;
            
        }
        



        const userId = (JSON.parse(localStorage.getItem('user')))._id;
        console.warn(userId)
        // console.warn(userId._id);
        let result = await fetch('http://localhost:5000/add-product',{
            method:"post",
            body:JSON.stringify({...state,userId}),
            headers:{
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
            
        })
        result = await result.json();
        if(result)
            navigate('/');
        else alert('enter correct credentials')     

    }
  return (
    <div className='products'>
    <h1>Add Products</h1>
      <input type="text" className='fields'  name='name' value={state.name} onChange={inputEvent} placeholder='Enter product name' />
      {error && !state.name && <span className='error' >Enter valid name</span>}
      <input type="text" className='fields'  name='price' value={state.price} onChange={inputEvent} placeholder='Enter product price' />
      {error && !state.price && <span className='error' >Enter valid price</span>}
      <input type="text" className='fields'  name='category' value={state.category} onChange={inputEvent} placeholder='Enter product category' />
      {error && !state.category && <span className='error' >Enter valid category</span>}
      <input type="text" className='fields'  name='company' value={state.company} onChange={inputEvent} placeholder='Enter product company' />
      {error && !state.company && <span className='error' >Enter valid company</span>}
      <button className='btn' onClick={Submit}>Add Product</button>
    </div>
  )
}

export default AddProduct;
