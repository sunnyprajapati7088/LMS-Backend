// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const sendEmail = async (to, name) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.SMTP_USER,
//         pass:"pmul tqde zwja tejc", // Use App Password here
//       },
//     });

//     const mailOptions = {
//       from: process.env.SMTP_USER,
//       to,
//       subject: "Welcome to LMS",
//       text: `Hello ${name}, your account has been successfully created.`,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully");
//   } catch (error) {
//     console.error("Email Error:", error);
//   }
// };

// module.exports = sendEmail;



const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: "xryn exlp zckc icne", // Use App Password here
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject: "Institute of Network Solution",
      html: `
       <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 50px;">
    <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); max-width: 600px; margin: auto;">
        <img src="https://res.cloudinary.com/drz6fzlpu/image/upload/v1743102748/logo_wf6fxs.jpg" alt="Institute Logo" style="width: 150px; margin-bottom: 20px;">
        <h1 style="color: #ff7f00;">Welcome to Institute of Network Solution</h1>
        <p style="color: #007bff; font-size: 18px;">Dear Student,</p>
        <p style="color: #007bff; font-size: 18px;">Your account has been successfully created. We are thrilled to have you on board and look forward to helping you achieve your career goals.</p>
        <p style="color: #007bff; font-size: 18px;">Explore our courses and IT solutions designed to boost your skills and knowledge.</p>
        <p style="color: #007bff; font-size: 18px;">Thank you for choosing us!</p>
        
        <div style="margin-top: 20px; color: #555; font-size: 14px;">
            <p><strong>Institute of Network Solution</strong></p>
            <p>Plot No.- 65, Kalyan Colony, Khatipura Road, Jaswant Nagar, Jaipur - 302012</p>
            <p>Email: <a href="mailto:info@networksolution.com" style="color: #007bff; text-decoration: none;">info@networksolution.com</a></p>
            <p>Phone: <a href="tel:+9107041713818" style="color: #007bff; text-decoration: none;">+91 07041713818</a></p>
            <div style="margin-top: 20px;">
                <a href="https://www.facebook.com/IIHTJAIPUR?mibextid=ZbWKwL" style="color: #007bff; text-decoration: none; margin-right: 10px;">Facebook</a> |
                <a href="https://twitter.com/yourhandle" style="color: #007bff; text-decoration: none; margin-right: 10px;">Twitter</a> |
                <a href="https://www.linkedin.com/company/institute-of-network-solutions/" style="color: #007bff; text-decoration: none; margin-right: 10px;">LinkedIn</a> |
                <a href="https://www.youtube.com/@insjaipur" style="color: #007bff; text-decoration: none;">YouTube</a>
            </div>
            <p style="margin-top: 20px;">&copy; 2024 Institute of Network Solution. All rights reserved.</p>
        </div>
    </div>
</body>`
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email Error:", error);
  }
};

module.exports = sendEmail;
