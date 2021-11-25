const express = require('express');
const app = express();
const path = require('path')
const port = 8080;
const public = path.join(__dirname,'public');
/**
 * Servir contenido estatico
 */
app.use(express.static(public));

app.get('/', function (req, res) {
  res.send('Hello World')
});


app.get('*', function (req, res) {
    res.sendFile(`${public}/404.html`,404);
});
 
app.listen(port,() => {
    console.log(`App listening at port ${port}`);
});