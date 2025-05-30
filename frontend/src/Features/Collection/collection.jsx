import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./collection.css";
import AverageRatingTwo from "../Reviews/AverageRatingTwo/AverageRatingTwo";
import { useSortedRecipes } from "./SortByCategory/useSortedRecipes";
import SortDropdown from "./SortByCategory/SortDropDown/SortDropDown";

export const Collection = () => {
  const { categoryTitle } = useParams(); //Hämtar katergorititeln via URL-Params
  const [sortOrder, setSortOrder] = useState("highest"); //State för att hålla koll på vad som är vald på sorteringsordning. Default är highest/ högst betyg först
  const sortedRecipes = useSortedRecipes(categoryTitle, sortOrder); //Hämtar sorterade recept baserat på vad för katergori och sorteringsorder som är vald

  return (
    <main>
      {/*Header1 som visar vilken kategori vi är inne i*/}
      <h1 className="collection-title">{categoryTitle}</h1>
      {/* Skickar sortOrder och setSortOrder som props till SortDropDown */}
      <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />

      {/*Loopar igenom databasen för recepter som finns och skapar en kort för varje recept*/}
      {sortedRecipes.map((recipe) => (
        <section key={recipe._id}>
          {/*Link till receptkorten's recept-sida*/}
          <Link className="link-cards" id={'id-' + recipe._id} to={`/JS3-exam/recipes/${recipe._id}`}>
            <article className="card-container">
              {/*Kollar igenom om recepten har en img, om den har en img, vissa upp den, annars inte*/}
              {recipe.image?.asset?.url && (
                <img
                  className="card-img"
                  src={recipe.image.asset.url}
                  alt={recipe.title}
                />
              )}
              {/*Textbox för recepten*/}
              <section className="card-txtbox">
                <h1 className="card-title">{recipe.title}</h1>
                <h2 className="card-desc">{recipe.description}</h2>
                <h2 className="card-timer">
                  Tillagningstid: {recipe.timeToCook} min
                </h2>
                {/*Box för betyg komponent*/}
                <section className="card-right">
                  <AverageRatingTwo recipeId={recipe._id} />
                </section>
              </section>
            </article>
          </Link>
        </section>
      ))}
    </main>
  );
};

export default Collection;
