import { useState } from "react";

function CreateJob({
  farmer,
  language,
  onJobCreated,
  onBack,
  theme,
  onThemeToggle
}) {
  const [workType, setWorkType] = useState("");
  const [date, setDate] = useState("");
  const [workers, setWorkers] = useState("");
  const [wage, setWage] = useState("");
  const [location, setLocation] = useState("");

  const isKannada = language === "Kannada";

  // Today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(event) {
    event.preventDefault();

    if (!workType || !date || !workers || !wage || !location.trim()) {
      alert(
        isKannada
          ? "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ."
          : "Please fill in all the details."
      );
      return;
    }

    // Prevent past dates
    if (date < today) {
      alert(
        isKannada
          ? "ಹಿಂದಿನ ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆ ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ."
          : "You cannot select a past date."
      );
      return;
    }

    if (Number(workers) < 1) {
      alert(
        isKannada
          ? "ಕನಿಷ್ಠ ಒಬ್ಬ ಕೆಲಸಗಾರನನ್ನು ಆಯ್ಕೆಮಾಡಿ."
          : "Please select at least one worker."
      );
      return;
    }

    if (Number(wage) < 1) {
      alert(
        isKannada
          ? "ದಯವಿಟ್ಟು ಸರಿಯಾದ ದೈನಂದಿನ ಕೂಲಿಯನ್ನು ನಮೂದಿಸಿ."
          : "Please enter a valid daily wage."
      );
      return;
    }

    const jobData = {
  farmer: farmer.id,
  work_type: workType,
  date: date,
  workers_required: Number(workers),
  wage: Number(wage),
  location: location.trim()
};

try {
  const response = await fetch(
    "http://127.0.0.1:8000/api/users/jobs/create/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jobData)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Job creation failed:", data);
    alert(
      isKannada
        ? "ಕೆಲಸವನ್ನು ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ."
        : "Failed to create job."
    );
    return;
  }

  console.log("Job created successfully:", data);

  onJobCreated({
    workType: data.work_type,
    date: data.date,
    workers: data.workers_required,
    wage: data.wage,
    location: data.location,
    id: data.id
  });

} catch (error) {
  console.error("Error creating job:", error);

  alert(
    isKannada
      ? "ಸರ್ವರ್‌ಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ."
      : "Could not connect to the server."
  );
}
  }

  return (
    <div className="create-job-screen">

      {/* Theme Toggle */}
      <button
        className="theme-toggle"
        onClick={onThemeToggle}
        aria-label="Toggle dark and light mode"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <div className="create-job-container">

        {/* Back */}
        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← {isKannada ? "ಹಿಂದೆ" : "Back"}
        </button>

        {/* Header */}
        <div className="create-job-header">

          <div className="create-job-icon-large">
            🌾
          </div>

          <div>
            <h1>
              {isKannada ? "ಕೆಲಸವನ್ನು ರಚಿಸಿ" : "Create a Job"}
            </h1>

            <p>
              {isKannada
                ? "ನಿಮಗೆ ಬೇಕಾದ ಕೆಲಸದ ವಿವರಗಳನ್ನು ನಮಗೆ ತಿಳಿಸಿ"
                : "Tell us what work you need help with"}
            </p>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Work Type */}
          <div className="job-input-group">

            <label>
              {isKannada ? "ಕೆಲಸದ ಪ್ರಕಾರ" : "Type of Work"}
            </label>

            <select
              value={workType}
              onChange={(event) =>
                setWorkType(event.target.value)
              }
            >
              <option value="">
                {isKannada
                  ? "ಕೆಲಸದ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ"
                  : "Select work type"}
              </option>

              <option value="Harvesting">
                {isKannada ? "ಕೊಯ್ಲು" : "Harvesting"}
              </option>

              <option value="Weeding">
                {isKannada ? "ಕಳೆ ತೆಗೆಯುವುದು" : "Weeding"}
              </option>

              <option value="Planting">
                {isKannada ? "ಬಿತ್ತನೆ" : "Planting"}
              </option>

              <option value="Transplanting">
                {isKannada ? "ನಾಟಿ" : "Transplanting"}
              </option>

              <option value="Irrigation">
                {isKannada ? "ನೀರಾವರಿ" : "Irrigation"}
              </option>

              <option value="Other">
                {isKannada ? "ಇತರೆ" : "Other"}
              </option>
            </select>

          </div>

          {/* Date */}
          <div className="job-input-group">

            <label>
              {isKannada ? "ಕೆಲಸದ ದಿನಾಂಕ" : "Date of Work"}
            </label>

            <input
              type="date"
              value={date}
              min={today}
              onChange={(event) =>
                setDate(event.target.value)
              }
            />

            <small>
              {isKannada
                ? "ಇಂದಿನ ದಿನಾಂಕ ಅಥವಾ ಮುಂದಿನ ದಿನಾಂಕವನ್ನು ಮಾತ್ರ ಆಯ್ಕೆಮಾಡಿ."
                : "Only today or a future date can be selected."}
            </small>

          </div>

          {/* Workers */}
          <div className="job-input-group">

            <label>
              {isKannada
                ? "ಕೆಲಸಗಾರರ ಸಂಖ್ಯೆ"
                : "Number of Workers"}
            </label>

            <input
              type="number"
              min="1"
              placeholder={
                isKannada
                  ? "ಎಷ್ಟು ಕೆಲಸಗಾರರು ಬೇಕು?"
                  : "How many workers do you need?"
              }
              value={workers}
              onChange={(event) =>
                setWorkers(event.target.value)
              }
            />

          </div>

          {/* Wage */}
          <div className="job-input-group">

            <label>
              {isKannada
                ? "ಪ್ರತಿ ಕೆಲಸಗಾರನ ದೈನಂದಿನ ಕೂಲಿ"
                : "Daily Wage per Worker"}
            </label>

            <div className="wage-input">

              <span>₹</span>

              <input
                type="number"
                min="1"
                placeholder={
                  isKannada
                    ? "ಮೊತ್ತವನ್ನು ನಮೂದಿಸಿ"
                    : "Enter amount"
                }
                value={wage}
                onChange={(event) =>
                  setWage(event.target.value)
                }
              />

            </div>

          </div>

          {/* Location */}
          <div className="job-input-group">

            <label>
              {isKannada ? "ಜಮೀನಿನ ಸ್ಥಳ" : "Farm Location"}
            </label>

            <input
              type="text"
              placeholder={
                isKannada
                  ? "ಗ್ರಾಮ / ಪ್ರದೇಶವನ್ನು ನಮೂದಿಸಿ"
                  : "Enter village / area"
              }
              value={location}
              onChange={(event) =>
                setLocation(event.target.value)
              }
            />

          </div>

          {/* Map */}
          {location.trim() && (
            <div className="map-section">

              <p>
                📍{" "}
                {isKannada
                  ? "ಸ್ಥಳದ ನಕ್ಷೆ"
                  : "Location on Map"}
              </p>

              <iframe
                title="Farm Location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  location
                )}&output=embed`}
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />

            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="create-job-submit"
          >
            {isKannada
              ? "ಕೆಲಸವನ್ನು ರಚಿಸಿ"
              : "Create Job"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateJob;