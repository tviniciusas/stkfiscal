const transporter = require('../config/emailSend');

async function sendMail(nome, email) {

  const html = `<!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <style>
      .container {
        background-color: #f6f6f6;
        padding: 20px;
        align-itens: center;
        display: flex;
      }
      .content {
        width: 440px !important;
        margin-left: 25%;
      }
      .custom {
        background-color: #ffffff;
        padding: 10px;
        margin: 30px;
        text-align: center;
        width: 350px;
      }
      .custom h1 {
        margin: 20px 0px 30px 0px;
      }
      .custom a {
        margin: 10px 0px 50px 0px;
        text-decoration: none;
        color: #fff;
        font-size: 14px;
      }
      .footer {
        text-align: left;
        font-size: 12px;
        color: #999999;
        margin: 0px 0px 30px 30px;
      }
      .btn-content {
        padding-left: 30%;
        margin-top: 40px;
        margin-bottom: 150px;
      }
      .btn-link {
        background-color: #007bff;
        border-color: #007bff;
        width: 146px;
        height: 26px;
        border-radius: 20px;
        text-align: center;
        padding-top: 3px;
      }
      .footer p {
        margin-bottom: -1px;
      }
    </style>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title></title>
  </head>
  <body>
      <div class="container">
      <div class="content">
        <div class="custom">
          <div class="row">
            <div class="col">
              <h1>Olá, ${nome}<h1>
              <h5>Bem vindo!</h5>
              <p>Complete seu cadastro clicando no botão abaixo para utilizar nossa plataforma de gestão de documentos.</p>
              
              <div class="btn-content">
                <div class="btn-link">
                  <a class="btn btn-primary" href="http://i-store.duckdns.org/login" role="button">Completar cadastro</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="row">
            <div class="col">
              <p>
                <span><strong>Não compartilhe este e-mail</strong></span><br>
                <span>Para sua segurança, não encaminhe este e-mail para ninguém.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>`;

  await transporter.sendMail({
    from: "<istok@stokfiscal.com.br>", 
    to: email, 
    subject: "Finalize seu cadastro i-store.duckdns.org ", 
    text: "Obrigado por se cadastrar em nossa plataforma", 
    html: html, 
  }).then(info => {
    //   req.flash('success_msg', 'Cliente cadastrado.');
    //   res.redirect('admin/usuarios');
    console.log('E-mail enviado com sucesso!');
  }).catch(e => {
      console.log('Erro ao enviar e-mail: '+ e)
  });
}

module.exports = {
    sendMail
}