import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const navigate = useNavigate();
    
    const [state,newState] = useState({
        fname:"",
        lname:"",
        mail:"",
        phno:"",
        pword:""
    });
    useEffect(()=>{
      const auth = localStorage.getItem('user');
      if(auth)
         navigate("/");
       
     })
    //  navigate = useNavigate();
    const inputEvent = (event)=>{
        let value = event.target.value;
        let name = event.target.name;
     newState((prevData)=>{
       return {...prevData,[name]:value}; 
     })
    }
    const Submit = async ()=>{
        console.log(state);
        let result = await fetch("http://localhost:5000/register",{
          method:"post",
          body:JSON.stringify(state),
          headers:{
            'Content-Type':"application/json"
          }
        })
        result = await result.json();
        localStorage.setItem("user",JSON.stringify(result.data));
        localStorage.setItem("token",JSON.stringify(result.auth))
        console.warn(result);
        if(result)
          navigate("/");
    }
  return (
    <div className='register'>
      <h1>Register</h1>
      <input type="text" name='fname'   className='fields' value={state.fname} onChange={inputEvent} placeholder='Enter First Name' />
      <input type="text"  name='lname'  className='fields' value={state.lname} onChange={inputEvent} placeholder='Enter Last Name' />
      <input type="email"  name='mail'  className='fields' value={state.mail} onChange={inputEvent} placeholder='Enter your mail' />
      <input type="number" name='phno'   className='fields' value={state.phno} onChange={inputEvent} placeholder='Enter your Mobile Number' />
      <input type="password" name='pword'   className='fields' value={state.pword} onChange={inputEvent} placeholder='Enter your password' />
      <button type='button' onClick={Submit} className='btn'>Sign Up</button>
    </div>
  )
}

export default SignUp;
