'use client'
import { useState, useEffect } from "react";
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [womenCategories, setWomanCategories] = useState<string[]>([]);
    const [menCategories, setMenCategories] = useState<string[]>([]);
    const pathname = usePathname();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const [womenRes, menRes] = await Promise.all([
                    fetch('http://localhost:3333/user/categories/female'),
                    fetch('http://localhost:3333/user/categories/male')
                ]);
                const womenData = await womenRes.json();
                const menData = await menRes.json();
                setWomanCategories(womenData);
                setMenCategories(menData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const CategoryDropdown = ({ categories, basePath }: { categories: string[]; basePath: string }) => (
        <div className="absolute left-10 max-w-[95%] mt-2 w-screen bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-6">
            <div className="grid grid-cols-2">
                <div>
                    <h3 className="text-rose-500 text-lg font-medium mb-3 pl-4">Category</h3>
                    <ul className="py-2 text-gray-800 [&>li>a]:px-4 [&>li>a]:py-2 [&>li>a]:block [&>li>a:hover]:underline [&>li>a:hover]:text-rose-500 [&>li>a]:transition-colors">
                        <li><a href={basePath}>All</a></li>
                        {categories.map((cat) => (
                            <li key={cat}>
                                <a href={`${basePath}?category=${cat}`} className="capitalize">
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </a>
                            </li>
                        ))}
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
    );

    return (
        <nav className="fixed w-full z-[50] backdrop-blur-md border-b border-white/10">
            <div className="flex flex-wrap items-center justify-between mx-auto py-3 px-8 text-rose-600">
                {/* Logo */}
                <a href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                    <img src="/suramya_logo_nobg.png" className="h-12" alt="Suramya Logo" />
                    <span className="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-400 ">Suramya</span>
                </a>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2"
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
                {/* Navigation Links */}
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:ml-auto">
                    <ul className="flex space-x-6 font-medium [&>li>a:hover]:text-rose-500 [&>li>a]:transition-all duration-300">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/user/about">About</a>
                        </li>
                        <li className="group">
                            <a href="/user/women">Women</a>
                            <CategoryDropdown categories={womenCategories} basePath="/user/women" />
                        </li>
                        <li className="group">
                            <a href="/user/men">Mens</a>
                            <CategoryDropdown categories={menCategories} basePath="/user/men" />
                        </li>
                        <li>
                            <a href="/user/jewellery">Jewellery</a>
                        </li>
                        <li className="relative group">
                            <a href="/user/women" className="hover:text-rose-500">Occasion</a>
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                <ul className="py-2 text-gray-800">
                                    <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Pre Wedding</a></li>
                                    <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Maternity</a></li>
                                    <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Wedding</a></li>
                                </ul>
                            </div>
                        </li>

                        <li>
                            <a href="/user/contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden py-4 px-2 border-t">
                    <nav className="flex flex-col space-y-4">
                        <Link href="/" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link href="/user/about" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link>
                        <Link href="/user/women" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Women</Link>
                        <Link href="/user/men" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Mens</Link>
                        <Link href="/user/jewellery" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Jewellery</Link>
                        <Link href="/user/contact" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                    </nav>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
