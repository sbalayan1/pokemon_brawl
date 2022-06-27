import Link from './Link'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import {useMediaQuery} from 'react-responsive'

let NavBar = ({pokeBall, currentUser}) => {
    let isMobile = useMediaQuery({ query: '(max-width: 980px)' })
    let notLoggedInPaths = isMobile ? ['Login', 'Logout'] : ['Login', 'Sign Up', 'Logout']
    let loggedInPaths = isMobile ? ['Battle', 'PC', 'Logout'] : ['Home', 'Safari Zone', 'Battle', 'My PC', 'Leaderboards', 'Logout']

    let notLoggedIn = notLoggedInPaths.map(path => (
        <Link key={path} path={path}/>
    ))
    let loggedIn = loggedInPaths.map(path => (
        <Link key={path} path={path}/>
    ))

    let letterSpacing = isMobile ? '.2rem' : '.3rem'

    let renderNavBar = () => {
        return (
            <div className='navbar-container'>
                <AppBar>  
                    <Toolbar>
                        <Typography 
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: {letterSpacing},
                                color: 'inherit',
                                textDecoration: 'none',
                            }}>
                                {pokeBall.current ? <img src={pokeBall.current} alt='pokeball'/> : null}
                                {isMobile ? 'PokeBrawl' : 'PokemonBrawl'}
                        </Typography>
                        {currentUser ? loggedIn : notLoggedIn}
                    </Toolbar>  
                </AppBar>
            </div>
        )
    }

    return renderNavBar()
}

export default NavBar