import React from 'react'
import Home from 'react-icons/lib/fa/home'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className="header">
            <h1>Readable</h1>
            <p>Udacity React Nanodegree · Project #2 · Stephan Richter</p>
            <div className="home-link">
                <Link
                    to="/"
                    tooltip="Home"
                    flow="right"
                >
                    <Home size={25} />
                </Link>
            </div>
        </div>
    )
}

export default Header