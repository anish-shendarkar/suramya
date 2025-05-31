"use client"

import Image from "next/image"
import { Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export default function OutfitViewer() {

    interface Outfit {
        _id: string
        name: string
        description: string
        type: string
        size: string
        color: string
        gender: string
        price: number
        deposit: number

        images: string[]
    }

    const [outfit, setOutfit] = useState<Outfit | null>(null);
    const { id } = useParams() as { id: string }
    const token = Cookies.get('token')
    const router = useRouter()

    useEffect(() => {
        const fetchOutfitById = async () => {
            try {
                console.log('fetching outfit by id', id);
                const response = await fetch(`http://localhost:3333/user/outfit/${id}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch outfit");
                }

                const data = await response.json();
                setOutfit(data);
            }
            catch (error) {
                console.error('Error:', error);
            }
        }

        fetchOutfitById();
    }, [id]);

    const handleOnclick = async () => {
        router.push(`/contact`)
    }
    if (!outfit) return <p className="text-center mt-10">Loading outfit details...</p>;
    // URL of images
    return (
        <div className="container mx-auto px-4 py-6 mt-20">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square relative overflow-hidden rounded-lg border">
                        <Image
                            src={`http://localhost:3333/uploads/outfits/${outfit.images[0]}`}
                            alt={outfit?.name || "Outfit Image"}
                            className="object-cover"
                            fill
                            priority
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {outfit.images.map((imgName, i) => (
                            <button
                                key={i}
                                className="aspect-square relative overflow-hidden rounded-lg border hover:border-primary transition-colors"
                            >
                                <Image
                                    src={`http://localhost:3333/uploads/outfits/${imgName}`}
                                    alt={`Item ${i}`}
                                    className="object-cover"
                                    fill
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Outfit Details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold capitalize">{outfit?.name}</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge className="capitalize">{outfit?.type}</Badge>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="font-semibold text-xl">{outfit?.price}</h2>
                        <p className="text-sm text-muted-foreground">Security deposit: {outfit?.deposit} (refundable)</p>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p className="text-muted-foreground">
                                {outfit?.description}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Details</h3>
                            <dl className="grid grid-cols-2 gap-2 text-sm">
                                <dt className="text-muted-foreground">Color</dt>
                                <dd className="capitalize">{outfit?.color}</dd>
                            </dl>
                        </div>

                        <Button onClick={handleOnclick} size="lg" className="w-full">
                            <Calendar className="mr-2 h-4 w-4" />
                            Get Now
                        </Button>

                        <div className="text-sm text-muted-foreground">
                            <p>* Minimum rental period: 1 day</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
