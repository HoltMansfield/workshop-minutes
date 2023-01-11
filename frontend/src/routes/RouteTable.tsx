import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div style={{ height: '500px', backgroundColor: 'blue' }}>Hello world!</div>,
  },
])
