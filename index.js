const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(express.static('node_modules/phaser/build'));

app.listen(PORT, () => console.log(`Server started: http://localhost:${PORT}/`));
