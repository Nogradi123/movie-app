import React from 'react'
import { Link } from 'react-router-dom';
import CelebList from './CelebList';
import MoviesList from './MoviesList';

export default function NavBar() {
  return (
    <nav className='nav'>
        <div className='nav-links'>
            <div className='nav-link'>
                <Link to={"/"}>
                    <h4>Home</h4>
                </Link>
            </div>
            <div className='nav-link'>
                <Link to={"/movies"}>
                    <h4>Movies</h4>
                </Link>
            </div>
            <div className='nav-link'>
                <Link to={"/celebrities"}>
                    <h4>Celebrities</h4>
                </Link>
            </div>
        </div>
    </nav>
  )
}
