import './header.css'
import { Link } from 'react-router'

export const Header = () => {

    return (
        <nav className="headerContainer">
            <Link to='/'><button>Start</button></Link>
            <Link to='/recipes'><button>Recept</button></Link>
        </nav>
    )
} 