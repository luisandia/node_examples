const argv = require('yargs').command('create', '--> create task', (yargs) => {
  return yargs.options({
    description: {
      alias: 'd',
      type: 'string',
      demand: 'Please specify string',
      nargs: 1,
      string: true,
      required: true,
      desc: 'string to update',
    },
  });
}).command('update', '--> update task', (yargs) => {
  return yargs.options({
    description: {
      alias: 'd',
      type: 'string',
      demand: 'Please specify string',
      nargs: 1,
      string: true,
      required: true,
      desc: 'string to update',
    },
    compleado: {
      alias: 'c',
      type: 'string',
      demand: 'Please specify string',
      nargs: 1,
      string: true,
      required: true,
      desc: 'mark as complete a task',
    }
  });
})
  .help().argv;

module.exports = {
  argv
};