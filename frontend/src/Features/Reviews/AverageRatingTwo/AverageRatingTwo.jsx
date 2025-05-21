import "./averageRatingTwo.css";
import { useEffect, useState } from "react";
import { client } from "../../../sanityClient";

const AverageRatingTwo = ({ recipeId }) => {
  const [average, setAverage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!recipeId) return;

    const fetchAverageRating = async () => {
      try {
        const query = `
          *[_type == "review" && recipe._ref == $recipeId]{
            rating
          }
        `;
        const data = await client.fetch(query, { recipeId });

        if (!data.length) {
          setAverage(null);
          return;
        }

        const total = data.reduce((sum, review) => sum + review.rating, 0);
        const avg = total / data.length;
        setAverage(avg.toFixed(1)); // avrunda till en decimal
      } catch (err) {
        console.error("Kunde inte hämta betyg:", err);
        setError("Fel vid hämtning av betyg");
      }
    };

    fetchAverageRating();
  }, [recipeId]);

  if (error) return <p>{error}</p>;
  if (average === null) return <p>--</p>;

  return (
    <div className="average-stars-container">
      <div className="average-stars-wrapper">
        <div className="star-background">★★★★★</div>
        <div
          className="star-foreground"
          style={{ width: `${(average / 5) * 100}%` }}
        >
          ★★★★★
        </div>
      </div>
      <span className="average-rating-number">{average}</span>
    </div>
  );
};

export default AverageRatingTwo;
