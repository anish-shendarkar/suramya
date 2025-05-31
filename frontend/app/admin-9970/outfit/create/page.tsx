'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminNavbar from "@/components/AdminNavbar";


function createOutfit() {
    const [files, setFiles] = useState<File[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [gender, setGender] = useState("");
    const [price, setPrice] = useState("");
    const [deposit, setDeposit] = useState("");

    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("auth-token");
        console.log("Token:", token);
        if (!token) {
            alert("You are not logged in. Please log in to access this page.");
            router.push("/admin-9970/login");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = Cookies.get("auth-token");

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("type", type);
        formData.append("color", color);
        formData.append("size", size);
        formData.append("gender", gender);
        formData.append("price", price);
        formData.append("deposit", deposit);
        files.forEach((file, index) => {
            formData.append("images", file);
        });

        const response = await fetch("http://localhost:3333/admin/createoutfit", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            alert("Outfit created successfully!");
            router.push("/admin-9970/dashboard");

        } else {
            const errorData = await response.json();
            console.error("Error creating outfit:", errorData);
            alert("Failed to create outfit. Please try again.");
        }
    }
    return (
        <div>
            <AdminNavbar />
            <h1 className="text-3xl text-center font-bold mx-3 capitalize">Create Outfit</h1>
            <Card className="w-full max-w-2xl mx-auto my-6 p-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Outfit Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter outfit name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            name="description"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter outfit description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Type</label>
                        <input
                            name="type"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter Type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        ></input>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Size</label>
                        <input
                            name="size"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter size of the outfit"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        ></input>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Color</label>
                        <input
                            name="color"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter color of the outfit"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        ></input>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Gender</label>
                        <Select onValueChange={(value) => setGender(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Price per day</label>
                        <input
                            type="number"
                            name="price"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter price per day"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Deposit</label>
                        <input
                            type="number"
                            name="deposit"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter price"
                            value={deposit}
                            onChange={(e) => setDeposit(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="file" className="block text-sm font-medium mb-2">Images</label>
                        <input
                            id="file"
                            type="file"
                            multiple
                            onChange={(e) => setFiles(Array.from(e.target.files || []))}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="block mx-auto px-4 py-2 rounded-lg p-4 shadow-md border-2 border-transparent transition-all duration-300 hover:border-rose-300 hover:shadow-purple-400 cursor-pointer"
                    >
                        Create Outfit
                    </button>
                </form>
            </Card>
        </div>
    )
}

export default createOutfit