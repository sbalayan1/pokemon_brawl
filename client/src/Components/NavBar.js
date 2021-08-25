import React from 'react'
import { NavLink } from 'react-router-dom'

const linkStyles = {
    width: "25px",
    padding: "12px",
    margin: "0 6px 6px",
    background: "black",
    textDecoration: "none",
    color: "white",
  };

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
                    // style={{linkStyles}}
                    // activeStyle={{background: 'white'}}
                > Home
                </NavLink>
                <NavLink
                    to="/safari_zone"
                    exact
                    // style={{linkStyles}}
                    // activeStyle={{background: 'white'}}
                > Safari Zone
                </NavLink>
                <NavLink
                    to="/battle"
                    exact
                    // style={{linkStyles}}
                    // activeStyle={{background: 'white'}}
                > Battle
                </NavLink>
                <NavLink
                    to="/my_pc"
                    exact
                    // style={{linkStyles}}
                    // activeStyle={{background: 'white'}}
                > My PC
                </NavLink>
                <NavLink
                    to="/leaderboards"
                    exact
                    // style={{linkStyles}}
                    // activeStyle={{background: 'white'}}
                >Leaderboards
                </NavLink>
                <NavLink
                    to="/logout"
                    exact
                    // style={{linkStyles}}
                    // activeStyle={{background: 'white'}}
                >Logout
                </NavLink>
            </div>
        </div>
    )
}

export default NavBar