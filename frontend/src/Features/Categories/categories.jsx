import "./categories.css";
import { useState, useEffect } from "react";
import client from "../../sanityClient.js";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
    });
    const fetchCategories = async () => {
      const query = `*[_type == "category"]{title}`;
      const fetchedCategories = await client.fetch(query);

      const predefinedOrder = [
        // Fördefinierad ordning på kategorierna
        "Frukost",
        "Lunch",
        "Förrätt",
        "Varmrätt",
        "Efterrätt",
        "Dryck",
      ];

      const sortedCategories = fetchedCategories.sort((a, b) => {
        // Sortera kategorierna i fördefinierad ordning
        return (
          predefinedOrder.indexOf(a.title) - predefinedOrder.indexOf(b.title) // sortera i fördefinierad ordning
        );
      });

      setCategories(sortedCategories); // Sätt de hämtade kategorierna i state
    };

    fetchCategories();
  }, []);

  // Mappa kategorierna till bilder
  const imageMap = {
    Frukost: "/JS3-exam/images/frukost.jpg",
    Lunch: "/JS3-exam/images/lunch.jpeg",
    Förrätt: "/JS3-exam/images/forratt.jpg",
    Varmrätt: "/JS3-exam/images/varmratt.jpg",
    Efterrätt: "/JS3-exam/images/efterratt.jpg",
    Dryck: "/JS3-exam/images/dryck.jpg",
  };

  return (
    <main className="categoriesContainer">
      <section className="grid-container">
        {categories.map(
          (
            category,
            index // Mappa över kategorierna och skapa en länk för varje kategori
          ) => (
            <Link
              to={`collection/${encodeURIComponent(category.title)}`} // Länk till kategorisidan, skickar med kategorins titel i URL:en
              key={index}
              className="grid-item"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${
                  imageMap[category.title] || "/images/default.jpg" // Använd en standardbild om ingen bild finns
                })`,
              }}
              data-aos="fade-up" // AOS animation
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
