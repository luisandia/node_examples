process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');
const crypto = require('crypto');

if (cluster.isMaster) {
  //index.js executed again but in slave mode
  cluster.fork();
  cluster.fork();
} else {
  //childs, act like a server
  const express = require('express');
  const app = express();

  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 10000, 512, 'sha512', () => {
      res.send('Hello World!');
    });
  });
  app.get('/fast', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
}