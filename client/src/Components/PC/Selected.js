import React, {useState} from 'react'
import Ability from './Ability'
import Move from './Move'

function Selected({selected, closeSelectedPokemonTab, typeCount}) {
    const [sliceObj, setSliceObj] = useState({
        start: 0, 
        end: 25
    })

    const [scrollStart, setScrollStart] = useState(0)

    let handleScroll = (e) => {
        let scrollEnd = e.target.scrollTop
        if (scrollStart < scrollEnd) {
            sliceObj.start += 1
            sliceObj.end += 1
        
        } else if (scrollStart > scrollEnd) {
            sliceObj.start -= 1
            sliceObj.end -= 1
        }
        
        setScrollStart(scrollEnd)
        setSliceObj(sliceObj)
    }

    //whenever user scrolls down the list, 25 moves should be shown. It's not that we should cut from the list, we should be adjusting what to display.
    let renderMoves = (moves) => {
        let arrayOfMoves = moves.slice(sliceObj.start, sliceObj.end)
        return arrayOfMoves.map(move => <Move key={move.name} move={move} />)
    }


    return (
        <div className="pc-select-pokemon-card">
            <div className="select-poke-card">
                <button className="select-poke-button" style={{ backgroundColor: 'Red' }} onClick={closeSelectedPokemonTab}>X</button>
            </div>
            <h3>{selected.name}</h3>
            <img className="pokemon-pc-sprite" style={{ height: '40%', width: '40%' }} src={selected.front_image} alt="pokemon" />
            {typeCount === 2 ?
                <div className="pc-select-type">
                    <h4>Types:</h4>
                    {/* <p style={{ backgroundColor: colorType.find(findType => findType.type === [...new Map(selected.types.map(type => [type['name'], type])).values()][0].name).color }}>{[...new Map(selected.types.map(type => [type['name'], type])).values()][0].name}</p> */}
                    {/* <p style={{ backgroundColor: colorType.find(findType => findType.type === [...new Map(selected.types.map(type => [type['name'], type])).values()][1].name).color }}>{[...new Map(selected.types.map(type => [type['name'], type])).values()][1].name}</p> */}
                </div>
                :
                null
            }

            {typeCount === 1 ?
                <div className="pc-select-type">
                    <h4>Type:</h4>
                    {/* <p style={{ backgroundColor: colorType.find(findType => findType.type === [...new Map(selected.types.map(type => [type['name'], type])).values()][0].name).color }}>{[...new Map(selected.types.map(type => [type['name'], type])).values()][0].name}</p> */}
                </div>

                :
                null
            }

            <div>
                <h4>Stats</h4>
                <div className="pc-select-stat-2">
                    <p><b>HP:</b> {selected.stats.hp}</p>
                    <p><b>ATK:</b> {selected.stats.attack}</p>
                    <p><b>DEF:</b> {selected.stats.defense}</p>
                    <p><b>SPD:</b> {selected.stats.speed}</p>
                    <p><b>SP ATK:</b> {selected.stats["special-attack"]}</p>
                    <p><b>SP DEF:</b> {selected.stats["special-defense"]}</p>
                </div>
            </div>
            <div className="pc-select-ability">
                <h4>Abilities</h4>
                {selected.abilities.map(ability => <Ability key={ability.ability.name} ability={ability.ability}/>)}
            </div>
            <div className="pc-select-move" onScroll={handleScroll}>
                <h4>Moves</h4>
                {renderMoves(selected.moves)}
            </div>
        </div>
    )
}

export default Selected