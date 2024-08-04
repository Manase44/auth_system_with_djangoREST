import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/success.css';

const Register = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password2: ""
    }) 



    const handleChange = async(event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData, [name]: value
        })
    }


    const handleSubmit = async(event) => {
        event.preventDefault()


        try {
            const response = await fetch(`http://127.0.0.1:8000/api/user/accounts/register`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
              
            })
    
            if(!response.ok) {
                throw new Error(`Server error ! : Status ${response.status}`)
            }else {
                const data = await response.json()
                toast(data.message, {theme: "success", position: 'top-right'})
                navigate("/login")
            }

        } catch(error) {
            console.log("An error occured while registering user")
        }

      
    }


    return (
        <div className="page-container">
            <div className="form-div">
                <div className="form-div-header">
                    <h1>register</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-input">
                        <label htmlFor="username">username</label>

                        <input 
                            type="text" 
                            name="username" 
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                             />

                    </div>
                    <div className="form-input">
                        <label htmlFor="fname">first name</label>

                        <input 
                            type="text" 
                            name="first_name"
                             id="fname" 
                             value={formData.first_name}
                             onChange={handleChange}
                             required
                             
                             />

                    </div>
                    <div className="form-input">
                        <label htmlFor="lname">last name</label>

                        <input 
                            type="text" 
                            name="last_name" 
                            id="lname" 
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                        
                    </div>
                    <div className="form-input">
                        <label htmlFor="email">email address</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                         />
                    </div>
                    <div className="form-input">
                        <label htmlFor="password">password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-input">
                        <label htmlFor="cpassword">confirm password</label>
                        <input 
                            type="password" 
                            name="password2" 
                            id="cpassword" 
                            value={formData.password2}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">register</button>
                    <p className="form-small-text">Already have an account? <Link to={"/login"}>Login</Link> </p>
                </form>
            </div>
        </div>
    )
}

export default Register;