import {useState} from 'react'
import {useHistory} from 'react-router-dom'

let Trainer = ({pokemonData, currentUser}) => {

    let trainerImages = ['https://archives.bulbagarden.net/media/upload/3/30/RB_Old_man_Back.png','https://archives.bulbagarden.net/media/upload/3/30/Spr_RG_Beauty.png','https://archives.bulbagarden.net/media/upload/f/fd/Spr_RG_Bird_Keeper.png','https://archives.bulbagarden.net/media/upload/4/48/Spr_RG_Blackbelt.png','https://archives.bulbagarden.net/media/upload/3/38/Spr_RG_Blue_2.png','https://archives.bulbagarden.net/media/upload/3/3f/Spr_RG_Bug_Catcher.png','https://archives.bulbagarden.net/media/upload/f/f2/Spr_RG_Burglar.png','https://archives.bulbagarden.net/media/upload/9/92/Spr_RG_Channeler.png','https://archives.bulbagarden.net/media/upload/0/0f/Spr_RG_Cooltrainer_M.png','https://archives.bulbagarden.net/media/upload/0/09/Spr_RG_Engineer.png','https://archives.bulbagarden.net/media/upload/e/ee/Spr_RG_Erika.png','https://archives.bulbagarden.net/media/upload/d/d7/Spr_RG_Fisherman.png','https://archives.bulbagarden.net/media/upload/7/7f/Spr_RG_Gambler.png','https://archives.bulbagarden.net/media/upload/0/08/Spr_RG_Gentleman.png','https://archives.bulbagarden.net/media/upload/6/62/Spr_RG_Hiker.png','https://archives.bulbagarden.net/media/upload/3/36/Spr_RG_Juggler.png','https://archives.bulbagarden.net/media/upload/2/29/Spr_RG_Lass.png','https://archives.bulbagarden.net/media/upload/b/b0/Spr_RG_Koga.png','https://archives.bulbagarden.net/media/upload/5/5d/Spr_RG_Psychic.png','https://archives.bulbagarden.net/media/upload/a/a1/Spr_RG_Rocket.png','https://archives.bulbagarden.net/media/upload/5/54/Spr_RG_Sailor.png','https://archives.bulbagarden.net/media/upload/5/51/Spr_RG_Blue_3.png','https://archives.bulbagarden.net/media/upload/5/58/Spr_RG_Lorelei.png','https://archives.bulbagarden.net/media/upload/7/76/Spr_RG_Bruno.png','https://archives.bulbagarden.net/media/upload/b/b8/Spr_RG_Swimmer.png','https://archives.bulbagarden.net/media/upload/9/96/Spr_RG_Youngster.png','https://archives.bulbagarden.net/media/upload/1/1e/Spr_RG_Oak.png','https://archives.bulbagarden.net/media/upload/d/d0/Spr_RG_Jr_Trainer_F.png','https://archives.bulbagarden.net/media/upload/2/2d/Spr_RG_Misty.png']

    const [trainerName, setTrainerName]= useState(null)
    const [genderState, setGenderState]= useState(null)
    const [starterPokemon, setStarterPokemon] = useState(null)
    const [count, setCount]=useState(0)
    const [trainer, setTrainer] = useState(null)
    const history = useHistory()

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

    let startJourney = () => {
        console.log(currentUser)

        // let newTrainer = {
        //     name: trainerName,
        //     gender: genderState,
        //     img_url: starterPokemon.src,
        //     user_id: currentUser.id
        // }

        // fetch('http://localhost:3000/trainers',{
        //     method: 'POST',
        //     headers: {'Content-type':'Application/json'},
        //     body: JSON.stringify(newTrainer)
        // })

        let localPokemon = pokemonData.find(pokemon => pokemon.name === starterPokemon.alt)
        let pokemonTeam = {
            pokemon_id: localPokemon.id, 
            trainer_id: currentUser.trainer.id,
            team_member: true
        }

        fetch('http://localhost:3000/pokemon_teams', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(pokemonTeam)
        })

        history.push('/battle')
    }

    return (
        <div className="trainer-container">
            <div className="create-trainer-container">
                <div className="trainer-form">
                    <img src="https://png.pngitem.com/pimgs/s/5-56389_professor-oak-based-on-professor-oak-pokemon-hd.png" alt="oak-image"/>
                    {genderState === null || trainer === null ?
                        <div className='trainer-form-card-1'>
                            <h4>Hello there!</h4>
                            <p>Welcome to the world of pokémon! My name is Oak! People call me the pokémon Prof! This world is inhabited by creatures called Pokémon! For some people, pokémon are pets. Others use them for fights. Myself...I study pokémon as a profession. <b>Are you a boy or a girl?</b></p>
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
                        <div>
                            <p>Erm, what was your name again?</p>
                            <input className="trainer-input" type="text" value={trainerName}/>
                            <button onClick={handleClick} type="button">Submit</button>
                        </div>
                    :
                        null
                    }

                    {genderState !== null && trainerName !== null && starterPokemon===null?
                        <p>Right! So your name is <b>{trainerName}</b>! Your very own Pokemon lengend is about to unfold! A world of dreams and adventures with Pokemon awaits! Let's go!</p>
                    : 
                        null
                    }

                    {trainerName !== null && genderState !== null && starterPokemon===null ? 
                        <div>
                            <p>Oh, that's right. Just wait! Here <b>{trainerName}</b>! There are 3 Pokémon here! Haha! They are inside the Poké Balls. When I was young, I was a serious Pokémon trainer! In my old age, I have only 3 left, but you can have one! Choose!</p>
                            <div className="trainer-starter-card">
                                <div>
                                    <img className="home-image-thumbnail" src={pokemonData[23].front_image} alt="charmander" onClick={selectPokemon} value='fire'/>
                                </div>
                                <div>
                                    <img className="home-image-thumbnail" src={pokemonData[5].front_image} alt="squirtle" onClick={selectPokemon} value='water'/>
                                </div>
                                <div>
                                    <img className="home-image-thumbnail" src={pokemonData[0].front_image} alt="bulbasaur" onClick={selectPokemon} value='plant'/>
                                </div>
                            </div>
                        </div>
                    :
                        null
                    }


                    {starterPokemon !== null ?
                        <div>
                            <img className="home-image-thumbnail" src={starterPokemon.src} alt={starterPokemon.alt} value={starterPokemon.value}/>
                            <p>"So! You want the {starterPokemon.value} Pokémon, {starterPokemon.alt}? This Pokemon is really energetic! Oh, right! I have a request for you. On the desk there is my invention, Pokédex! It automatically records data on Pokémon you've seen or caught! It's a hi-tech encyclopedia! Take this with you! To make a complete guide on all the Pokémon in the world… That was my dream! But, I'm too old! I can't do it! So, I want you to fulfill my dream for me! Get moving! This is a great undertaking in Pokémon history!</p>
                            <button onClick={startJourney}>Start</button>
                        </div>
                    :
                        null
                    }


                </div>
            </div>
            <div className="footer" style={{height: '3%', width:'100%'}}>Copyright</div>
        </div>
    )
}

export default Trainer



// <div className="trainer-form">
//                         <img src="https://png.pngitem.com/pimgs/s/5-56389_professor-oak-based-on-professor-oak-pokemon-hd.png" alt="oak-image"/>
//                         {genderState === null ?
//                             <div className='trainer-form-card-1'>
//                                 <h4>Hello there!</h4>
//                                 <p>Welcome to the world of pokémon! My name is Oak! People call me the pokémon Prof! This world is inhabited by creatures called Pokémon! For some people, pokémon are pets. Others use them for fights. Myself...I study pokémon as a profession. <b>Are you a boy or a girl?</b></p>
//                                 <select onChange={handleGenderChange}>
//                                     <option>Select</option>
//                                     <option>Boy</option>
//                                     <option>Girl</option>
//                                 </select>
//                             </div>
//                         :
//                             null
//                         }
    
//                         {genderState !== null && trainerName === null ?
//                             <div>
//                                 <p>Erm, what was your name again?</p>
//                                 <input className="trainer-input" type="text" value={trainerName}/>
//                                 <button onClick={handleClick} type="button">Submit</button>
//                             </div>
//                         :
//                             null
//                         }

//                         {genderState !== null && trainerName !== null ?
//                             <p>Right! So your name is <b>{trainerName}</b>! Your very own Pokemon lengend is about to unfold! A world of dreams and adventures with Pokemon awaits! Let's go!</p>
//                         : 
//                             null
//                         }

//                         {trainerName !== null && genderState !== null ? 
//                             <div>
//                                 <p>Oh, that's right. Just wait! Here <b>{trainerName}</b>! There are 3 Pokémon here! Haha! They are inside the Poké Balls. When I was young, I was a serious Pokémon trainer! In my old age, I have only 3 left, but you can have one! Choose!</p>
//                                 <div className="trainer-starter-card">
//                                     <div>
//                                         <img className="home-image-thumbnail" src={pokemonData[23].front_image} alt="charmander" onClick={selectPokemon} value='charmander'/>
//                                     </div>
//                                     <div>
//                                         <img className="home-image-thumbnail" src={pokemonData[5].front_image} alt="squirtle" onClick={selectPokemon} value='squirtle'/>
//                                     </div>
//                                     <div>
//                                         <img className="home-image-thumbnail" src={pokemonData[0].front_image} alt="bulbasaur" onClick={selectPokemon} value='bulbasaur'/>
//                                     </div>
//                                 </div>
//                             </div>
//                         :
//                             null
//                         }

//                     </div>