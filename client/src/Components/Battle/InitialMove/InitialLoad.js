import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

let InitialLoad = ({setInitialBattleLoad, opponentTrainer}) => {
    let opponentTrainers = ['https://archives.bulbagarden.net/media/upload/3/30/RB_Old_man_Back.png','https://archives.bulbagarden.net/media/upload/f/f2/Spr_RG_Burglar.png','https://archives.bulbagarden.net/media/upload/0/09/Spr_RG_Engineer.png','https://archives.bulbagarden.net/media/upload/e/ee/Spr_RG_Erika.png','https://archives.bulbagarden.net/media/upload/d/d7/Spr_RG_Fisherman.png','https://archives.bulbagarden.net/media/upload/a/a1/Spr_RG_Rocket.png','https://archives.bulbagarden.net/media/upload/9/96/Spr_RG_Youngster.png','https://archives.bulbagarden.net/media/upload/1/1e/Spr_RG_Oak.png']

    let randomNumber = Math.floor(Math.random() * opponentTrainers.length)
    let startBattle = () => {
        setInitialBattleLoad(false)
    }

    return (                
        <Paper elevation={24} className="battle-sfzone-container-load" style={{marginTop:'10px'}}>
            <Paper className="zone-container" elevation={24} style={{backgroundImage:'url(https://www.models-resource.com/resources/big_icons/22/21700.png)', backgroundSize:'100% 100%', height: '50%'}}>
                <img className="zone-image-card" src={opponentTrainers[randomNumber]} />
            </Paper>
            <p className="battle-p-tag-load" style={{marginLeft: '20px'}}>Trainer {opponentTrainer ? opponentTrainer.name : 'Opponent'} wants to battle!</p>
            <Button size='small' variant='contained' onClick={startBattle}>Start</Button>
        </Paper>
    )
}

export default InitialLoad