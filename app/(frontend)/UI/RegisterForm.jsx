"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const RegisterForm = () => {
    const [info, setInfo] = useState({name:"", password:"",email:"", role:"user"})
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const router = useRouter();

    function handleInput(e){
        setInfo((prev) => ({...prev, [e.target.name] : e.target.value}))
    }

    async function handleSubmit(e){
        e.preventDefault();
        if(!info.name || !info.password || !info.email){
            setError("Please fill in all fields");
        }
        try{
            setPending(true);
            const res = await fetch("api/register", {
                method:"POST", 
                headers: {'Content-Type':"application/json"}, 
                body:JSON.stringify(info)
            });
            if(res.ok){
                setPending(false);
                const form = e.target; 
                form.reset();
                router.push("/login");
            }
            else{
                const errorData = await res.json();
                setError(errorData.message);
                setPending(false);
            }
        }
        catch(err){
            setPending(false);
            setError(err.message);
        }

    }
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Register for Admission</h5>
        <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name</label>
            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e) => handleInput(e)} required />
        </div>
        <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" onChange={(e) => handleInput(e)} required />
        </div>
        <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e) => handleInput(e)} required />
        </div>
        
        {error && <span className="text-red-500">{error}</span>}
        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={pending?true: false}>{pending ? "Wait..." : "Register" }</button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            already registered? <Link href="/login" className="text-blue-700 hover:underline dark:text-blue-500">Login Now</Link>
        </div>
    </form>
</div>

  )
}

export default RegisterForm