import {useState, useEffect} from 'react'

let LegendaryBird = ({name, front_image, types, ability}) => {
    const [displayBird, setDisplayBird] = useState(true)
    const [abilityDescription, setAbilityDescription] = useState(null)
    let abilityURL = ability.ability.url

    let viewBird = () => {
        setDisplayBird(!displayBird)
    }

    let colorType = {
        flying: 'lightgrey',
        fire: 'red',
        water: 'blue',
        electric: 'yellow',
        ice: 'lightblue', 
        // grass: 'green',
        // poison: 'plum',
        // normal: 'white',
        // bug: 'lightgreen', 
        // ground: 'burlywood', 
        // fairy: 'lightpink', 
        // fighting: 'darkred', 
        // psychic:'pink', 
        // rock: 'brown', 
        // steel: 'grey', 
        // ghost: 'purple',
        // dragon: 'darkblue'
    }

    useEffect(() => {
        fetch(abilityURL)
        .then(res => res.json())
        .then(data => {
            setAbilityDescription(data.flavor_text_entries[0].flavor_text)
        })
    },[])
    
    return (
        <div className="home-pokemon-description-card" style={{backgroundColor:'lightyellow'}}>
            {displayBird === true ? 
                <img style={{backgroundColor:'lightgreen'}} className="home-image-thumbnail" src={`${front_image}`}  alt="pokemon" onClick={viewBird}/>
            :
                <img style={{height:'100px'}} className="home-image-thumbnail" src='https://64.media.tumblr.com/283d7a9b2d425f3b9bc526fa544c2415/tumblr_olpgcl6z5p1rc40z5o2_500.gifv'  alt="pokemon" onClick={viewBird}/>
            }

            <p>{name[0].toUpperCase() + name.slice(1)}</p>
            <div className="home-poke-type-card">
                <p style={{
                    backgroundColor: colorType[types[0]]}}>
                    <small>{types[0][0].toUpperCase() + types[0].slice(1)}</small><br/>
                </p>

                <p style={{backgroundColor: colorType['flying']}}>
                    <small style={{backgroundColor: colorType['flying']}}>
                        Flying
                    </small>
                </p>
            </div>
            <h4>Stats</h4>
            {/* {zapdos.stats.map(stat => {
                return (<Stat stat={stat}/>)
            })} */}
            <div className="home-poke-ability-card">
                <h5 style={{margin:'5px'}}>
                    {ability.ability.name[0].toUpperCase() + ability.ability.name.slice(1)}
                </h5>
                <p style={{margin:'5px', fontSize:'12px'}}>
                    {abilityDescription}
                </p>
                <h5 style={{margin:'5px', fontSize:'12px'}}>
                    Pressure
                </h5>
                <p style={{margin:'5px', fontSize:'12px'}}>
                    Raises foe's PP usage.
                </p>

            </div>
        </div>
    )

}

export default LegendaryBird