import { Button } from "@mui/material"
import { useState } from "react"
import { useCreateProject } from "../../DMS/hooks/logic/project/useCreateProject"
import { useFindProject } from "../../DMS/hooks/logic/project/useFindProject"

const CreateProject = () => {
  const {mutation} = useCreateProject()

  return (
    <div>did it</div>
  )
}


export const SelectedProject = () => {
  const { status, error, data } = useFindProject({ _id: { $oid: '63c738e7e13e90c76e22536a' }})
  const [show, setShow] = useState(false)

  return (
    <div>
    <div>status: { status }</div>
    { error &&  <div>error: { error.message }</div>}
    { data &&  <div>data: { JSON.stringify(data) }</div>}
    <Button onClick={() => setShow(true)}>Create</Button>
    { show && <CreateProject /> }
  </div>
  )
}
