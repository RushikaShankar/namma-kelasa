import { useState } from "react";

function Profile({
  farmer,
  userType,
  language,
  theme,
  onBack,
  onThemeToggle,
  onLogout
}) {
  const isKannada = language === "Kannada";

  const [showInformation, setShowInformation] = useState(false);
  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsLocation, setGpsLocation] = useState(null);

  const profileData =
    userType === "worker"
      ? worker
      : farmer;

  const name =
    profileData?.name ||
    (userType === "worker"
      ? (isKannada ? "ಕೆಲಸಗಾರ" : "Worker")
      : (isKannada ? "ರೈತ" : "Farmer"));

  const phone =
    profileData?.phone ||
    profileData?.phoneNumber ||
    "";

  const location =
    profileData?.landLocation ||
    profileData?.location ||
    profileData?.village ||
    "";

  function handleEnableGPS() {

    if (!navigator.geolocation) {
      alert(
        isKannada
          ? "ನಿಮ್ಮ ಬ್ರೌಸರ್ GPS ಅನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ."
          : "Your browser does not support GPS."
      );
      return;
    }

    setGpsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {

        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        setGpsLocation(coordinates);
        setGpsEnabled(true);
        setGpsLoading(false);

      },
      () => {

        setGpsLoading(false);

        alert(
          isKannada
            ? "ಸ್ಥಳ ಪ್ರವೇಶವನ್ನು ಅನುಮತಿಸಿ."
            : "Please allow location access."
        );

      },
      {
        enableHighAccuracy: true,
        timeout: 10000
      }
    );
  }

  return (
    <div className={`profile-screen ${theme}-theme`}>

      {/* HEADER */}

      <div className="profile-header">

        {/* TOP LEFT INFORMATION ICON */}

        <button
          className="profile-info-button"
          onClick={() =>
            setShowInformation((previous) =>
              !previous
            )
          }
          aria-label="Show profile information"
        >
          ⓘ
        </button>


        <button
          className="back-button"
          onClick={onBack}
        >
          ←
        </button>


        <h2>
          {isKannada
            ? "ಪ್ರೊಫೈಲ್"
            : "Profile"}
        </h2>


        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

      </div>


      {/* INFORMATION PANEL */}

      {showInformation && (

        <div className="profile-information-panel">

          <div className="profile-information-header">

            <h3>
              {userType === "farmer"
                ? (
                  isKannada
                    ? "ರೈತರ ಮಾಹಿತಿ"
                    : "Farmer Information"
                )
                : (
                  isKannada
                    ? "ಕೆಲಸಗಾರರ ಮಾಹಿತಿ"
                    : "Worker Information"
                )}
            </h3>

            <button
              onClick={() => setShowInformation(false)}
            >
              ✕
            </button>

          </div>


          {/* NAME */}

          <div className="information-row">

            <span>👤</span>

            <div>
              <small>
                {isKannada
                  ? "ಹೆಸರು"
                  : "Name"}
              </small>

              <strong>
                {name}
              </strong>
            </div>

          </div>


          {/* FARMER */}

          {userType === "farmer" && (

            <>

              <div className="information-row">

                <span>📍</span>

                <div>
                  <small>
                    {isKannada
                      ? "ಜಮೀನಿನ ಸ್ಥಳ"
                      : "Land Location"}
                  </small>

                  <strong>
                    {farmer?.landLocation ||
                      (isKannada
                        ? "ನಮೂದಿಸಲಾಗಿಲ್ಲ"
                        : "Not provided")}
                  </strong>
                </div>

              </div>


              <div className="information-row">

                <span>🌱</span>

                <div>
                  <small>
                    {isKannada
                      ? "ಕ್ಷೇತ್ರದ ಪ್ರಕಾರ"
                      : "Field Type"}
                  </small>

                  <strong>
                    {farmer?.fieldType ||
                      (isKannada
                        ? "ನಮೂದಿಸಲಾಗಿಲ್ಲ"
                        : "Not provided")}
                  </strong>
                </div>

              </div>


              <div className="information-row">

                <span>🌾</span>

                <div>
                  <small>
                    {isKannada
                      ? "ಪ್ರಮುಖ ಬೆಳೆ"
                      : "Major Crop Grown"}
                  </small>

                  <strong>
                    {farmer?.majorCrop ||
                      (isKannada
                        ? "ನಮೂದಿಸಲಾಗಿಲ್ಲ"
                        : "Not provided")}
                  </strong>
                </div>

              </div>

            </>

          )}


          {/* WORKER */}

          {userType === "worker" && (

            <>

              <div className="information-row">

                <span>🎂</span>

                <div>
                  <small>
                    {isKannada
                      ? "ವಯಸ್ಸು"
                      : "Age"}
                  </small>

                  <strong>
                    {worker?.age ||
                      (isKannada
                        ? "ನಮೂದಿಸಲಾಗಿಲ್ಲ"
                        : "Not provided")}
                  </strong>
                </div>

              </div>


              <div className="information-row">

                <span>🛠️</span>

                <div>
                  <small>
                    {isKannada
                      ? "ಅನುಭವ"
                      : "Experience"}
                  </small>

                  <strong>
                    {worker?.experience ||
                      (isKannada
                        ? "ನಮೂದಿಸಲಾಗಿಲ್ಲ"
                        : "Not provided")}
                  </strong>
                </div>

              </div>


              <div className="information-row">

                <span>🏡</span>

                <div>
                  <small>
                    {isKannada
                      ? "ಗ್ರಾಮ / ವಿಳಾಸ"
                      : "Village / Address"}
                  </small>

                  <strong>
                    {worker?.address ||
                      worker?.village ||
                      (isKannada
                        ? "ನಮೂದಿಸಲಾಗಿಲ್ಲ"
                        : "Not provided")}
                  </strong>
                </div>

              </div>

            </>

          )}

        </div>

      )}


      {/* PROFILE CONTENT */}

      <div className="profile-content">

        {/* AVATAR */}

        <div className="profile-avatar">

          <span>
            {userType === "worker"
              ? "👷"
              : "👨‍🌾"}
          </span>

        </div>


        {/* NAME */}

        <h1 className="profile-name">
          {name}
        </h1>


        {/* ROLE */}

        <p className="profile-role">

          {userType === "worker"
            ? (
              isKannada
                ? "ಕೆಲಸಗಾರ"
                : "Worker"
            )
            : (
              isKannada
                ? "ರೈತ"
                : "Farmer"
            )}

        </p>


        {/* BASIC PROFILE CARD */}

        <div className="profile-card">

          {/* PHONE */}

          <div className="profile-item">

            <div className="profile-icon">
              📞
            </div>

            <div>

              <span className="profile-label">
                {isKannada
                  ? "ಫೋನ್ ಸಂಖ್ಯೆ"
                  : "Phone Number"}
              </span>

              <span className="profile-value">
                {phone ||
                  (isKannada
                    ? "ನಮೂದಿಸಲಾಗಿಲ್ಲ"
                    : "Not provided")}
              </span>

            </div>

          </div>


          {/* LOCATION */}

          <div className="profile-item">

            <div className="profile-icon">
              📍
            </div>

            <div>

              <span className="profile-label">
                {isKannada
                  ? "ಸ್ಥಳ"
                  : "Location"}
              </span>

              <span className="profile-value">
                {location ||
                  (isKannada
                    ? "ನಮೂದಿಸಲಾಗಿಲ್ಲ"
                    : "Not provided")}
              </span>

            </div>

          </div>


          {/* WORKER INFO */}

          {userType === "worker" && (

            <>

              <div className="profile-item">

                <div className="profile-icon">
                  🎂
                </div>

                <div>

                  <span className="profile-label">
                    {isKannada
                      ? "ವಯಸ್ಸು"
                      : "Age"}
                  </span>

                  <span className="profile-value">
                    {worker?.age || "—"}
                  </span>

                </div>

              </div>


              <div className="profile-item">

                <div className="profile-icon">
                  🛠️
                </div>

                <div>

                  <span className="profile-label">
                    {isKannada
                      ? "ಅನುಭವ"
                      : "Experience"}
                  </span>

                  <span className="profile-value">
                    {worker?.experience || "—"}
                  </span>

                </div>

              </div>

            </>

          )}

        </div>


        {/* GPS */}

        {userType === "farmer" && (

          <div className="gps-section">

            <div className="gps-header">

              <div>
                <h3>
                  📍{" "}
                  {isKannada
                    ? "GPS ಸ್ಥಳ"
                    : "GPS Location"}
                </h3>

                <p>
                  {gpsEnabled
                    ? (
                      isKannada
                        ? "ನಿಮ್ಮ ಸ್ಥಳ ಸಕ್ರಿಯವಾಗಿದೆ."
                        : "Your location is enabled."
                    )
                    : (
                      isKannada
                        ? "ಹತ್ತಿರದ ಕೆಲಸಗಾರರನ್ನು ಹುಡುಕಲು GPS ಸಕ್ರಿಯಗೊಳಿಸಿ."
                        : "Enable GPS to help find nearby workers."
                    )}
                </p>
              </div>

              <span>
                {gpsEnabled ? "✓" : "○"}
              </span>

            </div>


            <button
              className="gps-enable-button"
              onClick={handleEnableGPS}
              disabled={gpsLoading}
            >
              {gpsLoading
                ? (
                  isKannada
                    ? "ಸ್ಥಳ ಹುಡುಕಲಾಗುತ್ತಿದೆ..."
                    : "Getting location..."
                )
                : gpsEnabled
                  ? (
                    isKannada
                      ? "GPS ಸಕ್ರಿಯವಾಗಿದೆ ✓"
                      : "GPS Enabled ✓"
                  )
                  : (
                    isKannada
                      ? "GPS ಸಕ್ರಿಯಗೊಳಿಸಿ"
                      : "Enable GPS"
                  )}
            </button>


            {gpsLocation && (

              <div className="gps-coordinates">

                <small>
                  {isKannada
                    ? "ಪ್ರಸ್ತುತ ಸ್ಥಳ"
                    : "Current Location"}
                </small>

                <p>
                  {gpsLocation.latitude.toFixed(6)},
                  {" "}
                  {gpsLocation.longitude.toFixed(6)}
                </p>

              </div>

            )}

          </div>

        )}


        {/* CALL */}

        {phone && (

          <button
            className="profile-call-button"
            onClick={() => {
              window.location.href =
                `tel:${phone}`;
            }}
          >
            📞{" "}
            {isKannada
              ? "ಕರೆ ಮಾಡಿ"
              : "Call"}
          </button>

        )}

        <button
  className="logout-button"
  onClick={onLogout}
>
  {isKannada ? "ಲಾಗ್ ಔಟ್" : "Logout"}
</button>


        {/* BACK */}

        <button
          className="profile-back-button"
          onClick={onBack}
        >
          {isKannada
            ? "ಹಿಂದೆ"
            : "Back"}
        </button>

      </div>

    </div>
  );
}

export default Profile;