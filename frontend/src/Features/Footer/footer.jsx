import "./footer.css";
import { IoLogoGithub } from "react-icons/io";
import { MdMail } from "react-icons/md";

//No Links on the buttons, there for the view. 

export const Footer = () => {
  return (
    <>
      <footer>
        <p>© JS3-Team5</p>

        <section className="linkContainer">
          <button> <MdMail /> </button>
          <button> <IoLogoGithub /> </button>
        </section>
      </footer>
    </>
  );
};
