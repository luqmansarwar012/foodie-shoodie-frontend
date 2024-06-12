/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken, setRole } = useContext(StoreContext)
    const [currentState, setCurrentState] = useState('Login')
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value

        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()
        let newUrl = url;
        if (currentState === 'Login') {
            newUrl += '/api/user/login'
        }
        else {
            newUrl += '/api/user/register'
        }

        const response = await axios.post(newUrl, data)

        if (response.data.success) {
            setToken(response.data.token)
            setRole(response.data.role)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('role', response.data.role)
            setShowLogin(false)
            if (response.data.role === 'admin') {
                navigate('/admin/add')
            }
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
        }
    }
    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentState === 'Login' ? <></> : <input type="text" name="name" id="" placeholder='Your name' onChange={onChangeHandler} value={data.name} required />}
                    <input type="email" name="email"
                        placeholder='Your email'
                        onChange={onChangeHandler} value={data.email} required />
                    <input type="password"
                        placeholder='Password' name="password" onChange={onChangeHandler} value={data.password} required />
                </div>
                <button type='submit'>{currentState === 'Sign Up' ? 'Create account' : 'Login'}</button>
                {
                    currentState === 'Sign Up' && <div className="login-popup-condition">
                        <input type="checkbox" name="condition" id="" required />
                        <p>By continuing, I agree to the terms of use & privacy policy.</p>
                    </div>
                }
                {
                    currentState === 'Login' ? <p>Create a new account? <span onClick={() => setCurrentState('Sign Up')}>Click here</span></p> : <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup