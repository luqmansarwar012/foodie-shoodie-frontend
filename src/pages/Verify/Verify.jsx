/* eslint-disable no-unused-vars */
import { useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Verify.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
const Verify = () => {
    const { url } = useContext(StoreContext)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const navigate = useNavigate()
    const verifyPayment = async () => {
        const response = await axios.post(url + '/api/order/verify', { success, orderId })
        console.log(response)
        if (response.data.success) {
            toast.success(response.data.message)
            navigate('/myorders')
        }
        else {
            toast.error(response.data.message)
            navigate('/')
        }
    }
    useEffect(() => {
        verifyPayment()
    }, [])
    return (
        <div className='verify'>
            <div className="spinner"></div>

        </div>
    )
}

export default Verify
