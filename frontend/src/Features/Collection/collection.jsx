import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "../../sanityClient";
import { Link } from "react-router-dom";
import './collection.css';

export const Collection = () => {
    const { categoryTitle } = useParams();
    const [recipes, setRecipes] = useState([]);
    
    useEffect(() => {
        const fetchRecipes = async () => {
            const query = `*[_type == "recipe" && references(*[_type == "category" && title == $categoryTitle][0]._id)]{
                _id,
                title,
                image {asset-> {url}},
                description,
                timeToCook
                }`;
                
                const fetched = await client.fetch(query, { categoryTitle });
                setRecipes(fetched);
            };
            
            fetchRecipes();
        }, [categoryTitle]);
        
        return (
            <main>
                <h1 className="collection-title">{categoryTitle}</h1>

                {recipes.map((recipe, index) => (
                    <section key={index}>
                        <Link className="link-cards" to={`/recipe/${recipe._id}`}>
                           <div className="card-container">
                            {recipe.image?.asset?.url && (
                                <img className="card-img" src={recipe.image.asset.url} alt="{recipe.title}" />
                            )}
                            <div className="card-txtbox">
                                <h1 className="card-title">{recipe.title}</h1>
                                <h2 className="card-desc">{recipe.description}</h2>
                                <h2 className="card-timer">Tillagningstid: {recipe.timeToCook} min</h2>
                                <div className="card-right">
                                    <h2 className="card-rating">⭐⭐⭐⭐⭐</h2>
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