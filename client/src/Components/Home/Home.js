import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import * as React from 'react'
import Ability from '../Ability'
import Stat from '../Stat'
import LoadScreen from '../LoadScreen'
import {Container} from 'nes-react'

import Charizard from './Charizard'
import BuildBattle from './BuildBattle'
import WhoThatPokemon from './WhoThatPoke'
import LegendaryBirds from './LegendaryBirds'

let Home = ({currentUser, pokemonData, hiddenPokemon, userTrainer, setUserTrainer, opponentTrainer, setOpponentTrainer, userTrainerPokemon, setUserTrainerPokemon, setCopyUserTrainerPokemon, legendBirds, isLoaded, previousRoute, setPreviousRoute}) => {    
    const history = useHistory()
    useEffect(() => {
        if (isLoaded) {
            fetch('/api/trainers')
            .then(res => res.json())
            .then(data => {
                if (currentUser !== null) {
                    if (data.find(trainer=> trainer.user_id === currentUser.id)===undefined) {
                        history.push('/create_a_trainer')
                    } else {
                        setUserTrainer(data.find(trainer=> trainer.user_id === currentUser.id))
                        let opponentTrainers = data.filter(trainer => trainer.user_id !== currentUser.id)
                        setOpponentTrainer(opponentTrainers[Math.floor(Math.random() * opponentTrainers.length)])
                        setUserTrainerPokemon(data.find(trainer=> trainer.user_id === currentUser.id).pokemon)
                        setCopyUserTrainerPokemon(data.find(trainer=> trainer.user_id === currentUser.id).pokemon)
                    }
                }
            })
        }
    }, [isLoaded])

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