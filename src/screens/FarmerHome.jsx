function FarmerHome({
  farmer,
  job,
  language,
  theme,
  onCreateJob,
  onProfile,
  onJobHistory,
  onThemeToggle,
  onViewJob
}) {
  const isKannada = language === "Kannada";

  const bookedWorkers = job?.bookedWorkers || [];
  const bookedCount = bookedWorkers.length;
  const requiredWorkers = Number(job?.workers || 0);

  const totalPayment =
    bookedCount * Number(job?.wage || 0);

  return (
    <div className="farmer-home">

      {/* ================================= */}
      {/* FIXED TOP-RIGHT CONTROLS */}
      {/* ================================= */}

      <div className="top-right-controls">

        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label="Toggle dark and light mode"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <button
          className="profile-button"
          onClick={onProfile}
          aria-label="Open profile"
        >
          👤
        </button>

      </div>


      {/* HEADER */}

      <header className="home-header">

        <div className="app-name">
          NAMMA KELASA
        </div>

      </header>


      {/* GREETING */}

      <section className="greeting-section">

        <p className="greeting-small">
          {isKannada ? "ನಮಸ್ಕಾರ 🙏" : "Namaste 🙏"}
        </p>

        <h1>
          {farmer?.name ||
            (isKannada ? "ರೈತ" : "Farmer")}
        </h1>

        <p className="greeting-message">
          {isKannada
            ? "ನಿಮ್ಮ ಕೃಷಿ ಕೆಲಸವನ್ನು ಸುಲಭವಾಗಿ ನಿರ್ವಹಿಸಿ"
            : "Manage your farm work with ease"}
        </p>

      </section>


      {/* CREATE JOB */}

      <section className="create-job-card">

        <div className="create-job-icon">
          ➕
        </div>

        <div className="create-job-content">

          <h2>
            {isKannada
              ? "ಕೆಲಸವನ್ನು ರಚಿಸಿ"
              : "Create a Job"}
          </h2>

          <p>
            {isKannada
              ? "ನಿಮಗೆ ಬೇಕಾದ ಕೆಲಸದ ವಿವರಗಳನ್ನು ನಮಗೆ ತಿಳಿಸಿ"
              : "Tell us what work you need help with"}
          </p>

          <button
            className="create-job-button"
            onClick={onCreateJob}
          >
            {isKannada
              ? "ಕೆಲಸ ರಚಿಸಿ →"
              : "Create Job →"}
          </button>

        </div>

      </section>


      {/* YOUR JOBS */}

      <section className="home-section">

        <div className="section-header">

          <h2 className="section-title">
            {isKannada
              ? "ನಿಮ್ಮ ಕೆಲಸಗಳು"
              : "Your Jobs"}
          </h2>

          <button
            className="view-all-button"
            onClick={onJobHistory}
          >
            {isKannada
              ? "ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ"
              : "View All"}
          </button>

        </div>


        {job ? (

          <div className="job-card">

            <div className="job-card-top">

              <div className="job-type-icon">
                🌾
              </div>

              <div>

                <h3>
                  {job.workType}
                </h3>

                <p>
                  📍 {job.location}
                </p>

              </div>

            </div>


            {/* BASIC JOB DETAILS */}

            <div className="job-details">

              <div>
                <span>📅</span>
                <p>{job.date}</p>
              </div>

              <div>
                <span>👷</span>
                <p>
                  {requiredWorkers}{" "}
                  {isKannada
                    ? "ಕೆಲಸಗಾರರು"
                    : "workers"}
                </p>
              </div>

              <div>
                <span>₹</span>
                <p>
                  ₹{job.wage}/
                  {isKannada
                    ? "ದಿನ"
                    : "day"}
                </p>
              </div>

            </div>


            {/* WORKER BOOKING STATUS */}

            <div className="job-booking-summary">

              <div>
                <strong>
                  {bookedCount}/{requiredWorkers}
                </strong>

                <span>
                  {isKannada
                    ? " ಕೆಲಸಗಾರರು ಆಯ್ಕೆ"
                    : " workers selected"}
                </span>
              </div>

              <div>
                <strong>
                  ₹{totalPayment}
                </strong>

                <span>
                  {isKannada
                    ? " ಒಟ್ಟು"
                    : " total"}
                </span>
              </div>

            </div>


            {/* STATUS */}

            <div className="job-status-row">

              <span>
                {job.status === "Confirmed"
                  ? "✓"
                  : "●"}{" "}
                {job.status === "Fully Booked"
                  ? isKannada
                    ? "ಎಲ್ಲಾ ಕೆಲಸಗಾರರು ಆಯ್ಕೆ"
                    : "All workers selected"
                  : job.status === "Confirmed"
                    ? isKannada
                      ? "ಬುಕಿಂಗ್ ದೃಢೀಕರಿಸಲಾಗಿದೆ"
                      : "Booking confirmed"
                    : isKannada
                      ? "ಕೆಲಸಗಾರರನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ"
                      : "Finding workers"}
              </span>

            </div>


            <button
              className="view-job-button"
              onClick={onViewJob}
            >
              {isKannada
                ? "ಕೆಲಸ ವೀಕ್ಷಿಸಿ"
                : "View Job"}
            </button>

          </div>

        ) : (

          <div className="empty-job-card">

            <div className="empty-icon">
              📋
            </div>

            <h3>
              {isKannada
                ? "ಇನ್ನೂ ಯಾವುದೇ ಕೆಲಸಗಳಿಲ್ಲ"
                : "No jobs yet"}
            </h3>

            <p>
              {isKannada
                ? "ಕೆಲಸಗಾರರನ್ನು ಹುಡುಕಲು ನಿಮ್ಮ ಮೊದಲ ಕೆಲಸವನ್ನು ರಚಿಸಿ."
                : "Create your first job to find workers."}
            </p>

          </div>

        )}

      </section>

      {/* NO FOOTER / BOTTOM NAVIGATION */}

    </div>
  );
}

export default FarmerHome;