import { NavLink } from 'react-router-dom'

let Link = ({path}) => {
    let exactPath = () => {
        if (path === 'Home') {
            return '/'
        } else if (path === 'Sign Up') {
            return 'signup'
        } else {
            return path.toLowerCase()
        }
    }

    return (
        <NavLink to={exactPath()} style={{textDecoration:'none'}}>
            {path}
        </NavLink>
    )
}

export default Link