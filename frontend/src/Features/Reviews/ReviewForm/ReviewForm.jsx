import "./reviewForm.css";
import { useEffect, useState } from "react";
import { client } from "../../../sanityClient";

// Formulär för att lämna recensioner på ett recept
const ReviewForm = ({ recipeId }) => {
  // State för att kontrollera synlighet av formuläret (popup)
  const [showForm, setShowForm] = useState(false);

  // Betyg (1-5), kommentar och namn på recensent
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [reviewer, setReviewer] = useState("");

  // Visuell feedback-states
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Timer för att dölja success-meddelande efter x tid (2 sek)
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Hanterar inskick av formuläret
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validera att betyg är satt
    if (rating === null) {
      setError("Du måste sätta ett betyg.");
      return;
    }

    // Skapa dokument att skicka till Sanity
    const reviewDoc = {
      _type: "review",
      rating,
      reviewer: reviewer.trim(), // Tar bort whitespace
      recipe: {
        _type: "reference",
        _ref: recipeId,
      },
    };

    // Lägg bara till kommentar om det faktiskt finns och inte är tom
    const trimmedComment = comment.trim();
    if (trimmedComment) {
      reviewDoc.comment = trimmedComment;
    }

    try {
      // Skicka dokumentet till Sanity
      await client.create(reviewDoc);

      // Visa feedback och återställ formulär
      setSuccess(true);
      setRating(null);
      setComment("");
      setReviewer("");
      setError(null);

      // Stäng popup efter en kort stund
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
      {/* Knapp för att öppna popup-formuläret */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="open-review-form-btn"
          id="cyp-review-open-form-button"
        >
          Lämna recension
        </button>
      )}

      {/* Popup med formuläret, visas bara om showForm är true */}
      {showForm && (
        <div className="review-popup" onClick={() => setShowForm(false)}>
          <form
            className="review-form"
            onClick={(e) => e.stopPropagation()} // Hindra klick på popup från att stänga den
            onSubmit={handleSubmit}
          >
            {/* Visar feedbackmeddelande vid lyckad inskickning */}
            {success && (
              <p className="review-success-message">Tack för din recension!</p>
            )}
            {/* Visar felmeddelande vid t.ex. saknat betyg */}
            {error && <p className="review-error-message">{error}</p>}

            {/* Rubrik och instruktion */}
            <h3 className="review-form-title">Gillade du receptet?</h3>
            <p className="review-subtitle">
              Lämna en recension genom att klicka på stjärnorna, fyll i ett namn
              och lämna en kommentar (frivilligt)!
            </p>

            {/* Stjärnor för betygsättning */}
            <div className="review-stars" id="rating-stars">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setRating(val)}
                  aria-label={`Sätt betyg: ${val} av 5`} // Tillgänglighet
                  className={`star-button ${val <= rating ? "selected" : ""}`}
                  id={`cyp-review-star-${val}`} // För Cypress-test
                >
                  ★
                </button>
              ))}
            </div>

            {/* Fält för namn */}
            <input
              type="text"
              value={reviewer}
              onChange={(e) => setReviewer(e.target.value)}
              placeholder="Ange namn..."
              required
              className="review-input"
              id="cyp-review-input" // För Cypress-test
            />

            {/* Fält för kommentar (valfritt) */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Lämna en kommentar (frivilligt)..."
              className="review-textarea"
              id="cyp-review-textarea" // För Cypress-test
            />

            {error && <p className="error-message">{error}</p>}

            {/* Knappar: skicka eller avbryt */}
            <div className="review-buttons">
              <button
                type="submit"
                className="submit-btn"
                id="cyp-review-submit-button" // För Cypress-test
              >
                Skicka
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="cancel-btn"
                id="cyp-review-cancel-button" // För Cypress-test
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
