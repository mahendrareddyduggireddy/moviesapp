import './index.css'

import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dxqfqtqnl/image/upload/v1712657003/snow-removal-machine-working-high-ski-slope-snowstorm_454047-2149_1_pq4dpn.jpg"
      alt="not found"
      className="not-found-image"
    />
    <h1>Lost Your Way</h1>
    <p>
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="go-home">
        Go to Home
      </button>
    </Link>
    <p>retry</p>
  </div>
)
export default NotFound
