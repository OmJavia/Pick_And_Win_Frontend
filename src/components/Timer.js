import React, { useState, useEffect } from 'react';
import './Timer.css'; // Importing CSS file for styling

function Timer() {
  // Set the date we're counting down to
  const countDownDate = new Date("Jan 1, 2025 15:37:25").getTime();

  const [timeLeft, setTimeLeft] = useState(countDownDate - new Date().getTime());

  useEffect(() => {
    // Update the countdown every 1 second
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      setTimeLeft(distance);

      if (distance < 0) {
        clearInterval(intervalId); // Stop the timer if it's expired
      }
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `Result will be out in- ${days}days ${hours}hr ${minutes}min ${remainingSeconds}sec`;
  };

  return (
    <div className="timer-container">
      <div className="timer">
        {timeLeft > 0 ? formatTime(timeLeft) : "EXPIRED"}
      </div>
    </div>
  );
}

export default Timer;
