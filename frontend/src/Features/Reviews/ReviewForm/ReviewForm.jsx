import "./reviewForm.css";
import { useEffect, useState } from "react";
import { client } from "../../../sanityClient";

const ReviewForm = ({ recipeId }) => {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === null) {
      setError("Du måste sätta ett betyg.");
      return;
    }

    const reviewDoc = {
      _type: "review",
      rating,
      reviewer: reviewer.trim(),
      recipe: {
        _type: "reference",
        _ref: recipeId,
      },
    };

    // Lägg bara till kommentar om den inte är tom
    const trimmedComment = comment.trim();
    if (trimmedComment) {
      reviewDoc.comment = trimmedComment;
    }

    try {
      await client.create(reviewDoc);
      setSuccess(true);
      setRating(null);
      setComment("");
      setReviewer("");
      setError(null);
      setTimeout(() => {
        setShowForm(false);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Kunde inte skicka recension:", err);
      setError("Något gick fel. Försök igen.");
    }
  };

  return (
    <div className="review-form-wrapper">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="open-review-form-btn"
          id="cyp-review-open-form-button"
        >
          Lämna recension
        </button>
      )}

      {showForm && (
        <div className="review-popup" onClick={() => setShowForm(false)}>
          <form
            className="review-form"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            {success && (
              <p className="review-success-message">Tack för din recension!</p>
            )}
            {error && <p className="review-error-message">{error}</p>}

            <h3 className="review-form-title">Gillade du receptet?</h3>
            <p className="review-subtitle">
              Lämna en recension genom att klicka på stjärnorna, fyll i ett namn
              och lämna en kommentar (frivilligt)!
            </p>

            <div className="review-stars" id="rating-stars">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setRating(val)}
                  aria-label={`Sätt betyg: ${val} av 5`}
                  className={`star-button ${val <= rating ? "selected" : ""}`}
                  id={`cyp-review-star-${val}`}
                >
                  ★
                </button>
              ))}
            </div>

            <input
              type="text"
              value={reviewer}
              onChange={(e) => setReviewer(e.target.value)}
              placeholder="Ange namn..."
              required
              className="review-input"
              id="cyp-review-input"
            />

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Lämna en kommentar (frivilligt)..."
              className="review-textarea"
              id="cyp-review-textarea"
            />

            {error && <p className="error-message">{error}</p>}

            <div className="review-buttons">
              <button
                type="submit"
                className="submit-btn"
                id="cyp-review-submit-button"
              >
                Skicka
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="cancel-btn"
                id="cyp-review-cancel-button"
              >
                Avbryt
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
