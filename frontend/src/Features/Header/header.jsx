import './header.css'
import { Link } from 'react-router'

export const Header = () => {

    return (
        <nav className="headerContainer">
            <Link to='/JS3-exam/'><button>Start🏠</button></Link>
            <Link to='/JS3-exam/recipeCard'><button>🍔</button></Link>
        </nav>
    )
} 