import * as React from 'react'
import Ability from '../Ability'
import Stat from '../Stat'
import LoadScreen from '../LoadScreen'
import {Container} from 'nes-react'

import Charizard from './Charizard'
import BuildBattle from './BuildBattle'
import WhoThatPokemon from './WhoThatPoke'
import LegendaryBirds from './LegendaryBirds'

let Home = ({currentUser, pokemonData, hiddenPokemon, userTrainer, setUserTrainer, opponentTrainer, setOpponentTrainer, userTrainerPokemon, setUserTrainerPokemon, setCopyUserTrainerPokemon, legendBirds, isLoaded, previousRoute, setPreviousRoute
}) => {
    return (
        <div className="home-container">
            {<Charizard />}
            {<BuildBattle userTrainer={userTrainer}/>}
            {<WhoThatPokemon 
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
        </div>
    )
}

export default Home