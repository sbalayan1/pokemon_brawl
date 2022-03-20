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
  const [pokemonData, setPokemonData] = useState()
  const [hiddenPokemon, setHiddenPokemon] = useState()
  const [userTrainer, setUserTrainer] = useState()
  const [opponentTrainer, setOpponentTrainer]=useState()
  const [userTrainerPokemon, setUserTrainerPokemon] = useState()
  const [copyUserTrainerPokemon, setCopyUserTrainerPokemon] = useState()
  const [trainers, setTrainers] = useState()
  const [randPokemon, setRandPokemon] = useState()
  const [pokeBall, setPokeBall] = useState()

  let random = Math.floor(Math.random()*151), homePokemon;
  let fetchData = async () => {
    let trainers = await fetch('http://localhost:3000/trainers')
    let pokemonData = await fetch('http://localhost:3000/pokemon')
    let randomPokemon = await fetch(`http://localhost:3000/pokemon/${random}`)
    let pokeBall = await fetch('https://pokeapi.co/api/v2/item/poke-ball')

    random = Math.floor(Math.random()*151)
    let hiddenPokemon = await fetch(`http://localhost:3000/pokemon/${random}`)

    return Promise.all([trainers.json(), pokemonData.json(), randomPokemon.json(), hiddenPokemon.json(), pokeBall.json()])
  }

  let fetchHomePokemon = async () => {
    let dragonite = await fetch ('http://localhost:3000/pokemon/149')
    let mewtwo = await fetch('http://localhost:3000/pokemon/151')
    let articuno = await fetch('http://localhost:3000/pokemon/144')
    let zapdos = await fetch('http://localhost:3000/pokemon/145')
    let moltres = await fetch('http://localhost:3000/pokemon/146')

    return Promise.all([dragonite.json(), mewtwo.json(), articuno.json(), zapdos.json(), moltres.json()])
}

  useEffect(() => {
      fetchData().then(data => {
        setTrainers(data[0])
        setPokemonData(data[1])
        setRandPokemon(data[2].front_image)
        setHiddenPokemon(data[3].front_image)
        setPokeBall(data[4].sprites.default)
      })

      fetchHomePokemon().then(data => {
        homePokemon = data
        console.log(homePokemon)
      })
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