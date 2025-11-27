import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    // Set an interval to update the time every second
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => {
      clearInterval(timer);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <time>{currentTime.format("ddd MMM D h:mm A")}</time>
  );
};

export default LiveClock;