export const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  return today.getFullYear() - birthDate.getFullYear();
};

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

export const slotDateFormat = (slotDate) => {
  const [day, month, year] = slotDate.split("_");
  return `${day} ${months[Number(month) - 1]} ${year}`;
};
