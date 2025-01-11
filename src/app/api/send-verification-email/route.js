import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
const SECRET_KEY = process.env.SECRET_KEY;
const MONGO_DB = process.env.MONGO_DB

export async function POST(req) {
  console.log('Request method:', req.method);
  
  if (req.method !== 'POST') return new Response('Method not allowed', {status: 405});

  const { email} = await req.json();
  console.log("the email is", email)
  // console.log("the password is", password)
  if (!email) return new Response('Email is required', { status: 400 });

  try {
    await client.connect();
    const db = client.db(MONGO_DB);
    const usersCollection = db.collection('users');

    // Check if user exists
    const user = await usersCollection.findOne({ email });
    if(user){
        if (user.verificationToken) {
            await usersCollection.deleteOne({ email: user.email });
        }
        if(user.isVerified){
            return new Response('User already exists and verified',{status: 404})
        }
    }
    
    // Generate token
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;

    // Send email
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
    });

    // Save the token in the database (optional: clear existing tokens for this email)
    await usersCollection.insertOne({
      email,
      // password,
      verificationToken: token,
      tokenExpiresAt: new Date(Date.now() + 3600000),
    });    

    return new Response('Verification email sent', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error sending email', { status: 500 });
  } finally {
    await client.close();
  }
}
