import { timeformatAMPM } from "./timeformatAMPM"

// function for adding given minutes to particular time
export function addTime(time: Date, minutes: number): Date | undefined {
  const fromTime = time
  time.setMinutes(time.getMinutes() + minutes)
  const currentTime = new Date()
  // diff hours
  const moreThan8AM = (fromTime.getHours() - 8) * 60 + fromTime.getMinutes()
  const lessThan8AM = (20 - time.getHours()) * 60 - time.getMinutes()
  const moreThanCurrentTime = (fromTime.getHours() - currentTime.getHours()) * 60 + (fromTime.getMinutes()-currentTime.getMinutes())

  if (moreThan8AM >= 0 && lessThan8AM >= 0 && moreThanCurrentTime >=0) {
    return time
  }
}
