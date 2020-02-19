import env from '../env';
import nodemailer from 'nodemailer';
import sendGridTransport from 'nodemailer-sendgrid-transport';
import { adj, noun } from '../words';

export const secretGenerator = () => {
  const randomNumber = Math.floor(
    Math.random() * adj.length
  );
  return `${adj[randomNumber]} ${noun[randomNumber]}`;
};

export const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(
    sendGridTransport(options)
  );
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: 'admin@prismagram.com',
    to: address,
    subject: '🔒Login Secret for PrismaGram',
    html: `Hello! Your login secret is <strong>${secret}</strong>. <br>Use it to authenticate your account.</br>`
  };
  return sendMail(email);
};
