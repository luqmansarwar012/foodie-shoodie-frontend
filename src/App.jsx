import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar.jsx"
import AdminNav from "./components/AdminNav/AdminNav.jsx"
import './index.css'
import Home from "./pages/Home/Home.jsx"
import Cart from "./pages/Cart/Cart.jsx"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx"
import Footer from "./components/Footer/Footer.jsx"
import { useContext, useState } from "react"
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from "./pages/Verify/Verify.jsx"
import MyOrders from "./pages/MyOrders/MyOrders.jsx"
import Admin from "./pages/Admin/Admin.jsx"
import { StoreContext } from "./context/StoreContext.jsx"
const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const { role } = useContext(StoreContext)

  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        {/* Role condition */}
        {role === 'admin' ? <AdminNav /> : <Navbar setShowLogin={setShowLogin} />}
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          {/* Admin Panel */}
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App