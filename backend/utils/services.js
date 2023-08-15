const nodemailer = require('nodemailer');

const trans =  nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:process.env.SMTP_EMAIL,
        pass:process.env.SMTP_PASSWORD
    }
});

exports.sendResetEmail = async(url,email)=>{

    await trans.sendMail({
        from:"Email",
        to:email,
        subject:"Forget Password",
        text:`Click This Link To Verify Your Account : ${url}`,
        html:`<h3>
        Click This Link To Verify Your Account : ${url}
        </h3>`
    }).then((s) => {
        console.log(s);
    })
}

exports.sendVerificationEmail = async(email,token)=>{
    const url = `${process.env.FRONTEND_URL}/verify?token=${token}`;
    console.log(url);

    await trans.sendMail({
        from:"Email",
        to:email,
        subject:"Verify Your Account",
        text:`Click This Link To Verify Your Account : ${url}`,
        html:`<h3>
        Click This Link To Verify Your Account : ${url}
        </h3>`
    })
}
