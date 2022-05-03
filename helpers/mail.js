const emailjs = require("@emailjs/browser");


const mail = (values) => {
    let userName = values.name;
    let dest = values.email;   

    let templateParams ={
      from_name: "Administrador",
      user_name: userName,
      destinatario: dest,
      message: "Gracias por utilizar nuestros servicios. Esperamos que tengas una excelente experiencia con Buon Appetito.",
    };
     // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
    emailjs.send('service_kd00g6g', 'template_zghtsvk', templateParams, 'zu36obM0kMdrA0dIG')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  module.exports= mail;