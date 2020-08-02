const express = require('express');
const app = express();
const Datastore = require('nedb');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars')
const nodemailer = require('nodemailer');

app.listen((process.env.PORT || 5000), function(){
  console.log('listening on *:5000');
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

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

app.post('/send', (request, response)=> {
  const output = `
    <p>Nuevo Mensaje desde nicolascagiao.com</p>
     <ul>  
      <li>Nombre: ${request.body.nombre}</li>
      <li>Email: ${request.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${request.body.mensaje}</p>
  `;
   
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "nico.cagiao@gmail.com", 
        pass:"rfqmglxdogykcntf",
      },
    });
  let mailOptions = {
    from: 'nicolascagiao.com',
    to: "nico.cagiao@gmail.com",
    subject: "Nuevo mensaje desde el sitio",
    html: output,
  };

  transporter.sendMail(mailOptions,(error, info) =>{
    if(error){
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    response.render({msg: 'Email enviado!'});
  });    
 });



