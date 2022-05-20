import {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import LoadScreen from './LoadScreen'

let Login = ({currentUser, setCurrentUser, isLoaded, setIsLoaded, trainers, setTrainerHelper}) => {
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState(null)

    let handleSignup = () => {
        history.push('/signup')
    }
    
    let handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            username, 
            password
        }

        const res = await fetch('/api/login', {
            method: 'POST', 
            headers: {'Content-type':'Application/json'}, 
            body: JSON.stringify(user)
        })
        
        const userData = await res.json()

        if (userData.id) {
            alert(`Welcome ${username}`)
            setCurrentUser(userData)
            setTrainerHelper(trainers, userData)
            history.push('/')
        } else {
            setErrors(userData.errors)
        }
    }

    let renderLoginScreen = () => {
        return (
            <div className="login-container">
                <Paper elevation={24}>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <label htmlFor="username">Username</label>
                        <input className="login-input" type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                        <input className="login-input" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                        <button className="submit" type="submit">Submit</button>
                    </form>
                    <div className="login-form-sign-up">
                        <button className="submit" type="reset" onClick={handleSignup}>Sign Up</button>
                        {errors ? <div>{errors}</div>: null}
                    </div>
                </Paper>
            </div>
        ) 
    }


    return renderLoginScreen()
}

export default Login