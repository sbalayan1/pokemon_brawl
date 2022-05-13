import PokeBallBattle from './PokeBallBattle'

let UserPokemon = ({displayTeam, pokeBall, userTeam, sendOutPokemon}) => {

    let renderPokeBalls = () => (
        userTeam.map((p) => <PokeBallBattle key={p.name} pokeBall={pokeBall}/>)
    )

    let renderTeam = () => (
        userTeam.map((p) => <img key={p.name} name={p.name} style={{height: '56px', width: '60px'}} alt='pokemon' className="poke-ball-battle-pokemon" src={p.front_image} onClick={sendOutPokemon}/>)
    )

    return (
        <div className="trainer-battle-pokeball-container">
            {displayTeam === false ? renderPokeBalls() : renderTeam()}
        </div> 
    )
}

export default UserPokemon