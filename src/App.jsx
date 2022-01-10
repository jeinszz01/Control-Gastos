import { useState, useEffect } from 'react'
import Header from './Components/Header'
import Filtros from './Components/Filtros'
import ListadoGastos from './Components/ListadoGastos'
import { generarId } from './helpers'
import Modal from './Components/Modal'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )//tipo arreglo vacio
  // ?? si es q no hay ese elemento entonces lo agrega un 0
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)//false xq inicia con 0

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})//cada gasto es un objeto

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      } , 500)
    }
  }, [gastoEditar])

  //UE para el localstorage del presupuesto a ingresar
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])
  
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    if(filtro) {
      // Filtrar gastos por categoria
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  useEffect(() => {// si no encuentra 'presupuesto' entonces su valor sera 0
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    
    if(presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])//va cargar una vez cuando garge la aplicacion


  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    //Luego de q suceda este cambio se ejecuta a los 3 segundos
    setTimeout(() => {
      setAnimarModal(true)
    } , 500)
  }

  const guardarGasto = gasto => {
 
    if(gasto.id) {
      //Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      //Nuevo Gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }

    //con esto cerramos la ventana automaticamente
    setAnimarModal(false)
        setTimeout(() => {
            setModal(false)
        }, 500);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

//{modal ? 'fijar' : ''} se agrega la clase fijar si modal existe
  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
      gastos={gastos}
      setGastos={setGastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      />

 
      {isValidPresupuesto && (
          //Lo q hace && es similiar al if. comprueba si se cumple y se ejecuta, no necesita un else
          <>
            <main>
                <Filtros
                filtro={filtro}
                setFiltro={setFiltro}
                />

                <ListadoGastos
                  gastos={gastos}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                  filtro={filtro}
                  gastosFiltrados={gastosFiltrados}
                />
            </main>
            
            <div className='nuevo-gasto'>
                <img src={IconoNuevoGasto} alt='icono nuevo gasto' onClick={handleNuevoGasto}/>
            </div>
          </>
      )}
      
      {modal && <Modal 
                  setModal={setModal}
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}
                />}

    </div>
  )
}

export default App
