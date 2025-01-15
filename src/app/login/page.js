'use client'
import SubmitButton from "@/components/submitButton";
import TextBox from "@/components/textBox";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function Login(){

    const [email, setEmail ] = useState("")
    // const [wrong, setWrong] = useState(false)
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState('');
    const router = useRouter();

    const HandleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    async function login(e){
        e.preventDefault()

        if(!document.getElementById('email').value || !password){
            setMessage("Enter all details")
            return
          }

        try{
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password})
            });

            if (res.ok) {
                setMessage('Login Successful');
                setTimeout(()=>{
                    router.push('/home');
                },3000);
              } else {
                console.log(res)
                setMessage(`Error: Wrong Credentials`);
              }

        } catch (error) {
            console.error('Error:', error);
            setMessage('An unexpected error occurred.');
            setPassword("")
        }
    }

    return(
        <div>
            <div className="h-screen flex justify-center ease-out duration-300">

                {/* Form Div */}
                <div className="flex flex-col justify-center items-center gap-16 h-full w-full md:w-[50%]">

                    {/* Heading Section */}
                    <div className="flex flex-col justify-center items-center gap-2">
                        
                        {/* Header */}
                        <div className="text-white text-center font-bold text-2xl border-2 rounded-md p-4">
                            LOGIN
                        </div>

                    </div>

                    {/* Form */}
                    <form className="flex flex-col w-[90%] md:w-[60%] justify-center items-center gap-4">
                        
                        <div className="flex flex-col gap-2 w-full">

                            {
                                message&&
                                <div className="text-red-600 text-xs">{message}</div>
                            }

                            {/* Email */}
                            <TextBox func={HandleEmailChange} placeholder={'Email'} name={'email'} id={'email'}/>

                            {/* Password */}
                            <input name={'password'} value={password} onChange={(e)=>{setPassword(e.target.value);}} placeholder="Password" className="bg-[#F3F1FF] text-black focus:scale-[1.02] ease-out duration-150" type="password"/>
                        </div>

                        <div className="flex  gap-3 w-full">

                            {/* Submit */}
                            <SubmitButton func={(e)=>{login(e)}} text={'Login'}/>
                            
                            {/* Signup */}
                            <SubmitButton func={(e)=>{e.preventDefault(); window.location.assign("/signup")}} text={'Go to Signup'}/>
                        </div>

                    </form>


                </div>
            </div>
        </div>
    )
}