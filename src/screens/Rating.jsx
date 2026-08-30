import { useState } from "react";

function Rating({
  worker,
  language,
  onSubmit,
  onSkip
}) {

  const isKannada = language === "Kannada";

  const [rating, setRating] = useState(0);


  return (
    <div className="rating-screen">

      <div className="rating-icon">
        ⭐
      </div>

      <h1>
        {isKannada
          ? "ಕೆಲಸಗಾರರನ್ನು ರೇಟ್ ಮಾಡಿ"
          : "Rate the Worker"}
      </h1>

      <p>
        {worker?.name}
      </p>


      <div className="star-rating">

        {[1, 2, 3, 4, 5].map((star) => (

          <button
            key={star}
            className={
              star <= rating
                ? "star selected"
                : "star"
            }
            onClick={() => setRating(star)}
          >
            ★
          </button>

        ))}

      </div>


      {rating > 0 && (

        <p className="rating-text">

          {rating === 1 && "Poor"}

          {rating === 2 && "Needs Improvement"}

          {rating === 3 && "Good"}

          {rating === 4 && "Very Good"}

          {rating === 5 && "Excellent"}

        </p>

      )}


      <button
        className="submit-rating-button"
        disabled={rating === 0}
        onClick={() => onSubmit(rating)}
      >
        {isKannada
          ? "ರೇಟಿಂಗ್ ಸಲ್ಲಿಸಿ"
          : "Submit Rating"}
      </button>


      <button
        className="skip-rating-button"
        onClick={onSkip}
      >
        {isKannada
          ? "ಈಗ ಬೇಡ"
          : "Skip"}
      </button>

    </div>
  );
}

export default Rating;