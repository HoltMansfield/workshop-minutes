import { Box } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { CreateProjectStep1 } from './create-project/CreateProjectStep1'
import { CreateUser } from './create-user/CreateUser'
import { Login } from './login/Login'
import { LoginRequired as LR } from './LoginRequired'
import { SelectedProject } from './selected-project/SelectedProject'
import { Settings } from './settings/Settings'


export const RouteTable = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/" element={<LR><SelectedProject /></LR>} />
      <Route path="/create-project/step-1" element={<LR><CreateProjectStep1 /></LR>} />
      <Route path="/settings/:tabIndex" element={<LR><Settings /></LR>} />
      <Route path="*" element={<Box m={2}>Page Not Found</Box>} />
    </Routes>
  )
}
