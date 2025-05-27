import { Link } from 'react-router'

export const NavButtons = () => {
  return (
    <section>
      <Link to='/JS3-exam/'><button className='startBtn'>Startsida</button></Link>
      <Link to='/JS3-exam/categories'><button className='recipeBtn'>Recept</button></Link>
    </section>
  );
};
