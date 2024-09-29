const express = require('express')
const app = express()
const cors = require('cors');

const  connectTOmongo = require('./config/db.js')
// app.use('/', my)

connectTOmongo();

require('dotenv').config();


app.use(express.json());
let corsOptions = { 
    origin : ['http://localhost:3000'], 
 } 


// app.use(cors());
 app.use(cors(corsOptions)) 

app.use('/api',require('./router/createUser.js'))
app.use('/api',require('./router/DisplayData.js'))



app.get('/',(rer,res)=>{
    res.send("HIIIIII")
})
port = process.env.PORT;
app.listen(port,(err)=>{
    if(!err){
        console.log("Server is Successfully Runing ",port);

    }

    else{
        console.log(err);
    }
});
