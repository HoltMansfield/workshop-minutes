import { FetchAvailableProjectSteps } from "src/app/data-fetching/FetchAvailableProjectSteps"
import { FetchProjects } from "src/app/data-fetching/FetchProjects"
import { FetchProjectStatuses } from "src/app/data-fetching/FetchProjectStatuses"


export const FetchAllData = () => {
  return (
    <>
      <FetchProjects />
      <FetchProjectStatuses />
      <FetchAvailableProjectSteps />
    </>
  )
}
