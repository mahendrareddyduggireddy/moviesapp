import './index.css'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', errMsg: false, em: ''}

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
      this.setState({errMsg: true, em: data.error_msg})
    }
  }

  render() {
    const {username, password, errMsg, em} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/account" />
    }
    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dxqfqtqnl/image/upload/v1712651012/Group_7399_enilu8.jpg"
          alt="login website logo"
          className="logo-style"
        />
        <form className="form-container" onSubmit={this.submitFunc}>
          <label htmlFor="username" className="label-style">
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={this.userFunc}
            placeholder="Enter Username"
            className="input-style"
          />
          <label htmlFor="password" className="label-style">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={this.passwordFunc}
            placeholder="Enter Password"
            className="input-style"
          />
          <button type="submit" className="btn-style">
            Login
          </button>
        </form>
        {errMsg && <p>{em}</p>}
      </div>
    )
  }
}
export default Login
