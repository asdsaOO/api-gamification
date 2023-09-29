const express= require('express');
const mailer = require ('../mailer/sendmail');
const userData=require('../models/UsersData');
const  userAccount=require('../database/userAccount');
const { getResponseLoginData } = require('../models/RespModel');
const getResponseLogin=require('../models/RespModel').getResponseLogin;


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
    mailer.sendemail(sendAccount.email,sendAccount.privCode).then(()=>{
        userAccount.createAccount(sendAccount).then(()=>{
            res.send(JSON.parse(`{"error":${res.statusCode},"description":"ok"}`))

        })
    }).catch(e=>{
        console.log("error en la ruta: "+e.message);
        res.send(JSON.parse( `{"error":"${e.message}","description":"ok"}`));


    })

});
accountRouter.post('/signIn', (req,res)=>{
    //res.send("hola");

    let user = JSON.parse(req.body);
    //res.send(user);
    userAccount.signInUser(user).then(userGet=>{
        if(userGet==null ){
            res.send(getResponseLogin(res.statusCode,"denied"));
            
        }else if(userGet.password===user.password ){
            if(userGet.status==true){
                res.send(getResponseLoginData(res.statusCode,"succesfull",userGet.userName));
            }else{

                res.send(getResponseLoginData(res.statusCode,"non-active","none"));
            }
        } else{
            //console.log(`${user}`);
            res.send(getResponseLoginData(res.statusCode,"denied","none"));
        }  
    }).catch(error=>{
        res.status=400;
        console.log(error);
    });
});
accountRouter.post('/activeAccount',(req,res)=>{

    let userReq=JSON.parse(req.body);

    userAccount.signInUser(userReq).then(userDB=>{
        if(userReq.code===userDB.privCode){
            userAccount.updateUser(userDB).then((result)=>{
                if(result){
                    res.send(getResponseLoginData(res.statusCode,"succesfull",userDB.userName));

                }else{
                    res.send(getResponseLogin(res.statusCode,"denied update user problem","none"));

                }
               

            })
            
        }else{
            res.send(getResponseLogin(res.statusCode,"denied","none"));
        }
    }).catch(error=>{

        res.statusCode=400;
        console.log(error);
        res.send(getResponseLogin(res.statusCode,"denied"));
        
    })
    //console.log(req.body);
    //res.send(req.body);


});

accountRouter.get('/',(req,res)=>{


    res.send('hola signup');
});

 function createNewUser(newAccount){
    return new Promise ((resolve)=>{
        mailer.sendemail(newAccount,newAccount.privCode).then(()=>{
            userAccount.createAccount(newAccount).then(()=>{
                resolve (JSON.parse(`{"error":${res.statusCode},"description":"ok"}`))

            });
        })
    })
   
    

}



module.exports=accountRouter;