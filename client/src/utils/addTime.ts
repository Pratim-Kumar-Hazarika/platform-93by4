// function for adding given minutes to particular time
export function addTime(time: Date, minutes: number): Date {
  time.setMinutes(time.getMinutes() + minutes)
  return time
}
