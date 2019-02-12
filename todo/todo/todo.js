const fs = require('fs')

let todolist = [];
const saveDb = () => {
  let data = JSON.stringify(todolist);
  fs.writeFile('db/data.json', data, (err) => {
    if (err) console.log(err);
  });
}
const create = (description) => {
  let todo = {
    description,
    compleado: false
  };

  todolist.push(todo);
  saveDb();
  return todo;
}

module.exports={
  create
}
