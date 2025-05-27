import { useEffect, useState } from "react";
import { client } from "../../../sanityClient"; 
import AverageRatingTwo from "../../Reviews/AverageRatingTwo/AverageRatingTwo";
import "./topRatedRecipes.css";
import { Link } from "react-router-dom";

const TopRatedRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchTopRated = async () => {
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
        const data = await client.fetch(query);

        const recipesWithRatings = data.map(recipe => {
          const ratings = recipe.reviews?.map(r => r.rating) || [];
          const avgRating =
            ratings.length > 0
              ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10
              : 0;

          return { ...recipe, avgRating };
        });

        const top10 = recipesWithRatings
          .sort((a, b) => b.avgRating - a.avgRating)
          .slice(0, 10);

        setRecipes(top10);
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
              {recipe.image?.asset?.url && (
                <img
                  className="card-img"
                  src={recipe.image.asset.url}
                  alt={recipe.title}
                />
              )}
              <div className="card-txtbox">
                <h1 className="card-title">{recipe.title}</h1>
                <h2 className="card-desc">{recipe.description}</h2>
                <h2 className="card-timer">
                  Genomsnittligt betyg: {recipe.avgRating}
                </h2>
                <div className="card-right">
                  <AverageRatingTwo recipeId={recipe._id} />
                </div>
              </div>
            </div>
          </Link>
        </section>
      ))}
    </main>
  );
  
};

export default TopRatedRecipes;
