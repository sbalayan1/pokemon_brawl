let UserPokemon = ({displayTeam, renderPokeBalls, userTeam, sendOutPokemon}) => {

    let renderTeam = () => (
        userTeam.map((p) => <img key={p.name} name={p.name} style={{height: '56px', width: '60px'}} alt='pokemon' className="poke-ball-battle-pokemon" src={p.front_image} onClick={sendOutPokemon}/>)
    )

    return displayTeam === false ? renderPokeBalls(userTeam) : renderTeam()
}

export default UserPokemon