import {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import LoadScreen from './LoadScreen'
import { padding } from '@mui/system'

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
            <Paper elevation={24} className='login-paper'>
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <TextField style={{margin:'5px'}} label="Username" variant="outlined" type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                    <TextField style={{margin:'5px'}} label="Password" variant="outlined" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <Button style={{margin:'5px'}} className='submit' variant='contained' type="submit">Submit</Button>
                    <Button style={{margin:'5px'}} className='submit' variant='contained' type="reset" onClick={handleSignup}>Sign Up</Button>
                    {errors ? <div>{errors}</div>: null}
                </form>
            </Paper>
        ) 
    }


    return renderLoginScreen()
}

export default Login