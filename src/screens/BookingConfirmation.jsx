function BookingConfirmation({
  workers = [],
  job,
  language,
  theme,
  onThemeToggle,
  onConfirm,
  onBack
}) {
  const isKannada = language === "Kannada";

  const requiredWorkers = Number(
    job?.workers || workers.length
  );

  const dailyWage = Number(
    job?.wage || 0
  );

  const totalWage =
    workers.length * dailyWage;

  const remainingWorkers = Math.max(
    requiredWorkers - workers.length,
    0
  );

  return (
    <div className={`booking-screen ${theme}-theme`}>

      {/* HEADER */}

      <header className="booking-header">

        <button
          className="back-button"
          onClick={onBack}
        >
          ←
        </button>

        <h1>
          {isKannada
            ? "ಬುಕಿಂಗ್ ದೃಢೀಕರಿಸಿ"
            : "Confirm Booking"}
        </h1>

        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

      </header>


      {/* SUMMARY */}

      <section className="booking-card">

        <h2>
          {isKannada
            ? "ಬುಕಿಂಗ್ ವಿವರಗಳು"
            : "Booking Summary"}
        </h2>


        {/* WORKERS */}

        <div className="selected-workers-list">

          {workers.map((worker) => (

            <div
              className="booking-worker"
              key={worker.id}
            >

              <div className="booking-avatar">
                👷
              </div>

              <div>

                <h3>
                  {worker.name}
                </h3>

                <p>
                  ⭐ {worker.rating || "New"}
                </p>

              </div>

            </div>

          ))}

        </div>


        {/* WORKER COUNT */}

        <div className="worker-selection-summary">

          <strong>
            {workers.length}/{requiredWorkers}
          </strong>

          <span>
            {isKannada
              ? " ಕೆಲಸಗಾರರು ಆಯ್ಕೆ"
              : " workers selected"}
          </span>

        </div>


        {remainingWorkers > 0 && (

          <div className="remaining-workers-message">

            {isKannada
              ? `${remainingWorkers} ಕೆಲಸಗಾರರನ್ನು ಇನ್ನೂ ಆಯ್ಕೆ ಮಾಡಬೇಕು.`
              : `${remainingWorkers} more worker(s) still need to be selected.`}

          </div>

        )}


        <div className="booking-divider"></div>


        {/* JOB */}

        <div className="booking-detail">

          <span>🌾</span>

          <div>

            <small>
              {isKannada ? "ಕೆಲಸ" : "Work"}
            </small>

            <p>
              {job?.workType}
            </p>

          </div>

        </div>


        {/* DATE */}

        <div className="booking-detail">

          <span>📅</span>

          <div>

            <small>
              {isKannada ? "ದಿನಾಂಕ" : "Date"}
            </small>

            <p>
              {job?.date}
            </p>

          </div>

        </div>


        {/* LOCATION */}

        <div className="booking-detail">

          <span>📍</span>

          <div>

            <small>
              {isKannada ? "ಸ್ಥಳ" : "Location"}
            </small>

            <p>
              {job?.location}
            </p>

          </div>

        </div>


        <div className="booking-divider"></div>


        {/* PAYMENT */}

        <div className="wage-row">

          <div>

            <small>
              {isKannada
                ? "ಪ್ರತಿ ಕೆಲಸಗಾರನ ದೈನಂದಿನ ಕೂಲಿ"
                : "Daily Wage per Worker"}
            </small>

            <p>
              ₹{dailyWage}
            </p>

          </div>


          <div className="total-wage">

            <small>
              {isKannada
                ? "ಒಟ್ಟು ಪಾವತಿ"
                : "Total Payment"}
            </small>

            <p>
              ₹{totalWage}
            </p>

          </div>

        </div>

      </section>


      {/* MESSAGE */}

      <div className="confirmation-message">

        <span>✓</span>

        <p>
          {workers.length >= requiredWorkers
            ? (
              isKannada
                ? "ಎಲ್ಲಾ ಕೆಲಸಗಾರರನ್ನು ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ. ಬುಕಿಂಗ್ ದೃಢೀಕರಿಸಿ."
                : "All required workers are selected. Confirm the booking."
            )
            : (
              isKannada
                ? "ಉಳಿದ ಕೆಲಸಗಾರರನ್ನು ಆಯ್ಕೆ ಮಾಡಲು ಹಿಂದೆ ಹೋಗಿ."
                : "Go back to select the remaining workers."
            )}
        </p>

      </div>


      {/* CONFIRM */}

      <button
        className="confirm-booking-button"
        onClick={onConfirm}
        disabled={
          workers.length < requiredWorkers
        }
      >
        {isKannada
          ? "ಬುಕಿಂಗ್ ದೃಢೀಕರಿಸಿ"
          : "Confirm Booking"}
      </button>

    </div>
  );
}

export default BookingConfirmation;