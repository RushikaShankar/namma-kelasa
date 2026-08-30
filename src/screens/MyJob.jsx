function MyJob({
  job,
  workers = [],
  language,
  theme,
  onBack,
  onHome,
  onThemeToggle
}) {

  const isKannada = language === "Kannada";

  if (!job) {

    return (
      <div className="my-job-screen">

        <header className="my-job-header">

          <button
            className="back-button"
            onClick={onBack}
          >
            ← {isKannada ? "ಹಿಂದೆ" : "Back"}
          </button>

          <h1>
            {isKannada ? "ನನ್ನ ಕೆಲಸ" : "My Job"}
          </h1>

          <button
            className="theme-toggle"
            onClick={onThemeToggle}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

        </header>

        <div className="no-job-card">

          <div className="no-job-icon">
            📋
          </div>

          <h2>
            {isKannada
              ? "ಯಾವುದೇ ಕೆಲಸವಿಲ್ಲ"
              : "No active job"}
          </h2>

          <p>
            {isKannada
              ? "ನೀವು ರಚಿಸಿದ ಕೆಲಸಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ."
              : "Your active job will appear here."}
          </p>

        </div>

      </div>
    );

  }


  return (

    <div className="my-job-screen">

      {/* HEADER */}

      <header className="my-job-header">

        <button
          className="back-button"
          onClick={onBack}
        >
          ← {isKannada ? "ಹಿಂದೆ" : "Back"}
        </button>

        <h1>
          {isKannada ? "ನನ್ನ ಕೆಲಸ" : "My Job"}
        </h1>

        <button
          className="theme-toggle"
          onClick={onThemeToggle}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

      </header>


      {/* JOB STATUS */}

      <div className="my-job-status">

        <span className="status-dot"></span>

        <span>
          {job.status === "Confirmed"
            ? isKannada
              ? "ದೃಢೀಕರಿಸಲಾಗಿದೆ"
              : "Confirmed"
            : job.status}
        </span>

      </div>


      {/* JOB INFORMATION */}

      <section className="my-job-card">

        <div className="my-job-title">

          <div className="my-job-icon">
            🌾
          </div>

          <div>

            <h2>
              {job.workType}
            </h2>

            <p>
              {isKannada
                ? "ಕೆಲಸದ ವಿವರಗಳು"
                : "Job details"}
            </p>

          </div>

        </div>


        <div className="my-job-details">

          <div className="my-job-detail">

            <span>📅</span>

            <div>

              <small>
                {isKannada ? "ದಿನಾಂಕ" : "Date"}
              </small>

              <p>
                {job.date}
              </p>

            </div>

          </div>


          <div className="my-job-detail">

            <span>📍</span>

            <div>

              <small>
                {isKannada ? "ಸ್ಥಳ" : "Location"}
              </small>

              <p>
                {job.location}
              </p>

            </div>

          </div>


          <div className="my-job-detail">

            <span>👷</span>

            <div>

              <small>
                {isKannada
                  ? "ಅಗತ್ಯವಿರುವ ಕೆಲಸಗಾರರು"
                  : "Workers required"}
              </small>

              <p>
                {job.workers}
              </p>

            </div>

          </div>


          <div className="my-job-detail">

            <span>₹</span>

            <div>

              <small>
                {isKannada
                  ? "ದೈನಂದಿನ ಕೂಲಿ"
                  : "Daily wage"}
              </small>

              <p>
                ₹{job.wage} / {isKannada ? "ದಿನ" : "day"}
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* WORKERS */}

      <section className="my-workers-section">

        <div className="section-title-row">

  <h2>
    {isKannada
      ? "ಆಯ್ಕೆ ಮಾಡಿದ ಕೆಲಸಗಾರರು"
      : "Selected Workers"}
  </h2>

  <span>
    {workers.length}/{job.workers}
  </span>

</div>

<p className="worker-count-status">
  {workers.length >= Number(job.workers)
    ? (
        isKannada
          ? "ಎಲ್ಲಾ ಕೆಲಸಗಾರರ ಸ್ಥಾನಗಳು ಭರ್ತಿಯಾಗಿವೆ"
          : "All worker positions are filled"
      )
    : (
        isKannada
          ? `${job.workers - workers.length} ಕೆಲಸಗಾರರ ಸ್ಥಾನಗಳು ಉಳಿದಿವೆ`
          : `${job.workers - workers.length} worker position${job.workers - workers.length === 1 ? "" : "s"} remaining`
      )}
</p>


        {workers.length === 0 ? (

          <div className="no-workers-card">

            <span>
              👷
            </span>

            <p>
              {isKannada
                ? "ಇನ್ನೂ ಯಾವುದೇ ಕೆಲಸಗಾರರನ್ನು ಆಯ್ಕೆ ಮಾಡಿಲ್ಲ."
                : "No workers selected yet."}
            </p>

          </div>

        ) : (

          workers.map((worker) => (

            <div
              className="my-worker-card"
              key={worker.id}
            >

              <div className="my-worker-avatar">
                👷
              </div>


              <div className="my-worker-info">

                <h3>
                  {worker.name}
                </h3>

                <p>
                  ⭐ {worker.rating}
                </p>

              </div>


              <div className="worker-confirmed">

                <span>✓</span>

                {isKannada
                  ? "ದೃಢೀಕರಿಸಲಾಗಿದೆ"
                  : "Confirmed"}

              </div>

            </div>

          ))

        )}

      </section>


      {/* TOTAL */}

      <section className="my-job-total">

        <div>

          <small>
            {isKannada
              ? "ಅಂದಾಜು ಒಟ್ಟು ದೈನಂದಿನ ಕೂಲಿ"
              : "Estimated total daily wage"}
          </small>

          <p>
            ₹
            {Number(job.wage || 0) *
              Number(workers.length || 0)}
          </p>

        </div>

      </section>


      {/* HOME BUTTON */}

      <button
        className="my-job-home-button"
        onClick={onHome}
      >
        {isKannada
          ? "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ"
          : "Back to Home"}
      </button>

    </div>

  );

}

export default MyJob;