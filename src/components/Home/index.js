import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

class Home extends Component {
  state = {
    trendsList: [],
    originalsList: [],
    isLoading: true,
    randomItem: {},
  }

  componentDidMount() {
    this.trendingData()
    this.originalsData()
  }

  trendingData = async () => {
    this.setState({isLoading: true})
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
      this.setState({trendsList: updatedData, isLoading: false})
    }
  }

  originalsData = async () => {
    this.setState({isLoading: true})
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
      const og = Math.ceil(Math.random() * updatedData.length)
      console.log(updatedData[og])
      this.setState({
        originalsList: updatedData,
        isLoading: false,
        randomItem: updatedData[og],
      })
    }
  }

  render() {
    const {trendsList, originalsList, isLoading, randomItem} = this.state
    const settings = {
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    if (Cookies.get('jwt_token') === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="movies-all">
        {isLoading ? (
          <div className="loader-container" testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        ) : (
          <div className="movies-container">
            <h1>{randomItem.title}</h1>
            <h1>Trending Now</h1>

            <Slider {...settings}>
              {trendsList.map(each => (
                <div key={each.id} className="movie-style">
                  <img src={each.posterPath} alt={each.name} />
                </div>
              ))}
            </Slider>

            <h1>Originals</h1>

            <Slider {...settings}>
              {originalsList.map(each => (
                <div key={each.id} className="movie-style">
                  <img src={each.posterPath} alt={each.name} />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    )
  }
}

export default Home
