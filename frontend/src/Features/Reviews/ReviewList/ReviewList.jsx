import "./reviewList.css";
import { useEffect, useState } from "react";
import { client } from "../../../sanityClient";

const ReviewList = ({ recipeId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!recipeId) {
      setIsLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const query = `*[_type == "review" && recipe._ref == $recipeId] | order(_createdAt desc)[0...10]`;
        const params = { recipeId };
        const data = await client.fetch(query, params);
        setReviews(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Fel vid hämtning av recensioner:", err);
        setError("Kunde inte ladda recensioner");
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [recipeId]);

  if (isLoading) return <p className="review-loading">Laddar recensioner...</p>;
  if (error) return <p className="review-error">{error}</p>;
  if (!reviews.length)
    return <p className="review-missing">Inga recensioner än.</p>;

  return (
    <section className="review-container">
      <h2 className="review-title">Senaste recensionerna</h2>
      <ul className="review-list">
        {reviews.map((review) => (
          <li key={review._id} className="review-item">
            <section className="rating-and-reviewer-container">
              {/* Rating as stars */}
              <p className="review-rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < review.rating ? "⭐" : "☆"}</span>
                ))}
              </p>

              {/* Reviewer */}
              <p className="review-reviewer">Av: {review.reviewer}</p>
            </section>

            {/* Comment */}
            <p className="review-comment">
              {review.comment?.trim()
                ? review.comment
                : "Ingen kommentar lämnades"}
            </p>

            {/* Date */}
            <p className="review-date">
              Skapad:
              {new Date(review._createdAt).toLocaleDateString("sv-SE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <div className="review-separator"></div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ReviewList;
