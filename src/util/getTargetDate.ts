export default function getRelativeDate(targetDate: string) {
  const today = new Date();
  const dateToCheck = new Date(targetDate);

  if (today > dateToCheck) {
    return "Overdue";
  }

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  let dateStatus: string;

  if (dateToCheck.toDateString() === today.toDateString()) {
    dateStatus = "Today";
  } else {
    if (dateToCheck.toDateString() === tomorrow.toDateString()) {
      dateStatus = "Tomorrow";
    } else {
      dateStatus = dateToCheck.toLocaleDateString("en-us", {
        dateStyle: "long",
      });
    }
  }

  switch (new Date(targetDate).getDay()) {
    case 0:
      return "Sunday, " + dateStatus;
    case 1:
      return "Monday, " + dateStatus;
    case 2:
      return "Tuesday, " + dateStatus;
    case 3:
      return "Wednesday, " + dateStatus;
    case 4:
      return "Thursday, " + dateStatus;
    case 5:
      return "Friday, " + dateStatus;
    default:
      return "Saturday, " + dateStatus;
  }
}
