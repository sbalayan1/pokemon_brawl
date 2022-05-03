import {useState, useEffect} from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import * as React from 'react'
import {Container} from 'nes-react'
import NavBar from './NavBar'
import SignUp from './SignUp';
import Login from './Login';
import Logout from './Logout'
import Home from './Home/Home'
import SafariZone from './SafariZone'
import Trainer from './Trainer'
import Battle from './Battle'
import PC from './PC'
import LoadScreen from './LoadScreen'
import Leaderboards from './Leaderboards'
import Error from './Error'

let App = () => {
  const history = useHistory()
  const [currentUser, setCurrentUser] = useState(null)
  const [pokemonData, setPokemonData] = useState(null)
  const [hiddenPokemon, setHiddenPokemon] = useState(null)
  const [userTrainer, setUserTrainer] = useState(null)
  const [opponentTrainer, setOpponentTrainer]=useState(null)
  const [userTrainerPokemon, setUserTrainerPokemon] = useState(null)
  const [copyUserTrainerPokemon, setCopyUserTrainerPokemon] = useState(null)
  const [trainers, setTrainers] = useState(null)
  const [randPokemon, setRandPokemon] = useState(null)
  const [pokeBall, setPokeBall] = useState(null)
  const [legendBirds, setLegendBirds] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [previousRoute, setPreviousRoute] = useState('/')
  let random = Math.floor(Math.random()*150) + 1
  
  let fetchData = async () => {
    try {
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

  useEffect(() => {
      fetchData().then(data => {
        console.log('useEffect rerender firing. setting necessary data')
        let legendaryBirds = [data[6], data[7], data[8]]
        setTrainers(data[0])
        setPokemonData(data[1])
        setRandPokemon(data[2].front_image)
        setHiddenPokemon(data[3])
        setPokeBall(data[4].sprites.default)
        setLegendBirds(legendaryBirds)
  
        if (!data[5].error) {
          // alert(`Welcome ${data[5].username}`)
          setCurrentUser(data[5])
          setIsLoaded(true)

          if (!data[0].find(trainer=> trainer.user_id === data[5].id)) {
            history.push('/create_a_trainer')
            console.log('new user verified. pushing to create a trainer')
          } else {
            let opponentTrainers = data[0].filter(trainer => trainer.user_id !== data[5].id)
            setUserTrainer(data[0].find(trainer=> trainer.user_id === data[5].id))
            setOpponentTrainer(opponentTrainers[Math.floor(Math.random() * opponentTrainers.length)])
            setUserTrainerPokemon(data[0].find(trainer=> trainer.user_id === data[5].id).pokemon)
            setCopyUserTrainerPokemon(data[0].find(trainer=> trainer.user_id === data[5].id).pokemon)
            history.push('/')
            console.log('user verified and all state set. pushing to homepage')
          }
        } else {
          console.log('user unverified. pushing to login')
          history.push('/login')
        }
      })
  },[])

  if (!currentUser) {
    return (
      <div>
        <NavBar 
          pokeBall={pokeBall}
          currentUser={currentUser}
        />
        <div className="app-container">
          <Switch>
            <Route exact path ='/login'>
              <Login 
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                isLoaded={isLoaded}
                setIsLoaded={setIsLoaded}
              />
            </Route>
            <Route exact path='/signup'>
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
      <div>
        {console.log({currentUser})}
        <NavBar 
          pokeBall={pokeBall}
          currentUser={currentUser}
        />
        <div className="app-container">
          <Switch>
            <Route exact path ='/login'>
              <Login 
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                isLoaded={isLoaded}
                setIsLoaded={setIsLoaded}
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
                setHiddenPokemon={setHiddenPokemon}
                randPokemon={randPokemon}
                pokeBall={pokeBall}
                isLoaded={isLoaded}
                setIsLoaded={setIsLoaded}
                previousRoute={previousRoute}
              />
            </Route>
            <Route exact path='/safari_zone'>
              <SafariZone
                pokemonData={pokemonData}
                userTrainer={userTrainer}
              />
            </Route>
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
              <Battle 
                pokemonData={pokemonData}
                userTrainer={userTrainer}
                opponentTrainer={opponentTrainer}
              />
            </Route>
            <Route exact path='/my_pc'>
              <PC
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
              <Home 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser}
                pokemonData={pokemonData}
                setPokemonData={setPokemonData}
                hiddenPokemon={hiddenPokemon}
                userTrainer={userTrainer}
                setUserTrainer={setUserTrainer}
                opponentTrainer={opponentTrainer}
                setOpponentTrainer={setOpponentTrainer}
                userTrainerPokemon={userTrainerPokemon}
                setUserTrainerPokemon={setUserTrainerPokemon}
                setCopyUserTrainerPokemon={setCopyUserTrainerPokemon}
                legendBirds={legendBirds}
                isLoaded={isLoaded}
                previousRoute={previousRoute}
                setPreviousRoute={setPreviousRoute}
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
  }
}

export default App