import Link from './Link'
import {NavLink} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';

let NavBar = ({pokeBall, currentUser}) => {
    let notLoggedInPaths = ['Login', 'Sign Up', 'Logout']
    let loggedInPaths = ['Home', 'Safari Zone', 'Battle', 'My PC', 'Leaderboards', 'Logout']
    let loggedIn = notLoggedInPaths.map(path => <Link key={path} path={path}/>)
    let notLoggedIn = loggedInPaths.map(path => <Link key={path} path={path}/>)
    
    let renderNavBar = () => {
        return (
            <AppBar className='NavBar' position="fixed">
                <div className='logo'>
                    {pokeBall ? <img src={pokeBall} alt='pokeball'/> : null}
                    <NavLink to="/" exact style={{textDecoration: 'none'}}> 
                        PokemonBrawl
                    </NavLink>
                </div>
                <div className='other-links'>
                    {currentUser === null ? loggedIn : notLoggedIn}
                </div>
            </AppBar>
        )
    }

    return renderNavBar()
}

export default NavBar