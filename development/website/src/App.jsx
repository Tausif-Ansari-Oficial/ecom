import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from "./common/Header";
import Footer from "./common/Footer";
import { Slider } from "./common/Slider";
import Products from "./components/Products";
import Index from "./components/Index";
import { Cart } from "./components/Cart";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Order } from "./components/Order";
import { Profile } from "./components/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<><Header Comp={"_"} /><Login /><Footer /></>} />
          <Route path='/signup' element={<><Header Comp={"_"} /><Signup /><Footer /></>} />
          <Route path='/index' element={<><Header Comp={Slider} /><Index /><Footer /></>} />
          <Route path='/products' element={<><Header Comp={"_"} /><Products /><Footer /></>} />
          <Route path='/cart' element={<><Header Comp={"_"} /><Cart /><Footer /></>} />
          <Route path='/order' element={<><Header Comp={"_"} /><Order /><Footer /></>} />
          <Route path='/profile' element={<><Header Comp={"_"} /><Profile /><Footer /></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
