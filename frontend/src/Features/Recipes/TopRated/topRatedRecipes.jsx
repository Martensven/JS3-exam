import { useEffect, useState } from "react";
import { client } from "../../../sanityClient";
import AverageRating from "../../Reviews/AverageRating/AverageRating";
import "./topRatedRecipes.css";
import { Link } from "react-router-dom";

const TopRatedRecipes = () => {
  const [recipes, setRecipes] = useState([]); // State för att lagra de hämtade recepten

  useEffect(() => {
    // Använd useEffect för att hämta recepten när komponenten laddas
    const fetchTopRated = async () => {
      // Sanity query för att hämta alla recept och deras recensioner
      const query = `*[_type == "recipe"] {
        _id,
        title,
        image { asset-> { url } },
        description,
        "reviews": *[_type == "review" && recipe._ref == ^._id] {
          rating
        }
      }`;

      try {
        const data = await client.fetch(query); // Hämta recepten från Sanity

        const recipesWithRatings = data.map((recipe) => {
          // Berika varje recept med genomsnittligt betyg
          const ratings = recipe.reviews?.map((r) => r.rating) || []; // Extrahera betyg från recensioner, om inga recensioner finns, sätt till tom array
          const avgRating =
            ratings.length > 0
              ? Math.round(
                  (ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10
                ) / 10 // Beräkna genomsnittligt betyg, avrunda till en decimal
              : 0; // Om inga betyg finns, sätt genomsnittet till 0

          return { ...recipe, avgRating }; // Berika varje recept med genomsnittligt betyg
        });

        const top10 = recipesWithRatings
          .sort((a, b) => b.avgRating - a.avgRating) // Sortera recepten efter genomsnittligt betyg i fallande ordning
          .slice(0, 10); // Ta de 10 bästa recepten

        setRecipes(top10); // Sätt de hämtade recepten i state
      } catch (error) {
        console.error("Fel vid hämtning av recept:", error);
      }
    };

    fetchTopRated();
  }, []);

  return (
    <main className="top-rated-recipes">
      <h1 className="top-rated-title">Topp 10 recept med högst betyg</h1>

      {recipes.map((recipe) => (
        <section key={recipe._id}>
          <Link className="link-cards" to={`/JS3-exam/recipes/${recipe._id}`}>
            <div className="card-container">
              <div className="card-img-container">
                {recipe.image?.asset?.url && (
                  <img
                    className="card-img"
                    src={recipe.image.asset.url}
                    alt={recipe.title}
                  />
                )}
                <div className="card-rating">
                  <AverageRating recipeId={recipe._id} />
                </div>
              </div>
              <div className="card-txtbox">
                <h1 className="card-title">{recipe.title}</h1>
                <h2 className="card-desc">{recipe.description}</h2>
              </div>
            </div>
          </Link>
        </section>
      ))}
    </main>
  );
};

export default TopRatedRecipes;
