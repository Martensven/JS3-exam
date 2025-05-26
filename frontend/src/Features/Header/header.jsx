import './header.css'
import { LOGO } from './LOGO'
import { NavButtons } from './NavButtons'
import KockmössanImg from "../../assets/Kockmössan.jpg"

export const Header = () => {

    return (
        <>
            <div className='headerContainer'>
                <LOGO />
                <img src={KockmössanImg} alt='Kockmössan' className='kockmössan' />
            </div>

            <nav className="headerNav">
                <NavButtons />
            </nav>
        </>
    )
} 