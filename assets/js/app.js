const input = document.querySelector('#input')
const add = document.querySelector('#add')
const table = document.querySelector('#table')
const total = document.querySelector('#total')
const realizada = document.querySelector('#realizada')
const faltante = document.querySelector('#faltante')
const tareas = []
/*Funciones*/
/*crea un id unico y evita que se repita*/
const getRandom = () => {
    const id = Math.floor(Math.random() * 999)
    if (tareas.find((e) => e.id === id)) return getRandom()
    return id
}
/*revisa si una tarea fue completada o no, con true o false*/
const completado = (id) => {
    const index = tareas.findIndex((e) => e.id === id)
    tareas[index].completado ? tareas[index].completado = false : tareas[index].completado = true
    imprimir(tareas)
}
/*borra una tarea, preguntando si esta seguro, la borra del array, la vuelve a imprimir*/
const borrar = (id) => {
    const index = tareas.findIndex((e) => e.id === id)
    if (confirm('Seguro que desea eliminar la tarea')) {
        tareas.splice(index, 1)
        imprimir(tareas)
    }
}
/*checkea si la tarea esta completada o no, cada vez que se imprima, retorna un string vacio o checked*/
const checked = (boolean) => {
    if (boolean) return 'checked'
}
/*cuenta las tareas totales, realizadas y faltantes*/
const contar = (array) => {
    const cuenta = array.filter((array) => array.completado === true).length
    total.innerHTML = array.length
    realizada.innerHTML = cuenta
    faltante.innerHTML = array.length - cuenta
}
/*edita la descripcion de una tarea, sin modificar el ID, preguntando con un confirm y remplazando con un string prompt*/
const editar = (id, description) => {
    const index = tareas.findIndex((e) => e.id === id)
    if (confirm('Seguro que desea editar la tarea')) {
        tareas[index].description = prompt('Edite su tarea', description)
        imprimir(tareas)
    }
}
/*define si el texto sera tachado por la tarea completada o no */
const streaked = (boolean) => {
    if (boolean) return 'line-through;"'
}
/*style="text-decoration:line-through;"
guarda la informacion en el array, recorriendolo con un forEach, para luego imprimirlo en formato de tabla HTML*/
const imprimir = (array) => {
    let html = ''
    array.forEach(e => {
        html += `
        <tr>
            <td>${e.id}</td>
            <td style="text-decoration:${streaked(e.completado)};">${e.description}</td>
            <td style="text-align:center">
                <input type="checkbox" ${checked(e.completado)} onchange='completado(${e.id})' id="${e.id}">
                <button onclick="borrar(${e.id})" class="btn"><i class="fa-solid fa-trash"></i></button>
                <button class="btn" onclick="editar(${e.id},'${e.description}')"><i class="fa-solid fa-pen"></i></button>
            </td>
        </tr>`
    });
    table.innerHTML = html
    contar(array)
}
/*escucha al boton de agregar tareas, guarda las tareas en el array luego lo manda a imprimir.*/
add.addEventListener('click', () => {
    if (input.value === '') return
    tareas.push({
        id: getRandom(),
        description: input.value,
        completado: false
    })
    input.value = ''
    imprimir(tareas)
})
imprimir(tareas)