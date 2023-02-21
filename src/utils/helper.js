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

export { sleep, notifyErrorMessage };
