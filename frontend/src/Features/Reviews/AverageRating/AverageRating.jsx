import "./averageRating.css";
import { useEffect, useState } from "react";
import { client } from "../../../sanityClient";

// Komponent som visar ett recepts genomsnittliga betyg
const AverageRating = ({ recipeId }) => {
  const [average, setAverage] = useState(null); // State för det uträknade genomsnittsbetyget
  const [error, setError] = useState(null);

  // useEffect körs varje gång recipeId ändras (eller vid första rendering)
  useEffect(() => {
    if (!recipeId) return;

    // Asynkron funktion som hämtar betygsdata från Sanity
    const fetchAverageRating = async () => {
      try {
        // GROQ-query: Hämta alla "review"-dokument som refererar till detta recept
        const query = `
          *[_type == "review" && recipe._ref == $recipeId]{
            rating
          }
        `;
        const data = await client.fetch(query, { recipeId });

        // Om inga recensioner hittats, visa tomt (kan tolkas som "Inget betyg än")
        if (!data.length) {
          setAverage(null);
          return;
        }

        // Summera alla betyg och räkna ut genomsnittet
        const total = data.reduce((sum, review) => sum + review.rating, 0);
        const avg = total / data.length;
        // Spara det avrundade genomsnittet (till 1 decimal)
        setAverage(avg.toFixed(1));
      } catch (err) {
        console.error("Kunde inte hämta betyg:", err);
        setError("Fel vid hämtning av betyg");
      }
    };

    // Anropa funktionen för att hämta betyg
    fetchAverageRating();
  }, [recipeId]); // Körs på ändring av recipeId

  if (error) return <p>{error}</p>;
  if (average === null) return <p>--</p>; // Om betyg ännu inte är laddat eller saknas – visa placeholder

  // Visa genomsnittsbetyget i en CSS-formad stjärna
  return (
    <div className="star-shape">
      <p>{average}</p>
    </div>
  );
};

export default AverageRating;
