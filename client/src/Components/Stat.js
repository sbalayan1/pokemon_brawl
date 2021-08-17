let Stat = ({stat}) => {
    return (
        <div className="pc-select-stat">
            <p><b>HP:</b> {stat.hp}</p>
            <p><b>ATK:</b> {stat.attack}</p>
            <p><b>DEF:</b> {stat.defense}</p>
            <p><b>SPD:</b> {stat.speed}</p>
            <p><b>SP ATK:</b> {stat.sp_attack}</p>
            <p><b>SP DEF:</b> {stat.sp_defense}</p>
        </div>
    )
}

export default Stat