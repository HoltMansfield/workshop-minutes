import { Button } from "@mui/material"
import { useState } from "react"
import { useCreateProject } from "../../DMS/hooks/logic/project/useCreateProject"
import { useFindProject } from "../../DMS/hooks/logic/project/useFindProject"


export const SelectedProject = () => {
  const { status, error, data } = useFindProject({ _id: { $oid: '63c738e7e13e90c76e22536a' }})
  const { mutation } = useCreateProject()
  const [show, setShow] = useState(false)

  return (
    <div>
      <div>status: { status }</div>
      { error &&  <div>error: { error.message }</div>}
      { data &&  <div>data: { JSON.stringify(data) }</div>}
      { mutation.isLoading && (
          'Adding todo...'
        )
      }
        {mutation.isError ? (
      <div>An error occurred: {mutation.error.message}</div>
      ) : null}
        { mutation.isSuccess ? <div>Todo added!</div> : null }
        <Button onClick={() => 
          mutation.mutate({ name: 'Wall Clock', status: 'dreaming' })
        }>Create</Button>
    </div>
  )
}
