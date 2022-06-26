import LegendaryBird from './LegendaryBird'

let LegendaryBirds = ({legendBirds}) => {
    return (
        <div className="home-pokemon-description-container">
            {legendBirds.map(bird => 
                <LegendaryBird 
                    key={bird.name} 
                    name={bird.name}
                    front_image={bird.front_image}
                    types={bird.types}
                    ability={bird.abilities[1]}
                />
            )}
            
        </div>
    )
}

export default LegendaryBirds