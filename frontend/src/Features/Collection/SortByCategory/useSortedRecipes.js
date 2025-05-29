// src/hooks/useSortedRecipes.js
import { useEffect, useState } from "react";
import { client } from "../../../sanityClient";

export const useSortedRecipes = (categoryTitle, sortOrder) => { // Custom hook för att hämta och sortera recept baserat på kategori och sorteringsordning 
  const [recipes, setRecipes] = useState([]); // State för att lagra recepten

  useEffect(() => { // Använd useEffect för att hämta recepten när komponenten laddas eller när categoryTitle ändras
    const fetchRecipes = async () => { // Funktion för att hämta recepten från Sanity
      // Sanity query för att hämta recept som refererar till den valda kategorin
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
      const fetched = await client.fetch(query, { categoryTitle }); // Hämta recepten med den angivna kategorititeln

      const enriched = fetched.map((recipe) => { // Berika recepten med genomsnittligt betyg
        const ratings = recipe.reviews // Extrahera betyg från recensioner
          ?.map((r) => r.rating) // Omvandla recensioner till en lista med betyg
          .filter((r) => typeof r === "number"); // Filtrera bort ogiltiga betyg
        const avgRating = ratings.length // betyg finns, beräkna genomsnittet
          ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length // Beräkna genomsnittet av betygen
          : null; // Om inga betyg finns, sätt genomsnittet till null
        return { ...recipe, rating: avgRating }; // Returnera receptet med det genomsnittliga betyget
      });

      setRecipes(enriched); // Sätt de hämtade och berikade recepten i state
    };

    fetchRecipes(); 
  }, [categoryTitle]); // Kör fetchRecipes när categoryTitle ändras

  const sorted = [...recipes].sort((a, b) => { // Sortera recepten baserat på sorteringsordningen
    if (sortOrder === "timeCookingLong") { // Om sorteringsordningen är "timeCookingLong", sortera efter tid att laga
      const timeA = typeof a.timeToCook === "number" ? a.timeToCook : -1; // Om tid att laga inte är ett nummer, sätt den till -1
      const timeB = typeof b.timeToCook === "number" ? b.timeToCook : -1; // Samma för b
      return timeB -timeA; // Sortera i fallande ordning (längre tid först)
    } else if (sortOrder === "timeCookingShort") { // Om sorteringsordningen är "timeCookingShort", sortera efter tid att laga
      const timeA = typeof a.timeToCook === "number" ? a.timeToCook : -1; // Om tid att laga inte är ett nummer, sätt den till -1
      const timeB = typeof b.timeToCook === "number" ? b.timeToCook : -1; // Samma för b
      return timeA - timeB; // Sortera i stigande ordning (kortare tid först)
    } else if (sortOrder === "alfaAToZ") { // Om sorteringsordningen är "alfaAToZ", sortera alfabetiskt A till Z
      return a.title.localeCompare(b.title); // Använd localeCompare för att jämföra titlarna alfabetiskt
    } else if (sortOrder === "alfaZToA") { // Om sorteringsordningen är "alfaZToA", sortera alfabetiskt Z till A
      return b.title.localeCompare(a.title); // Använd localeCompare för att jämföra titlarna alfabetiskt i omvänd ordning
    } else { // Om sorteringsordningen är "highest" eller "lowest", sortera efter betyg
      const ratingA = typeof a.rating === "number" ? a.rating : -1; // Om betyget inte är ett nummer, sätt det till -1
      const ratingB = typeof b.rating === "number" ? b.rating : -1; // Samma för b
      return sortOrder === "highest" ? ratingB - ratingA : ratingA - ratingB; // Om sorteringsordningen är "highest", sortera i fallande ordning (högsta betyg först), annars stigande ordning (lägsta betyg först)
    }
  });

  return sorted; // Returnera de sorterade recepten
};
