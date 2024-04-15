import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import FailureView from '../FailureView'
import './index.css'

class Trends extends Component {
  state = {trend: false, trendsList: []}

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
        overview: each.overview,
        title: each.title,
        backDrop: each.backdrop_path,
      }))
      this.setState({trendsList: updatedData, trend: true})
    }
  }

  render() {
    const {trendsList, trend} = this.state
    const settings = {
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    return (
      <>
        {trend ? (
          <Slider {...settings}>
            {trendsList.map(each => (
              <img
                src={each.posterPath}
                alt={each.name}
                key={each.id}
                className="movie-style"
              />
            ))}
          </Slider>
        ) : (
          <FailureView retryFunc={this.trendingData} />
        )}
      </>
    )
  }
}
export default Trends
