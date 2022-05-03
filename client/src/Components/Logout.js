import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

let Logout = ({setCurrentUser, setIsLoaded}) => {
    const history = useHistory()
    useEffect(() => {
        fetch('/api/logout', {
            method: 'DELETE'
        }).then(() => {
            setTimeout(() => {
                setCurrentUser(null)
                setIsLoaded(false)
                history.push('/login')
            }, 3000)
        })
    },[])

    return (
        <div className='login-container'>
            Goodbye!
        </div>
    )
}

export default Logout