import { PiSneakerMoveDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";


export const TopTen = () => {
  return (
    <article className="TopTenContainer">
        <p>Se våra Top10 rankade recept</p>
        <Link to='/JS3-Exam/top-rated/'><button className="topRatedBtn"><PiSneakerMoveDuotone /></button></Link>
    </article>
  
);
};
