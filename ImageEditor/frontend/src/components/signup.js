import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const nav = useNavigate();
    const [newuser, setnew] = useState({
        email: "",
        password: "",
        cpassword: ""
    })
    const changeval = (event) => {
        var tempname = event.target.name
        var tempvalue = event.target.value
        setnew({
            ...newuser,
            [tempname]: tempvalue
        })
    }
    const handlesubmit = async (event) => {
        event.preventDefault();
        if (newuser.password === newuser.cpassword) {
            const formdata = new FormData()
            formdata.append('email', newuser.email)
            formdata.append('password', newuser.password)
            const res = await fetch('http://localhost:8080/user/signup', {
                method: 'POST',
                body: formdata
            })
            const text = await res.text();
            localStorage.setItem('user', newuser.email)
            alert(text)
            setnew({
                email: "",
                password: "",
                cpassword: ""
            })
            nav('/')
        }
        else {
            alert("Passwords do not match")
        }
    }
    return (<div>
        <section class="bg-gray-50 ">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign up to join us
                        </h1>
                        <form class="space-y-4 md:space-y-6" onSubmit={handlesubmit} >
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input type="text" onChange={changeval} value={newuser.email} name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" onChange={changeval} value={newuser.password} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" required="" />
                            </div>
                            <div>
                                <label class="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                                <input type="password" onChange={changeval} value={newuser.cpassword} name="cpassword" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" required="" />
                            </div>
                            <div class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">

                            </div>
                            <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign up</button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account ? <a href="/login" class="font-medium text-blue-600 hover:underline ">Sign in</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>);
}

export default Signup;