import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const ProductList = () => {
    let[products,setProducts] = useState([]);
    // let[key , setKey] = useState("");
    useEffect(()=>{
    getItem();
    },[])

    const getItem = async ()=>{
        let result = await fetch('http://localhost:5000/products',{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        }
        )

        result = await result.json(); 
        setProducts(result);     
    } 
    const deleteEvent= async(id)=>{
      console.log(id);
      let result = await fetch(`http://localhost:5000/delete/${id}`,{
        method:'Delete',
        headers:{
          authorization:`bearer  ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      result = await result.json();
      if(result)
        getItem();
        // alert('Record Deleted');
    }
    const searchEvent = async(e)=>{
      // await setKey(e.target.value);
      let result;
      let key = e.target.value;
      if(key){
       result = await fetch(`http://localhost:5000/search/${key}`,{
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
       }) 
      result = await result.json();
      }
      else
      getItem();

      if(result)
      setProducts(result); 
    }
    
  return (
    <div className='center'>
      <h1>List of products</h1>
      <input type="text"  onChange={(e)=>searchEvent(e)} className='fields' placeholder='Search Product'/>
      <ul className='heading'>
        <li>SNo.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      
        {products.length>0?
          products.map((item,index)=>{
            return(<>
                <ul className='data' key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>₹ {item.price}</li>
                <li>{item.category}</li>
                <li>{item.company}</li>
                <li><button className='btn-1' onClick={()=>{
                  deleteEvent(item._id);
                }}>Delete</button>
                  <button><Link to={`/update/${item._id}`}>Update</Link></button>
                </li>
                
                </ul>
            </>)
        }):<h1>No Result Found</h1>
        }
      
    </div>
  )
}

export default ProductList;
