import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './style.css'
import Paper from '@mui/material/Paper'
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
        <Paper className="login-paper">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                {renderTextFields}
                <br></br>
                <Button variant="contained" className="submit" type="submit">Sign Up</Button>
                {errors ? errors.map(error => <div>{error}</div>) : null}
            </form>
        </Paper>
    )
}

export default SignUp