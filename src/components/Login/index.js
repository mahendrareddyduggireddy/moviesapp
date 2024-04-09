import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', errMsg: false}

  userFunc = event => {
    this.setState({username: event.target.value})
  }

  passwordFunc = event => {
    this.setState({password: event.target.value})
  }

  submitFunc = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const object = {
      username,
      password,
    }
    const options = {method: 'POST', body: JSON.stringify(object)}
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errMsg: true})
    }
  }

  render() {
    const {username, password, errMsg} = this.state
    return (
      <div className="login-container">
        <h1>Welcome to MoviesApp</h1>
        <form className="form-container" onSubmit={this.submitFunc}>
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={this.userFunc}
            placeholder="Enter Username"
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={this.passwordFunc}
            placeholder="Enter Password"
          />
          <button type="submit">Login</button>
        </form>
        {errMsg && <p>username or password is wrong</p>}
      </div>
    )
  }
}
export default Login
