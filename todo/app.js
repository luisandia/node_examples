const argv = require('./config/yargs').argv;
const todo = require('./todo/todo');
const fs = require('fs');
let comando = argv._[0];

switch (comando) {
  case 'create':
    let task = todo.create(argv.description);
    console.log(task); break;
  case 'list':
    console.log('todo'); break;
  case 'update':
    console.log('todo'); break;
  default:
    console.log('command not exist');
}