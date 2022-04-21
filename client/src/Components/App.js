import {useState, useEffect} from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import * as React from 'react'
import {Container} from 'nes-react'

//import react components
import NavBar from './NavBar'
import SignUp from './SignUp';
import Login from './Login';
import Logout from './Logout'
import Home from './Home'
import SafariZone from './SafariZone'
import Trainer from './Trainer'
import Battle from './Battle'
import PC from './PC'
import Loading from './Loading'
import Leaderboards from './Leaderboards'

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
  const [homePokemon, setHomePokemon] = useState(null)
  let random = Math.floor(Math.random()*151)
  let fetchData = async () => {
    try {
      let trainers = fetch('/api/trainers')
      let pokemonData = fetch('/api/pokemon')
      let randomPokemon = fetch(`/api/pokemon/${random}`)
      let pokeBall = fetch('https://pokeapi.co/api/v2/item/poke-ball')

      random = Math.floor(Math.random()*151)
      let hiddenPokemon = fetch(`/api/pokemon/${random}`)

      let data = await Promise.all([trainers, pokemonData, randomPokemon, hiddenPokemon, pokeBall])
      let dataPromises = data.map(res => res.json())
      let results = await Promise.all(dataPromises)
      console.log(results)
      return results

    } catch (error) {
      console.error(error)
    }
  }

  let fetchHomePokemon = async () => {
    try {
      let articuno = fetch('/api/pokemon/144')
      let zapdos = fetch('/api/pokemon/145')
      let moltres = fetch('/api/pokemon/146')

      let data = await Promise.all([articuno, zapdos, moltres])
      let dataPromises = data.map(res => res.json())
      let results = await Promise.all(dataPromises)
      return results

    } catch (error) {
      console.error(error)
    }
}

  useEffect(() => {
      fetchData().then(data => {
        setTrainers(data[0])
        setPokemonData(data[1])
        setRandPokemon(data[2].front_image)
        setHiddenPokemon(data[3])
        setPokeBall(data[4].sprites.default)
      })

      fetchHomePokemon().then(data => {setHomePokemon(data)})
  },[])

  if (currentUser === null) {
    history.push('/login')
    return (
      <div>
        <NavBar 
          pokeBall={pokeBall}
        />
        <div className="app-container">
          <Switch>
            <Route exact path ='/login'>
              <Login 
                setCurrentUser={setCurrentUser}
              />
            </Route>
            <Route exact path='/signup'>
              <SignUp 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser}
              />  
            </Route>
          </Switch>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <NavBar 
          pokeBall={pokeBall}
        />
        <div className="app-container">
          <Switch>
            <Route exact path ='/login'>
              <Login 
                setCurrentUser={setCurrentUser}
              />
            </Route>
            <Route exact path ='/logout'>
              <Logout 
                setCurrentUser={setCurrentUser}
              />
            </Route>
            <Route exact path ='/loading'>
              <Loading 
                hiddenPokemon={hiddenPokemon}
                setHiddenPokemon={setHiddenPokemon}
                randPokemon={randPokemon}
                pokeBall={pokeBall}
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
                homePokemon = {homePokemon}
              />
            </Route>
          </Switch>
        </div>
      </div>
    )
  }
}

export default App