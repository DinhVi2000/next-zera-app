const getTimeRemaining = (time) => {
  time = time * 1000;
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  return {
    days: days > 9 ? days : "0" + days,
    hours: hours > 9 ? hours : "0" + hours,
    minutes: minutes > 9 ? minutes : "0" + minutes,
    seconds: seconds > 9 ? seconds : "0" + seconds,
  };
};

export {
  getTimeRemaining,
};