const argv = require('yargs').command({
  command: 'create',
  desc: 'create multiplication table',
}).command('list', 'print multiplication table', (yargs) => {
  return yargs.options('base', {
    alias: 'b',
    type: 'number',
    demand: 'Please specify number',
    nargs: 1,
    number: true,
    desc: 'number to multiply'
  });
}).usage('$0 --base [num] --limit [num]')
  .demandOption(['base'])
  .help().argv;

module.exports = {
  argv
};