import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Original from '../Original'
import Trends from '../Trends'

class Home extends Component {
  state = {
    isLoading: true,
  }

  componentDidMount() {
    this.setState({isLoading: false})
  }

  render() {
    const {isLoading} = this.state
    if (Cookies.get('jwt_token') === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="movies-all">
        {isLoading ? (
          <div className="loader-container loader-style" testid="loader">
            <h1 className="title">Movies</h1>
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        ) : (
          <div className="movies-container">
            <h1 className="heading">Trending Now</h1>
            <Trends />
            <h1 className="heading">Originals</h1>
            <Original />
          </div>
        )}
      </div>
    )
  }
}

export default Home
