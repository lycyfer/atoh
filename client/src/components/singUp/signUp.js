import { useContext, useState } from "react"
import "./signUp.css"
import { useNavigate } from "react-router-dom"
import apiRequest from "../lib/apiRequest"
import { AuthContext } from "../context/AuthContext"


const SignUp = () => {


    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const { updateUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        const formData = new FormData(e.target)
        const login = formData.get("username")
        const password = formData.get("password")
        console.log(login, password)
        try {
            const res = await apiRequest.post("/auth/login", {
                Login: login,
                Password: password
            })

            localStorage.setItem("user", JSON.stringify(res.data));
            localStorage.setItem("token", res.data.token);
            console.log(res)
            updateUser(res.data)
            navigate(`/user/${res.data.user.id}`)

        } catch (err) {
            console.log(err)
            setError(err)
        }
    }

    return (
        <div>
            <div class="background">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            {/* <h1 className="test_h1">TEST</h1> */}
            <div class="signup">
                <h2>Sign Up</h2>
                <form class="form" onSubmit={handleSubmit}>
                    <div class="textbox">
                        <input className="signUp-input" name="username" type="text" required />
                        <label>Login</label>
                    </div>
                    <div class="textbox">
                        <input className="signUp-input" name="password" type="password" required />
                        <label>Password</label>
                    </div>
                    <button className="signUp-btn" type="submit">
                        login
                        <span class="material-symbols-outlined"> <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg> </span>
                    </button>
                    {error && <span className="span_err">{error.message}</span>}
                </form>
            </div>
        </div>
    )
}

export default SignUp