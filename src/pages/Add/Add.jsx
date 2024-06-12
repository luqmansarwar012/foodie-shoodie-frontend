/* eslint-disable react/prop-types */
import { useState } from 'react'
import { assets } from '../../assets/assets'
import './Add.css'
import axios from 'axios'
import { toast } from 'react-toastify'
const Add = ({ url }) => {
    const [image, setImage] = useState(false)
    const [data, setData] = useState({ name: "", description: "", price: 0, category: "salad" })
    const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setData(data => ({ ...data, [name]: value }))
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('category', data.category)
        formData.append('price', data.price)
        formData.append('image', image)
        console.log(formData)
        try {
            const response = await axios.post(`${url}/api/food/add`, formData)
            if (response.data.success) {
                setData({
                    name: "",
                    description: '',
                    price: 0
                    ,
                    category: 'salad'
                })
                setImage(false)
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)

        }
    }

    return (
        <div className='add'>
            <form action="" className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload image</p>
                    <label className='upload-img-label' htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />

                    </label>
                    <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" id='image' required hidden />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input type="text" name="name" placeholder='Type here' onChange={onChangeHandler} value={data.name} />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea name="description" rows={6} placeholder='Write content here' onChange={onChangeHandler} value={data.description} required />
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" id="">
                            <option value="salad">Salad</option>
                            <option value="rolls">Rolls</option>
                            <option value="deserts">Deserts</option>
                            <option value="sandwich">Sandwich</option>
                            <option value="cake">Cake</option>
                            <option value="pure veg">Pure Veg</option>
                            <option value="pasta">Pasta</option>
                            <option value="noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input type="Number" name="price" placeholder='$10' onChange={onChangeHandler} value={data.price} />
                    </div>
                </div>
                <button type="submit" className='add-btn'>ADD</button>
            </form>
        </div>
    )
}

export default Add