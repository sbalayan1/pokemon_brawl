import TrainerRecord from './TrainerRecord'

let Leaderboards = ({trainers}) => {
    return (
        <div className='battle-sfzone-container'>
            <div style={{backgroundColor:'lightgray', marginTop:'10px', border:'3px solid blue'}}>
                <div style={{width:'100%'}}>
                    <h1 style={{backgroundColor:'lightgreen', margin:'10px', border:'3px solid green'}}>BATTLE LEADERBOARDS</h1>
                </div>
                {trainers.map(trainer => <TrainerRecord trainer={trainer} />)}
            </div>
        </div>
    )
}

export default Leaderboards