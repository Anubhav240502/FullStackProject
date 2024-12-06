
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  useEffect(()=>{
    const auth = localStorage.getItem("user");
    if(auth){
      navigate('/');
    }
  })
   const[state,newState] = useState({
    mail:"",
    pword:""
   });
   const navigate = useNavigate();
   const inputEvent = (event)=>{
    let name = event.target.name;
    let value = event.target.value;
    newState((prevVal)=>{
        return {...prevVal,[name]:value};
    })
   }
   const Submit = async ()=>{
    console.log(state);
    let result = await fetch('http://localhost:5000/login',{
      method:"post",
      body:JSON.stringify(state),
      headers:{"Content-Type":"application/json"}

    });
    result = await result.json();
    if(result.auth){
      localStorage.setItem('user',JSON.stringify(result.data));
      localStorage.setItem('token',JSON.stringify(result.auth));
      navigate('/')
    }
    else alert("Enter correct details");
    console.warn(result);
   }
  return (
    <div className='login'>
      <input type="email" className='fields' name="mail" value={state.mail} onChange={inputEvent} placeholder='Enter your Email' />
      <input type="password" className='fields' name="pword"  value={state.pword} onChange={inputEvent} placeholder='Enter Password' />
      <button className='btn' onClick={Submit} >Login</button>
    </div> 
  )
}

export default Login;
