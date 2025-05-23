import { Link } from 'react-router'


export const NavButtons = () => {
  return (
    <section>
      <Link to='/JS3-exam/'><button>Startsida</button></Link>
      <Link to='/JS3-exam/categories'><button>Recept</button></Link>
    </section>
  );
};
