function UserType({
  language,
  onUserTypeSelect,
  onBack,
  theme,
  onThemeToggle
}) {
  const isKannada = language === "Kannada";

  return (
    <div className="user-type-screen">

      {/* Theme Toggle */}
      <button
        className="theme-toggle"
        onClick={onThemeToggle}
        aria-label="Toggle dark and light mode"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <div className="user-type-card">

        {/* Back Button */}
        <button
          className="back-button"
          onClick={onBack}
        >
          ← {isKannada ? "ಹಿಂದೆ" : "Back"}
        </button>

        <h1>
          {isKannada ? "ನೀವು ಯಾರು?" : "Who are you?"}
        </h1>

        <p className="user-type-subtitle">
          {isKannada
            ? "ನೀವು Namma Kelasa ಅನ್ನು ಹೇಗೆ ಬಳಸಲು ಬಯಸುತ್ತೀರಿ?"
            : "Choose how you want to use Namma Kelasa"}
        </p>

        <div className="user-options">

          {/* Farmer */}
          <button
            className="user-option farmer-option"
            onClick={() => onUserTypeSelect("farmer")}
          >

            <div className="user-icon">
              👨‍🌾
            </div>

            <h2>
              {isKannada ? "ನಾನು ರೈತ" : "I'm a Farmer"}
            </h2>

            <p>
              {isKannada
                ? "ನನ್ನ ಜಮೀನಿಗೆ ಕೆಲಸಗಾರರನ್ನು ಹುಡುಕಿ"
                : "Find workers for my farm"}
            </p>

          </button>

          {/* Worker */}
          <button
            className="user-option worker-option"
            onClick={() => onUserTypeSelect("worker")}
          >

            <div className="user-icon">
              👷
            </div>

            <h2>
              {isKannada ? "ನಾನು ಕೆಲಸಗಾರ" : "I'm a Worker"}
            </h2>

            <p>
              {isKannada
                ? "ಕೆಲಸದ ಅವಕಾಶಗಳನ್ನು ಹುಡುಕಿ"
                : "Find work opportunities"}
            </p>

          </button>

        </div>

      </div>

    </div>
  );
}

export default UserType;