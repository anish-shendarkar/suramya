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
                            <a href="/" className="hover:text-rose-500">Home</a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-rose-500">About</a>
                        </li>
                        <li className="group">
                            <a href="/women" className="hover:text-rose-500 transition-colors">Women</a>
                            <div className="absolute left-10 max-w-[95%] mt-2 w-screen bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-6">
                                <div className="grid grid-cols-2">
                                    <div>
                                        <h3 className="text-rose-500 text-lg font-medium mb-3 pl-4">Category</h3>
                                        <ul className="py-2 text-gray-800 [&>li>a]:px-4 [&>li>a]:py-2 [&>li>a]:block [&>li>a:hover]:underline [&>li>a:hover]:text-rose-500 [&>li>a]:transition-colors">
                                            <li><a href="#">All</a></li>
                                            <li><a href="#">Lehengas</a></li>
                                            <li><a href="#">Maternity</a></li>
                                            <li><a href="#">Sarees</a></li>
                                            <li><a href="#">Blouse</a></li>
                                            <li><a href="#">Gowns</a></li>
                                            <li><a href="#">Nauvari Sarees</a></li>
                                            <li><a href="#">Navratri Collection</a></li>
                                            <li><a href="#">Short Dresses</a></li>
                                            <li><a href="#">Gowns</a></li>
                                            <li><a href="#">Gowns</a></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-rose-500 text-lg font-medium mb-3 pl-4">Occasion</h3>
                                        <ul className="py-2 text-gray-800 [&>li>a]:px-4 [&>li>a]:py-2 [&>li>a]:block [&>li>a:hover]:underline [&>li>a:hover]:text-rose-500 [&>li>a]:transition-colors">
                                            <li><a href="#">Pre Wedding</a></li>
                                            <li><a href="#">Maternity</a></li>
                                            <li><a href="#">Wedding</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <a href="/men" className="hover:text-rose-500">Mens</a>
                        </li>
                        <li>
                            <a href="/jewellery" className="hover:text-rose-500">Jewellery</a>
                        </li>
                        <li className="relative group">
                            <a href="/women" className="hover:text-rose-500">Occasion</a>
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                <ul className="py-2 text-gray-800">
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
