"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import { MensCategorySidebar } from "@/components/MensSidebar";
import OutfitSearchBar from "@/components/OutfitSearchBar";

export default function CategoryPage() {
    const [loading, setLoading] = useState(true);
    const [outfits, setOutfits] = useState<any[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();
    const { category } = useParams();
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    useEffect(() => {
        const fetchOutfits = async () => {
            try {
                const response = await fetch(`http://localhost:3333/user/outfits/male`);
                const data = await response.json();
                setOutfits(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOutfits();
    }, [category]);

    const categories = useMemo(() => {
        return Array.from(new Set(outfits.map((outfit) => outfit.type)));
    }, [outfits]);

    const filteredOutfits = activeCategory
        ? outfits.filter((outfit) => outfit.type === activeCategory)
        : outfits;

    const handleCategorySelect = (cat: string | null) => {
        setActiveCategory(cat);
        setSidebarOpen(false); // Close sidebar on mobile after selection
    };

    if (loading) {
        return <p className="p-6">Loading...</p>;
    }

    return (
        <div className="flex relative min-h-screen">
            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed lg:static inset-y-0 left-0 z-40
                    transform transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                    bg-white lg:bg-transparent
                `}
            >
                <MensCategorySidebar
                    categories={categories}
                    activeCategory={activeCategory}
                    onSelect={handleCategorySelect}
                />
            </div>

            {/* Main Content */}
            <main className="w-full p-4 sm:p-6 lg:pl-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <h1 className="text-2xl sm:text-3xl font-bold capitalize">
                            Mens Collection
                        </h1>
                    </div>
                    <div className="w-full sm:w-64">
                        <OutfitSearchBar />
                    </div>
                </div>

                {/* Active Category Badge (Mobile) */}
                {activeCategory && (
                    <div className="lg:hidden mb-4 flex items-center gap-2">
                        <span className="text-sm text-gray-600">Category:</span>
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
                            {activeCategory}
                            <button
                                onClick={() => setActiveCategory(null)}
                                className="hover:bg-rose-200 rounded-full p-0.5"
                            >
                                <X size={14} />
                            </button>
                        </span>
                    </div>
                )}

                {/* Outfit Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {filteredOutfits.length > 0 ? (
                        filteredOutfits.map((outfit) => (
                            <div
                                key={outfit._id}
                                onClick={() => router.push(`/user/outfit/${outfit._id}`)}
                                className="rounded-lg p-3 sm:p-4 shadow-md border-2 border-transparent transition-all hover:border-rose-300 cursor-pointer bg-white"
                            >
                                <div className="relative w-full aspect-[3/4] mb-2">
                                    <Image
                                        src={`http://localhost:3333/uploads/outfits/${outfit.images[0]}`}
                                        alt={outfit.name}
                                        fill
                                        className="object-cover rounded-md"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>
                                <h2 className="text-lg sm:text-xl font-semibold mt-2 line-clamp-1">
                                    {outfit.name}
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600 line-clamp-2 mt-1">
                                    {outfit.description}
                                </p>
                                <p className="font-bold text-base sm:text-lg mt-2 text-rose-600">
                                    ₹{outfit.price}/day
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">
                                No products available for this category.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}