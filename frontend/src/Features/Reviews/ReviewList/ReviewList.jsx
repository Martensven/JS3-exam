import "./reviewList.css";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { client } from "../../../sanityClient";

// Komponent som visar alla recensioner för ett givet recept
const ReviewList = ({ recipeId }) => {
  // Local state för lagring av recensioner, laddningsstatus, sidindelning, felmeddelande etc.
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0); // State som hanterar aktuell pagineringssida
  const pageSize = 10; // antal recensioner som visas per sida

  // Referens till sektionen för recensioner (för smooth scroll)
  // Leder till toppen av recensionerna när man byter sida, istället för toppen av hela sidan
  const reviewSectionRef = useRef(null);

  // useEffect triggas när recipeId eller sida ändras
  useEffect(() => {
    if (!recipeId) {
      // Om recept-ID saknas, stoppa laddning
      setIsLoading(false);
      return;
    }

    // Funktion för att hämta recensioner från Sanity
    const fetchReviews = async () => {
      try {
        // Räkna ut pagineringsintervall baserat på sida
        const start = page * pageSize;
        const end = start + pageSize;

        setIsLoading(true);

        // GROQ-query som hämtar de senaste recensionerna för ett visst recept
        const query = `
          *[_type == "review" && recipe._ref == $recipeId]
          | order(_createdAt desc)[${start}...${end}]
          `;
        const params = { recipeId };
        const data = await client.fetch(query, params);

        // Uppdatera state med resultat
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

  // Visa laddningsstatus
  if (isLoading) return <p className="review-loading">Laddar recensioner...</p>;

  // Visa eventuella felmeddelanden
  if (error) return <p className="review-error">{error}</p>;

  // Visa placeholder-meddelande om inga recensioner finns
  if (!reviews.length)
    return <p className="review-missing">Inga recensioner än.</p>;

  // Rendering av recensionerna + pagination
  return (
    <section className="review-container" ref={reviewSectionRef}>
      <h2 className="review-title">Recensioner</h2>
      <ul className="review-list">
        {reviews.map((review) => (
          <li key={review._id} className="review-item">
            <section className="rating-and-reviewer-container">
              {/* Visa stjärnor för betyg */}
              <p className="review-rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < review.rating ? "⭐" : "☆"}</span>
                ))}
              </p>

              {/* Visa användarnamn */}
              <p className="review-reviewer">Av: {review.reviewer}</p>
            </section>

            {/* Visa kommentar om den finns, annars placeholder */}
            <p className="review-comment">
              {review.comment?.trim()
                ? review.comment
                : "- Ingen kommentar lämnades -"}
            </p>

            {/* Visa formaterat datum för recensionen */}
            <p className="review-date">
              Skapad:
              {new Date(review._createdAt).toLocaleDateString("sv-SE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {/* Visuell separator mellan recensioner (ett streck) */}
            <div className="review-separator"></div>
          </li>
        ))}
      </ul>

      {/* Navigeringsknappar för sidbyte */}
      <div className="pagination">
        <button
          className="pagination-button"
          id="cyp-pagination-previous-button" // För Cypress-test
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
          id="cyp-pagination-next-button" // För Cypress-test
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

      {/* Knapp för att återgå till första sidan */}
      <div className="pagination-back-to-start">
        <button
          className="pagination-button"
          id="cyp-pagination-return-button" // För Cypress-test
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
