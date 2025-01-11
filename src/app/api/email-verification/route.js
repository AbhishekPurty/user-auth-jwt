import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
const SECRET_KEY = process.env.SECRET_KEY;
const MONGO_DB = process.env.MONGO_DB

export async function GET(req) {

  console.log("Request Headers:", req.headers.get('authorization')?.split(' ')[1]);
  const token = req.headers.get('authorization')?.split(' ')[1];
  console.log("token in query", token)

  if(!token){
    return new Response('Token is required', {status: 400});
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decoded JWT",decoded)
    const { email } = decoded;
    console.log("Decoded email",email)

    await client.connect();
    const  db = client.db(MONGO_DB);
    const usersCollection = db.collection('users');

    // Verify token and update user
    const user = await usersCollection.findOne({ email });
    console.log(user)
    console.log("Database user token", user.verificationToken)
    if (!user) {
      return new Response('User not found',{status: 404});
    }
    // Check if token matches the stored token
    if (user.verificationToken !== token) {
      console.log("user verrification token", user.verificationToken)
      console.log("token", token)
      return new Response('Invalid or expired token', {status: 400});
    }
    await usersCollection.updateOne(
      { email },
      {
        $set: { isVerified: true },
        $unset: { verificationToken: 1, tokenExpiresAt: 1 }, // Remove token after verification
      }
    );
      return new Response('Email verified successfully', {status: 200});

  } catch (error) {
    console.error("The error is", error);
    return new Response('Invalid or expired token', {status: 400});
  } finally {
    await client.close();
  }
}
