import { createBrowserRouter } from 'react-router-dom'
import { CreateUser } from './create-user/CreateUser'
import { Login } from './login/Login'
import { LoginRequired } from './LoginRequired'
import { SelectedProject } from './selected-project/SelectedProject'

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/create-user",
    element: <CreateUser />
  },
  // All Routes LoginRequired from here
  {
    path: "/",
    element: <LoginRequired><SelectedProject /></LoginRequired>
  }
])
