function NearbyWorkers({
  job,
  selectedWorkers = [],
  language,
  darkMode,
  onToggleTheme,
  onWorkerSelect,
  onBack
}) {

  const isKannada = language === "Kannada";

  // ==========================================
  // WORKER DATA
  // ==========================================

  const workers = [
    {
      id: 1,
      name: "Ramesh",
      age: 32,
      experience: "8 years",
      village: "Pandavapura",
      address: "Pandavapura, Mandya",
      distance: "2.1 km",
      rating: 4.5,
      phone: "9876543210"
    },
    {
      id: 2,
      name: "Kumar",
      age: 28,
      experience: "5 years",
      village: "Melukote",
      address: "Melukote, Mandya",
      distance: "3.4 km",
      rating: 4.3,
      phone: "9876543211"
    },
    {
      id: 3,
      name: "Manjunath",
      age: 35,
      experience: "10 years",
      village: "Srirangapatna",
      address: "Srirangapatna, Mandya",
      distance: "4.2 km",
      rating: 4.7,
      phone: "9876543212"
    },
    {
      id: 4,
      name: "Shiva",
      age: 30,
      experience: "6 years",
      village: "Mandya",
      address: "Mandya",
      distance: "5.1 km",
      rating: 4.2,
      phone: "9876543213"
    },
    {
      id: 5,
      name: "Prakash",
      age: 40,
      experience: "12 years",
      village: "Maddur",
      address: "Maddur, Mandya",
      distance: "6.3 km",
      rating: 4.6,
      phone: "9876543214"
    }
  ];


  // ==========================================
  // REMOVE ALREADY SELECTED WORKERS
  // ==========================================

  const availableWorkers = workers.filter(
    (worker) =>
      !selectedWorkers.some(
        (selectedWorker) =>
          selectedWorker.id === worker.id
      )
  );


  // ==========================================
  // REQUIRED WORKERS
  // ==========================================

  const requiredWorkers = Number(
    job?.workers || 1
  );


  const selectedCount =
    selectedWorkers.length;


  const remainingWorkers = Math.max(
    requiredWorkers - selectedCount,
    0
  );


  // ==========================================
  // SAFETY
  // ==========================================

  function handleWorkerClick(worker) {

    // No job = worker cannot be selected
    if (!job) {
      return;
    }


    // Worker already selected
    const alreadySelected =
      selectedWorkers.some(
        (selectedWorker) =>
          selectedWorker.id === worker.id
      );


    if (alreadySelected) {
      return;
    }


    // Required number already reached
    if (
      selectedWorkers.length >=
      requiredWorkers
    ) {
      return;
    }


    onWorkerSelect(worker);
  }


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div
      className={
        `nearby-workers-screen ${
          darkMode ? "dark-theme" : "light-theme"
        }`
      }
    >

      {/* ================================== */}
      {/* HEADER */}
      {/* ================================== */}

      <header className="nearby-workers-header">

        <button
          className="back-button"
          onClick={onBack}
        >
          ←
        </button>


        <div>

          <h1>
            {isKannada
              ? "ಹತ್ತಿರದ ಕೆಲಸಗಾರರು"
              : "Nearby Workers"}
          </h1>

          <p>
            {job?.workType || ""}
          </p>

        </div>


        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

      </header>


      {/* ================================== */}
      {/* JOB SUMMARY */}
      {/* ================================== */}

      {job && (

        <div className="nearby-job-summary">

          <div>

            <span>
              🌾
            </span>

            <div>

              <strong>
                {job.workType}
              </strong>

              <small>
                📍 {job.location}
              </small>

            </div>

          </div>


          <div>

            <strong>
              {job.wage
                ? `₹${job.wage}`
                : "₹0"}
            </strong>

            <small>
              {isKannada
                ? "ಪ್ರತಿ ಕೆಲಸಗಾರ"
                : "per worker"}
            </small>

          </div>

        </div>

      )}


      {/* ================================== */}
      {/* SELECTION STATUS */}
      {/* ================================== */}

      <div className="worker-selection-status">

        <div>

          <strong>
            {selectedCount}/{requiredWorkers}
          </strong>

          <span>
            {isKannada
              ? " ಕೆಲಸಗಾರರು ಆಯ್ಕೆ"
              : " workers selected"}
          </span>

        </div>


        {remainingWorkers > 0 && (

          <p>
            {isKannada
              ? `ಇನ್ನೂ ${remainingWorkers} ಕೆಲಸಗಾರರನ್ನು ಆಯ್ಕೆಮಾಡಿ`
              : `Select ${remainingWorkers} more worker${
                  remainingWorkers > 1
                    ? "s"
                    : ""
                }`}
          </p>

        )}

      </div>


      {/* ================================== */}
      {/* WORKER LIST */}
      {/* ================================== */}

      <main className="nearby-workers-list">

        {availableWorkers.length === 0 ? (

          <div className="no-workers">

            <div className="no-workers-icon">
              👷
            </div>

            <h2>
              {isKannada
                ? "ಕೆಲಸಗಾರರು ಲಭ್ಯವಿಲ್ಲ"
                : "No more workers available"}
            </h2>

            <p>
              {isKannada
                ? "ಈ ಕೆಲಸಕ್ಕಾಗಿ ಎಲ್ಲಾ ಲಭ್ಯವಿರುವ ಕೆಲಸಗಾರರನ್ನು ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ."
                : "All available workers have already been selected for this job."}
            </p>

          </div>

        ) : (

          availableWorkers.map((worker) => (

            <div
              className="worker-card"
              key={worker.id}
            >

              {/* AVATAR */}

              <div className="worker-avatar">
                👷
              </div>


              {/* DETAILS */}

              <div className="worker-card-info">

                <h2>
                  {worker.name}
                </h2>

                <div className="worker-rating">
                  ⭐ {worker.rating}
                </div>

                <p>
                  🛠️ {worker.experience}
                </p>

                <p>
                  📍 {worker.distance}
                </p>

                <p>
                  🏡 {worker.village}
                </p>

              </div>


              {/* VIEW */}

              <button
                className="view-worker-button"
                onClick={() =>
                  handleWorkerClick(worker)
                }
              >
                {isKannada
                  ? "ವೀಕ್ಷಿಸಿ"
                  : "View"}
              </button>

            </div>

          ))

        )}

      </main>


      {/* ================================== */}
      {/* FOOTER */}
      {/* ================================== */}

      {/* Intentionally no footer */}

    </div>

  );
}

export default NearbyWorkers;