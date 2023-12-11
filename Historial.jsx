import React, { useState } from 'react'
import { Link } from 'react-router-dom'
function Historial() {

  const [historial, setHistorial] = useState(()=>{
    const storage = localStorage.getItem("resultado")
    if (storage) return JSON.parse(storage);
    localStorage.setItem("resultado", JSON.stringify([]))
    return []
  });
  return (
    <div>
  <>
 <Link to={"/"}>Volver</Link>
 <h2>Historial de mediciones</h2>
<table className='historial'>
    <thead>
    <tr>
      <th>Fecha de consulta</th>
      <th>Ciudad</th>
      <th>Hora de medición</th>
      <th>Dato medido</th>
    </tr>
    </thead>
    <tbody>
   {historial.map(items=><tr key={historial.indexOf(items)}><td>{items.fecha} {items.time}</td><td>{items.ciudad}</td><td>{items.hora}</td><td>{items.tipo}</td></tr>)}
   </tbody>
</table>
</>
    </div>
  )
}

export default Historial

