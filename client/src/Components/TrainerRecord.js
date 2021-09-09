let TrainerRecord = ({trainer}) => {
    const totalBattles = trainer.battles.length
    const wins = trainer.battles.filter(battle => battle.win_loss === true).length
    const loss = trainer.battles.filter(battle => battle.win_loss === false).length
 
    return (
        <div style={{display:'flex', width: '100%', justifyContent:'space-between'}}>
            <h5 style={{color:'crimson', marginLeft: '5px'}}>NAME: {trainer.name}</h5>
            <p>W: {wins}</p>
            <p>L: {loss}</p>
            <p>Battles: {totalBattles}</p>
            <p style={{backgroundColor:'gold'}}>W/L Ratio: {totalBattles === 0 ? 0 : Math.round(wins/loss)}</p>
        </div>
    )
}

export default TrainerRecord