"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import React from 'react'
import { useParams } from "next/navigation";

function editOutfit() {
    const router = useRouter();
    const { id } = useParams() as { id: string }
    const [data, setData] = useState({
        name: "",
        email: "",
        role: "",
        department: "",
        bio: "",
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = Cookies.get("auth-token");
        console.log("Token:", token);
        if (!token) {
            alert("You are not logged in. Please log in to access this page.");
            router.push("/admin-9970/login");
        }

        const fetchOutfitById = async (id: string) => {
            try {
                console.log('fetching outfit by id', id);
                const response = await fetch(`http://localhost:3333/admin/getoutfit/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${Cookies.get("auth-token")}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch outfit");
                }

                const data = await response.json();
                console.log(data);
            }
            catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }
    }, );


    return (
        <div>

        </div>
    )
}

export default editOutfit