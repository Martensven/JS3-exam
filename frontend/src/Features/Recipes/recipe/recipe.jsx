import "./style.css";
import { useState, useEffect } from "react";
import { client } from "../../../sanityClient";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router";
import ReviewForm from "../../Reviews/ReviewForm/ReviewForm";
import ReviewList from "../../Reviews/ReviewList/ReviewList";
import AverageRatingTwo from "../../Reviews/AverageRatingTwo/AverageRatingTwo";

export const Recipes = () => {

  const { id } = useParams(); // <-- Hämta receptets ID från URL
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "recipe" && _id == $id][0]{
                        title,
                        image { asset->{url} }, 
                        categories[]->{ title },
                        description,
                        timeToCook,
                        portions,
                        ingredients[],
                        instructions[],
                        _id
                    }`,
          { id }
        );
        setRecipe(data);
      } catch (error) {
        console.error("Fel vid hämtning av recept:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  //om recipe fortfarande är null, visa ett laddningsmeddelande
  if (!recipe) return <h3>Laddar...</h3>;

  return (
    <>
      <main className="recipeMain">
        <div className="goback-buttons">
          {recipe.categories.map((category) => (
            <button
              key={category.title}
              className="goback-button"
              onClick={() => {
                navigate(`/JS3-exam/categories/collection/${category.title}`);
              }}
            >
              Gå tillbaka till {category.title}
            </button>
          ))}
        </div>

        <h1 className="recipeName">{recipe.title}</h1>

        {recipe.image?.asset?.url && (
          <img
            className="recipeImg"
            src={recipe.image.asset.url}
            alt="{recipe.title}"
          />
        )}

        <ul className="categories">
          {recipe.categories.map((category, index) => (
            <li key={index} className="category">
              <Link to={`/JS3-exam/categories/collection/${category.title}`}>
                {" "}
                <button className="categoryBtn" id={`${category.title}Btn`}>
                  {category.title}
                </button>
              </Link>
            </li>
          ))}
        </ul>

        <p className="recipeDesc">{recipe.description}</p>

        <div className="detailsContainer">
          <div className="details">
            <p className="timeToCook">⏲️{recipe.timeToCook} min</p>
            <p className="numberOfIngredients">🍌{recipe.ingredients.length}</p>
            <p className="numberOfPortions">🍽️{recipe.portions}</p>
            <AverageRatingTwo recipeId={recipe._id} />
          </div>
        </div>

        <section className="listContainer">
          <h2>Ingredienser</h2>
          <div className="ingredientContainer">
            <ul className="ingredients">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="instructionsContainer">
            <h2>Instruktioner</h2>
            <ul className="instructions">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="instruction">
                  {instruction}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Link className="editLink" to={`/JS3-exam/recipes/edit/${recipe._id}`}>
          <button className="editBtn">Redigera</button>
        </Link>
      </main>
      <ReviewForm recipeId={id} />
      <ReviewList recipeId={id} />
    </>
  );
};
