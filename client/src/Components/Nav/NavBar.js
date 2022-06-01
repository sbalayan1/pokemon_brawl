import Link from './Link'
import {NavLink} from 'react-router-dom'

let NavBar = ({pokeBall, currentUser}) => {
    let notLoggedInPaths = ['Login', 'Sign Up', 'Logout']
    let loggedInPaths = ['Home', 'Safari Zone', 'Battle', 'My PC', 'Leaderboards', 'Logout']

    let renderNotLogged = notLoggedInPaths.map(path => <Link key={path} path={path}/>)

    let renderLoggedIn = loggedInPaths.map(path => <Link key={path} path={path}/>)
    
    let notLoggedIn = () => {
        return (
            <div className='NavBar'>
                <div className='logo'>
                    {pokeBall ? <img src={pokeBall} alt='pokeball'/> : null}
                    <NavLink to="/login" exact style={{textDecoration: 'none'}}>
                        PokemonBrawl
                    </NavLink>
                </div>
                <div className='other-links'>
                    {renderNotLogged}
                </div>
            </div>
        )
    }

    let loggedIn = () => {
        return (
            <div className='NavBar'>
                <div className='logo'>
                    {pokeBall ? <img src={pokeBall} alt='pokeball'/> : null}
                    <NavLink to="/" style={{textDecoration: 'none'}}> 
                        PokemonBrawl
                    </NavLink>
                </div>
                <div className='other-links'>
                    {renderLoggedIn}
                </div>
            </div>
        )
    }

    return !currentUser ? notLoggedIn() : loggedIn()
}

export default NavBar