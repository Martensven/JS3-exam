// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { client } from "../../sanityClient";
// import { Link } from "react-router-dom";
// import AverageRatingTwo from "../Reviews/AverageRatingTwo/AverageRatingTwo.jsx";
// import './collection.css';

// export const Collection = () => {
//     const { categoryTitle } = useParams();
//     const [recipes, setRecipes] = useState([]);
//     const [sortOrder, setSortOrder] = useState("highest");

//     useEffect(() => {
//         const fetchRecipes = async () => {
//             const query = `
//                 *[_type == "recipe" && references(*[_type == "category" && title == $categoryTitle][0]._id)]{
//                     _id,
//                     title,
//                     image { asset->{url} },
//                     description,
//                     timeToCook,

//                     // Hämta relaterade reviews för varje recept
//                     "reviews": *[_type == "review" && references(^._id)] {
//                         rating
//                     }
//                 }
//             `;

//             const fetched = await client.fetch(query, { categoryTitle });

//             // Räkna ut snittbetyg för varje recept
//             const enriched = fetched.map(recipe => {
//                 const ratings = recipe.reviews?.map(r => r.rating).filter(r => typeof r === "number");
//                 const avgRating = ratings.length
//                     ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
//                     : null;

//                 return { ...recipe, rating: avgRating };
//             });

//             setRecipes(enriched);
//         };

//         fetchRecipes();
//     }, [categoryTitle]);

//     const sortedRecipes = [...recipes].sort((a, b) => {
//         const ratingA = typeof a.rating === "number" ? a.rating : -1;
//         const ratingB = typeof b.rating === "number" ? b.rating : -1;

//         return sortOrder === "highest" ? ratingB - ratingA : ratingA - ratingB;
//     });

//     return (
//         <main>
//             <h1 className="collection-title">{categoryTitle}</h1>

//             <div className="sort-buttons">
//                 <button
//                     onClick={() => setSortOrder("highest")}
//                     className={sortOrder === "highest" ? "active" : ""}
//                 >
//                     Högst betyg
//                 </button>
//                 <button
//                     onClick={() => setSortOrder("lowest")}
//                     className={sortOrder === "lowest" ? "active" : ""}
//                 >
//                     Lägst betyg
//                 </button>
//             </div>

//             {sortedRecipes.map((recipe) => (
//                 <section key={recipe._id}>
//                     <Link className="link-cards" to={`/JS3-exam/recipes/${recipe._id}`}>
//                         <div className="card-container">
//                             {recipe.image?.asset?.url && (
//                                 <img className="card-img" src={recipe.image.asset.url} alt={recipe.title} />
//                             )}
//                             <div className="card-txtbox">
//                                 <h1 className="card-title">{recipe.title}</h1>
//                                 <h2 className="card-desc">{recipe.description}</h2>
//                                 <h2 className="card-timer">Tillagningstid: {recipe.timeToCook} min</h2>
//                                 <div className="card-right">
//                                 <AverageRatingTwo recipeId={recipe._id} />
//                                 </div>
//                             </div>
//                         </div>
//                     </Link>
//                 </section>
//             ))}
//         </main>
//     );
// };

// export default Collection;

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { client } from "../../sanityClient";
// import { Link } from "react-router-dom";
// import './collection.css';
// import AverageRatingTwo from "../Reviews/AverageRatingTwo/AverageRatingTwo";

// export const Collection = () => {
//     const { categoryTitle } = useParams();
//     const [recipes, setRecipes] = useState([]);

//     useEffect(() => {
//         const fetchRecipes = async () => {
//             const query = `*[_type == "recipe" && references(*[_type == "category" && title == $categoryTitle][0]._id)]{
//                 _id,
//                 title,
//                 image {asset-> {url}},
//                 description,
//                 timeToCook
//                 }`;

//             const fetched = await client.fetch(query, { categoryTitle });
//             setRecipes(fetched);
//         };

//         fetchRecipes();
//     }, [categoryTitle]);

//     return (
//         <main>
//             <h1 className="collection-title">{categoryTitle}</h1>

//             {recipes.map((recipe, index) => (
//                 <section key={index}>
//                     <Link className="link-cards" to={`/JS3-exam/recipes/${recipe._id}`}>
//                         <div className="card-container">
//                             {recipe.image?.asset?.url && (
//                                 <img className="card-img" src={recipe.image.asset.url} alt="{recipe.title}" />
//                             )}
//                             <div className="card-txtbox">
//                                 <h1 className="card-title">{recipe.title}</h1>
//                                 <h2 className="card-desc">{recipe.description}</h2>
//                                 <h2 className="card-timer">Tillagningstid: {recipe.timeToCook} min</h2>
//                                 <div className="card-right">
//                                     <AverageRatingTwo recipeId={recipe._id} />
//                                 </div>
//                             </div>
//                         </div>
//                     </Link>
//                 </section>
//             ))}
//         </main>
//     );
// };

// export default Collection;

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
