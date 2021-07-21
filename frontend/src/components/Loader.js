import React from 'react'

function Loader({color="green"}) {
    return (
        <div className={`mx-auto text-center ${color}-text`}>
            <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loader
