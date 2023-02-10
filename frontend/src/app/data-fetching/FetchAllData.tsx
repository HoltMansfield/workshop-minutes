import { FetchAvailableProjectSteps } from "src/app/data-fetching/FetchAvailableProjectSteps"
import { FetchProjects } from "src/app/data-fetching/FetchProjects"
import { FetchProjectStatuses } from "src/app/data-fetching/FetchProjectStatuses"
import { FetchSelectedProject } from "src/app/data-fetching/FetchSelectedProject"
import { User } from "src/DMS/collections/user"
import { useApplicationState } from "src/hooks/state/useApplicationState"
import { useProjectState } from "src/hooks/state/useProjectState"


export const FetchAllData = () => {
  const { selectedProjectId } = useProjectState()
  const { loggedInUser } = useApplicationState()

  if (!loggedInUser) return null

  return (
    <>
      <FetchProjects loggedInUser={loggedInUser} />
      <FetchProjectStatuses loggedInUser={loggedInUser} />
      <FetchAvailableProjectSteps loggedInUser={loggedInUser} />
      {selectedProjectId && <FetchSelectedProject selectedProjectId={selectedProjectId} />}
    </>
  )
}
