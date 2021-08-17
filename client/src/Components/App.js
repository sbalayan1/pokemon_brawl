import {useState, useEffect} from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'

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

let App = () => {
  const history = useHistory()
  const [currentUser, setCurrentUser] = useState(null)
  const [pokemonData, setPokemonData] = useState()
  const [typeData, setTypeData] = useState()
  const [hiddenPokemon, setHiddenPokemon] = useState()
  const [userTrainer, setUserTrainer] = useState()
  const [opponentTrainer, setOpponentTrainer]=useState()
  const [userTrainerPokemon, setUserTrainerPokemon] = useState()
  const [copyUserTrainerPokemon, setCopyUserTrainerPokemon] = useState()

  // *************USED TO SEED DATA FROM POKEMON API TO LOCAL DATABASE*******************
            // useEffect(() => {
            //   fetch('https://pokeapi.co/api/v2/pokemon?limit=1')
            //   .then(res => res.json())
            //   .then(data => {
            //     data.results.map(pokemon => {
            //       fetch(`${pokemon.url}`)
            //       .then(res => res.json())
            //       .then(data => {
            //         let pokemonInformationPost = ({
            //           name: data.name,
            //           level: 10, 
            //           wins: 0,
            //           front_image: data.sprites.front_default, 
            //           back_image: data.sprites.back_default, 
            //         })

            //         console.log(pokemonInformationPost)

            //         fetch('http://localhost:3000/moves', {
            //           method: 'POST',
            //           headers: {'Content-Type':'Application/json'}, 
            //           body: JSON.stringify(pokemonInformationPost)
            //         })
            //         .then(res => res.json())
            //         .then(data => console.log(data))
            //       })
            //     })
            //     })
            // },[])

  // *************USED TO SEED DATA FROM POKEMON API TO LOCAL DATABASE*******************
            // useEffect(() => {
            //   fetch('https://pokeapi.co/api/v2/move?limit=700')
            //   .then(res => res.json())
            //   .then(data => {
            //     console.log(data)
            //     data.results.map(move => {
            //       fetch(`${move.url}`)
            //       .then(res => res.json())
            //       .then(data => {
            //           let description = data.flavor_text_entries.filter (flavorText => {
            //               return flavorText.language.name === "en"
            //             })[0]

            //           let pokemonMoves = ({
            //             name: data.name,
            //             power_points: data.pp,
            //             power: data.power,
            //             description: description.flavor_text
            //           })

            //           fetch('http://localhost:3000/moves', {
            //               method: 'POST',
            //               headers: {'Content-Type':'Application/json'},
            //               body: JSON.stringify(pokemonMoves)
            //           })
            //       })
            //     })
            //   })
            // })

  // *************USED TO SEED DATA FROM POKEMON API TO LOCAL DATABASE*******************
              // useEffect(() => {
              //   fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
              //   .then(res => res.json())
              //   .then(data => {
              //     console.log(data)
              //     data.results.map(pokemon => {
              //       fetch(`${pokemon.url}`)
              //       .then(res => res.json())
              //       .then(data => {

              //           let pokemonStats = ({
              //             hp: data.stats[0].base_stat,
              //             attack: data.stats[1].base_stat, 
              //             defense: data.stats[2].base_stat,
              //             speed: data.stats[5].base_stat,
              //             sp_attack: data.stats[3].base_stat,
              //             sp_defense: data.stats[4].base_stat
              //           })

              //           fetch('http://localhost:3000/stats', {
              //               method: 'POST',
              //               headers: {'Content-Type':'Application/json'},
              //               body: JSON.stringify(pokemonStats)
              //           })
              //       })
              //     })
              //   })
              // })

  // *************USED TO SEED DATA FROM POKEMON API TO LOCAL DATABASE*******************
              // useEffect(() => {
              //   fetch('http://localhost:3000/moves')
              //   .then(res => res.json())
              //   .then(moveData => setPokemonData(moveData))

              //   fetch('http://localhost:3000/pokemon')
              //   .then(res => res.json())
              //   .then(data => setMainPokeData(data))
              // },[])

              // let testFunction = () => {
              //   fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
              //   .then(res => res.json())
              //   .then(pokemonAPIData => {
              //     pokemonAPIData.results.map(pokemon => {
              //       fetch(`${pokemon.url}`)
              //       .then(res => res.json())
              //       .then(exactPokeData => {
              //         exactPokeData.moves.map(move => {
              //           pokemonData.map(data => {
              //             if (data.name === move.move.name) {
              //               let foundPokemon = mainPokeData.find(pokemon => pokemon.name === exactPokeData.name )

              //               let pokemonMove = {
              //                 pokemon_id: foundPokemon.id,
              //                 move_id: data.id
              //               }

              //               fetch('http://localhost:3000/pokemon_moves', {
              //                   method: 'POST', 
              //                   headers: {'Content-Type':'Application/json'},
              //                   body: JSON.stringify(pokemonMove)
              //                   })
              //             }
              //           })
              //         })
              //       })
              //     })
              //   })
              // }
              // testFunction()

  // *************USED TO SEED DATA FROM POKEMON API TO LOCAL DATABASE*******************
  // useEffect(() => {
  //   fetch('http://localhost:3000/stats')
  //   .then(res => res.json())
  //   .then(statData => setStatData(statData))

  //   fetch('http://localhost:3000/pokemon')
  //   .then(res => res.json())
  //   .then(pokemonData => setPokemonData(pokemonData))
  // },[])

  // let seedStats = () => {
  //   fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  //   .then(res => res.json())
  //   .then(pokemonAPIData => {
  //     pokemonAPIData.results.map(pokemon => {
  //       fetch(`${pokemon.url}`)
  //       .then(res => res.json())
  //       .then(exactPokeAPIData => {

  //         let filterHP = statData.filter (stat => stat.hp === exactPokeAPIData.stats[0].base_stat )
  //         let filterATK = filterHP.filter (stat => stat.attack === exactPokeAPIData.stats[1].base_stat)
  //         let filterDEF = filterATK.filter (stat => stat.defense === exactPokeAPIData.stats[2].base_stat)
  //         let filterSPD = filterDEF.filter (stat => stat.speed === exactPokeAPIData.stats[5].base_stat )

  //         let foundPokemon = pokemonData.find(pokemon => pokemon.name === exactPokeAPIData.name )

  //         let pokemonStat = {
  //           pokemon_id: foundPokemon.id, 
  //           stat_id: filterSPD[0].id
  //         }
            
  //         fetch('http://localhost:3000/pokemon_stats', {
  //           method: 'POST', 
  //           headers: {'Content-Type':'Application/json'},
  //           body: JSON.stringify(pokemonStat)
  //         })
  //       })
  //     })
  //   })
  // }

  // seedStats()

  useEffect(() => {
    // fetch('http://localhost:3000/user', {
    //   method: 'GET',
    //   credentials: 'include'
    // })
    // .then(res => {
    //   if(res.ok) {
    //     console.log('res ok')
    //     res.json().then(user => {
    //       setCurrentUser(user)
    //     })
    //   } else {
    //     setCurrentUser(null)
    //   }
    // })

    // fetch('http://localhost:3000/types')
    // .then(res => res.json())
    // .then(data => setTypeData(data))

    fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then(data => {
      setPokemonData(data)
      setHiddenPokemon(data[Math.floor(Math.random() * data.length)])
    })

  },[])

  // let seedAbilities = () => {
  //   fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  //   .then(res => res.json())
  //   .then(apiData => {
  //     apiData.results.map (pokemon => {
  //       fetch(`${pokemon.url}`)
  //       .then(res => res.json())
  //       .then(pokemonApiData => {
  //         pokemonApiData.abilities.map(pokeAbility => {
  //           let foundAbility = abilityData.find(ability => ability.name === pokeAbility.ability.name)
  //           let foundPokemon = pokemonData.find(pokemon => pokemon.name === pokemonApiData.name)
  //           let pokemon_abilities = {
  //             ability_id: foundAbility.id,
  //             pokemon_id: foundPokemon.id
  //           }

  //           fetch('http://localhost:3000/pokemon_abilities', {
  //             method: 'POST',
  //             headers: {'Content-type':'application/json'}, 
  //             body: JSON.stringify(pokemon_abilities)
  //           })
  //         })
  //       })
  //     })
  //   })
  // }

  // seedAbilities()

  // let seedTypes = () => {
  //   fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  //   .then(res => res.json())
  //   .then(pokeAPIData => {
  //     pokeAPIData.results.map(poke => {
  //       fetch(`${poke.url}`)
  //       .then(res => res.json())
  //       .then(pokePoke => {
  //         pokePoke.types.map(type => { 
  //           let foundType = typeData.find(localType => localType.name === type.type.name)
  //           let foundPokemon = pokemonData.find(pokemon => pokemon.name === pokePoke.name)

  //           let pokemonType = {
  //             pokemon_id: foundPokemon.id,
  //             type_id: foundType.id
  //           }

  //           fetch('http://localhost:3000/pokemon_types', {
  //             method:'POST',
  //             headers: {'Content-type':'application/json'},
  //             body: JSON.stringify(pokemonType)
  //           })
  //         })
  //       })
  //     })
  //   })
  // }

  // seedTypes()

  // let seedPokemonMoves = () => {
  //   fetch('http://localhost:3000/pokemon')
  //   .then(res => res.json())
  //   .then(pokeData => {
  //     pokeData.map(pokemon => {
  //       if(pokemon.moves.length === 0) {
  //         let pokemonMove1 = {
  //           pokemon_id: pokemon.id,
  //           move_id: 921
  //         }

  //         let pokemonMove2 = {
  //           pokemon_id: pokemon.id, 
  //           move_id: 889
  //         }

  //         let pokemonMove3 = {
  //           pokemon_id: pokemon.id, 
  //           move_id: 956
  //         }

  //         let pokemonMove4 = {
  //           pokemon_id: pokemon.id,
  //           move_id: 896
  //         }

  //         fetch('http://localhost:3000/pokemon_moves', {
  //           method: 'POST',
  //           headers: {'Content-Type':'Application/json'},
  //           body: JSON.stringify(pokemonMove1)
  //         })

  //         fetch('http://localhost:3000/pokemon_moves', {
  //           method: 'POST',
  //           headers: {'Content-Type':'Application/json'},
  //           body: JSON.stringify(pokemonMove2)
  //         })

  //         fetch('http://localhost:3000/pokemon_moves', {
  //           method: 'POST',
  //           headers: {'Content-Type':'Application/json'},
  //           body: JSON.stringify(pokemonMove3)
  //         })

  //         fetch('http://localhost:3000/pokemon_moves', {
  //           method: 'POST',
  //           headers: {'Content-Type':'Application/json'},
  //           body: JSON.stringify(pokemonMove4)
  //         })
  //       }
  //     })
  //   })
  // }

  // seedPokemonMoves()

  if (currentUser === null) {
    history.push('/login')
    return (
      <div>
        <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        <div className="app-container">
          <Switch>
            <Route exact path ='/login'>
              <Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            </Route>
            <Route exact path='/signup'>
              <SignUp currentUser={currentUser} setCurrentUser={setCurrentUser}/>  
            </Route>
          </Switch>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        <div className="app-container">
          <Switch>
            <Route exact path ='/login'>
              <Login 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser}
              />
            </Route>
            <Route exact path ='/logout'>
              <Logout setCurrentUser={setCurrentUser}/>
            </Route>
            <Route exact path='/signup'>
              <SignUp currentUser={currentUser} setCurrentUser={setCurrentUser}/>  
            </Route>
            <Route exact path='/safari_zone'>
              <SafariZone/>
            </Route>
            <Route exact path='/create_a_trainer'>
              <Trainer 
                currentUser={currentUser}
                pokemonData={pokemonData}
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
                currentUser={currentUser}
                userTrainerPokemon={userTrainerPokemon}
                setUserTrainerPokemon={setUserTrainerPokemon}
                copyUserTrainerPokemon={copyUserTrainerPokemon}
                setCopyUserTrainerPokemon={setCopyUserTrainerPokemon}
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
                copyUserTrainerPokemon={copyUserTrainerPokemon}
                setCopyUserTrainerPokemon={setCopyUserTrainerPokemon}
              />
            </Route>
          </Switch>
        </div>
      </div>
    )
  }
}

export default App