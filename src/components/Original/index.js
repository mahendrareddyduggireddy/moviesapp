import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import FailureView from '../FailureView'
import './index.css'

class Original extends Component {
  state = {original: false, originalsList: []}

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
        overview: each.overview,
        title: each.title,
        backDrop: each.backdrop_path,
      }))
      const og = Math.ceil(Math.random() * updatedData.length)
      console.log(updatedData[og])
      this.setState({
        originalsList: updatedData,
        original: true,
      })
    }
  }

  render() {
    const {originalsList, original} = this.state
    const settings = {
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    return (
      <>
      {original ? (
              <Slider {...settings}>
                {originalsList.map(each => (
                  <img
                    src={each.posterPath}
                    alt={each.name}
                    key={each.id}
                    className="movie-style"
                  />
                ))}
              </Slider>
            ) : (
              <FailureView retryFunc={this.originalsData} />
            )
        }
        </>
    )
}
  
export default Original