import "./averageRatingTwo.css";
import { useEffect, useState } from "react";
import { client } from "../../../sanityClient";

// Komponent som visar genomsnittligt betyg både som stjärnor och numeriskt
const AverageRatingTwo = ({ recipeId }) => {
  // Lokalt state för genomsnittligt betyg
  const [average, setAverage] = useState(null);
  const [error, setError] = useState(null);

  // Körs när komponenten mountas eller när recipeId ändras
  useEffect(() => {
    if (!recipeId) return;

    // Asynkron funktion för att hämta recensioner och räkna ut snittbetyg
    const fetchAverageRating = async () => {
      try {
        // GROQ-query: hämta alla recensioner kopplade till detta recept
        const query = `
          *[_type == "review" && recipe._ref == $recipeId]{
            rating
          }
        `;
        const data = await client.fetch(query, { recipeId });

        // Om inga recensioner finns – visa placeholder
        if (!data.length) {
          setAverage(null);
          return;
        }

        // Beräkna genomsnittet av betygen
        const total = data.reduce((sum, review) => sum + review.rating, 0);
        const avg = total / data.length;
        // Spara avrundat genomsnitt till en decimal
        setAverage(avg.toFixed(1));
      } catch (err) {
        console.error("Kunde inte hämta betyg:", err);
        setError("Fel vid hämtning av betyg");
      }
    };

    fetchAverageRating();
  }, [recipeId]); // Beroende på recipeId

  if (error) return <p>{error}</p>;
  if (average === null) return <p>--</p>; // Om genomsnittet ännu inte är laddat eller saknas, visa placeholder

  // Returnera den visuella komponenten
  return (
    <div className="average-stars-container">
      <div className="average-stars-wrapper">
        {/* Bakgrund med gråa stjärnor */}
        <div className="star-background">★★★★★</div>
        {/* Förgrund med gula stjärnor som anpassas i bredd baserat på snittbetyg */}
        <div
          className="star-foreground"
          style={{ width: `${(average / 5) * 100}%` }} // Ex: 3.8 => 76% "ifyllda" stjärnor
        >
          ★★★★★
        </div>
      </div>
      {/* Visar snittet i siffror bredvid stjärnorna */}
      <span className="average-rating-number">{average}</span>
    </div>
  );
};

export default AverageRatingTwo;
