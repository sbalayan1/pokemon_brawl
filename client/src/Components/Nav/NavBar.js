import Link from './Link'
import {NavLink} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

let NavBar = ({pokeBall, currentUser}) => {
    let notLoggedInPaths = ['Login', 'Sign Up', 'Logout']
    let loggedInPaths = ['Home', 'Safari Zone', 'Battle', 'My PC', 'Leaderboards', 'Logout']
    let notLoggedIn = notLoggedInPaths.map(path => (
        <Link key={path} path={path}/>
    ))
    let loggedIn = loggedInPaths.map(path => (
        <Link key={path} path={path}/>
    ))

    let renderNavBar = () => {
        return (
            <div className='navbar-container'>
                <AppBar>  
                    <Toolbar>
                        <Typography 
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            }}>
                                <NavLink to="/" className="logo" >
                                    {pokeBall ? <img src={pokeBall} alt='pokeball'/> : null}
                                    PokemonBrawl
                                </NavLink>
                        </Typography>
                        {/* <NavLink to="/" exact style={{textDecoration: 'none'}} className="logo"> 
                            {pokeBall ? <img src={pokeBall} alt='pokeball'/> : null}
                            PokemonBrawl
                        </NavLink> */}
                        {currentUser ? loggedIn : notLoggedIn}
                    </Toolbar>  
                </AppBar>
            </div>
        )
    }

    return renderNavBar()
}

export default NavBar