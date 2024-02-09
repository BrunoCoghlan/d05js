const input = document.querySelector('#input')
const add = document.querySelector('#add')
const table = document.querySelector('#table')
const total = document.querySelector('#total')
const realizada = document.querySelector('#realizada')
const faltante = document.querySelector('#faltante')
const check = document.querySelector('#check')
const borrar = document.querySelector('#borrar')
const editar = document.querySelector('#editar')
const tareas = []
/*Funciones*/
/*crea un id unico y evita que se repita*/
const getRandom = () => {
    const id = Math.floor(Math.random() * 999)
    if (tareas.find((e) => e.id === id)) return getRandom()
    return id
}
const imprimir = (array) => {
    let html =''
    array.forEach(e => {
        html +=`
        <tr>
            <td>${e.id}</td>
            <td>${e.description}</td>
            <td><input id="check" type="checkbox"><button id="borrar"><i class="fa-solid fa-trash"></i></button><button id="editar"><i class="fa-solid fa-pen"></i></button></td>
        </tr>`
    });
    table.innerHTML = html
}

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