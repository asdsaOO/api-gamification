const express= require('express');
const mailer = require ('../mailer/sendmail');
const userData=require('../models/UsersData');
const  userAccount=require('../database/userAccount')


const accountRouter= express.Router();
accountRouter.use(express.text());// body sra en json middleware

accountRouter.post('/signUp', async(req,res)=>{
    let newAccount = await JSON.parse (req.body);
    var num =   await Math.floor(Math.random()*(1000-9998+1)+9998);
    var sendAccount= await {
        email:newAccount.email,
        userName:newAccount.userName,
        password:newAccount.password,
        status:false,
        privCode:num
    } 
    userAccount.createAccount(sendAccount).then(solve=>{
        //se creo en firebase
        mailer.sendemail(newAccount.email,num).then(()=>{

            //res.send("bien");

            res.send(JSON.parse('{"error":"0","description":"ok"}'));
        }).catch(error=>{
            res.send(JSON.parse(`{"error":"1","description":${error}}`));
            //res.send("error");

            //res.send("weeoe");

            //console.log(error);


        })

        //res.send("resuelto");
    });



    /*mailer.sendemail(newAccount.email,num).then(sendStatus=>{

        res.send(sendStatus);
    })*/
});

accountRouter.get('/',(req,res)=>{

    res.send('hola signup');
});

module.exports=accountRouter;