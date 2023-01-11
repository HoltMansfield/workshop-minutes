import { createBrowserRouter } from 'react-router-dom'
import { SelectedProject } from './selected-project/SelectedProject'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SelectedProject />,
  },
])
