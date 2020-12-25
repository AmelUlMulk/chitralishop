import nodemailer from 'nodemailer';

const sendEmail=async(options)=>{

    let transporter=nodemailer.transporter({
        service:'gmail',
        auth:{
           user:`${process.env.EMAIL}`,
           pass:`${process.env.PASSWORD}`
        }
    })

}