// src/hooks/useSortedRecipes.js
import { useEffect, useState } from "react";
import { client } from "../../../sanityClient";

export const useSortedRecipes = (categoryTitle, sortOrder) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const query = `
                *[_type == "recipe" && references(*[_type == "category" && title == $categoryTitle][0]._id)]{
                    _id,
                    title,
                    image { asset->{url} },
                    description,
                    timeToCook,
                    "reviews": *[_type == "review" && references(^._id)] {
                        rating
                    }
                }
            `;
      const fetched = await client.fetch(query, { categoryTitle });

      const enriched = fetched.map((recipe) => {
        const ratings = recipe.reviews
          ?.map((r) => r.rating)
          .filter((r) => typeof r === "number");
        const avgRating = ratings.length
          ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
          : null;
        return { ...recipe, rating: avgRating };
      });

      setRecipes(enriched);
    };

    fetchRecipes();
  }, [categoryTitle]);

  const sorted = [...recipes].sort((a, b) => {
    const ratingA = typeof a.rating === "number" ? a.rating : -1;
    const ratingB = typeof b.rating === "number" ? b.rating : -1;
    return sortOrder === "highest" ? ratingB - ratingA : ratingA - ratingB;
  });

  return sorted;
};
