"use client"

import Image from "next/image"
import { Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Cookies from "js-cookie"

export default function JewelleryViewer() {

    interface Jewellery {
        _id: string
        name: string
        description: string
        type: string
        color: string
        price: number
        deposit: number

        images: string[]
    }

    const [jewellery, setJewellery] = useState<Jewellery | null>(null);
    const { id } = useParams() as { id: string }
    const token = Cookies.get('token')
    const router = useRouter()
    useEffect(() => {
        const fetchItemById = async () => {
            try {
                console.log('fetching item by id', id);
                const response = await fetch(`http://localhost:3333/user/jewellery/${id}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch item");
                }

                const data = await response.json();
                setJewellery(data);
            }
            catch (error) {
                console.error('Error:', error);
            }
        }

        fetchItemById();
    }, [id]);

    if (!jewellery) return <p className="text-center mt-10">Loading jewellery details...</p>;

    const handleOnclick = async () => {
        router.push(`/contact`)
    }
    
    return (
        <div className="container mx-auto px-4 py-6 mt-20">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square relative overflow-hidden rounded-lg border">
                        <Image
                            src={`http://localhost:3333/uploads/jewellery/${jewellery.images[0]}` || "/placeholder.svg"}
                            alt={jewellery?.name || "jewellery Image"}
                            className="object-cover"
                            fill
                            priority
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {jewellery.images.map((imgName, i) => (
                            <button
                                key={i}
                                className="aspect-square relative overflow-hidden rounded-lg border hover:border-primary transition-colors"
                            >
                                <Image
                                    src={`http://localhost:3333/uploads/jewellery/${imgName}`}
                                    alt={`Item ${i}`}
                                    className="object-cover"
                                    fill
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* jewellery Details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">{jewellery?.name}</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge>{jewellery?.type}</Badge>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="font-semibold text-xl">{jewellery?.price}</h2>
                        <p className="text-sm text-muted-foreground">Security deposit: {jewellery?.deposit} (refundable)</p>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p className="text-muted-foreground">
                                {jewellery?.description}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Details</h3>
                            <dl className="grid grid-cols-2 gap-2 text-sm">
                                <dt className="text-muted-foreground">Color</dt>
                                <dd>{jewellery?.color}</dd>
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
