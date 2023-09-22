

const nodeMailer= require('nodemailer');
const transporter = nodeMailer.createTransport({
    //service:"gmail",
    host:"smtp.gmail.com",//este host se utiliza para realizar envios de email de terceros
    port: 465,
    secure: true,
    auth: {

        user:/*"poogamification7@outlook.com"*/"poogamification7@gmail.com", 
        pass:"ntjbyjwlxhjebref"/*"proyectforgloryasd7"*/
    }

});
async function sendemail( email){
    console.log(email);
    var num = await Math.floor(Math.random()*(1000-9998+1)+9998);
    const info = await transporter.sendMail({
        from: "poogamification7@gmail.com",
        to: email,
        subject:"PARA ACTIVAR TU CUENTA INICIA SESION E INGRESA EL CODIGO",
        html:`<b>${num} <b>`,

    });

    

   

    return info.messageId;

     
}

exports.sendemail=sendemail;