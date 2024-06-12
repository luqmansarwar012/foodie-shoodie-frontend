import './Admin.css'
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Add from "../Add/Add.jsx";
import { Routes, Route } from "react-router-dom";
import Orders from "../Orders/Orders.jsx";
import List from "../List/List.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext.jsx';

const Admin = () => {
    const { url } = useContext(StoreContext)
    return (
        <div>
            <div className="app-content">
                <Sidebar />
                <Routes>
                    <Route path='/add' element={<Add url={url} />} />
                    <Route path='/list' element={<List url={url} />} />
                    <Route path='/orders' element={<Orders url={url} />} />
                </Routes>
            </div>
        </div>
    );
};

export default Admin;
