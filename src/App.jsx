import React, { useEffect, useState } from 'react'
import { cuadros } from './datos'
import './App.css'

const App = () => {
  const [aciertos, setAciertos] = useState(0)
  const [intentos, setIntentos] = useState(0)
  const [mensaje, setMensaje] = useState()
  const [finalizado, setFinalizado] = useState(false)
  const cuadrosJuntos = [...cuadros, ...cuadros]
  const cuadrosPrevios = cuadrosJuntos.map(valor => ({
    imagen: valor,
    estado: 0
  }))

  const [misCuadros, setMisCuadros] = useState([])
  const [misTiradas, setMisTiradas] = useState([])

  useEffect(() => {
    for (let i = cuadrosPrevios.length - 1; i > 0; i--) {
      const azar = Math.floor(Math.random() * (i + 1));
      [cuadrosPrevios[i], cuadrosPrevios[azar]] = [cuadrosPrevios[azar], cuadrosPrevios[i]]
    }

    setMisCuadros([...cuadrosPrevios])
  }, [])

  const tapado = {
    backgroundImage: `url(https://www.html6.es/img/rey_.png)`
  }

  const marcar = (e) => {
    const existe = misTiradas.find((objeto) => objeto.indice === e)
    const yaEncontrada = misCuadros[e].estado;
    if (misTiradas.length < 2 && !existe && yaEncontrada === 0) {
      setMisTiradas([...misTiradas,
      {
        imagen: misCuadros[e].imagen,
        indice: e
      }])
      const prevItem = [...misCuadros]
      prevItem[e].estado = 1;
      setMisCuadros(prevItem)
    }
  }

  useEffect(() => {
    if (misTiradas.length === 2) {
      setIntentos(intentos + 1)
      if (misTiradas[0].imagen === misTiradas[1].imagen) {
        setMisTiradas([])
        setAciertos(aciertos + 1)
        if (aciertos + 1 >= cuadros.length) {
          setMensaje('Enhorabuena!!!! Genial!!! Bravo!!')
          setFinalizado(true)
        }
      } else {
        setTimeout(() => {
          misTiradas.map(objeto => {
            const provisional = [...misCuadros]
            provisional[objeto.indice].estado = 0;
            setMisCuadros(provisional);
            setMisTiradas([])
          })
        }, 1000)
      }
    }
  }, [misTiradas])

  return (
    <>
      {finalizado &&
        <div className='panel'>
          <div className='texto'>
            <div className='mensaje'>
              {mensaje}
            </div>
            <button>Aceptar</button>
          </div>
        </div>}
      <div className='cuadros'>
        {misCuadros.map((dato, index) =>
          (dato.estado === 0)
            ? (<div onClick={() => marcar(index)} className='cuadro' key={index}
              style={tapado}>
              <div className='atras'>
                <img src='https://www.html6.es/img/naranja.png' alt='' />
              </div>
            </div>)
            : (
              <div onClick={() => marcar(index)} className='cuadro' key={index}
                style={{ backgroundImage: `url(${misCuadros[index].imagen})` }}>
                <div className='atras'>
                  <img src='https://www.html6.es/img/naranja.png' alt='' />
                </div>
              </div>)
        )}
      </div>
      <div className='aciertos'>
        {aciertos} aciertos de {intentos} intentos:
        {(intentos > 0) && <span className='intentos'>
          ({Math.round(aciertos * 100 / intentos)} % de acierto)
        </span>}
      </div>
    </>
  )
}

export default App