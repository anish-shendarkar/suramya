"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const OutfitSearchBar = () => {
    const router = useRouter();

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const limitedResults = results.slice(0, 5);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && query.trim()) {
                setExpanded(true);
            }
        };

        const timer = setTimeout(async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `http://localhost:3333/user/search/outfit?query=${query}`
                );
                const data = await res.json();
                if (Array.isArray(data)) {
                    setResults(data);
                } else {
                    setResults([]);
                }
            } catch (err) {
                console.error(err);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="relative w-full max-w-lg mx-auto">
            {/* SEARCH INPUT */}
            <div className="relative">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                    type="text"
                    placeholder="Search outfits..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key == "Enter" && setExpanded(true)}
                    className="
            w-full pl-10 pr-4 py-2.5
            border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-rose-400
          "
                />
            </div>

            {/* {query && (
                <button
                    onClick={() => setExpanded(true)}
                    className="md:hidden mt-2 w-full bg-rose-500 text-white py-2 rounded-lg"
                >
                    Search
                </button>
            )} */}

            {/* DROPDOWN RESULTS */}
            {!expanded && query && (
                <div className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-72 overflow-y-auto">
                    {loading && (
                        <div className="p-3 text-sm text-gray-500">
                            Searching...
                        </div>
                    )}

                    {!loading && limitedResults.length === 0 && (
                        <div className="p-3 text-sm text-gray-400">
                            No results found
                        </div>
                    )}

                    {!loading &&
                        limitedResults.map((item) => (
                            <div
                                key={item._id}
                                onClick={() => router.push(`/user/outfit/${item._id}`)}
                                className="p-3 cursor-pointer hover:bg-rose-50 transition"
                            >
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500 line-clamp-1">
                                    {item.description}
                                </p>
                            </div>
                        ))}

                    {/* {!loading && results.length > 5 && (
                        <div className="p-3 text-center text-rose-600 cursor-pointer hover:bg-rose-50"
                            onClick={() => setExpanded(true)}
                        >
                            View all results →
                        </div>
                    )} */}
                </div>
            )}

            {/* {expanded && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {results.map((item) => (
                        <div
                            key={item._id}
                            className="border rounded-lg p-4 hover:shadow-lg transition"
                        >
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            )} */}
        </div>
    );
};

export default OutfitSearchBar;
