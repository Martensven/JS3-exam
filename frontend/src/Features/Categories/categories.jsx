import "./categories.css";
import { useState, useEffect } from "react";
import client from "../../sanityClient.js";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

export const Categories = () => {
  const [categories, setCategories] = useState([]); // State för att lagra kategorierna

  useEffect(() => {
    Aos.init({ // Initiera AOS (Animate On Scroll) biblioteket
      duration: 800, // Animationens varaktighet
      easing: "ease-in-out", // Animationens easing
    });
    const fetchCategories = async () => { // Funktion för att hämta kategorier från Sanity
      const query = `*[_type == "category"]{title}`; // Sanity query för att hämta alla kategorier
      const fetchedCategories = await client.fetch(query); // Hämta kategorierna

      const predefinedOrder = [
        // Fördefinerad ordning på kategorierna
        "Frukost",
        "Lunch",
        "Förrätt",
        "Varmrätt",
        "Efterrätt",
        "Dryck",
      ];

      const sortedCategories = fetchedCategories.sort((a, b) => { // Sortera kategorierna i fördefinierad ordning
        return (
          predefinedOrder.indexOf(a.title) - predefinedOrder.indexOf(b.title) // Om kategorin inte finns i den fördefinierade listan, sätt den sist
        );
      });

      setCategories(sortedCategories); // Sätt de hämtade kategorierna i state
    };

    fetchCategories(); // Anropa funktionen för att hämta kategorier
  }, []);

  // Mappa kategorierna till bilder
  const imageMap = {
    Frukost: "/JS3-exam/images/frukost2.jpg",
    Lunch: "/JS3-exam/images/lunch2.jpg",
    Förrätt: "/JS3-exam/images/forratt2.jpg",
    Varmrätt: "/JS3-exam/images/varmratt2.jpg",
    Efterrätt: "/JS3-exam/images/efterratt2.jpg",
    Dryck: "/JS3-exam/images/dryck2.jpg",
  };

  return (
    <main className="categoriesContainer">
      <section className="categoriesButton">
        <Link to="/JS3-exam/recipes/create">
          <button>Skapa recept</button>
        </Link>
      </section>
      <section className="categoryContainer">
        {categories.map( // Mappa över kategorierna och skapa en länk för varje kategori
          (
            category,
            index 
          ) => (
            <Link
              to={`/JS3-exam/categories/collection/${encodeURIComponent(
                category.title
              )}`} // Länk till kategorisidan, skickar med kategorins titel i URL:en
              key={index} 
              className="categoryCard" 
              style={{ 
                backgroundImage: `linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.60)), url(${
                  imageMap[category.title] || "/images/default.jpg" // Använd en standardbild om ingen bild finns
                })`,
              }}
              data-aos="fade-up" // AOS animation
              // data-aos-delay={index > 4 * 600}
              data-aos-delay={index < 3 ? index * 300 : 0}
            >
              {category.title}
            </Link>
          )
        )}
      </section>
    </main>
  );
};

export default Categories;
