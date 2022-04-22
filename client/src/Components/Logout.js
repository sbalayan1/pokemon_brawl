import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

let Logout = ({setCurrentUser}) => {
    let history = useHistory()
    useEffect(() => {
        setTimeout(() => {
            console.log('running')
            setCurrentUser(null)
            history.push('/login')
        }, 5000)
    },[])

    return (
        <div>
            Goodbye!
        </div>
    )
}

export default Logout