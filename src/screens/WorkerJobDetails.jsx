// function WorkerJobDetails({
//   job,
//   language,
//   onAccept,
//   onBack
// }) {

//   const isKannada = language === "Kannada";

//   return (
//     <div className="worker-job-details-screen">

//       <header>

//         <button
//           className="back-button"
//           onClick={onBack}
//         >
//           ←
//         </button>

//         <h1>
//           {isKannada
//             ? "ಕೆಲಸದ ವಿವರಗಳು"
//             : "Job Details"}
//         </h1>

//       </header>


//       <section className="worker-job-detail-card">

//         <div className="big-job-icon">
//           🌾
//         </div>

//         <h2>
//           {job?.workType}
//         </h2>

//         <div className="detail-line">
//           📍 {job?.location}
//         </div>

//         <div className="detail-line">
//           📅 {job?.date}
//         </div>

//         <div className="detail-line">
//           ⏰ {job?.time || "Full Day"}
//         </div>

//         <div className="detail-line">
//           💰 ₹{job?.wage} / day
//         </div>

//         <div className="detail-line">
//           👷 {job?.workers}{" "}
//           {isKannada
//             ? "ಕೆಲಸಗಾರರು ಬೇಕು"
//             : "workers required"}
//         </div>

//       </section>


//       <div className="worker-job-note">

//         ℹ️

//         <p>
//           {isKannada
//             ? "ಕೆಲಸವನ್ನು ಒಪ್ಪಿಕೊಂಡ ನಂತರ ರೈತರು ನಿಮ್ಮನ್ನು ಕರೆ ಮಾಡಬಹುದು."
//             : "After accepting the job, the farmer can call you."}
//         </p>

//       </div>


//       <button
//         className="accept-job-button"
//         onClick={() => onAccept(job)}
//       >
//         ✓{" "}
//         {isKannada
//           ? "ಕೆಲಸ ಒಪ್ಪಿಕೊಳ್ಳಿ"
//           : "Accept Job"}
//       </button>

//     </div>
//   );
// }

// export default WorkerJobDetails;

function WorkerJobDetails({
  job,
  language,
  onAccept,
  onBack
}) {
  const isKannada = language === "Kannada";

  if (!job) {
    return (
      <div className="worker-job-details-screen">
        <button onClick={onBack}>
          ← {isKannada ? "ಹಿಂದೆ" : "Back"}
        </button>

        <h2>
          {isKannada
            ? "ಕೆಲಸ ಕಂಡುಬಂದಿಲ್ಲ"
            : "Job not found"}
        </h2>
      </div>
    );
  }

  const remainingWorkers = Number(
    job.workersRemaining ??
    job.workers ??
    0
  );

  return (
    <div className="worker-job-details-screen">

      <header className="worker-job-details-header">

        <button
          className="back-button"
          onClick={onBack}
        >
          ←
        </button>

        <h1>
          {isKannada
            ? "ಕೆಲಸದ ವಿವರಗಳು"
            : "Job Details"}
        </h1>

      </header>


      <div className="worker-job-details-card">

        <h2>
          🌾 {job.workType}
        </h2>

        <div className="job-detail-row">
          <strong>
            📍 {isKannada ? "ಸ್ಥಳ" : "Location"}
          </strong>

          <span>
            {job.location}
          </span>
        </div>


        <div className="job-detail-row">
          <strong>
            📅 {isKannada ? "ದಿನಾಂಕ" : "Date"}
          </strong>

          <span>
            {job.date}
          </span>
        </div>


        <div className="job-detail-row">
          <strong>
            💰 {isKannada ? "ದೈನಂದಿನ ವೇತನ" : "Daily Wage"}
          </strong>

          <span>
            ₹{job.wage}
          </span>
        </div>


        <div className="job-detail-row">
          <strong>
            👷 {isKannada
              ? "ಬೇಕಾದ ಕೆಲಸಗಾರರು"
              : "Workers Needed"}
          </strong>

          <span>
            {remainingWorkers}
          </span>
        </div>


        <button
          className="accept-job-button"
          onClick={() => onAccept(job)}
          disabled={remainingWorkers <= 0}
        >
          {remainingWorkers > 0
            ? isKannada
              ? "ಕೆಲಸ ಸ್ವೀಕರಿಸಿ"
              : "Accept Job"
            : isKannada
              ? "ಕೆಲಸಗಾರರ ಸ್ಥಾನಗಳು ಪೂರ್ಣ"
              : "No Worker Slots Available"}
        </button>

      </div>

    </div>
  );
}

export default WorkerJobDetails;