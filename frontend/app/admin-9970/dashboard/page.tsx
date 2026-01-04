'use client'
import React, { useEffect } from 'react'
import AdminNavbar from "@/components/AdminNavbar";
import { Typewriter } from 'react-simple-typewriter';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function dashboard() {

    const router = useRouter();
    useEffect(() => {
        const token = Cookies.get("auth-token");
        console.log("Token:", token);
        if (!token) {
            alert("You are not logged in. Please log in to access this page.");
            router.push("/admin-9970/login");
        }
    }, []);

    return (
        <div>
            <AdminNavbar />
            <div className="flex flex-col h-screen bg-gray-100">
                <h1 className="text-3xl font-bold w-fit mx-auto my-4">Admin Dashboard</h1>
                <p className="w-fit mx-auto text-gray-600">Here you can manage outfits, jewellery, and more.</p>
                <h2 className="text-2xl font-semibold px-6">Create {' '}
                    <span className="text-rose-500">
                        <Typewriter
                            words={['Outfits', 'Jewellery', 'Collections', 'Memories ❤️']}
                            loop={2}
                            cursor
                            cursorStyle='|'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </span>
                </h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6'>
                    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                        <h2 className="text-xl font-semibold mb-2">Manage Outfits</h2>
                        <p className="text-gray-600">Add, edit, or delete outfits.</p>
                        <a href="/admin-9970/outfit" className="text-blue-500 hover:underline mt-2 inline-block">Go to Outfits</a>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                        <h2 className="text-xl font-semibold mb-2">Manage Jewellery</h2>
                        <p className="text-gray-600">Add, edit, or delete jewellery items.</p>
                        <a href="/admin-9970/jewellery" className="text-blue-500 hover:underline mt-2 inline-block">Go to Jewellery</a>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                        <h2 className="text-xl font-semibold mb-2">Manage Accessories</h2>
                        <p className="text-gray-600">Add, edit, or delete accessories.</p>
                        <a href="/admin-9970/accessories" className="text-blue-500 hover:underline mt-2 inline-block">Go to Accessories</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dashboard