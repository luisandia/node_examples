const argv = require('./config/yargs').argv;
const colors = require('colors');
const { makeFile, listTable } = require('./timesTables/times');
// let _argv = process.argv;
// let param = argv[2];
// let base = param.split('=')[1];
let command = argv._[0];
switch (command) {
  case 'create':
    makeFile(argv.base, argv.limit).then(file => console.log(`file ${file} created`))
      .catch(e => console.log(e)); break;
  case 'list':
    listTable(argv.base, argv.limit); break;
  default:
    console.log('Command not reconized');
}