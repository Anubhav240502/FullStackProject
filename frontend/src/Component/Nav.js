import React from "react"
import { NavLink , useNavigate } from "react-router-dom";
const Nav = ()=>{
    const navigate = useNavigate();
    const auth = localStorage.getItem('user');
    const logout = ()=>{
        console.log("logout")
        localStorage.clear();
        navigate("/signup");

    }
    return(<>
        
       {auth?<div className="Nav_div">
        <div className="image"><img className="logo" src="https://yt3.googleusercontent.com/ytc/AIdro_lpwLOOTumlQiiMYMHbBgJfQXVyRBGrZdTZ6NbtY-YA8wg=s900-c-k-c0x00ffffff-no-rj" alt="logo" /></div>
       <NavLink   className="Nav-link" to="/">Products</NavLink>
       <NavLink   className={"Nav-link"} to="/add">Add Product</NavLink>
       <NavLink  className={"Nav-link"} to="/update">Update Product</NavLink>
       <NavLink  className={"Nav-link"} to="/profile">Profile</NavLink>
       <NavLink   className={"Nav-link"} to="/signup" onClick={logout} >Logout({JSON.parse(auth).fname+" "+JSON.parse(auth).lname})</NavLink></div>:<div className="nav-right">
       <div className="image"><img className="logo" src="https://yt3.googleusercontent.com/ytc/AIdro_lpwLOOTumlQiiMYMHbBgJfQXVyRBGrZdTZ6NbtY-YA8wg=s900-c-k-c0x00ffffff-no-rj" alt="logo" /></div>
       <div className="logout">
       <NavLink   className={"Nav-link"} to="/signup" >SignUp</NavLink>
       <NavLink className={"Nav-link "} to='/login'>Login</NavLink>
       </div>
       </div>}
       
       
       
    
    </>);
}

export default Nav;