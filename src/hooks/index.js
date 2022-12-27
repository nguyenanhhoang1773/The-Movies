export const findIdGenre = (name, genreSelector) => {
  return genreSelector.genres.find((obj) => {
    return obj.name === name;
  }).id;
};
export const convertTimeStamp = (timestamp) => {
  const date = timestamp.toDate().toDateString();
  const time = timestamp.toDate().toLocaleTimeString();
  const dateArr = date.split(" ");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthsVn = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let resultString = "";
  const indexMonth = months.indexOf(dateArr[1]);
  const timeArr = time.split(" ");
  const timeNumbers = timeArr[0].split(":");
  if (timeArr[1] === "PM") {
    if (+timeNumbers[0] !== 12) {
      timeNumbers[0] = +timeNumbers[0];
      timeNumbers[0] += 12;
    }
  }
  resultString +=
    timeNumbers[0] +
    ":" +
    timeNumbers[1] +
    ", " +
    dateArr[2] +
    "/" +
    monthsVn[indexMonth] +
    "/" +
    dateArr[3];
  return resultString;
};
