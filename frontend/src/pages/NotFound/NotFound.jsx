import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <div className="not-found-code">404</div>
        <h1>Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
        <Link to="/dashboard" className="btn btn-primary btn-lg">
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default NotFound
