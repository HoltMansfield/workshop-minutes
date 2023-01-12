interface CreateUserFormProps {
  handleCreateAccount: (email: string, password: string, name: string) => void
}
export const CreateUserForm = ({ handleCreateAccount }: CreateUserFormProps) => {
  return (
    <div>Create Account</div>
  )
}
