import { React, useContext } from 'react'
import Container from '@mui/material/Container'
import './style.css'


// components
import Ability from '../Ability'
import Stat from '../Stat'
import LoadScreen from '../LoadScreen'
import Charizard from './Charizard/Charizard'
import BuildBattle from './BuildBattle/BuildBattle'
import WhoThatPokemon from './WhoThatPoke/WhoThatPoke'
import LegendaryBirds from './LegendaryBirds'

//hooks
import {GlobalStateContext} from '../../GlobalState'

let Home = ({pokeBall, currentUser, pokemonData, hiddenPokemon, userTrainer, setUserTrainer, opponentTrainer, setOpponentTrainer, userTrainerPokemon, setUserTrainerPokemon, setCopyUserTrainerPokemon, legendBirds, isLoaded, previousRoute, setPreviousRoute
}) => {
    const [globalState, setGlobalState] = useContext(GlobalStateContext)

    return (
        <Container className="homepage-container">
            {<Charizard pokeBall={pokeBall} />}
            {<BuildBattle userTrainer={userTrainer}/>}
            {<WhoThatPokemon 
                pokeBall={pokeBall}
                currentUser={currentUser} 
                pokemonData={pokemonData} 
                hiddenPokemon={hiddenPokemon} 
                userTrainer={userTrainer} 
                userTrainerPokemon={userTrainerPokemon} 
                setUserTrainerPokemon={setUserTrainerPokemon} 
                setCopyUserTrainerPokemon={setCopyUserTrainerPokemon}
            />}
            
            {<LegendaryBirds legendBirds={legendBirds}/>}
            
            <div className="footer">Copyright 2021 - SeanB</div>
        </Container>
    )
}

export default Home