import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Creatroom from "./createform";
import Joinroom from "./joinform";

function Navbar() {
    const loc = useLocation()
    const nav = useNavigate()
    const [cr, setcr] = useState(false)
    const [jr, setjr] = useState(false)
    const logout = () => {
        localStorage.removeItem('user')
        alert("logged out")
        nav('/login')
    }
    return (
        <div>
            <div className=" bg-gray-50  mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
                <span className="ml-3 text-2xl font-medium title-font text-black  " onClick={() => { nav('/') }}>Image Editor</span>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center space-x-4">
                    {loc.pathname === '/login' || loc.pathname === '/signup' ? null :
                        <>
                            <span> {localStorage.user} </span>
                            {loc.pathname === '/editor' ? null : <button className="inline-flex items-center bg-blue-600 text-slate-50 border-0 py-1 px-3 focus:outline-none  hover:bg-slate-500 rounded-lg text-base mt-3  md:mt-0" onClick={() => { nav('/editor') }}>
                                Edit Images
                            </button>}
                            <button className="inline-flex items-center bg-blue-600 text-slate-50 border-0 py-1 px-3 focus:outline-none  hover:bg-slate-500 rounded-lg text-base mt-3  md:mt-0" onClick={() => { setcr(!cr) }}>
                                Create a room
                            </button>
                            <button className="inline-flex items-center bg-blue-600 text-slate-50 border-0 py-1 px-3 focus:outline-none  hover:bg-slate-500 rounded-lg text-base mt-3  md:mt-0" onClick={() => { setjr(!jr) }}>
                                Join a room
                            </button>
                            {localStorage.user ? <button className="inline-flex items-center bg-blue-600 text-slate-50 border-0 py-1 px-3 focus:outline-none  hover:bg-slate-500 rounded-lg text-base mt-3  md:mt-0" onClick={logout}>
                                Logout
                            </button> :
                                <button className="inline-flex items-center  bg-blue-600 text-slate-50 border-0 py-1 px-3 focus:outline-none  hover:bg-slate-500 rounded-lg text-base mt-4 md:mt-0" onClick={() => { nav('/login') }}>
                                    Login
                                </button>}</>}
                </nav>

            </div>
            {cr ? <Creatroom setcr={setcr} /> : null}
            {jr ? <Joinroom setjr={setjr} /> : null}
        </div>
    );
}

export default Navbar;