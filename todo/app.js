const argv = require('./config/yargs').argv;
const todo = require('./todo/todo');
const fs = require('fs');
let comando = argv._[0];

switch (comando) {
  case 'create':
    let task = todo.create(argv.description);
    console.log(task); break;
  case 'list':
    let list = todo.getList();
    for (let task of list) {
      console.log(task.description);
      console.log("Status: ", task.completado);
    }
    console.log('todo'); break;
  case 'update':
    let actualizado = todo.erase(argv.description, argv.completado);
    console.log(actualizado);
    console.log('todo'); break;
    case 'erase':
    let del = todo.erase(argv.description)
    console.log(del);
    break;
  default:
    console.log('command not exist');
}