// function WorkerProfile({
//   worker,
//   language,
//   theme,
//   onBack,
//   onThemeToggle,
//   onLogout
// }) {
//   const isKannada = language === "Kannada";

//   const name =
//     worker?.name ||
//     (isKannada ? "ಕೆಲಸಗಾರ" : "Worker");

//   const phone =
//     worker?.phone ||
//     worker?.phoneNumber ||
//     "";

//   const age =
//     worker?.age ||
//     (isKannada ? "ನಮೂದಿಸಲಾಗಿಲ್ಲ" : "Not provided");

//   const experience =
//     worker?.experience ||
//     (isKannada ? "ನಮೂದಿಸಲಾಗಿಲ್ಲ" : "Not provided");

//   const address =
//     worker?.address ||
//     worker?.village ||
//     (isKannada ? "ನಮೂದಿಸಲಾಗಿಲ್ಲ" : "Not provided");

//   return (
//     <div className={`worker-profile-screen ${theme}-theme`}>

//       {/* ================================= */}
//       {/* HEADER */}
//       {/* ================================= */}

//       <header className="worker-profile-header">

//         <button
//           className="back-button"
//           onClick={onBack}
//         >
//           ←
//         </button>

//         <h1>
//           {isKannada
//             ? "ನನ್ನ ಪ್ರೊಫೈಲ್"
//             : "My Profile"}
//         </h1>

//         <button
//           className="theme-toggle"
//           onClick={onThemeToggle}
//           aria-label="Toggle theme"
//         >
//           {theme === "light" ? "🌙" : "☀️"}
//         </button>

//       </header>


//       {/* ================================= */}
//       {/* PROFILE */}
//       {/* ================================= */}

//       <main className="worker-profile-content">

//         {/* AVATAR */}

//         <div className="worker-profile-avatar">
//           👷
//         </div>


//         {/* NAME */}

//         <h2 className="worker-profile-name">
//           {name}
//         </h2>


//         <p className="worker-profile-role">
//           {isKannada
//             ? "ಕೆಲಸಗಾರ"
//             : "Worker"}
//         </p>


//         {/* ================================= */}
//         {/* BASIC INFORMATION */}
//         {/* ================================= */}

//         <section className="worker-profile-card">

//           <h3>
//             {isKannada
//               ? "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ"
//               : "Personal Information"}
//           </h3>


//           {/* NAME */}

//           <div className="worker-profile-item">

//             <div className="worker-profile-icon">
//               👤
//             </div>

//             <div>

//               <span className="worker-profile-label">
//                 {isKannada
//                   ? "ಹೆಸರು"
//                   : "Name"}
//               </span>

//               <strong className="worker-profile-value">
//                 {name}
//               </strong>

//             </div>

//           </div>


//           {/* AGE */}

//           <div className="worker-profile-item">

//             <div className="worker-profile-icon">
//               🎂
//             </div>

//             <div>

//               <span className="worker-profile-label">
//                 {isKannada
//                   ? "ವಯಸ್ಸು"
//                   : "Age"}
//               </span>

//               <strong className="worker-profile-value">
//                 {age}
//               </strong>

//             </div>

//           </div>


//           {/* EXPERIENCE */}

//           <div className="worker-profile-item">

//             <div className="worker-profile-icon">
//               🛠️
//             </div>

//             <div>

//               <span className="worker-profile-label">
//                 {isKannada
//                   ? "ಕೆಲಸದ ಅನುಭವ"
//                   : "Work Experience"}
//               </span>

//               <strong className="worker-profile-value">
//                 {experience}
//               </strong>

//             </div>

//           </div>


//           {/* ADDRESS */}

//           <div className="worker-profile-item">

//             <div className="worker-profile-icon">
//               🏡
//             </div>

//             <div>

//               <span className="worker-profile-label">
//                 {isKannada
//                   ? "ಗ್ರಾಮ / ವಿಳಾಸ"
//                   : "Village / Address"}
//               </span>

//               <strong className="worker-profile-value">
//                 {address}
//               </strong>

//             </div>

//           </div>


//           {/* PHONE */}

//           <div className="worker-profile-item">

//             <div className="worker-profile-icon">
//               📞
//             </div>

//             <div>

//               <span className="worker-profile-label">
//                 {isKannada
//                   ? "ಫೋನ್ ಸಂಖ್ಯೆ"
//                   : "Phone Number"}
//               </span>

//               <strong className="worker-profile-value">
//                 {phone ||
//                   (isKannada
//                     ? "ನಮೂದಿಸಲಾಗಿಲ್ಲ"
//                     : "Not provided")}
//               </strong>

//             </div>

//           </div>

//         </section>


//         {/* ================================= */}
//         {/* GPS */}
//         {/* ================================= */}

//         <section className="worker-gps-card">

//           <div className="worker-gps-header">

//             <div>

//               <h3>
//                 📍{" "}
//                 {isKannada
//                   ? "ಸ್ಥಳ ಸೇವೆ"
//                   : "Location Service"}
//               </h3>

//               <p>
//                 {isKannada
//                   ? "ಹತ್ತಿರದ ಕೆಲಸಗಳನ್ನು ಹುಡುಕಲು ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಬಳಸಬಹುದು."
//                   : "Your location can be used to find nearby jobs."}
//               </p>

//             </div>

//             <span className="gps-status">
//               ✓
//             </span>

//           </div>


//           <button
//             className="worker-gps-button"
//             onClick={() => {

//               if (!navigator.geolocation) {

//                 alert(
//                   isKannada
//                     ? "GPS ಲಭ್ಯವಿಲ್ಲ."
//                     : "GPS is not available."
//                 );

//                 return;
//               }

//               navigator.geolocation.getCurrentPosition(

//                 () => {

//                   alert(
//                     isKannada
//                       ? "ಸ್ಥಳ ಯಶಸ್ವಿಯಾಗಿ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ."
//                       : "Location enabled successfully."
//                   );

//                 },

//                 () => {

//                   alert(
//                     isKannada
//                       ? "ದಯವಿಟ್ಟು ಸ್ಥಳ ಅನುಮತಿಯನ್ನು ನೀಡಿ."
//                       : "Please allow location access."
//                   );

//                 }

//               );

//             }}
//           >
//             📍{" "}
//             {isKannada
//               ? "GPS ಸಕ್ರಿಯಗೊಳಿಸಿ"
//               : "Enable GPS"}
//           </button>

//         </section>


//         {/* ================================= */}
//         {/* CALL */}
//         {/* ================================= */}

//         {phone && (

//           <button
//             className="worker-profile-call-button"
//             onClick={() => {
//               window.location.href =
//                 `tel:${phone}`;
//             }}
//           >
//             📞{" "}
//             {isKannada
//               ? "ಕರೆ ಮಾಡಿ"
//               : "Call"}
//           </button>

//         )}


//         {/* ================================= */}
//         {/* BACK */}
//         {/* ================================= */}

//         <button
//           className="worker-profile-back-button"
//           onClick={onBack}
//         >
//           {isKannada
//             ? "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ"
//             : "Back to Home"}
//         </button>

//         <button
//   className="logout-button"
//   onClick={onLogout}
// >
//   {isKannada ? "ಲಾಗ್ ಔಟ್" : "Logout"}
// </button>

//       </main>

//     </div>
//   );
// }

// export default WorkerProfile;

function WorkerProfile({
  worker,
  language,
  theme,
  onBack,
  onThemeToggle,
  onLogout
}) {
  const isKannada = language === "Kannada";

  if (!worker) {
    return (
      <div className={`profile-screen ${theme}-theme`}>
        <button onClick={onBack}>
          ← {isKannada ? "ಹಿಂದೆ" : "Back"}
        </button>

        <h2>
          {isKannada
            ? "ಪ್ರೊಫೈಲ್ ಕಂಡುಬಂದಿಲ್ಲ"
            : "Profile not found"}
        </h2>
      </div>
    );
  }

  return (
    <div className={`profile-screen ${theme}-theme`}>

      <div className="profile-header">

        <button
          className="back-button"
          onClick={onBack}
        >
          ←
        </button>

        <h1>
          {isKannada
            ? "ನನ್ನ ಪ್ರೊಫೈಲ್"
            : "My Profile"}
        </h1>

        <button
          className="theme-toggle"
          onClick={onThemeToggle}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

      </div>


      <div className="profile-card">

        <div className="profile-avatar">
          👷
        </div>

        <h2>
          {worker.name}
        </h2>


        <div className="profile-info">

          <div className="profile-row">

            <span>
              📱{" "}
              {isKannada
                ? "ಫೋನ್"
                : "Phone"}
            </span>

            <strong>
              {worker.phone}
            </strong>

          </div>


          <div className="profile-row">

            <span>
              📍{" "}
              {isKannada
                ? "ಸ್ಥಳ"
                : "Location"}
            </span>

            <strong>
              {worker.location}
            </strong>

          </div>


          <div className="profile-row">

            <span>
              🌾{" "}
              {isKannada
                ? "ಕೆಲಸದ ಪ್ರಕಾರ"
                : "Work Type"}
            </span>

            <strong>
              {worker.workType}
            </strong>

          </div>


          <div className="profile-row">

            <span>
              🟢{" "}
              {isKannada
                ? "ಲಭ್ಯತೆ"
                : "Availability"}
            </span>

            <strong>
              {worker.isAvailable !== false
                ? isKannada
                  ? "ಲಭ್ಯವಿದೆ"
                  : "Available"
                : isKannada
                  ? "ಲಭ್ಯವಿಲ್ಲ"
                  : "Unavailable"}
            </strong>

          </div>

        </div>


        <button
          className="logout-button"
          onClick={onLogout}
        >
          {isKannada
            ? "ಲಾಗ್ ಔಟ್"
            : "Logout"}
        </button>

      </div>

    </div>
  );
}

export default WorkerProfile;