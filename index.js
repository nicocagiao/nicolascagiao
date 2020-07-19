const express = require('express');
const app = express();
const Datastore = require('nedb');
const nodemailer = require('nodemailer');

app.listen(process.env.PORT || 5000);

app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));

const lDatabase = new Datastore('LDatabase.db');
lDatabase.loadDatabase();

const pDatabase = new Datastore('pDatabase.db');
pDatabase.loadDatabase();


app.get('/abecedarium', abcLearn);

function abcLearn(request, response){
    
    response.send("i love you");
}

app.get('/api1',(request, response) =>{
    pDatabase.find({},(err, data) =>{
        if(err){
            response.end();
            return;
        }
        response.json(data);
    });
});

app.get('/api2',(request, response) =>{
    lDatabase.find({},(err, data) =>{
        if(err){
            response.end();
            return;
        }
        response.json(data);
    });
});

app.post('/api2', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    lDatabase.insert(data);
    response.json({
        status : 'Success',
        timestamp : timestamp,
        latitude : data.lat,
        longitude: data.lon,
    });
});

app.post('/api1', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    pDatabase.insert(data);
    response.json({
        status : 'Success',
        timestamp : timestamp,
        name : data.name,
        puesto: data.puesto,
        medio: data.medio,
        avatar: data.avatarUrl
    });
});