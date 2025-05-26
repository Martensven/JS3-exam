import "./averageRating.css";
import { useEffect, useState } from "react";
import { client } from "../../../sanityClient";

const AverageRating = ({ recipeId }) => {
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
        setAverage(avg.toFixed(1));
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
    <div className="star-shape">
      <p>{average}</p>
    </div>
  );
};

export default AverageRating;
