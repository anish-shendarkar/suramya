'use client'
import { useState, useEffect } from "react";
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, Package, RefreshCw, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const handleLogout = () => {
        Cookies.remove("auth-token");
        alert("You have been logged out.");
        router.push("/admin-9970/login");
    };

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 dark:text-white">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-purple-400 to-90%">Suramya</span>
                </a>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2"
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
                {/* Navigation Links */}
                <div className="items-center justify-between hidden w-full md:flex md:w-auto">
                    <ul className="flex space-x-6 ml-8 font-medium [&>li>a:hover]:text-rose-500 [&>li>a]:transition-all duration-300">
                        <li>
                            <a href="/admin-9970/dashboard">Dashboard</a>
                        </li>
                        <li className="group">
                            <a href="/admin-9970/outfit">Outfits</a>   
                        </li>
                        <li className="group">
                            <a href="/admin-9970/jewellery">Jewellery</a>
                        </li>
                        <li>
                            <button
                                onClick={() => handleLogout()}
                                className="bg-transparent border-none p-0 font-medium text-black hover:text-rose-500 transition-all duration-300 cursor-pointer"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden py-4 px-2 border-t">
                    <nav className="flex flex-col space-y-4">
                        <Link href="/admin-9970/dashboard" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                        <Link href="/admin-9970/outfit" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Outfits</Link>
                        <Link href="/admin-9970/jewellery" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Jewellery</Link>
                        <Link href="/" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Logout</Link>
                    </nav>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
