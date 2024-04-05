"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {signIn} from "next-auth/react";
 

const LoginForm = () => {
    const [info, setInfo] = useState({password:"",email:""})
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const router = useRouter();

    async function handleGoogleSignIn() {
      await signIn('google', { callbackUrl: 'http://localhost:3000/' });
    }

    function handleInput(e){ 
        setInfo((prev) => ({...prev, [e.target.name] : e.target.value}))
    }
    async function handleSubmit(e){
        e.preventDefault();
        if(!info.password || !info.email){
            setError("Please fill in all fields");
        }
        try{
            setPending(true);
            const res = await signIn("credentials",{
                email: info.email,
                password: info.password,
                redirect:false
              })
           
            if(res.error){
                setError("Invalid credentials");
                setPending(false);
                return;
            }

            router.push("/");
        }
        catch(err){
            setPending(false);
            console.log(err.message);
            setError(err.message);
        }

    }
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h5 className="text-xl font-medium text-gray-900 dark:text-white">Student Login</h5>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input type="email" name="email" id="email" onChange={(e) => handleInput(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input type="password" name="password" onChange={(e) => handleInput(e)} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
      </div>
      <div className="flex items-start">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
        </div>
        <a href="#" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
      </div>
      <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={pending?true: false}>{pending ? "Wait..." : "Login" }</button>
      <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
        Not registered? <Link href="/register" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
      </div>

    </form>
    <button onClick={handleGoogleSignIn}>Sign in with Google</button>
  </div>
  )
}

export default LoginForm