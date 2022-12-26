const months = {
  0: { name: "January", number: "01" },
  1: { name: "February", number: "02" },
  2: { name: "March", number: "03" },
  3: { name: "April", number: "04" },
  4: { name: "May", number: "05" },
  5: { name: "June", number: "06" },
  6: { name: "July", number: "07" },
  7: { name: "August", number: "08" },
  8: { name: "September", number: "09" },
  9: { name: "October", number: "10" },
  10: { name: "November", number: "11" },
  11: { name: "December", number: "12" },
};

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const convertDateToUKFormat = (date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dayOfWeek = date.getDay();
  return `${day}/${months[month].number}/${year}`;
};

export const convertDateToUSFormat = (date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${months[month].number}/${day}/${year}`;
};

export const convertDateToCalendarFormat = (date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${year}-${months[month].number}-${day}`;
};
