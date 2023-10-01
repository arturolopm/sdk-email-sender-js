export const addMonths = (date: Date, months: number) => {
  date.setMonth(date.getMonth() + months)

  return date
}
export const addWeeks = (date: Date, weeks: number) => {
  const millisecondsInAWeek = 604800000 // 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const millisecondsToAdd = weeks * millisecondsInAWeek
  const updatedDate = new Date(date.getTime() + millisecondsToAdd)

  return updatedDate
}
export const isDay = (date: Date, day: number) => {
  return date.getDay() === day // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
}
