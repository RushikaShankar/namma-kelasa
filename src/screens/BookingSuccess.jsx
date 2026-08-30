function BookingSuccess({
  worker,
  job,
  onViewJob,
  onHome
}) {

  return (
    <div className="booking-success-screen">

      {/* Success Icon */}

      <div className="success-icon">
        ✓
      </div>


      {/* Message */}

      <h1>
        Booking Confirmed!
      </h1>

      <p className="success-subtitle">
        Your worker has been booked successfully.
      </p>


      {/* Worker */}

      <div className="success-worker-card">

        <div className="success-worker-avatar">
          👷
        </div>

        <div>

          <h2>
            {worker?.name}
          </h2>

          <p>
            ⭐ {worker?.rating}
          </p>

        </div>

      </div>


      {/* Job Summary */}

      <div className="success-job-card">

        <div className="success-detail">

          <span>🌾</span>

          <div>
            <small>Work</small>
            <p>{job?.workType}</p>
          </div>

        </div>


        <div className="success-detail">

          <span>📅</span>

          <div>
            <small>Date</small>
            <p>{job?.date}</p>
          </div>

        </div>


        <div className="success-detail">

          <span>📍</span>

          <div>
            <small>Location</small>
            <p>{job?.location}</p>
          </div>

        </div>


        <div className="success-detail">

          <span>₹</span>

          <div>
            <small>Daily Wage</small>
            <p>₹{job?.wage} / worker</p>
          </div>

        </div>

      </div>


      {/* Information */}

      <div className="success-info">

        <span>📞</span>

        <p>
          You can call the worker if you need to discuss
          the work details.
        </p>

      </div>


      {/* Buttons */}

      <button
        className="success-primary-button"
        onClick={onViewJob}
      >
        View My Job
      </button>


      <button
        className="success-secondary-button"
        onClick={onHome}
      >
        Back to Home
      </button>

    </div>
  );
}

export default BookingSuccess;