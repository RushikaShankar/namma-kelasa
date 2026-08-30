import { useState } from "react";

function FarmerRegister({
  language,
  onRegister,
  onBack,
  theme,
  onThemeToggle
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [landLocation, setLandLocation] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [majorCrop, setMajorCrop] = useState("");
  const [password, setPassword] = useState("");

  // Prevent duplicate form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isKannada = language === "Kannada";

  async function handleSubmit(event) {
    event.preventDefault();

    // IMPORTANT:
    // If a registration request is already running,
    // don't send another request.
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    // ==========================================
    // VALIDATE EMPTY FIELDS
    // ==========================================

    if (
      !name.trim() ||
      !phone.trim() ||
      !password.trim() ||
      !landLocation.trim() ||
      !fieldType.trim() ||
      !majorCrop.trim()
    ) {
      alert(
        isKannada
          ? "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ."
          : "Please fill in all the details."
      );

      setIsSubmitting(false);
      return;
    }

    // ==========================================
    // PHONE VALIDATION
    // ==========================================

    if (!/^[0-9]{10}$/.test(phone)) {
      alert(
        isKannada
          ? "ದಯವಿಟ್ಟು ಸರಿಯಾದ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ."
          : "Please enter a valid 10-digit mobile number."
      );

      setIsSubmitting(false);
      return;
    }

    // ==========================================
    // FARMER DATA
    // ==========================================

    const farmerData = {
      name: name.trim(),
      phone: phone,
      password: password,
      land_location: landLocation.trim(),
      field_type: fieldType.trim(),
      major_crop: majorCrop.trim()
    };

    console.log(
      "FARMER DATA BEING SENT:",
      farmerData
    );

    // ==========================================
    // SEND TO DJANGO
    // ==========================================

    try {
      const response = await fetch(
        "https://namma-kelasa-backend.onrender.com/api/users/register/farmer/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(farmerData)
        }
      );

      const data = await response.json();

      // ==========================================
      // REGISTRATION FAILED
      // ==========================================

      if (!response.ok) {
        console.error(
          "Farmer registration failed:",
          data
        );

        setIsSubmitting(false);

        if (data.phone) {
          alert(
            isKannada
              ? "ಈ ಫೋನ್ ಸಂಖ್ಯೆ ಈಗಾಗಲೇ ನೋಂದಾಯಿಸಲಾಗಿದೆ."
              : "This phone number is already registered."
          );
        } else {
          alert(
            isKannada
              ? "ನೋಂದಣಿ ವಿಫಲವಾಗಿದೆ."
              : "Registration failed. Please try again."
          );
        }

        return;
      }

      // ==========================================
      // REGISTRATION SUCCESS
      // ==========================================

      console.log(
        "Farmer registered successfully:",
        data
      );

      // Convert Django field names
      // to the format used by React
      const registeredFarmer = {
        id: data.id,
        name: data.name,
        phone: data.phone,
        landLocation: data.land_location,
        fieldType: data.field_type,
        majorCrop: data.major_crop,
        createdAt: data.created_at
      };

      // Send registered farmer to App.jsx
      onRegister(registeredFarmer);

    } catch (error) {
      // ==========================================
      // DJANGO CONNECTION ERROR
      // ==========================================

      console.error(
        "Backend connection error:",
        error
      );

      setIsSubmitting(false);

      alert(
        isKannada
          ? "ಸರ್ವರ್‌ಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ."
          : "Unable to connect to the server. Please make sure Django is running."
      );
    }
  }

  return (
    <div className="register-screen">

      {/* ==========================================
          THEME TOGGLE
      ========================================== */}

      <button
        type="button"
        className="theme-toggle"
        onClick={onThemeToggle}
        aria-label="Toggle dark and light mode"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <div className="register-card">

        {/* ==========================================
            BACK BUTTON
        ========================================== */}

        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← {isKannada ? "ಹಿಂದೆ" : "Back"}
        </button>

        {/* ==========================================
            ICON
        ========================================== */}

        <div className="register-icon">
          👨‍🌾
        </div>

        {/* ==========================================
            TITLE
        ========================================== */}

        <h1>
          {isKannada
            ? "ರೈತರ ನೋಂದಣಿ"
            : "Farmer Registration"}
        </h1>

        <p className="register-subtitle">
          {isKannada
            ? "ನಿಮ್ಮನ್ನು ಪ್ರಾರಂಭಿಸಲು ಕೆಲವು ವಿವರಗಳನ್ನು ನೀಡಿ"
            : "Let's get you started"}
        </p>

        {/* ==========================================
            FORM
        ========================================== */}

        <form onSubmit={handleSubmit}>

          {/* ========================================
              NAME
          ======================================== */}

          <div className="input-group">

            <label>
              {isKannada
                ? "ಪೂರ್ಣ ಹೆಸರು"
                : "Full Name"}
            </label>

            <input
              type="text"
              placeholder={
                isKannada
                  ? "ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ"
                  : "Enter your name"
              }
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              disabled={isSubmitting}
            />

          </div>

          {/* ========================================
              PHONE
          ======================================== */}

          <div className="input-group">

            <label>
              {isKannada
                ? "ದೂರವಾಣಿ ಸಂಖ್ಯೆ"
                : "Phone Number"}
            </label>

            <input
              type="tel"
              inputMode="numeric"
              maxLength="10"
              placeholder={
                isKannada
                  ? "10 ಅಂಕಿಯ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ"
                  : "Enter 10-digit number"
              }
              value={phone}
              onChange={(event) => {

                const value =
                  event.target.value;

                // Allow digits only
                if (
                  /^\d*$/.test(value) &&
                  value.length <= 10
                ) {
                  setPhone(value);
                }

              }}
              disabled={isSubmitting}
            />

          </div>

          {/* ========================================
              PASSWORD
          ======================================== */}

          <div className="input-group">

            <label>
              {isKannada
                ? "ಪಾಸ್‌ವರ್ಡ್"
                : "Password"}
            </label>

            <input
              type="password"
              placeholder={
                isKannada
                  ? "ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ"
                  : "Enter password"
              }
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              disabled={isSubmitting}
            />

          </div>

          {/* ========================================
              LAND LOCATION
          ======================================== */}

          <div className="input-group">

            <label>
              {isKannada
                ? "ಜಮೀನಿನ ಸ್ಥಳ"
                : "Land Location"}
            </label>

            <input
              type="text"
              placeholder={
                isKannada
                  ? "ಜಮೀನಿನ ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ"
                  : "Enter land location"
              }
              value={landLocation}
              onChange={(event) =>
                setLandLocation(
                  event.target.value
                )
              }
              disabled={isSubmitting}
            />

          </div>

          {/* ========================================
              FIELD TYPE
          ======================================== */}

          <div className="input-group">

            <label>
              {isKannada
                ? "ಹೊಲದ ಪ್ರಕಾರ"
                : "Field Type"}
            </label>

            <select
              value={fieldType}
              onChange={(event) =>
                setFieldType(
                  event.target.value
                )
              }
              disabled={isSubmitting}
            >

              <option value="">
                {isKannada
                  ? "ಹೊಲದ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ"
                  : "Select field type"}
              </option>

              <option value="Dry Land">
                {isKannada
                  ? "ಒಣಭೂಮಿ"
                  : "Dry Land"}
              </option>

              <option value="Wet Land">
                {isKannada
                  ? "ನೀರಾವರಿ ಭೂಮಿ"
                  : "Wet Land"}
              </option>

              <option value="Mixed">
                {isKannada
                  ? "ಮಿಶ್ರ"
                  : "Mixed"}
              </option>

            </select>

          </div>

          {/* ========================================
              MAJOR CROP
          ======================================== */}

          <div className="input-group">

            <label>
              {isKannada
                ? "ಪ್ರಮುಖ ಬೆಳೆ"
                : "Major Crop Grown"}
            </label>

            <input
              type="text"
              placeholder={
                isKannada
                  ? "ಉದಾ: ಭತ್ತ, ಕಬ್ಬು"
                  : "e.g. Rice, Sugarcane"
              }
              value={majorCrop}
              onChange={(event) =>
                setMajorCrop(
                  event.target.value
                )
              }
              disabled={isSubmitting}
            />

          </div>

          {/* ========================================
              REGISTER / CONTINUE BUTTON
          ======================================== */}

          <button
            type="submit"
            className="continue-button"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? (
                isKannada
                  ? "ನೋಂದಣಿ ಮಾಡಲಾಗುತ್ತಿದೆ..."
                  : "Registering..."
              )
              : (
                isKannada
                  ? "ಮುಂದುವರಿಸಿ"
                  : "Continue"
              )}
          </button>

        </form>

      </div>

    </div>
  );
}

export default FarmerRegister;