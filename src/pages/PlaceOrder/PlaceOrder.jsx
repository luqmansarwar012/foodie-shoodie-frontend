import { useContext, useState, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
    const { getTotalCartAmount, token, cartItems, food_list, url } = useContext(StoreContext)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""

    })
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (e) => {
        e.preventDefault()
        let orderItems = []
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id]
                orderItems.push(itemInfo)
            }
        })
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 10
        }
        try {
            const response = await axios.post(url + '/api/order/place', orderData, { headers: { token } });
            console.log('Response from backend:', response.data);
            if (response.data.success) {
                const { session_url } = response.data;
                console.log('Redirecting to Stripe Checkout:', session_url);
                window.location.replace(session_url);
            } else {
                toast.error('Error placing order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Error placing order');
        }
    }
    const navigate = useNavigate()
    useEffect(() => {
        if (!token) {
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])
    return (
        <form className='place-order' onSubmit={placeOrder}>
            <div className="place-order-left">
                <p className="title">
                    Delivery Information

                </p>
                <div className="multi-fields">
                    <input required type="text" placeholder='First Name' name='firstName' onChange={onChangeHandler} value={data.firstName} />
                    <input required type="text" placeholder='Last Name' name='lastName' onChange={onChangeHandler} value={data.lastName} />
                </div>
                <input required type="email" placeholder='Email' name='email' onChange={onChangeHandler} value={data.email} />
                <input required type="text" placeholder='Street' name='street' onChange={onChangeHandler} value={data.street} />
                <div className="multi-fields">
                    <input required type="text" placeholder='City' name='city' onChange={onChangeHandler} value={data.city} />
                    <input required type="text" placeholder='State' name='state' onChange={onChangeHandler} value={data.state} />
                </div>
                <div className="multi-fields">
                    <input required type="text" placeholder='Zip Code' name='zipcode' onChange={onChangeHandler} value={data.zipcode} />
                    <input required type="text" placeholder='Country' name='country' onChange={onChangeHandler} value={data.country} />
                </div>
                <input required type="text" placeholder='Phone' name='phone' onChange={onChangeHandler} value={data.phone} />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>$ {getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delievery Fee</p>
                            <p>$ {getTotalCartAmount() > 0 ? 10 : 0}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Total</p>
                            <p>$ {getTotalCartAmount() > 0 ? getTotalCartAmount() + 10 : 0}</p>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
