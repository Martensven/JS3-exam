import './header.css'
import { Link } from 'react-router'

export const Header = () => {

    return (
        <nav className="headerContainer">
            <Link to='/JS3-exam/'><button>Start</button></Link>
            <Link to='/JS3-exam/recipes'><button>Recept</button></Link>
        </nav>
    )
} 