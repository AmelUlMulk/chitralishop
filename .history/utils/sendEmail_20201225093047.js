import nodemailer from 'nodemailer';

const sendEmail=async(options)=>{

    
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
           user:`${process.env.EMAIL}`,
           pass:`${process.env.PASSWORD}`
        }
    });
    console.log(process.env.EMAIL);
    console.log(process.env.PASSWORD);
  
     let message={
         from :` Email from : ${process.env.FROM}`,
         to:options.email,
         subject:options.subject,
         text:`Your Order has Successfully been placed on chitrali shop`
     };

     const info=await transporter.sendMail(message,(err,data)=>{
        if(err){ 
        console.log('error occurred')
        }
        else{
            console.log('email sended')
        } 
    });

     console.log('message send successfully')

}
export default sendEmail