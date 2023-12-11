import '../App.css'
import React from 'react'
import Formulario from '../componentes/Formulario'
import { Link } from 'react-router-dom'

function App() {


  return (
    <>
<Link to={"/historial"}>Historial</Link>
<Formulario />
    </>
  )
}

export default App
