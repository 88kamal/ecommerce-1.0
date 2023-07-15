import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import { ToastContainer } from 'react-toastify';
import Cart from './pages/cart/Cart';
import Order from './pages/order/Order';
import ProductInfo from './pages/productInfo/ProductInfo';
import AdminPanel from './pages/admin/AdminPanel';
import AllState from './context/allContext/allState';
import AllProducts from './pages/Allproducts';
import Privacypolicy from './pages/Privacypolicy';
import IndianHandicraft from './pages/IndianHandicraft';
import AddProduct from './pages/admin/pages/AddProduct';
import Ceramic from './pages/category/pots/Ceramic';
import Plastic from './pages/category/pots/Plastic';
import Wooden from './pages/category/pots/Wooden';
import Metal from './pages/category/pots/Metal';
import Hydroponics from './pages/category/planters/Hydroponics';
import GroBags from './pages/category/planters/GroBags';

function App() {
  // const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
  // const toggleMode = () => {
  //   if (mode === 'light') {
  //     setMode('dark');
  //     document.body.style.backgroundColor = 'rgb(15 23 42)';
  //   }
  //   else {
  //     setMode('light');
  //     document.body.style.backgroundColor = 'white';
  //   }
  // }

  return (
    <div>
      <AllState>
        <Router>
          {/* <ToastContainer/> */}
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored" />
          <Routes>
            <Route exact path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
            <Route exact path="/cart" element={<ProtectedRoutes><Cart /></ProtectedRoutes>} />
            <Route exact path="/allproducts" element={<ProtectedRoutes><AllProducts /></ProtectedRoutes>} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/order" element={<ProtectedRoutes><Order /></ProtectedRoutes>} />
            <Route exact path="/productinfo/:productid" element={<ProtectedRoutes><ProductInfo /></ProtectedRoutes>} />
            <Route exact path="/admin" element={
              // <ProtectedRoutesForAdmin>
                <AdminPanel />
              // </ProtectedRoutesForAdmin>
            } />


            {/* Product category routes  */}

            <Route exact path="/privacypolicy" element={<ProtectedRoutes><Privacypolicy /></ProtectedRoutes>} />
            <Route exact path="/indianhandicraft" element={<ProtectedRoutes><IndianHandicraft /></ProtectedRoutes>} />
            <Route exact path="/addproduct" element={<AddProduct />} />
            {/* pots  */}
            <Route exact path="/ceramic" element={<Ceramic />} />
            <Route exact path="/plastic" element={<Plastic />} />
            <Route exact path="/wooden" element={<Wooden />} />
            <Route exact path="/metal" element={<Metal />} />

            <Route exact path="/hydroponics" element={<Hydroponics />} />
            <Route exact path="/groBags" element={<GroBags />} />


          </Routes>
        </Router>
      </AllState>

    </div>
  )
}

export default App


export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem('currentUser')) {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}

// export const ProtectedRoutesForAdmin = ({ children }) => {
//   const admin = JSON.parse(localStorage.getItem('currentAdmin'))
//   console.log(admin.user.email)
//   if (admin.user.email === 'knupadhyay784@gmail.com') {
//     return children
//   }
//   else {
//     return <Navigate to='/login' />
//   }
// }

