import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({
    presupuesto,
    setPresupuesto,
    isValidPresupuesto,
    setIsValidPresupuesto,
    gastos,
    setGastos
    }) => {
    return (
        <header>
            <h1>Planificador de Gastos</h1>
            
            {isValidPresupuesto ? (
                <ControlPresupuesto
                    gastos={gastos}
                    setGastos={setGastos} //pasamos para formatear
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}//pasamos para formatear
                    setIsValidPresupuesto={setIsValidPresupuesto}//pasamos para formatear
                />
            ) : (
                <NuevoPresupuesto 
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />
            )}
            
        </header>
    )
}

export default Header
