import './start.css'
import { ImgContainer } from './ImgComponent'
import { TopTen } from './TopTen'

export const Start = () => {
    return (
        <>
        <article className='startSideContainer'>
        <h1 className='starterH1'>Välkommen!</h1>
            <p className='starterP'>
             Vi är ett gäng glada frontend studenter som har ett extra intresse för mat. Därför har vi under vår Javascript 3 kurs skapat oss en egen receptblogg. 
             Kolla runt lite bland alla recept som finns. Glöm inte att gilla och skriva en liten kommentar.  
            </p>
            <ImgContainer />
            <TopTen />
        </article>

            
        </>
    )
}