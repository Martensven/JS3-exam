import "./reviewList.css";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { client } from "../../../sanityClient";

const ReviewList = ({ recipeId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const reviewSectionRef = useRef(null);
  useEffect(() => {
    if (!recipeId) {
      setIsLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const start = page * pageSize;
        const end = start + pageSize;
        setIsLoading(true);
        const query = `
          *[_type == "review" && recipe._ref == $recipeId]
          | order(_createdAt desc)[${start}...${end}]
          `;
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
  }, [recipeId, page]);

  if (isLoading) return <p className="review-loading">Laddar recensioner...</p>;
  if (error) return <p className="review-error">{error}</p>;
  if (!reviews.length)
    return <p className="review-missing">Inga recensioner än.</p>;

  return (
    <section className="review-container" ref={reviewSectionRef}>
      <h2 className="review-title">Recensioner</h2>
      <ul className="review-list">
        {reviews.map((review) => (
          <li key={review._id} className="review-item">
            <section className="rating-and-reviewer-container">
              <p className="review-rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < review.rating ? "⭐" : "☆"}</span>
                ))}
              </p>

              <p className="review-reviewer">Av: {review.reviewer}</p>
            </section>

            <p className="review-comment">
              {review.comment?.trim()
                ? review.comment
                : "- Ingen kommentar lämnades -"}
            </p>

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
      <div className="pagination">
        <button
          className="pagination-button"
          id="cyp-pagination-previous-button"
          onClick={() => {
            const next = Math.max(page - 1, 0);
            setPage(next);
            setTimeout(() => {
              reviewSectionRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 0);
          }}
          disabled={page === 0}
        >
          ←
        </button>
        <p className="pagination-page-number">Sida {page + 1}</p>
        <button
          className="pagination-button"
          id="cyp-pagination-next-button"
          onClick={() => {
            const next = page + 1;
            setPage(next);
            setTimeout(() => {
              reviewSectionRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 0);
          }}
          disabled={reviews.length < pageSize}
        >
          →
        </button>
      </div>
      <div className="pagination-back-to-start">
        <button
          className="pagination-button"
          id="cyp-pagination-return-button"
          onClick={() => {
            setPage(0);
            setTimeout(() => {
              reviewSectionRef.current?.scrollIntoView({
                behavior: "smooth",
              });
            }, 0);
          }}
          disabled={page === 0}
        >
          ⇤
        </button>
      </div>
    </section>
  );
};

export default ReviewList;
