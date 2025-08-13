const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path: 'variables.enc'});


//Cors permite conectar cliente a otro servidos
const cors = require('cors');

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//habilita cors
app.use(cors());

//definir dominio para recibir peticiones
const whilelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback)=>{
        //revisar si la peticion viene de server que esta en whitelist
        const existe = whilelist.some(dominio => dominio === origin);
        if(existe){
            callback(null, true);
        }else{
            callback(new Error('No permitido por Cors'));
        }
    }
}

app.use('/',routes());

app.use(express.static('uploads'));

const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, ()=>{
    console.log('servidor funcioando')
});