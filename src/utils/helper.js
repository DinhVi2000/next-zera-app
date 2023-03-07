import moment from "moment/moment";

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

const formatDate = (date) => {
  if (!date) return;
  return new Date(date).toISOString().split("T")[0] || "";
};

const abbreviateNumber = (num) => {
  if (!num) return 0;

  const unit = Math.floor(
      Math.round(num / 1.0e1)
        .toLocaleString()
        .replaceAll(",", "").length
    ),
    wunit = [
      "K",
      "M",
      "B",
      "T",
      "Quadrillion",
      "Quintillion",
      "Sextillion",
      "Septillion",
      "Octillion",
      "Nonillion",
      "Decillion",
      "Undecillion",
      "Duodecillion",
      "Tredecillion",
      "Quattuordecillion",
      "Quindecillion",
      "Sexdecillion",
      "Septemdecillion",
      "Octodecillion",
      "Novemdecillion",
      "Vigintillion",
      "Unvigintillion",
      "Duovigintillion",
      "Trevigintillion",
      "Quattuorvigintillion",
      "Quinvigintillion",
      "Sexvigintillion",
      "Septvigintillion",
      "Octovigintillion",
      "Nonvigintillion",
      "Trigintillion",
      "Untrigintillion",
      "Duotrigintillion",
    ][Math.floor(unit / 3) - 1],
    funit = Math.abs(Number(num)) / Number("1.0e+" + (unit - (unit % 3)));
  return wunit ? funit.toLocaleString() + "" + wunit : num.toString();
};

const getBetweenTwoDate = (value) => {
  const currentDay = new Date();
  const prevTime = new Date(value);
  let diff =
    (currentDay.getTime() - prevTime.getTime()) / (1000 * 60 * 60 * 24);
  let betweenTwoDate;
  let string = "";

  // eslint-disable-next-line radix
  switch (Math.floor(diff)) {
    case 0:
      if (diff * 24 >= 1) {
        string = "hours ago";
        // eslint-disable-next-line radix
        betweenTwoDate = `${parseInt((diff * 24).toString())}`;
        return [betweenTwoDate, " ", string];
      }

      string = "minutes ago";
      // eslint-disable-next-line radix
      betweenTwoDate = `${parseInt((diff * 24 * 60).toString())}`;
      break;

    case 1:
      string = "day ago";
      betweenTwoDate = "1";
      break;

    case 2:
      string = "day ago";
      betweenTwoDate = "2";
      break;

    default:
      string = "";
      betweenTwoDate = moment(value).format("MM/DD/YYYY");
      break;
  }

  return [betweenTwoDate, " ", string];
};

const toUpperCaseFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const getArea = (area) => {
  return `${area} / ${area} / ${area} / ${area}`;
};

export {
  abbreviateNumber,
  formatDate,
  getRandom,
  getArea,
  isEmpty,
  inRange,
  notifyErrorMessage,
  notifySuccessMessage,
  sleep,
  getBetweenTwoDate,
  toUpperCaseFirstLetter,
};
