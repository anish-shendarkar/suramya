'use client'

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, Package, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[Joan]">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Rent Designer Wear for Your Special Moments
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Premium collection of traditional and contemporary wear. Rent authentic designer pieces at a fraction
                  of the cost.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-white text-black hover:text-white hover:bg-black border-2 border-transparent transition-all duration-300 hover:border-rose-300 hover:shadow-purple-400" size="lg">
                  Browse Collection
                </Button>
                <a href="#how-it-works">
                  <Button className="border-2 border-transparent transition-all duration-300 hover:border-rose-300 hover:shadow-purple-400" size="lg">
                    How It Works
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Photo Gallery</h2>
            
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <Card key={step.title} className="relative overflow-hidden">
                  <CardContent className="p-6">
                    <step.icon className="w-12 h-12 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-500">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Items Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Popular This Week</h2>
              <Button variant="ghost" className="hidden md:flex">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularItems.map((item) => (
                <Card key={item.name} className="group">
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        width={300}
                        height={400}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{item.designer}</p>
                      <div className="flex justify-between items-center">
                        <p className="font-bold">₹{item.rentalPrice}/day</p>
                        <Button size="sm">Rent Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 md:hidden">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Rent Your Dream Outfit?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl">
                  Join thousands of satisfied customers who trust us for their special occasions.
                </p>
              </div>
              <Button className="bg-white text-black hover:bg-gray-200" size="lg">
                Get Started Today
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h4 className="font-semibold">Categories</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    Sarees
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Dresses
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Jewelry
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Kurtas
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Help</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">About</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Suramya Bespoke. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

const categories = [
  {
    name: "Sarees",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Dresses",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Jewellery",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Kurtas",
    image: "/placeholder.svg?height=400&width=300",
  },
]

const steps = [
  {
    title: "Choose Your Outfit",
    description: "Browse our collection and select your perfect outfit for the occasion.",
    icon: Clock,
  },
  {
    title: "Receive & Enjoy",
    description: "Try it on and feel amazing!",
    icon: Package,
  },
  {
    title: "Return With Ease",
    description: "Return the outfit in the provided packaging.",
    icon: RefreshCw,
  },
]

const popularItems = [
  {
    name: "Banarasi Silk Saree",
    designer: "By Sabyasachi",
    rentalPrice: "2999",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Designer Anarkali",
    designer: "By Manish Malhotra",
    rentalPrice: "3499",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Kundan Bridal Set",
    designer: "By Tanishq",
    rentalPrice: "4999",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Embroidered Lehenga",
    designer: "By Anita Dongre",
    rentalPrice: "5999",
    image: "/placeholder.svg?height=400&width=300",
  },
]

