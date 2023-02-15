export enum StepStatus {
  untouched = 'Untouched',
  started = 'Started',
  complete = 'Complete'
}

export interface Step {
  name: string
  projectStatusId: string
  status: StepStatus
  secondsElapsed: number
  sortOrder: number
  timer: Date
}

export interface Project {
  _id?: string
  userId: string
  name: string
  status: string
  steps?: Step[]
}
