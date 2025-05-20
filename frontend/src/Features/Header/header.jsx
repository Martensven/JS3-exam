import './header.css'
import { LOGO } from './LOGO'
import { NavButtons } from './NavButtons'
import { Link } from 'react-router'
import "../../assets/Kockmössan.jpg"

export const Header = () => {

    return (
        <>
            <div className='headerContainer'>
                <LOGO />
                <img src='src\assets\Kockmössan.jpg' alt='Kockmössan' className='kockmössan' />
            </div>

            <nav className="headerNav">
                <NavButtons />
                {/* <Link to='/JS3-exam/'> <button>🏠</button></Link>
                <Link to='/JS3-exam/recipes'> <button>📋</button></Link>
                <Link to='/JS3-exam/recipes/example'><button>🍔</button></Link> */}
            </nav>
        </>
    )
} 