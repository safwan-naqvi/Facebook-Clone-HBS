const nodemailer = require("nodemailer");

const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link
);

exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Talentify Email Verification",
    html: `<div style=" max-width: 700px; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; font-family: Roboto; font-weight: 600; color: #bc355d; " > <img src="https://res.cloudinary.com/dlpywevzf/image/upload/v1674375891/Logo/talentify_logo_meeue5.png" alt="talentify logo" style=" width: 60px; background-color: rgba(234, 230, 231, 0.9); box-shadow: 0 10px 60px rgba(0, 0, 0, 0.4); border-radius: 5px; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); padding: 2px; " /> <span>Action Required: Activate Your Talentify Account</span> </div> <div style=" padding: 1rem 0; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5; color: #141823; font-family: Roboto; font-size: 16px; " > <span>Hello ${name}</span> <div style="padding: 20px 0"> <span style="padding: 1.5rem 0"> You recently created an account on <b>Talentify</b>, to complete your registeration, please confirm your account. </span> </div> <a href=${url} style=" width: 200px; padding: 10px 15px; background-color: rgba(201, 11, 115, 0.9); box-shadow: 0 10px 60px rgba(0, 0, 0, 0.4); border-radius: 5px; backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); text-decoration: none; color: #fff; font-weight: 500; font-size: 12px; transition: 0.3s all ease-in-out; " >Confirm Your Account</a > <br /> <div style="padding-top: 20px"> <span style="margin: 1.5rem 0; color: #6c6c6c; font-size: 12px"> Talentify allows you to stay in touch with all frients, once registered on talentify so you can share your talent in form of source code, graphic desigs and much more </span> </div> </div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
