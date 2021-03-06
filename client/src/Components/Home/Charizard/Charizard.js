import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { Paper } from '@mui/material'
import './style.css'

let Charizard = ({ pokeBall }) => {
    const history = useHistory()
    const [viewCharizard, setViewCharizard] = useState(true)

    let handleBattle = () => {
        history.push('/battle')
    }

    let handleViewCharizard = () => {
        setViewCharizard(!viewCharizard)
    }

    let renderDescriptionCard = () => {
        return (
            <Card className="game-description-card">
                <div style={{ height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <h2 style={{ marginLeft: '5px' }}>Pokemon Brawl is a Pokemon Battle simulator.</h2>
                    <p style={{ marginLeft: '10px', marginTop: '10px'}}><small>Play Pokémon battles online! Play with randomly generated teams, or build your own!</small></p>
                    <Button style={{margin: '5px'}} variant="contained" className="home-button" onClick={handleBattle}>Battle</Button>
                </div>
                <div style={{ backgroundColor: 'darkgrey', width: '100%', height: '20%' }}></div>
            </Card>
        )
    }

    let renderCharizard = () => {
        return viewCharizard === true ? 
            <img className="charizard-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" alt="charizard" onClick={handleViewCharizard} />
        :
            <img className="gengar-image" src="https://pa1.narvii.com/5739/0cfc841303d738f67cdb9e5f286606c0ae1ab749_hq.gif" alt="Nidoran vs Gengar" onClick={handleViewCharizard} />
    }

    let renderCharizardCard = () => {
        return (
            <Card className="charizard-container">
                <div className="charizard-card">
                    {renderCharizard()}
                    <Paper className="charizard-details-card">
                        <div className='charizard-header'>
                            <img className="pokeball" src={pokeBall.current} alt="pokeball" />
                            <h5>006 Charizard</h5>
                        </div>
                        <p className='details'><small>Flame Pokemon</small></p>
                        <div style={{display:'flex'}} >
                            <div className='details'>
                                <h5>Fire</h5>
                                <h5>Flying</h5>
                            </div>
                            <div className='details'>
                                <h6>HT: 5'07"</h6>
                                <h6>WT: 199.5lbs</h6>
                            </div>
                        </div>
                    </Paper>
                </div>
                <div className="charizard-description-card" background="dark">
                    IF Charizard becomes furious, the flame at the tip of its tail flares up in a light blue shade.
                </div>
            </Card>
        )
    }


    return (
        <div className="home-container">
            {renderDescriptionCard()}
            {renderCharizardCard()}
        </div>
    )
}

export default Charizard