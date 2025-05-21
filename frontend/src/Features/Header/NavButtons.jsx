import { Link } from 'react-router'


export const NavButtons = () => {
  return (
    <section>
      <Link to='/JS3-exam/'></Link><button>Startsida</button>
      <Link to='/JS3-exam/recipes'></Link><button>Recept</button>
    </section>
  );
};
