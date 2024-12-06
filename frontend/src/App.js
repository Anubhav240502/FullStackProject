import React from 'react'
import { Routes,Route } from "react-router-dom";
import './App.css'
import Nav from './Component/Nav';
import Footer from './Component/Footer';
import SignUp from './Component/SignUp';
import PrivateComponent from './Component/PrivateComponent';
import Login from './Component/Login';
import AddProduct from './Component/AddProduct';
import ProductList from './Component/Products';
import Update from './Component/Update';
function App() {
  return (
    <div className="App">
    <Nav/>
      <Routes>

      <Route element={<PrivateComponent/>} >
        <Route path='/' element={<ProductList/>} />
        <Route path='/add' element={<AddProduct/>} />
        <Route path='/update/:id' element={<Update/>} />
        <Route path='/logout' element={<h1>Logout Component</h1>} />
        <Route path='/profile' element={<h1>Profile Component</h1>} />
      </Route>

        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login/>}   />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
