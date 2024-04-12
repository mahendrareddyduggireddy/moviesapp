import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Home extends Component {
  state = {
    trendsList: [],
    originalsList: [],
  }

  componentDidMount() {
    this.trendingData()
    this.originalsData()
  }

  trendingData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/trending-movies',
      options,
    )
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        overview: each.overView,
        title: each.title,
        backDrop: each.backdrop_path,
      }))
      this.setState({trendsList: updatedData})
    }
  }

  originalsData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(
      'https://apis.ccbp.in/movies-app/originals',
      options,
    )
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        overview: each.overView,
        title: each.title,
        backDrop: each.backdrop_path,
      }))
      this.setState({originalsList: updatedData})
    }
  }

  render() {
    const {trendsList, originalsList} = this.state
    console.log(trendsList)
    console.log(originalsList)
    if (Cookies.get('jwt_token') === undefined) {
      return <Redirect to="/" />
    }
    return <div>hi</div>
  }
}

export default Home
