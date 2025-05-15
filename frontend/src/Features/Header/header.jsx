import './header.css'
import { Link } from 'react-router'

export const Header = () => {

    return (
        <>
            <div className='headerLogo'>🍴<i>ReceptFrossa</i>🍴</div>
            <nav className="headerNav">
                <Link to='/JS3-exam/'><button>🏠</button></Link>
                <Link to='/JS3-exam/recipes'><button>📋</button></Link>
                <Link to='/JS3-exam/recipes/example'><button>🍔</button></Link>
            </nav>
        </>
    )
} 