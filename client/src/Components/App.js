import {useState, useEffect} from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'

//import react components
import NavBar from './NavBar'
import SignUp from './SignUp';
import Login from './Login';
import Logout from './Logout'
import Home from './Home'

let App = () => {
  // const history = useHistory()
  const [currentUser, setCurrentUser] = useState(null)

  if (currentUser === null) {
    // history.push('/login')
    return (
      <div>
        <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        <div className="app-container">
          <Switch>
            <Route exact path ='/login'>
              <Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            </Route>
            <Route exact path='/signup'>
              <SignUp currentUser={currentUser} setCurrentUser={setCurrentUser}/>  
            </Route>
          </Switch>
        </div>
      </div>
    )

  } else {
    return (
      <div>
        <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        <div className="app-container">
          <Switch>
            <Route exact path ='/login'>
              <Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            </Route>
            <Route exact path ='/logout'>
              <Logout setCurrentUser={setCurrentUser}/>
            </Route>
            <Route exact path='/signup'>
              <SignUp currentUser={currentUser} setCurrentUser={setCurrentUser}/>  
            </Route>
            <Route exact path='/'>
              <Home currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            </Route>
          </Switch>
        </div>
      </div>
    )
  }
}

export default App