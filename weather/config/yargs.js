const description = {
  alias: 'd',
  type: 'string',
  demand: 'Please specify string',
  nargs: 1,
  string: true,
  required: true,
  desc: 'string to update',
}

const argv = require('yargs').command('create', '--> create task', (yargs) => {
  return yargs.options({
    description
  });
})
  .help().argv;

module.exports = {
  argv
};