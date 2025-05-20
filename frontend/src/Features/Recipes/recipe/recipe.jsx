import './style.css';
import { useState, useEffect } from "react";
import { client } from '../../../sanityClient';

export const Recipes = () => {
    const [recipe, setRecipe] = useState(null);
    useEffect(() => {
        client.fetch(
            `*[_type == 'recipe' && _id == '85d21bd5-26e6-4635-87e0-002bcaf02de6']{
            title,
            image {asset->
            {url}
            },
            categories[]->{
                title
            },
            description,
            timeToCook,
            portions,
            ingredients[],
            instructions[],
            _id
        }`
        )
            .then((data) => setRecipe(data[0]))
            .catch(console.error);
    }, []);

    //om recipe fortfarande är null, visa ett laddningsmeddelande
    if (!recipe) return <h3>Laddar...</h3>

    return (
        <>
            <main className="recipeMain">

                <h1 className="recipeName">{recipe.title}</h1>

                <img src={recipe.image.asset.url} alt={recipe.title} className="recipeImg" />

                <ul className="categories">
                    {recipe.categories.map((category, index) => (
                        <li key={index} className="category">
                            {category.title}
                        </li>
                    ))}
                </ul>

                <p className="recipeDesc">{recipe.description}</p>


                <div className='detailsContainer'>
                    <div className='details'>
                        <p className='timeToCook'>⏲️{recipe.timeToCook} min</p>
                        <p className="numberOfIngredients">🍌{recipe.ingredients.length}</p>
                        <p className='numberOfPortions'>🍽️{recipe.portions}</p>
                    </div>
                    <p className='recipeRating'>⭐⭐⭐⭐⭐</p>
                </div>


                <section className='listContainer'>
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
                        <ul className="instructions">
                            {recipe.instructions.map((instruction, index) => (
                                <li key={index} className="instruction">
                                    {instruction}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

            </main>
        </>
    )
}