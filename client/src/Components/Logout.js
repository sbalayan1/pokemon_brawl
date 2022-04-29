import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

let Logout = ({setCurrentUser}) => {
    let history = useHistory()
    useEffect(() => {
        setTimeout(() => {
            setCurrentUser(null)
            history.push('/login')
        }, 3000)
    },[])

    return (
        <div className='login-container'>
            Goodbye!
        </div>
    )
}

export default Logout