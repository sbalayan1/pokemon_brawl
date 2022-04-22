import React from 'react'
import { NavLink } from 'react-router-dom'

let NavBar = ({pokeBall, currentUser}) => {
    let notLoggedIn = () => {
        return (
            <div className='NavBar'>
                <div className='logo'>
                    <img src={pokeBall} alt='pokeball'/>
                    <NavLink to="/login" exact style={{color:'crimson'}}>
                        PokemonBrawl
                    </NavLink>
                </div>
                <div className='other-links'>
                    <NavLink to="/login" exact> 
                        Login
                    </NavLink>
                    <NavLink to="/signup" exact> 
                        Sign Up
                    </NavLink>
                    <NavLink to="/logout" exact>
                        Logout
                    </NavLink>
                </div>
            </div>
        )
    }

    let loggedIn = () => {
        return (
            <div className='NavBar'>
                <div className='logo'>
                    <img src={pokeBall} alt='pokeball'/>
                    <NavLink to="/" style={{color:'crimson'}}> 
                        PokemonBrawl
                    </NavLink>
                </div>
                <div className='other-links'>
                    <NavLink to="/" exact>
                        Home
                    </NavLink>
                    <NavLink to="/safari_zone" exact> 
                        Safari Zone
                    </NavLink>
                    <NavLink to="/battle" exact> 
                        Battle
                    </NavLink>
                    <NavLink to="/my_pc" exact> 
                        My PC
                    </NavLink>
                    <NavLink to="/leaderboards" exact>
                        Leaderboards
                    </NavLink>
                    <NavLink to="/logout" exact>
                        Logout
                    </NavLink>
                </div>
            </div>
        )
    }

    return currentUser === null ? notLoggedIn() : loggedIn()
}

export default NavBar