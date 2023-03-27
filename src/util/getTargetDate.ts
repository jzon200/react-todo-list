export default function getTargetDateString(targetDate: string) {
  const today = new Date();
  const dateToCheck = new Date(targetDate);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  let additionalLabel = "Today";

  if (dateToCheck.toDateString() === today.toDateString()) {
    additionalLabel = "Today";
  } else {
    if (dateToCheck.toDateString() === tomorrow.toDateString()) {
      additionalLabel = "Tomorrow";
    } else {
      additionalLabel = dateToCheck.toLocaleDateString("en-us", {
        dateStyle: "long",
      });
    }
  }

  switch (new Date(targetDate).getDay()) {
    case 0:
      return "Sunday, " + additionalLabel;
    case 1:
      return "Monday, " + additionalLabel;
    case 2:
      return "Tuesday, " + additionalLabel;
    case 3:
      return "Wednesday, " + additionalLabel;
    case 4:
      return "Thursday, " + additionalLabel;
    case 5:
      return "Friday, " + additionalLabel;
    default:
      return "Saturday, " + additionalLabel;
  }
}
