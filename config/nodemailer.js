const nodemailer = require('nodemailer');
const ejs = require('ejs');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'suriyaaap13', // generated ethereal user
      pass: 'Senthil3@', // generated ethereal password
    },
});

let renderTemplate = (data, relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){console.log('error in rendering file');return;}
            mailHTML = template;
        }
    )
    return mailHTML;
}


