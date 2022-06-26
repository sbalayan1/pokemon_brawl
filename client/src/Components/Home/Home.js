import { React, useContext } from 'react'
import Container from '@mui/material/Container'
import './style.css'


// components
// import Charizard from './Charizard/Charizard'
// import BuildBattle from './BuildBattle/BuildBattle'
// import WhoThatPokemon from './WhoThatPoke/WhoThatPoke'
// import LegendaryBirds from './LegendaryBirds'

//hooks
import {GlobalStateContext} from '../../GlobalState'
// {pokeBall, currentUser, pokemonData, hiddenPokemon, userTrainer, setUserTrainer, opponentTrainer, setOpponentTrainer, userTrainerPokemon, setUserTrainerPokemon, setCopyUserTrainerPokemon, legendBirds, isLoaded, previousRoute, setPreviousRoute
// }


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