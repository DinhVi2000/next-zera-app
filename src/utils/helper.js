const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const notifyErrorMessage = (toast, error) => {
  toast({
    title: "ERROR",
    variant: "left-accent",
    description: error?.message,
    status: "error",
    duration: 6000,
    isClosable: true,
    position: "top-right",
  });
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const inRange = (x, min, max) => {
  return (x - min) * (x - max) <= 0;
};

const notifySuccessMessage = (toast, data) => {
  toast({
    title: "SUCCESS",
    variant: "left-accent",
    description: data,
    status: "success",
    duration: 6000,
    isClosable: true,
    position: "top-right",
  });
};

const getRandom = (list) => {
  if (!list.length) {
    return "";
  }

  return list[Math.floor(Math.random() * list.length)];
};

export {
  sleep,
  isEmpty,
  inRange,
  notifyErrorMessage,
  notifySuccessMessage,
  getRandom,
};
