import React from 'react'
import Sidebar from './common/Sidebar'
import Footer from './common/Footer'
import { Header } from './common/Header'
import Dashboard from './components/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ViewCategories from './components/categories/ViewCategories'
import AddCategories from './components/categories/AddCategories'
import ViewEmploye from './components/employes/ViewEmploye'
import AddEmploye from './components/employes/AddEmploye'
import Order from './components/Order'
import Signup from './components/login-signup/Signup'
import Login from './components/login-signup/Login'
import ViewProduct from './components/products/ViewProduct'
import AddProduct from './components/products/AddProduct'
import Costomers from './components/Costomers'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div class="container-xxl position-relative bg-white d-flex p-0">
      <div className='content'>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path='/' element={<><Login /></>}></Route>
            <Route path='/dashboard' element={<><Sidebar /><Header /><Dashboard /></>}></Route>
            <Route path='/view-category' element={<><Sidebar /><Header /><ViewCategories /></>}></Route>
            <Route path='/add-category' element={<><Sidebar /><Header /><AddCategories /></>}></Route>
            <Route path='/view-employe' element={<><Sidebar /><Header /><ViewEmploye /></>}></Route>
            <Route path='/add-employe' element={<><Sidebar /><Header /><AddEmploye /></>}></Route>
            <Route path='/view-product' element={<><Sidebar /><Header /><ViewProduct /></>}></Route>
            <Route path='/add-product' element={<><Sidebar /><Header /><AddProduct /></>}></Route>
            <Route path='/order' element={<><Sidebar /><Header /><Order /></>}></Route>
            <Route path='/costomer' element={<><Sidebar /><Header /><Costomers /></>}></Route>
            {/* <Route path='/signup' element={<><Signup /></>}></Route> */}
          </Routes>
        </BrowserRouter>
      </div></div>
  )
}

export default App