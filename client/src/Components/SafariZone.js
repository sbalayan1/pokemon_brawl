let SafariZone = () => {

    let handleClick = (e) => {
        console.log(e.target.value)
    }
    
    return (
        <div className="battle-sfzone-container">
            <div className="zone-container">
                <div className="stats-card">
                    <div className="hp-card">
                        <p>HP:</p>
                        <p>LVL:</p>
                    </div>
                    <div className="attack-card">
                        <p><small>Attack:</small></p>
                        <p><small>Defense:</small></p>
                        <p><small>SP Attack:</small></p>
                        <p><small>SP Defense:</small></p>
                        <p><small>Speed:</small></p>
                    </div>
                </div>
                <img className="zone-image-card"/>
            </div>
            <div className="zone-container">
                <img className="zone-image-card"/>
                <div className="trainer-decision-making-container">
                    <div className="trainer-stats-card">
                        <div className="hp-card">
                            <p>HP:</p>
                            <p>LVL:</p>
                        </div>
                        <div className="attack-card">
                            <p><small>Attack:</small></p>
                            <p><small>Defense:</small></p>
                            <p><small>SP Attack:</small></p>
                            <p><small>SP Defense:</small></p>
                            <p><small>Speed:</small></p>
                        </div>

                    </div>
                    <div className="move-card">
                        <button className="action-button" onClick={handleClick} value="Throw a PokeBall">Throw a PokeBall</button>
                        <button className="action-button" onClick={handleClick} value="Throw food">Throw food</button>
                        <button className="action-button" onClick={handleClick} value="Throw a rock">Throw a rock</button>
                        <button className="action-button" onClick={handleClick} value="Flee">Flee</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SafariZone