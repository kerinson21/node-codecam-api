const express = require('express');
const cors = require('cors');
const routerApi = require('./endpoints');
const passport = require('passport');

const {config} = require('./config/config');

const {logErrors, errorHandler,boomErrorHandler} = require('./middlewares/error.handler');

const app = express();
const port = config.port;

app.use(express.json());

const listaBlanca = [
  'http://localhost:4000',
  'http://localhost:8080'
];

const options = {
  origin: (origin, callback)=>{
    if(listaBlanca.includes(origin) !== -1 || !origin){
      callback(null,true);
    }else{
      callback(new Error('No tienes permiso para establecer comunicación con esta API'));
    }
  }
};
app.use(cors(options));
app.use(passport.initialize());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Escuchando en puerto: ' + port);
});
