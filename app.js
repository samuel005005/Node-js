const express = require('express');
const hbs = require('hbs');
const path = require('path');
const public = path.join(__dirname,'public');
const app = express();
const port = 8080;


/**
 * Handlebars   
 */
app.set('view engine','hbs');
hbs.registerPartials( __dirname + '/views/partials',  (err) => {});

/**
 * Servir contenido estatico
 */
app.use(express.static(public));

const data = {
    title : "Curso de node js",
    name : "Samuel Paez Perez"
};

app.get('/', function (req, res) {
  res.render('home',data);
});

app.get('/generic', function (req, res) {
    res.render('generic',data);
});

app.get('/elements', function (req, res) {
    res.render('elements',data);
});

app.get('*', function (req, res) {
    res.sendFile(`${public}/404.html`,404);
});
 
app.listen(port,() => {
    console.log(`App listening at port ${port}`);
});