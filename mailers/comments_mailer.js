const nodeMailer = require('nodemailer');

exports.newComment = async (comment)=>{
    console.log('inside new comment mailer');
    let info = await transporter.sendMail({
        from: 'suriyaaap13@yahoo.com', // sender address
        to: 'suriyaaap13@yahoo.com', // list of receivers
        subject: "Hello ✔", // Subject line
        text: "New Comment Published", // plain text body
        html: "<h1>Yup, your comment is published</h1>", // html body
    }, (err, info) => {
        if(err){
            console.log('Error in sending the mail', err);
            return;
        }
        console.log('Mail delivered', info);
        return;
    });
}