// function will take date localstring and return time in hh:ss am/pm format
export function getTimeFromLocalString(localString: string) {
  const time = localString.split(' ')
  const timeArray = time[1].split(':')
  return `${timeArray[0]}:${timeArray[1]}${time[2]}`
}
