function WorkerDetails({
  worker,
  job,
  language,
  theme,
  selectedWorkers = [],
  onThemeToggle,
  onBack,
  onChooseWorker
}) {
  const isKannada = language === "Kannada";

  const requiredWorkers = Number(
    job?.workers || 1
  );

  const selectedCount =
    selectedWorkers.length;

  const alreadySelected =
    selectedWorkers.some(
      (item) => item.id === worker?.id
    );

  const remainingWorkers = Math.max(
    requiredWorkers - selectedCount,
    0
  );

  return (
    <div className={`worker-details-screen ${theme}-theme`}>

      {/* HEADER */}

      <header className="worker-details-header">

        <button
          className="back-button"
          onClick={onBack}
        >
          ←
        </button>

        <h1>
          {isKannada
            ? "ಕೆಲಸಗಾರರ ವಿವರಗಳು"
            : "Worker Details"}
        </h1>

        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

      </header>


      {/* SELECTION STATUS */}

      <div className="worker-selection-status">

        <strong>
          {selectedCount}/{requiredWorkers}
        </strong>

        <span>
          {isKannada
            ? " ಕೆಲಸಗಾರರು ಆಯ್ಕೆ"
            : " workers selected"}
        </span>

      </div>


      {/* PROFILE */}

      <section className="worker-profile-card">

        <div className="large-worker-avatar">
          👷
        </div>

        <h2>
          {worker?.name}
        </h2>

        <div className="large-rating">
          ⭐ {worker?.rating || "New"}
        </div>

        <p>
          {worker?.distance || "—"}{" "}
          {isKannada
            ? "ದೂರ"
            : "away"}
        </p>

      </section>


      {/* INFORMATION */}

      <section className="worker-info-section">

        <h2>
          {isKannada
            ? "ಕೆಲಸಗಾರರ ಬಗ್ಗೆ"
            : "About the Worker"}
        </h2>


        {/* AGE */}

        <div className="worker-info-row">

          <span>🎂</span>

          <div>

            <small>
              {isKannada
                ? "ವಯಸ್ಸು"
                : "Age"}
            </small>

            <p>
              {worker?.age || "—"}
            </p>

          </div>

        </div>


        {/* EXPERIENCE */}

        <div className="worker-info-row">

          <span>🛠️</span>

          <div>

            <small>
              {isKannada
                ? "ಅನುಭವ"
                : "Experience"}
            </small>

            <p>
              {worker?.experience || "—"}
            </p>

          </div>

        </div>


        {/* ADDRESS */}

        <div className="worker-info-row">

          <span>🏡</span>

          <div>

            <small>
              {isKannada
                ? "ಗ್ರಾಮ / ವಿಳಾಸ"
                : "Village / Address"}
            </small>

            <p>
              {worker?.address ||
                worker?.village ||
                "—"}
            </p>

          </div>

        </div>


        {/* DISTANCE */}

        <div className="worker-info-row">

          <span>📍</span>

          <div>

            <small>
              {isKannada
                ? "ದೂರ"
                : "Distance"}
            </small>

            <p>
              {worker?.distance || "—"}{" "}
              {isKannada
                ? "ನಿಮ್ಮ ಜಮೀನಿನಿಂದ"
                : "from your farm"}
            </p>

          </div>

        </div>


        {/* AVAILABILITY */}

        <div className="worker-info-row">

          <span>🟢</span>

          <div>

            <small>
              {isKannada
                ? "ಲಭ್ಯತೆ"
                : "Availability"}
            </small>

            <p>
              {isKannada
                ? "ಕೆಲಸಕ್ಕೆ ಲಭ್ಯವಿದೆ"
                : "Available for work"}
            </p>

          </div>

        </div>

      </section>


      {/* JOB */}

      <section className="worker-job-card">

        <h2>
          {isKannada
            ? "ನಿಮ್ಮ ಕೆಲಸ"
            : "Your Job"}
        </h2>

        <div className="job-info-line">
          <span>🌾</span>
          <p>{job?.workType}</p>
        </div>

        <div className="job-info-line">
          <span>📅</span>
          <p>{job?.date}</p>
        </div>

        <div className="job-info-line">
          <span>₹</span>
          <p>
            ₹{job?.wage || 0}/
            {isKannada
              ? "ದಿನ"
              : "day"}
          </p>
        </div>

      </section>


      {/* CALL */}

      <a
        href={`tel:${worker?.phone || ""}`}
        className="call-worker-button"
      >
        📞{" "}
        {isKannada
          ? "ಕೆಲಸಗಾರರಿಗೆ ಕರೆ ಮಾಡಿ"
          : "Call Worker"}
      </a>


      {/* SELECT */}

      <button
        className="choose-worker-button"
        disabled={
          alreadySelected ||
          selectedCount >= requiredWorkers
        }
        onClick={() =>
          onChooseWorker(worker)
        }
      >
        {alreadySelected
          ? (
            isKannada
              ? "ಈ ಕೆಲಸಗಾರರನ್ನು ಈಗಾಗಲೇ ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ ✓"
              : "Worker Already Selected ✓"
          )
          : selectedCount >= requiredWorkers
            ? (
              isKannada
                ? "ಎಲ್ಲಾ ಕೆಲಸಗಾರರನ್ನು ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ"
                : "All Workers Selected"
            )
            : (
              isKannada
                ? "ಈ ಕೆಲಸಗಾರರನ್ನು ಆಯ್ಕೆಮಾಡಿ"
                : "Choose This Worker"
            )}
      </button>


      {/* REMAINING WORKERS */}

      {!alreadySelected &&
        remainingWorkers > 1 && (

          <p className="remaining-workers-text">

            {isKannada
              ? `ಈ ಕೆಲಸಗಾರರನ್ನು ಆಯ್ಕೆ ಮಾಡಿದ ನಂತರ ಇನ್ನೂ ${remainingWorkers - 1} ಕೆಲಸಗಾರರನ್ನು ಆಯ್ಕೆ ಮಾಡಬೇಕು.`
              : `After selecting this worker, ${remainingWorkers - 1} more worker(s) will be needed.`}

          </p>

        )}

    </div>
  );
}

export default WorkerDetails;