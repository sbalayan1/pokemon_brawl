import { React, useContext } from 'react'
import Container from '@mui/material/Container'
import './style.css'

let Home = ({children}) => {
    return (
        <Container className="homepage-container">
            {children}
        </Container>
    )
}

export default Home