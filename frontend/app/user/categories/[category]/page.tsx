"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

export default function CategoryPage() {
    const [loading, setLoading] = useState(true);
    const [outfits, setOutfits] = useState<any[]>([]);
    const router = useRouter();
    const { category } = useParams();

    useEffect(() => {
        const fetchOutfits = async() => {
            try {
                const response = await fetch(`http://localhost:3333/user/outfits/${category}`, {
                    method: "GET",
                });
                if(!response.ok) {
                    throw new Error("Failed to fetch outfits");
                }
                const data = await response.json();
                setOutfits(data);
            } catch(err) {
                console.error("Failed to fetch outfits", err);
            } finally {
                setLoading(false);
            }
        };
      fetchOutfits();
    }, [category]);

    const handleOnClick = (id:string) => {
        router.push(`/outfit/${id}`);
    }

    return (
        <div className="container mt-16 mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 capitalize">{category} Collection</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {outfits.length > 0 ? (
                    outfits.map((outfit) => (
                        <div onClick={() => handleOnClick(outfit._id)} key={outfit?._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                            
                            <Image
                                src={ "/placeholder.svg"}
                                alt={outfit?.name || "Outfit Image"}
                                className="object-cover w-full h-64"
                                width={300}
                                height={400}
                            />
                            <h2 className="text-xl font-semibold mt-2">{outfit?.name}</h2>
                            <p>{outfit?.description}</p>
                            <p className="font-bold text-lg mt-2">₹{outfit?.price}/day</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No products available for this category.</p>
                )}
            </div>
        </div>
    );
}
