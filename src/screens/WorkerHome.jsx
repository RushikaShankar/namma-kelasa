// function WorkerHome({
//   worker,
//   language,
//   theme,
//   onFindJobs,
//   onProfile,
//   onThemeToggle
// }) {

//   const isKannada = language === "Kannada";

//   return (
//     <div className="worker-home-screen">

//       <header className="worker-home-header">

//         <div>

//           <p>
//             {isKannada
//               ? "ಸ್ವಾಗತ"
//               : "Welcome"}
//           </p>

//           <h1>
//             {worker?.name}
//           </h1>

//         </div>

//         <button
//           className="theme-toggle"
//           onClick={onThemeToggle}
//         >
//           {theme === "light" ? "🌙" : "☀️"}
//         </button>

//       </header>


//       <div className="worker-availability-card">

//         <span className="available-dot">
//           ●
//         </span>

//         <div>

//           <h2>
//             {isKannada
//               ? "ಕೆಲಸಕ್ಕೆ ಲಭ್ಯವಿದೆ"
//               : "Available for Work"}
//           </h2>

//           <p>
//             {isKannada
//               ? "ರೈತರು ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಬಹುದು."
//               : "Farmers can contact you for work."}
//           </p>

//         </div>

//       </div>


//       <button
//         className="find-jobs-button"
//         onClick={onFindJobs}
//       >
//         🔍{" "}
//         {isKannada
//           ? "ಕೆಲಸ ಹುಡುಕಿ"
//           : "Find Jobs"}
//       </button>


//       <button
//         className="worker-profile-button"
//         onClick={onProfile}
//       >
//         👤{" "}
//         {isKannada
//           ? "ನನ್ನ ಪ್ರೊಫೈಲ್"
//           : "My Profile"}
//       </button>

//     </div>
//   );
// }

// export default WorkerHome;

function WorkerHome({
  worker,
  language,
  theme,
  onFindJobs,
  onProfile,
  onThemeToggle
}) {
  const isKannada = language === "Kannada";

  return (
    <div className={`worker-home-screen ${theme}-theme`}>

      <header className="worker-home-header">

        <div>
          <h1>
            {isKannada
              ? "ನಮಸ್ಕಾರ"
              : "Namaste"}{" "}
            {worker?.name || ""}
          </h1>

          <p>
            {isKannada
              ? "ನಿಮ್ಮ ಕೆಲಸವನ್ನು ಹುಡುಕಿ"
              : "Find work near you"}
          </p>
        </div>


        <div className="worker-header-actions">

          <button
            className="theme-toggle"
            onClick={onThemeToggle}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <button
            className="profile-button"
            onClick={onProfile}
          >
            👤
          </button>

        </div>

      </header>


      <main className="worker-home-content">

        <div className="worker-welcome-card">

          <div className="worker-icon">
            👷
          </div>

          <h2>
            {isKannada
              ? "ಕೆಲಸ ಹುಡುಕಲು ಸಿದ್ಧವೇ?"
              : "Ready to find work?"}
          </h2>

          <p>
            {isKannada
              ? "ನಿಮ್ಮ ಹತ್ತಿರ ಲಭ್ಯವಿರುವ ಕೃಷಿ ಕೆಲಸಗಳನ್ನು ಹುಡುಕಿ."
              : "Find available agricultural jobs near you."}
          </p>

          <button
            className="find-jobs-button"
            onClick={onFindJobs}
          >
            🌾{" "}
            {isKannada
              ? "ಕೆಲಸ ಹುಡುಕಿ"
              : "Find Jobs"}
          </button>

        </div>

      </main>

    </div>
  );
}

export default WorkerHome;