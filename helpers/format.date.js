
const formatDate = (date) => {

  const createdAtDate = new Date(date);

  const humanReadableTime = createdAtDate.toLocaleString();

  return humanReadableTime
}

export default formatDate