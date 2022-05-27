import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './style.css'

let SignUp = () => {
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errors, setErrors] = useState(null)

    let handleSubmit = async (e) => {
        e.preventDefault(e)
        const user = {
            username: username, 
            first_name: firstName, 
            last_name: lastName,
            age: age,
            email_address: email,
            password: password, 
            password_confirmation: passwordConfirmation
        }
        const res = await fetch('api/signup', {
            method: 'POST', 
            headers: {'Content-Type' : 'application/json'}, 
            body: JSON.stringify(user)
        })

        const userData = await res.json()

        if (userData.id) {
            alert(`Welcome ${user.username}! Please login using your new credentials!!`)
            history.push('/login')
        } else {
            setErrors(userData.errors)
        }
    }

    return (
        <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <label htmlFor="username">Username</label>
            <input className="login-input" type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>

            <label htmlFor="first-name">First Name</label>
            <input className="login-input" type="text" value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>

            <label htmlFor="last-name">Last Name</label>
            <input className="login-input" type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)}/>

            <label htmlFor="age">Age</label>
            <input className="login-input" type="text" value={age} onChange={(e)=> setAge(e.target.value)}/>

            <label htmlFor="email-address">Email Address</label>
            <input className="login-input" type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>

            <label htmlFor="password">Password</label>
            <input className="login-input" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>

            <label htmlFor="password">Password Confirmation</label>
            <input className="login-input" type="password" value={passwordConfirmation} onChange={(e)=> setPasswordConfirmation(e.target.value)}/>

            <button className="submit" type="submit">Sign Up</button>
            {errors ? errors.map(error => <div>{error}</div>) : null}
        </form>
    </div>
    )
}

export default SignUp