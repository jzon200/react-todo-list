export default function isTodoOverdue(targetDate: string) {
  const today = new Date();
  const dueDate = new Date(targetDate);

  return today > dueDate;
}
