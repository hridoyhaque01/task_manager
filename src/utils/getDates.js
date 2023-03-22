const getDates = (dateStr) => {
  const newDate = new Date(dateStr);
  const options = { day: "numeric", month: "long" };
  const formattedDate = newDate.toLocaleDateString("en-US", options);
  const dates = formattedDate.split(" ");
  const month = dates[0];
  const date = parseInt(dates[1]);

  return {
    month,
    date,
  };
};

export default getDates;
