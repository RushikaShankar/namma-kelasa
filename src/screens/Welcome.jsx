import { useState } from "react";

function Welcome({
  onLanguageSelect,
  theme,
  onThemeToggle
}) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  function handleLanguageSelect(language) {
    setSelectedLanguage(language);
    onLanguageSelect(language);
  }

  return (
    <div className="welcome-screen">

      {/* Theme Toggle */}
      <button
        className="theme-toggle"
        onClick={onThemeToggle}
        aria-label="Toggle dark and light mode"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <div className="welcome-card">

        <div className="logo">
          🌱🤝
        </div>

        <h1>NAMMA KELASA</h1>

        <p className="tagline">
          connecting hands and opportunities
        </p>

        <p className="supporting-text">
          together we grow...
        </p>

        <div className="language-section">

          <h3>Choose your language</h3>

          <button
            className={`language-button ${
              selectedLanguage === "English" ? "selected" : ""
            }`}
            onClick={() => handleLanguageSelect("English")}
          >
            English
          </button>

          <button
            className={`language-button ${
              selectedLanguage === "Kannada" ? "selected" : ""
            }`}
            onClick={() => handleLanguageSelect("Kannada")}
          >
            ಕನ್ನಡ
          </button>

        </div>

      </div>

    </div>
  );
}

export default Welcome;