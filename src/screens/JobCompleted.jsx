function JobCompleted({
  workers = [],
  job,
  language,
  theme,
  onRateWorkers,
  onHome,
  onThemeToggle
}) {

  const isKannada = language === "Kannada";

  return (
    <div className={`job-completed-screen ${theme}-theme`}>

      {/* Theme Toggle */}
      <button
        className="theme-toggle"
        onClick={onThemeToggle}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>


      {/* Content */}

      <div className="job-completed-content">

        <div className="success-icon">
          ✓
        </div>


        <h1>
          {isKannada
            ? "ಕೆಲಸ ಪೂರ್ಣಗೊಂಡಿದೆ!"
            : "Job Completed!"}
        </h1>


        <p>
          {isKannada
            ? "ಕೆಲಸವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಲಾಗಿದೆ."
            : "The job has been successfully completed."}
        </p>


        {job && (
          <div className="completed-job-card">

            <h3>
              {job.jobType || job.workType || "Farm Work"}
            </h3>

            {job.date && (
              <p>
                📅 {job.date}
              </p>
            )}

            {job.location && (
              <p>
                📍 {job.location}
              </p>
            )}

          </div>
        )}


        {/* Workers */}

        {workers.length > 0 && (

          <div className="completed-workers">

            <h3>
              {isKannada
                ? "ಕೆಲಸಗಾರರು"
                : "Workers"}
            </h3>

            {workers.map((worker, index) => (

              <div
                className="completed-worker"
                key={worker.id || index}
              >

                <span>
                  👤
                </span>

                <span>
                  {worker.name || "Worker"}
                </span>

              </div>

            ))}

          </div>

        )}


        {/* Rate */}

        <button
          className="rate-workers-button"
          onClick={onRateWorkers}
        >
          ⭐{" "}
          {isKannada
            ? "ಕೆಲಸಗಾರರಿಗೆ ರೇಟಿಂಗ್ ನೀಡಿ"
            : "Rate Workers"}
        </button>


        {/* Home */}

        <button
          className="home-button"
          onClick={onHome}
        >
          {isKannada
            ? "ಮುಖಪುಟಕ್ಕೆ ಹೋಗಿ"
            : "Go to Home"}
        </button>

      </div>

    </div>
  );
}


export default JobCompleted;
