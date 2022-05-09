const nodemailer = require('nodemailer');

const mail = (values) => {
    console.log('values.email: ',values.email);
    console.log('values: ',values);
    let userName = values.nombre;
    let origen = values.email;   
    let message = values.message; 
    let asunto = values.asunto; 
    let passRandom =  values.password;

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.REACT_APP_EMAIL,
    pass: process.env.REACT_APP_EMAIL_PASS,
  },
});

let subject = {
  cons : "Consulta a Buon Appetito",
  sus :"Buon Appetito: Confirma tu suscripcion",
  recover : "Solicitud de recuperación de contraseña",
}

let mensj;
let titulo;
let asuntoMail;
let url='http://localhost:3000/';
switch (asunto) {  
    case "cons": 
        asuntoMail=`${subject.cons}`;  
        titulo=`Consulta`;
        origen= values.email;
        destino="buonappetitoa@gmail.com";
        mensj=`<p id="msj" style="margin: 0 0 20px 0;font-family: Verdana, sans-serif;">Hola ${userName}, 
        gracias por contactar a Buon Appetito!
        Te responderemos a la brevedad.
        <br/> <br>
        Presiona el botón para regresar a Buon Appetito. <br /><br />
        </p>`;
    break;
    case "sus":
        asuntoMail=`${subject.sus}`;
        titulo=`Suscripción`;
        message='';
        origen="buonappetitoa@gmail.com";
        destino= values.email;
        mensj=`<p id="msj" style="margin: 0 0 20px 0;font-family: Verdana, sans-serif;">Hola ${userName}, 
                gracias por Suscribirte a Buon Appetito!
                <br/> <br>
                Presiona el botón para regresar a Buon Appetito. <br /><br />
                </p>`;        
    break;
    case "recover":
        asuntoMail=`${subject.recover}`;   
        message='';
        origen= values.email;
        destino= values.email;
        titulo=`Reestablecer contraseña`;     
        mensj=`<p id="msj" style="margin: 0 0 20px 0;font-family: Verdana, sans-serif;">Hola ${userName}, 
        gracias por contactar a Buon Appetito!
        <br/> <br>
        Te asignamos la contraseña random ${passRandom} para que puedas recuperar el acceso a Buon Appetito.
        Puedes solicitarle luego al Administrador el cambio de la misma.
        Presiona el botón para confirmar y regresar a Buon Appetito. <br /><br />
        </p>`; 
    break;
}

// Plantilla general
let cuerpo_mail = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>${titulo}</title>
    <!-- [if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif] -->
    <style>
        table, td, div, h1, p {font-family: Verdana, sans-serif;}       
        
    </style>
</head>
<body style="margin:0;padding: 0;">
    <table class="container-table" role="presentation" style="width: 100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff" >
        <tr>
            <td align="center" style="padding:o">
                <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #ffffff;border-spacing:0;text-align:left;">
                    <tr>
                        <td align="center" style="padding:30px 0px;"><img width="150" height="150" src="https://github.com/JuanErnestoVillegas/Restaurante-Buon-Appetito-Frontend-Final/blob/develop/src/assets/Logo/Logo%20Buon%20Appetito.jpg?raw=true" alt="logo Buon Appetito" ></td>
                    </tr>                    
                     <td style="padding:40px 35px;">
                            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                            <tr>
                                <td style="padding:0;" align="center" >
                                ${mensj}   
                                </td>
                                <tr><td style="background-color:#96cae7; padding: 1px; "></td></tr>
                            </tr>
                            <tr>
                                <td align="center" style="padding:60px 0 0 0;">
                                    <a href="${url}" type="button" style="font-family: Verdana, sans-serif;background-color:#96cae7;text-decoration:none; color:#ffffff;padding: 10px; border-radius:20px" >Volver a Buon Appetito</a>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 40px 0 0 0;">
                                    <p style="font-family: Verdana, sans-serif;font-size: small; text-align:center;margin: 0 0 20px 0; "> Si el botón no funciona, copia esta URL en tu navegador: http://localhost:3000/ </p>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 0;">
                                    <p style="font-family: Verdana, sans-serif;font-size: large; font-weight:500; margin: 0 0 20px 0;"> Bienvenido! </p>
                                </td>
                            </tr>

                           </table>
                       </td>
                    </tr>
                    <tr>
                        <td style="background:#96cae7;padding:15px 30px; border-end-start-radius:15px; border-end-end-radius:15px;">
                            <table role="presentation" style="width:100%;border-collapse:collapse;border: 0;border-spacing:0;">
                                <tr>
                                    <td style="padding:0;width:50%;" align="left">
                                      
                                    </td>
                                    
                                    <td style="padding:0;width:50%;" align="left">
                                        <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                                             
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        

    </table>
    
</body>
</html>` ;




let mailOptions = {
  from: origen,  
  to: destino,
  subject: asuntoMail,
  html: `${cuerpo_mail}, Su comentario: ${message}`,
};

transporter.sendMail(mailOptions, function (err, info) {
  if (err) {
    res.json(err);
  } else {
    res.json(info);
    console.log('Email enviado correctamente.');
  }
});

};

module.exports= mail;

