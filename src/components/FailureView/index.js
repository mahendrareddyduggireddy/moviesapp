import './index.css'

const FailureView = props => {
  const {retryFunc} = props

  const btnFunc = () => {
    retryFunc()
  }

  return (
    <div>
      <img
        src="https://res.cloudinary.com/dxqfqtqnl/image/upload/v1712657003/snow-removal-machine-working-high-ski-slope-snowstorm_454047-2149_1_pq4dpn.jpg"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={btnFunc}>
        Retry
      </button>
    </div>
  )
}

export default FailureView
