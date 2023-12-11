import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import Historial from './routes/Historial.jsx'
import './index.css'
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <h1>¡Ooops! Mala mía...  <Link to={"/"}>Volvé por acá</Link></h1>
  },
  {
    path: "/historial",
    element: <Historial/>,
    errorElement: <h1>¡Ooops! Mala mía... <Link to={"/"}>Volvé por acá</Link></h1>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
