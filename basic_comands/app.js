const { makeFile } = require('./timesTables/times');

// let base = 3;

let argv = process.argv;
let param = argv[2];

let base = param.split('=')[1];

makeFile(base).then(file => console.log(`file ${file} created`))
  .catch(e => e);



