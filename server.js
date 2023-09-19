
const express = require('express');


const app = express();
PORT=process.env || 8080;



app.get('/',(req,res)=>{
    res.send('hola mundo')


});

console.log('hola q hacesssss');

app.listen(PORT, ()=>{
    console.log('servidor corriendo');
})