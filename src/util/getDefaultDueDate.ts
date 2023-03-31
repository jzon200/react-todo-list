export default function getDefaultDueDate() {
  const today = new Date();
  const todayDueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    31,
    59
  );

  return todayDueDate.toISOString().substring(0, 16);
}
