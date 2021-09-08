import React from 'react'
import { NavLink } from 'react-router-dom'

let NavBar = ({pokeBall}) => {
    return (
        <div className='NavBar'>
            <div className='logo'>
                <img src={pokeBall} alt='pokeball'/>
                <NavLink 
                    to="/"
                 style={{color:'crimson'}}> PokemonBrawl
                </NavLink>
            </div>
            <div className='other-links'>
                <NavLink
                    to="/"
                    exact
                > Home
                </NavLink>
                <NavLink
                    to="/safari_zone"
                    exact                 
                > Safari Zone
                </NavLink>
                <NavLink
                    to="/battle"
                    exact            
                > Battle
                </NavLink>
                <NavLink
                    to="/my_pc"
                    exact              
                > My PC
                </NavLink>
                <NavLink
                    to="/leaderboards"
                    exact

                >Leaderboards
                </NavLink>
                <NavLink
                    to="/logout"
                    exact
                >Logout
                </NavLink>
            </div>
        </div>
    )
}

export default NavBar