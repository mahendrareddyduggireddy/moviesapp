import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

const Account = props => {
  const {history} = props
  const logoutFunc = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  if (Cookies.get('jwt_token') === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="account-container">
      <h1>Account</h1>
      <hr />
      <div>
        <p>Member ship</p>
        <div>
          <p>rahul@gmail.com</p>
          <p>
            Password<span>:*********</span>
          </p>
        </div>
      </div>
      <hr />
      <div>
        <p>Plan details</p>
        <div>
          <p>Premium</p>
          <p>Ultra HD</p>
        </div>
      </div>
      <hr />
      <button type="button" onClick={logoutFunc} className="logout-btn">
        Logout
      </button>
    </div>
  )
}
export default Account
