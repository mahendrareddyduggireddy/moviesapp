import Slider from 'react-slick'
import './index.css'
import FailureView from '../FailureView'

const Trends = props => {
  const {trendsList, trendsData, trend} = props

  const trendsFunc = () => {
    trendsData()
  }

  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
  }

  return (
    <>
      {trend ? (
        <>
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
        </>
      ) : (
        <FailureView retryFunc={trendsFunc} />
      )}
    </>
  )
}
export default Trends
