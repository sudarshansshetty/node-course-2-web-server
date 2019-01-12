const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var  app = express();
var port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now},${req.method} ${req.url}`
  console.log(log);

  fs.appendFileSync('server.log',log+'\n',(err)=>{
    if(error){
      console.log('Unable to connect to server.log');
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs')
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getcurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})

app.get('/',(req,res) =>{
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcome :'Welcome to my Website'
  })
});

app.get('/about',(req,res) =>{
  res.render('about.hbs',{
    pageTitle:'About Page'
  });
});

app.get('/error',(req,res)=>{
  res.send({
    errorMessage :'Unable to fulfill request'
  });
})
app.listen(port,()=>{
  console.log(`Server is up on Port ${port}`);
});
