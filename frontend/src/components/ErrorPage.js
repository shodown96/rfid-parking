import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="py-5 text-center text-bold">
                <h1 className="text-bolder">Error</h1>
                <h3 className="text-bold">Something went Wrong.</h3>
                <p>Go back <Link to="/" className="green-text">home</Link>.</p>
            </div>
        </div>
    )
}

export default ErrorPage
