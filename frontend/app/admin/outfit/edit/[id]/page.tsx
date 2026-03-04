'use client'
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminNavbar from "@/components/AdminNavbar";
import Image from "next/image";

interface Outfit {
    _id: string;
    name: string;
    description: string;
    type: string;
    color: string;
    size: string;
    gender: string;
    price: number;
    coverImage: string;
    images: string[];
}

function EditOutfit() {
    const [outfit, setOutfit] = useState<Outfit | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [gender, setGender] = useState("");
    const [price, setPrice] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const params = useParams();
    const outfitId = params?.id as string;

    useEffect(() => {
        const token = Cookies.get("auth-token");
        if (!token) {
            alert("You are not logged in. Please log in to access this page.");
            router.push("/admin/login");
            return;
        }

        // Fetch outfit data
        fetchOutfit();
    }, [outfitId]);

    const fetchOutfit = async () => {
        try {
            const token = Cookies.get("auth-token");
            const response = await fetch(`http://localhost:3333/admin/getoutfit/${outfitId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setOutfit(data);
                setName(data.name);
                setDescription(data.description);
                setType(data.type);
                setColor(data.color);
                setSize(data.size);
                setGender(data.gender);
                setPrice(data.price.toString());
                setExistingImages([data.coverImage, ...data.images].filter(Boolean));
            } else {
                alert("Failed to fetch outfit details.");
                router.push("/admin/dashboard");
            }
        } catch (error) {
            console.error("Error fetching outfit:", error);
            alert("Error loading outfit details.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageDelete = (imageUrl: string) => {
        setImagesToDelete([...imagesToDelete, imageUrl]);
        setExistingImages(existingImages.filter(img => img !== imageUrl));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const token = Cookies.get("auth-token");

            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("type", type);
            formData.append("color", color);
            formData.append("size", size);
            formData.append("gender", gender);
            formData.append("price", price);
            formData.append("imagesToDelete", JSON.stringify(imagesToDelete));

            files.forEach((file) => {
                formData.append("images", file);
            });

            const response = await fetch(`http://localhost:3333/admin/editoutfit/${outfitId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                alert("Outfit updated successfully!");
                router.push("/admin/dashboard");
            } else {
                const errorData = await response.json();
                console.error("Error updating outfit:", errorData);
                alert("Failed to update outfit. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div>
                <AdminNavbar />
                <div className="flex justify-center items-center h-screen">
                    <p className="text-xl">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <AdminNavbar />
            <h1 className="text-3xl text-center font-bold mx-auto capitalize">Edit Outfit</h1>
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
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Size</label>
                        <input
                            name="size"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter size of the outfit"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Color</label>
                        <input
                            name="color"
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter color of the outfit"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Gender</label>
                        <Select value={gender} onValueChange={(value) => setGender(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Gender</SelectLabel>
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

                    {/* Existing Images */}
                    {existingImages.length > 0 && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Existing Images</label>
                            <div className="grid grid-cols-3 gap-4">
                                {existingImages.map((imageUrl, index) => (
                                    <div key={index} className="relative group">
                                        <Image
                                            src={imageUrl}
                                            alt={`Outfit image ${index + 1}`}
                                            width={200}
                                            height={200}
                                            className="w-full h-32 object-cover rounded border border-gray-300"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleImageDelete(imageUrl)}
                                            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mb-4">
                        <label htmlFor="file" className="block text-sm font-medium mb-2">Add New Images</label>
                        <input
                            id="file"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setFiles(Array.from(e.target.files || []))}
                        />
                        {files.length > 0 && (
                            <p className="text-sm text-gray-600 mt-2">
                                {files.length} new image(s) selected
                            </p>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2 rounded-lg shadow-md border-2 border-transparent transition-all duration-300 hover:border-rose-300 hover:shadow-purple-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Updating..." : "Update Outfit"}
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

export default EditOutfit;