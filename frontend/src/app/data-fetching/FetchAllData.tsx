import { FetchAvailableProjectSteps } from "src/app/data-fetching/FetchAvailableProjectSteps"
import { FetchProjects } from "src/app/data-fetching/FetchProjects"
import { FetchProjectStatuses } from "src/app/data-fetching/FetchProjectStatuses"
import { FetchSelectedProject } from "src/app/data-fetching/FetchSelectedProject"
import { User } from "src/DMS/collections/user"
import { useApplicationState } from "src/hooks/state/useApplicationState"
import { useProjectState } from "src/hooks/state/useProjectState"


export const FetchAllData = () => {
  const { selectedProject, selectedProjectId, availableProjectSteps, projectStatuses, projects } = useProjectState()
  const { loggedInUser } = useApplicationState()

  if (!loggedInUser) return null

  return (
    <>
      {!projects && <FetchProjects loggedInUser={loggedInUser} />}
      {!projectStatuses && <FetchProjectStatuses loggedInUser={loggedInUser} />}
      {!availableProjectSteps && <FetchAvailableProjectSteps loggedInUser={loggedInUser} />}
      {selectedProjectId && !selectedProject && <FetchSelectedProject selectedProjectId={selectedProjectId} />}
    </>
  )
}
