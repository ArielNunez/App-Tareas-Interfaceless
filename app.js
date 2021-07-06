// requiero process y fs
const process = require('process');
const fs = require('fs');

// guardo la lectura del json en la variable tareas
let tareas = fs.readFileSync('./tareas.json', 'utf-8');
//parseo la variable tareas para poder manipularlo con JS y lo guardo en la variable lista de tareas
let listadeTareas = JSON.parse(tareas);

//switch con la lógica de los métodos
switch (process.argv[2]) {
    case 'listar':
    //recorro el array de tareas para mostrar todas las tareas por consola 
            console.log('Estas son todas sus tareas:')
            for(let i=0; i<listadeTareas.length; i++) {
                console.log(`${i+1} ${listadeTareas[i].titulo}`)
            }
        break;
    case 'crear':
        //método de creación de una tarea. el titulo se recupera de lo que el usuario pone por consola. 
        //El estado es "Pendiente" por defecto.
            let laTarea = {
                titulo: process.argv[3],
                estado: "Pendiente"
            }
            //Se pushea la nueva tarea al array
            listadeTareas.push(laTarea);
            //se vuelve a escribir el json con la nueva información
            fs.writeFileSync('./tareas.json', JSON.stringify(listadeTareas))
            //Mensaje de creación de tarea por terminal
            console.log(`Su tarea '${laTarea.titulo}' fue creada satisfactoriamente`)
        break;
    case 'editar':
        //rescata el índice del array de tareas y permite editar con nuevos datos proporcionados por el ususario
        //por consola
            listadeTareas[(process.argv[3] -1)] = { 
                titulo: process.argv[4],
                estado: process.argv[5]
            }
            //vulve a escribir el json con las últimas modificaciones
            fs.writeFileSync('./tareas.json', JSON.stringify(listadeTareas))
        break;
        case 'pendientes':
            console.log('Sus tareas pendientes son:')
            //recorre el array y pregunta si el estado es estrictamente igual a Pendiente
            for(let i=0; i<listadeTareas.length; i++) {
            if (listadeTareas[i].estado == 'Pendiente') {
            //Si lo es, muestra por consola todos los títulos de tareas con estado Pendiente
            console.log(`${listadeTareas[i].titulo}`)}}
        break;
    case 'finalizadas':
        console.log('Sus tareas finalizadas son:')
        //recorre el array y pregunta si el estado es estrictamente igual a Finalizada
        for(let i=0; i<listadeTareas.length; i++) {
            if (listadeTareas[i].estado == 'Finalizada') {
          //Si lo es, muestra por consola todos los títulos de tareas con estado Finalizada
            console.log(`${listadeTareas[i].titulo}`)}}
        break;
    default:
        //Guarda en la variable help el archivo con ayuda de comandos
        let help = fs.readFileSync('./help.txt', 'utf-8'); 
        //Si no entra en ninguno de los casos anteriores los muestra por consola para ayudar al usuario   
    console.log(help)
        break;
};