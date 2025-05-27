import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./collection.css";
import AverageRatingTwo from "../Reviews/AverageRatingTwo/AverageRatingTwo";
import { useSortedRecipes } from "./SortByCategory/useSortedRecipes";
import SortDropdown from "./SortByCategory/SortDropDown/SortDropDown";

export const Collection = () => {
  const { categoryTitle } = useParams();
  const [sortOrder, setSortOrder] = useState("highest");
  const sortedRecipes = useSortedRecipes(categoryTitle, sortOrder);

  return (
    <main>
      <h1 className="collection-title">{categoryTitle}</h1>
      {/* Skickar sortOrder och setSortOrder som props till SortDropDown */}
      <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />

      {sortedRecipes.map((recipe) => (
        <section key={recipe._id}>
          <Link className="link-cards" id={'id-' + recipe._id} to={`/JS3-exam/recipes/${recipe._id}`}>
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
                  Tillagningstid: {recipe.timeToCook} min
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

export default Collection;
