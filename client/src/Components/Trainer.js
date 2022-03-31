import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

let Trainer = ({pokemonData, currentUser, setUserTrainer, setOpponentTrainer, setUserTrainerPokemon, setCopyUserTrainerPokemon}) => {
    let trainerImages = ['https://archives.bulbagarden.net/media/upload/3/30/RB_Old_man_Back.png','https://archives.bulbagarden.net/media/upload/f/f2/Spr_RG_Burglar.png','https://archives.bulbagarden.net/media/upload/0/09/Spr_RG_Engineer.png','https://archives.bulbagarden.net/media/upload/e/ee/Spr_RG_Erika.png','https://archives.bulbagarden.net/media/upload/d/d7/Spr_RG_Fisherman.png','https://archives.bulbagarden.net/media/upload/a/a1/Spr_RG_Rocket.png','https://archives.bulbagarden.net/media/upload/9/96/Spr_RG_Youngster.png','https://archives.bulbagarden.net/media/upload/1/1e/Spr_RG_Oak.png']

    const [trainerName, setTrainerName]= useState(null)
    const [genderState, setGenderState]= useState(null)
    const [starterPokemon, setStarterPokemon] = useState(null)
    const [count, setCount]=useState(0)
    const [trainer, setTrainer] = useState(null)
    const [createdNewTrainer, setCreatedNewTrainer] = useState(false)
    const history = useHistory();
    const [charmander, setCharmander] = useState(null)
    const [bulbasaur, setBulbasaur] = useState(null)
    const [squirtle, setSquirtle] = useState(null)

    let handleGenderChange = (e) => {
        if (e.target.value === 'boy'){
            setGenderState(true)
        } else {
            setGenderState(false)
        }
    }

    let navigateTrainerAvatars = (e) => {
        if(e.target.value === 'left'&& count<=trainerImages.length){
            setCount(count-1)
        }

        if(e.target.value === 'right'&& count<trainerImages.length) {
            setCount(count+1)
        } else if (e.target.value === 'right' && count === trainerImages.length) {
            alert("End of the list. Go left")
        } 
    }

    let selectTrainerAvatar = (e) => {
        setTrainer(trainerImages[count])
    }

    let handleClick = (e) => {
        setTrainerName(e.target.previousSibling.value)
    }

    let selectPokemon = (e) => {
        setStarterPokemon(e.target)
    }

    let fetchStarters = async () => {
        try {
            let bulb = await fetch('http://localhost:3000/pokemon/1')
            let char = await fetch('http://localhost:3000/pokemon/4')
            let squir = await fetch('http://localhost:3000/pokemon/7')
            let data = await Promise.all([bulb, char, squir])
            let dataPromises = data.map(res => res.json())
            let results = await Promise.all(dataPromises)
            return results

        } catch (error) {
            console.error(error)
        }
    }

    let postNewTrainer = async (trainer) => {
        try {
            let response = await fetch('http://localhost:3000/trainers', {
                method: 'POST',
                headers: {'Content-type':'Application/json'},
                body: JSON.stringify(trainer)
            })

            let data = await response.json
            return data
        } catch (error) {
            console.error(error)
        }
    }

    let takePokedex = () => {
        let newTrainer = {
            name: trainerName,
            gender: genderState,
            img_url: trainer,
            user_id: currentUser.id
        }

        postNewTrainer(newTrainer)
        setCreatedNewTrainer(true)
    }

    let startJourney = () => {
        let localPokemon = pokemonData.find(pokemon => pokemon.name === starterPokemon.alt)

        fetch('http://localhost:3000/trainers')
        .then(res => res.json())
        .then(data => {
            let pokemonTeam = {
                pokemon_id: localPokemon.id, 
                trainer_id: data[data.length-1].id,
                team_member: true
            }

            fetch('http://localhost:3000/pokemon_teams', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify(pokemonTeam)
            })

            setUserTrainer(data.find(trainer=> trainer.user_id === currentUser.id))
            let opponentTrainers = data.filter(trainer => trainer.user_id !== currentUser.id)
            setOpponentTrainer(opponentTrainers[Math.floor(Math.random() * opponentTrainers.length)])
            setUserTrainerPokemon(data.find(trainer=> trainer.user_id === currentUser.id).pokemon)
            setCopyUserTrainerPokemon(data.find(trainer=> trainer.user_id === currentUser.id).pokemon)

        })

        history.push('/battle')
    }

    useEffect(() => {
        fetchStarters().then(data => {
            setBulbasaur(data[0])
            setCharmander(data[1])
            setSquirtle(data[2])
        })
    }, [])

    return (
        <div className="trainer-container">
            <div className="create-trainer-container">
                <div className="trainer-form">
                    <img src="https://png.pngitem.com/pimgs/s/5-56389_professor-oak-based-on-professor-oak-pokemon-hd.png" alt="oak-image"/>
                    {genderState === null || trainer === null ?
                        <div className='trainer-form-card-1'>
                            <h4>Hello there!</h4>
                            <p style={{fontSize:'12px'}}>Welcome to the world of pokémon! My name is Oak! People call me the pokémon Prof! This world is inhabited by creatures called Pokémon! For some people, pokémon are pets. Others use them for fights. Myself...I study pokémon as a profession. <b>Are you a boy or a girl?</b></p>
                            <select onChange={handleGenderChange}>
                                <option>Select</option>
                                <option>Boy</option>
                                <option>Girl</option>
                            </select>
                            <div className="trainer-image-container">
                                <button className="trainer-image-select-button" onClick={navigateTrainerAvatars} value="left">{'<-'}</button>
                                <img className="trainer-image-select" src={trainerImages[count]} alt='trainer-image'/>
                                <button className="trainer-image-select-button" onClick={navigateTrainerAvatars} value="right">{'->'}</button>
                                <button onClick={selectTrainerAvatar}>select</button>
                            </div>
                        </div>
                    :
                        null
                    }
        
                    {genderState !== null && trainer !== null && trainerName === null ?
                        <div style={{height:'500px'}}>
                            <p>Erm, what was your name again?</p>
                            <input className="trainer-input" type="text" value={trainerName}/>
                            <button onClick={handleClick} type="button">Submit</button>
                        </div>
                    :
                        null
                    }

                    {genderState !== null && trainerName !== null && starterPokemon===null?
                        <p style={{fontSize:'12px'}}>Right! So your name is <b>{trainerName}</b>! Your very own Pokemon lengend is about to unfold! A world of dreams and adventures with Pokemon awaits! Let's go!</p>
                    : 
                        null
                    }

                    {trainerName !== null && genderState !== null && starterPokemon===null ? 
                        <div>
                            <p style={{fontSize:'12px'}}>Oh, that's right. Just wait! Here <b>{trainerName}</b>! There are 3 Pokémon here! Haha! They are inside the Poké Balls. When I was young, I was a serious Pokémon trainer! In my old age, I have only 3 left, but you can have one! Choose!</p>
                            <div className="trainer-starter-card">
                                <div>
                                    <img className="home-image-thumbnail" src={charmander.front_image} alt="charmander" onClick={selectPokemon} value='fire'/>
                                </div>
                                <div>
                                    <img className="home-image-thumbnail" src={squirtle.front_image} alt="squirtle" onClick={selectPokemon} value='water'/>
                                </div>
                                <div>
                                    <img className="home-image-thumbnail" src={bulbasaur.front_image} alt="bulbasaur" onClick={selectPokemon} value='plant'/>
                                </div>
                            </div>
                        </div>
                    :
                        null
                    }


                    {starterPokemon !== null && createdNewTrainer === false?
                        <div>
                            <img className="home-image-thumbnail" src={starterPokemon.src} alt={starterPokemon.alt} value={starterPokemon.value}/>
                            <p style={{fontSize:'12px'}}>"So! You want the {starterPokemon.value} Pokémon, {starterPokemon.alt}? This Pokemon is really energetic! Oh, right! I have a request for you. On the desk there is my invention, Pokédex! It automatically records data on Pokémon you've seen or caught! It's a hi-tech encyclopedia! Take this with you!</p>
                            <img className="home-image-thumbnail" src='https://i.gifer.com/DEUr.gif' alt='pokedex'/>
                            <button onClick={takePokedex}>Take Pokedex</button>
                        </div>
                    :
                        null
                    }

                    {createdNewTrainer === true ? 
                        <div>
                            <p style={{fontSize:'12px'}}>To make a complete guide on all the Pokémon in the world… That was my dream! But, I'm too old! I can't do it! So, I want you to fulfill my dream for me! Get moving! This is a great undertaking in Pokémon history!</p>
                            <img className="home-image-thumbnail" src='https://i.gifer.com/DEUr.gif' alt='pokedex'/>
                            <button onClick={startJourney}>Start</button>
                        </div>

                    :
                        null 
                    }


                </div>
            </div>
            <div className="footer" style={{height: '3%', width:'100%'}}>Copyright 2021 - SeanB</div>
        </div>
    )
}

export default Trainer
