import moment from "moment";

export function getDate(date) {
  const newDate = moment(date);
  const formattedDate = newDate.format("DD/MM/YYYY");
  return formattedDate;
}

export function getDateTime(date) {
  const newDate = moment(date);

  const formattedDateTime = newDate.format("DD/MM/YYYY HH:mm");
  return formattedDateTime;
}
