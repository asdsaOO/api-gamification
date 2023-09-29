const axios = require('axios').default;
const useObj=require('../models/UsersData.js');

/*const a= new useObj("asd@","asd","pass","status","code");
console.log(a.status);*/
async function createAccount( userObject){
    //console.log(`url con variables de entorno: ${process.env.DB_URL}/Users/${useObj.email}.json`);
    var id=  (userObject.email).substring(0,userObject.email.length-4);
    var url=  `${process.env.DB_URL}/Users/${id}.json`;
    //console.log(`${url} el email es: ${(userObject.email).substring(0,userObject.email.length-4)}, id= ${id}`);
    await axios({
        method:'put',
        url: url,
        data:{

            email:userObject.email,
            userName:userObject.userName,
            password:userObject.password,
            status:userObject.status,
            privCode:userObject.privCode
        }
    }).then(()=>{

        return true;

    }).catch((error)=>{

        console.log(`problema en creacion de ususario: ${error}`);
        return false;

    });
}
  function signInUser(userObject){
    console.log(userObject);
    const id = (userObject.email).substring(0,userObject.email.length-4);
    console.log(`${process.env.DB_URL}/Users/${id}.json`);
    return new Promise((resolve,reject)=>{
        axios({
            method:'get',
            url:`${process.env.DB_URL}/Users/${id}.json`
        }).then((response)=>{
            //console.log(response.data);
            resolve (response.data);
        }).catch(error=>{

            reject (error);
        })

    })

}

function updateUser (userObject){
    const id = (userObject.email).substring(0,userObject.email.length-4);
    userObject.status=true;
    console.log(userObject);
    console.log(userObject);
    return new Promise ((resolve, reject)=>{

        axios ({
            method:'put',
            url:`${process.env.DB_URL}/Users/${id}.json`,
            data:{
                
                email:userObject.email,
                userName:userObject.userName,
                password:userObject.password,
                status:userObject.status,
                privCode:userObject.privCode
            }
        }).then(()=>{
            resolve (true);
        }).catch((e)=>{
            reject(false);
        })
    })


}

module.exports={

    createAccount:createAccount,
    signInUser:signInUser,
    updateUser:updateUser
}