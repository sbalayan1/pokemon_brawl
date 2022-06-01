import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './style.css'
import Button from '@mui/material/Button'
import Input from './Input'


let SignUp = () => {
    const history = useHistory()
    const [userInfo, setUserInfo] = useState({
        username: '',
        first_name: '',
        last_name: '',
        age: '',
        email_address: '',
        password: '',
        password_confirmation: ''
    })

    const [errors, setErrors] = useState(null)

    let handleSubmit = async (e) => {
        e.preventDefault(e)

        const res = await fetch('api/signup', {
            method: 'POST', 
            headers: {'Content-Type' : 'application/json'}, 
            body: JSON.stringify(userInfo)
        })

        const userData = await res.json()

        if (userData.id) {
            alert(`Welcome ${userInfo.username}! Please login using your new credentials!!`)
            history.push('/login')
        } else {
            setErrors(userData.errors)
        }
    }

    let renderTextFields = Object.keys(userInfo).map(key => <Input key={key} keyName={key} userInfo={userInfo} setUserInfo={setUserInfo}/>)

    return (
        <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            {/* <label htmlFor="username">Username</label>
            <TextField className="login-input" type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>

            <label htmlFor="first-name">First Name</label>
            <TextField className="login-input" type="text" value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>

            <label htmlFor="last-name">Last Name</label>
            <TextField className="login-input" type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)}/>

            <label htmlFor="age">Age</label>
            <TextField className="login-input" type="text" value={age} onChange={(e)=> setAge(e.target.value)}/>

            <label htmlFor="email-address">Email Address</label>
            <TextField className="login-input" type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>

            <label htmlFor="password">Password</label>
            <TextField className="login-input" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>

            <label htmlFor="password">Password Confirmation</label>
            <TextField className="login-input" type="password" value={passwordConfirmation} onChange={(e)=> setPasswordConfirmation(e.target.value)}/> */}

            <Button variant="contained" className="submit" type="submit">Sign Up</Button>
            {errors ? errors.map(error => <div>{error}</div>) : null}
        </form>
    </div>
    )
}

export default SignUp