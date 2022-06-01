import { NavLink } from 'react-router-dom'

let Link = ({path}) => {
    let exactPath = () => {
        if (path === 'Home') {
            return '/'
        } else {
            let replaceSpaces = path.replace(/\s/g, '_');
            return replaceSpaces.toLowerCase()
        }
    }

    return (
        <NavLink to={exactPath()} style={{textDecoration:'none'}}>
            {path}
        </NavLink>
    )
}

export default Link