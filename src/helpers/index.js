//sniped, aqui si crea un id unico con unos caracteres random
//y una fecha
export const generarId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)
    return random + fecha
}

//forma de formatear una fecha sin necesidad de instalar un API
export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha)
    const configurando = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return fechaNueva.toLocaleDateString('es-ES', configurando)
}