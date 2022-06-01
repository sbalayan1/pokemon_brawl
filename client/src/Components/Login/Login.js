import {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import IconButton  from '@mui/material/IconButton'
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos'


import './style.css'

let Login = ({currentUser, setCurrentUser, isLoaded, setIsLoaded, trainers, setTrainerHelper}) => {
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState(null)
    const [snackBar, setSnackBar] = useState(false)

    let handleSignup = () => {
        history.push('/sign_up')
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
            setCurrentUser(userData)
            setTrainerHelper(trainers, userData)
        } else {
            setErrors(userData.errors)
        }

        setSnackBar(true)
    }

    let handleClose = () => {
        setSnackBar(false)
        if (!errors) history.push('/')
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
                    {/* {errors ? <div>{errors}</div>: null} */}
                </form>
                <Snackbar open={snackBar} autoHideDuration={6000} onClose={handleClose}>
                    {errors ? 
                        <Alert severity="warning" sx={{width: '100%'}} onClose={handleClose}>
                            {errors}
                        </Alert>
                    :
                        <Alert severity="success" sx={{ width: '100%' }}>
                            {username ? `Welcome ${username[0].toUpperCase() + username.slice(1)}` : null} 
                            <IconButton onClick={handleClose}>
                                <ArrowForwardIos fontSize="small"/>
                            </IconButton>
                        </Alert>
                    }
                </Snackbar>
            </Paper>
        ) 
    }


    return renderLoginScreen()
}

export default Login