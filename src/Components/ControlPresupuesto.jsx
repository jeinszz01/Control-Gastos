import {useEffect, useState} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto}) => {
    
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    //el valor inicial es 0 q esta al final.
    //gastos.reduce esta propiedad es como el .map xq es un arreglo con objetos
    //acomula una gran cantidad de datos en una variable.
    //el arrow function toma dos valores acomulado y la instancia de gastos q va iterar
    //en las nuevas variables respectivas
    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado
        
        // Calcular el porcentaje gastado
        const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2)

        setDisponible(totalDisponible)
        setGastado(totalGastado)

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);

    }, [gastos])
    
    const formatearCantidad = (dinero) => {
        //primero q use el formato del pais 'en-US'
        //style:'currency', currency:'USD', (estas son del dolar)
        //currency especifica en tipo de simbolo de la moneda
        return dinero.toLocaleString('en-US', {
            minimumFractionDigits: 2
        })
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Desea Resetear el Presupuesto y Gasto?')
        if(resultado) {
            setPresupuesto(0)
            setGastos([])
            setIsValidPresupuesto(false)
        }
    }
    
    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            
            <div>
                <CircularProgressbar 
                    value={porcentaje}
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? 'firebrick' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? 'firebrick' : '#3B82F6',
                    })}
                    text={`${porcentaje} % Gastado`}
                />
            </div>
            
            <div className='contenido-presupuesto'>
                <button className='reset-app' type='button' onClick={handleResetApp}>
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span>S/. {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : '' }`}>
                    <span>Disponible: </span>S/. {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span>S/. {formatearCantidad(gastado)}
                </p>

            </div>
        </div>
    )
}

export default ControlPresupuesto
