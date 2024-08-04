import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useUserStore from "../../store/user.store";
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/success.css';

const Login = () => {
    const setUser = useUserStore((state) => state.setUser)
    const [isLoading, setIsLoading] = useState(false)
    const [err, setError] = useState(null)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })



    const handleChange = async (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData, [name]: value
        })
    }


    const handleSubmit = async (event) => {
        setIsLoading(true)
        event.preventDefault()

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/user/accounts/login`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                }

            })

            const data = await response.json()
            if (!response.ok) {
                setError(data.message);
            } else { 
                console.log(data)
                setError(null)
                const loggedUser = {
                    first_name: data.user.first_name,
                    last_name: data.user.last_name
                }
                setUser(loggedUser)
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                toast(data.message, { theme: "success", position: 'top-right' })
                navigate("/", {replace: true})
            }

        } catch (error) {
            console.log(error)
            setError("something went wrong")
        }
        finally {
            setIsLoading(false)
        }


    }
    return (
        <div className="page-container">
            <div className="form-div">
                <div className="form-div-header">
                    <h1>login</h1>
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
                   {err && <p className="error">{err}</p>}
                    <button type="submit">{isLoading ? "wait a moment..." : "login"}</button>
                    <p className="form-small-text">Don't have an account? <Link to={"/register"}>Register</Link> </p>
                </form>
            </div>
        </div>
    )
}

export default Login;