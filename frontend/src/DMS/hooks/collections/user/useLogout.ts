import { useMutation } from 'react-query'
import { User } from '../../../collections/user'
import { HttpError } from '../../../types/api'
import { useDmsUser } from '../../api/useDmsUser'


export const useLogout = () => {
  const { logout } = useDmsUser()
 
  const mutation = useMutation<User, HttpError , null>(() => {
    return logout()
  })

  return {
    mutation
  } as const
}
