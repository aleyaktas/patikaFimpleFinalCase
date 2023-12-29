function getDate(date) {
  const newDate = new Date(date);
  const formattedDate = `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;

  return formattedDate;
}

export default getDate;
