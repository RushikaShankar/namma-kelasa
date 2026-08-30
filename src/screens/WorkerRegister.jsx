function WorkerRegister({
  language,
  theme,
  onRegister,
  onBack,
  onThemeToggle
}) {
  const isKannada = language === "Kannada";

  async function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.target);

    const name = form.get("name")?.trim();
    const phone = form.get("phone")?.trim();
    const password = form.get("password")?.trim();
    const location = form.get("village")?.trim();
    const workType = form.get("experience")?.trim();

    // Phone validation
    if (!/^\d{10}$/.test(phone)) {
      alert(
        isKannada
          ? "ದಯವಿಟ್ಟು ಸರಿಯಾದ 10 ಅಂಕಿಯ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ."
          : "Please enter a valid 10-digit phone number."
      );
      return;
    }

    const workerData = {
      name: name,
      phone: phone,
      village: location,
      experience: workType,
      password: password
    };

    try {
      const response = await fetch(
        "https://namma-kelasa-backend.onrender.com/api/users/register/worker/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(workerData)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Worker registration failed:", data);

        alert(
          data.phone
            ? "This phone number is already registered."
            : "Worker registration failed. Please try again."
        );

        return;
      }

      console.log("Worker registered successfully:", data);

      const registeredWorker = {
        id: data.id,
        name: data.name,
        phone: data.phone,
        location: data.location,
        workType: data.work_type,
        password: data.password,
        isAvailable: data.is_available,
        createdAt: data.created_at
      };

      onRegister(registeredWorker);

    } catch (error) {
      console.error("Error connecting to backend:", error);

      alert(
        isKannada
          ? "ಸರ್ವರ್‌ಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ."
          : "Unable to connect to the server. Please make sure Django is running."
      );
    }
  }

  return (
    <div className="worker-register-screen">

      <header className="worker-register-header">

        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ←
        </button>

        <h1>
          {isKannada
            ? "ಕೆಲಸಗಾರರ ನೋಂದಣಿ"
            : "Worker Registration"}
        </h1>

        <button
          type="button"
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

      </header>

      <form
        className="worker-register-form"
        onSubmit={handleSubmit}
      >

        {/* NAME */}
        <label>
          {isKannada ? "ಹೆಸರು" : "Name"}
        </label>

        <input
          name="name"
          type="text"
          required
          placeholder={
            isKannada
              ? "ನಿಮ್ಮ ಹೆಸರು"
              : "Your name"
          }
        />

        {/* PHONE */}
        <label>
          {isKannada
            ? "ಫೋನ್ ಸಂಖ್ಯೆ"
            : "Phone Number"}
        </label>

        <input
          name="phone"
          type="tel"
          required
          inputMode="numeric"
          maxLength="10"
          pattern="[0-9]{10}"
          placeholder={
            isKannada
              ? "10 ಅಂಕಿಯ ಫೋನ್ ಸಂಖ್ಯೆ"
              : "10-digit phone number"
          }
          onInput={(event) => {
            event.target.value = event.target.value
              .replace(/\D/g, "")
              .slice(0, 10);
          }}
        />

        {/* PASSWORD */}
        <label>
          {isKannada
            ? "ಪಾಸ್‌ವರ್ಡ್"
            : "Password"}
        </label>

        <input
          name="password"
          type="password"
          required
          placeholder={
            isKannada
              ? "ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ"
              : "Enter password"
          }
        />

        {/* VILLAGE / LOCATION */}
        <label>
          {isKannada
            ? "ಗ್ರಾಮ"
            : "Village"}
        </label>

        <input
          name="village"
          type="text"
          required
          placeholder={
            isKannada
              ? "ನಿಮ್ಮ ಗ್ರಾಮ"
              : "Your village"
          }
        />

        {/* EXPERIENCE / WORK TYPE */}
        <label>
          {isKannada
            ? "ಕೆಲಸದ ಅನುಭವ"
            : "Experience"}
        </label>

        <input
          name="experience"
          type="text"
          required
          placeholder={
            isKannada
              ?"ಉದಾ: 2 ವರ್ಷಗಳ ಅನುಭವ"
              : "e.g. 2 years of experience"
          }
        />

        {/* REGISTER */}
        <button
          type="submit"
          className="register-worker-button"
        >
          {isKannada
            ? "ನೋಂದಣಿ ಮಾಡಿ"
            : "Register"}
        </button>

      </form>

    </div>
  );
}

export default WorkerRegister;