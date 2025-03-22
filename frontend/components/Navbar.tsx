'use client'
import { useState } from "react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Suramya</span>
                </a>

                {/* Navigation Links */}
                <div className="items-center justify-between hidden w-full md:flex md:w-auto">
                    <ul className="flex space-x-6 ml-8 font-medium">
                        <li>
                            <a href="/" className="text-blue-700">Home</a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-blue-700">About</a>
                        </li>
                        <li>
                            <a href="/women" className="hover:text-blue-700">Women</a>
                        </li>
                        <li>
                            <a href="/men" className="hover:text-blue-700">Mens</a>
                        </li>
                        <li>
                            <a href="/jewellery" className="hover:text-blue-700">Jewellery</a>
                        </li>
                        <li className="relative group">
                            <button className="flex items-center hover:text-blue-700">
                                Occasion
                                <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            <div className="absolute mt-2 bg-white shadow-md rounded-lg w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
                                <ul className="py-2 text-sm">
                                    <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Pre Wedding</a></li>
                                    <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Maternity</a></li>
                                    <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Wedding</a></li>
                                </ul>
                            </div>
                        </li>


                        <li>
                            <a href="/contact" className="hover:text-blue-700">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
