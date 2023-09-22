const express= require('express');
const mailer = require ('../mailer/sendmail');


const accountRouter= express.Router();
accountRouter.use(express.text());// body sra en json middleware

accountRouter.post('/signUp',(req,res)=>{
    let newAccount = JSON.parse (req.body);

    mailer.sendemail(newAccount.email).then(sendStatus=>{

        res.send(sendStatus);
    })

    

    

    



});

accountRouter.get('/',(req,res)=>{

    res.send('hola signup');
});

module.exports=accountRouter;