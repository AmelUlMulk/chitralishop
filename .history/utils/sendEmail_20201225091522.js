import nodemailer from 'nodemailer';

const sendEmail=async(options)=>{

    
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
           user:`${process.env.EMAIL}`,
           pass:`${process.env.PASSWORD}`
        }
    });
    console.log('message send successfully');
  
     let message={
         from :` Email from : ${process.env.FROM}`,
         to:options.email,
         subject:options.subject,
         text:`Your Order has Successfully been placed on chitrali shop`
     };

     const info=await transporter.sendEmail(message);

     console.log('message send successfully')

}
export default sendEmail