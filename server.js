const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join(process.cwd(), 'public')));

app.listen(3000, () => {
    console.log('Server listening on port 3000!');
  });
