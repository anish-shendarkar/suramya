"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

export default function CategoryPage() {
    const [loading, setLoading] = useState(true);
    const [jewellery, setJewellery] = useState<any[]>([]);
    const router = useRouter();
    const { category } = useParams();

    useEffect(() => {
        const fetchJewellery = async() => {
            try {
                const response = await fetch(`http://localhost:3333/user/alljewellery`, {
                    method: "GET",
                });
                if(!response.ok) {
                    throw new Error("Failed to fetch Jewellery");
                }
                const data = await response.json();
                setJewellery(data);
            } catch(err) {
                console.error("Failed to fetch jewellery", err);
            } finally {
                setLoading(false);
            }
        };
      fetchJewellery();
    }, [category]);

    const handleOnClick = (id:string) => {
        router.push(`/jewellery/${id}`);
    }

    return (
        <div className="container mt-16 mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 capitalize">Jewellary Collection</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {jewellery.length > 0 ? (
                    jewellery.map((jewellery) => (
                        <div onClick={() => handleOnClick(jewellery._id)} key={jewellery?._id} className="rounded-lg p-4 shadow-md border-2 border-transparent transition-all duration-300 hover:border-rose-300 hover:shadow-purple-400 cursor-pointer">
                            
                            <Image
                                src={ "/placeholder.svg"}
                                alt={jewellery?.name || "Outfit Image"}
                                className="object-cover w-full h-64"
                                width={300}
                                height={400}
                            />
                            <h2 className="text-xl font-semibold mt-2">{jewellery?.name}</h2>
                            <p>{jewellery?.description}</p>
                            <p className="font-bold text-lg mt-2">₹{jewellery?.price}/day</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No products available for this category.</p>
                )}
            </div>
        </div>
    );
}
