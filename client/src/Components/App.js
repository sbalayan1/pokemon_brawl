import React, {useState, useEffect, useContext, useRef} from 'react'
import { Switch, Route, useHistory, Redirect, NavLink, Link } from 'react-router-dom'

//navbar components
import NavBar from './Nav/NavBar'
import SignUp from './Login/SignUp';
import Login from './Login/Login';
import Logout from './Login/Logout'

//home components
import Home from './Home/Home'
import Charizard from './Home/Charizard/Charizard'
import BuildBattle from './Home/BuildBattle/BuildBattle'
import WhoThatPokemon from './Home/WhoThatPoke/WhoThatPoke'
import LegendaryBirds from './Home/LegendaryBirds/LegendaryBirds'

import SafariZone from './SafariZone'
import Trainer from './Trainer'
import BattleHome from './Battle/BattleHome'
import PC from './PC/PC'
import LoadScreen from './LoadScreen'
import Leaderboards from './Leaderboards'
import Error from './Error'

//hooks
import {GlobalStateContext} from '../GlobalState'

let App = () => {
  const history = useHistory()
  const [currentUser, setCurrentUser] = useState(null)
  const [userTrainer, setUserTrainer] = useState(null)
  const [opponentTrainer, setOpponentTrainer]=useState(null)
  const [userTrainerPokemon, setUserTrainerPokemon] = useState(null)
  const [copyUserTrainerPokemon, setCopyUserTrainerPokemon] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [previousRoute, setPreviousRoute] = useState('/')
  const [globalState, setGlobalState] = useContext(GlobalStateContext)


  const trainers = useRef()
  const pokeBall = useRef()
  const legendBirds = useRef()
  const pokemonData = useRef()
  const loadingPokemon = useRef()
  const hiddenPokemon = useRef()

  let fetchData = async () => {
    try {
      let random = Math.floor(Math.random()*150) + 1
      let trainers = fetch('/api/trainers')
      let pokemonData = fetch('/api/pokemon')
      let randomPokemon = fetch(`/api/pokemon/${random}`)
      let pokeBall = fetch('https://pokeapi.co/api/v2/item/poke-ball')
      let user = fetch('/api/user')
      let articuno = fetch('/api/pokemon/144')
      let zapdos = fetch('/api/pokemon/145')
      let moltres = fetch('/api/pokemon/146')

      random = Math.floor(Math.random()*150) + 1
      let hiddenPokemon = fetch(`/api/pokemon/${random}`)

      let data = await Promise.all([trainers, pokemonData, randomPokemon, hiddenPokemon, pokeBall, user, articuno, zapdos, moltres])
      let dataPromises = data.map(res => res.json())
      let results = await Promise.all(dataPromises)
      return results

    } catch (error) {
      console.error(error)
    }
  }

  let setTrainerHelper = (trainersArray, user) => {
    if (!trainersArray.find(trainer=> trainer.user_id === user.id)) {
      history.push('/create_a_trainer')
      console.log('new user verified. pushing to create a trainer')
    } else {
      let opponentTrainers = trainersArray.filter(trainer => trainer.user_id !== user.id)
      setUserTrainer(trainersArray.find(trainer=> trainer.user_id === user.id))
      setOpponentTrainer(opponentTrainers[Math.floor(Math.random() * opponentTrainers.length)])
      setUserTrainerPokemon(trainersArray.find(trainer=> trainer.user_id === user.id).pokemon)
      setCopyUserTrainerPokemon(trainersArray.find(trainer=> trainer.user_id === user.id).pokemon)
      console.log('user verified and all state set.')
    }
  }

  useEffect(() => {
      fetchData().then(data => {
        console.log('useEffect rerender firing. setting necessary data')
        let legendaryBirds = [data[6], data[7], data[8]]
        
        trainers.current = data[0]
        pokemonData.current = data[1]
        loadingPokemon.current = data[2].front_image
        hiddenPokemon.current = data[3]
        pokeBall.current = data[4].sprites.default
        legendBirds.current = legendaryBirds

        if (!data[5].error) {
          setCurrentUser(data[5])
          setIsLoaded(true)
          setTrainerHelper(trainers.current, data[5])

        } else {
          console.log('user unverified. pushing to login')
          history.push('/login')
        }
      })
  },[])

  if (!currentUser) {
    return (
      <div className='page-container'>
        <NavBar 
          pokeBall={pokeBall}
          currentUser={currentUser}
        />
        <div className="content-wrap">
          <Switch>
            <Route exact path ='/login'>
              <Login 
                setCurrentUser={setCurrentUser}
                trainers={trainers}
                setTrainerHelper={setTrainerHelper}
              />
            </Route>
            <Route exact path='/sign_up'>
              <SignUp 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser}
              />  
            </Route>
            <Route exact path ='/logout'>
              <Logout 
                setCurrentUser={setCurrentUser}
                setIsLoaded={setIsLoaded}
              />
            </Route>
            {isLoaded ?
              <Route>
                <Error/>
              </Route>
            :
              null
            }
          </Switch>
        </div>
      </div>
    )
  } else {
    return (
      <div className='page-container'>
        <NavBar 
          pokeBall={pokeBall}
          currentUser={currentUser}
        />
        <div className="content-wrap">
          <Switch>
            <Route exact path ='/login'>
                <Login 
                  setCurrentUser={setCurrentUser}
                  trainers={trainers}
                  setTrainerHelper={setTrainerHelper}
                />
            </Route>
            <Route exact path ='/logout'>
              <Logout 
                setCurrentUser={setCurrentUser}
                setIsLoaded={setIsLoaded}
              />
            </Route>
            <Route exact path ='/loading'>
              <LoadScreen
                hiddenPokemon={hiddenPokemon}
                pokeBall={pokeBall}
                isLoaded={isLoaded}
                setIsLoaded={setIsLoaded}
                previousRoute={previousRoute}
              />
            </Route>
            {/* <Route exact path='/safari_zone'>
              <SafariZone
                pokemonData={pokemonData}
                userTrainer={userTrainer}
              />
            </Route> */}
            <Route exact path='/create_a_trainer'>
              <Trainer 
                currentUser={currentUser}
                pokemonData={pokemonData}
                setUserTrainer={setUserTrainer}
                setOpponentTrainer={setOpponentTrainer}
                setUserTrainerPokemon={setUserTrainerPokemon}
                setCopyUserTrainerPokemon={setCopyUserTrainerPokemon}
              />
            </Route>
            <Route exact path='/battle'>
              <BattleHome 
                pokemonData={pokemonData}
                userTrainer={userTrainer}
                opponentTrainer={opponentTrainer}
                pokeBall={pokeBall}
              />
            </Route>
            <Route exact path='/pc'>
              <PC
                pokeBall={pokeBall}
                pokemonData={pokemonData}
                userTrainer={userTrainer}
                copyUserTrainerPokemon={copyUserTrainerPokemon}
              />
            </Route>
            <Route exact path='/leaderboards'>
              <Leaderboards
                trainers={trainers}
              />
            </Route>
            <Route exact path='/'>
              <Home>
                {<Charizard pokeBall={pokeBall}/>}
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
              </Home>
            </Route>
            {isLoaded ?
              <Route>
                <Error/>
              </Route>
            :
              null
            }
          </Switch>
        </div>
      </div>
    )
  }
}

export default App