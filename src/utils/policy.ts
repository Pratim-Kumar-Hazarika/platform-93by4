export interface Policy {
  student: number
  reviewer: number
  interviewer: number
  acInterviewer: number
  superAdmin: number
}

export const policy: Policy = {
  student: 10,
  reviewer: 20,
  interviewer: 30,
  acInterviewer: 40,
  superAdmin: 100,
}
