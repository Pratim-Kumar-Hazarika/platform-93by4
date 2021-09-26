import { timeformatAMPM } from "./timeformatAMPM"

// function for adding given minutes to particular time
export function addTime(time: Date, minutes: number): any {
      var today = new Date().getHours();
      time.setMinutes(time.getMinutes() + minutes)
      console.log({today})
      console.log(time.getHours())
    if (today >= 9 && today <= 21) {
     
      return time
    } return time
}
