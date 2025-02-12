import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from "bcryptjs"



export const sendEmail = async(email: string,emailType: string,userId: string) => {
    try{
        const hashToken = await bcryptjs.hash(userId.toString(),10)

        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId, {verifyToken:hashToken,verifyTokenExpire:Date.now() + 360000 },{new:true,runValidators:true})
        }else if (emailType === 'RESET'){
            await User.findByIdAndUpdate(userId, {forgotPasswordToken:hashToken,forgotPasswordTokenExpire:Date.now() + 360000 },{new:true,runValidators:true})
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const  transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "6736962626b90c",
            pass: "44c00349211011"
            }
        })

        const mailOptions = {
            from:"walon@gmail.com",
            to:email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html:`<p>Click <a href="${process.env.domain}/verifyemail?token=${hashToken}">here</a>to ${emailType === 'VERIFY' ? "verify email":"Reset your password"}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse

    }catch(error){
        console.log(error)
    }
}