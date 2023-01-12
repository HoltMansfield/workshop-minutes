export const useLoginShield = () => {
  const handleLogin = (email: string, password: string) => {
    debugger
  }

  const handleCreateAccount = (email: string, password: string, name: string) => {
    debugger
  }

  return {
    handleLogin,
    handleCreateAccount
  } as const
}
