const fs = require('fs');

makeFile = (base) => {
  return new Promise((resolve, reject) => {
    if(!Number(base)){
      reject('Is not a number');
    }
    let data = '';
    for (let i = 1; i < 11; i++) {
      data += `${base} * ${i} = ${base * i}\n`;
    }

    fs.writeFile(`tables/table-${base}.txt`, data, (err) => {
      if (err) reject(err);
      resolve(`table-${base}.txt`);
    });
  });
};

module.exports = {
  makeFile
};
