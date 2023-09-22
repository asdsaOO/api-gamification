

const nodeMailer= require('nodemailer');
const transporter = nodeMailer.createTransport({
    //service:"gmail",
    host:"smtp.office365.com",//este host se utiliza para realizar envios de email de terceros
    port: 587,
    secure: false,
    auth: {

        user:"poogamification7@outlook.com",
        pass:/*"ntjb yjwl xhje bref"*/"proyectforgloryasd7"
    }

});
async function sendemail( email){
    console.log(email);
    var num = await Math.floor(Math.random()*(1000-9998+1)+9998);
    const info = await transporter.sendMail({
        from: "poogamification7@outlook.com",
        to: email,
        subject:"PARA ACTIVAR TU CUENTA INICIA SESION E INGRESA EL CODIGO",
        html:`<b>${num} <b>`,

    });

    

   

    return info.messageId;

     
}

exports.sendemail=sendemail;