var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');

 
var app = express();
 
 
app.use(express.static(path.join(__dirname, 'public')));
 

function myFunction() {  
    var aleatorio=Math.floor(Math.random()*6)+1  
    return aleatorio
  }  
 
 
/* GET home page. */
app.get('/dado', function(req, res, next) {
  res.render('/dado', { title: 'dado' });
});

app.post('/dado', function(req, res, next) {
    console.log(myFunction())
})
 
app.post('/dado', function(req, res, next) {
  var Valor = req.body.Valor;
  var Nombre = req.body.Nombre;
 
  var sql = `INSERT INTO dado (Valor,Nombre) VALUES ("${Valor}", "${Nombre}", NOW())`;
  db.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    req.flash('success', 'Data added successfully!');
    res.redirect('/dado');
  });
});
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 
// port must be set to 3000 because incoming http requests are routed from port 80 to port 8080
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
 
module.exports = app;