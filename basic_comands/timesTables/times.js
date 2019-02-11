const fs = require('fs');
const colors = require('colors');

makeFile = (base, limit = 10) => {
  return new Promise((resolve, reject) => {
    if (!Number(base)) {
      reject('Is not a number');
    }
    let data = '';
    for (let i = 1; i <= limit; i++) {
      data += `${base} * ${i} = ${base * i}\n`;
    }

    fs.writeFile(`tables/table-${base}.txt`, data, (err) => {
      if (err) reject(err);
      resolve(`table-${base}.txt`);
    });
  });
};

listTable = (base, limit = 10) => {

  console.log(`========  TABLE of ${base} =========`.green);
  console.log(`====================================`.green);
  if (!Number(base)) {
    throw ('Is not a number');
  }
  for (let i = 1; i <= limit; i++) {
    console.log(colors.blue(base) +` * ${colors.red(i) } = ${colors.blue(base * i) }`);
  }
};

module.exports = {
  makeFile,
  listTable
};
