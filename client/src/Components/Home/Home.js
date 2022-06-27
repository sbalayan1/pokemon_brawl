import { React, useContext } from 'react'
import Container from '@mui/material/Container'
import './style.css'

//hooks
import {GlobalStateContext} from '../../GlobalState'

let Home = ({children}) => {
    const [globalState, setGlobalState] = useContext(GlobalStateContext)

    return (
        <Container className="homepage-container">
            {children}
            <div className="footer">Copyright 2021 - SeanB</div>
        </Container>
    )
}

export default Home