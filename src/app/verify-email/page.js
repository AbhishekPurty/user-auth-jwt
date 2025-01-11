'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VerifyEmail() {
  const [message, setMessage] = useState('Loading...');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();
  console.log("Token in frontend", token)

  useEffect(() => {
    if (token) {
      (async () => {
        try {
        const res = await fetch('/api/email-verification', {
            method: 'GET', // Explicitly specifying GET method
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Add the JWT token here
            },
          });
          console.log("This is the response", res)
          if (res.ok) {
            setMessage('Email verified successfully!');
            setTimeout(() => {
                router.push('/login'); // Redirect to the login page
              }, 3000);
          } else {
            // console.error(data);
            setMessage('Invalid or expired verification link.');
          }
        } catch (error) {
            console.error('Error:', error);
          setMessage('An error occurred while verifying your email.');
        }
      })();
    }
  },[token, router]);

  return(
    <Suspense fallback={<div>{message}</div>}>
      <div>{message}</div>
    </Suspense>
  ) 
  
}
