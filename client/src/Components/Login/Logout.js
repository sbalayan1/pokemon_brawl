import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Alert from '@mui/material/Alert'
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos'
import './style.css'
import IconButton  from '@mui/material/IconButton'

let Logout = ({setCurrentUser, setIsLoaded}) => {
    const history = useHistory()
    let handleLogout = () => {
        setCurrentUser(null)
        setIsLoaded(false)
        history.push('/login')
    }

    return (
        <div className="logout-container">
            <Alert className="login-paper" severity="success" action={
                <IconButton onClick={handleLogout}>
                    <ArrowForwardIos/>
                </IconButton>
            }>Goodbye!</Alert>
        </div>
    )
}

export default Logout