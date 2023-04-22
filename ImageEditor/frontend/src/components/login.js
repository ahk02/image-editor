import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const nav = useNavigate();
    useEffect(() => {
        if(localStorage.user)
            nav('/')
    }, []);
    const [user,setuser]=useState(
        {
            email:"",
            password:""
        }
    )
    const changeval=(event)=>{
        var tempname=event.target.name
        var tempvalue=event.target.value
        setuser({
            ...user,
            [tempname]:tempvalue
        })
    }
    const handlesubmit =async (event)=>{
        event.preventDefault()
        const formdata = new FormData()
        formdata.append('email',user.email)
        formdata.append('password',user.password)
        const res = await fetch('http://localhost:8080/user/signin',{
                method:'POST',
                body:formdata
            })
            const text=await res.text();
            console.log(text)
            if(text==="true")
            {   
                localStorage.setItem('user',user.email)
                alert("successfuly Logged in")
                setuser({
                    email:"",
                    password:"",
                })
                nav("/")
            }
            else{
                alert("invalid credentials")
            }
    }
    return (<div>
        <h1>login</h1>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handlesubmit}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="text" name="email" onChange={changeval} value={user.email} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" onChange={changeval} value={user.password}  placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">

                            </div>
                            <button type="submit" className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="/signup" className="font-medium text-red-600 hover:underline dark:text-red-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>);
}

export default Login;