export const isToday = (someDate: Date): Boolean => {
  const today = new Date()
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  )
}
