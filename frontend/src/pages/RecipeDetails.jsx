import './recipeDetails.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // om du använder react-router
import { client } from "../sanityClient";

import AverageRatingTwo from "../Features/Reviews/AverageRatingTwo/AverageRatingTwo";
import AverageRating from "../Features/Reviews/AverageRating/AverageRating";
import ReviewForm from "../Features/Reviews/ReviewForm/ReviewForm";
import ReviewList from "../Features/Reviews/ReviewList/ReviewList";

const RecipeDetail = () => {
  const { id } = useParams(); // förväntar sig /recept/:id
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const query = `*[_type == "recipe" && _id == $id][0]`;

    client
      .fetch(query, { id })
      .then((data) => {
        setRecipe(data);
      })
      .catch((err) => {
        console.error("Kunde inte hämta recept:", err);
        setError("Något gick fel vid hämtning av receptet.");
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Laddar recept...</p>;

  return (
    <div className="recipe-detail">
      <h1>{recipe.title}</h1>
      {/* Visa övriga receptfält här om du vill */}

      <div className="average-rating-container">
        <AverageRating recipeId={recipe._id} />
      </div>
      <div className="average-rating-container">
        <AverageRatingTwo recipeId={recipe._id} />
      </div>
      <ReviewForm recipeId={recipe._id} />
      <ReviewList recipeId={recipe._id} />
    </div>
  );
};

export default RecipeDetail;
