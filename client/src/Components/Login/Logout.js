import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Alert from '@mui/material/Alert'
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos'
import './style.css'
import Paper from '@mui/material/Paper'
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
            <Paper className="logout-paper">
                <Alert severity="success" action={
                        <IconButton onClick={handleLogout}>
                            <ArrowForwardIos/>
                        </IconButton>
                    }>Goodbye!
                </Alert>
            </Paper>
   
        </div>
    )
}

export default Logout