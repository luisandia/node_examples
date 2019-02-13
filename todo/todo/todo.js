const fs = require('fs')

let todolist = [];
const saveDb = () => {
  let data = JSON.stringify(todolist);
  fs.writeFile('db/data.json', data, (err) => {
    if (err) console.log(err);
  });
}

const loadDb = () => {
  try {
    todolist = require('../db/data.json');
  } catch (error) {
    todolist = [];
  }
}
const create = (description) => {
  let todo = {
    description,
    completado: false
  };
  loadDb()
  todolist.push(todo);
  saveDb();
  return todo;
}
const getList = () => {
  loadDb();
  return todolist;
};
const update = (desc, complete = true) => {
  loadDb();
  let index = todolist.findIndex(task => (task.description == desc));

  if (index >= 0) {
    todolist[index].completado = complete;
    saveDb();
    return true;
  }
  return false;
};

const erase = (description) => {
  loadDb();
  console.log(description);
  let list = todolist.filter(tarea => tarea.description !== description)
  if (list.length == todolist.length) {
    return false;
  } else {
    todolist = list;
    saveDb();
    return true;
  }
}




module.exports = {
  create,
  loadDb,
  getList,
  update,
  erase

}
