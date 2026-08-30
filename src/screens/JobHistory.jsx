function JobHistory({
  jobHistory = [],
  language,
  theme,
  onBack,
  onDeleteJob,
  onThemeToggle
}) {
  const isKannada = language === "Kannada";

  function handleDelete(id) {

    const confirmed = window.confirm(
      isKannada
        ? "ಈ ಕೆಲಸವನ್ನು ಅಳಿಸಲು ನೀವು ಖಚಿತವಾಗಿದ್ದೀರಾ?"
        : "Are you sure you want to delete this job?"
    );

    if (confirmed) {
      onDeleteJob(id);
    }
  }

  return (
    <div className={`job-history-screen ${theme}-theme`}>

      {/* HEADER */}

      <header className="job-history-header">

        <button
          className="back-button"
          onClick={onBack}
        >
          ← {isKannada
            ? "ಹಿಂದೆ"
            : "Back"}
        </button>

        <h1>
          {isKannada
            ? "ಕೆಲಸದ ಇತಿಹಾಸ"
            : "Job History"}
        </h1>

        <button
          className="theme-toggle"
          onClick={onThemeToggle}
        >
          {theme === "light"
            ? "🌙"
            : "☀️"}
        </button>

      </header>


      {jobHistory.length === 0 ? (

        <div className="empty-job-card">

          <div className="empty-icon">
            📋
          </div>

          <h3>
            {isKannada
              ? "ಇನ್ನೂ ಯಾವುದೇ ಕೆಲಸಗಳಿಲ್ಲ"
              : "No job history"}
          </h3>

          <p>
            {isKannada
              ? "ನೀವು ರಚಿಸುವ ಕೆಲಸಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ."
              : "Jobs you create will appear here."}
          </p>

        </div>

      ) : (

        <div className="job-history-list">

          {jobHistory.map((item) => {

            const bookedCount =
              item.bookedWorkers?.length || 0;

            const totalPayment =
              bookedCount *
              Number(item.wage || 0);

            return (

              <div
                className="history-job-card"
                key={item.id}
              >

                <div className="history-job-top">

                  <div className="job-type-icon">
                    🌾
                  </div>

                  <div>

                    <h2>
                      {item.workType}
                    </h2>

                    <p>
                      📍 {item.location}
                    </p>

                  </div>

                </div>


                <div className="history-job-details">

                  <div>
                    📅 {item.date}
                  </div>

                  <div>
                    👷 {item.workers}{" "}
                    {isKannada
                      ? "ಕೆಲಸಗಾರರು"
                      : "workers"}
                  </div>

                  <div>
                    ₹{item.wage}/
                    {isKannada
                      ? "ದಿನ"
                      : "day"}
                  </div>

                </div>


                {/* BOOKING */}

                <div className="history-booking-summary">

                  <div>
                    <strong>
                      {bookedCount}/{item.workers}
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


                <div className="history-job-bottom">

                  <span className="job-status">
                    {item.status}
                  </span>


                  <button
                    className="delete-job-button"
                    onClick={() =>
                      handleDelete(item.id)
                    }
                  >
                    🗑️{" "}
                    {isKannada
                      ? "ಅಳಿಸಿ"
                      : "Delete"}
                  </button>

                </div>

              </div>

            );
          })}

        </div>

      )}

    </div>
  );
}

export default JobHistory;