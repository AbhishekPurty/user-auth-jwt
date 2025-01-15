'use client'
import SubmitButton from '@/components/submitButton';
import TextBox from '@/components/textBox';
import { useState } from 'react';

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState('');

  const HandleEmailChange = (e) => {
    setMessage(""); // Clear the message on input change
    setEmail(e.target.value); // Update email state
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if(!document.getElementById('email').value || !password){
        setMessage("Enter all details")
        return
      }
  
      if(password != confirmPassword){
        setMessage("Passwords don't match")
        return
      }

      try {
        console.log("Email being sent", email);
        console.log("Password being sent", password)
        const res = await fetch('/api/send-verification-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
    
        if (res.ok) {
          setMessage('Verification email sent. Please check your inbox.');
        } else {
          const errorMsg = await res.text();
          setMessage(`Error: ${errorMsg}`);
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('An unexpected error occurred.');
      }
  };

  return (

    <div className="h-screen flex justify-center ease-out duration-300">
    
                {/* Form Div */}
                <div className="flex flex-col justify-center items-center gap-16 h-full w-full md:w-[50%]">
    
                    {/* Heading Section */}
                    <div className="flex flex-col justify-center items-center gap-2">
                        
                        {/* Header */}
                        <div className="text-white text-center font-bold text-2xl border-2 rounded-md p-4">
                            REGISTER
                        </div>
    
                        
    
                    </div>
    
                    {/* Form */}
                    <div className="flex flex-col w-[90%] md:w-[60%] justify-center items-center gap-4">
                        
                        {
                          message&&
                          <div className="text-xs text-red-600 w-full">{message}</div>
                        }

                        <div className="flex flex-col gap-2 w-full">
    
                            
    
                            {/* Email */}
                            <TextBox func={HandleEmailChange} placeholder={'Email'} name={'email'} id={'email'}/>
    
                            {/* Password */}
                            <input name={'password'} value={password} onChange={(e)=>{setPassword(e.target.value); setMessage("")}} placeholder="Password" className="bg-[#F3F1FF] text-black focus:scale-[1.02] ease-out duration-150" type="password"/>
                            
                            {/* Confirm Password */}
                            <input name={'password'} style={{outline:password.trim()!==""&&password!==confirmPassword&&"solid 1px red"}} value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value); setMessage("")}} placeholder="Confirm Password" className={`bg-[#F3F1FF] text-black focus:scale-[1.02] ease-out duration-150`} type="password"/>
                        </div>
    
                        <div className="flex  gap-3 w-full">
    
                            {/* Submit */}
                            {/* <SubmitButton func={(e)=>{login(e)}} text={'Login'}/> */}
                            
                            {/* Signup */}
                            <SubmitButton func={(e)=>{e.preventDefault(); window.location.assign('/login')}} text={'Go to Login'}/>

                            {/* Register */}
                            <SubmitButton func={(e)=>{handleSignup(e)}} text={'Register'}/>


                        </div>
                    </div>
                </div>
            </div>
  );
}
