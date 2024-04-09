import './App.css'
import {Switch, Route} from 'react-router-dom'
import NotFound from './components/NotFound'
import Home from './components/Home'
import Login from './components/Login'

const App = () => (
  <div className="app-container">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  </div>
)

export default App
