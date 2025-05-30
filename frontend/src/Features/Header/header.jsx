import './header.css'
import { LOGO } from './LOGO' //Logo component 
import { NavButtons } from './NavButtons' // Nav Buttons as startside and recipe button
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