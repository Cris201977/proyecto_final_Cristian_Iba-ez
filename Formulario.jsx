import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import * as ReactDOM from 'react-dom'
import { FaLocationDot, FaClock, FaTemperatureHalf, FaCloud, FaSun, FaCloudRain  } from "react-icons/fa6";


function Formulario() {
    const [data, setData] = useState([])
    const [resultado, setResultado] = useState([])
    const [btnGuardar, setBtnGuardar] = useState(<p></p>)
    const [styleResultado, setStyleResultado] = useState({visibility: "hidden"})
    const [icono, setIcono]= useState()

      useEffect(() => {
      fetch('./src/data/clima.json')
        .then(response => response.json())
        .then((json) => {setData(json)})
        .catch(error => console.error(error))
      }, [])

    const [historial, setHistorial] = useState(()=>{
    const storage = localStorage.getItem("resultado")
    if (storage) return JSON.parse(storage);
    localStorage.setItem("resultado", JSON.stringify([]))
    return []
  });

  useEffect( ()=>{
    localStorage.setItem("resultado", JSON.stringify(historial)),
    [historial]
  })

    const tipos = data.map(c=>(c.tipo))
    const ciudades = data.map(c=>c.city)
    const horas = data.map(c=>c.hour)
    let res = {}

    const botonGuardar = function(){
    historial.push(res)
    setHistorial(historial)
    Swal.fire({
        icon: "success",
        title: "El dato ha sido guardado",
        showConfirmButton: false,
        timer: 1500
    }),
      setBtnGuardar(<p></p>)
      }

    function IconTipo(iconoRecibido) {
      console.log(iconoRecibido)
   switch (iconoRecibido) {
    case "Nublado":
        setIcono(<FaCloud />)
        break;
    case "Soleado":
        setIcono(<FaSun />)
        break;
    case "Lluvioso":
        setIcono(<FaCloudRain />)
        break;
    default:
        setIcono(<FaTemperatureHalf />)
        break;
   }
}
  return (
    <>
    <form onSubmit={(e)=>{
        e.preventDefault()
        let ciudad = e.target.ciudad.value
        let hora = e.target.hora.value
        let tipo = e.target.tipo.value
        let temperatura;
        let condicion;
        res.ciudad = ciudad
        res.hora = hora
        res.fecha =  new Date().toLocaleDateString("es-mx")
        res.time = new Date().toLocaleTimeString("es-me")

        setTimeout(() => {
        ciudad!="#" && hora!="#" && tipo!="#" ?
        ((temperatura = tipos[ciudades.indexOf(ciudad)].Temperatura[horas[ciudades.indexOf(ciudad)].indexOf(hora)]),
        (condicion = tipos[ciudades.indexOf(ciudad)].Condicion_climatica[horas[ciudades.indexOf(ciudad)].indexOf(hora)]),
        (Swal.fire({
        icon: "success",
        title: "Consulta realizada con éxito",
        showConfirmButton: false,
        timer: 1500
        })),
        (tipo == "Condicion_climatica" ? (res.tipo =condicion): (res.tipo =temperatura)),
        (setResultado(res)),
        (setStyleResultado({backgroundColor: "rgb(157, 219, 230)"})),
        (setBtnGuardar(<button onClick={(botonGuardar)}>Guardar</button>)),
        (console.log(res.tipo)),
        (res.tipo != undefined ? IconTipo(res.tipo): "")
        (e.target.reset())
        ):
        Swal.fire({
          icon: "error",
          title: "Complete los datos solicitados",
          showConfirmButton: false,
          timer: 1500
        })
}, 1500);

    }}>
        <h2>ClimApp</h2>
        <label htmlFor='ciudad'>Ciudad</label>
        <select id='ciudad'><option  value="#"></option>{ciudades!=[""] ? ciudades.map(c=><option key={ciudades.indexOf(c)}>{c}</option>): "#"}</select>
        <label htmlFor='tipo'>Condición climática / Temperatura</label>
        <select id='tipo'><option  value="#"></option>{tipos[0]!=undefined ?  Object.keys(tipos[0]).map(t=><option key={Object.keys(tipos[0]).indexOf(t)}>{t}</option>): "#"}</select>
        <label htmlFor='hora'>Hora</label>
        <select id='hora'><option  value="#"></option>{horas[0]!=undefined ? (horas[0].map(h=><option key={horas[0].indexOf(h)}>{h}</option>)): "#"}</select>
        <button type='submit' >Ver resultado</button>
    </form>
      <h2>El resultado de tu búsqueda es:</h2>
      <section className='resultado' style={styleResultado}>
<table>
   <thead>
    <tr>
    </tr>
    </thead>
    <tbody>
<tr>
	<td><FaLocationDot /></td>
	<td>{resultado.ciudad}</td>
</tr>
<tr>
	<td><FaClock /></td>
	<td>{resultado.hora}</td>
</tr>
<tr>
	<td>{icono}</td>
	<td>{resultado.tipo}</td>
</tr>
   </tbody>
</table>
        </section>
        {btnGuardar}
    </>
  )
}

export default Formulario

