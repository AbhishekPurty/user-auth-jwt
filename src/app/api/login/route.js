import bcrypt from "bcrypt";
import { MongoClient } from 'mongodb';
// import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
// import { connectToDatabase } from "./db/mongodb";

const SECRET = process.env.SECRET_KEY;
//  // Add this in .env.local
const client = new MongoClient(process.env.MONGODB_URI);
const MONGO_DB = process.env.MONGO_DB

export async function POST(req) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = await req.json();

  if (!email || !password) {
    // return res.status(400).json({ message: "Email and password are required." });
    return new Response('Email and password are required.', {status: 400});
  }

  try {
    await client.connect();
    const db = client.db(MONGO_DB);
    const usersCollection = db.collection('users');

    // Find the user by email
    const user = await usersCollection.findOne({ email });
    if (!user) {
    //   return res.status(404).json({ message: "User not found." });
    return new Response('User not found', {status: 404})
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
    //   return res.status(401).json({ message: "Invalid credentials." });
    return new Response('Invalid credentials.', {status: 401})
    }
    if(!user.isVerified){
      return new Response('User not verified', {status: 403})
    }

    // Generate a JWT token
    const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: "1h" });

    // return res.status(200).json({ token });

    const cookieValue = token;
    console.log(cookieValue)

    return new Response("Login Successful",{status: 200, headers:{"Set-Cookie": `userToken=${cookieValue}; HttpOnly; Path=/; Secure`,}});
    // return NextResponse.json({token}, {status: 200});
  } catch (error) {
    // return res.status(500).json({ message: "Error logging in.", error: error.message });
    return new Response('Error logging in.', {status:500});
  }
}
