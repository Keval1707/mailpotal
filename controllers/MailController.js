const nodemailer = require('nodemailer');

const sendEmail = async (data) => {
    try {
        const { Email, Subject = 'Error', Message = 'Something worked. Please try again.' } = data;

        if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
            throw new Error('Email credentials not provided in environment variables');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: 'kkeevvaall723@gmail.com',
            to: Email,
            subject: Subject,
            text: Message
        };

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    reject(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve({ valid: true, message: "Mail sent" });
                }
            });
        });
    } catch (error) {
        console.error('Error in sendEmail:', error.message);
        throw error;
    }
};

module.exports = sendEmail;
