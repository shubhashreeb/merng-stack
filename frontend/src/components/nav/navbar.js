import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header> 
        <div className='container'>
            <div className='inner-content'>
                <div className='brand'>
                    <Link to = '/homepage'>Book Exchange App</Link>
                </div>
                <ul className = 'nav-links'>
                    <li>
                        <Link to = '/add' className='btn'>+Add</Link>
                    </li>
                    <li>
                    <Link to = '/register'> Register</Link>
                    </li>
                    <li>
                        <Link to = '/login'>Login</Link>
                    </li>
                    <li>
                        <Link to = '/homepage'>Home</Link>
                    </li>
                   
                </ul>
            </div>
        </div>
        </header>
    )
}
export default Navbar
