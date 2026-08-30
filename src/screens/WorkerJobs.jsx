// function WorkerJobs({
//   jobs = [],
//   language,
//   onJobSelect,
//   onBack,
//   appliedJobIds = []
// }) {

//   const isKannada = language === "Kannada";

//   // Hide jobs that have no worker slots remaining
//   const availableJobs = jobs.filter(
//     (job) =>
//       Number(job.workersRemaining ?? job.workers) > 0
//   );

//   return (
//     <div className="worker-jobs-screen">

//       <header className="worker-jobs-header">

//         <button
//           className="back-button"
//           onClick={onBack}
//         >
//           ←
//         </button>

//         <h1>
//           {isKannada
//             ? "ಲಭ್ಯವಿರುವ ಕೆಲಸಗಳು"
//             : "Available Jobs"}
//         </h1>

//       </header>


//       {availableJobs.length === 0 ? (

//         <div className="empty-worker-jobs">

//           <div>
//             🌾
//           </div>

//           <h2>
//             {isKannada
//               ? "ಈಗ ಯಾವುದೇ ಕೆಲಸಗಳಿಲ್ಲ"
//               : "No jobs available"}
//           </h2>

//           <p>
//             {isKannada
//               ? "ಹೊಸ ಕೆಲಸಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ."
//               : "New jobs will appear here."}
//           </p>

//         </div>

//       ) : (

//         <div className="worker-job-list">

//           {availableJobs.map((job) => (

//             <div
//               className="worker-job-card"
//               key={job.id}
//             >

//               <h2>
//                 🌾 {job.workType}
//               </h2>

//               <p>
//                 📍 {job.location}
//               </p>

//               <p>
//                 📅 {job.date}
//               </p>

//               <p>
//                 💰 ₹{job.wage} / day
//               </p>

//               <p>
//                 👷 {job.workersRemaining}{" "}
//                 {isKannada
//                   ? "ಕೆಲಸಗಾರರು ಬೇಕು"
//                   : "workers needed"}
//               </p>


//               {appliedJobIds.includes(job.id) ? (

//                 <button
//                   disabled
//                 >
//                   ✓{" "}
//                   {isKannada
//                     ? "ಅನ್ವಯಿಸಲಾಗಿದೆ"
//                     : "Applied"}
//                 </button>

//               ) : (

//                 <button
//                   onClick={() => onJobSelect(job)}
//                 >
//                   {isKannada
//                     ? "ಕೆಲಸ ನೋಡಿ"
//                     : "View Job"}
//                 </button>

//               )}

//             </div>

//           ))}

//         </div>

//       )}

//     </div>
//   );
// }

// export default WorkerJobs;

function WorkerJobs({
  jobs = [],
  language,
  onJobSelect,
  onBack,
  appliedJobIds = []
}) {

  const isKannada = language === "Kannada";

  const availableJobs = jobs.filter(
    (job) =>
      Number(
        job.workersRemaining ?? job.workers ?? 0
      ) > 0
  );

  return (
    <div className="worker-jobs-screen">

      <header className="worker-jobs-header">

        <button
          className="back-button"
          onClick={onBack}
        >
          ←
        </button>

        <h1>
          {isKannada
            ? "ಲಭ್ಯವಿರುವ ಕೆಲಸಗಳು"
            : "Available Jobs"}
        </h1>

      </header>


      {availableJobs.length === 0 ? (

        <div className="empty-worker-jobs">

          <div>
            🌾
          </div>

          <h2>
            {isKannada
              ? "ಈಗ ಯಾವುದೇ ಕೆಲಸಗಳಿಲ್ಲ"
              : "No jobs available"}
          </h2>

          <p>
            {isKannada
              ? "ಹೊಸ ಕೆಲಸಗಳು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ."
              : "New jobs will appear here."}
          </p>

        </div>

      ) : (

        <div className="worker-job-list">

          {availableJobs.map((job) => {

            const remainingWorkers =
              Number(
                job.workersRemaining ??
                job.workers ??
                0
              );

            const alreadyApplied =
              appliedJobIds.includes(job.id);

            return (

              <div
                className="worker-job-card"
                key={job.id}
              >

                <h2>
                  🌾 {job.workType}
                </h2>

                <p>
                  📍 {job.location}
                </p>

                <p>
                  📅 {job.date}
                </p>

                <p>
                  💰 ₹{job.wage} / day
                </p>

                <p>
                  👷 {remainingWorkers}{" "}
                  {isKannada
                    ? "ಕೆಲಸಗಾರರು ಬೇಕು"
                    : "workers needed"}
                </p>


                {alreadyApplied ? (

                  <button disabled>
                    ✓{" "}
                    {isKannada
                      ? "ಅನ್ವಯಿಸಲಾಗಿದೆ"
                      : "Applied"}
                  </button>

                ) : (

                  <button
                    onClick={() =>
                      onJobSelect(job)
                    }
                  >
                    {isKannada
                      ? "ಕೆಲಸ ನೋಡಿ"
                      : "View Job"}
                  </button>

                )}

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
}

export default WorkerJobs;