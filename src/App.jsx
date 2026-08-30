import { useState, useEffect } from "react";

import Welcome from "./screens/Welcome";
import UserType from "./screens/UserType";

import FarmerRegister from "./screens/FarmerRegister";
import WorkerRegister from "./screens/WorkerRegister";

import FarmerHome from "./screens/FarmerHome";
import WorkerHome from "./screens/WorkerHome";

import CreateJob from "./screens/CreateJob";
import NearbyWorkers from "./screens/NearbyWorkers";
import WorkerDetails from "./screens/WorkerDetails";

import BookingConfirmation from "./screens/BookingConfirmation";
import JobHistory from "./screens/JobHistory";
import MyJob from "./screens/MyJob";
import JobCompleted from "./screens/JobCompleted";
import Rating from "./screens/Rating";

import Profile from "./screens/Profile";
import WorkerProfile from "./screens/WorkerProfile";

import WorkerJobs from "./screens/WorkerJobs";
import WorkerJobDetails from "./screens/WorkerJobDetails";

import "./App.css";


function App() {

  // ==========================================
  // CURRENT SCREEN
  // ==========================================

  const [screen, setScreen] = useState("welcome");


  // ==========================================
  // LANGUAGE
  // ==========================================

  const [language, setLanguage] = useState("English");


  // ==========================================
  // THEME
  // ==========================================

  const [theme, setTheme] = useState("light");


  // ==========================================
  // USER TYPE
  // ==========================================

  const [userType, setUserType] = useState(null);


  // ==========================================
  // FARMER
  // ==========================================

  const [farmer, setFarmer] = useState(null);


  // ==========================================
  // WORKER
  // ==========================================

  const [worker, setWorker] = useState([]);

  // ==========================================
  // CURRENT WORKER
  // ==========================================

  const [currentWorker, setCurrentWorker] = useState(null);

useEffect(() => {

  fetch("http://127.0.0.1:8000/api/users/jobs/create/")
    .then((response) => response.json())
    .then(async (data) => {

      const formattedJobs = await Promise.all(
        data.map(async (job) => {

          let applied = false;

          if (currentWorker) {

            const statusResponse = await fetch(
              `http://127.0.0.1:8000/api/users/jobs/${job.id}/booking-status/${currentWorker.id}/`
            );

            if (statusResponse.ok) {

              const statusData =
                await statusResponse.json();

              applied = statusData.applied;
            }
          }

          return {
  id: job.id,
  workType: job.work_type,
  location: job.location,
  date: job.date,
  wage: job.wage,
  workers: job.workers_required,
  workersBooked: job.workers_booked,
  workersRemaining: job.workers_remaining,
  bookedWorkers: [],
  status: "Open",
  applied
};

        })
      );

      setWorkerJobs(formattedJobs);

      setAcceptedWorkerJobs(
        formattedJobs.filter(
          (job) => job.applied
        )
      );

    })
    .catch((error) => {

      console.error(
        "Error fetching jobs:",
        error
      );

    });

}, [currentWorker]);
  // ==========================================
  // CURRENT FARMER JOB
  // ==========================================

  const [job, setJob] = useState(null);


  // ==========================================
  // JOB HISTORY
  // ==========================================

  const [jobHistory, setJobHistory] = useState([]);


  // ==========================================
  // SELECTED WORKERS
  // ==========================================

  const [selectedWorkers, setSelectedWorkers] = useState([]);

  // ==========================================
  // WORKER AVAILABLE JOBS
  // ==========================================

  const [workerJobs, setWorkerJobs] = useState([]);

  // ==========================================
  // CURRENT WORKER JOB
  // ==========================================

  const [selectedWorkerJob, setSelectedWorkerJob] = useState(null);


  // ==========================================
  // ACCEPTED WORKER JOBS
  // ==========================================

  const [acceptedWorkerJobs, setAcceptedWorkerJobs] = useState([]);


  // ==========================================
  // THEME TOGGLE
  // ==========================================

function handleLogout() {

  console.log("LOGOUT BUTTON CLICKED");

  localStorage.removeItem("currentUser");

  setFarmer(null);
  setWorker(null);
  setCurrentWorker(null);

  setSelectedWorkers([]);
  setAcceptedWorkerJobs([]);
  setSelectedWorkerJob(null);

  setScreen("welcome");

}

  // ==========================================
  // LANGUAGE SELECT
  // ==========================================

  function handleLanguageSelect(selectedLanguage) {

    setLanguage(selectedLanguage);

    setScreen("userType");

  }

  function handleThemeToggle() {

  setTheme(
    (previousTheme) =>
      previousTheme === "light"
        ? "dark"
        : "light"
  );

}

  // ==========================================
  // USER TYPE SELECT
  // ==========================================

  function handleUserTypeSelect(selectedUserType) {

    setUserType(selectedUserType);

    if (selectedUserType === "farmer") {

      setScreen("farmerRegister");

    } else {

      setScreen("workerRegister");

    }

  }

  
  // ==========================================
  // FARMER REGISTER
  // ==========================================

//  async function handleFarmerRegister(farmerData) {

//   try {

//     const response = await fetch(
//       "http://127.0.0.1:8000/api/users/register/farmer/",
//       {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json"
//         },

//         body: JSON.stringify({
//           name: farmerData.name,
//           phone: farmerData.phone,
//           land_location: farmerData.landLocation,
//           field_type: farmerData.fieldType,
//           major_crop: farmerData.majorCrop
//         })
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {

//       console.error("Farmer registration failed:", data);

//       alert(
//         data.phone
//           ? "This phone number is already registered."
//           : "Farmer registration failed. Please try again."
//       );

//       return;
//     }

//     // Convert Django response back to the format
//     // already used by your React screens
//     const registeredFarmer = {

//       id: data.id,
//       name: data.name,
//       phone: data.phone,
//       landLocation: data.land_location,
//       fieldType: data.field_type,
//       majorCrop: data.major_crop,
//       createdAt: data.created_at

//     };

//     setFarmer(registeredFarmer);

//     setScreen("farmerHome");

//   } catch (error) {

//     console.error("Error connecting to backend:", error);

//     alert(
//       "Unable to connect to the server. Please make sure Django is running."
//     );

//   }

// }

// function handleFarmerRegister(farmerData) {
//   setFarmer(farmerData);
//   setScreen("farmerHome");
// }

function handleFarmerRegister(farmerData) {

  console.log(
    "Farmer registration received:",
    farmerData
  );

  setFarmer(farmerData);

  setScreen("farmerHome");

}
  // ==========================================
  // WORKER REGISTER
  // ==========================================

//   function handleWorkerRegister(workerData) {

//   setWorker(workerData);
//   setCurrentWorker(workerData);

//   localStorage.setItem(
//     "currentWorker",
//     JSON.stringify(workerData)
//   );

//   setScreen("workerHome");

// }

function handleWorkerRegister(workerData) {
  setWorker(workerData);
  setCurrentWorker(workerData);

  localStorage.setItem(
    "currentWorker",
    JSON.stringify(workerData)
  );

  setScreen("workerHome");
}


  // ==========================================
  // FARMER — CREATE JOB
  // ==========================================

  function handleCreateJob() {

    setScreen("createJob");

  }


  // ==========================================
  // FARMER — JOB CREATED
  // ==========================================

  // function handleJobCreated(jobData) {

  //   const newJob = {

  //     ...jobData,

  //     id: Date.now(),

  //     bookedWorkers: [],

  //     status: "Open"

  //   };


  //   // Current job
  //   setJob(newJob);


  //   // Clear previously selected workers
  //   setSelectedWorkers([]);


  //   // Add to farmer job history
  //   setJobHistory((previousJobs) => [

  //     ...previousJobs,

  //     newJob

  //   ]);


  //   // Make job visible to workers
  //   setWorkerJobs((previousJobs) => [

  //     ...previousJobs,

  //     newJob

  //   ]);


  //   // Go to nearby workers
  //   setScreen("nearbyWorkers");

  // }


async function handleJobCreated(jobData) {

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/api/users/jobs/create/",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          farmer: farmer.id,
          work_type: jobData.workType,
          location: jobData.location,
          date: jobData.date,
          wage: jobData.wage,
          workers_required: Number(jobData.workers)
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {

      console.error("Job creation failed:", data);

      alert(
        "Unable to create job. Please try again."
      );

      return;

    }

    const newJob = {

      id: data.id,

      workType: data.work_type,

      location: data.location,

      date: data.date,

      wage: data.wage,

      workers: data.workers_required,

      workersBooked: data.workers_booked,

      workersRemaining: data.workers_remaining,

      bookedWorkers: [],

      status: "Open"

    };

    setJob(newJob);

    setSelectedWorkers([]);

    setJobHistory((previousJobs) => [
      ...previousJobs,
      newJob
    ]);

    setWorkerJobs((previousJobs) => [
      ...previousJobs,
      newJob
    ]);

    setScreen("nearbyWorkers");

  } catch (error) {

    console.error(
      "Error connecting to backend:",
      error
    );

    alert(
      "Unable to connect to Django server."
    );

  }

}

  // ==========================================
  // FARMER — SELECT WORKER
  // ==========================================

  function handleWorkerSelect(worker) {

    // No active job
    if (!job) {

      return;

    }


    // Worker already selected
    const alreadySelected =
      selectedWorkers.some(
        (item) => item.id === worker.id
      );


    if (alreadySelected) {

      return;

    }


    // Required number already reached
    if (
      selectedWorkers.length >=
      Number(job.workers)
    ) {

      return;

    }


    setCurrentWorker(worker);

    setScreen("workerDetails");

  }


  // ==========================================
  // FARMER — CHOOSE WORKER
  // ==========================================

  function handleChooseWorker(worker) {

    if (!job) {

      setScreen("farmerHome");

      return;

    }


    // Check if already selected
    const alreadySelected =
      selectedWorkers.some(
        (item) => item.id === worker.id
      );


    if (alreadySelected) {

      setScreen("nearbyWorkers");

      return;

    }


    // Check worker limit
    if (
      selectedWorkers.length >=
      Number(job.workers)
    ) {

      setScreen("bookingConfirmation");

      return;

    }


    const updatedWorkers = [

      ...selectedWorkers,

      worker

    ];


    setSelectedWorkers(updatedWorkers);


    const updatedJob = {

      ...job,

      bookedWorkers: updatedWorkers,

      status:
        updatedWorkers.length >=
        Number(job.workers)

          ? "Fully Booked"

          : "Partially Booked"

    };


    setJob(updatedJob);


    // Update history
    setJobHistory((previousJobs) =>

      previousJobs.map((item) =>

        item.id === job.id
          ? updatedJob
          : item

      )

    );


    // If all workers selected
    if (
      updatedWorkers.length >=
      Number(job.workers)
    ) {

      setScreen("bookingConfirmation");

    } else {

      setScreen("nearbyWorkers");

    }

  }


  // ==========================================
  // FARMER — CONFIRM BOOKING
  // ==========================================

  function handleConfirmBooking() {

    if (!job) {

      return;

    }


    const confirmedJob = {

      ...job,

      status: "Confirmed",

      bookedWorkers: selectedWorkers

    };


    setJob(confirmedJob);


    setJobHistory((previousJobs) =>

      previousJobs.map((item) =>

        item.id === job.id
          ? confirmedJob
          : item

      )

    );


    setScreen("bookingSuccess");

  }


  // ==========================================
  // FARMER — JOB HISTORY
  // ==========================================

  function handleOpenJobHistory() {

    setScreen("jobHistory");

  }


  // ==========================================
  // FARMER — MY JOB
  // ==========================================

  async function handleViewMyJob() {

  if (job) {
    await handleLoadFarmerJobStatus(job.id);
  }

  setScreen("myJob");

}


  // ==========================================
  // FARMER — COMPLETE JOB
  // ==========================================

  function handleJobCompleted() {

    if (!job) {

      return;

    }


    const completedJob = {

      ...job,

      status: "Completed"

    };


    setJob(completedJob);


    setJobHistory((previousJobs) =>

      previousJobs.map((item) =>

        item.id === job.id
          ? completedJob
          : item

      )

    );


    setScreen("jobCompleted");

  }


  // ==========================================
  // FARMER — RATE WORKERS
  // ==========================================

  function handleRateWorkers() {

    if (selectedWorkers.length === 0) {

      setScreen("farmerHome");

      return;

    }


    setCurrentWorker(
      selectedWorkers[0]
    );


    setScreen("rating");

  }


  // ==========================================
  // FARMER — RATING SUBMIT
  // ==========================================

  function handleRatingSubmit(rating) {

    console.log(
      "Rating submitted:",
      currentWorker?.name,
      rating
    );


    setScreen("farmerHome");

  }


  // ==========================================
  // FARMER — DELETE JOB
  // ==========================================

  function handleDeleteJob(jobId) {

    // Delete from history
    setJobHistory((previousJobs) =>

      previousJobs.filter(
        (item) => item.id !== jobId
      )

    );


    // Delete from worker available jobs too
    setWorkerJobs((previousJobs) =>

      previousJobs.filter(
        (item) => item.id !== jobId
      )

    );


    // If current job is deleted
    if (job?.id === jobId) {

      setJob(null);

      setSelectedWorkers([]);

      setCurrentWorker(null);

    }

  }


  // ==========================================
  // FARMER — PROFILE
  // ==========================================

  function handleOpenProfile() {
    console.log("PROFILE BUTTON CLICKED");
    setScreen("profile");

  }


  // ==========================================
  // FARMER — HOME
  // ==========================================

  function handleHome() {

    setScreen("farmerHome");

  }


  // ==========================================
  // FARMER — BACK TO WORKERS
  // ==========================================

  function handleBackToWorkers() {

    setScreen("nearbyWorkers");

  }


  // ==========================================
  // WORKER — FIND JOBS
  // ==========================================

  function handleFindJobs() {

    setScreen("workerJobs");

  }


  // ==========================================
  // WORKER — SELECT JOB
  // ==========================================

  function handleWorkerJobSelect(selectedJob) {

    setSelectedWorkerJob(selectedJob);

    setScreen("workerJobDetails");

  }


  // ==========================================
  // WORKER — ACCEPT JOB
  // ==========================================


  async function handleWorkerAcceptJob(acceptedJob) {
  if (!acceptedJob || !currentWorker) {
    alert("Worker information not found.");
    return;
  }

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/users/jobs/accept/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          job: acceptedJob.id,
          worker: currentWorker.id
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(
        data.detail ||
        "Unable to accept this job."
      );
      return;
    }

    console.log(
      "Job accepted successfully:",
      data
    );

    // Add job to accepted jobs
    setAcceptedWorkerJobs((previousJobs) => [
      ...previousJobs.filter(
        (item) => item.id !== acceptedJob.id
      ),
      {
        ...acceptedJob,
        applied: true
      }
    ]);

    // Update remaining workers locally
    setWorkerJobs((previousJobs) =>
      previousJobs
        .map((item) => {
          if (item.id !== acceptedJob.id) {
            return item;
          }

          const remaining =
            Number(
              item.workersRemaining ??
              item.workers ??
              0
            ) - 1;

          return {
            ...item,
            workersRemaining: remaining,
            workers: remaining
          };
        })
        .filter(
          (item) =>
            Number(
              item.workersRemaining ??
              item.workers ??
              0
            ) > 0
        )
    );

    setSelectedWorkerJob(null);

    setScreen("workerHome");

  } catch (error) {
    console.error(
      "Error accepting job:",
      error
    );

    alert(
      "Unable to connect to the server."
    );
  }
}
//   async function handleWorkerAcceptJob(acceptedJob) {

//   if (!acceptedJob) {
//     return;
//   }

//   if (!currentWorker) {
//     alert("Worker information not found.");
//     return;
//   }

//   console.log("Current worker:", currentWorker);

//   try {

//     const response = await fetch(
//       "http://127.0.0.1:8000/api/users/jobs/accept/",
//       {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json"
//         },

//         body: JSON.stringify({
//           job: acceptedJob.id,
//           worker: currentWorker.id
//         })
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       alert(data.detail || "Unable to accept this job.");
//       return;
//     }

//     console.log("Job accepted successfully:", data);

//     // Add to accepted jobs
//     setAcceptedWorkerJobs(
//       (previousJobs) => [
//         ...previousJobs.filter(
//           (item) =>
//             item.id !== acceptedJob.id
//         ),
//         acceptedJob
//       ]
//     );

//     // // Remove from available jobs
//     // setWorkerJobs(
//     //   (previousJobs) =>
//     //     previousJobs.filter(
//     //       (item) =>
//     //         item.id !== acceptedJob.id
//     //     )
//     // );

//     // Update remaining worker slots
// setWorkerJobs(
//   (previousJobs) =>
//     previousJobs.map((item) => {

//       if (item.id !== acceptedJob.id) {
//         return item;
//       }

//       const remainingWorkers =
//         item.workers - 1;

//       return {
//         ...item,
//         workers: remainingWorkers
//       };
//     }).filter(
//       (item) =>
//         item.workers > 0
//     )
// );

//     setSelectedWorkerJob(null);

//     setScreen("workerHome");

//   } catch (error) {

//     console.error(
//       "Error accepting job:",
//       error
//     );

//     alert(
//       "Unable to connect to the server."
//     );
//   }
// }

async function handleLoadFarmerJobStatus(jobId) {

  try {

    const response = await fetch(
      `http://127.0.0.1:8000/api/users/jobs/${jobId}/status/`
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "Unable to load farmer job status:",
        data
      );
      return;
    }

    console.log(
      "Farmer job status:",
      data
    );

    setSelectedWorkers(data.workers);

  } catch (error) {

    console.error(
      "Error loading farmer job status:",
      error
    );

  }
}


  // ==========================================
  // WORKER — PROFILE
  // ==========================================

  function handleWorkerProfile() {

    setScreen("workerProfile");

  }


  // ==========================================
  // WORKER — HOME
  // ==========================================

  function handleWorkerHome() {

    setScreen("workerHome");

  }


  // ==========================================
  // APP
  // ==========================================

  return (

    <div className={`app ${theme}-theme`}>


      {/* ================================= */}
      {/* WELCOME */}
      {/* ================================= */}

      {screen === "welcome" && (

        <Welcome

          language={language}

          theme={theme}

          onLanguageSelect={
            handleLanguageSelect
          }

          onThemeToggle={
            handleThemeToggle
          }

        />

      )}


      {/* ================================= */}
      {/* USER TYPE */}
      {/* ================================= */}

      {screen === "userType" && (

        <UserType

          language={language}

          theme={theme}

          onUserTypeSelect={
            handleUserTypeSelect
          }

          onBack={() =>
            setScreen("welcome")
          }

          onThemeToggle={
            handleThemeToggle
          }

        />

      )}


      {/* ================================= */}
      {/* FARMER REGISTER */}
      {/* ================================= */}

      {screen === "farmerRegister" && (

        <FarmerRegister

          language={language}

          theme={theme}

          onRegister={
            handleFarmerRegister
          }

          onBack={() =>
            setScreen("userType")
          }

          onThemeToggle={
            handleThemeToggle
          }

        />

      )}


      {/* ================================= */}
      {/* WORKER REGISTER */}
      {/* ================================= */}

      {screen === "workerRegister" && (

        <WorkerRegister

          language={language}

          theme={theme}

          onRegister={
            handleWorkerRegister
          }

          onBack={() =>
            setScreen("userType")
          }

          onThemeToggle={
            handleThemeToggle
          }

        />

      )}


      {/* ================================= */}
      {/* FARMER HOME */}
      {/* ================================= */}

      {screen === "farmerHome" && (

        <FarmerHome

          farmer={farmer}

          job={job}

          language={language}

          theme={theme}

          onCreateJob={
            handleCreateJob
          }

          onProfile={
            handleOpenProfile
          }

          onJobHistory={
            handleOpenJobHistory
          }

          onThemeToggle={
            handleThemeToggle
          }

        />

      )}


      {/* ================================= */}
      {/* WORKER HOME */}
      {/* ================================= */}

      {screen === "workerHome" && (

        <WorkerHome

          worker={worker}

          language={language}

          theme={theme}

          onFindJobs={
            handleFindJobs
          }

          onProfile={
            handleWorkerProfile
          }

          onThemeToggle={
            handleThemeToggle
          }

        />

      )}


      {/* ================================= */}
      {/* CREATE JOB */}
      {/* ================================= */}

      {screen === "createJob" && (

        <CreateJob

          language={language}
          farmer={farmer}
          theme={theme}

          onJobCreated={
            handleJobCreated
          }

          onBack={() =>
            setScreen("farmerHome")
          }

          onThemeToggle={
            handleThemeToggle
          }

        />

      )}


      {/* ================================= */}
      {/* NEARBY WORKERS */}
      {/* ================================= */}

      {screen === "nearbyWorkers" && (

        <NearbyWorkers

          job={job}

          selectedWorkers={
            selectedWorkers
          }

          language={language}

          darkMode={
            theme === "dark"
          }

          onToggleTheme={
            handleThemeToggle
          }

          onWorkerSelect={
            handleWorkerSelect
          }

          onBack={
            handleHome
          }

        />

      )}


      {/* ================================= */}
      {/* WORKER DETAILS */}
      {/* ================================= */}

      {screen === "workerDetails" && (

        <WorkerDetails

          worker={currentWorker}

          job={job}

          language={language}

          theme={theme}

          selectedWorkers={
            selectedWorkers
          }

          onThemeToggle={
            handleThemeToggle
          }

          onBack={
            handleBackToWorkers
          }

          onChooseWorker={
            handleChooseWorker
          }

        />

      )}


      {/* ================================= */}
      {/* BOOKING CONFIRMATION */}
      {/* ================================= */}

      {screen === "bookingConfirmation" && (

        <BookingConfirmation

          workers={
            selectedWorkers
          }

          job={job}

          language={language}

          darkMode={
            theme === "dark"
          }

          onToggleTheme={
            handleThemeToggle
          }

          onBack={
            handleBackToWorkers
          }

          onConfirm={
            handleConfirmBooking
          }

        />

      )}


      {/* ================================= */}
      {/* BOOKING SUCCESS */}
      {/* ================================= */}

      {screen === "bookingSuccess" && (

        <div className="success-screen">

          <div className="success-card">

            <div className="success-icon">
              ✓
            </div>

            <h1>

              {language === "Kannada"

                ? "ಬುಕಿಂಗ್ ಯಶಸ್ವಿಯಾಗಿದೆ!"

                : "Booking Confirmed!"}

            </h1>


            <p>

              {language === "Kannada"

                ? "ನಿಮ್ಮ ಕೆಲಸಗಾರರನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ."

                : "Your workers have been selected successfully."}

            </p>


            <button

              className="continue-button"

              onClick={
                handleViewMyJob
              }

            >

              {language === "Kannada"

                ? "ನನ್ನ ಕೆಲಸವನ್ನು ವೀಕ್ಷಿಸಿ"

                : "View My Job"}

            </button>


            <button

              className="continue-button"

              onClick={
                handleHome
              }

            >

              {language === "Kannada"

                ? "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ"

                : "Back to Home"}

            </button>

          </div>

        </div>

      )}


      {/* ================================= */}
      {/* FARMER JOB HISTORY */}
      {/* ================================= */}

      {screen === "jobHistory" && (

        <JobHistory

          jobHistory={
            jobHistory
          }

          language={language}

          theme={theme}

          onBack={
            handleHome
          }

          onDeleteJob={
            handleDeleteJob
          }

          onThemeToggle={
            handleThemeToggle
          }

        />

      )}


      {/* ================================= */}
      {/* FARMER MY JOB */}
      {/* ================================= */}

      {screen === "myJob" && (

        <MyJob

          job={job}

          workers={
            selectedWorkers
          }

          language={language}

          theme={theme}

          onComplete={
            handleJobCompleted
          }

          onHome={
            handleHome
          }

          onThemeToggle={
            handleThemeToggle
          }

        />

      )}


      {/* ================================= */}
      {/* FARMER JOB COMPLETED */}
      {/* ================================= */}

      {screen === "jobCompleted" && (

        <JobCompleted

          workers={
            selectedWorkers
          }

          job={job}

          language={language}

          theme={theme}

          onRateWorkers={
            handleRateWorkers
          }

          onHome={
            handleHome
          }

          onThemeToggle={
            handleThemeToggle
          }

        />

      )}


      {/* ================================= */}
      {/* FARMER RATING */}
      {/* ================================= */}

      {screen === "rating" && (

        <Rating

          worker={
            currentWorker
          }

          language={language}

          onSubmit={
            handleRatingSubmit
          }

          onSkip={
            handleHome
          }

        />

      )}


      {/* ================================= */}
      {/* FARMER PROFILE */}
      {/* ================================= */}

      {screen === "profile" && (

        <Profile

          farmer={farmer}

          userType={
            userType
          }

          language={language}

          theme={theme}

          onBack={
            handleHome
          }

          onThemeToggle={
            handleThemeToggle
          }

          onLogout={
  handleLogout
}
        />

      )}


      {/* ================================= */}
      {/* WORKER — AVAILABLE JOBS */}
      {/* ================================= */}

      {screen === "workerJobs" && (

        <WorkerJobs

          jobs={workerJobs}

          language={language}

          onJobSelect={
            handleWorkerJobSelect
          }

          onBack={
            handleWorkerHome
          }

          appliedJobIds={acceptedWorkerJobs.map(
  (job) => job.id
)}

        />

      )}


      {/* ================================= */}
      {/* WORKER — JOB DETAILS */}
      {/* ================================= */}

      {screen === "workerJobDetails" && (

        <WorkerJobDetails

          job={
            selectedWorkerJob
          }

          language={language}

          onAccept={
            handleWorkerAcceptJob
          }

          onBack={() =>
            setScreen("workerJobs")
          }

        />

      )}


      {/* ================================= */}
      {/* WORKER — PROFILE */}
      {/* ================================= */}

      {screen === "workerProfile" && (

        <WorkerProfile

  worker={currentWorker}

  language={language}

  theme={theme}

  onBack={
    handleWorkerHome
  }

  onThemeToggle={
    handleThemeToggle
  }

  onLogout={
    handleLogout
  }

/>

      )}

    </div>

  );

}


export default App;