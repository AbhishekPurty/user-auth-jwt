'use client'
import SubmitButton from "@/components/submitButton";
import TextBox from "@/components/textBox";
import { useState } from "react";

export default function Login(){

    const [wrong, setWrong] = useState(false)
    const [password, setPassword] = useState("")

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
                                wrong&&
                                <div className="text-red-600 text-xs">Wrong Credentials</div>
                            }

                            {/* Email */}
                            <TextBox placeholder={'Email'} name={'email'} id={'email'}/>

                            {/* Password */}
                            <input name={'password'} value={password} onChange={(e)=>{setPassword(e.target.value); setWrong(false)}} placeholder="Password" className="bg-[#F3F1FF] focus:scale-[1.02] ease-out duration-150" type="password"/>
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